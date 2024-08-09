"use client";

import {ReactNode} from "react";
import {ClientSideSuspense, LiveblocksProvider, RoomProvider} from "@liveblocks/react/suspense";
import {LIVEBLOCKS_API_KEY} from "@/liveblocks.config";


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
        <LiveblocksProvider publicApiKey={LIVEBLOCKS_API_KEY}>
            <RoomProvider id={roomId}>
                <ClientSideSuspense fallback={fallback}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
};

export default Room;
