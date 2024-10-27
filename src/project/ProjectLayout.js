import { Box } from "@mui/material";
import React from "react";
import Header from "../common/component/Header";
import { auth } from "../app/firebase";
import Footer from "../common/component/Footer";
const ProjectLayout = ({ children }) => {
    const handleLogout = () => auth.signOut();
    return (
        <Box
            sx={{ minHeight: "100vh", width: 1 }}
        >
            <Header signOut={handleLogout} />
            <Box sx={{ display: "flex", justifyContent: "space-between ", height: "100%", overflowY: "hidden", bgcolor: "#ffff" }}>
                <Box sx={{ flexGrow: 1, overflowX: "auto", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "calc(100vh - 40px) !important ", width: "100%", overflowY: "scroll" }}>
                    <Box sx={{ bgcolor: "white.main", borderRadius: "20px", flexGrow: 1 }}>
                        {children}
                    </Box>
                    <Footer />
                </Box>
            </Box>
        </Box >
    );
};

export default ProjectLayout;
