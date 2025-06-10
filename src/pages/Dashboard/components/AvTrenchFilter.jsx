import React, { useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

import "../styles/EditCard.css";
import useFilter from "../controller/avTrenchFilterController";

const AvTrenchFilter = ({ copiedData, setData, setIsAvTrenchFilterCard }) => {
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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl rounded-xl p-6 transform transition-all duration-500 ease-in-out ${
          isCanceled ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
        style={{
          animation: !isCanceled
            ? "animate-in 0.5s ease-in-out"
            : "animate-out 0.5s ease-in-out",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Filter Options</h2>
          <TooltipComponent content="Close" position="BottomCenter">
            <button
              onClick={() => {
                setIsCanceled(true);
                setTimeout(() => setIsAvTrenchFilterCard(false), 500);
              }}
              className="hover:cursor-pointer p-1 text-[10px] rounded-full bg-gray-100 w-[25px] aspect-square flex justify-center items-center hover:bg-gray-200 transition-colors"
              aria-label="Close filter"
            >
              &times;
            </button>
          </TooltipComponent>
        </div>

        {/* Filter Sections */}
        {items &&
          Object.keys(items).map((title, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                {title}
              </h3>
              <hr className="mb-3 border-t border-gray-300" />

              {title === "Time" ? (
                <div className="flex flex-wrap gap-4 items-center">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      min={items.Time.data.minDate}
                      max={items.Time.data.maxDate}
                      value={items.Time.data.currentDate.start}
                      onChange={handleStartTimeChange}
                      className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      min={items.Time.data.minDate}
                      max={items.Time.data.maxDate}
                      value={items.Time.data.currentDate.end}
                      onChange={handleEndTimeChange}
                      className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {items[title].data.map((store, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-colors"
                      onClick={() => handleCheck({ title, store, index: idx })}
                      role="checkbox"
                      tabIndex={0}
                      aria-checked={store.checked}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        handleCheck({ title, store, index: idx })
                      }
                    >
                      {store.checked ? (
                        <FaCheckCircle size={16} color="#3B82F6" />
                      ) : (
                        <FaRegCircle size={16} color="#9CA3AF" />
                      )}
                      <span className="text-sm text-gray-700">
                        {store.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

        {/* Footer Button */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => {
              handleShowResult();
              setIsCanceled(true);
              setTimeout(() => setIsAvTrenchFilterCard(false), 500);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Show {count} Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvTrenchFilter;
