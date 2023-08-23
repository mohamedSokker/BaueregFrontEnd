import React, { useContext, createContext, useState } from "react";
import { Cookies } from "react-cookie";

import { userInfo } from "../Functions/getuserdata";
import { allDataWithName } from "../data/allRoles";

const navContext = createContext();

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [userName, setUserName] = useState("Mohamed");
  const [userNameData, setUserNameData] = useState({});
  const [screenSize, setScreenSize] = useState(undefined);
  const [token, setToken] = useState("");
  const [socket, setSocket] = useState(null);
  const [usersData, setUsersData] = useState([]);
  let cookies = new Cookies();

  const getUsersData = () => {
    let userData;
    userInfo().then((data) => {
      userData = data;
      if (userData[0].roles.Admin) {
        allDataWithName().then((data1) => {
          let copUserData = userData;
          copUserData[0].roles.Editor = data1;
          setUsersData(copUserData);
        });
      } else {
        setUsersData(userData);
      }
    });
  };

  const CheckEditorRole = (tableName, usersData) => {
    let flag = false;
    usersData[0]?.roles?.Editor?.Tables?.map((table) => {
      if (table.name === tableName) {
        flag = true;
        return true;
      }
    });
    if (flag) {
      return true;
    }
    return false;
  };

  const isUserAllowedCategory = (name, usersData) => {
    cookies = new Cookies();
    if (cookies.get("token") && usersData[0]?.roles?.Admin) {
      return true;
    }
    if (
      cookies.get("token") &&
      (usersData[0]?.roles?.Editor[name] === true ||
        usersData[0]?.roles?.Editor[name]?.length > 0)
    ) {
      return true;
    }
    if (
      cookies.get("token") &&
      (usersData[0]?.roles?.User[name] === true ||
        usersData[0]?.roles?.User[name]?.length > 0)
    ) {
      return true;
    }
    return false;
  };

  const closeSmallSidebar = () => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  return (
    <navContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        currentMode,
        setCurrentMode,
        themeSettings,
        setThemeSettings,
        userName,
        setUserName,
        isUserAllowedCategory,
        userNameData,
        setUserNameData,
        screenSize,
        setScreenSize,
        closeSmallSidebar,
        CheckEditorRole,
        token,
        setToken,
        socket,
        setSocket,
        usersData,
        getUsersData,
      }}
    >
      {children}
    </navContext.Provider>
  );
};

export const useNavContext = () => useContext(navContext);
