import React, { useEffect, useState } from "react";
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
import { barOptions, barProps } from "../../Model/model";

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
    const container = document.getElementById("Main-Area");
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <div
      className="flex flex-grow h-full relative bg-gray-100 z-[100]"
      id="Main-Area"
      // onMouseMove={mouseMoveMove}
      // onMouseUp={mouseUpMove}
    >
      {tablesData &&
        data?.el?.map((item, i) => (
          <div
            key={i}
            className="absolute p-0 rounded-[3px] min-w-[15px] min-h-[15px] resizable-box nonSelect"
            style={{
              width: item?.width,
              height: item?.height,
              top: item?.top,
              left: item?.left,
              borderColor: selectedItem === i ? "orange" : "transparent",
              borderWidth: selectedItem === i ? "1px" : "0",
              // transition: "all 0.5s ease-in-out",
            }}
            id={`resizable${i}`}
            onClick={() => setSelectedItem(i)}
          >
            <div
              className="absolute p-[2px] -right-4 -top-0 z-[2] bg-gray-400 cursor-move opacity-60"
              onMouseDown={(e) => mouseDownMove(e, i)}
            >
              <FiMove size={12} color={logoColor} />
            </div>
            <div
              className="absolute p-[2px] -right-4 top-5 z-[2] bg-gray-400 cursor-pointer opacity-60"
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  el: data?.el?.filter((el) => el.ID !== item.ID),
                }))
              }
            >
              <CiSquareRemove size={12} color={logoColor} />
            </div>
            <div
              className="resizer absolute bg-white cursor-col-resize h-[100%] left-0 top-0 w-[4px] rl z-[2]"
              onMouseDown={(e) => mouseDownLeftResize(e, i)}
            ></div>
            <div
              className="resizer absolute bg-white cursor-row-resize h-[4px] left-0 top-0 w-[100%] rt z-[2]"
              onMouseDown={(e) => mouseDownTopResize(e, i)}
            ></div>
            <div
              className="resizer absolute bg-white cursor-col-resize h-[100%] right-0 top-0 w-[4px] rr z-[2]"
              onMouseDown={(e) => mouseDownRightResize(e, i)}
            ></div>
            <div
              className="resizer absolute bg-white cursor-row-resize h-[4px] left-0 bottom-0 w-[100%] rb z-[2]"
              onMouseDown={(e) => mouseDownBottomResize(e, i)}
            ></div>
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
