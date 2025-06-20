import React, { useEffect, useRef, useState } from "react";
import { FiMove } from "react-icons/fi";
import { CiSquareRemove } from "react-icons/ci";

import Table from "../Table";
import Graph from "../Graph";
import Card from "../Card";
import { logoColor } from "../../../../BauerColors";
import Slicer from "../Slicers/Slicer";
import { useInitContext } from "../../Contexts/InitContext";
import ProffesionalTable from "../Customs/CustomTable1";
import "../../Styles/EditCard.css";
import Scheduler from "../Graphs/Scheduler";

const MainArea = () => {
  const {
    tablesData,
    setTablesData,
    copiedTablesData,
    setCopiedTablesData,
    data,
    setData,
    mouseUpMove,
    mouseMoveMove,
    mouseDownMove,
    mouseDownLeftResize,
    mouseDownTopResize,
    mouseDownRightResize,
    mouseDownBottomResize,
    selectedItem,
    setSelectedItem,
    checkArray,
    setCheckArray,
    slicersCheckedItems,
    setSlicersCheckedItems,
    slicerMinDates,
    setSlicersMinDates,
    slicerMaxDates,
    setSlicersMaxDates,
  } = useInitContext();

  const [isMainHovered, setIsMainHovered] = useState({});

  const updateSize = () => {
    console.log(`updateSize Event`);
    const container = document.getElementById("Main-Area");
    const containerStyles = window.getComputedStyle(container);
    // console.log(containerStyles.width, containerStyles.height);
    setData((prev) => ({
      ...prev,
      el: [...prev?.el],
      containerStyles: {
        initialWidth: containerStyles.width,
        width: containerStyles.width,
        height: containerStyles.height,
        scale: prev.containerStyles.scale,
      },
    }));
  };
  useEffect(() => {
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <div
      className="flex flex-grow h-full relative bg-gray-100 dark:bg-background-logoColor z-[100]"
      id="Main-Area"
      // onMouseMove={mouseMoveMove}
      // onMouseUp={mouseUpMove}
    >
      {tablesData &&
        data?.el?.map((item, i) => (
          <div
            key={i}
            className={`absolute p-0 min-w-[15px] min-h-[15px] nonSelect border-[2px] ${
              selectedItem === i
                ? "border-orange-400"
                : "dark:border-gray-600 border-gray-400"
            }`}
            style={{
              width: item?.width,
              height: item?.height,
              top: item?.top,
              left: item?.left,
              borderRadius: `${item?.cardRadius}px`,
              // borderColor: selectedItem === i ? "orange" : "transparent",
              // borderWidth: selectedItem === i ? "1px" : "0",
              // transition: "all 0.5s ease-in-out",
            }}
            id={`resizable${i}`}
            onClick={() => setSelectedItem(i)}
            onMouseEnter={() =>
              setIsMainHovered((prev) => ({ ...prev, [i]: true }))
            }
            onMouseLeave={() =>
              setIsMainHovered((prev) => ({ ...prev, [i]: false }))
            }
          >
            <div
              className={`transition-opacity duration-300 ease-in-out ${
                isMainHovered?.[i] ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="absolute p-[2px] -right-4 -top-0 z-[2] bg-gray-400 dark:bg-gray-700 cursor-move opacity-60 text-logoColor dark:text-white"
                onMouseDown={(e) => mouseDownMove(e, i)}
              >
                <FiMove size={12} />
              </div>
              <div
                className="absolute p-[2px] -right-4 top-5 z-[2] bg-gray-400 dark:bg-gray-700 cursor-pointer opacity-60 text-logoColor dark:text-white"
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    el: data?.el?.filter((el) => el.ID !== item.ID),
                  }))
                }
              >
                <CiSquareRemove size={12} />
              </div>
              <div
                className="resizer absolute bg-white dark:bg-gray-600 opacity-60  cursor-col-resize h-[100%] -left-[2px] top-0 w-[4px] rl z-[2]"
                onMouseDown={(e) => mouseDownLeftResize(e, i)}
              ></div>
              <div
                className="resizer absolute bg-white dark:bg-gray-700 opacity-60  cursor-row-resize h-[4px] left-0 -top-[2px] w-[100%] rt z-[2]"
                onMouseDown={(e) => mouseDownTopResize(e, i)}
              ></div>
              <div
                className="resizer absolute bg-white dark:bg-gray-700 opacity-60  cursor-col-resize h-[100%] -right-[2px] top-0 w-[4px] rr z-[2]"
                onMouseDown={(e) => mouseDownRightResize(e, i)}
              ></div>
              <div
                className="resizer absolute bg-white dark:bg-gray-700 opacity-60  cursor-row-resize h-[4px] left-0 -bottom-[2px] w-[100%] rb z-[2]"
                onMouseDown={(e) => mouseDownBottomResize(e, i)}
              ></div>
            </div>

            {item.Type === "Table" ? (
              <ProffesionalTable
                data={tablesData}
                item={item}
                defaultWidth={`100px`}
              />
            ) : // <Table
            //   item={item}
            //   tableData={tablesData?.[item?.name]?.data}
            //   data={data}
            // />
            item.Type === "Graph" ? (
              <Graph
                item={item}
                tableData={tablesData?.[item?.name]?.data}
                data={data}
                tablesData={tablesData}
              />
            ) : item.Type === "Slicer" ? (
              <Slicer
                item={item}
                tableData={copiedTablesData?.[item?.name]?.data}
                tablesData={copiedTablesData}
                setTablesData={setTablesData}
                data={data}
                setData={setData}
                checkArray={checkArray}
                setCheckArray={setCheckArray}
                slicersCheckedItems={slicersCheckedItems}
                setSlicersCheckedItems={setSlicersCheckedItems}
                slicerMinDates={slicerMinDates}
                setSlicersMinDates={setSlicersMinDates}
                slicerMaxDates={slicerMaxDates}
                setSlicersMaxDates={setSlicersMaxDates}
                selectedItem={i}
                isMainHovered={isMainHovered}
              />
            ) : item.Type === "Scheduler" ? (
              <Scheduler
                item={item}
                tableData={tablesData?.[item?.name]?.data}
                data={data}
                tablesData={tablesData}
              />
            ) : (
              item.Type === "Card" && (
                <Card
                  item={item}
                  tableData={tablesData?.[item?.name]?.data}
                  data={data}
                  tablesData={tablesData}
                />
              )
            )}
          </div>
        ))}
    </div>
  );
};

export default MainArea;
