import React, { useState, useEffect, useRef } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowRight,
  MdOutlinePlaylistAdd,
} from "react-icons/md";
import { TbSum } from "react-icons/tb";
import { ColorRing } from "react-loader-spinner";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { logoColor } from "../../../../BauerColors";
import { useInitContext } from "../../Contexts/InitContext";
import PropertyCard from "../Customs/PropertyCard";
import Drag from "../Customs/Drag";

const TablesList = () => {
  const {
    isDataReady,
    selectedTable,
    selectedRelationshipsTable,
    tablesData,
    setIsTableCard,
    setIsRelationshipTableCard,
    setTablesData,
    setSelectedTableData,
    selectedTableData,
    activeItem,
    setActiveItem,
    AddedCols,
    setAddedCols,
    AddedTables,
    setAddedTables,
    data,
    setData,
    setIsPreview,
    isPerview,
  } = useInitContext();

  const [isOpenPanel, setIsOpenPanel] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isColEditing, setIsColEditing] = useState(false);
  const [renamedItem, setRenamedItem] = useState("");
  const [RenamedName, setRenamedName] = useState("");
  const [renamedColItem, setRenamedColItem] = useState("");
  const [activeColItem, setActiveColItem] = useState({});
  const [RenamedColName, setRenamedColName] = useState("");
  const [isPanelDown, setIsPanelDown] = useState({});

  const inputRef = useRef(null);
  const inputColRef = useRef(null);

  const handleClick = () => {
    setIsOpenPanel((prev) => !prev);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      const length = inputRef.current.value.length;
      inputRef.current.focus();
      inputRef.current.setSelectionRange(0, length);
    }
  }, [isEditing]);

  useEffect(() => {
    if (isColEditing && inputColRef.current) {
      const length = inputColRef.current.value.length;
      inputColRef.current.focus();
      inputColRef.current.setSelectionRange(0, length);
    }
  }, [isColEditing]);

  const handleDragStart = (e, item, col) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        category: `Fields`,
        name: `${col}`,
        col: `${col}`,
        table: item,
        targets: [`Tooltip`, `Columns`],
      })
    );

    e.target.style.opacity = "0.4";
  };
  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };
  return isOpenPanel ? (
    <div
      className="flex w-[200px] h-full flex-col border-l-[1px] overflow-y-scroll bg-gray-300 p-2 relative z-[1]"
      style={{
        width: isPerview ? "0px" : "200px",
        padding: isPerview ? "0px" : "8px",
        transition: "width 0.5s ease-in-out",
        // animation: isPerview
        //   ? "animate-in 0.5s ease-in-out"
        //   : "animate-out 0.5s ease-in-out",
      }}
      // style={{ transition: "width 0.5s ease-in-out" }}
    >
      <div className="w-full">
        <div className="w-full flex flex-row justify-between p-1">
          <p className="text-[12px] font-[800]">Data</p>
          <div className="cursor-pointer" onClick={handleClick}>
            <MdKeyboardDoubleArrowDown size={15} />
          </div>
        </div>
      </div>
      <div className="w-full p-1 relative z-[9]">
        <div className="w-full bg-gray-300 overflow-x-scroll flex flex-col gap-2 p-2">
          {isDataReady ? (
            [
              ...selectedTable,
              ...selectedRelationshipsTable,
              ...AddedTables,
            ]?.map((item, idx) => (
              <TooltipComponent key={idx} content={item} position="LeftTop">
                <div className="flex flex-col w-full gap-1">
                  <div
                    className="w-full flex flex-row justify-start items-center bg-white rounded-[4px] text-[12px] cursor-pointer overflow-hidden pr-[22px]"
                    style={{
                      backgroundColor:
                        activeItem === item ? "#CB1955" : "white",
                      color: activeItem === item ? "white" : "black",
                    }}
                    onClick={() => setActiveItem(item)}
                    onDoubleClick={() => {
                      setIsEditing(true);
                      setRenamedItem(item);
                      setRenamedName(tablesData?.[item]?.name);
                    }}
                  >
                    {renamedItem === item ? (
                      <form
                        className="w-full p-1"
                        onSubmit={(e) => {
                          e.preventDefault();
                          let copiedData = { ...tablesData };
                          copiedData[RenamedName] = {
                            ...copiedData[item],
                            name: RenamedName,
                            data: copiedData[item]?.data,
                          };
                          delete copiedData[item];

                          if (AddedTables?.includes(item)) {
                            let result = [];
                            const res = [...AddedTables];
                            result = res.filter((element) => element !== item);
                            result.push(RenamedName);
                            setAddedTables(result);
                          }
                          setTablesData(copiedData);
                          setRenamedItem("");
                        }}
                      >
                        <input
                          className="text-[12px] w-full outline-none text-black"
                          ref={inputRef}
                          value={RenamedName}
                          onChange={(e) => {
                            setRenamedName(e.target.value);
                          }}
                          onBlur={() => {
                            setRenamedItem("");
                            setIsEditing(false);
                          }}
                        />
                      </form>
                    ) : (
                      <div className="w-full flex flex-row justify-start items-center cursor-pointer h-full">
                        {isPanelDown?.[item] ? (
                          <div
                            className="hover:bg-gray-300 bg-gray-100 p-1 cursor-pointer flex items-center h-full"
                            style={{
                              backgroundColor:
                                activeItem === item ? "#CB1955" : "white",
                              color: activeItem === item ? "white" : "black",
                            }}
                            onClick={() =>
                              setIsPanelDown((prev) =>
                                prev?.[item]
                                  ? {
                                      ...prev,
                                      [item]: !prev?.[item],
                                    }
                                  : { ...prev, [item]: true }
                              )
                            }
                          >
                            <MdKeyboardArrowDown size={14} />
                          </div>
                        ) : (
                          <div
                            className="hover:bg-gray-300 bg-gray-100 p-1 cursor-pointer flex items-center h-full"
                            style={{
                              backgroundColor:
                                activeItem === item ? "#CB1955" : "white",
                              color: activeItem === item ? "white" : "black",
                            }}
                            onClick={() =>
                              setIsPanelDown((prev) =>
                                prev?.[item]
                                  ? {
                                      ...prev,
                                      [item]: !prev?.[item],
                                    }
                                  : { ...prev, [item]: true }
                              )
                            }
                          >
                            <MdKeyboardArrowRight size={14} />
                          </div>
                        )}
                        <div
                          className="w-full flex flex-row items-center gap-1"
                          onClick={() => {
                            setSelectedTableData(tablesData?.[item]?.data);
                          }}
                        >
                          {AddedTables?.includes(item) && (
                            <MdOutlinePlaylistAdd size={14} />
                          )}
                          <p className="w-full overflow-ellipsis whitespace-nowrap overflow-hidden p-1">
                            {tablesData?.[item]?.name}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {isPanelDown?.[item] && tablesData?.[item]?.data?.[0] && (
                    <div className="w-full flex flex-col gap-1 cursor-pointer">
                      {Object.keys(tablesData?.[item]?.data?.[0])?.map(
                        (col, i) => (
                          <TooltipComponent
                            key={i}
                            content={col}
                            position="LeftCenter"
                          >
                            <div
                              className="w-full flex flex-row gap-2 pl-3"
                              onClick={() => setActiveColItem({ [item]: col })}
                              onDoubleClick={() => {
                                setIsColEditing(true);
                                setRenamedColItem(col);
                                setRenamedColName(col);
                              }}
                            >
                              {renamedColItem === col ? (
                                <form
                                  className="w-full"
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    let copiedData = { ...tablesData };
                                    const keys = Object.keys(
                                      tablesData?.[item]?.data?.[0]
                                    ).map((key) =>
                                      key === col ? RenamedColName : key
                                    );
                                    const updatedData = copiedData?.[
                                      item
                                    ]?.data?.map((el) => {
                                      const reorderedObject = keys.reduce(
                                        (acc, key) => {
                                          acc[key] =
                                            key === RenamedColName
                                              ? el[col]
                                              : el[
                                                  key === col
                                                    ? RenamedColName
                                                    : key
                                                ];
                                          return acc;
                                        },
                                        {}
                                      );

                                      return reorderedObject;
                                    });

                                    if (AddedCols?.[item]?.includes(col)) {
                                      let result = [];
                                      const res = [...AddedCols?.[item]];
                                      result = res.filter(
                                        (element) => element !== col
                                      );
                                      result.push(RenamedColName);
                                      setAddedCols((prev) => ({
                                        ...prev,
                                        [item]: [...prev[item], ...result],
                                      }));
                                    }

                                    copiedData[item].data = updatedData;
                                    setTablesData(copiedData);
                                    setSelectedTableData(updatedData);
                                    setRenamedColItem("");
                                  }}
                                >
                                  <input
                                    className="w-full outline-none p-1 rounded-[4px] text-[10px] bg-white text-black"
                                    ref={inputColRef}
                                    value={RenamedColName}
                                    onChange={(e) => {
                                      setRenamedColName(e.target.value);
                                    }}
                                    onBlur={() => {
                                      setRenamedColItem("");
                                      setIsColEditing(false);
                                    }}
                                  />
                                </form>
                              ) : (
                                <div
                                  className="w-full flex flex-row gap-1 items-center px-1 rounded-[4px] active:border-1 active:border-gray-400 active:blur-0"
                                  draggable
                                  onDragStart={(e) =>
                                    handleDragStart(e, item, col)
                                  }
                                  onDragEnd={handleDragEnd}
                                  style={{
                                    backgroundColor:
                                      activeColItem[item] === col
                                        ? "#CB1955"
                                        : "white",
                                    color:
                                      activeColItem[item] === col
                                        ? "white"
                                        : "black",
                                  }}
                                >
                                  {AddedCols?.[item]?.includes(col) && (
                                    <MdOutlinePlaylistAdd size={12} />
                                  )}
                                  {tablesData?.[item]?.dataTypes?.[col]
                                    ?.length === 1 &&
                                    tablesData?.[item]?.dataTypes?.[
                                      col
                                    ]?.[0] === "number" &&
                                    col?.toLocaleLowerCase() !== "id" && (
                                      <TbSum size={20} />
                                    )}
                                  <div className="w-[50%] p-1 rounded-[4px] text-[10px] flex flex-row gap-2 items-center overflow-ellipsis whitespace-nowrap overflow-hidden">
                                    <p className="overflow-ellipsis whitespace-nowrap overflow-hidden">
                                      {col}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </TooltipComponent>
                        )
                      )}
                    </div>
                  )}
                </div>
              </TooltipComponent>
            ))
          ) : (
            <div className="flex flex-row justify-center items-center text-logoColor">
              <ColorRing
                type="ColorRing"
                colors={[logoColor, logoColor, logoColor, logoColor, logoColor]}
                height={20}
                width={20}
              />
              <p className="text-[12px] text-center px-2 text-logoColor font-bold">
                {`Data Loading...`}
              </p>
            </div>
          )}
        </div>
        {/* <div className="w-full flex flex-col gap-1 relative z-[9]">
          <button
            className="w-full p-1 bg-green-700 text-white rounded-[8px] text-[12px]"
            onClick={() => setIsTableCard(true)}
          >
            Add Table
          </button>
          <button
            className="w-full p-1 bg-orange-500 text-white rounded-[8px] text-[12px]"
            onClick={() => setIsRelationshipTableCard(true)}
          >
            Add RelationShip Table
          </button>
          <button
            className="w-full p-1 bg-logoColor text-white rounded-[8px] text-[12px]"
            onClick={() => setIsPreview(true)}
          >
            Preview
          </button>
        </div> */}
      </div>
    </div>
  ) : (
    <div
      className="flex flex-col h-full justify-start items-center gap-8 bg-gray-300 p-2 w-[30px]"
      style={{ transition: "width 0.5s ease-in-out" }}
    >
      <div className="hover:cursor-pointer" onClick={handleClick}>
        <MdKeyboardDoubleArrowRight size={15} />
      </div>
      <div
        className="text-black font-[800] text-[12px]"
        style={{ writingMode: "vertical-lr" }}
      >
        {`Data`}
      </div>
    </div>
  );
};

export default TablesList;
