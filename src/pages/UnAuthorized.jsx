import React from "react";
import { CiWarning } from "react-icons/ci";

import { useNavContext } from "../contexts/NavContext";
import { Navbar, Sidebar } from "../components";

const UnAuthorized = () => {
  const { currentMode, activeMenu } = useNavContext();

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
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
          <div
            className="fixed md:static flex dark:bg-background-logoColor bg-main-bg items-center md:h-[8%] navbar"
            style={{ width: "calc(100vw - 18rem)" }}
          >
            <Navbar />
          </div>

          {/* Main page */}
          <div
            id="Main--Page"
            className=" dark:bg-background-logoColor md:h-[92%] relative bg-white overflow-x-hidden"
            style={{ width: "calc(100vw - 18rem)" }}
          >
            <div className="w-full h-full p-4">
              <div
                className=" bg-red-600 h-20 flex justify-center items-center flex-row mb-5 mt-2 rounded-lg"
                style={{ color: "white", width: "90%" }}
              >
                <CiWarning className="text-[40px] font-extrabold" />
                <p className="ml-5 text-xl font-semibold">
                  Unauthorized to see this page!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnAuthorized;
