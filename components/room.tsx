"use client";

import {ReactNode} from "react";
import {ClientSideSuspense, LiveblocksProvider, RoomProvider} from "@liveblocks/react/suspense";


interface RoomProps {
    children: ReactNode;
    roomId: string;
    fallback: NonNullable<ReactNode> | number;
}


const Room = ({
                  children,
                  roomId,
                  fallback
              }: RoomProps) => {

    return (
        // <LiveblocksProvider publicApiKey={LIVEBLOCKS_API_KEY}>
        <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
            <RoomProvider id={roomId}>
                <ClientSideSuspense fallback={fallback}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
};

export default Room;
