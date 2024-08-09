import {Liveblocks} from "@liveblocks/node";
import {ConvexHttpClient} from 'convex/browser';
import {auth, currentUser} from "@clerk/nextjs/server";
import {api} from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
    secret: process.env.NEXT_SECRET_LIVEBLOCKS_API_KEY!,
});

export async function POST(request: Request) {
    const authorization = auth();
    const user = await currentUser();
    // console.log("process.env.NEXT_PUBLIC_LIVEBLOCKS_API_KEY = ", process.env.NEXT_PUBLIC_LIVEBLOCKS_API_KEY);
    // console.log('AUTH', {authorization, user});

    if (!authorization || !user) {
        return new Response('Unauthorized', {status: 403});
    }

    const {room} = await request.json();
    const board = await convex.query(api.board.get, {id: room});

    // console.log('AUTH', {
    //     room, board,
    //     boardOrgId: board?.orgId,
    //     userOrgId: authorization.orgId,
    // });

    if (board?.orgId !== authorization.orgId) {
        return new Response('Unauthorized', {status: 403});
    }

    const userInfo = {
        name: user.firstName || 'Anonymous',
        picture: user.imageUrl!,
    };

    // console.log("{userInfo} = ", {userInfo});

    const session = liveblocks.prepareSession(
        user.id,
        {
            userInfo
        }
    );

    if (room) {
        session.allow(room, session.FULL_ACCESS);
    }

    const {status, body} = await session.authorize();
    // console.log({status, body}, 'ALLOWED');
    return new Response(body, {status});
}
