import React, { useState } from "react";
import {
  MdOutlineCancel,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

import { useNavContext } from "../contexts/NavContext";
import logo from "../assets/logo.jpg";
import { links } from "../data/Tablesdata";
import { isUserAllowedCategory } from "../Functions/isUserAllowedCategory";
import useLogout from "../hooks/useLogout";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();
  const { setActiveMenu, activeMenu, screenSize, usersData } = useNavContext();
  const [activeItem, setActiveItem] = useState(null);

  const handleCloseSidebar = () => {
    if (activeMenu) setActiveMenu(false);
  };

  const signOut = async () => {
    await logout();
    navigate("/Login", { replace: true, state: { from: location } });
  };

  const toggleSubMenu = (title) => {
    setActiveItem((prev) => (prev === title ? null : title));
  };

  const isActive = (title) => activeItem === title;

  return (
    <div
      className="h-screen overflow-y-scroll p-2 md:p-4 pl-0 pb-10 dark:text-white relative"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {/* Close Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setActiveMenu(false)}
          className="text-xs font-bold text-gray-400 hover:text-black rounded-md p-1 w-6 h-6 flex items-center justify-center bg-gray-100"
        >
          X
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-col border-b border-gray-500 pb-4 pl-2">
        {links.map((item) => {
          const allowed = isUserAllowedCategory(item.name, usersData);
          if (!allowed) return null;

          const hasSubMenu = !!item?.data;
          const itemActive = isActive(item.title);

          return (
            <React.Fragment key={item.title}>
              <div
                data-cat={item.title}
                className={`flex items-center justify-between w-full mb-1 cursor-pointer rounded-md h-9 px-1 transition-colors duration-200 ${"hover:bg-gray-200 dark:hover:bg-gray-700"}`}
              >
                <button
                  id={`${item.title}-sidebar`}
                  className={`flex items-center justify-between w-full h-full py-1 px-3 font-medium text-sm ${
                    !hasSubMenu
                      ? "hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                      : ""
                  }`}
                  onClick={(e) => {
                    if (!hasSubMenu) {
                      handleCloseSidebar();
                      navigate(`${item.dest}`);
                    } else {
                      toggleSubMenu(item.title);
                    }
                  }}
                >
                  <div className="flex items-center">
                    <span className="text-lg">{item.icon}</span>
                    <span className="ml-2">{item.title}</span>
                  </div>
                  {hasSubMenu && (
                    <span className="text-xl">
                      {itemActive ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )}
                    </span>
                  )}
                </button>
              </div>

              {/* Submenu Items */}
              {itemActive && item.data && (
                <div
                  className={`overflow-y-scroll transition-all duration-300 ease-in-out max-h-60 opacity-100`}
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <div className="pl-6 pr-2 pt-1 pb-2 text-xs font-normal text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md mb-1 space-y-1.5 shadow-sm transition-all duration-200">
                    {usersData[0]?.roles?.Editor[item.name]?.map((cat, idx) => (
                      <Link
                        key={idx}
                        to={`/${item.name}/${cat?.dest || cat.name}`}
                        className="flex items-center gap-2 w-full hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                        onClick={handleCloseSidebar}
                      >
                        <span>&#10148;</span>
                        {cat?.icon && (
                          <span className="text-base">{cat.icon}</span>
                        )}
                        <span>{cat.name}</span>
                      </Link>
                    ))}
                    {usersData[0]?.roles?.User[item.name]?.map((cat, idx) => (
                      <Link
                        key={idx}
                        to={`/${item.name}/${cat?.dest || cat.name}`}
                        className="flex items-center gap-2 w-full mb-2 hover:underline"
                        onClick={handleCloseSidebar}
                      >
                        <span>&#10148;</span>
                        {cat?.icon && (
                          <span className="text-base">{cat.icon}</span>
                        )}
                        <span>{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="mt-auto pt-4">
        <button
          className="flex items-center w-full h-8 p-2 text-sm font-medium text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded"
          onClick={signOut}
        >
          <BiLogOut size={16} />
          <span className="ml-2">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
