import {RectangleLayer} from "@/types/canvas";
import {rgbToHexColor} from "@/lib/utils";

interface ReactangleProps {
    id: string;
    layer: RectangleLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
}

const Rectangle = ({
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
        <rect
            className={'drop-shadow-md'}
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                transform: `translate(${layer.x}px, ${layer.y}px)`,
            }}
            x={0}
            y={0}
            width={width}
            height={height}
            strokeWidth={'2px'}
            fill={fill ? rgbToHexColor(fill) : '#000'}
            stroke={selectionColor || 'transparent'}
        />
    );
};

export default Rectangle;
