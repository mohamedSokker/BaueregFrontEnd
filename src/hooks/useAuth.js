import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useNavContext } from "../contexts/NavContext";
import { Navbar, Sidebar } from "../components";
import UnAuthorized from "../pages/UnAuthorized";
import { useEffect, useState } from "react";

const RequiredAuth = ({ allowedRole }) => {
  const { usersData, currentMode, activeMenu } = useNavContext();
  const location = useLocation();
  const [sidebarClassList, setSidebarClassList] = useState(
    "w-72 fixed sidebar dark:bg-logoColor bg-white animate-slide-in z-10"
  );

  // useEffect(() => {
  //   if (activeMenu) {
  //     setSidebarClassList(
  //       "w-72 fixed sidebar dark:bg-logoColor bg-white animate-slide-in z-10"
  //     );
  //   } else {
  //     setSidebarClassList(
  //       "w-72 fixed sidebar dark:bg-logoColor bg-white  z-10"
  //     );
  //   }
  // }, [activeMenu]);

  // console.log(usersData.length);

  return usersData[0]?.roles.Editor[allowedRole] === true ||
    usersData[0]?.roles.Editor[allowedRole].length > 0 ||
    usersData[0]?.roles.User[allowedRole] === true ||
    usersData[0]?.roles.User[allowedRole].length > 0 ? (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex w-screen h-screen relative dark:bg-main-dark-bg m-0 p-0">
        <div
          // className={sidebarClassList}
          className="w-72 fixed sidebar dark:bg-logoColor bg-white z-10"
          style={
            activeMenu
              ? {
                  transform: "translate(0)",
                  transition: "all 0.5s ease-in-out",
                }
              : {
                  transform: "translate(-100%)",
                  transition: "all 0.5s ease-in-out",
                }
          }
        >
          <Sidebar />
        </div>
        {/* {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-logoColor bg-white animate-slide-in z-10">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-logoColor animate-slide-out z-10">
            <Sidebar />
          </div>
        )} */}
        {/* Navbar + MainPage */}
        <div
          className={`dark:bg-background-logoColor bg-main-bg min-h-screen w-full `}
        >
          {/* Navbar */}
          <div
            className="fixed md:static flex dark:bg-background-logoColor bg-main-bg items-center h-[8vh] navbar"
            style={{ width: "100vw" }}
          >
            <Navbar />
          </div>

          {/* Main page */}
          <div
            id="Main--Page"
            className=" dark:bg-background-logoColor relative bg-white overflow-x-hidden"
            style={{
              width: "100vw",
              height: "92vh",
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  ) : usersData.length > 0 ? (
    <UnAuthorized />
  ) : (
    <Navigate to="/Login" state={{ from: location }} replace />
  );
};

export default RequiredAuth;
