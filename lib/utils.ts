import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {Camera, Color} from "@/types/canvas";
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
