"use client";

import {ReactNode} from "react";
import {ClientSideSuspense, LiveblocksProvider, RoomProvider} from "@liveblocks/react/suspense";
import {LiveList, LiveMap, LiveObject} from "@liveblocks/core";
import {Layer} from "@/types/canvas";


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
        <LiveblocksProvider throttle={16} authEndpoint="/api/liveblocks-auth">
            <RoomProvider id={roomId}
                          initialPresence={{
                              cursor: null,
                              selection: [],
                              pencilDraft: null,
                              penColor: null,
                          }}
                          initialStorage={{
                              layers: new LiveMap<string, LiveObject<Layer>>(),
                              layerIds: new LiveList([]),
                          }}
            >
                <ClientSideSuspense fallback={fallback}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
};

export default Room;
