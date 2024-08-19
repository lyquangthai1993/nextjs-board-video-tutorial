"use client";

import Info from "@/app/board/[boardId]/_components/info";
import Participants from "@/app/board/[boardId]/_components/participants";
import Toolbar from "@/app/board/[boardId]/_components/toolbar";
import {useCanRedo, useCanUndo, useHistory, useMutation, useOthersMapped, useStorage} from "@liveblocks/react";
import React, {useCallback, useMemo, useState} from "react";
import {Camera, CanvasMode, CanvasState, Color, Layer, LayerType, Point, Side, XYWH} from "@/types/canvas";
import CursorsPresense from "@/app/board/[boardId]/_components/cursors-presense";
import {connectionIdToColor, pointerEventToCanvasPoint, resizeBounds} from "@/lib/utils";
import {LiveObject, nanoid} from "@liveblocks/core";
import LayerReview from "@/app/board/[boardId]/_components/layer-review";
import SelectionBox from "@/app/board/[boardId]/_components/selection-box";

const MAX_LAYERS = 1000;

interface CanvasProps {
    boardId: string;
}

const Canvas = ({boardId}: CanvasProps) => {
    const layerIds = useStorage((root) => root.layerIds);

    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    });
    const [camera, setCamera] = useState<Camera>({x: 0, y: 0});
    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 33,
        g: 47,
        b: 187,
    });


    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const insertLayer = useMutation((
        {storage, setMyPresence},
        layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Path | LayerType.Text | LayerType.Note,
        position: Point
    ) => {
        const liveLayers = storage.get('layers');

        if (liveLayers.size >= MAX_LAYERS) {
            return;
        }

        const liveLayerIds = storage.get('layerIds');
        const layerId = nanoid();
        const layer = new LiveObject({
            type: layerType,
            x: position.x,
            y: position.y,
            height: 100,
            width: 100,
            fill: lastUsedColor,
        });


        liveLayerIds.push(layerId);
        liveLayers.set(layerId, layer as LiveObject<Layer>);

        setMyPresence({selection: [layerId]}, {addToHistory: true});

        setCanvasState({
            mode: CanvasMode.None
        });

    }, [lastUsedColor]);

    const translateSelectedLayer = useMutation(
        (
            {storage, self},
            point: Point
        ) => {
            if (canvasState.mode !== CanvasMode.Translating) {
                return;
            }

            const offset = {
                x: point.x - canvasState.current.x,
                y: point.y - canvasState.current.y,
            };

            const liveLayers = storage.get('layers');

            for (const id of self.presence.selection) {
                const layer = liveLayers.get(id);

                if (layer) {
                    layer.update({
                        x: layer.get('x') + offset.x,
                        y: layer.get('y') + offset.y,
                    });
                }
            }

            setCanvasState({
                mode: CanvasMode.Translating,
                current: point
            });
        }, [canvasState]);

    const resizeSelectedLayer = useMutation(
        (
            {storage, self},
            point: Point
        ) => {
            if (canvasState.mode !== CanvasMode.Resizing) {
                return;
            }
            console.log('resizeSelectedLayer', canvasState.corner);

            const bounds = resizeBounds(
                canvasState.initialBounds,
                canvasState.corner,
                point
            );

            const liveLayers = storage.get('layers');
            const layer = liveLayers.get(self.presence.selection[0]);

            if (layer) {
                layer.update(bounds);
            }

        }, [canvasState]);

    const onResizeHandlePointerDown = useCallback((
        corner: Side,
        initialBounds: XYWH
    ) => {
        console.log("resize------ = ", {
            corner,
            initialBounds
        });
        history.pause();
        setCanvasState({
            mode: CanvasMode.Resizing,
            initialBounds,
            corner
        });
    }, [history]);

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((prev) => {
            return {
                x: prev.x - e.deltaX,
                y: prev.y - e.deltaY
            };
        });
    }, []);

    const onPointerMove = useMutation((
        {
            setMyPresence
        },
        e: React.PointerEvent) => {
        e.preventDefault();
        const current = pointerEventToCanvasPoint(e, camera);

        if (canvasState.mode === CanvasMode.Translating) {
            translateSelectedLayer(current);
        } else if (canvasState.mode === CanvasMode.Resizing) {
            resizeSelectedLayer(current);
        }

        setMyPresence({
            cursor: current
        });

    }, [
        camera,
        canvasState,
        resizeSelectedLayer,
        translateSelectedLayer
    ]);

    const onPointerLeave = useMutation((
        {
            setMyPresence
        }) => {
        setMyPresence({
            cursor: null
        });
    }, []);

    const onLayerPointerDown = useMutation((
        {self, setMyPresence},
        e: React.PointerEvent,
        layerId: string
    ) => {
        if (canvasState.mode === CanvasMode.Pencil ||
            canvasState.mode === CanvasMode.Inserting
        ) {
            return;
        }

        history.pause();
        e.stopPropagation();

        const point = pointerEventToCanvasPoint(e, camera);

        if (!self.presence.selection.includes(layerId)) {
            setMyPresence({
                selection: [layerId]
            }, {addToHistory: true});
        }

        setCanvasState({
            mode: CanvasMode.Translating,
            current: point,
        });
    }, [
        camera,
        setCanvasState,
        history,
        canvasState.mode
    ]);

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        const point = pointerEventToCanvasPoint(e, camera);
        if (canvasState.mode === CanvasMode.Inserting) {
            return;
        }

        // TODO: add casse drawing

        setCanvasState({
            origin: point,
            mode: CanvasMode.Pressing
        });

    }, [
        camera,
        canvasState.mode,
        setCanvasState
    ]);

    const onPointerUp = useMutation((
        {},
        e
    ) => {
        const point = pointerEventToCanvasPoint(e, camera);
        // console.log("point = ", point);
        // console.log("canvasState = ", {canvasState});

        if (canvasState.mode === CanvasMode.Inserting) {
            insertLayer(canvasState.layerType, point);
        } else {
            setCanvasState({
                mode: CanvasMode.None
            });
        }

        history.resume();
    }, [
        canvasState,
        camera,
        history,
        insertLayer
    ]);

    const selections = useOthersMapped((others) => others.presence.selection);

    const layerIdsToColorSelection = useMemo(() => {
        const results: Record<string, string> = {};
        for (const user of selections) {
            const [connectionId, selection] = user;

            for (const layerId of selection) {
                results[layerId] = connectionIdToColor(connectionId);
            }
        }

        return results;
    }, [selections]);

    return (
        <main className={'h-full w-full relative bg-neutral-100 touch-none'}>
            <Info boardId={boardId}/>
            <Participants/>
            <Toolbar canvasState={canvasState}
                     setCanvasState={setCanvasState}
                     canUndo={canUndo}
                     canRedo={canRedo}
                     undo={history.undo}
                     redo={history.redo}
            />
            <svg
                className={'h-[100vh] w-[100vw]'}
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                onPointerUp={onPointerUp}
            >
                <g
                    style={{
                        transform: `translate(${camera.x}px, ${camera.y}px)`
                    }}
                >
                    {layerIds?.map((layerId) => {
                        return (
                            <LayerReview
                                key={layerId}
                                id={layerId}
                                selectionColor={layerIdsToColorSelection[layerId]}
                                onLayerPointerDown={onLayerPointerDown}
                            />);
                    })}
                    <CursorsPresense/>
                    <SelectionBox
                        onResizeHandlePointerDown={onResizeHandlePointerDown}
                    />
                </g>
            </svg>
        </main>);
};

export default Canvas;
