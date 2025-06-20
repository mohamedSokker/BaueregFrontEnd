import React, { useEffect, useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { ColorRing } from "react-loader-spinner";

import "../../Styles/EditCard.css";
import Table from "../Table";
import { logoColor } from "../../../../BauerColors";
import DropDown from "../DropDown";
import { tablesOptions } from "../../Model/model";
import Lists from "../Lists";

const AddTableSceneCard = ({
  setIsTableSceneCard,
  data,
  setData,
  tables,
  tablesData,
  virtualTables,
  // currentID,
  // setCurrentID,
}) => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [tablesSelectedData, setTablesSelectedData] = useState(null);
  const [columnsSelectedData, setColumnsSelectedData] = useState([]);

  // console.log(tablesData);
  // console.log(tablesSelectedData);

  useEffect(() => {
    // setCurrentID((prev) => prev + 1);
    setCurrentData((prev) => ({
      ...prev,
      ID: data.el?.length,
      ...tablesOptions,
    }));
  }, []);

  // console.log(currentData);

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
        className={`md:w-[95%] w-[95%] md:h-[85%] h-[90%] flex flex-col justify-between items-center bg-white relative z-[1001] mainContent overflow-y-scroll`}
        style={{
          animation: !isCanceled
            ? "animate-in 0.5s ease-in-out"
            : "animate-out 0.5s ease-in-out",
        }}
      >
        <div className="flex flex-row w-full p-2 px-6 justify-between">
          <div>
            <TooltipComponent
              content="close"
              position="BottomCenter"
              className="flex items-center"
            >
              <button
                className="hover:cursor-pointer p-2 rounded-full bg-gray-300 hover:bg-gray-400 aspect-square flex justify-center items-center"
                onClick={() => {
                  setIsCanceled(true);
                  setTimeout(() => {
                    setIsTableSceneCard(false);
                  }, 500);
                }}
              >
                X
              </button>
            </TooltipComponent>
          </div>
        </div>

        <div className="w-full h-full flex flex-col gap-2 justify-start items-start px-2 overflow-y-scroll">
          <DropDown
            tableData={tables}
            // tableData={["VirtualTable"]}
            label={`Table`}
            handleChange={(e) => {
              setTablesSelectedData(e.target.value);
              // setTablesSelectedData("VirtualTable");
              setCurrentData((prev) => ({
                ...prev,
                name: e.target.value,
                table: e.target.value,
              }));
            }}
            selectedData={tablesSelectedData}
          />

          <Lists
            label={`Columns`}
            selectedData={columnsSelectedData}
            // setSelectedData={setColumnsSelectedData}
            tableData={
              // Object.keys(virtualTables?.[0])
              tablesData && tablesSelectedData
                ? Object.keys(tablesData?.[tablesSelectedData]?.data?.[0])
                : []
            }
            handleChange={(e, item) => {
              if (e.target.checked === true) {
                const result = [...columnsSelectedData];
                result.push(item);
                console.log(result);
                setColumnsSelectedData(result);
                setCurrentData((prev) => ({
                  ...prev,
                  columns: [...result],
                }));
              } else if (e.target.checked === false) {
                const array = [...columnsSelectedData];
                const result = array.filter((el) => el !== item);
                setColumnsSelectedData(result);
                console.log(result);
                setCurrentData((prev) => ({
                  ...prev,
                  columns: [...result],
                }));
              }
            }}
          />
          {/* <div className="p-2 flex flex-col justify-center items-center ">
            <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start ">
              Pagging
            </p>
            <div className="flex flex-row gap-2 items-center relative">
              <input
                className="p-2 w-[30vw] bg-white text-[14px]"
                type="checkbox"
                checked={currentData?.pagging}
                onChange={(e) =>
                  setCurrentData((prev) => ({
                    ...prev,
                    pagging: !prev.pagging,
                  }))
                }
              />
            </div>
          </div> */}

          {/* <div className="p-2 flex flex-col justify-center items-center">
            <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start  ">
              Page Count
            </p>
            <div className="flex flex-row gap-2 items-center relative">
              <input
                className="p-2 w-[30vw] bg-white border-b-1 border-logoColor appearance-none outline-none text-[14px]"
                type="number"
                min={0}
                max={12}
                onChange={(e) =>
                  setCurrentData((prev) => ({
                    ...prev,
                    pageCount: e.target.value,
                  }))
                }
              />
            </div>
          </div> */}
        </div>

        <div className="w-full flex flex-row  justify-between items-center p-2 px-6">
          <div className="w-full">
            <button
              className="text-white w-full font-[600] text-[14px] bg-[rgb(0,0,255)] rounded-full p-1 px-2"
              onClick={async () => {
                setIsCanceled(true);
                // setData((prev) => [...prev, { ...currentData }]);
                const container = document.getElementById("Main-Area");
                const containerStyles = window.getComputedStyle(container);
                setData((prev) => ({
                  ...prev,
                  el: [...prev?.el, { ...currentData }],
                  containerStyles: containerStyles,
                }));
                setTimeout(() => {
                  setIsTableSceneCard(false);
                }, 500);
              }}
            >
              {`Save`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTableSceneCard;
