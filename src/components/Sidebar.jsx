import React, { useEffect, useState } from "react";
import {
  MdOutlineCancel,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Link, useNavigate } from "react-router-dom";
import { BiListPlus } from "react-icons/bi";
import { Cookies } from "react-cookie";

import { useNavContext } from "../contexts/NavContext";
import logo from "../assets/logo.jpg";
import { logoColor } from "../BauerColors";
import { links } from "../data/Tablesdata";
import { Login } from "../pages";
import { userInfo } from "../Functions/getuserdata";
// import { usersData } from "../data/Tablesdata";
import { allDataWithName } from "../data/allRoles";
import { socket } from "../socket/socket";

const Sidebar = () => {
  // console.log(usersData);
  const navigate = useNavigate();
  const {
    setActiveMenu,
    isUserAllowedCategory,
    activeMenu,
    screenSize,
    usersData,
    // setUsersData,
    getUsersData,
  } = useNavContext();
  const cookies = new Cookies();
  // const usersData = userInfo();
  const [catActive, setCatActive] = useState(false);
  // const [usersData, setUsersData] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!socket.connected) socket.connect();
  });

  useEffect(() => {
    getUsersData();
  }, []);

  console.log(usersData[0]?.roles?.Editor);

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const doNothing = () => {};

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto p-4 pl-0 pb-10 dark:text-white">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          onClick={() => setActiveMenu(false)}
          className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
        >
          <img src={logo} className="w-16 h-16 rounded-md" alt="logo" />
          <span>
            Bauer{" "}
            <span
              className=" text-logoColor dark:text-black/80 text-lg ml-2"
              // style={{ color: logoColor, fontSize: "16px" }}
            >
              Egypt
            </span>
          </span>
        </Link>
        <TooltipComponent content="Close" position="BottomCenter">
          <button
            type="button"
            onClick={() => setActiveMenu(false)}
            className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
          >
            <MdOutlineCancel />
          </button>
        </TooltipComponent>
      </div>
      <div className="mt-10 flex flex-col items-center">
        {links.map((item, i) => {
          return (
            isUserAllowedCategory(item.name, usersData) && (
              <>
                <div
                  id={`${item.title}-side`}
                  key={item}
                  data-cat={item.title}
                  className={`flex flex-row items-center justify-between w-full mb-2 shadow-sm cursor-pointer rounded-md h-12 pr-2`}
                >
                  <button
                    id={`${item.title}-sidebar`}
                    className="flex flex-row items-center w-full h-8 p-4 font-semibold"
                    onClick={(e) => {
                      links.map((link) => {
                        if (document.getElementById(`${link.title}-side`)) {
                          document.getElementById(
                            `${link.title}-side`
                          ).style.backgroundColor = "white";
                          document.getElementById(
                            `${link.title}-side`
                          ).style.color = "black";
                        }
                      });
                      document.getElementById(
                        `${item.title}-side`
                      ).style.backgroundColor = "rgb(0,74,128)";
                      document.getElementById(
                        `${item.title}-side`
                      ).style.color = "white";
                      if (!e.target.classList.contains("Active")) {
                        e.target.classList.add("Active");
                        setActive((prev) => !prev);
                      } else {
                        e.target.classList.remove("Active");
                        setActive((prev) => !prev);
                      }
                      if (!item?.data) {
                        if (screenSize <= 900) {
                          setActiveMenu(false);
                        }
                      }
                      !item?.data ? navigate(`${item.name}`) : doNothing();
                    }}
                  >
                    {item.icon}
                    <span className="ml-4">{item.title}</span>
                  </button>
                  {item?.data &&
                    (document
                      ?.getElementById(`${item.title}-sidebar`)
                      ?.classList?.contains("Active") ? (
                      <MdKeyboardArrowUp className="abolute right-0" />
                    ) : (
                      <MdKeyboardArrowDown className="abolute right-0" />
                    ))}
                </div>
                {document
                  ?.getElementById(`${item.title}-sidebar`)
                  ?.classList?.contains("Active") && item?.data ? (
                  <div
                    key={i}
                    className="flex items-center flex-col justify-start w-full pl-8 text-gray-700 bg-[rgb(25,78,94)] dark:text-white rounded-md pt-3 mb-2"
                  >
                    {usersData[0]?.roles?.Editor[item.name]?.map((cat, i) => (
                      <Link
                        key={i}
                        className="w-full mb-3 font-semibold flex flex-row items-center gap-4"
                        style={{ color: "White" }}
                        to={`/${item.name}/${cat?.dest ? cat.dest : cat.name}`}
                        onClick={handleCloseSidebar}
                      >
                        &#10148;&nbsp;&nbsp;
                        {cat?.icon && cat.icon}
                        {cat.name}
                      </Link>
                    ))}
                    {usersData[0]?.roles?.User[item.name]?.map((cat, i) => (
                      <Link
                        key={i}
                        className="w-full mb-3 font-semibold flex flex-row items-center gap-4"
                        style={{ color: "White" }}
                        to={`/${item.name}/${cat?.dest ? cat.dest : cat.name}`}
                        onClick={handleCloseSidebar}
                      >
                        &#10148;&nbsp;&nbsp;
                        {cat?.icon && cat.icon}
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div key={i} className="h-0 pb-2"></div>
                )}
              </>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
