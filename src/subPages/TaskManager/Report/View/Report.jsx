import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";

import useReports from "../Controller/controller";
import PageLoading from "../../../../components/PageLoading";
import EditReport from "../Components/EditReport";

const Report = ({ stores, setStores }) => {
  const {
    loading,
    message,
    data,
    reportData,
    getData,
    handleReportData,
    selectedData,
    selectedReport,
    handleCheck,
    handleRemarks,
    handleSend,
    handleSave,
    handleDelete,
  } = useReports(stores, setStores);

  const [isEditCard, setIsEditCard] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {loading && <PageLoading message={message} />}
      {isEditCard && (
        <EditReport
          setIsEditCard={setIsEditCard}
          reportData={reportData}
          selectedData={selectedData}
          selectedReport={selectedReport}
          handleCheck={handleCheck}
          handleRemarks={handleRemarks}
          handleSend={handleSend}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      )}
      <div className="w-full h-[6vh] p-2 flex items-center">
        <div className="flex flex-row justify-start gap-2 text-black text-[12px] items-center py-1 px-3 w-full rounded-[8px] border-1 border-gray-300">
          <div className="hover:cursor-pointer">
            <IoFilter />
          </div>
          <p>All</p>
        </div>
      </div>
      <div
        className="w-full h-[calc(84vh-35px)] flex flex-col justify-start items-start gap-2 px-2 overflow-scroll"
        id="cont"
      >
        {data?.map((d, i) => (
          <div
            className="px-4 p-1 text-black bg-gray-200 rounded-md flex flex-row justify-between items-center w-full hover:cursor-pointer hover:bg-gray-300"
            key={i}
            onClick={() => {
              setIsEditCard(true);
              handleReportData(JSON.parse(d?.ReportData), d);
            }}
          >
            <div className="flex flex-row gap-2 ">
              <p className="text-[12px] text-gray-500">{`${i + 1} -`}</p>
              <p className="text-[12px] text-gray-500">{d.Equipment}</p>
              <p className="text-[12px] text-gray-400">{`(${new Date(
                d.DateTime
              ).toLocaleString()})`}</p>
            </div>
            <div className="flex flex-row items-center gap-4">
              <img
                src={`${process.env.REACT_APP_BASE_URL}/${d.UserImage}`}
                className="w-6 h-6 rounded-full"
              />
              <p className="text-[12px] text-gray-500">{d.UserName}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Report;
