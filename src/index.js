import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import {Provider} from "react-redux";
import store from "./redux/store";
import MazeApp from "./containers/MazeApp";
import './common.css'

const rootEl = document.getElementById("root");

let render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <MazeApp/>
        </Provider>,
        rootEl
    );
};

if (module.hot) {
    module.hot.accept("./containers/MazeApp", () => {
        setTimeout(render);
    });
}

render();
