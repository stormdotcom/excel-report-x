/* eslint-disable no-console */
import React, { useEffect } from "react";
import { auth, githubProvider, googleProvider } from "../app/firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { Box, Button, Typography, Grid, Paper } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import logo from "../assets/img/logo1.png";

const SignIn = () => {

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (data) => {
            if (data) {
                localStorage.setItem("user", JSON.stringify(data));
            } else {
                localStorage.removeItem("user");
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLoginGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            localStorage.setItem("user", JSON.stringify(result.user));
            window.location.reload("/");
        } catch (error) {
            console.error("Error during Google login:", error);
        }
    };

    const handleLoginGitHub = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            localStorage.setItem("user", JSON.stringify(result.user));
            window.location.reload("/");
        } catch (error) {
            console.error("Error during GitHub login:", error);
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "91vh" }}>
            <Paper elevation={3} sx={{ padding: 4, maxWidth: 600 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                        <img src={logo} alt="Logo" style={{ width: "100%" }} />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={{ color: "text.primary" }} variant="h4" component="h1" gutterBottom>
                            Sign In
                        </Typography>
                        <Box mt={2}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                startIcon={<GoogleIcon />}
                                onClick={handleLoginGoogle}
                            >
                                Sign in with Google
                            </Button>
                        </Box>
                        <Box mt={2}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                startIcon={<GitHubIcon />}
                                onClick={handleLoginGitHub}
                            >
                                Sign in with GitHub
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default SignIn;
