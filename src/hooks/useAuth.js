import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useNavContext } from "../contexts/NavContext";
import { Navbar, Sidebar } from "../components";

const RequiredAuth = ({ allowedRole }) => {
  const { usersData, currentMode, activeMenu } = useNavContext();
  const location = useLocation();

  console.log(usersData.length);

  return usersData.length > 0 &&
    (usersData[0]?.roles.Editor[allowedRole] === true ||
      usersData[0]?.roles.Editor[allowedRole].length > 0 ||
      usersData[0]?.roles.User[allowedRole] === true ||
      usersData[0]?.roles.User[allowedRole].length > 0) ? (
    // <div className={currentMode === "Dark" ? "dark" : ""}>
    <div className="flex w-screen h-screen relative dark:bg-main-dark-bg m-0 p-0">
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
          activeMenu ? "md:ml-72" : "flex-2"
        }`}
      >
        {/* Navbar */}
        <div className="fixed md:static flex dark:bg-background-logoColor bg-main-bg w-full items-center md:h-[8%] navbar">
          <Navbar />
        </div>

        {/* Main page */}
        <div
          id="Main--Page"
          className=" dark:bg-background-logoColor md:h-[92%] relative bg-white overflow-x-hidden"
        >
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    // </div>
    <Navigate to="/Login" state={{ from: location }} replace />
  );
};

export default RequiredAuth;
