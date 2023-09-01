import "./DefinitionPage.css";
import axios from "axios";

// Fetch the meaning from API, of word in url
// And display it in this component...

import {
    Stack,
    Typography,
    Box,
    IconButton,
    Divider,
    CircularProgress,
    useTheme,
    Button,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

// Hooks ===============================

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

// Components ================================

import Meaning from "./Meaning";
import SimilarWords from "./SimilarWords";
import titles from "../../titles";
import { Helmet } from "react-helmet";

export default function DefinitionPage({
    bookmarks,
    addBookmark,
    removeBookmark,
}) {
    const { word } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

    // API :===================================

    // API used : https://dictionaryapi.dev/

    // baseUrl + [word]  =  This url will return the response, having meaning.

    // Audio  :  "res[i].   get a non-""   (phonetics[i].audio)"

    // Part-of-speech  :  "res[i].meanings[i].partOfSpeech"

    // Meanings  :  "res[i].meanings[i].definitions[i].definition"
    // Examples  :  "res[i].meanings[i].definitions[i].example"

    // Synonyms  :  "res[i].meanings[i].synonyms[i]"
    // Antonyms  :  "res[i].meanings[i].antonyms[i]"

    const [definitions, setDefinitions] = useState([]);
    const [loading, setLoading] = useState(true);
    // As the page loads, by default loading = true
    const [resultExist, setResultExist] = useState(true);
    const [audio, setAudio] = useState(null);

    const updateState = (data) => {
        const datapoints = data;
        setDefinitions(datapoints);
        setLoading(false);
        // console.log("definitions : ", definitions);
        if (datapoints[0].phonetics.length !== 0) {
            // has something in audio
            var audioUrl = datapoints[0].phonetics[0].audio;
            var phonetics = datapoints[0].phonetics;
            for (var i = 0; i < phonetics.length; i++) {
                if (phonetics[i].audio !== "") {
                    audioUrl = phonetics[i].audio;
                }
            }
            audioUrl.replace("//ssl", "https://ssl");
            if (audioUrl !== "") {
                var audioObj = new Audio(audioUrl);
                // Now just need to play the audio, when needed, so updating the audio state.
                setAudio(audioObj);
            }
        }
    };

    async function fetchData() {
        try {
            let apiurl = `${baseUrl}${word}`;
            const res = await axios.get(apiurl);
            await updateState(res.data);
        } catch (err) {
            setLoading(false);
            setResultExist(false);
        }
    }

    // Bookmark functionality ------------------
    const isBookmarked = Object.keys(bookmarks).includes(word);

    // The fetchData function is called only for 1st render.
    useEffect(() => {
        setResultExist(true);
        window.scrollTo(0, 0);
        setLoading(true);
        if (isBookmarked === false) {
            // word is not bookmarked, only then we need to search fetch the data
            fetchData();
        } else {
            // get the definition from local storage, where it is already stored.
            console.log("Word = ", word);
            console.log(localStorage.getItem[word]);
            updateState(bookmarks[word]);
        }
    }, [location]);

    const theme = useTheme();

    // console.log("Bookmarks :", bookmarks);

    if (loading === true) {
        return (
            <Box className="loader-box" sx={{ ...theme.mixins.alignInCenter }}>
                <CircularProgress />
            </Box>
        );
    } else {
        if (resultExist !== true) {
            return (
                <Box sx={{ ...theme.mixins.alignInCenter }}>
                    <Helmet>
                        <title>{titles.ErrorPage}</title>
                    </Helmet>
                    <Typography className="error-msg" sx={{ mb: 1 }}>
                        Word not found
                    </Typography>
                    <Button
                        variant="contained"
                        className="back-btn"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Go back
                    </Button>
                </Box>
            );
        } else {
            return (
                <div className="definition-wrapper">
                    <Helmet>
                        <title>{`${word[0].toUpperCase()}${word.slice(
                            1
                        )} (meaning)`}</title>
                    </Helmet>
                    <Stack
                        className="icon-stack"
                        direction="row"
                        justifyContent="space-between"
                    >
                        <IconButton
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            <ArrowBackIcon className="icon" />
                        </IconButton>

                        <IconButton
                            onClick={() => {
                                if (isBookmarked) {
                                    removeBookmark(word);
                                } else {
                                    addBookmark(word, definitions);
                                }
                            }}
                        >
                            <span>
                                {isBookmarked ? (
                                    <BookmarkIcon className="icon" />
                                ) : (
                                    <BookmarkBorderIcon className="icon" />
                                )}
                            </span>
                        </IconButton>
                    </Stack>

                    <Stack direction="row" className="word-stack">
                        <Typography variant="h5" className="definition-word">
                            {word}
                        </Typography>
                        <span>
                            {audio !== null && (
                                <IconButton
                                    className="play-btn"
                                    sx={{
                                        backgroundColor: "lightpink",
                                        borderRadius: 2,
                                        p: 1,
                                        color: "#fff",
                                        background: (theme) =>
                                            theme.palette.pink,
                                    }}
                                    onClick={() => audio.play()}
                                >
                                    <PlayArrowIcon />
                                </IconButton>
                            )}
                        </span>
                    </Stack>

                    {/* Map definition-array  -->  then map meanings-array */}
                    <div>
                        {definitions.map((def, index) => {
                            return (
                                <Fragment key={index}>
                                    <span>
                                        {index !== 0 && (
                                            <Divider sx={{ my: 3 }} />
                                        )}
                                    </span>
                                    <span>
                                        {def.phonetic !== "" && (
                                            <Box className="meaning-box">
                                                <Typography
                                                    variant="subtitle1"
                                                    className="phonetic"
                                                >
                                                    {def.phonetic}
                                                </Typography>
                                            </Box>
                                        )}
                                    </span>

                                    <span>
                                        {def.meanings.map((meaning, idx) => {
                                            return (
                                                <p key={idx}>
                                                    <Meaning data={meaning} />
                                                    <p>
                                                        {meaning.synonyms
                                                            .length > 0 && (
                                                            <SimilarWords
                                                                isSame={true}
                                                                words={
                                                                    meaning.synonyms
                                                                }
                                                            />
                                                        )}
                                                    </p>
                                                    <div>
                                                        {meaning.antonyms
                                                            .length > 0 && (
                                                            <SimilarWords
                                                                isSame={false}
                                                                words={
                                                                    meaning.antonyms
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                </p>
                                            );
                                        })}
                                    </span>
                                </Fragment>
                            );
                        })}
                    </div>
                </div>
            );
        }
    }
}
