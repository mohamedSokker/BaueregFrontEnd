import React, { useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

import "../styles/EditCard.css";
import useFilter from "../controller/mainFilterController";

const MainFilter = ({ copiedData, setData, setIsMainFilter }) => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [count, setCount] = useState(0);

  const {
    items,
    handleCheck,
    handleStartTimeChange,
    handleEndTimeChange,
    handleShowResult,
  } = useFilter({
    copiedData,
    setData,
    count,
    setCount,
  });

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
        className={`md:w-[36.6%] w-[90%] md:h-[74.5%] h-[80%] flex flex-col justify-between items-center bg-white relative z-[1001] mainContent overflow-y-scroll`}
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
                    setIsMainFilter(false);
                  }, 500);
                }}
              >
                X
              </button>
            </TooltipComponent>
          </div>
        </div>

        {items &&
          Object.keys(items).map((title, index) => (
            <div
              key={index}
              className="text-[14px] gap-1 font-[700] text-black flex flex-col items-start justify-start w-full px-6"
            >
              <p className="mb-1">{title}</p>
              <hr className="w-[100%]" />
              {title === "Time" ? (
                <div className="w-full flex flex-row p-2 gap-2 justify-between flex-wrap text-[12px] text-black font-[300]">
                  <input
                    type="date"
                    min={items.Time.data.minDate}
                    max={items.Time.data.maxDate}
                    value={items.Time.data.currentDate.start}
                    onChange={handleStartTimeChange}
                  />
                  <input
                    type="date"
                    min={items.Time.data.minDate}
                    max={items.Time.data.maxDate}
                    value={items.Time.data.currentDate.end}
                    onChange={handleEndTimeChange}
                  />
                </div>
              ) : (
                <div className="flex flex-row p-2 px-5 gap-2 justify-start flex-wrap text-[12px] text-black font-[300]">
                  {items[title].data.map((store, index) => (
                    <div
                      key={index}
                      className="p-1 px-2 rounded-full border-1 border-gray-300"
                    >
                      <div
                        className="flex flex-row gap-1 items-center hover:cursor-pointer"
                        onClick={() => handleCheck({ title, store, index })}
                      >
                        {store.checked ? (
                          <FaCheckCircle size={14} color="rgb(0,0,255)" />
                        ) : (
                          <FaCircle
                            size={14}
                            color="white"
                            className="border-1 border-black rounded-full"
                          />
                        )}

                        <p>{store.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

        <div className="w-full flex flex-row  justify-between items-center p-2 px-6">
          <div>
            <button
              className="text-white font-[600] text-[14px] bg-[rgb(0,0,255)] rounded-full p-1 px-2"
              onClick={async () => {
                handleShowResult();
                setIsCanceled(true);
                setTimeout(() => {
                  setIsMainFilter(false);
                }, 500);
              }}
            >
              {`Show Results`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFilter;
