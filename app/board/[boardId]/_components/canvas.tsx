"use client";

import Info from "@/app/board/[boardId]/_components/info";
import Participants from "@/app/board/[boardId]/_components/participants";
import Toolbar from "@/app/board/[boardId]/_components/toolbar";
import {useCanRedo, useCanUndo, useHistory} from "@liveblocks/react";
import {useState} from "react";
import {CanvasMode, CanvasState} from "@/types/canvas";

interface CanvasProps {
    boardId: string;
}

const Canvas = ({boardId}: CanvasProps) => {
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    });

    const history = useHistory();
    const canUndo=useCanUndo()
    const canRedo=useCanRedo()


    return (
        <main className={'h-full w-full relative bg-neutral-100 touch-none'}>
            <Info boardId={boardId}/>
            <Participants/>
            <Toolbar canvasState={canvasState}
                     setCanvasState={setCanvasState}
                     canUndo={canUndo}
                     canRedo={canRedo}
                     undo={history.undo}
                     redo={history.redo}
            />
        </main>);
};

export default Canvas;
