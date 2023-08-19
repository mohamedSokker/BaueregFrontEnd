// import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Cookies } from "react-cookie";

import { Navbar, Sidebar } from "./components";

import { logoColor } from "./BauerColors";
import { useNavContext } from "./contexts/NavContext";
import { links } from "./data/Tablesdata";
import "./App.css";
import { socket } from "./socket/socket";
// import { usersData } from "./data/Tablesdata";
import {
  Dashboard,
  ManageKanban,
  Kanban,
  Login,
  Orders,
  OilSamples,
  OilSamplesAnalyzed,
} from "./pages";
import Voice from "./Voice/Voice";
import Voice1 from "./Voice/Voice1";
import Video from "./Video/Video";
import { userInfo } from "./Functions/getuserdata";
import { useEffect, useState } from "react";
// import io from "socket.io-client";

import { allDataWithName } from "./data/allRoles";

function App() {
  const navigate = useNavigate();

  const {
    currentMode,
    activeMenu,
    setCurrentMode,
    setActiveMenu,
    themeSettings,
    setThemeSettings,
    isUserAllowedCategory,
    screenSize,
    token,
    usersData,
  } = useNavContext();

  useEffect(() => {
    const onConnect = () => {
      socket.connect();
    };

    const onDisconnect = () => {
      socket.disconnect();
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const cookies = new Cookies();

  useEffect(() => {
    if (!cookies.get("token")) {
      navigate("/Login");
    }
  }, []);

  if (!cookies.get("token")) {
    return <Login />;
  }
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/Login" element={<Login />} />
      </Routes>
      <div className="flex w-screen h-screen relative dark:bg-main-dark-bg">
        {/* Settings bar */}
        {/* <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              className="text-xl hover:drop-shadow-md p-3 hover:bg-light-gray text-white"
              style={{
                backgroundColor: logoColor,
                borderRadius: "50%",
              }}
              onClick={() => setThemeSettings(!themeSettings)}
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div> */}

        {/* Sidebar */}
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-logoColor bg-white animate-slide-in">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-logoColor animate-slide-out">
            <Sidebar />
          </div>
        )}

        {/* Navbar + MainPage */}
        <div
          className={`dark:bg-background-logoColor bg-main-bg min-h-screen w-full ${
            activeMenu ? "md:ml-72 Window--Page" : "flex-2"
          }`}
        >
          {/* Navbar */}
          <div className="fixed md:static dark:bg-background-logoColor bg-main-bg w-full navbar">
            <Navbar />
          </div>

          {/* Main page */}
          <div id="Main--Page" className=" dark:bg-background-logoColor">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Orders" element={<Orders />} />
              <Route path="/OilSamples" element={<OilSamples />} />
              <Route
                path="/OilSamplesAnalyzed"
                element={<OilSamplesAnalyzed />}
              />
              <Route path="/Voice" element={<Voice />} />
              <Route path="/Voice1" element={<Voice1 />} />
              <Route path="/Video" element={<Video />} />
              <Route path="/Kanban" element={<ManageKanban />} />
              <Route path="/ManageKanban" element={<Kanban />} />
              {links.map((item) => {
                return (
                  isUserAllowedCategory(item.name, usersData) && (
                    // usersData[0]?.roles?.User[item.name].map((cat) => (
                    <Route
                      path={`/${item.name}/:tableName`}
                      element={item.elem}
                    />
                  )
                  // ))
                );
              })}
              {/* {links.map((item) => {
                return (
                  isUserAllowedCategory(item.name) &&
                  usersData[0]?.roles?.Editor[item.name].map((cat) => (
                    <Route
                      path={`/${item.name}/:tableName`}
                      element={item.elem}
                    />
                  ))
                );
              })} */}
            </Routes>
          </div>
        </div>
      </div>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
