import React, { useEffect, useState } from "react";
import { resizeCanvas, handleResize } from "./CanvasResize";
import { handleMouseDown, handleMouseMove, handleMouseUp } from "./CanvasEvents";
import { drawShapes } from "./DrawShapes";
import { useDispatch, useSelector } from "react-redux";
import { STATE_SLICE_KEY } from "../../constants";
import { actions } from "../../slice";
import "./Canvas.css";
import { useFileContext } from "../../../../../app/FileContext";

const Canvas = ({ canvasRef, imageRef }) => {
    const dispatch = useDispatch();
    const { fileMap } = useFileContext();
    const [isDrawing, setIsDrawing] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [hoveredHandle, setHoveredHandle] = useState(null);
    const [isWindowTooSmall, setIsWindowTooSmall] = useState(false);

    const currentImage = useSelector(state => state[STATE_SLICE_KEY].currentImage);
    const context = useSelector(state => state[STATE_SLICE_KEY].context);
    const allShape = useSelector(state => state[STATE_SLICE_KEY].shapes);
    const selectedLabel = useSelector(state => state[STATE_SLICE_KEY].selectedLabel);
    const color = useSelector(state => state[STATE_SLICE_KEY].selectedColor);
    const selectedShape = useSelector(state => state[STATE_SLICE_KEY].selectedShapeType);
    const currentShape = useSelector(state => state[STATE_SLICE_KEY].currentShape);
    const canvasScale = useSelector(state => state[STATE_SLICE_KEY].canvasScale);

    const shapes = allShape[currentImage] || [];
    const setCurrentShape = (s) => {
        if (s) {
            dispatch(actions.setCurrentShape(s));
        }
    };
    const setContext = (c) => dispatch(actions.setContext(c));

    const setShapes = (data) => dispatch(actions.setShapes(data));

    useEffect(() => {
        const onResize = () => handleResize(setIsWindowTooSmall, resizeCanvas, canvasRef, imageRef, context, shapes, currentShape, canvasScale);
        window.addEventListener("resize", onResize);
        onResize();

        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, [context, shapes, currentShape, canvasScale]);

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) {
                setContext(ctx);
            }

            const image = new Image();
            const img = fileMap.get(currentImage);
            if (img) {
                image.src = URL.createObjectURL(img); // Correctly use URL.createObjectURL
                image.onload = () => {
                    imageRef.current = image;
                    resizeCanvas(canvasRef, imageRef, ctx, shapes, currentShape, canvasScale);
                    drawShapes(ctx, shapes, imageRef.current, currentShape, canvasScale);
                };
            }
        }
    }, [canvasRef, imageRef, shapes, currentShape, canvasScale, currentImage]);

    return (
        <>
            {isWindowTooSmall ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                    <p>Please resize the window to at least 900 x 500 pixels.</p>
                </div>
            ) : (
                <div className="canvas-container">
                    <canvas
                        ref={canvasRef}
                        style={{ border: "1px solid #ccc", width: "100%", height: "81vh", cursor: "crosshair" }}
                        onMouseDown={(e) => handleMouseDown(e, canvasRef, setCurrentShape, setIsDrawing, setIsResizing, setIsDragging, setStartX, setStartY, setHoveredHandle, shapes, canvasScale)}
                        onMouseMove={(e) => handleMouseMove(e, canvasRef, context, imageRef, shapes, currentShape, setShapes, setCurrentShape, startX, startY, setHoveredHandle, hoveredHandle, setIsDragging, setIsResizing, color, selectedShape, isDrawing, isDragging, isResizing, canvasScale, setStartX, setStartY, color)}
                        onMouseUp={(e) => handleMouseUp(e, canvasRef, setIsDrawing, setIsDragging, setIsResizing, setHoveredHandle, shapes, setShapes, startX, startY, color, selectedShape, canvasScale, isDrawing, selectedLabel)}
                    />
                </div>
            )}
        </>
    );
};

export default Canvas;
