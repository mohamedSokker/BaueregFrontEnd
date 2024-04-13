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
  } = useEditDataEntry({ editData });
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
        <Dropdown
          label="Breakdown_Type"
          // URL="/api/v3/Bauer_Breakdown"
          column={data.Equipment_Type}
          siteData={siteData}
          setAllData={setAllData}
          condition={data.Equipment_Type !== ""}
          local={true}
          localData={allData.Breakdown_Type}
          data={data}
          setData={setData}
          // getChildData={getChildData}
          errorData={errorData}
          setError={setError}
          setErrorData={setErrorData}
        />

        <div className="p-2 flex flex-col justify-center items-center">
          <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start">{`Problem End To`}</p>
          <input
            type="datetime-local"
            value={getDate(data.Problem_End_To)}
            className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                Problem_End_To: getDate(new Date(e?.target?.value)),
              }))
            }
          />
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
          label="Periodic Maintenance Interval"
          local={true}
          localData={allData["Periodic Maintenance Interval"]}
          column="plan"
          siteData={siteData}
          setAllData={setAllData}
          condition={data?.Breakdown_Type === `Periodic Maintenance`}
          data={data}
          setData={setData}
          // getChildData={getChildData}
          errorData={errorData}
          setError={setError}
          setErrorData={setErrorData}
        />
        <div className="p-2 flex flex-col justify-center items-center">
          {!regix["Site_QC_Min"].test(data.Site_QC_Min) ? (
            <div className="w-full h-4 flex flex-row justify-start items-center gap-3">
              <p className="h-full text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Site QC Time(Min)`}</p>
              <p className="text-[10px] text-red-500 h-full">
                Not Valid text field data
              </p>
            </div>
          ) : (
            <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Site QC Time(Min)`}</p>
          )}
          <input
            type="text"
            className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
            value={data.Site_QC_Min}
            onChange={(e) =>
              setData((prev) => ({ ...prev, Site_QC_Min: e.target.value }))
            }
          />
        </div>
        <Dropdown
          label="Equipment_Model"
          // URL="/api/v1/Bauer_Equipments"
          local={true}
          localData={allData?.eqsModel}
          column="Equipment_Model"
          siteData={siteData}
          setAllData={setAllData}
          condition={data?.Location !== "" && data.Equipment_Type !== ""}
          data={data}
          setData={setData}
          // getChildData={getChildData}
          errorData={errorData}
          setError={setError}
          setErrorData={setErrorData}
        />
        <div className="p-2 flex flex-col justify-center items-center">
          {!regix.Problem.test(data.Problem) ? (
            <div className="w-full h-4 flex flex-row justify-start items-center gap-3">
              <p className="h-full text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Problem`}</p>
              <p className="text-[10px] text-red-500 h-full">
                Not Valid text field data
              </p>
            </div>
          ) : (
            <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Problem`}</p>
          )}
          <input
            type="text"
            className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
            value={data.Problem}
            onChange={(e) =>
              setData((prev) => ({ ...prev, Problem: e.target.value }))
            }
          />
        </div>
        <Dropdown
          label="Store"
          local={true}
          localData={allData?.store}
          column="stock"
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
          condition={
            data?.Site !== "" &&
            data.Equipment_Type !== "" &&
            data.Equipment_Model !== ""
          }
          local={true}
          localData={allData?.eqs}
          data={data}
          setData={setData}
          // getChildData={getChildData}
          errorData={errorData}
          setError={setError}
          setErrorData={setErrorData}
        />
        <div className="p-2 flex flex-col justify-center items-center">
          {!regix.Action.test(data.Action) ? (
            <div className="w-full h-4 flex flex-row justify-start items-center gap-3">
              <p className="h-full text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Action`}</p>
              <p className="text-[10px] text-red-500 h-full">
                Not Valid text field data
              </p>
            </div>
          ) : (
            <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Action`}</p>
          )}
          <input
            type="text"
            className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
            value={data.Action}
            onChange={(e) =>
              setData((prev) => ({ ...prev, Action: e.target.value }))
            }
          />
        </div>
        <div className="p-2 flex flex-col justify-center items-center">
          {!regix["Spare_part"].test(data.Spare_part) &&
          data.Spare_part !== "" ? (
            <div className="w-full h-4 flex flex-row justify-start items-center gap-3">
              <p className="h-full text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Spare Part`}</p>
              <p className="text-[10px] text-red-500 h-full">
                Not Valid text field data
              </p>
            </div>
          ) : (
            <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Spare Part`}</p>
          )}
          <input
            type="text"
            className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
            value={data.Spare_part}
            onChange={(e) =>
              setData((prev) => ({ ...prev, Spare_part: e.target.value }))
            }
          />
        </div>
        <div className="p-2 flex flex-col justify-centrt items-center">
          {!regix["Working_Hours"].test(data.Working_Hours) ? (
            <div className="w-full h-4 flex flex-row justify-start items-center gap-3">
              <p className="h-full text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Working Hours`}</p>
              <p className="text-[10px] text-red-500 h-full">
                Not Valid text field data
              </p>
            </div>
          ) : (
            <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Working Hours`}</p>
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
        <div className="p-2 flex flex-col justify-center items-center">
          <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start">{`Problem Start From`}</p>
          <input
            type="datetime-local"
            value={getDate(data.Problem_start_From)}
            className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                Problem_start_From: getDate(new Date(e?.target?.value)),
              }))
            }
          />
        </div>

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
