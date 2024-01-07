import React, { useState } from "react";

const ConfirmData = ({
  message,
  setIsDragged,
  setIsConfirmed,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const [isCanceled, setIsCanceled] = useState(false);
  return (
    <div
      className="fixed opacity-100 w-screen h-screen flex flex-col items-center justify-center left-0 top-0"
      style={{ zIndex: "1000" }}
    >
      <div className="absolute w-screen h-screen flex flex-col items-center justify-center left-0 top-0 z-[1000] overlay"></div>
      <div
        className=" w-[25%] bg-white relative z-[1001] "
        style={
          !isCanceled
            ? {
                boxShadow: "0 12px 16px rgba(0, 0, 0, 0.7)",
                transform: "scale(1)",
                transition: "all 0.5s ease-in-out",
              }
            : {
                boxShadow: "0 12px 16px rgba(0, 0, 0, 0.7)",
                transform: "scale(0)",
                transition: "all 0.5s ease-in-out",
              }
        }
      >
        <div
          className="w-full bg-logoColor p-2 px-6 flex justify-center items-center text-white text-[18px] font-[800]"
          // style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
        >
          Confirm Transport
        </div>
        <div className="w-full text-[16px] font-[600] px-6 p-2 flex items-center">
          {message}
        </div>
        <div className="flex flex-col w-full">
          <div className="w-full flex flex-row justify-between px-6 p-2 items-center">
            <label htmlFor="startDate" className="text-[14px] font-[700]">
              Start Date
            </label>
            <input
              type="date"
              className="border-b-2 border-gray-400 focus:border-logoColor outline-none p-2 text-[10px]"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="w-full flex flex-row justify-between px-6 p-2 items-center">
            <label htmlFor="endDate" className="text-[14px] font-[700]">
              End Date
            </label>
            <input
              type="date"
              className="border-b-2 border-gray-400 focus:border-logoColor outline-none p-2 text-[10px]"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex flex-row justify-between items-center p-4 px-6">
          <button
            className=" text-green-800 font-[900]"
            onClick={() => {
              setIsConfirmed(true);
              setIsCanceled(true);
              setTimeout(() => {
                setIsDragged(false);
              }, 500);
            }}
          >
            Confirm
          </button>
          <button
            className=" text-red-600 font-[600]"
            onClick={() => {
              setIsCanceled(true);
              setTimeout(() => {
                setIsDragged(false);
              }, 500);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmData;
