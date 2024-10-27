import { drawShapes } from "../../utils/render";

export const resizeCanvas = (canvasRef, imageRef, context, shapes, currentShape, canvasScale) => {
    const canvas = canvasRef.current;
    if (canvas && imageRef.current) {
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight * 0.8;

        const aspectRatio = imageRef.current.width / imageRef.current.height;
        let newWidth = containerWidth;
        let newHeight = containerHeight;

        if (newWidth / aspectRatio > newHeight) {
            newWidth = newHeight * aspectRatio;
        } else {
            newHeight = newWidth / aspectRatio;
        }

        // Apply canvasScale to the new dimensions
        newWidth *= canvasScale;
        newHeight *= canvasScale;

        canvas.width = newWidth;
        canvas.height = newHeight;

        // Clear the canvas and apply scaling
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.scale(canvasScale, canvasScale);

        drawShapes(context, shapes, imageRef.current, currentShape, canvasScale);
    }
};

export const handleResize = (setIsWindowTooSmall, resize, canvasRef, imageRef, context, shapes, currentShape, canvasScale) => {
    const isTooSmall = window.innerWidth < 900 || window.innerHeight < 500;
    setIsWindowTooSmall(isTooSmall);
    if (!isTooSmall && canvasRef.current && imageRef.current) {
        resize(canvasRef, imageRef, context, shapes, currentShape, canvasScale);
    }
};
