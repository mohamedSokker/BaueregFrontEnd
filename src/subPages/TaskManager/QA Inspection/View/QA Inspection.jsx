import React, { useEffect, useState } from "react";

import PageLoading from "../../../../components/PageLoading";
import useHandleData from "../Controller/controller";
import Dropdown from "../Components/Dropdown";

const QAInspection = () => {
  const {
    getEqType,
    getEqModel,
    getEq,
    handleEqTypeChange,
    handleEqModelChange,
    handleEqChange,
    handleCheck,
    handleRemarks,
    handleSave,
    loading,
    message,
    data,
    selectedData,
    eqTypeArray,
    eqType,
    eqTypeLoading,
    eqModelArray,
    eqModel,
    eqModelLoading,
    eqArray,
    eq,
    eqLoading,
  } = useHandleData();

  console.log(selectedData);

  return (
    <>
      {loading && <PageLoading message={message} />}
      <div className="w-full h-[6vh] p-2 flex items-center">
        <div className="flex flex-row justify-start gap-4 text-gray-400 text-[12px] items-center py-1 px-3 w-full rounded-[8px] border-1 border-gray-300">
          <div className="flex flex-row justify-start gap-2 items-center">
            <p>Equipment Type</p>
            <Dropdown
              handleChange={handleEqTypeChange}
              handleClick={getEqType}
              datas={eqTypeArray}
              datasLoading={eqTypeLoading}
              value={eqType}
            />
            {/* <select
              onChange={handleEqChange}
              className="px-2 py-1 bg-white border-b-1 border-gray-400 focus:border-red-400 text-black outline-none"
            >
              <option>MC 128# 169</option>
              <option>BC 881# 11824</option>
              <option>BG 28# 1577</option>
            </select> */}
          </div>
          <div className="flex flex-row justify-start gap-2 items-center">
            <p>Equipment Model</p>
            <Dropdown
              handleChange={handleEqModelChange}
              handleClick={getEqModel}
              datas={eqModelArray}
              datasLoading={eqModelLoading}
              value={eqModel}
            />
            {/* <select
              onChange={handleEqChange}
              className="px-2 py-1 bg-white border-b-1 border-gray-400 focus:border-red-400 text-black outline-none"
            >
              <option>MC 128# 169</option>
              <option>BC 881# 11824</option>
              <option>BG 28# 1577</option>
            </select> */}
          </div>
          <div className="flex flex-row justify-start gap-2 items-center">
            <p>Equipment</p>
            <Dropdown
              handleChange={handleEqChange}
              handleClick={getEq}
              datas={eqArray}
              datasLoading={eqLoading}
              value={eq}
            />
            {/* <select
              onChange={handleEqChange}
              className="px-2 py-1 bg-white border-b-1 border-gray-400 focus:border-red-400 text-black outline-none"
            >
              <option>MC 128# 169</option>
              <option>BC 881# 11824</option>
              <option>BG 28# 1577</option>
            </select> */}
          </div>
        </div>
      </div>
      <div
        className="w-full h-[calc(84vh-35px)] flex flex-row justify-start items-start gap-2 p-2 overflow-x-scroll"
        style={{ backdropFilter: "blur(2px)", opacity: 0.8 }}
        id="cont"
      >
        <div
          className="w-[100%] h-[100%] flex flex-col justify-start items-start p-2 gap-2 overflow-y-scroll"
          style={{ boxShadow: "0 12px 16px rgba(0, 0, 0, 0.7)" }}
        >
          <div className="w-full text-[16px] font-[600] flex flex-row justify-between items-center">
            <div>
              {eq && eq.startsWith("MC")
                ? "MC Check List"
                : eq && eq.startsWith("BC")
                ? "BC Check List"
                : eq && "BG Check List"}
            </div>
          </div>
          {data &&
            Object.keys(data)?.map((d, i) => (
              <>
                <div
                  className="w-full text-[14px] text-logoColor font-[500] flex flex-row justify-between items-center px-1 mb-4"
                  key={i}
                >
                  <div>{d}</div>
                </div>
                <div className="w-full flex flex-row flex-wrap justify-between">
                  {data[d]?.map((cat, index) => (
                    <div
                      className="md:w-[45%] w-[100%] flex flex-col gap-2"
                      key={index}
                    >
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
                                      `${cat.Description} (${cat.Detail})`
                                    ]?.checked
                                  : selectedData[d][`${cat.Description}`]
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
                                      `${cat.Description} (${cat.Detail})`
                                    ]?.value
                                  : selectedData[d][`${cat.Description}`]
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
                                  `${cat.Description} (${cat.Detail})`
                                ]?.Remarks
                              : selectedData[d][`${cat.Description}`]?.Remarks)
                          }
                          onChange={(e) => handleRemarks(cat, d, e)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ))}
          <div className="w-full flex flex-row justify-end items-center p-2">
            <button
              className="text-red-400 font-[600] text-[14px]"
              onClick={handleSave}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QAInspection;
