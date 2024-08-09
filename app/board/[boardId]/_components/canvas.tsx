"use client";

import Info from "@/app/board/[boardId]/_components/info";
import Participants from "@/app/board/[boardId]/_components/participants";
import Toolbar from "@/app/board/[boardId]/_components/toolbar";
import {useSelf} from "@liveblocks/react";

interface CanvasProps {
    boardId: string;
}

const Canvas = ({boardId}: CanvasProps) => {
    const info = useSelf((me) => me.info);

    console.log('info = ', info);

    return (
        <main className={'h-full w-full relative bg-neutral-100 touch-none'}>
            <Info boardId={boardId}/>
            <Participants/>
            <Toolbar/>
        </main>);
};

export default Canvas;
