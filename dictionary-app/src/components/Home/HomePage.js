import "./HomePage.css";

import { Box, Typography, FilledInput, IconButton } from "@mui/material";

// Box --> this component is same as a plain div component, except the provided props, used to style the component
// Typography --> used to display the text in the application.
// FilledInput --> used for the input html-component
// IconButton, Button --> are just buttons, with respective use-cases.

import { Search, Bookmark } from "@mui/icons-material";

import dictimage from "../../assets/book.png";

// Hooks ===================================
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    // For the text inputted
    const [word, setWord] = useState("");

    // Just to check if word variable is getting update ?
    // console.log(word);

    // To keep rendering the updated text, in the input field, after each change
    // Therefore, called with onChange
    function changeHandler(event) {
        setWord(event.target.value);
    }

    function isAlphabet(ch) {
        if ((ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z")) {
            return true;
        } else {
            return false;
        }
    }

    // To listen enter-key.. after entry in input-field
    function submitHandler(event) {
        // To prevent the default form reload, on submit
        event.preventDefault();
        // console.log("Submitted word is -> " + word);

        // Word Validity Checks :===============

        // removing extra spaces
        const trimmedWord = word.trim().toLowerCase();
        // Check for spaces in between.. invalid word -----------------
        const wordArr = trimmedWord.split(" ");
        if (wordArr.length > 1) {
            console.log("Multiple words");
            return;
        }
        // Check for empty word ..invalid input ------------------
        if (trimmedWord === "") {
            // empty word, just return
            console.log("Empty word");
            return;
        }
        // Check if the entered word has a non-alphabet character .. invalid word ------------------
        for (var i = 0; i < trimmedWord.length; i++) {
            if (!isAlphabet(trimmedWord[i])) {
                console.log("Not an alphabet");
                return;
            }
        }

        // Next task is to, send the user to search-url (which is routed)
        // i.e. '/search/:word'
        navigate(`/search/${trimmedWord}`);
    }

    return (
        <Box className="box">
            <img src={dictimage} alt="ABC" />
            <Typography className="main-heading" variant="h4" color="primary">
                Dictionary
            </Typography>
            <Typography className="home-text" color="GrayText">
                Find meanings and save for quick reference
            </Typography>

            <Box className="input-box">
                <form onSubmit={submitHandler}>
                    <FilledInput
                        value={word}
                        onChange={changeHandler}
                        disableUnderline
                        placeholder="Search word"
                        className="home-input"
                        sx={{
                            "& .MuiFilledInput-input": {
                                p: 2,
                            },
                        }}
                        startAdornment={<Search className="search-icon" />}
                        fullWidth
                    />
                </form>
            </Box>

            <IconButton
                className="bookmark-btn"
                sx={{
                    backgroundColor: "lightpink",
                    borderRadius: 2,
                    p: 2,
                    color: "#fff",
                    background: (theme) => theme.palette.pink,
                    boxShadow: "0px 10px 10px rgba(221, 114, 133, 0.2)",
                }}
                onClick={() => {
                    navigate("/bookmarks");
                }}
            >
                <Bookmark />
            </IconButton>
        </Box>
    );
}
