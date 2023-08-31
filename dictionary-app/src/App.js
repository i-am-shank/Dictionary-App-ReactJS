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

import { useState, useEffect } from "react";

function App() {
    // Each time, getting the default bookmarks object, from the local-storage.
    const [bookmarks, setBookmarks] = useState(
        JSON.parse(localStorage.getItem("bookmarks")) || {}
    );
    // For the 1st tiem, when no bookmarks are stored, it will return NULL, so passed {} for that case.

    const addBookmark = (word, definitions) => {
        setBookmarks((oldBookmarks) => ({
            ...oldBookmarks,
            [word]: definitions,
        }));
    };

    const removeBookmark = (word) => {
        const updatedBookmarks = Object.keys(bookmarks)
            .filter((key) => key !== word)
            .reduce((obj, key) => {
                return Object.assign(obj, {
                    [key]: bookmarks[key],
                });
            }, {});
        // get all the entries, except the one corresponding to word.
        setBookmarks(updatedBookmarks);

        // There is another way of deleting a particular entry from JS object :----

        // const updatedBookmarks2 = {...bookmarks};
        // delete updatedBookmarks2[word];
        // setBookmarks(updatedBookmarks2);
    };

    // Following functions executes every time, a bookmark is added/removed.
    useEffect(() => {
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }, [bookmarks]);

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
