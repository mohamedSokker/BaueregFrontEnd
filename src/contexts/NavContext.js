import React, { useContext, createContext, useState } from "react";

const navContext = createContext();

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [currentMode, setCurrentMode] = useState("Light");
  const [screenSize, setScreenSize] = useState(undefined);
  const [token, setToken] = useState(null);
  const [usersData, setUsersData] = useState([]);

  const closeSmallSidebar = () => {
    // if (screenSize <= 900) {
    setActiveMenu(false);
    // }
  };

  return (
    <navContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        currentMode,
        setCurrentMode,
        screenSize,
        setScreenSize,
        closeSmallSidebar,
        token,
        setToken,
        usersData,
        setUsersData,
      }}
    >
      {children}
    </navContext.Provider>
  );
};

export const useNavContext = () => useContext(navContext);
