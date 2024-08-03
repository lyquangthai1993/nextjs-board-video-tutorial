import {mutation} from "./_generated/server";
import {v} from "convex/values";

//random 10 link images
const images = [
    "https://images.unsplash.com/photo-1612835360191-2c7f3f2f0a6c",
    "https://images.unsplash.com/photo-1612835360191-2c7f3f2f0a6c",
    "https://images.unsplash.com/photo-1612835360191-2c7f3f2f0a6c",
    "https://images.unsplash.com/photo-1612835360191-2c7f3f2f0a6c",
    "https://images.unsplash.com/photo-1612835360191-2c7f3f2f0a6c",
    "https://images.unsplash.com/photo-1612835360191-2c7f3f2f0a6c",
    "https://images.unsplash.com/photo-1612835360191-2c7f3f2f0a6c",
    "https://images.unsplash.com/photo-1612835360191-2c7f3f2f0a6c",
    "https://images.unsplash.com/photo-1612835360191-2c7f3f2f0a6c",
    "https://images.unsplash.com/photo-1612835360191-2c7f3f2f0a6c"
];

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string()
    },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity();
        console.log("identity = ", identity);
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
