import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./routes/Routes";
import { ToastContainer } from "react-toastify";

import { Provider } from "react-redux";
import { store } from "./Redux/store";

import reportWebVitals from "./reportWebVitals";

import "./index.css";
import "bulma/css/bulma.css";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Routes />
    <ToastContainer />
  </Provider>
);

reportWebVitals();
