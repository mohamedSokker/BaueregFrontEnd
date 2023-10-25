import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import { Navbar, Sidebar } from "./components";

import { useNavContext } from "./contexts/NavContext";
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
  Locations,
  Equipments,
  Stocks,
  EditTables,
  Catalogues,
  ManageUsers,
  ManageAppUsers,
} from "./pages";
import RequiredAuth from "./hooks/useAuth";
import PersistLogin from "./components/PersistLogin";

function App() {
  const { currentMode, activeMenu, token } = useNavContext();

  useEffect(() => {
    if (!socket.connected && token) socket.connect();
  }, [socket, token]);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <Routes>
        <Route path="/Login" element={<Login />} />
      </Routes>
      <div className="flex w-screen h-screen relative dark:bg-main-dark-bg">
        {token &&
          (activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-logoColor bg-white animate-slide-in">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-logoColor animate-slide-out">
              <Sidebar />
            </div>
          ))}

        {/* Navbar + MainPage */}
        <div
          className={`dark:bg-background-logoColor bg-main-bg min-h-screen w-full ${
            activeMenu ? "md:ml-72 Window--Page" : "flex-2"
          }`}
        >
          {/* Navbar */}
          {token && (
            <div className="fixed md:static flex dark:bg-background-logoColor bg-main-bg w-full items-center md:h-[8%] navbar">
              <Navbar />
            </div>
          )}

          {/* Main page */}
          <div
            id="Main--Page"
            className=" dark:bg-background-logoColor md:h-[92%] relative bg-white"
          >
            <Routes>
              <Route element={<PersistLogin />}>
                <Route element={<RequiredAuth allowedRole={"Dashboard"} />}>
                  <Route path="/" element={<Dashboard socket={socket} />} />
                  <Route
                    path="/Dashboard"
                    element={<Dashboard socket={socket} />}
                  />
                </Route>

                <Route element={<RequiredAuth allowedRole={"Kanban"} />}>
                  <Route
                    path="/Kanban"
                    element={<ManageKanban socket={socket} />}
                  />
                  <Route
                    path="/ManageKanban"
                    element={<Kanban socket={socket} />}
                  />
                </Route>
                <Route element={<RequiredAuth allowedRole={"Sites"} />}>
                  <Route path="/Sites/:tableName" element={<Locations />} />
                </Route>
                <Route element={<RequiredAuth allowedRole={"Equipments"} />}>
                  <Route
                    path="/Equipments/:tableName"
                    element={<Equipments />}
                  />
                </Route>
                <Route element={<RequiredAuth allowedRole={"Orders"} />}>
                  <Route path="/Orders/:tableName" element={<Orders />} />
                </Route>
                <Route element={<RequiredAuth allowedRole={"Stocks"} />}>
                  <Route path="/Stocks/:tableName" element={<Stocks />} />
                </Route>
                <Route element={<RequiredAuth allowedRole={"Tables"} />}>
                  <Route
                    path="/Tables/:tableName"
                    element={<EditTables socket={socket} />}
                  />
                </Route>
                <Route element={<RequiredAuth allowedRole={"Catalogues"} />}>
                  <Route
                    path="/Catalogues/:tableName"
                    element={<Catalogues />}
                  />
                </Route>
                <Route element={<RequiredAuth allowedRole={"OilSamples"} />}>
                  <Route path="/OilSamples" element={<OilSamples />} />
                </Route>
                <Route
                  element={<RequiredAuth allowedRole={"OilSamplesAnalyzed"} />}
                >
                  <Route
                    path="/OilSamplesAnalyzed"
                    element={<OilSamplesAnalyzed />}
                  />
                </Route>
                <Route element={<RequiredAuth allowedRole={"ManageUsers"} />}>
                  <Route
                    path="/ManageUsers/:tableName"
                    element={<ManageUsers />}
                  />
                </Route>
                <Route
                  element={<RequiredAuth allowedRole={"ManageAppUsers"} />}
                >
                  <Route
                    path="/ManageAppUsers/:tableName"
                    element={<ManageAppUsers />}
                  />
                </Route>
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
