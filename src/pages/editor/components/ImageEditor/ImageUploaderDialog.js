import React from "react";
import { Dialog, DialogActions, DialogContent, Button } from "@mui/material";
import { Image as ImageIcon } from "@mui/icons-material";
import { verifyFiles } from "../utils/imageUtils";
import { useDispatch } from "react-redux";
import { actions } from "../slice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImageUploaderDialog = ({ open, onClose, addFile }) => {
    const dispatch = useDispatch();

    const onUpload = (files) => {
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
    };

    const handleImage = (e) => {
        let files = e.target.files;
        if (files && files.length > 0) {
            onUpload(files);
            onClose();
        }
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    style: {
                        backgroundColor: "#000",
                        color: "#fff",
                        width: "80vw",
                        height: "80vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative"
                    }
                }}
            >

                <DialogContent sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <ImageIcon style={{ fontSize: 200, color: "#C0C0C0" }} />
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImage}
                        style={{ display: "none" }}
                        id="image-uploader-input-dialog"
                    />
                    <label htmlFor="image-uploader-input-dialog">
                        <Button variant="contained" component="span" startIcon={<ImageIcon />} sx={{ bgcolor: "#C0C0C0", color: "#000" }}>
                            Upload Images
                        </Button>
                    </label>
                </DialogContent>
                <DialogActions sx={{ width: "100%", position: "absolute", bottom: 16, display: "flex", justifyContent: "center" }}>

                </DialogActions>
            </Dialog>
            <ToastContainer />
        </>
    );
};

export default ImageUploaderDialog;
