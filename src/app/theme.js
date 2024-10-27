// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#5a2989"
        },
        secondary: {
            main: "#c2a8e6"
        },
        background: {
            default: "#f4f4f4"
        },
        text: {
            primary: "#2c2c2c",
            secondary: "#5a2989"
        },
        accent: {
            main: "#a566ff"
        },
        muted: {
            main: "#d1c4e9"
        }
    }
});

export default theme;
