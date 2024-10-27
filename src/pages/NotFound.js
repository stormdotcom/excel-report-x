// src/pages/NotFound.js
import React from "react";
import { Box, Typography } from "@mui/material";

const NotFound = () => {
    return (
        <Box sx={{ textAlign: "center", marginTop: "20vh" }}>
            <Typography variant="h3">404 - Page Not Found</Typography>
            <Typography variant="body1">The page you are looking for does not exist.</Typography>
        </Box>
    );
};

export default NotFound;
