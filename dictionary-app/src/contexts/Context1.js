import { useState, useEffect, createContext } from "react";

export const Context1 = createContext();

export default function Context1Provider({ children }) {
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

    const value = { bookmarks, addBookmark, removeBookmark };

    return <Context1.Provider value={value}>{children}</Context1.Provider>;
}
