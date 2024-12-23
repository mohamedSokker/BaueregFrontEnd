import React, { useState, useEffect, useRef } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowRight,
  MdOutlinePlaylistAdd,
} from "react-icons/md";
import { ColorRing } from "react-loader-spinner";

const TablesList = ({
  isDataReady,
  selectedTable,
  tablesData,
  setIsTableCard,
  setIsRelationshipTableCard,
  tableData,
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
}) => {
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
    // const result = [];
    // const scale = isOpenPanel
    //   ? (parseInt(data.containerStyles.width) + 170) /
    //     parseInt(data.containerStyles.width)
    //   : (parseInt(data.containerStyles.width) - 170) /
    //     parseInt(data.containerStyles.width);
    // data?.el?.map((item) => {
    //   result.push({
    //     ...item,
    //     left: `${Math.round(parseInt(item.left) * scale)}%`,
    //   });
    // });
    // setData((prev) => ({
    //   ...prev,
    //   el: result,
    //   containerStyles: { ...prev.containerStyles },
    // }));
  };

  // console.log(tablesData);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      // Focus the input and set the cursor at the end
      const length = inputRef.current.value.length;
      inputRef.current.focus();
      inputRef.current.setSelectionRange(0, length);
    }
  }, [isEditing]);

  useEffect(() => {
    if (isColEditing && inputColRef.current) {
      // Focus the input and set the cursor at the end
      const length = inputColRef.current.value.length;
      inputColRef.current.focus();
      inputColRef.current.setSelectionRange(0, length);
    }
  }, [isColEditing]);
  return isOpenPanel ? (
    <div
      className="flex w-[200px] h-full flex-col border-l-[1px] overflow-y-scroll bg-gray-300 p-2"
      style={{ transition: "width 0.5s ease-in-out" }}
    >
      <div className="w-full">
        <div className="w-full flex flex-row justify-between p-1">
          <p className="text-[12px] font-[800]">Data</p>
          <div className="cursor-pointer" onClick={handleClick}>
            <MdKeyboardDoubleArrowDown size={15} />
          </div>
        </div>
      </div>
      <div className="w-full p-1">
        <div className="w-full bg-gray-300 overflow-x-scroll flex flex-col gap-2 p-2">
          {isDataReady ? (
            selectedTable?.map((item, idx) => (
              <div className="flex flex-col w-full gap-1" key={idx}>
                <div
                  className="w-full flex flex-row justify-start items-center bg-white rounded-[4px] text-[12px] cursor-pointer overflow-hidden pr-[22px]"
                  style={{
                    backgroundColor: activeItem === item ? "#CB1955" : "white",
                    color: activeItem === item ? "white" : "black",
                  }}
                  onClick={() => setActiveItem(item)}
                  onDoubleClick={() => {
                    setIsEditing(true);
                    setRenamedItem(item);
                    setRenamedName(tableData?.[item]?.name);
                  }}
                >
                  {renamedItem === item ? (
                    <form
                      className="w-full p-1"
                      onSubmit={(e) => {
                        e.preventDefault();
                        let copiedData = { ...tableData };
                        copiedData[item] = {
                          ...copiedData[item],
                          name: RenamedName,
                        };

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
                          setSelectedTableData(tableData?.[item]?.data);
                        }}
                      >
                        {AddedTables?.includes(item) && (
                          <MdOutlinePlaylistAdd size={14} />
                        )}
                        <p className="w-full overflow-ellipsis whitespace-nowrap overflow-hidden p-1">
                          {tableData?.[item]?.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {isPanelDown?.[item] && tableData?.[item]?.data?.[0] && (
                  <div className="w-full flex flex-col gap-1 cursor-pointer">
                    {Object.keys(tableData?.[item]?.data?.[0])?.map(
                      (col, i) => (
                        <div
                          key={i}
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
                                let copiedData = { ...tableData };
                                const keys = Object.keys(
                                  tableData?.[item]?.data?.[0]
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
                                              key === col ? RenamedColName : key
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
                              className="w-full flex flex-row gap-1 items-center px-1 rounded-[4px]"
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
                              <p
                                className="w-full p-1 rounded-[4px] text-[10px] bg-white"
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
                                {col}
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
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
        <div className="w-full flex flex-col gap-1">
          <button
            className="w-full p-1 bg-green-600 text-white rounded-[8px] text-[12px]"
            onClick={() => setIsTableCard(true)}
          >
            Add Table
          </button>
          <button
            className="w-full p-1 bg-green-600 text-white rounded-[8px] text-[12px]"
            onClick={() => setIsRelationshipTableCard(true)}
          >
            Add RelationShip Table
          </button>
        </div>
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
