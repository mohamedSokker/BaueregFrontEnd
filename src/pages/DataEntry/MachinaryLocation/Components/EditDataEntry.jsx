import React, { useEffect, useState } from "react";

import Dropdown from "../Components/Dropdown";
import EditPerMaint from "./EditPerMaint";
import PageLoading from "../../../../components/PageLoading";

import { getDate, perMaintPlan, regix, allAddData } from "../Model/model";
import useEditDataEntry from "../Controllers/editDataEntry";

const EditDataEntry = ({ editData }) => {
  const {
    loading,
    perLoading,
    allData,
    // getChildData,
    errorData,
    setError,
    setErrorData,
    data,
    setData,
    setAllData,
    saved,
    setPerMaintData,
    setPerLoading,
    setSaved,
    handleEdit,
    handleDelete,
    message,
    siteData,
    isEndDateChecked,
    setIsEndDateChecked,
  } = useEditDataEntry({ editData });
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
            data.Code !== "" &&
            data.Serial_No !== ""
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

        <div className="w-[100%] h-[20%] text-white font-bold text-[16px] flex flex-row gap-4 justify-between items-center p-2">
          <button
            className="w-[45%] p-2 px-4 flex flex-row justify-around bg-yellow-700 rounded-lg"
            onClick={handleEdit}
          >
            Edit Record
          </button>
          <button
            className="w-[45%] p-2 px-4 flex flex-row justify-around bg-red-700 rounded-lg"
            onClick={handleDelete}
          >
            Delete Record
          </button>
        </div>
      </div>
      {Object.keys(saved).map(
        (item) =>
          saved[item] && (
            <div
              className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center"
              style={
                item.includes("250")
                  ? { zIndex: 7 }
                  : item.includes("1000")
                  ? { zIndex: 8 }
                  : { zIndex: 9 }
              }
            >
              <EditPerMaint
                editData={editData}
                setPerMaintData={setPerMaintData}
                perLoading={perLoading}
                setPerLoading={setPerLoading}
                setSaved={setSaved}
                Type={item}
                style={
                  item.includes("1000")
                    ? { marginTop: `40px` }
                    : item.includes("2000")
                    ? { marginTop: `80px` }
                    : { marginTop: `0px` }
                }
              />
            </div>
          )
      )}
    </div>
  );
};

export default EditDataEntry;
