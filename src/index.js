import React from "react";
import ReactDOM from "react-dom";
// import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/NavContext";

ReactDOM.render(
  <Router>
    <ContextProvider>
      {/* <CookiesProvider> */}
      <App />
      {/* </CookiesProvider> */}
    </ContextProvider>
  </Router>,
  document.getElementById("root")
);
