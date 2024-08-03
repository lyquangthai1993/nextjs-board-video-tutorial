import {v} from 'convex/values';
import {mutation, query} from './_generated/server';


export const get = query({
    args: {
        orgId: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Unauthenticated');
        }

        return await ctx.db
            .query("boards")
            .withIndex("by_orgId", q => q.eq('orgId', args.orgId))
            .order("desc")
            .collect();
    }
});

export const remove = mutation({
    args: {
        id: v.string()
    },
    handler: async (ctx, {id}) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error('Unauthenticated');
        }
        if (id) {
            // @ts-ignore
            await ctx.db.delete(id);
        }
    }
});

