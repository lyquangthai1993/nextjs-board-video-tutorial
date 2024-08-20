import {Roboto} from 'next/font/google';
import {TextLayer} from "@/types/canvas";
import React from "react";
import ContentEditable from "react-contenteditable";
import {cn, rgbToHexColor} from "@/lib/utils";
import {useMutation} from "@liveblocks/react";

const font = Roboto({
    subsets: ['latin'],
    weight: ['400'],
});

interface TextProps {
    id: string;
    layer: TextLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
}

const calculateFontSize = (width: number, height: number) => {
    const maxFontSize = 100;
    const scaleFactor = 0.5;
    const fontSizeBaseONHeight = height * scaleFactor;
    const fontSizeBaseONWidth = width * scaleFactor;

    return Math.min(fontSizeBaseONHeight, fontSizeBaseONWidth, maxFontSize);
};
const Text = ({
                  id,
                  layer,
                  onPointerDown,
                  selectionColor
              }: TextProps) => {

    const updateValue = useMutation((
        {storage,},
        newValue: string
    ) => {
        const liveLayer = storage.get('layers');

        liveLayer.get(id)?.set('value', newValue);

    }, []);

    const {x, y, fill, value, width, height} = layer;
    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                outline: selectionColor ? `1px solid ${selectionColor}` : 'none',

            }}
        >
            <ContentEditable html={value || ''}
                             className={cn(
                                 'h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none',
                                 font.className
                             )}
                             style={{
                                 color: fill ? rgbToHexColor(fill) : '#000',
                                 fontSize: calculateFontSize(width, height),
                             }}
                             onChange={(e) => {
                                 updateValue(e.target.value);
                             }}/>

        </foreignObject>
    );
};

export default Text;
