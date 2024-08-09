"use client";

import {Skeleton} from "@/components/ui/skeleton";
import ToolButton from "@/app/board/[boardId]/_components/tool-button";
import {Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2} from "lucide-react";

interface ToolbarProps {
}

const Toolbar = ({}: ToolbarProps) => {
    return (
        <div className={'absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'}>
            <div className={'bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md'}>
                <ToolButton label={'Select'} icon={MousePointer2}
                            isActive={false}
                            onClick={() => {
                            }}
                />

                <ToolButton label={'Text'} icon={Type}
                            isActive={false}
                            onClick={() => {
                            }}
                />

                <ToolButton label={'Note'} icon={StickyNote}
                            isActive={false}
                            onClick={() => {
                            }}
                />

                <ToolButton label={'Rectangle'} icon={Square}
                            isActive={false}
                            onClick={() => {
                            }}
                />

                <ToolButton label={'Ellipse'} icon={Circle}
                            isActive={false}
                            onClick={() => {
                            }}
                />

                <ToolButton label={'Pen'} icon={Pencil}
                            isActive={false}
                            onClick={() => {
                            }}
                />
            </div>

            <div className={'bg-white rounded-md p-1.5 flex flex-col items-center shadow-md'}>
                <ToolButton label={'Undo'} icon={Undo2}
                            isDisabled={false}
                            onClick={() => {
                            }}
                />
                <ToolButton label={'Redo'} icon={Redo2}
                            isDisabled={false}
                            onClick={() => {
                            }}
                />
            </div>
        </div>
    );
};

export const ToolbarSkeleton = function () {
    return (
        <div
            className={'absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 shadow-md rounded-md h-[200px] w-[52px]'}>
            <Skeleton className={'h-full w-full bg-white'}/>
        </div>
    );
};

export default Toolbar;
