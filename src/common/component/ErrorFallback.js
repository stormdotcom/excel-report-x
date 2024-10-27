// src/components/ErrorFallback.js
import React from "react";
import { Box, Typography, Button } from "@mui/material";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <Box sx={{ textAlign: "center", marginTop: "20vh", padding: 3, bgcolor: "background.paper", borderRadius: 2 }}>
            <Typography variant="h4" color="error">Oops! Something went wrong.</Typography>
            <Typography variant="body1" sx={{ margin: "20px 0" }}>
                {error?.message}
            </Typography>
            <Button variant="contained" color="primary" onClick={resetErrorBoundary}>
                Try Again
            </Button>
        </Box>
    );
};

export default ErrorFallback;
