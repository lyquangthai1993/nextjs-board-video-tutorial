"use client";

import React, {memo} from "react";
import {LayerType, Side, XYWH} from "@/types/canvas";
import {useSelf, useStorage} from "@liveblocks/react";
import {useSelectionBounds} from "@/hooks/use-selection-bounds";

interface SelectionBoxProps {
    onResizeHandlePointerDown: (corner: Side, initialBound: XYWH) => void;
}

const HANDLE_WIDTH = 8;

const SelectionBox = ({
                          onResizeHandlePointerDown
                      }: SelectionBoxProps) => {
    const soleLayerId = useSelf((self) =>
        self.presence.selection?.length === 1 ? self.presence.selection[0] : null
    );

    const isShowingHandles = useStorage((root) =>
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
    );

    const bounds = useSelectionBounds();

    if (!bounds) {
        return null;
    }
    console.log("{bounds} = ", {bounds});
    return (
        <>
            <rect
                className={'fill-transparent stroke-blue-500 stroke-[2px] pointer-events-none'}
                style={{
                    transform: `translate(${bounds.x}px, ${bounds.y}px)`,
                }}
                x={0}
                y={0}
                width={bounds.width}
                height={bounds.height}
            />

            {isShowingHandles && (
                <>
                    <rect
                        className={'fill-white stroke-blue-500'}
                        x={0}
                        y={0}
                        style={{
                            cursor: 'nwse-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(
                            ${bounds.x - HANDLE_WIDTH / 2}px,
                            ${bounds.y - HANDLE_WIDTH / 2}px
                            )`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            //TODO: add resize handler
                        }}
                    />

                    <rect
                        className={'fill-white stroke-blue-500'}
                        x={0}
                        y={0}
                        style={{
                            cursor: 'nwse-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(
                            ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px,
                            ${bounds.y - HANDLE_WIDTH / 2}px
                            )`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            //TODO: add resize handler
                        }}
                    />

                    <rect
                        className={'fill-white stroke-blue-500'}
                        x={0}
                        y={0}
                        style={{
                            cursor: 'nwse-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            //TODO: add resize handler
                        }}
                    />

                    <rect
                        className={'fill-white stroke-blue-500'}
                        x={0}
                        y={0}
                        style={{
                            cursor: 'nwse-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(
                            ${bounds.x + bounds.width - HANDLE_WIDTH / 2}px,
                            ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px
                            )`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            //TODO: add resize handler
                        }}
                    />

                    <rect
                        className={'fill-white stroke-blue-500'}
                        x={0}
                        y={0}
                        style={{
                            cursor: 'nwse-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(
                            ${bounds.x + bounds.width - HANDLE_WIDTH / 2}px,
                            ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px
                            )`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            //TODO: add resize handler
                        }}
                    />

                    <rect
                        className={'fill-white stroke-blue-500'}
                        x={0}
                        y={0}
                        style={{
                            cursor: 'nwse-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(
                            ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px,
                            ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px
                            )`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            //TODO: add resize handler
                        }}
                    />

                    <rect
                        className={'fill-white stroke-blue-500'}
                        x={0}
                        y={0}
                        style={{
                            cursor: 'nwse-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(
                            ${bounds.x - HANDLE_WIDTH / 2}px,
                            ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px
                            )`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            //TODO: add resize handler
                        }}
                    />

                    <rect
                        className={'fill-white stroke-blue-500'}
                        x={0}
                        y={0}
                        style={{
                            cursor: 'nwse-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(
                            ${bounds.x - HANDLE_WIDTH / 2}px,
                            ${bounds.y + bounds.height/2 - HANDLE_WIDTH / 2}px
                            )`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            //TODO: add resize handler
                        }}
                    />
                </>
            )}
        </>
    );
};

export default memo(SelectionBox);


SelectionBox.displayName = 'SelectionBox';
