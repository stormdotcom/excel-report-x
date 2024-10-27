import React, { useState } from "react";
import { ColorLens, ZoomIn, ZoomOut } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Select, Menu, MenuItem, IconButton, FormControl, InputLabel, TextField, Grid, Box } from "@mui/material";

import { STATE_SLICE_KEY } from "../constants";
import { actions } from "../slice";
import data from "../../../../data.json";
import { resizeCanvas } from "./Canvas/CanvasResize";
import { drawShapes } from "../utils/render";

const colors = data.colors;

const Toolbar = ({ canvasRef, imageRef }) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const selectedShapeType = useSelector(state => state[STATE_SLICE_KEY].selectedShapeType);
    const shapeTypes = useSelector(state => state[STATE_SLICE_KEY].shapeTypes);
    const selectedLabel = useSelector(state => state[STATE_SLICE_KEY].selectedLabel);
    const selectedColor = useSelector(state => state[STATE_SLICE_KEY].selectedColor);
    const context = useSelector(state => state[STATE_SLICE_KEY].context);
    const currentShape = useSelector(state => state[STATE_SLICE_KEY].currentShape);
    const setSelectedShapeType = (obj) => dispatch(actions.setShapeType(obj));
    const setLabel = (label) => dispatch(actions.setSelectedLabel(label));
    const setColor = (color) => dispatch(actions.setSelectedColor(color));
    const canvasScale = useSelector(state => state[STATE_SLICE_KEY].canvasScale);
    const shapes = useSelector(state => state[STATE_SLICE_KEY].shapes);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const setCanvasScale = (val) => dispatch(actions.setCanvasScale(val));
    const handleClose = (newColor) => {
        setColor(newColor);
        setAnchorEl(null);
    };

    const handleZoom = (direction) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        let newScale = canvasScale;

        if (direction === "in") {
            if (canvasScale < 1.2) {
                newScale *= 1.1;
            }
        } else if (direction === "out") {
            if (canvasScale > 0.9) {
                newScale /= 1.1;
            }
        }

        setCanvasScale(newScale);

        if (context) {
            context.save();
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.translate(centerX, centerY);
            context.scale(newScale, newScale);
            context.translate(-centerX, -centerY);

            resizeCanvas(canvasRef, imageRef, context, shapes, currentShape, newScale);
            drawShapes(context, shapes, imageRef.current, currentShape, newScale);
            context.restore();
        }
    };

    return (
        <Grid container spacing={2} alignItems="center" sx={{ my: 1 }}>
            <Grid item xs={12} md={3}>
                <FormControl variant="outlined" fullWidth sx={{ "& .MuiInputBase-root": { height: 35, fontSize: 12 } }}>
                    <InputLabel sx={{ fontSize: 14 }}>Select shape</InputLabel>
                    <Select
                        value={selectedShapeType}
                        onChange={(e) => setSelectedShapeType(e.target.value)}
                        label="Select shape"
                        sx={{ height: 35, fontSize: 12 }}
                    >
                        {shapeTypes.map((item, idx) => (
                            <MenuItem key={idx} value={item.value}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
                <TextField
                    label="Label"
                    variant="outlined"
                    value={selectedLabel}
                    onChange={(e) => setLabel(e.target.value)}
                    fullWidth
                    sx={{ height: 35, fontSize: 12, "& .MuiInputBase-root": { height: 35, fontSize: 12 } }}
                />
            </Grid>
            <Grid item xs={12} md={3} style={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={handleClick} sx={{ width: 36, height: 36 }}>
                    <ColorLens fontSize="small" style={{ color: "grey", backgroundColor: "white" }} />
                </IconButton>
                <Box sx={{ position: "relative", backgroundColor: selectedColor, width: "12px", height: "12px", borderRadius: "50%" }} />
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                >
                    {colors.map((col) => (
                        <MenuItem key={col} onClick={() => handleClose(col)}>
                            <div style={{ width: "24px", height: "24px", backgroundColor: col, borderRadius: "50%" }} />
                        </MenuItem>
                    ))}
                </Menu>
            </Grid>
            <Grid item xs={12} md={3} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <IconButton onClick={() => handleZoom("in")} sx={{ width: 36, height: 36 }}>
                    <ZoomIn fontSize="small" />
                </IconButton>
                <IconButton onClick={() => handleZoom("out")} sx={{ width: 36, height: 36 }}>
                    <ZoomOut fontSize="small" />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default Toolbar;
