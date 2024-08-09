import {mutation, query} from "./_generated/server";
import {v} from "convex/values";
//random 10 link images
// const images = [
//     "https://images.unsplash.com/photo-1612835360191-2c7f3f2f0a6c",
//     "https://images.unsplash.com/photo-1612835360191-2c7f3f2f0a6c",
//     "https://images.unsplash.com/photo-1612835360191-2c7f3f2f0a6c",
//     "https://images.unsplash.com/photo-1612835360191-2c7f3f2f0a6c",
//     "https://images.unsplash.com/photo-1612835360191-2c7f3f2f0a6c",
//     "https://images.unsplash.com/photo-1612835360191-2c7f3f2f0a6c",
//     "https://images.unsplash.com/photo-1612835360191-2c7f3f2f0a6c",
//     "https://images.unsplash.com/photo-1612835360191-2c7f3f2f0a6c",
//     "https://images.unsplash.com/photo-1612835360191-2c7f3f2f0a6c",
//     "https://images.unsplash.com/photo-1612835360191-2c7f3f2f0a6c"
// ];

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Unauthenticated');
        }
        //random from 1 to 300
        const randomNum = Math.floor(Math.random() * 300) + 1;

        const randomImage = `https://picsum.photos/id/${randomNum}/200/`;
        console.log("args = ", args);
        return await ctx.db.insert('boards', {
            orgId: args.orgId,
            title: args.title,
            authorId: identity.subject,
            authorName: identity.name!,
            // authorId: '1',
            // authorName: 'Test User',
            imageUrl: randomImage
        });
    }
});

export const update = mutation({
    args: {
        id: v.id('boards'),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Unauthenticated');
        }

        const title = args.title.trim();

        if (!title) {
            throw new Error('Title is required');
        }

        if (title.length > 60) {
            throw new Error('Title is too long');
        }

        return await ctx.db.patch(args.id, {
            title
        });
    }
});

export const favorite = mutation({
    args: {id: v.id('boards'), orgId: v.string()},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Unauthenticated');
        }

        const board = await ctx.db.get(args.id);

        if (!board) {
            throw new Error('Board not found');
        }

        const userId = identity.subject;

        const existingFavorite = await ctx.db
            .query('useFavorites')
            .withIndex('by_user_board_org',
                q =>
                    q
                        .eq('userId', userId)
                        .eq('boardId', board._id)
                        .eq('orgId', args.orgId)
            )
            .unique();

        if (existingFavorite) {
            throw new Error('Already favorited');
        }

        await ctx.db.insert('useFavorites', {
            userId,
            boardId: board._id,
            orgId: args.orgId
        });


        return board;
    }
});

export const unfavorite = mutation({
    args: {id: v.id('boards')},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Unauthenticated');
        }

        const board = await ctx.db.get(args.id);

        if (!board) {
            throw new Error('Board not found');
        }

        const userId = identity.subject;

        const existingFavorite = await ctx.db
            .query('useFavorites')
            .withIndex('by_user_board_org',
                q =>
                    q
                        .eq('userId', userId)
                        .eq('boardId', board._id)
            )
            .unique();

        if (!existingFavorite) {
            throw new Error('Favorited board not found');
        }

        await ctx.db.delete(existingFavorite._id);

        return board;
    }
});

export const get = query({
    args: {id: v.id('boards')},
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    }
});
