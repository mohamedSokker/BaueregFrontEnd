import React, { useEffect, useState } from "react";

import Dropdown from "../Components/Dropdown";
import PageLoading from "../../../components/PageLoading";

import { regix } from "../Models/model";
import useDataEntry from "../Controllers/dataEntry";

const DataEntry = ({ targetData }) => {
  const {
    loading,
    allData,
    errorData,
    setError,
    setErrorData,
    data,
    setData,
    setAllData,
    handleAdd,
    message,
    siteData,
    dataCheck,
    setDataCheck,
  } = useDataEntry({ targetData });
  console.log(data);
  return (
    <div className="w-full h-full flex flex-col justify-around bg-gray-100">
      {loading && (
        <div className="p-4">
          <PageLoading message={message} />
        </div>
      )}

      <div className="w-[100%] h-[100%] bg-gray-100 flex flex-row flex-wrap justify-start items-start overflow-auto">
        {targetData &&
          targetData.length > 0 &&
          Object.keys(targetData[0].Fields).map((item, i) =>
            targetData[0].Fields[item]?.Type === "DropDown" ? (
              <Dropdown
                key={i}
                label={item}
                column={targetData[0].Fields[item]?.Column}
                siteData={siteData}
                setAllData={setAllData}
                condition={
                  !targetData[0].Fields[item]?.Condition
                    ? true
                    : targetData[0].Fields[item]?.Condition?.every(
                        (key) => data[key] !== ""
                      )
                }
                local={true}
                localData={allData[item]}
                data={data}
                setData={setData}
                errorData={errorData}
                setError={setError}
                setErrorData={setErrorData}
                targetData={targetData}
              />
            ) : targetData[0].Fields[item]?.Type === "Date" &&
              targetData[0].Fields[item]?.isCheck ? (
              <div className="p-2 flex flex-col justify-center items-center">
                <p className="w-full h-6 text-[14px] text-gray-400 flex flex-row justify-start">{`${item}`}</p>
                <div className="w-[30vw] flex flex-row items-center gap-4">
                  <input
                    type="checkbox"
                    checked={dataCheck?.[item]}
                    onChange={() => {
                      setDataCheck((prev) => ({
                        ...prev,
                        [item]: !prev[item],
                      }));
                    }}
                  />
                  <input
                    type="date"
                    value={data?.[item]}
                    className="w-full border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
                    onChange={(e) => {
                      setData((prev) => ({
                        ...prev,
                        [item]: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
            ) : targetData[0].Fields[item]?.Type === "Date" ? (
              <div
                className="p-2 flex flex-col justify-center items-center"
                key={i}
              >
                <p className="w-full h-6 text-[14px] text-gray-400 flex flex-row justify-start">{`${item}`}</p>
                <input
                  type="date"
                  value={data?.[item]}
                  className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      [item]: e?.target?.value,
                    }))
                  }
                />
              </div>
            ) : targetData[0].Fields[item]?.Type === "Decimal" &&
              targetData[0].Fields[item]?.isCheck ? (
              <div className="p-2 flex flex-col justify-center items-center">
                <p className="w-full h-6 text-[14px] text-gray-400 flex flex-row justify-start">{`${item}`}</p>
                <div className="w-[30vw] flex flex-row items-center gap-4">
                  <input
                    type="checkbox"
                    checked={dataCheck?.[item]}
                    onChange={() => {
                      setDataCheck((prev) => ({
                        ...prev,
                        [item]: !prev[item],
                      }));
                    }}
                  />
                  <input
                    type="text"
                    value={data?.[item]}
                    className="w-full border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
                    onChange={(e) => {
                      setData((prev) => ({
                        ...prev,
                        [item]: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
            ) : targetData[0].Fields[item]?.Type === "Decimal" ? (
              <div
                className="p-2 flex flex-col justify-center items-center"
                key={i}
              >
                <p className="w-full h-6 text-[14px] text-gray-400 flex flex-row justify-start">{`${item}`}</p>
                <input
                  type="text"
                  value={data?.[item]}
                  className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      [item]: e?.target?.value,
                    }))
                  }
                />
              </div>
            ) : targetData[0].Fields[item]?.Type === "Text" &&
              targetData[0].Fields[item]?.isCheck ? (
              <div className="p-2 flex flex-col justify-center items-center">
                <p className="w-full h-6 text-[14px] text-gray-400 flex flex-row justify-start">{`${item}`}</p>
                <div className="w-[30vw] flex flex-row items-center gap-4">
                  <input
                    type="checkbox"
                    checked={dataCheck?.[item]}
                    onChange={() => {
                      setDataCheck((prev) => ({
                        ...prev,
                        [item]: !prev[item],
                      }));
                    }}
                  />
                  <input
                    type="text"
                    value={data?.[item]}
                    className="w-full border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
                    onChange={(e) => {
                      setData((prev) => ({
                        ...prev,
                        [item]: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
            ) : (
              <div
                key={i}
                className="p-2 flex flex-col justify-center items-center"
              >
                {!regix[targetData[0].Fields[item]?.validateString]?.test(
                  data?.[item]
                ) ? (
                  <div className="w-full h-6 flex flex-row justify-start items-center gap-3">
                    <p className="h-full text-[14px] text-gray-400 flex flex-row justify-start items-center">{`${item}`}</p>
                    <p className="text-[10px] text-red-500 h-full">
                      Not Valid text field data
                    </p>
                  </div>
                ) : (
                  <p className="w-full h-6 text-[14px] text-gray-400 flex flex-row justify-start items-center">{`${item}`}</p>
                )}
                <input
                  type="text"
                  className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
                  value={data?.[item]}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      [item]: e.target.value,
                    }))
                  }
                />
              </div>
            )
          )}

        <div className="w-[100%] h-[20%] text-white font-bold text-[16px] flex items-center p-2">
          <button
            className="w-full p-2 px-4 flex flex-row justify-around bg-green-700 rounded-lg"
            onClick={handleAdd}
          >
            + Add Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataEntry;
