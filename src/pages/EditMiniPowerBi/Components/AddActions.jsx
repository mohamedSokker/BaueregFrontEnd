import React, { useEffect, useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { ColorRing } from "react-loader-spinner";

import "../Styles/EditCard.css";
// import useTablesData from "../Controllers/TablesData";
import Table from "./Table";
import { logoColor } from "../../../BauerColors";
import { useDataContext } from "../Contexts/DataContext";
import { detectTableColumnTypes } from "../Services/getTypes";
import RadioGroup from "../../../components/Accessories/RadioGroup";
import { useInitContext } from "../Contexts/InitContext";

const AddActions = ({ setIsActionCard }) => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [selectedTable, setSelectedTable] = useState({});
  const [selectedCol, setSelectedCol] = useState({});
  const [selectedSortTable, setSelectedSortTable] = useState({});
  const [selectedSortCol, setSelectedSortCol] = useState({});
  //   const [colData, setColData] = useState({});
  //   const [isSelectAllChecked, setIsSelectAllChecked] = useState({});
  //   const [isItemChecked, setIsItemChecked] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    tablesData,
    setTablesData,
    isItemChecked,
    setIsItemChecked,
    isItemUnChecked,
    setIsItemUnChecked,
    isSelectAllChecked,
    setIsSelectAllChecked,
    savedTablesData,
    setSavedTablesData,
    copiedTablesData,
    setCopiedTablesData,
    colData,
    setColData,
    isSortChecked,
    setIsSortChecked,
  } = useInitContext();

  //   useEffect(() => {
  //     setColData(isItemChecked);
  //   }, []);

  const sortByKey = (array, key) => {
    return array.sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      // Handle null or undefined
      if (valA == null) return 1;
      if (valB == null) return -1;

      // Number
      if (typeof valA === "number" && typeof valB === "number") {
        return valA - valB;
      }

      // Date (ISO strings or Date objects)
      if (valA instanceof Date || !isNaN(Date.parse(valA))) {
        return new Date(valA) - new Date(valB);
      }

      // String (localeCompare handles case and diacritics)
      return String(valA).localeCompare(String(valB));
    });
  };

  //   console.log(isSelectAllChecked);
  //   console.log(isItemChecked);
  //   console.log(isItemUnChecked);
  //   console.log(colData);
  //   console.log(isSortChecked);

  const handleColClick = (col, table) => {
    const result = [];
    if (!colData?.[table]?.[col]) {
      savedTablesData?.[table]?.data?.map((item) => {
        result.push(item?.[col]);
      });
      setColData((prev) => ({
        ...prev,
        [table]: {
          ...prev?.[table],
          [col]: Array.from(new Set(result)).sort(),
        },
      }));
    }

    setSelectedCol((prev) => ({
      ...prev,
      [table]: {
        ...prev?.[table],
        [col]: !prev?.[table]?.[col],
      },
    }));
  };

  const handleSortColClick = (col, table) => {
    setIsSortChecked((prev) => ({
      ...prev,
      [table]: [col],
    }));
  };

  const handleApply = async () => {
    let slicers = {};

    Object.keys(isItemUnChecked || {}).forEach((table) => {
      slicers[table] = [];
      Object.keys(isItemUnChecked[table] || {}).forEach((col) => {
        (isItemUnChecked[table][col] || []).forEach((item) => {
          //   if (!slicers[table]) slicers[table] = [];
          slicers[table].push({ colName: col, item });
        });
      });
    });

    console.log(slicers);

    let result = { ...savedTablesData };
    let resultData = [];
    Object.keys(savedTablesData)?.map((table) => {
      sortByKey(savedTablesData?.[table]?.data, isSortChecked?.[table]?.[0]);
      resultData = [];
      resultData = savedTablesData?.[table]?.data?.filter((row) => {
        return slicers?.[table]?.every(({ colName, item }) => {
          if (row[colName] === item) {
            return false;
          } else {
            return true;
          }
        });
      });
      result[table] = {
        ...result[table],
        data: resultData,
      };
    });
    // console.log(result);
    setTablesData(result);
    setCopiedTablesData(result);
  };

  return (
    <div
      className="fixed opacity-100 w-screen h-screen flex flex-col items-center justify-center left-0 top-0"
      style={{ zIndex: "1000" }}
    >
      <div
        className="absolute  w-screen h-screen flex flex-col items-center justify-center left-0 top-0 z-[1000]"
        style={{ backdropFilter: "blur(2px)", opacity: 0.8 }}
      ></div>
      <div
        className={`md:w-[30%] w-[30%] aspect-square flex flex-col justify-between items-center bg-white relative z-[1001] mainContent overflow-y-scroll`}
        style={{
          animation: !isCanceled
            ? "animate-in 0.5s ease-in-out"
            : "animate-out 0.5s ease-in-out",
        }}
      >
        <div className="flex flex-row w-full p-2 px-2 justify-end">
          <div>
            <TooltipComponent
              content="close"
              position="BottomCenter"
              className="flex items-center"
            >
              <button
                className="hover:cursor-pointer p-1 text-[10px] rounded-full bg-gray-300 hover:bg-gray-400 w-[25px] aspect-square flex justify-center items-center"
                onClick={() => {
                  setIsCanceled(true);
                  setTimeout(() => {
                    setIsActionCard(false);
                  }, 500);
                }}
              >
                X
              </button>
            </TooltipComponent>
          </div>
        </div>

        <div className="w-full h-full flex flex-row justify-start items-start px-2 overflow-y-scroll text-[10px]">
          {isLoading ? (
            <div className="flex flex-row justify-center items-center text-logoColor">
              <ColorRing
                type="ColorRing"
                colors={[logoColor, logoColor, logoColor, logoColor, logoColor]}
                height={20}
                width={20}
              />
              <p className="text-[12px] text-center px-2 text-logoColor font-bold">
                {`Initializing...`}
              </p>
            </div>
          ) : (
            <div className="w-full flex flex-col justify-start gap-1">
              <div className="font-[700] text-[12px]">Filters</div>
              <div className="w-full flex flex-col gap-1 justify-start items-start text-[10px]">
                {Object.keys(savedTablesData)?.map((table) => (
                  <div
                    key={table}
                    className="p-1 py-[6px] bg-gray-50 w-[100%] flex flex-col items-center justify-between border rounded-[4px] hover:cursor-pointer overflow-ellipsis whitespace-nowrap overflow-hidden"
                    style={{
                      borderColor: selectedTable?.[table]
                        ? "rgb(209,213,219)"
                        : "rgb(229,231,235)",
                    }}
                  >
                    <div
                      className="w-full flex flex-row items-center justify-between"
                      onClick={() =>
                        setSelectedTable((prev) => ({
                          ...prev,
                          [table]: !prev?.[table],
                        }))
                      }
                    >
                      <p className="overflow-ellipsis whitespace-nowrap overflow-hidden">
                        {table}
                      </p>
                      <div>
                        {selectedTable?.[table] ? (
                          <MdKeyboardArrowDown size={15} />
                        ) : (
                          <MdKeyboardArrowRight size={15} />
                        )}
                      </div>
                    </div>
                    {selectedTable?.[table] && (
                      <div className="w-full pl-2 overflow-ellipsis whitespace-nowrap overflow-hidden">
                        {Object.keys(savedTablesData?.[table]?.data?.[0])?.map(
                          (col) => (
                            <div
                              key={col}
                              className="w-full flex flex-col justify-start items-start text-[10px]"
                            >
                              <div
                                className="w-full flex flex-row items-center justify-between overflow-ellipsis whitespace-nowrap overflow-hidden"
                                onClick={() => handleColClick(col, table)}
                              >
                                <p className="overflow-ellipsis whitespace-nowrap overflow-hidden">
                                  {col}
                                </p>
                                {selectedCol?.[table]?.[col] ? (
                                  <MdKeyboardArrowDown size={14} />
                                ) : (
                                  <MdKeyboardArrowRight size={14} />
                                )}
                              </div>
                              {selectedCol?.[table]?.[col] && (
                                <div className="w-full pl-3 flex flex-col items-start justify-center">
                                  <div className="w-full flex flex-row items-center gap-1">
                                    <input
                                      type="checkbox"
                                      checked={
                                        isSelectAllChecked?.[table]?.[col]
                                          ?.SelectAll
                                          ? true
                                          : false
                                      }
                                      onChange={() => {
                                        let result = { ...isItemChecked };
                                        let unCheckedResult = {
                                          ...isItemUnChecked,
                                        };
                                        colData?.[table]?.[col]?.map((item) => {
                                          result = {
                                            ...result,
                                            [table]: {
                                              ...result?.[table],
                                              [col]: isSelectAllChecked?.[
                                                table
                                              ]?.[col]?.SelectAll
                                                ? []
                                                : [...colData?.[table]?.[col]],
                                            },
                                          };
                                          unCheckedResult = {
                                            ...unCheckedResult,
                                            [table]: {
                                              ...unCheckedResult?.[table],
                                              [col]: isSelectAllChecked?.[
                                                table
                                              ]?.[col]?.SelectAll
                                                ? [...colData?.[table]?.[col]]
                                                : [],
                                            },
                                          };
                                        });
                                        setIsItemChecked(result);
                                        setIsItemUnChecked(unCheckedResult);
                                        setIsSelectAllChecked((prev) => ({
                                          ...prev,
                                          [table]: {
                                            ...prev?.[table],
                                            [col]: {
                                              ...prev?.[table]?.[col],
                                              SelectAll:
                                                !prev?.[table]?.[col]
                                                  ?.SelectAll,
                                            },
                                          },
                                        }));
                                      }}
                                    />
                                    <p>Select All</p>
                                  </div>
                                  {colData?.[table]?.[col]?.map((item) => (
                                    <div
                                      key={item}
                                      className="w-full flex flex-row items-center gap-1 overflow-ellipsis whitespace-nowrap overflow-hidden"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={
                                          isItemUnChecked?.[table]?.[
                                            col
                                          ]?.includes(item)
                                            ? false
                                            : true
                                        }
                                        onChange={() => {
                                          setIsItemChecked((prev) => ({
                                            ...prev,
                                            [table]: {
                                              ...prev?.[table],
                                              [col]: !prev?.[table]?.[
                                                col
                                              ]?.includes(item)
                                                ? [
                                                    ...prev?.[table]?.[col],
                                                    item,
                                                  ]
                                                : prev?.[table]?.[col]?.filter(
                                                    (el) => el !== item
                                                  ),
                                            },
                                          }));
                                          setIsItemUnChecked((prev) => ({
                                            ...prev,
                                            [table]: {
                                              ...prev?.[table],
                                              [col]: !prev?.[table]?.[
                                                col
                                              ]?.includes(item)
                                                ? [
                                                    ...prev?.[table]?.[col],
                                                    item,
                                                  ]
                                                : prev?.[table]?.[col]?.filter(
                                                    (el) => el !== item
                                                  ),
                                            },
                                          }));
                                        }}
                                      />
                                      <p className="overflow-ellipsis whitespace-nowrap overflow-hidden">
                                        {item}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="font-[700] text-[12px]">Sort</div>
              <div className="w-full flex flex-col gap-1 justify-start items-start text-[10px]">
                {Object.keys(savedTablesData)?.map((table) => (
                  <div
                    key={table}
                    className="p-1 py-[6px] bg-gray-50 w-[100%] flex flex-col items-center justify-between border rounded-[4px] hover:cursor-pointer overflow-ellipsis whitespace-nowrap overflow-hidden"
                    style={{
                      borderColor: selectedSortTable?.[table]
                        ? "rgb(209,213,219)"
                        : "rgb(229,231,235)",
                    }}
                  >
                    <div
                      className="w-full flex flex-row items-center justify-between"
                      onClick={() =>
                        setSelectedSortTable((prev) => ({
                          ...prev,
                          [table]: !prev?.[table],
                        }))
                      }
                    >
                      <p className="overflow-ellipsis whitespace-nowrap overflow-hidden">
                        {table}
                      </p>
                      <div>
                        {selectedSortTable?.[table] ? (
                          <MdKeyboardArrowDown size={15} />
                        ) : (
                          <MdKeyboardArrowRight size={15} />
                        )}
                      </div>
                    </div>
                    {selectedSortTable?.[table] && (
                      <div className="w-full pl-2 overflow-ellipsis whitespace-nowrap overflow-hidden">
                        {Object.keys(savedTablesData?.[table]?.data?.[0])?.map(
                          (col) => (
                            <div
                              key={col}
                              className="w-full flex flex-col justify-start items-start text-[10px]"
                            >
                              <div
                                className="w-full flex flex-row items-center justify-between overflow-ellipsis whitespace-nowrap overflow-hidden rounded-sm pl-1"
                                style={{
                                  backgroundColor: isSortChecked?.[
                                    table
                                  ]?.includes(col)
                                    ? "#CB1955"
                                    : "white",
                                  color: isSortChecked?.[table]?.includes(col)
                                    ? "white"
                                    : "black",
                                }}
                                onClick={() => handleSortColClick(col, table)}
                              >
                                <p className="overflow-ellipsis whitespace-nowrap overflow-hidden">
                                  {col}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-full flex flex-row  justify-between items-center p-2 px-2 text-[10px]">
          <div className="">
            <button
              className="text-white w-full font-[600] text-[10px] bg-[rgb(0,0,255)] rounded-md p-1 px-8"
              onClick={async () => {
                setIsCanceled(true);
                setTimeout(() => {
                  setIsActionCard(false);
                }, 500);
              }}
            >
              {`Cancel`}
            </button>
          </div>
          <div className="">
            <button
              className="text-white w-full font-[600] text-[10px] bg-[rgb(0,0,255)] rounded-md p-1 px-8"
              onClick={async () => {
                setIsCanceled(true);
                await handleApply();
                setTimeout(() => {
                  setIsActionCard(false);
                }, 500);
              }}
            >
              {`Apply`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddActions;
