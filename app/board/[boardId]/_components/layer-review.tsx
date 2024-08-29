"use client";

import {memo} from "react";
import {useStorage} from "@liveblocks/react";
import {LayerType} from "@/types/canvas";
import Rectangle from "@/app/board/[boardId]/_components/layer/rectangle";
import Ellipse from "@/app/board/[boardId]/_components/layer/ellipse";
import Text from "@/app/board/[boardId]/_components/layer/text";
import Path from "@/app/board/[boardId]/_components/layer/path";
import {rgbToHexColor} from "@/lib/utils";

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
                <Ellipse id={id} layer={layer}
                         selectionColor={selectionColor}
                         onPointerDown={(e) => onLayerPointerDown(e, id)}
                />
            );

        case LayerType.Path:
            return (
                <Path
                    key={id}
                    points={layer.points}
                    x={layer.x}
                    y={layer.y}
                    fill={layer.fill ? rgbToHexColor(layer.fill) : 'transparent'}
                    stroke={selectionColor}
                    onPointerDown={(e) => onLayerPointerDown(e, id)}
                />
            );

        case LayerType.Text:
            return (
                <Text id={id} layer={layer}
                      selectionColor={selectionColor}
                      onPointerDown={(e) => onLayerPointerDown(e, id)}
                />
            );

        default:
            console.log("Unknown layer type", layer);
            return null;
    }
};

export default memo(LayerReview);
