import React, { useEffect, useState } from "react";
import { FiMove } from "react-icons/fi";
import { CiSquareRemove } from "react-icons/ci";

import Table from "../Table";
import Graph from "../Graph";
import Card from "../Card";
import { logoColor } from "../../../../BauerColors";
import Slicer from "../Slicer";
import { useInitContext } from "../../Contexts/InitContext";

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
            className="absolute p-1 rounded-[3px] min-w-[15px] min-h-[15px] resizable-box"
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
              className="resizer absolute bg-white cursor-col-resize h-[100%] left-0 top-0 w-[5px] rl"
              onMouseDown={(e) => mouseDownLeftResize(e, i)}
            ></div>
            <div
              className="resizer absolute bg-white cursor-row-resize h-[5px] left-0 top-0 w-[100%] rt"
              onMouseDown={(e) => mouseDownTopResize(e, i)}
            ></div>
            <div
              className="resizer absolute bg-white cursor-col-resize h-[100%] right-0 top-0 w-[5px] rr"
              onMouseDown={(e) => mouseDownRightResize(e, i)}
            ></div>
            <div
              className="resizer absolute bg-white cursor-row-resize h-[5px] left-0 bottom-0 w-[100%] rb"
              onMouseDown={(e) => mouseDownBottomResize(e, i)}
            ></div>
            {item.Type === "Table" ? (
              <Table
                item={item}
                tableData={tablesData?.[item?.name]?.data}
                data={data}
              />
            ) : item.Type === "Graph" ? (
              <Graph
                item={item}
                tableData={tablesData?.[item?.name]?.data}
                data={data}
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
              />
            ) : (
              item.Type === "Card" && (
                <Card
                  item={item}
                  tableData={tablesData?.[item?.name]?.data}
                  data={data}
                />
              )
            )}
          </div>
        ))}
    </div>
  );
};

export default MainArea;
