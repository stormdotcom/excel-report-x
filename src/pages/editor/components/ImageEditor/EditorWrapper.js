import React, { useEffect, useRef } from "react";
import ImageEditor from "./ImageEditor";
import { Box } from "@mui/material";
import Labels from "./Labels";
import ImageViewWrapper from "./ImageList/ImageViewWrapper";
import { useDispatch, useSelector } from "react-redux";
import { STATE_SLICE_KEY } from "../constants";
import { actions } from "../slice";
import ImageUploaderDialog from "./ImageUploaderDialog";
import { useFileContext } from "../../../../app/FileContext";

const EditorWrapper = () => {
    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const imageList = useSelector(s => s[STATE_SLICE_KEY].imageList);
    const uploadImagePopup = useSelector(s => s[STATE_SLICE_KEY].uploadImagePopup);
    const { addFile } = useFileContext();
    useEffect(() => {
        if (imageList.length < 1) {
            dispatch(actions.setImageUploadPopUp(true));
        }
    }, []);
    const handleClose = () => dispatch(actions.setImageUploadPopUp(false));
    return (
        <div>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "2fr 8fr 2fr",
                    gap: 2,
                    height: "100vh"
                }}
            >
                <Box sx={{ gridColumn: "1 / 2" }}>
                    <ImageViewWrapper />
                </Box>
                <Box sx={{ gridColumn: "2 / 3" }}>
                    <ImageEditor canvasRef={canvasRef} imageRef={imageRef} />
                </Box>
                <Box sx={{ gridColumn: "3 / 4" }}>
                    <Labels imageRef={imageRef} />
                </Box>
            </Box>
            {<ImageUploaderDialog open={uploadImagePopup} onClose={handleClose} addFile={addFile} />}
        </div>

    );
};

export default EditorWrapper;
