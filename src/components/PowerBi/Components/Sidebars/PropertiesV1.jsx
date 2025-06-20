import React, { useEffect, useState } from "react";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { useInitContext } from "../../Contexts/InitContext";
import PropsComponents from "./PropsComponents";

import "../../Styles/EditCard.css";

const Properties = () => {
  const { data, setData, selectedItem, tablesData, isPerview } =
    useInitContext();
  const [isOpenPanel, setIsOpenPanel] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState({});

  const handleClick = () => {
    setIsOpenPanel((prev) => !prev);
  };

  useEffect(() => {
    const copiedCat = { ...isCategoryOpen };
    setIsCategoryOpen({});
    setTimeout(() => {
      setIsCategoryOpen(copiedCat);
    }, 0);
  }, [selectedItem]);

  // console.log(data?.el?.[selectedItem]?.props);

  return (
    <div
      className="flex w-[100%] h-full flex-col overflow-y-scroll bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 relative z-[1]"
      id="prop-panel"
      style={
        {
          // width: isPerview ? "0px" : "200px",
          // padding: isPerview ? "0px" : "8px",
          // transition: "width 0.5s ease-in-out",
          // animation: isPerview
          //   ? "animate-in 0.5s ease-in-out"
          //   : "animate-out 0.5s ease-in-out",
        }
      }
      // style={{ transition: "width 0.5s ease-in-out" }}
    >
      <div className="w-full">
        <div className="w-full flex flex-row justify-between p-1">
          <p className="text-[12px] font-[800]">Properties</p>
          {/* <div className="cursor-pointer" onClick={handleClick}>
            <MdKeyboardDoubleArrowDown size={15} />
          </div> */}
        </div>
      </div>
      {data?.el?.length > 0 && selectedItem !== null && (
        <div className="w-full h-full flex flex-col items-start justify-start p-1 gap-2 relative z-[11]">
          <div className="w-full p-2 text-[14px] font-[800] flex flex-row items-center justify-between bg-gray-400 dark:bg-gray-600">
            <p>Position & Size</p>
            <div
              className="cursor-pointer arrow"
              style={{
                transform: isCategoryOpen?.Position
                  ? "rotate(90deg)"
                  : "rotate(0deg)",
              }}
              onClick={() =>
                setIsCategoryOpen((prev) => ({
                  ...prev,
                  Position: !prev?.Position,
                }))
              }
            >
              <MdKeyboardDoubleArrowRight />
            </div>
          </div>
          {isCategoryOpen?.Position && <PropsComponents cat={`Position`} />}
          <div className="w-full p-2 text-[14px] font-[800] flex flex-row items-center justify-between bg-gray-400 dark:bg-gray-600">
            <p>Fonts</p>
            <div
              className="cursor-pointer arrow"
              style={{
                transform: isCategoryOpen?.Fonts
                  ? "rotate(90deg)"
                  : "rotate(0deg)",
              }}
              onClick={() =>
                setIsCategoryOpen((prev) => ({
                  ...prev,
                  Fonts: !prev?.Fonts,
                }))
              }
            >
              <MdKeyboardDoubleArrowRight />
            </div>
          </div>
          {isCategoryOpen?.Fonts && <PropsComponents cat={`Fonts`} />}
          <div className="w-full p-2 text-[14px] font-[800] flex flex-row items-center justify-between bg-gray-400 dark:bg-gray-600">
            <p>Data</p>
            <div
              className="cursor-pointer arrow"
              style={{
                transform: isCategoryOpen?.Data
                  ? "rotate(90deg)"
                  : "rotate(0deg)",
              }}
              onClick={() =>
                setIsCategoryOpen((prev) => ({
                  ...prev,
                  Data: !prev?.Data,
                }))
              }
            >
              <MdKeyboardDoubleArrowRight />
            </div>
          </div>
          {isCategoryOpen?.Data && <PropsComponents cat={`Data`} />}
          <div className="w-full p-2 text-[14px] font-[800] flex flex-row items-center justify-between bg-gray-400 dark:bg-gray-600">
            <p>Colors</p>
            <div
              className="cursor-pointer arrow"
              style={{
                transform: isCategoryOpen?.Colors
                  ? "rotate(90deg)"
                  : "rotate(0deg)",
              }}
              onClick={() =>
                setIsCategoryOpen((prev) => ({
                  ...prev,
                  Colors: !prev?.Colors,
                }))
              }
            >
              <MdKeyboardDoubleArrowRight />
            </div>
          </div>
          {isCategoryOpen?.Colors && <PropsComponents cat={`Colors`} />}
          <div className="w-full p-2 text-[14px] font-[800] flex flex-row items-center justify-between bg-gray-400 dark:bg-gray-600">
            <p>Customs</p>
            <div
              className="cursor-pointer arrow"
              style={{
                transform: isCategoryOpen?.Customs
                  ? "rotate(90deg)"
                  : "rotate(0deg)",
              }}
              onClick={() =>
                setIsCategoryOpen((prev) => ({
                  ...prev,
                  Customs: !prev?.Customs,
                }))
              }
            >
              <MdKeyboardDoubleArrowRight />
            </div>
          </div>
          {isCategoryOpen?.Customs && <PropsComponents cat={`Customs`} />}

          {/* <PropsComponents /> */}

          {/* <Drag
          category={`ManageDataEntry`}
          name={`Count of breakdowns`}
          targets={[`Fonts`, `Colors`]}
        >
          <PropertyCard propName={`Count of breakdowns`} />
        </Drag>

        <Drag
          category={`ManageDataEntry`}
          name={`Count of equipments`}
          targets={[`Fonts`, `Colors`]}
        >
          <PropertyCard propName={`Count of equipments`} />
        </Drag>

        <PropertyCard propName={`Sum of equipments`} />
        <PropertyCard propName={`Average of equipments`} />
        <PropertyCard propName={`Sum of breakdowns`} />

        <div className="w-full min-h-[50px]">
          <Drop category={`Fonts`} />
        </div>

        <div className="w-full min-h-[50px]">
          <Drop category={`Colors`} />
        </div> */}
        </div>
      )}
    </div>
  );
};

export default Properties;
