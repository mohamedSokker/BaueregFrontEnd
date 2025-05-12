import React, { useEffect, useRef, useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import * as XLSX from "xlsx";

import "../Styles/EditCard.css";

const AddExcel = ({ setIsExcelCard }) => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [files, setFiles] = useState(null);
  const [isOver, setIsOver] = useState(false);

  const inputRef = useRef();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles(e.dataTransfer.files[0]);
  };

  const handleApply = (e) => {
    // const file = e.target.files[0];
    if (!files) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log(jsonData);
      setExcelData(jsonData);
    };

    reader.readAsArrayBuffer(files);
  };

  // const handleApply = async () => {};

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
                    setIsExcelCard(false);
                  }, 500);
                }}
              >
                X
              </button>
            </TooltipComponent>
          </div>
        </div>

        <div className="w-full h-full flex flex-row justify-start items-start px-2 overflow-y-scroll text-[10px]">
          <div className="w-full h-full flex flex-col justify-center items-center gap-1">
            {!files ? (
              <>
                <div
                  className="w-[50%] aspect-square border-1 flex flex-row justify-center items-center"
                  style={{
                    borderStyle: "dashed",
                    borderColor: isOver ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.7)",
                  }}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <p>Drag and Drop Excel File Here</p>
                </div>
                <p>Or</p>
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  hidden
                  onChange={(e) => setFiles(e.target.files[0])}
                  ref={inputRef}
                />
                <button
                  className="p-2 py-1 bg-gray-100 border-1 border-gray-300 hover:bg-gray-200 rounded-md"
                  onClick={() => inputRef.current.click()}
                >
                  Select Excel File
                </button>
              </>
            ) : (
              <div className="h-full flex flex-col w-[60%] p-2 px-6 justify-center items-center gap-4 text-[10px]">
                {files?.name}
              </div>
            )}

            {/* <h2 className="text-[10px] font-bold mb-2">Upload Excel File</h2>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
            /> */}
          </div>
        </div>

        <div className="w-full flex flex-row  justify-between items-center p-2 px-2 text-[10px]">
          <div className="">
            <button
              className="text-white w-full font-[600] text-[10px] bg-[rgb(0,0,255)] rounded-md p-1 px-8"
              onClick={async () => {
                setIsCanceled(true);
                setTimeout(() => {
                  setIsExcelCard(false);
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
                  setIsExcelCard(false);
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

export default AddExcel;
