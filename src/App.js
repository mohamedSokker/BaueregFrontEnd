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
  DataEntry,
} from "./pages";
import RequiredAuth from "./hooks/useAuth";
import PersistLogin from "./components/PersistLogin";
import UnAuthorized from "./pages/UnAuthorized";
import Transportaions from "./pages/Transportaions";
import Vnc from "./pages/Vnc";

function App() {
  const { token, usersData } = useNavContext();

  useEffect(() => {
    if (!socket.connected && token && usersData) {
      socket.connect();
      socket.emit("userName", usersData[0]?.username);
    }
  }, [socket, token, usersData]);

  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/UnAuthorized" element={<UnAuthorized />} />
      <Route element={<RequiredAuth allowedRole={"Dashboard"} />}>
        <Route path="/Vnc/:tableName" element={<Vnc socket={socket} />} />
      </Route>
      <Route element={<PersistLogin />}>
        <Route element={<RequiredAuth allowedRole={"Dashboard"} />}>
          <Route path="/" element={<Dashboard socket={socket} />} />
          <Route path="/Dashboard" element={<Dashboard socket={socket} />} />
        </Route>

        <Route element={<RequiredAuth allowedRole={"Kanban"} />}>
          <Route path="/Kanban" element={<ManageKanban socket={socket} />} />
          <Route path="/ManageKanban" element={<Kanban socket={socket} />} />
        </Route>
        <Route element={<RequiredAuth allowedRole={"Transportations"} />}>
          <Route
            path="/Transportations"
            element={<Transportaions socket={socket} />}
          />
        </Route>
        <Route element={<RequiredAuth allowedRole={"Sites"} />}>
          <Route path="/Sites/:tableName" element={<Locations />} />
        </Route>
        <Route element={<RequiredAuth allowedRole={"Equipments"} />}>
          <Route path="/Equipments/:tableName" element={<Equipments />} />
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
        <Route element={<RequiredAuth allowedRole={"DataEntry"} />}>
          <Route
            path="/DataEntry/:tableName"
            element={<DataEntry socket={socket} />}
          />
        </Route>
        <Route element={<RequiredAuth allowedRole={"Catalogues"} />}>
          <Route path="/Catalogues/:tableName" element={<Catalogues />} />
        </Route>
        <Route element={<RequiredAuth allowedRole={"OilSamples"} />}>
          <Route path="/OilSamples" element={<OilSamples />} />
        </Route>
        <Route element={<RequiredAuth allowedRole={"OilSamplesAnalyzed"} />}>
          <Route path="/OilSamplesAnalyzed" element={<OilSamplesAnalyzed />} />
        </Route>
        <Route element={<RequiredAuth allowedRole={"ManageUsers"} />}>
          <Route path="/ManageUsers/:tableName" element={<ManageUsers />} />
        </Route>
        <Route element={<RequiredAuth allowedRole={"ManageAppUsers"} />}>
          <Route
            path="/ManageAppUsers/:tableName"
            element={<ManageAppUsers />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
