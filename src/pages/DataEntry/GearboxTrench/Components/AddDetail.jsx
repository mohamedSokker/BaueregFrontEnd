import React from "react";

import Dropdown from "../Components/Dropdown";
import PageLoading from "../../../../components/PageLoading";
import useAddDetail from "../Controllers/addDetail";

const AddDetail = () => {
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
    details,
    setDetails,
  } = useAddDetail({});
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
            <p className="w-full h-6 text-[14px] text-gray-400 flex flex-row justify-start">{`Name`}</p>
            <input
              type="text"
              disabled={!data.Type || data.Type === "" ? true : false}
              value={data.Details?.name}
              className="w-[30vw] border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px]"
              onChange={
                (e) => {
                  const targetType = siteData?.sitesResult.filter(
                    (item) => item.Type === data.Type
                  );
                  const detailResult = Object.keys(
                    JSON.parse(targetType[0]?.Details)
                  );
                  setDetails(detailResult);
                  let detailsObject = {};
                  detailResult.map((item) => {
                    detailsObject = { ...detailsObject, [item]: "" };
                  });
                  setData((prev) => ({
                    ...prev,
                    Details: { ...detailsObject, [e.target.value]: "" },
                  }));
                }
                // setData((prev) => ({
                //   ...prev,
                //   Details: { ...prev.Details, [e?.target?.value]: "" },
                // }))
              }
            />
          </div>
        </div>

        <div className="flex flex-1 flex-row flex-wrap items-start justify-between ">
          {details?.map((item, i) => (
            <div
              key={i}
              className="p-2 flex flex-col justify-center items-center "
            >
              <p className="w-full h-6 text-[14px] text-gray-400 flex flex-row justify-between"></p>
              <div className="w-[30vw] border-1 rounded-md border-logoColor outline-none p-2 bg-gray-100 text-[14px]">
                {item}
              </div>
            </div>
          ))}
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

export default AddDetail;
