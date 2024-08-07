import {v} from 'convex/values';
import {mutation, query} from './_generated/server';
import {getAllOrThrow} from "convex-helpers/server/relationships";

export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional((v.string())),
        favorites: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Unauthenticated');
        }

        if (args.favorites) {
            const favoritesBoards = await ctx.db
                .query('useFavorites')
                .withIndex('by_user_org', q =>
                    q
                        .eq('userId', identity.subject)
                        .eq('orgId', args.orgId)
                )
                .order('desc')
                .collect();

            const ids = favoritesBoards.map(b => b.boardId);

            const boards = await getAllOrThrow(ctx.db, ids);

            return boards.map(board => ({
                ...board,
                isFavorite: true
            }))
        }

        const title = args.search as string;

        let boards = [];

        if (title) {
            boards = await ctx.db
                .query("boards")
                .withSearchIndex("search_title", q =>
                    q
                        .search('title', title)
                        .eq('orgId', args.orgId)
                )
                .collect();
        } else {
            boards = await ctx.db
                .query("boards")
                .withIndex("by_orgId", q => q.eq('orgId', args.orgId))
                .order("desc")
                .collect();
        }

        const boardsWithFavorites = boards.map(board => {
            return ctx.db
                .query("useFavorites")
                .withIndex("by_user_board_org", q =>
                    q
                        .eq('userId', identity.subject)
                        .eq('boardId', board._id)
                )
                .unique()
                .then(favorite => {
                    return {
                        ...board,
                        isFavorite: !!favorite
                    };
                });
        });

        return await Promise.all(boardsWithFavorites);
    }
});

export const remove = mutation({
    args: {
        id: v.id('boards')
    },
    handler: async (ctx, {id}) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Unauthenticated');
        }

        const userId = identity.subject;
        const existingFavorite = await ctx.db
            .query('useFavorites')
            .withIndex('by_user_board',
                q =>
                    q
                        .eq('userId', userId)
                        .eq('boardId', id)
            )
            .unique();

        if (existingFavorite) {
            await ctx.db.delete(existingFavorite._id);
        }

        if (id) {
            await ctx.db.delete(id);
        }
    }
});



