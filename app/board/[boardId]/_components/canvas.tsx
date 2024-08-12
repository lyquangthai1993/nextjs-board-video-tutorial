"use client";

import Info from "@/app/board/[boardId]/_components/info";
import Participants from "@/app/board/[boardId]/_components/participants";
import Toolbar from "@/app/board/[boardId]/_components/toolbar";
import {useCanRedo, useCanUndo, useHistory, useMutation} from "@liveblocks/react";
import React, {useCallback, useState} from "react";
import {Camera, CanvasMode, CanvasState} from "@/types/canvas";
import CursorsPresense from "@/app/board/[boardId]/_components/cursors-presense";
import {pointerEventToCanvasPoint} from "@/lib/utils";

interface CanvasProps {
    boardId: string;
}

const Canvas = ({boardId}: CanvasProps) => {
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    });
    const [camera, setCamera] = useState<Camera>({x: 0, y: 0});

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((prev) => {
            return {
                x: prev.x - e.deltaX,
                y: prev.y - e.deltaY
            };
        });
    }, []);

    const onPointerMove = useMutation((
        {
            setMyPresence
        },
        e: React.PointerEvent) => {
        e.preventDefault();
        const current = pointerEventToCanvasPoint(e, camera);

        setMyPresence({
            cursor: current
        });
    }, []);

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
            <svg
                className={'h-[100vh] w-[100vw]'}
                onWheel={onWheel}
                onPointerMove={onPointerMove}
            >
                <g>
                    <CursorsPresense/>
                </g>
            </svg>
        </main>);
};

export default Canvas;
