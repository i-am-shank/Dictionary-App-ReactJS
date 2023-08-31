import { ArrowBack } from "@mui/icons-material";
import "./BookmarkPage.css";

import { Stack, IconButton, Typography, Box } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

export default function BookmarkPage({ bookmarks }) {
    const navigate = useNavigate();

    return (
        <div>
            <Stack
                direction="row"
                alignItems="center"
                className="bookmark-heading"
            >
                <IconButton
                    sx={{ color: "black", mx: 1 }}
                    onClick={() => navigate(-1)}
                >
                    <ArrowBack />
                </IconButton>
                <Typography variant="h6">Bookmarks</Typography>
            </Stack>

            <div>
                {Object.keys(bookmarks).length !== 0 ? (
                    Object.keys(bookmarks).map((bm, idx) => {
                        return (
                            <NavLink to={`/search/${bm}`}>
                                <Box key={idx} className="bookmark-box">
                                    {bm}
                                </Box>
                            </NavLink>
                        );
                    })
                ) : (
                    <Typography align="center" color="GrayText" sx={{ mt: 4 }}>
                        No Bookmarks
                    </Typography>
                )}
            </div>
        </div>
    );
}
