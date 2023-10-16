import React from "react";
import ReactDOM from "react-dom";
// import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/NavContext";
import { DashboardContextProvider } from "./contexts/DashboardContext";

ReactDOM.render(
  <Router>
    <ContextProvider>
      <DashboardContextProvider>
        {/* <CookiesProvider> */}
        <App />
      </DashboardContextProvider>
      {/* </CookiesProvider> */}
    </ContextProvider>
  </Router>,
  document.getElementById("root")
);
