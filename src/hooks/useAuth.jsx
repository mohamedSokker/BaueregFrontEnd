import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useNavContext } from "../contexts/NavContext";
import { Navbar, Sidebar } from "../components";
import UnAuthorized from "../pages/UnAuthorized";
import Error from "../components/Error";

const RequiredAuth = ({ allowedRole }) => {
  const {
    usersData,
    currentMode,
    activeMenu,
    closeSmallSidebar,
    errorData,
    setErrorData,
  } = useNavContext();
  const location = useLocation();

  console.log(errorData);

  return (usersData &&
    (usersData[0]?.roles.Editor[allowedRole] === true ||
      usersData[0]?.roles.Editor[allowedRole]?.length > 0 ||
      usersData[0]?.roles.User[allowedRole] === true ||
      usersData[0]?.roles.User[allowedRole]?.length > 0)) ||
    allowedRole === true ? (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex w-screen h-screen relative dark:bg-main-dark-bg m-0 p-0">
        <div
          className="w-72 fixed sidebar dark:bg-[rgb(0,0,0)] bg-white z-10"
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
        {errorData.length > 0 && (
          <div className="fixed dark:bg-[rgb(0,0,0,0.7)] dark:text-gray-500 z-[11] left-0 bottom-4 flex flex-col gap-4">
            {errorData.map((data, i) => (
              <Error key={i} data={data} setErrorData={setErrorData} ind={i} />
            ))}
          </div>
        )}

        {/* Navbar + MainPage */}
        <div
          className={`dark:bg-[rgb(0,0,0,0.7)] dark:text-gray-500 bg-main-bg min-h-[100vh] w-full `}
        >
          {/* Navbar */}
          <div
            className="static flex dark:bg-[rgb(0,0,0,0.7)] dark:text-gray-500 bg-gray-100 items-center navbar"
            style={{ width: "100vw", height: "40px" }}
          >
            <Navbar />
          </div>

          {/* Main page */}
          <div
            id="Main--Page"
            className=" dark:bg-[rgb(0,0,0,0.7)] dark:text-gray-500 relative bg-white overflow-x-hidden h-[calc(100vh-40px)] top-0"
            style={{
              width: "100vw",
              // height: "calc()",
            }}
            onClick={closeSmallSidebar}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  ) : usersData?.length > 0 ? (
    <UnAuthorized />
  ) : (
    <Navigate to="/Login" state={{ from: location }} replace />
  );
};

export default RequiredAuth;
