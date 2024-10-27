import React from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box, Button } from "@mui/material";
import { Image as ImageIcon } from "@mui/icons-material";

import { verifyFiles } from "../../utils/imageUtils";
import { actions } from "../../slice";
import { useFileContext } from "../../../../../app/FileContext";

const ImageUploader = () => {
    const dispatch = useDispatch();
    const { addFile } = useFileContext();
    const handleImage = (e) => {
        let files = e.target.files;
        if (files && files.length > 0) {
            const results = verifyFiles(files);

            results.forEach(result => {
                if (result.isVerified) {
                    const id = result.id;
                    addFile(id, result.file);
                    dispatch(actions.addImage({ id, name: result.file.name }));
                } else {
                    toast.error(result.message);
                }
            });
            const firstImage = results[0].id;
            dispatch(actions.setCurrentImage(firstImage));
        }
    };

    return (
        <Box >
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImage}
                style={{ display: "none" }}
                id="image-uploader-input"
            />
            <label htmlFor="image-uploader-input">
                <Button variant="contained" color="primary" component="span" startIcon={<ImageIcon />}>
                    Add More
                </Button>
            </label>
            <ToastContainer />
        </Box>
    );
};

export default ImageUploader;
