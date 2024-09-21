import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./routes/Routes";

import { Provider } from "react-redux";
import { store } from "./Redux/store";

import reportWebVitals from "./reportWebVitals";

import "./index.css";
import "bulma/css/bulma.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Routes />
  </Provider>
);

reportWebVitals();
