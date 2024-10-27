import { Box, Grid } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { STATE_SLICE_KEY } from "../../constants";
import ImageView from "./ImageView";
import ImageUploader from "./ImageUploader";
import { useFileContext } from "../../../../../app/FileContext";
import { actions } from "../../slice";

const ImageViewWrapper = () => {
    const dispatch = useDispatch();
    const imageList = useSelector(state => state[STATE_SLICE_KEY].imageList);
    const currentImage = useSelector(state => state[STATE_SLICE_KEY].currentImage);
    const { fileMap } = useFileContext();
    const handleImageSelect = (id) => dispatch(actions.setCurrentImage(id));
    return (
        <Box sx={{ mt: 1, py: 1, px: 2 }}>
            <Box sx={{ border: "1px solid #ccc", height: "87vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Grid container spacing={2} sx={{ mt: 1, maxHeight: "79vh", overflowY: "scroll", display: "flex", flexDirection: "row", flexWrap: "no-wrap", p: 1 }}>
                    {imageList.map(({ id }) => (
                        <Grid item key={id} sx={{ "&:hover": { bgcolor: "lightgrey", cursor: "pointer" }, my: 1, marginX: "auto" }} onClick={() => handleImageSelect(id)}>
                            <ImageView
                                isSelected={currentImage === id}
                                imageSrc={URL.createObjectURL(fileMap.get(id))}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                    <ImageUploader />
                </Box>
            </Box>
        </Box>
    );
};

export default ImageViewWrapper;
