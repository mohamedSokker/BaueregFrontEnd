import React, { useState } from "react";
import {
  MdOutlineCancel,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { Cookies } from "react-cookie";

import { useNavContext } from "../contexts/NavContext";
import logo from "../assets/logo.jpg";
import { links } from "../data/Tablesdata";
import { isUserAllowedCategory } from "../Functions/isUserAllowedCategory";
import useLogout from "../hooks/useLogout";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();
  // const from = location.state?.from?.pathname || "/";
  const { setActiveMenu, activeMenu, screenSize, usersData } = useNavContext();
  const cookies = new Cookies();
  const [active, setActive] = useState(false);

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const signOut = async () => {
    await logout();
    navigate("/Login", { state: { from: location }, replace: true });
  };

  const doNothing = () => {};

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto p-4 pl-0 pb-10 dark:text-white">
      <div className="flex items-center justify-center">
        <Link
          to="/"
          onClick={() => setActiveMenu(false)}
          className="items-center flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
        >
          <img src={logo} className="w-36 h-36" alt="logo" />
          {/* <span>
            Bauer{" "}
            <span className=" text-logoColor dark:text-black/80 text-lg ml-2">
              Egypt
            </span>
          </span> */}
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
      <div className="flex flex-col items-center border-b-1 border-gray-500 pb-4">
        {links.map((item, i) => {
          return (
            isUserAllowedCategory(item.name, usersData) && (
              <React.Fragment key={i}>
                <div
                  id={`${item.title}-side`}
                  key={item}
                  data-cat={item.title}
                  className={`flex flex-row items-center justify-between w-full mb-2 shadow-sm cursor-pointer rounded-md h-12`}
                >
                  <button
                    id={`${item.title}-sidebar`}
                    className="flex flex-row items-center justify-between w-full h-full p-4 font-semibold text-[25px]"
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
                      if (
                        !document
                          .getElementById(`${item.title}-sidebar`)
                          .classList.contains("Active")
                      ) {
                        document
                          .getElementById(`${item.title}-sidebar`)
                          .classList.add("Active");
                        setActive((prev) => !prev);
                      } else {
                        document
                          .getElementById(`${item.title}-sidebar`)
                          .classList.remove("Active");
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
                    <div className="flex flex-row items-center">
                      {item.icon}
                      <span className="ml-4 text-[16px]">{item.title}</span>
                    </div>
                    {item?.data &&
                      (document
                        ?.getElementById(`${item.title}-sidebar`)
                        ?.classList?.contains("Active") ? (
                        <MdKeyboardArrowUp className="abolute right-0 font-light text-[16px]" />
                      ) : (
                        <MdKeyboardArrowDown className="abolute right-0 font-light text-[16px]" />
                      ))}
                  </button>
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
              </React.Fragment>
            )
          );
        })}
      </div>
      <div
        className={`flex flex-row items-center justify-between w-full mb-4 shadow-sm cursor-pointer rounded-md h-12 pr-2`}
      >
        <button
          className="flex flex-row items-center w-full h-8 p-4 font-semibold text-[25px]"
          onClick={signOut}
        >
          <BiLogOut />
          <span className="ml-4 text-[16px]">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
