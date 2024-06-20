import React, { useEffect, useState } from "react";

import Dropdown from "../Components/Dropdown";
import PageLoading from "../../../../components/PageLoading";

import { regix } from "../Model/model";
import useDataEntry from "../Controllers/dataEntry";

const DataEntry = () => {
  const {
    loading,
    perLoading,
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
    isEndDateChecked,
    setIsEndDateChecked,
    isEndWHChecked,
    setIsEndWHChecked,
  } = useDataEntry({});
  // console.log(data);
  return (
    <div className="w-full h-full flex flex-col justify-around bg-gray-100">
      {loading && (
        <div className="p-4">
          <PageLoading message={message} />
        </div>
      )}
      {perLoading && (
        <div className="p-4">
          <PageLoading message={`Loading View...`} />
        </div>
      )}
      <div className="w-[100%] h-[100%] bg-gray-100 flex flex-row flex-wrap justify-start items-start overflow-auto">
        <div className="flex flex-1 flex-col items-start">
          <Dropdown
            label="Type"
            // URL="/api/v1/Location_Bauer"
            column="Type"
            siteData={siteData}
            setAllData={setAllData}
            condition={true}
            local={true}
            localData={allData?.types}
            data={data}
            setData={setData}
            // getChildData={getChildData}
            errorData={errorData}
            setError={setError}
            setErrorData={setErrorData}
          />
          <Dropdown
            label="Code"
            // URL="/api/v1/Location_Bauer"
            column="Code"
            siteData={siteData}
            setAllData={setAllData}
            condition={true}
            local={true}
            localData={allData?.code}
            data={data}
            setData={setData}
            // getChildData={getChildData}
            errorData={errorData}
            setError={setError}
            setErrorData={setErrorData}
          />
          <Dropdown
            label="Serial"
            // URL="/api/v1/Location_Bauer"
            column="Serial"
            siteData={siteData}
            setAllData={setAllData}
            condition={true}
            local={true}
            localData={allData?.serial}
            data={data}
            setData={setData}
            // getChildData={getChildData}
            errorData={errorData}
            setError={setError}
            setErrorData={setErrorData}
          />
        </div>

        <div className="flex flex-1 flex-col items-start">
          <div className="p-2 flex flex-col justify-center items-center">
            <p className="w-full h-6 text-[14px] text-gray-400 flex flex-row justify-start">{`Start Date`}</p>
            <input
              type="date"
              value={data.Start_Date}
              className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  Start_Date: e?.target?.value,
                }))
              }
            />
          </div>

          <div className="p-2 flex flex-col justify-center items-center">
            <p className="w-full h-6 text-[14px] text-gray-400 flex flex-row justify-start">{`End Date`}</p>
            <div className="w-[30vw] flex flex-row items-center gap-4">
              <input
                type="checkbox"
                checked={isEndDateChecked}
                onChange={() => {
                  setIsEndDateChecked((prev) => !prev);
                }}
              />
              <input
                type="date"
                value={data.End_Date}
                className="w-full border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    End_Date: e?.target?.value,
                  }));
                }}
              />
            </div>
          </div>

          <div className="p-2 flex flex-col justify-center items-center">
            <p className="w-full h-6 text-[14px] text-gray-400 flex flex-row justify-start">{`Start WH`}</p>
            <input
              type="text"
              value={data.Start_WH}
              className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  Start_WH: e?.target?.value,
                }))
              }
            />
          </div>

          <div className="p-2 flex flex-col justify-center items-center">
            <p className="w-full h-6 text-[14px] text-gray-400 flex flex-row justify-start">{`End WH`}</p>
            <div className="w-[30vw] flex flex-row items-center gap-4">
              <input
                type="checkbox"
                checked={isEndWHChecked}
                onChange={() => {
                  setIsEndWHChecked((prev) => !prev);
                }}
              />
              <input
                type="text"
                value={data.End_WH}
                className="w-full border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    End_WH: e?.target?.value,
                  }));
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-start">
          <Dropdown
            label="Location"
            local={true}
            localData={allData?.sites}
            column="Location"
            siteData={siteData}
            setAllData={setAllData}
            condition={true}
            data={data}
            setData={setData}
            // getChildData={getChildData}
            errorData={errorData}
            setError={setError}
            setErrorData={setErrorData}
          />
          <Dropdown
            label="Equipment"
            // URL="/api/v1/Bauer_Equipments"
            column="Equipment"
            siteData={siteData}
            setAllData={setAllData}
            condition={data?.Location !== ""}
            local={true}
            localData={allData?.eqs}
            data={data}
            setData={setData}
            // getChildData={getChildData}
            errorData={errorData}
            setError={setError}
            setErrorData={setErrorData}
          />
        </div>

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
