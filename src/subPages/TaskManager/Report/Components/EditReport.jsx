import React, { useEffect, useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import "../Styles/EditCard.css";

const EditReport = ({
  setIsEditCard,
  reportData,
  selectedData,
  selectedReport,
  handleCheck,
  handleRemarks,
  handleSend,
  handleSave,
  handleDelete,
}) => {
  const [isCanceled, setIsCanceled] = useState(false);
  console.log(selectedData);

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
          <div>Edit</div>
          <div>
            <TooltipComponent
              content="close"
              position="BottomCenter"
              className="flex items-center"
            >
              <button
                className="hover:cursor-pointer p-2 hover:rounded-full hover:bg-gray-300 aspect-square flex justify-center items-center"
                onClick={() => {
                  setIsCanceled(true);
                  setTimeout(() => {
                    setIsEditCard(false);
                  }, 500);
                }}
              >
                X
              </button>
            </TooltipComponent>
          </div>
        </div>

        <div className="flex flex-col w-full p-2 px-6 justify-between">
          {reportData &&
            Object.keys(reportData)?.map((d, i) => (
              <React.Fragment key={i}>
                <div className="w-full text-[14px] text-logoColor font-[500] flex flex-row justify-between items-center px-1 mb-4">
                  <div>{d}</div>
                </div>
                <div className="w-full flex flex-row flex-wrap justify-between">
                  {reportData[d]?.map((cat, index) => (
                    <div className="w-[100%] flex flex-col gap-2" key={index}>
                      <div className="w-full text-[12px] font-[400] flex flex-row justify-between items-center px-1">
                        <div className="flex flex-row gap-2">
                          <span>{cat?.Description}</span>
                          {cat?.Detail && <span>{`(${cat?.Detail})`}</span>}
                        </div>
                        {cat?.Check === "Yes" ? (
                          <div>
                            <input
                              type="checkbox"
                              className="px-2 p-1"
                              onChange={(e) => handleCheck(cat, d, e)}
                              checked={
                                selectedData &&
                                selectedData[d] &&
                                (cat?.Detail
                                  ? selectedData[d][
                                      `${cat.Description.trim()} (${cat.Detail.trim()})`
                                    ]?.checked
                                  : selectedData[d][`${cat.Description.trim()}`]
                                      ?.checked)
                              }
                            />
                          </div>
                        ) : (
                          <div>
                            <input
                              type="text"
                              placeholder="Value"
                              className="border-b-1 border-gray-400 px-2 p-1 focus:border-red-400 outline-none"
                              value={
                                selectedData &&
                                selectedData[d] &&
                                (cat?.Detail
                                  ? selectedData[d][
                                      `${cat.Description.trim()} (${cat.Detail.trim()})`
                                    ]?.value
                                  : selectedData[d][`${cat.Description.trim()}`]
                                      ?.value)
                              }
                              onChange={(e) => handleCheck(cat, d, e)}
                            />
                          </div>
                        )}
                      </div>
                      <div className="w-full text-[12px] font-[400] p-2">
                        <textarea
                          className="w-full border-b-1 border-gray-400  px-2 p-1 focus:border-red-400 outline-none"
                          placeholder="Remarks"
                          value={
                            selectedData &&
                            selectedData[d] &&
                            (cat?.Detail
                              ? selectedData[d][
                                  `${cat.Description.trim()} (${cat.Detail.trim()})`
                                ]?.Remarks
                              : selectedData[d][`${cat.Description.trim()}`]
                                  ?.Remarks)
                          }
                          onChange={(e) => handleRemarks(cat, d, e)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            ))}
        </div>

        <div className="w-full flex flex-row  justify-between items-center p-2 px-6">
          <div>
            <button
              className="text-gray-500 font-[600] text-[14px]"
              onClick={async () => {
                handleDelete({ id: selectedReport.reportID });
                setIsCanceled(true);
                setTimeout(() => {
                  setIsEditCard(false);
                }, 500);
              }}
            >
              DELETE
            </button>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <button
              className=" text-red-400 font-[600] text-[14px]"
              onClick={async () => {
                handleSave({
                  id: selectedReport.reportID,
                  reportData: selectedData,
                });
                setIsCanceled(true);
                setTimeout(() => {
                  setIsEditCard(false);
                }, 500);
              }}
            >
              SAVE
            </button>
            <button
              className=" text-red-400 font-[600] text-[14px]"
              onClick={() => {
                handleSend();
                setIsCanceled(true);
                setTimeout(() => {
                  setIsEditCard(false);
                }, 500);
              }}
            >
              SEND
            </button>
            <button
              className=" text-gray-500 font-[600] text-[14px]"
              onClick={() => {
                setIsCanceled(true);
                setTimeout(() => {
                  setIsEditCard(false);
                }, 500);
              }}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReport;
