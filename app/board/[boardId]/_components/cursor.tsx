"use client";
import {memo} from "react";
import {useOther} from "@liveblocks/react";
import {MousePointer2} from "lucide-react";
import {connectionIdToColor} from "@/lib/utils";

interface CursorProps {
    connectionId: number;
}

const Cursor = ({
                    connectionId
                }: CursorProps) => {
    const info = useOther(connectionId, (user) => user?.info);
    const cursor = useOther(connectionId, (user) => user.presence.cursor);
    const name = info?.name || "Teammate";
    if (!cursor) {
        return null;
    }
    const {x, y} = cursor;
    return (
        <foreignObject
        style={{
            transform: `translate(${x}px, ${y}px)`,
        }}
        height={50}
        width={50}
        className={'relative drop-shadow-md'}
        >
            <MousePointer2 className="h-5 w-5" style={{
                fill: connectionIdToColor(connectionId),
                color: connectionIdToColor(connectionId),
            }}/>
            <span className={'text-sm'}>

            {name}
            </span>
        </foreignObject>
    );
};
const mCursor = memo(Cursor);

mCursor.displayName = "Cursor";
export default mCursor;
