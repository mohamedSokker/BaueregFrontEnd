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
  } = useDataEntry({});
  console.log(data);
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
        <Dropdown
          label="Location"
          // URL="/api/v1/Location_Bauer"
          column="Location"
          siteData={siteData}
          setAllData={setAllData}
          condition={true}
          local={true}
          localData={allData?.sites}
          data={data}
          setData={setData}
          // getChildData={getChildData}
          errorData={errorData}
          setError={setError}
          setErrorData={setErrorData}
        />

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
          <div className="flex flex-row items-center gap-4">
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
              className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  End_Date: e?.target?.value,
                }));
              }}
            />
          </div>
        </div>

        <Dropdown
          label="Equipment_Type"
          local={true}
          localData={allData?.eqsType}
          column="Equipment_Type"
          siteData={siteData}
          setAllData={setAllData}
          condition={data?.Location !== ""}
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
          condition={data?.Site !== "" && data.Equipment_Type !== ""}
          local={true}
          localData={allData?.eqs}
          data={data}
          setData={setData}
          // getChildData={getChildData}
          errorData={errorData}
          setError={setError}
          setErrorData={setErrorData}
        />

        <Dropdown
          label="UnderCarrage_Type"
          // URL="/api/v1/Bauer_Equipments"
          column="UnderCarrage_Type"
          siteData={siteData}
          setAllData={setAllData}
          condition={
            data?.Site !== "" &&
            data.Equipment_Type !== "" &&
            data.Equipment !== ""
          }
          local={true}
          localData={allData?.UnderCarrage_Type}
          data={data}
          setData={setData}
          // getChildData={getChildData}
          errorData={errorData}
          setError={setError}
          setErrorData={setErrorData}
        />

        <div className="p-2 flex flex-col justify-centrt items-center">
          {!regix["Working_Hours"].test(data.Working_Hours) ? (
            <div className="w-full h-6 flex flex-row justify-start items-center gap-3">
              <p className="h-full text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Working Hours`}</p>
              <p className="text-[10px] text-red-500 h-full">
                Not Valid text field data
              </p>
            </div>
          ) : (
            <p className="w-full h-6 text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Working Hours`}</p>
          )}
          <input
            type="text"
            className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
            value={data.Working_Hours}
            onChange={(e) =>
              setData((prev) => ({ ...prev, Working_Hours: e.target.value }))
            }
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
