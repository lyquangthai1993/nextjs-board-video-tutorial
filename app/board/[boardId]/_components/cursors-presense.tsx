"use client";

import {memo} from "react";
import {useOthersConnectionIds} from "@liveblocks/react";
import Cursor from "@/app/board/[boardId]/_components/cursor";

interface CursorsPresenseProps {
}

const Cursors = () => {
    const ids = useOthersConnectionIds();

    return (
        <>
            {ids.map((id) => {
                return (<Cursor
                    key={id}
                    connectionId={id}
                />);
            })}
        </>
    );
};

const CursorsPresense = () => {

    return (
        <>
            <Cursors/>
        </>
    );
};

export default memo(CursorsPresense);
