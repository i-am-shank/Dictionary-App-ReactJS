import { Box, Button, Typography, useTheme } from "@mui/material";
import "./ErrorPage.css";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box sx={{ ...theme.mixins.alignInCenter }}>
            <Typography>Word not found</Typography>
            <Button
                variant="contained"
                className="back-btn"
                onClick={() => {
                    navigate("/");
                }}
            >
                Go back
            </Button>
        </Box>
    );
}
