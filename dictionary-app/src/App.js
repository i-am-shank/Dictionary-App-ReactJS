import "./App.css";
import BookmarkPage from "./components/Bookmarks/BookmarkPage";
import DefinitionPage from "./components/Definition/DefinitionPage";
import HomePage from "./components/Home/HomePage";

// Import the theme, i.e. overrided properties
import ourTheme from "./theme";

// theme imported --> now for consuming it :-
import { ThemeProvider, CssBaseline, Grid } from "@mui/material";

import { Route, Routes } from "react-router-dom";

// Hooks ===========================

import { useContext } from "react";
import { Context1 } from "./contexts/Context1";

function App() {
    const { bookmarks, addBookmark, removeBookmark } = useContext(Context1);

    return (
        // Entire App is wrapped inside theme-provider
        // After adding CssBaseline-component --> styling changed (default background color is changed)

        <ThemeProvider theme={ourTheme}>
            <CssBaseline />
            <Grid container>
                <Grid item xs={12} sx={{ p: 2 }}>
                    <Routes>
                        <Route index element={<HomePage />} />
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/bookmarks"
                            element={<BookmarkPage bookmarks={bookmarks} />}
                        />
                        {/* In url.. ":----" , after colon any string can be replaced, which can be accessible through useParams react hook. */}
                        <Route
                            path="/search/:word"
                            element={
                                <DefinitionPage
                                    bookmarks={bookmarks}
                                    addBookmark={addBookmark}
                                    removeBookmark={removeBookmark}
                                />
                            }
                        />
                    </Routes>
                </Grid>
            </Grid>

            <div className="App"></div>
        </ThemeProvider>
    );
}

export default App;
