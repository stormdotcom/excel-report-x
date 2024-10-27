import _ from "lodash";
import { createSlice } from "@reduxjs/toolkit";
import * as ACTIONS from "./actionTypes";
import data from "../../../data.json";
const initialValues = {
    selectedLabel: "some value",
    selectedColor: "#3357FF",
    selectedShapeType: "rect",
    currentShape: {},
    shapeTypes: data.shapeTypes,
    shapes: {},
    isDrawing: false,
    isResizing: false,
    isDragging: false,
    isLoading: false,
    error: null,
    context: {},
    canvasScale: 1,
    imageList: [],
    currentImage: 0,
    uploadImagePopup: true
};

const slice = createSlice({
    name: "example",
    initialState: initialValues,
    reducers: {
        setSelectedLabel: (state, action) => {
            state.selectedLabel = action.payload;
        },
        setImageUploadPopUp: (state, action) => {
            state.uploadImagePopup = action.payload;
        },
        setSelectedColor: (state, action) => {
            state.selectedColor = action.payload;
        },
        setCurrentShape: (state, action) => {
            state.currentShape = action.payload;
        },
        setShapes: (state, action) => {
            const imgId = state.currentImage;
            if (!state.shapes[imgId]) {
                state.shapes[imgId] = [];
            }
            state.shapes[imgId].push(action.payload);
        },
        setIsDrawing: (state, action) => {
            state.isDrawing = action.payload;
        },
        setIsResizing: (state, action) => {
            state.isResizing = action.payload;
        },
        setIsDragging: (state, action) => {
            state.isDragging = action.payload;
        },
        setShapeType: (state, action) => {
            state.selectedShapeType = action.payload;
        },
        setCanvasScale: (state, action) => {
            state.canvasScale = action.payload;
        },
        setContext: (state, action) => {
            state.context = action.payload;
        },
        deleteLabel: (state, { payload }) => {
            const currentShapes = _.get(state.shapes, state.currentImage, []);
            const updatedShapes = currentShapes.filter(item => payload.id !== item.id);
            _.set(state.shapes, state.currentImage, updatedShapes);
        },
        addImage(state, action) {
            state.imageList.push({ id: action.payload.id, name: action.payload.name });
        },
        removeImage(state, action) {
            state.imageList = state.imageList.filter(image => image.id !== action.payload.id);
        },
        setCurrentImage: (state, action) => {
            state.currentImage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(ACTIONS.LOAD_SHAPES_REQUEST, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(ACTIONS.LOAD_SHAPES_SUCCESS, (state, action) => {
                state.isLoading = false;
                state.shapes = action.payload;
            })
            .addCase(ACTIONS.LOAD_SHAPES_FAILURE, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

// Export actions and reducer
const { actions, reducer } = slice;
export { actions };
export default reducer;
