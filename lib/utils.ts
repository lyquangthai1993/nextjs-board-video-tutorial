import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {Camera, Color, Layer, Point, Side, XYWH} from "@/types/canvas";
import React from "react";

const COLORS = [
    '#DC2626',
    '#D97706',
    '#059669',
    '#7C3AED',
    '#DB2777'
];

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function connectionIdToColor(connectionId: number): string {
    return COLORS[connectionId % COLORS.length];
}

export function pointerEventToCanvasPoint(
    e: React.PointerEvent,
    camera: Camera) {
    return {
        x: Math.round(e.clientX) - camera.x,
        y: Math.round(e.clientY) - camera.y
    };
}

export function rgbToHexColor(color: Color) {
    return `#
    ${color.r.toString(16).padStart(2, '0')}
    ${color.g.toString(16).padStart(2, '0')}
    ${color.b.toString(16).padStart(2, '0')}
    `.replace(/\s/g, '');
}

export function resizeBounds(
    bounds: XYWH,
    corner: Side,
    point: Point): XYWH {
    const result = {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height
    };
    console.log('resizeBounds--------', corner);
    if ((corner & Side.Left) === Side.Left) {
        result.x = Math.min(point.x, bounds.x + bounds.width);
        result.width = Math.abs(bounds.x + bounds.width - point.x);
    }

    if ((corner & Side.Right) === Side.Right) {
        result.x = Math.min(point.x, bounds.x);
        result.width = Math.abs(point.x - bounds.x);
    }

    if ((corner & Side.Top) === Side.Top) {
        result.y = Math.min(point.y, bounds.y + bounds.height);
        result.height = Math.abs(bounds.y + bounds.height - point.y);
    }

    if ((corner & Side.Bottom) === Side.Bottom) {
        result.y = Math.min(point.y, bounds.y);
        result.height = Math.abs(point.y - bounds.y);
        console.log('bottom-----------', result);
    }

    return result;
}

export function findIntersectingLayersWithRectangle(
    layerIds: readonly string[],
    layers: ReadonlyMap<string, Layer>,
    a: Point,
    b: Point
) {
    const rect = {
        x: Math.min(a.x, b.x),
        y: Math.min(a.y, b.y),
        width: Math.abs(a.x - b.x),
        height: Math.abs(a.y - b.y)
    };

    const ids = [];

    for (const id of layerIds) {
        const layer = layers.get(id);

        if (layer == null) {
            continue;
        }

        const {x, y, width, height} = layer;

        if (x < rect.x + rect.width &&
            x + width > rect.x &&
            y < rect.y + rect.height &&
            y + height > rect.y) {
            ids.push(id);
        }

    }


    return ids;
}
