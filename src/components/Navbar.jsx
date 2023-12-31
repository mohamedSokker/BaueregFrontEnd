import React, { useEffect, useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { AiOutlineMenu, AiFillInfoCircle } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiUploadCloud } from "react-icons/fi";

import { useNavContext } from "../contexts/NavContext";
import { logoColor } from "../BauerColors";
import { ToggleMode, PageLoading } from "../components";
import { AllTables } from "../data/AllTables";

const NavButton = ({
  title,
  customFunc,
  icon,
  color,
  dotColor,
  size,
  frame,
}) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      // style={{ color }}
      className={`relative ${size} rounded-lg dark:text-white text-logoColor`}
      style={
        frame
          ? {
              borderWidth: 1,
              borderColor: "rgba(0,74,128,0.5)",
              padding: "6px",
            }
          : { padding: "12px" }
      }
    >
      <span
        style={{ background: dotColor }}
        className={`absolute inline-flex rounded-full h-2 w-2 right-2 top-2`}
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { setActiveMenu, usersData, screenSize, setScreenSize } =
    useNavContext();
  const [user, setUser] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTable, setCurrentTable] = useState("");
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  // useEffect(() => {
  //   if (screenSize <= 900) {
  //     setActiveMenu(false);
  //   } else {
  //     setActiveMenu(true);
  //   }
  // }, [screenSize, setActiveMenu]);

  useEffect(() => {
    if (usersData.length > 0)
      setImgPath(`${process.env.REACT_APP_BASE_URL}/${usersData[0]?.img}`);
    setUser(usersData[0]?.username);
  }, [usersData]);

  const handleUploadData = async () => {
    setLoading(true);
    for (let i = 0; i <= AllTables.length - 1; i++) {
      setCurrentTable(AllTables[i]);
      await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/mongoBackup?tableName=${AllTables[i]}`
      );
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <PageLoading message={`Backup Table ${currentTable}`} />}
      <div className=" w-full flex items-center justify-between p-2 md:mx-6 relative dark:text-white">
        <NavButton
          title="Menu"
          className="dark:text-white text-logoColor"
          size={`text-xl`}
          icon={<AiOutlineMenu />}
          customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
          frame={true}
        />
        <div className="flex items-center dark:text-white gap-2">
          {/* {usersData[0]?.roles?.Admin && (
            <NavButton
              title="Upload to cloud"
              className="text-logoColor dark:text-white"
              size={`text-xl`}
              dotPosition={`2`}
              icon={<FiUploadCloud />}
              customFunc={handleUploadData}
            />
          )} */}

          <NavButton
            title="chat"
            className="text-logoColor dark:text-white"
            size={`text-xl`}
            dotPosition={`2`}
            dotColor={logoColor}
            icon={<BsChatLeft />}
            customFunc={() => {}}
            frame={false}
          />
          <div className="relative">
            <NavButton
              title="notification"
              className="text-logoColor dark:text-white"
              frame={false}
              size={`text-2xl`}
              dotPosition={`2`}
              icon={<IoMdNotificationsOutline />}
              customFunc={() => {
                setNotificationOpen((prev) => !prev);
              }}
            />
            {!notificationOpen ? (
              <div
                className="w-6 bg-red-700 rounded-3xl absolute -right-1 bottom-6 text-white font-thin flex justify-center items-center"
                style={{
                  fontSize: "9px",
                  lineHeight: "9px",
                  paddingTop: "2px",
                  paddingBottom: "2px",
                }}
              >
                <span
                  className="h-ful flex justify-center items-center"
                  style={{ fontSize: "10px", lineHeight: "9px" }}
                >
                  +99
                </span>
              </div>
            ) : (
              <div
                className="absolute md:w-64 w-56 bg-gray-200 h-96 rounded-lg p-3 text-logoColor top-9 right-0"
                style={{ zIndex: "1000" }}
              >
                <div className="flex flex-row bg-gray-400 rounded-lg min-h-50 p-2 items-center hover:cursor-pointer justify-between mb-2">
                  <div className="flex flex-row">
                    <AiFillInfoCircle />
                    <p className="ml-2" style={{ fontSize: "10px" }}>
                      First Notification
                    </p>
                  </div>
                  <p
                    className="bg-gray-600 text-white rounded-md p-1 font-bold"
                    style={{ fontSize: "9px" }}
                  >
                    Tables
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* <ToggleMode /> */}
          <TooltipComponent
            content="profile"
            position="BottomCenter"
            className="flex items-center hover:cursor-pointer"
          >
            <div
              className="flex items-center gap-2 p-1 cursor-pointer hover:bg-light-gray rounded-lg hover:cursor-pointer"
              onClick={() => {}}
            >
              <img
                src={`${imgPath}`}
                alt="profile-pic"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <p>
              <span className="text-gray-400 font-bold ml-1 md:text-14 text-[10px]">
                {user}
              </span>
            </p>
            <MdKeyboardArrowDown />
          </TooltipComponent>
        </div>
      </div>
    </>
  );
};

export default Navbar;
