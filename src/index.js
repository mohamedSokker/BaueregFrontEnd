import React from "react";
import ReactDOM from "react-dom";
// import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/NavContext";
import { DashboardContextProvider } from "./contexts/DashboardContext";

ReactDOM.render(
  <BrowserRouter>
    <ContextProvider>
      <DashboardContextProvider>
        {/* <CookiesProvider> */}
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </DashboardContextProvider>
      {/* </CookiesProvider> */}
    </ContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
