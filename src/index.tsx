import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "./store/store";
import React from "react";
import DefaultPage from "./components/pages/default";
import Network from "./core/network";

// Create and append root element if it does not exist.
if (document.getElementById("root") == null) {
    const root: HTMLDivElement = document.createElement("div");

    root.id = "root";
    document.body.appendChild(root);
}

// Startup network listener.
Network.listen("eno1");

// Render.
ReactDOM.render(
    <Provider store={store}>
        <DefaultPage />
    </Provider>,

    document.getElementById("root")
);
