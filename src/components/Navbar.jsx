import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineMenu,
  AiFillMessage,
  AiFillBell,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { FiSun, FiMoon } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";

import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useNavContext } from "../contexts/NavContext";
import { logoColor } from "../BauerColors";
import { ToggleMode, PageLoading } from "../components";
import { AllTables } from "../data/AllTables";
import userDefault from "../assets/noprofile.jpeg";

// Custom Icon: LogoIcon
const LogoIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L2 7L12 12L22 7L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 17L12 22L22 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12L12 17L22 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Custom User Icon
const UserIcon = ({ color = "currentColor" }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NavButton = ({
  title,
  customFunc,
  icon: Icon,
  dotColor,
  size = "text-xl",
  frame = false,
}) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      className={`relative ${size} rounded-lg dark:text-white text-logoColor transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 focus:outline-none`}
    >
      {dotColor && (
        <span
          style={{ background: dotColor }}
          className="absolute w-2 h-2 rounded-full top-2 right-2"
        />
      )}
      <Icon />
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    setActiveMenu,
    usersData,
    screenSize,
    setScreenSize,
    currentMode,
    setCurrentMode,
  } = useNavContext();
  const [user, setUser] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTable, setCurrentTable] = useState("");

  const notificationRef = useRef(null);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  // Set user data
  useEffect(() => {
    if (usersData.length > 0) {
      setImgPath(`${import.meta.env.VITE_BASE_URL}/${usersData[0]?.img}`);
      setUser(usersData[0]?.username);
    }
  }, [usersData]);

  // Close notification on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    const theme = localStorage.getItem("backgroundTheme");
    setCurrentMode(theme);
    console.log(theme);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Simulate upload process
  const handleUploadData = async () => {
    setLoading(true);
    for (let i = 0; i <= AllTables.length - 1; i++) {
      setCurrentTable(AllTables[i]);
      await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/mongoBackup?tableName=${
          AllTables[i]
        }`
      );
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <PageLoading message={`Backup Table ${currentTable}`} />}
      <nav className="w-full max-h-[40px] flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 shadow-md sticky top-0 z-[9] transition-colors duration-300">
        {/* Left Side - Menu Button */}
        <div className="flex items-center gap-2">
          <NavButton
            title="Toggle Sidebar"
            icon={AiOutlineMenu}
            customFunc={() => setActiveMenu((prev) => !prev)}
          />
        </div>

        {/* Right Side - Icons & Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Upload Button (Admin only) */}
          {/* {usersData[0]?.roles?.Admin && (
            <NavButton
              title="Upload to Cloud"
              icon={AiOutlineCloudUpload}
              customFunc={handleUploadData}
            />
          )} */}

          {/* Chat Icon */}
          <NavButton
            title="Messages"
            icon={AiFillMessage}
            dotColor={logoColor}
            customFunc={() => {}}
          />

          {/* Notifications Dropdown */}
          <div className="relative" ref={notificationRef}>
            <NavButton
              title="Notifications"
              icon={AiFillBell}
              customFunc={() => setNotificationOpen((prev) => !prev)}
            />
            <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
            {notificationOpen && (
              <div className="absolute md:w-72 w-60 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 top-12 right-0 z-50 max-h-80 overflow-y-auto border border-gray-200 dark:border-gray-700 animate-fadeIn">
                <p className="text-sm font-semibold mb-2 dark:text-white">
                  Notifications
                </p>
                <div className="flex flex-row bg-gray-100 dark:bg-gray-700 rounded-lg p-2 items-center justify-between mb-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2">
                    <LogoIcon />
                    <p className="text-xs">First Notification</p>
                  </div>
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-bold">
                    Tables
                  </span>
                </div>
                {/* Add more notifications dynamically here */}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <NavButton
            title="Toggle Theme"
            icon={() =>
              currentMode === "Light" ? (
                <FiMoon />
              ) : (
                <FiSun className="text-yellow-500" />
              )
            }
            customFunc={() => {
              if (currentMode === "Light") {
                setCurrentMode("Dark");
                localStorage.setItem("backgroundTheme", "Dark");
              } else {
                setCurrentMode("Light");
                localStorage.setItem("backgroundTheme", "Light");
              }
            }}
          />

          {/* User Profile */}
          <TooltipComponent content="Profile" position="BottomCenter">
            <div className="flex items-center gap-2 cursor-pointer group">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${usersData[0]?.img}`}
                alt="Profile"
                className="w-8 h-8 object-contain rounded-full border-2 border-logoColor blur-sm transition-all duration-300 ease-in-out"
                onLoad={(e) => e.target.classList.remove("blur-sm")}
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = userDefault;
                  e.target.classList.remove("blur-sm");
                }}
              />
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-300 truncate max-w-[100px]">
                  {user || "User"}
                </span>
              </div>
              <MdKeyboardArrowDown className="text-gray-500 hidden md:block" />
            </div>
          </TooltipComponent>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
