import { createTheme } from "@mui/material";

export default createTheme({
    // overriding the default configuration variables (different parts of the entire design-system)

    // palette --> everything related to the color
    palette: {
        background: {
            default: "#F1F3F4",
        },
        primary: {
            main: "#14194C",
        },
        pink: "linear-gradient(138.72 deg, #dc8295 0%, #dc687c 95.83%)",
    },
    typography: {
        fontFamily: "Mulish, sans-serif",
        // All the typography components with variant="h4".. has following styling by default
        h4: {
            fontWeight: 800,
        },
        h5: {
            fontWeight: 700,
        },
        h6: {
            fontWeight: 800,
        },
        subtitle1: {
            fontWeight: 800,
        },
    },
    mixins: {
        alignInCenter: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
        },
    },
});
