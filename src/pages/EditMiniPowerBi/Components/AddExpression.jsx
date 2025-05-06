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
import FormalDropdown from "../../../components/Accessories/Dropdown";

const operations = ["Sum", "Difference", "Multiply", "Division"];
const expressionsSigns = {
  Multiply: "*",
  Sum: "+",
  Difference: "-",
  Division: "/",
};
const childs = {
  number: [
    { name: "Count" },
    { name: "Sum" },
    { name: "Average" },
    { name: "First" },
    { name: "Last" },
    { name: "Min" },
    { name: "Max" },
  ],
  string: [{ name: "Count" }, { name: "First" }, { name: "Last" }],
  expressions: [
    { name: "Sum" },
    { name: "Multiply" },
    { name: "Difference" },
    { name: "Division" },
  ],
};

const AddExpression = ({ setIsExpressionCard }) => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [firstArg, setFirstArg] = useState("");
  const [secondArg, setSecondArg] = useState("");
  const [operation, setOperation] = useState("Division");
  const [argOptions, setArgOptions] = useState([]);

  //   const [colData, setColData] = useState({});
  //   const [isSelectAllChecked, setIsSelectAllChecked] = useState({});
  //   const [isItemChecked, setIsItemChecked] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    data,
    setData,
    selectedItem,
    tablesData,
    setTablesData,
    savedTablesData,
    setSavedTablesData,
    copiedTablesData,
    setCopiedTablesData,
  } = useInitContext();

  useEffect(() => {
    const result = [];
    [
      ...data.el[selectedItem]?.Y_Axis,
      ...data.el[selectedItem]?.tooltips,
      ...data.el[selectedItem]?.expressions,
    ]?.map((item) => {
      if (!result?.includes(item?.name)) result.push(item?.name);
    });
    setArgOptions(result);
  }, []);

  const handleApply = async () => {
    const copiedData = { ...data };

    copiedData.el[selectedItem]?.expressions?.push({
      opType: operation,
      isSeen: true,
      name: `${firstArg} ${expressionsSigns?.[operation]} ${secondArg}`,
      firstArg: firstArg,
      secondArg: secondArg,
      col: "",
      table: "",
      childItems: childs?.expressions,
    });
    console.log(copiedData);
    setData(copiedData);
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
        className={`md:w-[25%] w-[25%] aspect-square flex flex-col justify-between items-center bg-white relative z-[1001] mainContent overflow-y-scroll`}
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
                    setIsExpressionCard(false);
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
              <div className="font-[700] text-[12px]">First Param</div>
              <div className="w-full flex flex-col gap-1 justify-start items-start text-[10px]">
                <FormalDropdown
                  label={``}
                  options={argOptions}
                  onChange={(val) => setFirstArg(val)}
                  value={firstArg}
                  required={true}
                />
              </div>

              <div className="font-[700] text-[12px]">Second Param</div>
              <div className="w-full flex flex-col gap-1 justify-start items-start text-[10px]">
                <FormalDropdown
                  label={``}
                  options={argOptions}
                  onChange={(val) => setSecondArg(val)}
                  value={secondArg}
                  required={true}
                />
              </div>

              <div className="font-[700] text-[12px]">Operation</div>
              <div className="w-full flex flex-col gap-1 justify-start items-start text-[10px]">
                <FormalDropdown
                  label={``}
                  options={operations}
                  onChange={(val) => setOperation(val)}
                  value={operation}
                  required={true}
                />
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
                  setIsExpressionCard(false);
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
                  setIsExpressionCard(false);
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

export default AddExpression;
