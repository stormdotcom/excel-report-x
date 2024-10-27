import { v4 as uuidv4 } from "uuid";

export const initialAnnotations = [];

export const createShape = (type, startX, startY, endX, endY, color, selectedLabel) => {
    const shape = { id: uuidv4(), color, label: selectedLabel };
    switch (type) {
        case "circle":
            shape.type = "circle";
            shape.x = startX;
            shape.y = startY;
            shape.radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
            break;
        case "rect":
            shape.type = "rect";
            shape.x = startX;
            shape.y = startY;
            shape.width = endX - startX;
            shape.height = endY - startY;
            break;
        case "roundedRect":
            shape.type = "roundedRect";
            shape.x = startX;
            shape.y = startY;
            shape.width = endX - startX;
            shape.height = endY - startY;
            shape.borderRadius = 20;
            break;
        default:
            break;
    }
    return shape;
};
