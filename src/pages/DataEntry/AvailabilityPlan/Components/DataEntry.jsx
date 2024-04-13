import React, { useEffect, useState } from "react";

import Dropdown from "../Components/Dropdown";
import PageLoading from "../../../../components/PageLoading";

import { getDate, regix } from "../Model/model";
import useDataEntry from "../Controllers/dataEntry";
import { getWeekInterval } from "../../../../Functions/Date/getWeekInterval";

const DataEntry = () => {
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
  } = useDataEntry({});
  return (
    <div className="w-full h-full flex flex-col justify-around bg-gray-100">
      {loading && (
        <div className="p-4">
          <PageLoading message={message} />
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
          <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start">{`Date`}</p>
          <input
            // disabled={false}
            type="date"
            value={data.Date}
            className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                Date: new Date(e?.target?.value).toISOString().slice(0, 10),
                DateFrom: getWeekInterval(new Date(e?.target?.value))
                  .startDate.toISOString()
                  .slice(0, 10),
                DateTo: getWeekInterval(new Date(e?.target?.value))
                  .endDate.toISOString()
                  .slice(0, 10),
              }))
            }
          />
        </div>

        <div className="p-2 flex flex-col justify-center items-center">
          <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start">{`Date From`}</p>
          <input
            disabled={true}
            type="date"
            value={data.DateFrom}
            className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px] text-gray-400"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                DateFrom: new Date(e?.target?.value).toISOString().slice(0, 10),
              }))
            }
          />
        </div>

        <div className="p-2 flex flex-col justify-center items-center">
          <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start">{`Date To`}</p>
          <input
            disabled={true}
            type="date"
            value={data.DateTo}
            className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px] text-gray-400"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                DateTo: new Date(e?.target?.value).toISOString().slice(0, 10),
              }))
            }
          />
        </div>

        <div className="p-2 flex flex-col justify-centrt items-center">
          {!regix["Friday"].test(data.Friday) ? (
            <div className="w-full h-4 flex flex-row justify-start items-center gap-3">
              <p className="h-full text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Friday (Min)`}</p>
              <p className="text-[10px] text-red-500 h-full">
                Not Valid text field data
              </p>
            </div>
          ) : (
            <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Friday (Min)`}</p>
          )}
          <input
            type="text"
            className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
            value={data.Friday}
            onChange={(e) =>
              setData((prev) => ({ ...prev, Friday: e.target.value }))
            }
          />
        </div>

        <div className="p-2 flex flex-col justify-centrt items-center">
          {!regix["Saturday"].test(data.Saturday) ? (
            <div className="w-full h-4 flex flex-row justify-start items-center gap-3">
              <p className="h-full text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Saturday (Min)`}</p>
              <p className="text-[10px] text-red-500 h-full">
                Not Valid text field data
              </p>
            </div>
          ) : (
            <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Saturday (Min)`}</p>
          )}
          <input
            type="text"
            className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
            value={data.Saturday}
            onChange={(e) =>
              setData((prev) => ({ ...prev, Saturday: e.target.value }))
            }
          />
        </div>

        <div className="p-2 flex flex-col justify-centrt items-center">
          {!regix["Sunday"].test(data.Sunday) ? (
            <div className="w-full h-4 flex flex-row justify-start items-center gap-3">
              <p className="h-full text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Sunday (Min)`}</p>
              <p className="text-[10px] text-red-500 h-full">
                Not Valid text field data
              </p>
            </div>
          ) : (
            <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Sunday (Min)`}</p>
          )}
          <input
            type="text"
            className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
            value={data.Sunday}
            onChange={(e) =>
              setData((prev) => ({ ...prev, Sunday: e.target.value }))
            }
          />
        </div>

        <div className="p-2 flex flex-col justify-centrt items-center">
          {!regix["Monday"].test(data.Monday) ? (
            <div className="w-full h-4 flex flex-row justify-start items-center gap-3">
              <p className="h-full text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Monday (Min)`}</p>
              <p className="text-[10px] text-red-500 h-full">
                Not Valid text field data
              </p>
            </div>
          ) : (
            <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Monday (Min)`}</p>
          )}
          <input
            type="text"
            className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
            value={data.Monday}
            onChange={(e) =>
              setData((prev) => ({ ...prev, Monday: e.target.value }))
            }
          />
        </div>

        <div className="p-2 flex flex-col justify-centrt items-center">
          {!regix["Tuesday"].test(data.Tuesday) ? (
            <div className="w-full h-4 flex flex-row justify-start items-center gap-3">
              <p className="h-full text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Tuesday (Min)`}</p>
              <p className="text-[10px] text-red-500 h-full">
                Not Valid text field data
              </p>
            </div>
          ) : (
            <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Tuesday (Min)`}</p>
          )}
          <input
            type="text"
            className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
            value={data.Tuesday}
            onChange={(e) =>
              setData((prev) => ({ ...prev, Tuesday: e.target.value }))
            }
          />
        </div>

        <div className="p-2 flex flex-col justify-centrt items-center">
          {!regix["Wednesday"].test(data.Wednesday) ? (
            <div className="w-full h-4 flex flex-row justify-start items-center gap-3">
              <p className="h-full text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Wednesday (Min)`}</p>
              <p className="text-[10px] text-red-500 h-full">
                Not Valid text field data
              </p>
            </div>
          ) : (
            <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Wednesday (Min)`}</p>
          )}
          <input
            type="text"
            className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
            value={data.Wednesday}
            onChange={(e) =>
              setData((prev) => ({ ...prev, Wednesday: e.target.value }))
            }
          />
        </div>

        <div className="p-2 flex flex-col justify-centrt items-center">
          {!regix["Thursday"].test(data.Thursday) ? (
            <div className="w-full h-4 flex flex-row justify-start items-center gap-3">
              <p className="h-full text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Thursday (Min)`}</p>
              <p className="text-[10px] text-red-500 h-full">
                Not Valid text field data
              </p>
            </div>
          ) : (
            <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Thursday (Min)`}</p>
          )}
          <input
            type="text"
            className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
            value={data.Thursday}
            onChange={(e) =>
              setData((prev) => ({ ...prev, Thursday: e.target.value }))
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
