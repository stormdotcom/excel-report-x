import React from "react";
import { Box } from "@mui/material";

const ImageView = ({ isSelected, imageSrc }) => {
    return (
        <Box
            sx={{
                border: isSelected ? "2px solid blue" : "2px solid transparent",
                borderRadius: "8px",
                boxShadow: isSelected ? "0 0 10px rgba(0, 0, 255, 0.5)" : "none",
                padding: "2px",
                display: "inline-block"
            }}
        >
            <img src={imageSrc} alt="Selected" style={{ width: "210px", borderRadius: "inherit" }} />
        </Box>
    );
};

export default ImageView;
