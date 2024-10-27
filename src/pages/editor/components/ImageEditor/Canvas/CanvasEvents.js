/* eslint-disable no-case-declarations */
/* eslint-disable no-use-before-define */
import { drawShapes } from "../../utils/render";
import { createShape } from "../../utils/shapes";

export const handleMouseDown = (e, canvasRef, setCurrentShape, setIsDrawing, setIsResizing, setIsDragging, setStartX, setStartY, setHoveredHandle, shapes, canvasScale) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / canvasScale;
    const y = (e.clientY - rect.top) / canvasScale;

    const clickedHandle = getHandleAtPosition(x, y, shapes, canvasScale);
    if (clickedHandle) {
        setHoveredHandle(clickedHandle);
        setIsResizing(true);
        return;
    }

    const clickedShape = shapes.find(shape => {
        if (shape.type === "circle") {
            const dist = Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2);
            return dist <= shape.radius;
        } else if (shape.type === "rect" || shape.type === "roundedRect") {
            return x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height;
        }
        return false;
    });

    if (clickedShape) {
        setCurrentShape(clickedShape);
        setIsDragging(true);
        setStartX(x);
        setStartY(y);
    } else {
        setCurrentShape(null);
        setStartX(x);
        setStartY(y);
        setIsDrawing(true);
    }
};

export const handleMouseMove = (e, canvasRef, context, imageRef, shapes, currentShape, setShapes, setCurrentShape, startX, startY, setHoveredHandle, hoveredHandle, setIsDragging, setIsResizing, color, selectedShape, isDrawing, isDragging, isResizing, canvasScale, setStartX, setStartY, currentColor) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / canvasScale;
    const y = (e.clientY - rect.top) / canvasScale;

    if (isDrawing) {
        drawShapes(context, shapes, imageRef.current, currentShape, canvasScale, currentColor);
        context.strokeStyle = color;
        context.lineWidth = 2 / canvasScale;
        context.setLineDash([5, 3]);
        switch (selectedShape) {
            case "circle":
                const radius = Math.sqrt((x - startX) ** 2 + (y - startY) ** 2);
                context.beginPath();
                context.arc(startX, startY, radius, 0, 2 * Math.PI);
                context.stroke();
                break;
            case "rect":
                context.strokeRect(startX, startY, x - startX, y - startY);
                break;
            case "roundedRect":
                context.beginPath();
                context.moveTo(startX + 20, startY);
                context.lineTo(startX + (x - startX) - 20, startY);
                context.quadraticCurveTo(startX + (x - startX), startY, startX + (x - startX), startY + 20);
                context.lineTo(startX + (x - startX), startY + (y - startY) - 20);
                context.quadraticCurveTo(startX + (x - startX), startY + (y - startY), startX + (x - startX) - 20, startY + (y - startY));
                context.lineTo(startX + 20, startY + (y - startY));
                context.quadraticCurveTo(startX, startY + (y - startY), startX, startY + (y - startY) - 20);
                context.lineTo(startX, startY + 20);
                context.quadraticCurveTo(startX, startY, startX + 20, startY);
                context.stroke();
                break;
            default:
                break;
        }
    } else if (isDragging && currentShape) {
        const dx = x - startX;
        const dy = y - startY;
        const updatedShapes = shapes.map(shape => {
            if (shape.id === currentShape.id) {
                return { ...shape, x: shape.x + dx, y: shape.y + dy };
            }
            return shape;
        });
        setShapes(updatedShapes);
        setStartX(x);
        setStartY(y);
    } else if (isResizing && hoveredHandle && currentShape) {
        const updatedShapes = shapes.map(shape => {
            if (shape.id === currentShape.id) {
                switch (shape.type) {
                    case "circle":
                        return { ...shape, radius: Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2) };
                    case "rect":
                    case "roundedRect":
                        return {
                            ...shape,
                            width: hoveredHandle.includes("right") ? x - shape.x : shape.width,
                            height: hoveredHandle.includes("bottom") ? y - shape.y : shape.height
                        };
                    default:
                        return shape;
                }
            }
            return shape;
        });
        setShapes(updatedShapes);
    } else {
        const handle = getHandleAtPosition(x, y, shapes, canvasScale);
        setHoveredHandle(handle);
        if (handle) {
            canvasRef.current.style.cursor = "nwse-resize";
        } else {
            canvasRef.current.style.cursor = "crosshair";
        }

        const hoveredShape = shapes.find(shape => {
            if (shape.type === "circle") {
                const dist = Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2);
                return dist <= shape.radius;
            } else if (shape.type === "rect" || shape.type === "roundedRect") {
                return x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height;
            }
            return false;
        });

        if (hoveredShape && (!currentShape || hoveredShape.id !== currentShape.id)) {
            setCurrentShape(hoveredShape);
        }
    }
};


export const handleMouseUp = (e, canvasRef, setIsDrawing, setIsDragging, setIsResizing, setHoveredHandle, shapes, setShapes, startX, startY, color, selectedShape, canvasScale, isDrawing, selectedLabel) => {
    if (isDrawing) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / canvasScale;
        const y = (e.clientY - rect.top) / canvasScale;

        const newShape = createShape(selectedShape, startX, startY, x, y, color, selectedLabel);
        setShapes(newShape);
        setIsDrawing(false);
    } else {
        setIsDragging(false);
        setIsResizing(false);
        setHoveredHandle(null);
    }
};


const getHandleAtPosition = (x, y, shapes, canvasScale) => {
    const handleSize = 8 / canvasScale;
    for (const shape of shapes) {
        if (shape.type === "circle") {
            if (x >= shape.x + shape.radius - handleSize / 2 && x <= shape.x + shape.radius + handleSize / 2 &&
                y >= shape.y - handleSize / 2 && y <= shape.y + handleSize / 2) {
                return "circle-handle";
            }
        } else if (shape.type === "rect" || shape.type === "roundedRect") {
            if (x >= shape.x - handleSize / 2 && x <= shape.x + handleSize / 2 &&
                y >= shape.y - handleSize / 2 && y <= shape.y + handleSize / 2) {
                return "top-left";
            }
            if (x >= shape.x + shape.width - handleSize / 2 && x <= shape.x + shape.width + handleSize / 2 &&
                y >= shape.y - handleSize / 2 && y <= shape.y + handleSize / 2) {
                return "top-right";
            }
            if (x >= shape.x - handleSize / 2 && x <= shape.x + handleSize / 2 &&
                y >= shape.y + shape.height - handleSize / 2 && y <= shape.y + shape.height + handleSize / 2) {
                return "bottom-left";
            }
            if (x >= shape.x + shape.width - handleSize / 2 && x <= shape.x + shape.width + handleSize / 2 &&
                y >= shape.y + shape.height - handleSize / 2 && y <= shape.y + shape.height + handleSize / 2) {
                return "bottom-right";
            }
        }
    }
    return null;
};

export const handleResize = (setIsWindowTooSmall, resizeCanvas, canvasRef, imageRef, context, shapes, currentShape, canvasScale) => {
    const isTooSmall = window.innerWidth < 900 || window.innerHeight < 500;
    setIsWindowTooSmall(isTooSmall);
    if (!isTooSmall && canvasRef.current && imageRef.current) {
        resizeCanvas(canvasRef, imageRef, context, shapes, currentShape, canvasScale);
    }
};

export const resizeCanvas = (canvasRef, imageRef, context, shapes, currentShape, canvasScale) => {
    const canvas = canvasRef.current;
    if (canvas && imageRef.current) {
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight * 0.8;

        const aspectRatio = imageRef.current.width / imageRef.current.height;
        let newWidth = containerWidth * canvasScale;
        let newHeight = containerHeight * canvasScale;

        if (newWidth / aspectRatio > newHeight) {
            newWidth = newHeight * aspectRatio;
        } else {
            newHeight = newWidth / aspectRatio;
        }

        const scale = newWidth / imageRef.current.width;

        canvas.width = newWidth;
        canvas.height = newHeight;

        drawShapes(context, shapes, imageRef.current, currentShape, scale);
    }
};
