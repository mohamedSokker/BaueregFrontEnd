import React, { useEffect, useRef, useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdOutlinePlaylistAdd,
} from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { TbSum } from "react-icons/tb";
import { useInitContext } from "../../Contexts/InitContext";
const ManageTablesLists = ({ setTableLoading }) => {
  const {
    selectedTable,
    selectedRelationshipsTable,
    setSelectedTable,
    tablesData,
    setTablesData,
    setSelectedTableData,
    selectedTableData,
    activeItem,
    setActiveItem,
    AddedCols,
    setAddedCols,
    activeColItem,
    setActiveColItem,
    AddedTables,
    setAddedTables,
    expressions,
    setExpressions,
    inputValue,
    setInputValue,
    selectedRefTable,
    setSelectedRefTable,
  } = useInitContext();

  const [isEditing, setIsEditing] = useState(false);
  const [isColEditing, setIsColEditing] = useState(false);
  const [renamedItem, setRenamedItem] = useState("");
  const [RenamedName, setRenamedName] = useState("");
  const [renamedColItem, setRenamedColItem] = useState("");

  const [RenamedColName, setRenamedColName] = useState("");
  const [isOpenPanel, setIsOpenPanel] = useState({});
  const [isRefTableCard, setIsRefTableCard] = useState({});
  // const [selectedRefTable, setSelectedRefTable] = useState({});

  // console.log(selectedRefTable);
  // console.log(selectedTable);
  // console.log(selectedRefTable);
  // console.log(tableData);
  // console.log(tablesData);

  const inputRef = useRef(null);
  const inputColRef = useRef(null);

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

  useEffect(() => {
    if (Object.keys(tablesData).length > 0) {
      // console.log(
      //   Object.keys(tablesData?.[Object.keys(tablesData)?.[0]]?.data?.[0])?.[0]
      // );
      // console.log(activeColItem);
      // console.log(tablesData?.[Object.keys(tablesData)?.[0]]?.data);
      if (activeItem === "" || !activeItem) {
        setTableLoading(true);
        setTimeout(() => {
          setActiveItem(Object.keys(tablesData)?.[0]);
          setSelectedTableData(
            tablesData?.[Object.keys(tablesData)?.[0]]?.data
          );
          setTableLoading(false);
        }, 0);
        // setActiveItem(Object.keys(tablesData)?.[0]);
      }
      if (
        activeColItem === "" ||
        !activeColItem ||
        Object.keys(activeColItem).length === 0
      ) {
        setActiveColItem({
          [Object.keys(tablesData)?.[0]]: Object.keys(
            tablesData?.[Object.keys(tablesData)?.[0]]?.data?.[0]
          )?.[0],
        });
      }
    }
  }, [tablesData]);
  return (
    <div className="flex w-[200px] h-full flex-col bg-gray-200 border-l-[1px] overflow-y-scroll p-2 gap-2">
      {[...selectedTable, ...selectedRelationshipsTable, ...AddedTables]?.map(
        (item, idx) => (
          <div className="flex flex-col w-full gap-1" key={idx}>
            <div
              className="w-full flex flex-row justify-start items-center bg-white rounded-[4px] text-[12px] cursor-pointer pr-[22px] relative"
              style={{
                backgroundColor: activeItem === item ? "#CB1955" : "white",
                color: activeItem === item ? "white" : "black",
              }}
              onClick={() => {
                setTableLoading(true);
                setTimeout(() => {
                  setActiveItem(item);
                  setTableLoading(false);
                }, 0);
              }}
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
                    // console.log(copiedData);
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
                  {isOpenPanel?.[item] ? (
                    <div
                      className="hover:bg-gray-300 bg-gray-100 p-1 cursor-pointer flex items-center h-full rounded-[4px]"
                      style={{
                        backgroundColor:
                          activeItem === item ? "#CB1955" : "white",
                        color: activeItem === item ? "white" : "black",
                      }}
                      onClick={() =>
                        setIsOpenPanel((prev) =>
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
                      className="hover:bg-gray-300 bg-gray-100 p-1 cursor-pointer flex items-center h-full rounded-[4px]"
                      style={{
                        backgroundColor:
                          activeItem === item ? "#CB1955" : "white",
                        color: activeItem === item ? "white" : "black",
                      }}
                      onClick={() =>
                        setIsOpenPanel((prev) =>
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
                    className="w-full flex flex-row items-center gap-1 relative"
                    onClick={() => {
                      setTableLoading(true);
                      setTimeout(() => {
                        setSelectedTableData(tablesData?.[item]?.data);
                        setTableLoading(false);
                      }, 0);
                    }}
                  >
                    {AddedTables?.includes(item) && (
                      <MdOutlinePlaylistAdd size={18} />
                    )}
                    <p className="w-full overflow-ellipsis whitespace-nowrap overflow-hidden p-1">
                      {tablesData?.[item]?.name}
                    </p>

                    {AddedTables?.includes(item) && (
                      <div
                        className="absolute -right-[12px] hover:text-gray-500"
                        onClick={() => {
                          let copiedTablesData = {};
                          Object.keys(tablesData)?.map((it) => {
                            if (item !== it) {
                              copiedTablesData = {
                                ...copiedTablesData,
                                [it]: tablesData[it],
                              };
                            }
                          });
                          console.log(copiedTablesData);
                          setTablesData(copiedTablesData);

                          if (AddedTables?.includes(item)) {
                            let result = [];
                            const res = [...AddedTables];
                            result = res.filter((element) => element !== item);
                            setAddedTables(result);
                          }
                          // setSelectedTable(
                          //   selectedTable?.filter((it) => it !== item)
                          // );
                          // console.log(item);
                        }}
                      >
                        <TiDelete size={18} />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {isOpenPanel?.[item] && tablesData?.[item]?.data?.[0] && (
              <div className="w-full flex flex-col gap-1 cursor-pointer">
                {Object.keys(tablesData?.[item]?.data?.[0])?.map((col, i) => (
                  <div
                    key={i}
                    className="w-full flex flex-row gap-2 pl-3 relative text-[10px]"
                    onClick={() => {
                      setActiveColItem({ [item]: col });
                      setActiveItem(item);
                      setInputValue(
                        expressions?.[item]?.[col]
                          ? expressions?.[item]?.[col]
                          : ""
                      );
                    }}
                    onDoubleClick={() => {
                      setIsColEditing(true);
                      setRenamedColItem(col);
                      setRenamedColName(col);
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      if (AddedTables.includes(item)) {
                        setIsRefTableCard((prev) => ({
                          ...prev,
                          [item]: {
                            ...prev[item],
                            [col]: !prev?.[item]?.[col],
                          },
                        }));
                      }
                    }}
                  >
                    {isRefTableCard?.[item]?.[col] && (
                      <div className="absolute left-0 top-[26px] z-[100] text-white w-full bg-logoColor rounded-[4px] overflow-hidden  flex flex-col items-start justify-center">
                        {[...selectedTable, ...AddedTables]
                          // ?.filter((element) => element !== item)
                          ?.map((el, idx) => (
                            <div
                              key={idx}
                              className="w-full flex flex-row justify-start items-center p-1"
                              style={{
                                backgroundColor:
                                  selectedRefTable[item]?.[col] === el
                                    ? "#CB1955"
                                    : "rgb(0,74,128)",
                              }}
                              onClick={() => {
                                setSelectedRefTable((prev) => ({
                                  ...prev,
                                  [item]: { ...prev?.[item], [col]: el },
                                }));
                                setIsRefTableCard((prev) => ({
                                  ...prev,
                                  [item]: {
                                    ...prev[item],
                                    [col]: false,
                                  },
                                }));
                              }}
                            >
                              {tablesData?.[el]?.name}
                            </div>
                          ))}
                      </div>
                    )}

                    {renamedColItem === col ? (
                      <form
                        className="w-full"
                        onSubmit={(e) => {
                          e.preventDefault();
                          let copiedData = { ...tablesData };
                          const keys = Object.keys(
                            tablesData?.[item]?.data?.[0]
                          ).map((key) => (key === col ? RenamedColName : key));
                          const updatedData = copiedData?.[item]?.data?.map(
                            (el) => {
                              const reorderedObject = keys.reduce(
                                (acc, key) => {
                                  acc[key] =
                                    key === RenamedColName
                                      ? el[col]
                                      : el[key === col ? RenamedColName : key];
                                  return acc;
                                },
                                {}
                              );

                              return reorderedObject;
                            }
                          );

                          if (AddedCols?.[item]?.includes(col)) {
                            let result = [];
                            const res = [...AddedCols?.[item]];
                            result = res.filter((element) => element !== col);
                            result.push(RenamedColName);
                            setAddedCols((prev) => ({
                              ...prev,
                              [item]: result,
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
                        className="w-full flex flex-row gap-1 items-center px-1 rounded-[4px] relative overflow-ellipsis whitespace-nowrap overflow-hidden"
                        onClick={() => {
                          setTableLoading(true);
                          setTimeout(() => {
                            setSelectedTableData(tablesData?.[item]?.data);
                            setTableLoading(false);
                          }, 0);
                        }}
                        style={{
                          borderColor:
                            activeColItem[item] === col
                              ? "#CB1955"
                              : "transparent",
                          borderWidth:
                            activeColItem[item] === col ? "1px" : "none",
                          color:
                            activeColItem[item] === col ? "black" : "black",
                        }}
                      >
                        {AddedCols?.[item]?.includes(col) && (
                          <MdOutlinePlaylistAdd size={12} />
                        )}
                        {tablesData?.[item]?.dataTypes?.[col]?.length === 1 &&
                          tablesData?.[item]?.dataTypes?.[col]?.[0] ===
                            "number" &&
                          col?.toLocaleLowerCase() !== "id" && (
                            <TbSum size={20} />
                          )}
                        <div className="w-[50%] p-1 rounded-[4px] text-[10px] flex flex-row gap-2 items-center overflow-ellipsis whitespace-nowrap overflow-hidden">
                          <p
                            className="overflow-ellipsis whitespace-nowrap overflow-hidden"
                            // style={
                            //   {
                            //     backgroundColor:
                            //       activeColItem[item] === col ? "#CB1955" : "white",
                            //     color:
                            //       activeColItem[item] === col ? "black" : "black",
                            //   }
                            // }
                          >
                            {col}
                          </p>
                        </div>

                        {AddedCols?.[item]?.includes(col) && (
                          <div
                            className="absolute right-[12px] hover:text-gray-500"
                            onClick={() => {
                              let copiedData = { ...tablesData };
                              let copiedExpression = {};
                              let copiedRefTables = {};
                              if (Object.keys(expressions).length > 0) {
                                const { [col]: oldValue, ...rest } =
                                  expressions[item];
                                copiedExpression[item] = { ...rest };
                                setExpressions((prev) => ({
                                  ...prev,
                                  ...copiedExpression,
                                }));
                              }

                              if (Object.keys(selectedRefTable).length > 0) {
                                const { [col]: oldValue, ...rest } =
                                  selectedRefTable[item];
                                copiedRefTables[item] = { ...rest };
                                setSelectedRefTable((prev) => ({
                                  ...prev,
                                  ...copiedRefTables,
                                }));
                              }

                              if (
                                Object.keys(tablesData?.[item]?.data?.[0])
                                  .length === 1
                              ) {
                                copiedData[item].data = [];
                                setTablesData(copiedData);
                              } else {
                                const updatedData = tablesData?.[
                                  item
                                ]?.data?.map((it) => {
                                  const { [col]: oldValue, ...rest } = it;
                                  return { ...rest };
                                });
                                copiedData[item].data = updatedData;
                                setTablesData(copiedData);
                              }

                              if (AddedCols?.[item]?.includes(col)) {
                                let result = [];
                                const res = [...AddedCols?.[item]];
                                result = res.filter(
                                  (element) => element !== col
                                );
                                setAddedCols((prev) => ({
                                  ...prev,
                                  [item]: result,
                                }));
                              }
                            }}
                          >
                            <TiDelete size={18} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default ManageTablesLists;
