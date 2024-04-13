import React from "react";
import { CiWarning } from "react-icons/ci";

import { useNavContext } from "../contexts/NavContext";
import { Navbar, Sidebar } from "../components";
import Error from "../components/Error";

const UnAuthorized = () => {
  const {
    currentMode,
    activeMenu,
    errorData,
    setErrorData,
    closeSmallSidebar,
  } = useNavContext();

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex w-screen h-screen relative dark:bg-main-dark-bg m-0 p-0">
        <div
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

        {errorData.length > 0 && (
          <div className="fixed dark:bg-logoColor z-[11] left-0 bottom-4 flex flex-col gap-4">
            {errorData.map((data, i) => (
              <Error key={i} data={data} setErrorData={setErrorData} />
            ))}
          </div>
        )}
        {/* Navbar + MainPage */}
        <div
          className={`dark:bg-background-logoColor bg-main-bg min-h-screen w-full `}
        >
          {/* Navbar */}
          <div
            className="fixed md:static flex dark:bg-background-logoColor bg-gray-100 items-center h-[8vh] navbar"
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
            onClick={closeSmallSidebar}
          >
            <div className="w-full h-full flex justify-center p-4">
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
