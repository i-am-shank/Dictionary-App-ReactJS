import "./Meaning.css";

import { Box, Typography } from "@mui/material";

export default function Meaning(props) {
    const meaning = props.data;

    return (
        <div>
            <Box className="meaning-box">
                <Typography
                    color="GrayText"
                    variant="subtitle1"
                    className="pos"
                >
                    {meaning.partOfSpeech}
                </Typography>
                <Typography>
                    <div>
                        {meaning.definitions.map((def, index) => {
                            return (
                                <Typography
                                    color="GrayText"
                                    variant="body2"
                                    key={index}
                                    sx={{ my: 1 }}
                                >
                                    {meaning.definitions.length > 1 &&
                                        `${index + 1}. `}
                                    {def.definition}
                                    <span className="example">
                                        {Object.keys(def).includes("example") &&
                                            def.example !== "" &&
                                            ` Example : ${def.example}`}
                                    </span>
                                </Typography>
                            );
                        })}
                    </div>
                </Typography>
            </Box>
        </div>
    );
}
