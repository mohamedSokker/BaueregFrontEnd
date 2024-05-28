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
          label="Machinery_Type"
          local={true}
          localData={allData?.machType}
          column="Machinery_Type"
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
          label="Machinery_Model"
          // URL="/api/v1/Bauer_Equipments"
          column="Machinery_Model"
          siteData={siteData}
          setAllData={setAllData}
          condition={data?.Location !== "" && data.Machinery_Type !== ""}
          local={true}
          localData={allData?.machModel}
          data={data}
          setData={setData}
          // getChildData={getChildData}
          errorData={errorData}
          setError={setError}
          setErrorData={setErrorData}
        />

        <Dropdown
          label="Machinary_Specs"
          // URL="/api/v1/Bauer_Equipments"
          column="Machinary_Specs"
          siteData={siteData}
          setAllData={setAllData}
          condition={
            data?.Location !== "" &&
            data.Machinery_Type !== "" &&
            data.Machinery_Model !== ""
          }
          local={true}
          localData={allData?.machSpecs}
          data={data}
          setData={setData}
          // getChildData={getChildData}
          errorData={errorData}
          setError={setError}
          setErrorData={setErrorData}
        />

        <Dropdown
          label="Code"
          // URL="/api/v1/Bauer_Equipments"
          column="Code"
          siteData={siteData}
          setAllData={setAllData}
          condition={
            data?.Location !== "" &&
            data.Machinery_Type !== "" &&
            data.Machinery_Model !== "" &&
            data.Machinary_Specs !== ""
          }
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
          label="Serial_No"
          // URL="/api/v1/Bauer_Equipments"
          column="Serial_No"
          siteData={siteData}
          setAllData={setAllData}
          condition={
            data?.Location !== "" &&
            data.Machinery_Type !== "" &&
            data.Machinery_Model !== "" &&
            data.Machinary_Specs !== "" &&
            data.Code !== ""
          }
          local={true}
          localData={allData?.serial}
          data={data}
          setData={setData}
          // getChildData={getChildData}
          errorData={errorData}
          setError={setError}
          setErrorData={setErrorData}
        />

        <Dropdown
          label="Machinery_Status"
          // URL="/api/v1/Bauer_Equipments"
          column="Machinery_Status"
          siteData={siteData}
          setAllData={setAllData}
          condition={
            data?.Location !== "" &&
            data.Machinery_Type !== "" &&
            data.Machinery_Model !== "" &&
            data.Machinary_Specs !== "" &&
            data.Code !== ""
          }
          local={true}
          localData={allData?.machStatus}
          data={data}
          setData={setData}
          // getChildData={getChildData}
          errorData={errorData}
          setError={setError}
          setErrorData={setErrorData}
        />

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
