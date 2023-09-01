import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import Context1Provider from "./contexts/Context1";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Context1Provider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Context1Provider>
);
