import React, { useEffect, useRef, useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdDone } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import {
  getHelperFunction,
  getHelperFunction1,
  getHelperText,
  keywords,
} from "../../Controllers/Expressions/KeyWordsHelper";
import InfoCard from "../../../../components/Accessories/InfoCard";
import { useInitContext } from "../../Contexts/InitContext";
import FormalDropdown from "../../../../components/Accessories/Dropdown";
import { detectTableColumnTypes } from "../../Services/getTypes";

const ManageTablesTaskbar = () => {
  const {
    setIsActionCard,
    setTablesData,
    setCopiedTablesData,
    setSavedTablesData,
    AddedTables,
    setAddedTables,
    setSelectedTable,
    activeItem,
    setActiveItem,
    activeColItem,
    setActiveColItem,
    tablesData,
    AddedCols,
    setAddedCols,
    setSelectedTableData,
    expressions,
    setExpressions,
    inputValue,
    setInputValue,
    selectedRefTable,
    setSelectedRefTable,
  } = useInitContext();
  const [isChoosed, setIsChoosed] = useState(false);
  const [isChoosedValue, setIsChoosedValue] = useState("");

  const inputRef = useRef();

  // console.log(AddedTables);
  // console.log(AddedCols);
  // console.log(selectedRefTable);
  // console.log(activeColItem);
  // console.log(expressions);

  return (
    <div className="w-full h-[78px]">
      <div className="flex flex-row justify-start items-center text-[12px] gap-x-4 p-1 h-[42px]">
        <TooltipComponent content={"Add Table"} position="BottomCenter">
          <div
            className="cursor-pointer bg-gray-200 rounded-md p-1 px-2 text-logoColor flex flex-col justify-center items-center"
            onClick={() => {
              setTablesData((prev) => ({
                ...prev,
                [`New Table${AddedTables.length + 1}`]: {
                  name: `New Table${AddedTables.length + 1}`,
                  data: [],
                },
              }));
              // setSelectedTable((prev) => [
              //   ...prev,
              //   `New Table${AddedTables.length + 1}`,
              // ]);
              setAddedTables((prev) => [
                ...prev,
                `New Table${AddedTables.length + 1}`,
              ]);
            }}
          >
            <IoIosAdd color="green" />
            <p>New Table</p>
          </div>
        </TooltipComponent>
        <TooltipComponent content={"Add Column"} position="BottomCenter">
          <div
            className="cursor-pointer bg-gray-200 rounded-md p-1 px-2 text-logoColor flex flex-col justify-center items-center"
            onClick={() => {
              if (activeItem !== "") {
                let copiedData = { ...tablesData };
                if (copiedData?.[activeItem]?.data.length === 0) {
                  copiedData[activeItem].data = [{ [`New Column`]: undefined }];
                  // setAddedCols((prev) => [...prev, `New Column`]);
                  setAddedCols((prev) => ({
                    ...prev,
                    [activeItem]: prev?.[activeItem]
                      ? [...prev?.[activeItem], `New Column`]
                      : [`New Column`],
                  }));
                  setTablesData(copiedData);
                  setCopiedTablesData(copiedData);
                  setSavedTablesData(copiedData);
                } else {
                  const updatedData = copiedData?.[activeItem]?.data?.map(
                    (el) => {
                      const { ...rest } = el;
                      return {
                        ...rest,
                        [`New Column`]: undefined,
                      };
                    }
                  );
                  // setAddedCols((prev) => [...prev, `New Column`]);
                  setAddedCols((prev) => ({
                    ...prev,
                    [activeItem]: prev?.[activeItem]
                      ? [...prev?.[activeItem], `New Column`]
                      : [`New Column`],
                  }));

                  setSelectedTableData(updatedData);

                  copiedData[activeItem].data = updatedData;
                  setTablesData(copiedData);
                  setCopiedTablesData(copiedData);
                  setSavedTablesData(copiedData);
                }
              }
            }}
          >
            <IoIosAdd color="green" />
            <p>New Column</p>
          </div>
        </TooltipComponent>

        <div
          className="cursor-pointer bg-gray-200 rounded-md px-2 py-[2px] text-logoColor text-[10px]"
          onClick={() => {}}
        >
          <FormalDropdown
            label={"Type"}
            options={["string", "date", "datetime", "number"]}
            value={
              tablesData?.[activeItem]?.dataTypes?.[
                activeColItem?.[activeItem]
              ]?.[0]
            }
            onChange={(val) => {
              try {
                let copiedData = { ...tablesData };
                if (val === "string") {
                  const newtableData = [];
                  for (const item of tablesData?.[activeItem]?.data) {
                    newtableData.push({
                      ...item,
                      [activeColItem?.[activeItem]]:
                        item?.[activeColItem?.[activeItem]].toString(),
                    });
                  }
                  copiedData[activeItem].data = newtableData;
                  copiedData[activeItem].dataTypes = {
                    ...copiedData[activeItem].dataTypes,
                    [activeColItem?.[activeItem]]: ["string"],
                  };
                } else if (val === "number") {
                  const newtableData = [];
                  for (const item of tablesData?.[activeItem]?.data) {
                    newtableData.push({
                      ...item,
                      [activeColItem?.[activeItem]]: isNaN(
                        Number(item?.[activeColItem?.[activeItem]])
                      )
                        ? item?.[activeColItem?.[activeItem]]
                        : Number(item?.[activeColItem?.[activeItem]]),
                    });
                  }
                  copiedData[activeItem].data = newtableData;
                  copiedData[activeItem].dataTypes = {
                    ...copiedData[activeItem].dataTypes,
                    [activeColItem?.[activeItem]]: ["number"],
                  };
                } else if (val === "date") {
                  const newtableData = [];
                  for (const item of tablesData?.[activeItem]?.data) {
                    newtableData.push({
                      ...item,
                      [activeColItem?.[activeItem]]: new Date(
                        item?.[activeColItem?.[activeItem]]
                      )
                        .toISOString()
                        .slice(0, 10),
                    });
                  }
                  copiedData[activeItem].data = newtableData;
                  copiedData[activeItem].dataTypes = {
                    ...copiedData[activeItem].dataTypes,
                    [activeColItem?.[activeItem]]: ["date"],
                  };
                } else if (val === "datetime") {
                  const newtableData = [];
                  for (const item of tablesData?.[activeItem]?.data) {
                    newtableData.push({
                      ...item,
                      [activeColItem?.[activeItem]]: new Date(
                        item?.[activeColItem?.[activeItem]]
                      )
                        .toISOString()
                        .slice(0, 24),
                    });
                  }
                  copiedData[activeItem].data = newtableData;
                  copiedData[activeItem].dataTypes = {
                    ...copiedData[activeItem].dataTypes,
                    [activeColItem?.[activeItem]]: ["datetime"],
                  };
                }
                setTablesData(copiedData);
                console.log(copiedData);
              } catch (error) {
                console.log(error.message);
              }
            }}
          />
          {/* <p>New Column</p> */}
        </div>

        <TooltipComponent content={"Add Actions"} position="BottomCenter">
          <div
            className="cursor-pointer bg-gray-200 rounded-md p-1 px-2 text-logoColor flex flex-col justify-center items-center"
            onClick={() => setIsActionCard(true)}
          >
            <IoIosAdd color="green" />
            <p>Add Actions</p>
          </div>
        </TooltipComponent>
      </div>
      <div className="flex flex-row gap-2 justify-center items-center w-full p-1 h-[36px] relative">
        <div className="flex flex-grow">
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();

              setIsChoosedValue("");
              if (!AddedTables?.includes(activeItem)) {
                setExpressions((prev) => ({
                  ...prev,
                  [activeItem]: {
                    ...prev?.[activeItem],
                    [activeColItem[activeItem]]: inputValue,
                  },
                }));

                const allowedKeys = [
                  ...Object.keys(tablesData?.[activeItem]?.data?.[0]),
                ];
                console.log(allowedKeys);

                // Sanitize keys
                const sanitizedKeys = allowedKeys.map((key) =>
                  key.replace(/[^a-zA-Z0-9_]/g, "_")
                );

                console.log(getHelperFunction1(inputValue, tablesData));

                const expressionFunction = new Function(
                  ...sanitizedKeys,
                  `${getHelperFunction1(inputValue, tablesData)};`
                );

                let copiedData = { ...tablesData };
                // Loop through the table and add the new column based on the expression
                const result = tablesData?.[activeItem]?.data?.map((row) => ({
                  ...row,
                  [activeColItem[activeItem]]: expressionFunction(
                    ...allowedKeys.map((key) => row[key])
                  ),
                }));
                copiedData[activeItem].data = result;
                console.log(copiedData);
                setTablesData(copiedData);
                setCopiedTablesData(copiedData);
                setSavedTablesData(copiedData);
              } else {
                setExpressions((prev) => ({
                  ...prev,
                  [activeItem]: {
                    ...prev?.[activeItem],
                    [activeColItem[activeItem]]: inputValue,
                  },
                }));

                const allowedKeys = [
                  // ...Object.keys(
                  //   tablesData?.[
                  //     selectedRefTable?.[activeItem]?.[
                  //       activeColItem[activeItem]
                  //     ]
                  //   ]?.data?.[0]
                  // ),
                ];
                console.log(allowedKeys);

                // Sanitize keys
                const sanitizedKeys = allowedKeys.map((key) =>
                  key.replace(/[^a-zA-Z0-9_]/g, "_")
                );

                console.log(getHelperFunction1(inputValue, tablesData));

                const expressionFunction = new Function(
                  "tablesData",
                  ...sanitizedKeys,
                  `${getHelperFunction1(inputValue, tablesData)};`
                );

                let copiedData = { ...tablesData };
                // Loop through the table and add the new column based on the expression
                // const result = tablesData?.[
                //   selectedRefTable?.[activeItem]?.[activeColItem[activeItem]]
                // ]?.data?.flatMap((row) => {
                //   const newValue = expressionFunction(
                //     tablesData,
                //     ...allowedKeys.map((key) => row[key])
                //   );

                //   if (Array.isArray(newValue)) {
                //     return newValue.map((item, i) => {
                //       return { ...item };
                //     });
                //   } else {
                //     return { ...row, [activeColItem[activeItem]]: newValue };
                //   }
                // });
                const result = expressionFunction(tablesData, ...allowedKeys);
                copiedData[activeItem].data = result;
                copiedData[activeItem].dataTypes =
                  detectTableColumnTypes(result);
                console.log(copiedData);
                // console.log(result);
                setTablesData(copiedData);
                setCopiedTablesData(copiedData);
                setSavedTablesData(copiedData);
              }
            }}
          >
            <input
              ref={inputRef}
              className="text-[12px] w-full border border-gray-200 outline-none p-1 pl-3"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (e.target.value[e.target.value.length - 1] === ")") {
                  setIsChoosed(false);
                  // setIsChoosedValue("");
                }
                if (e.target.value === "") {
                  setIsChoosedValue("");
                  setIsChoosed(false);
                }
              }}
              placeholder="Expression"
            />
          </form>
        </div>
        <div className="rounded-[4px] bg-gray-300 h-full flex justify-center items-center px-2 cursor-pointer">
          <MdDone size={14} color="green" />
        </div>
        {isChoosed && (
          <div className="w-[100%] text-logoColor absolute left-0 -top-[38px] z-[100] text-[10px] rounded-[2px] font-[600] flex flex-col gap-1 items-start justify-center">
            <InfoCard message={getHelperText(isChoosedValue)} />
          </div>
        )}
        {inputValue !== "" && (
          <div className="w-[85%] max-h-[200px] overflow-y-scroll bg-yellow-300 opacity-80 text-logoColor absolute left-0 top-[34px] z-[100] text-[10px] rounded-[2px] border border-gray-300 font-[600] flex flex-col gap-[2px] items-start">
            {tablesData?.[activeItem]?.data?.[0] &&
              [
                ...keywords,
                ...Object.keys(tablesData?.[activeItem]?.data?.[0]),
              ]?.map(
                (el, idx) =>
                  el
                    ?.toUpperCase()
                    ?.startsWith(
                      inputValue?.toUpperCase()?.split(" ")?.[
                        inputValue.split(" ")?.length - 1
                      ]
                    ) && (
                    <div
                      key={idx}
                      className="w-full hover:bg-gray-200 p-[2px] cursor-pointer"
                      onClick={() => {
                        let text = inputValue;

                        text =
                          text === ""
                            ? ""
                            : text
                                .split(" ", text.split(" ").length - 1)
                                .join("");
                        setInputValue(`${text}${el}`);
                        setIsChoosed(true);
                        setIsChoosedValue(el);
                        inputRef.current.focus();
                      }}
                    >
                      {el}
                    </div>
                  )
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTablesTaskbar;
