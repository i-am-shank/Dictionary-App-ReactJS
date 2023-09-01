import { Typography, Box } from "@mui/material";
import "./SimilarWords.css";
import { NavLink } from "react-router-dom";

export default function SimilarWords({ isSame, words, pos }) {
    return (
        <Box className="meaning-box">
            <Typography color="GrayText" variant="subtitle1" className="pos">
                {isSame === true ? `Synonyms ` : `Antonyms `}
                <span className="part-of-speech">{`(${pos}) `}</span>
                {`:`}
            </Typography>
            <Typography
                color="GrayText"
                variant="body2"
                sx={{ my: 1, display: "inline" }}
            >
                {words.map((word, index) => {
                    return (
                        <NavLink to={"/search/" + word} key={index}>
                            <span className="word-link">{word}</span>
                            {index !== words.length - 1 && ", "}
                        </NavLink>
                    );
                })}
            </Typography>
        </Box>
    );
}
