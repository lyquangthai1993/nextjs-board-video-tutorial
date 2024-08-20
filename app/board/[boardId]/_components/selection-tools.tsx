"use client";

import {Camera, Color} from "@/types/canvas";
import {memo} from "react";
import ColorPicker from "@/app/board/[boardId]/_components/color-picker";
import {useMutation, useSelf} from "@liveblocks/react";
import {useSelectionBounds} from "@/hooks/use-selection-bounds";


interface SelectionToolsProps {
    camera: Camera;
    setLastUsedColor: (color: Color) => void;
}

const SelectionTools = ({
                            camera,
                            setLastUsedColor
                        }: SelectionToolsProps) => {
    const selection = useSelf(me => me.presence.selection);

    const setFill = useMutation((
        {storage},
        fill: Color
    ) => {
        const liveLayers = storage.get('layers');
        setLastUsedColor(fill);

        selection?.forEach((layerId) => {
            liveLayers.get(layerId)?.set('fill', fill);
        })
    }, [selection, setLastUsedColor]);

    const selectionBounds = useSelectionBounds();

    if (!selectionBounds) {
        return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
        <div className={'absolute p-3 rounded-xl bg-white shadow-sm border flex select-none'}
             style={{
                 transform: `translate(
                            calc(${x}px - 50%),
                            calc(${y - 16}px - 100%)
                            `
             }}
        >
            <ColorPicker onChange={setFill}/>
        </div>
    );
};

export default memo(SelectionTools);
