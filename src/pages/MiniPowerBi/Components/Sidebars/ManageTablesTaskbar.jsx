import React, { useRef, useState } from "react";
import { MdDone } from "react-icons/md";
import {
  getHelperFunction,
  getHelperText,
  keywords,
} from "../../Controllers/Expressions/KeyWordsHelper";
import InfoCard from "../../../../components/Accessories/InfoCard";
import { useInitContext } from "../../Contexts/InitContext";

const ManageTablesTaskbar = () => {
  const {
    setTablesData,
    AddedTables,
    setAddedTables,
    setSelectedTable,
    activeItem,
    activeColItem,
    setActiveColItem,
    tablesData,
    setAddedCols,
    setSelectedTableData,
    expressions,
    setExpressions,
    inputValue,
    setInputValue,
  } = useInitContext();
  const [isChoosed, setIsChoosed] = useState(false);
  const [isChoosedValue, setIsChoosedValue] = useState("");

  const inputRef = useRef();

  // console.log(expressions);

  return (
    <div className="w-full h-[78px]">
      <div className="flex flex-row justify-start items-center text-[12px] gap-1 p-1 h-[42px]">
        {/* <div
          className="cursor-pointer bg-gray-200 rounded-md p-2 text-logoColor"
          onClick={() => {
            setTablesData((prev) => ({
              ...prev,
              [`New Table${AddedTables.length + 1}`]: {
                name: `New Table${AddedTables.length + 1}`,
                data: [],
              },
            }));
            setSelectedTable((prev) => [
              ...prev,
              `New Table${AddedTables.length + 1}`,
            ]);
            setAddedTables((prev) => [
              ...prev,
              `New Table${AddedTables.length + 1}`,
            ]);
          }}
        >
          <p>New Table</p>
        </div> */}
        <div
          className="cursor-pointer bg-gray-200 rounded-md p-2 text-logoColor"
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
              }
            }
          }}
        >
          <p>New Column</p>
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-center items-center w-full p-1 h-[36px] relative">
        <div className="flex flex-grow">
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(getHelperFunction(inputValue, isChoosedValue));
              setIsChoosedValue("");
              setExpressions((prev) => ({
                ...prev,
                [activeItem]: {
                  ...prev?.[activeItem],
                  [activeColItem[activeItem]]: inputValue,
                },
              }));

              // const expressionFunction = new Function(
              //   `const fn = (tableData) => {${inputValue}}; return fn`
              // )();

              // console.log(expressionFunction(tableData));

              const allowedKeys = [
                ...Object.keys(tablesData?.[activeItem]?.data?.[0]),
                // ...Object.keys(tableData),
              ];

              // console.log(allowedKeys);
              // // tableData?.[activeItem]?.data?.map((row, idx) => {
              // //   if (idx === 0)
              // //     console.log(...allowedKeys.map((key) => row[key]));
              // // });

              const expressionFunction = new Function(
                ...allowedKeys,
                `${getHelperFunction(inputValue, isChoosedValue)};`
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
