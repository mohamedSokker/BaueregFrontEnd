import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Cookies } from "react-cookie";

import { Navbar, Sidebar } from "./components";

import { useNavContext } from "./contexts/NavContext";
import { links } from "./data/Tablesdata";
import "./App.css";
import { socket } from "./socket/socket";
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
import { isUserAllowedCategory } from "./Functions/isUserAllowedCategory";
import { userInfo } from "./Functions/getuserdata";
import { allDataWithName } from "./data/allRoles";

function App() {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const { currentMode, activeMenu, token, usersData, setUsersData, setToken } =
    useNavContext();

  useEffect(() => {
    if (!socket.connected) socket.connect();
  }, [socket, token]);

  useEffect(() => {
    const getUsersData = () => {
      let userData;
      userInfo().then((data) => {
        userData = data;
        if (userData[0].roles.Admin) {
          allDataWithName().then((data1) => {
            let copUserData = userData;
            copUserData[0].roles.Editor = data1;
            setUsersData(copUserData);
          });
        } else {
          setUsersData(userData);
        }
      });
    };
    getUsersData();
  }, [token]);

  useEffect(() => {
    if (!cookies.get("token")) {
      socket.disconnect();
      cookies.remove("token");
      navigate("/Login");
    } else {
      setToken(cookies?.get("token"));
    }
  }, [token]);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <Routes>
        <Route path="/Login" element={<Login />} />
      </Routes>
      <div className="flex w-screen h-screen relative dark:bg-main-dark-bg">
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
          <div className="fixed md:static flex dark:bg-background-logoColor bg-main-bg w-full items-center md:h-[8%] navbar">
            <Navbar />
          </div>

          {/* Main page */}
          <div
            id="Main--Page"
            className=" dark:bg-background-logoColor md:h-[92%] relative"
          >
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
              <Route
                path="/Kanban"
                element={<ManageKanban socket={socket} />}
              />
              <Route
                path="/ManageKanban"
                element={<Kanban socket={socket} />}
              />
              {links.map((item) => {
                return (
                  isUserAllowedCategory(item.name, usersData) && (
                    <Route
                      path={`/${item.name}/:tableName`}
                      element={item.elem}
                    />
                  )
                );
              })}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
