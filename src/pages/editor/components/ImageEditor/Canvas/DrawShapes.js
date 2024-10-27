import { hexToRgba } from "../../utils/render";

/* eslint-disable no-use-before-define */
export const drawShapes = (context, shapes, image, currentShape, scale, currentColor) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.save();
    context.scale(scale, scale);

    if (image) {
        context.drawImage(image, 0, 0, context.canvas.width / scale, context.canvas.height / scale);
    }

    shapes.forEach(shape => {
        context.strokeStyle = shape.color;
        context.lineWidth = (currentShape && currentShape.id === shape.id) ? 4 / scale : 3 / scale;
        context.fillStyle = hexToRgba(shape.color, 0.5);
        context.setLineDash([]);
        if (shape.type === "circle") {
            context.beginPath();
            context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
            context.stroke();
            context.fill();
        } else if (shape.type === "rect") {
            context.fillRect(shape.x, shape.y, shape.width, shape.height);
            context.strokeRect(shape.x, shape.y, shape.width, shape.height);
        } else if (shape.type === "roundedRect") {
            context.beginPath();
            context.moveTo(shape.x + shape.borderRadius, shape.y);
            context.lineTo(shape.x + shape.width - shape.borderRadius, shape.y);
            context.quadraticCurveTo(shape.x + shape.width, shape.y, shape.x + shape.width, shape.y + shape.borderRadius);
            context.lineTo(shape.x + shape.width, shape.y + shape.height - shape.borderRadius);
            context.quadraticCurveTo(shape.x + shape.width, shape.y + shape.height, shape.x + shape.width - shape.borderRadius, shape.y + shape.height);
            context.lineTo(shape.x + shape.borderRadius, shape.y + shape.height);
            context.quadraticCurveTo(shape.x, shape.y + shape.height, shape.x, shape.y + shape.height - shape.borderRadius);
            context.lineTo(shape.x, shape.y + shape.borderRadius);
            context.quadraticCurveTo(shape.x, shape.y, shape.x + shape.borderRadius, shape.y);
            context.stroke();
            context.fill();
        }
        if (shape.label) {
            context.fillStyle = shape.color;
            context.font = `${10 / scale}px Arial`;
            const labelX = shape.type === "circle" ? shape.x : shape.x + shape.width / 2;
            const labelY = shape.type === "circle" ? shape.y + shape.radius + 15 / scale : shape.y + shape.height + 15 / scale;
            context.fillText(shape.label, labelX, labelY);
        }
    });

    if (currentShape) {
        drawResizeHandles(context, currentShape, scale, currentColor);
    }

    context.restore();
};

const drawResizeHandles = (context, shape, scale, color) => {
    if (!shape) return;
    const handleSize = 8 / scale;
    context.fillStyle = color;
    if (shape.type === "circle") {
        context.fillRect(shape.x + shape.radius - handleSize / 2, shape.y - handleSize / 2, handleSize, handleSize);
    } else if (shape.type === "rect" || shape.type === "roundedRect") {
        context.fillRect(shape.x - handleSize / 2, shape.y - handleSize / 2, handleSize, handleSize);
        context.fillRect(shape.x + shape.width - handleSize / 2, shape.y - handleSize / 2, handleSize, handleSize);
        context.fillRect(shape.x - handleSize / 2, shape.y + shape.height - handleSize / 2, handleSize, handleSize);
        context.fillRect(shape.x + shape.width - handleSize / 2, shape.y + shape.height - handleSize / 2, handleSize, handleSize);
    }
};
