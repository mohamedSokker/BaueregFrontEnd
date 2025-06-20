import React, { useEffect, useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { ColorRing } from "react-loader-spinner";

import "../../Styles/EditCard.css";
import Table from "../Table";
import { logoColor } from "../../../../BauerColors";
import DropDown from "../DropDown";
import { slicerOptions } from "../../Model/model";
import Lists from "../Lists";

const AddSlicerCard = ({
  setIsSlicerCard,
  data,
  setData,
  tables,
  tablesData,
  currentID,
  setCurrentID,
}) => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [currentData, setCurrentData] = useState({
    ID: data.el?.length,
    ...slicerOptions,
  });
  const [tablesSelectedData, setTablesSelectedData] = useState(null);
  const [mainSLicerSelectedData, setMainSlicerSelectedData] = useState(null);
  const [subSLicerSelectedData, setSubSlicerSelectedData] = useState([]);
  const [actionsSelectedData, setActionsSelectedData] = useState([]);
  const [slicerTypeSelectedData, setSlicerTypeSelectedData] = useState([]);
  //   const [tableColumnSelectedData, setTableColumnSelectedData] = useState(null);
  //   const [opTypeSelectedData, setOpTypeSelectedData] = useState(null);
  //   const [valueSelectedData, setValueSelectedData] = useState([]);

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
                    setIsSlicerCard(false);
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
            label={`Table`}
            tableData={tables}
            // tableData={["VirtualTable"]}
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

          <DropDown
            label={`mainSlicer`}
            tableData={
              currentData && currentData?.name
                ? Object.keys(tablesData?.[currentData?.name]?.data?.[0])
                : []
            }
            selectedData={mainSLicerSelectedData}
            handleChange={(e) => {
              setMainSlicerSelectedData(e.target.value);
              setCurrentData((prev) => ({
                ...prev,
                mainSlicer: e.target.value,
              }));
            }}
          />

          <div className="p-2 flex flex-col justify-center items-center">
            <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start">
              Count
            </p>
            <div className="flex flex-row gap-2 items-center relative">
              <input
                className="p-2 w-[30vw] bg-white border-b-1 border-logoColor appearance-none outline-none text-[14px]"
                type="number"
                value={currentData?.count}
                onChange={(e) =>
                  setCurrentData((prev) => ({
                    ...prev,
                    count: e.target.value,
                    subSlicers:
                      prev.subSlicers?.length > Number(e.target.value)
                        ? [
                            ...prev?.subSlicers?.slice(
                              0,
                              prev.subSlicers.length - 1
                            ),
                          ]
                        : [...prev?.subSlicers, "ID"],
                    // datakeys: [...prev?.datakeys, 0],
                  }))
                }
              />
            </div>
          </div>

          {currentData?.subSlicers?.map((_, idx) => (
            <DropDown
              key={idx}
              label={`SubSlicer-${idx}`}
              tableData={
                currentData && currentData?.name
                  ? Object.keys(tablesData?.[currentData?.name]?.data?.[0])
                  : []
              }
              selectedData={subSLicerSelectedData?.[idx]}
              handleChange={(e) => {
                const copiedDataValueSelectedData = [...subSLicerSelectedData];
                copiedDataValueSelectedData[idx] = e.target.value;
                setSubSlicerSelectedData(copiedDataValueSelectedData);

                const copiedCurrentData = { ...currentData };
                copiedCurrentData.subSlicers[idx] = e.target.value;
                setCurrentData(copiedCurrentData);
              }}
            />
          ))}

          <DropDown
            label={`Slicer Type`}
            tableData={["Checks", "Date"]}
            selectedData={slicerTypeSelectedData}
            handleChange={(e) => {
              setSlicerTypeSelectedData(e.target.value);
              setCurrentData((prev) => ({
                ...prev,
                slicerType: e.target.value,
              }));
            }}
          />

          <Lists
            label={`actions`}
            tableData={currentData ? Object.keys(tablesData) : []}
            selectedData={actionsSelectedData}
            handleChange={(e, item) => {
              if (e.target.checked === true) {
                const result = [...actionsSelectedData];
                result.push(item);
                setActionsSelectedData(result);
                setCurrentData((prev) => ({
                  ...prev,
                  actions: [...result],
                }));
              } else if (e.target.checked === false) {
                const array = [...actionsSelectedData];
                const result = array.filter((el) => el !== item);
                setActionsSelectedData(result);
                setCurrentData((prev) => ({
                  ...prev,
                  actions: [...result],
                }));
              }
            }}
          />

          {/* <DropDown
            label={`Operation Type`}
            tableData={["Count", "Sum", "Average"]}
            selectedData={opTypeSelectedData}
            handleChange={(e) => {
              setOpTypeSelectedData(e.target.value);
              setCurrentData((prev) => ({
                ...prev,
                operationType: e.target.value,
              }));
            }}
          /> */}
        </div>

        <div className="w-full flex flex-row  justify-between items-center p-2 px-6">
          <div className="w-full">
            <button
              className="text-white w-full font-[600] text-[14px] bg-[rgb(0,0,255)] rounded-full p-1 px-2"
              onClick={async () => {
                setIsCanceled(true);
                // setData((prev) => [
                //   ...prev,
                //   {
                //     ...currentData,
                //     Type: "Graph",
                //     graphType: "Pie",
                //     isCount: true,
                //   },
                // ]);
                const container = document.getElementById("Main-Area");
                const containerStyles = window.getComputedStyle(container);
                setData((prev) => ({
                  ...prev,
                  el: [...prev?.el, { ...currentData }],
                  containerStyles: containerStyles,
                }));
                setTimeout(() => {
                  setIsSlicerCard(false);
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

export default AddSlicerCard;
