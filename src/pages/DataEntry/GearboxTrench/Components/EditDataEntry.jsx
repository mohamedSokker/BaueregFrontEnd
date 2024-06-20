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
    details,
    setDetails,
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
        <div className="flex flex-col items-start">
          <Dropdown
            label="Type"
            // URL="/api/v1/Location_Bauer"
            column="Type"
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
            setDetails={setDetails}
          />
          <div className="p-2 flex flex-col justify-center items-center">
            <p className="w-full h-6 text-[14px] text-gray-400 flex flex-row justify-start">{`Code`}</p>
            <input
              type="text"
              value={data.Code}
              className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  Code: e?.target?.value,
                }))
              }
            />
          </div>

          <div className="p-2 flex flex-col justify-center items-center">
            <p className="w-full h-6 text-[14px] text-gray-400 flex flex-row justify-start">{`Serial`}</p>
            <input
              type="text"
              value={data.Serial}
              className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  Serial: e?.target?.value,
                }))
              }
            />
          </div>
        </div>

        <div className="flex flex-1 flex-row flex-wrap items-start">
          {details?.map((item, i) => (
            <div
              key={i}
              className="p-2 flex flex-col justify-center items-center "
            >
              <p className="w-full h-6 text-[14px] text-gray-400 flex flex-row justify-start">
                {item}
              </p>
              <input
                type="text"
                value={data.Details[item]}
                className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    Details: { ...prev.Details, [item]: e?.target?.value },
                  }))
                }
              />
            </div>
          ))}
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
    </div>
  );
};

export default EditDataEntry;
