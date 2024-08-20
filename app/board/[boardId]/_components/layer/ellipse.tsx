import {EllipseLayer} from "@/types/canvas";
import {rgbToHexColor} from "@/lib/utils";
import React from "react";

interface ReactangleProps {
    id: string;
    layer: EllipseLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
}

const Ellipse = ({
                       id,
                       layer,
                       onPointerDown,
                       selectionColor
                   }: ReactangleProps) => {
    const {
        x,
        y,
        width,
        height,
        fill,
        value
    } = layer;

    return (
        <ellipse
            className={'drop-shadow-md'}
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                transform: `translate(${layer.x}px, ${layer.y}px)`,
            }}
            cx={width / 2}
            cy={height / 2}
            rx={width / 2}
            ry={height / 2}
            fill={fill ? rgbToHexColor(fill) : '#000'}
            stroke={selectionColor || 'transparent'}
            strokeWidth={1}
        />
    );
};

export default Ellipse;
