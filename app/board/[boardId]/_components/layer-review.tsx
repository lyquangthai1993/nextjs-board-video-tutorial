"use client";

import {memo} from "react";
import {useStorage} from "@liveblocks/react";
import {LayerType} from "@/types/canvas";
import Rectangle from "@/app/board/[boardId]/_components/layer/rectangle";

interface LayerReviewProps {
    id: string;
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
}

const LayerReview = ({
                         id,
                         onLayerPointerDown,
                         selectionColor
                     }: LayerReviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    // console.log({
    //     layer
    // }, 'LAYER REVIEW');

    if (!layer) {
        return null;
    }

    switch (layer.type) {
        case LayerType.Rectangle:
            return (
                <Rectangle id={id} layer={layer}
                           selectionColor={selectionColor}
                           onPointerDown={(e) => onLayerPointerDown(e, id)}
                />
            );

        case LayerType.Ellipse:
            return (
                <ellipse
                    cx={layer.x}
                    cy={layer.y}
                    fill={selectionColor || `rgb(${layer.fill.r}, ${layer.fill.g}, ${layer.fill.b})`}
                    onPointerDown={(e) => onLayerPointerDown(e, id)}
                />
            );

        case LayerType.Path:
            return (
                <path
                    d={`M ${layer.points.map(([x, y]) => `${x} ${y}`).join(" L ")}`}
                    fill={selectionColor || `rgb(${layer.fill.r}, ${layer.fill.g}, ${layer.fill.b})`}
                    onPointerDown={(e) => onLayerPointerDown(e, id)}
                />
            );

        case LayerType.Text:
            return (
                <text
                    x={layer.x}
                    y={layer.y}
                    fill={selectionColor || `rgb(${layer.fill.r}, ${layer.fill.g}, ${layer.fill.b})`}
                    onPointerDown={(e) => onLayerPointerDown(e, id)}
                >
                    {layer.value}
                </text>
            );
    }
};

export default memo(LayerReview);
