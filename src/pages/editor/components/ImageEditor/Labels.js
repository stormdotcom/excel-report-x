import { Delete, Download, RemoveRedEyeOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { STATE_SLICE_KEY } from "../constants";
import { actions } from "../slice";
import { drawShapes } from "../utils/render";
import { downloadJSON } from "../../../../common/utils";

const Labels = ({ imageRef }) => {
    const dispatch = useDispatch();

    const currentImage = useSelector(state => state[STATE_SLICE_KEY].currentImage);
    const currentShape = useSelector(state => state[STATE_SLICE_KEY].currentShape);
    const labels = useSelector(state => state[STATE_SLICE_KEY].shapes[currentImage]) || [];
    const context = useSelector(state => state[STATE_SLICE_KEY].context);
    const canvasScale = useSelector(state => state[STATE_SLICE_KEY].canvasScale);
    const allLabels = useSelector(state => state[STATE_SLICE_KEY].shapes);
    const handleSelect = (data) => {
        if (data) {
            dispatch(actions.setCurrentShape(data));
        }
    };
    const handleDownload = () => {
        if (allLabels) {
            downloadJSON(allLabels);
        }
    };

    const handleDelete = (l) => {
        dispatch(actions.deleteLabel(l));
        setTimeout(() => {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            drawShapes(context, labels, imageRef.current, currentShape, canvasScale);
        }, 0);
    };
    return (
        <Box sx={{ position: "relative", height: "100vh", display: "flex", flexDirection: "column" }}>
            <div style={{ height: "50px" }}></div>
            <Box sx={{ mt: 1, height: "74vh" }}>
                <Typography sx={{ fontWeight: 700 }}>Labels</Typography>
                <Box sx={{ maxHeight: "70vh", overflowY: "scroll" }}>
                    {labels.map((item, idx) => (
                        <Box
                            onClick={() => handleSelect(item)}
                            key={idx}
                            sx={{
                                border: item.id === currentShape.id ? "2px solid black" : "none",
                                display: "flex",
                                alignItems: "center",
                                borderRadius: "15px",
                                textAlign: "center",
                                "&:hover": {
                                    bgcolor: "grey"
                                },
                                bgcolor: "lightgrey",
                                my: 1,
                                justifyContent: "space-between",
                                px: 2
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: item.id === currentShape.id ? 700 : 400,
                                    "&:hover": {
                                        cursor: "pointer"
                                    },
                                    flexGrow: 1
                                }}
                            >
                                {item.label}
                            </Typography>
                            <Box sx={{ display: "flex" }}>
                                <IconButton onClick={() => handleDelete(item)}>
                                    <Delete />
                                </IconButton>
                                <IconButton>
                                    <RemoveRedEyeOutlined />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box sx={{ width: "100%" }}>
                <Button variant="contained" color="primary" component="span" onClick={handleDownload} startIcon={<Download />}>
                    Download JSON
                </Button>
            </Box>
        </Box>
    );
};

export default Labels;
