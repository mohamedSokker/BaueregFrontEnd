import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { TbReportSearch } from "react-icons/tb";

import useQA from "../Controller/controller";
import PageLoading from "../../../../components/PageLoading";

const Report = () => {
  const { loading, message, data, getData } = useQA();

  const [category, setCategory] = useState("Reports");

  console.log(data);

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {loading && <PageLoading message={message} />}
      <div className="w-full h-[6vh] p-2 flex flex-row  items-center">
        <div className="flex flex-row justify-between  py-1 px-3 w-full rounded-[8px] border-1 border-gray-300">
          <div className="flex flex-row gap-2 text-black text-[12px] items-center">
            <div className="hover:cursor-pointer">
              <IoFilter />
            </div>
          </div>
          <div className="flex flex-row gap-2 text-black text-[14px] items-center">
            <div
              className="hover:cursor-pointer"
              onClick={() => {
                setCategory("New");
              }}
            >
              <CiCirclePlus
                style={{
                  color: category === "New" ? "blue" : "black",
                  borderBottomWidth: category === "New" ? 1 : 0,
                  borderBottomColor: category === "New" ? "blue" : "black",
                }}
              />
            </div>
            <div
              className="hover:cursor-pointer"
              onClick={() => {
                setCategory("Reports");
              }}
            >
              <TbReportSearch
                style={{
                  color: category === "Reports" ? "blue" : "black",
                  borderBottomWidth: category === "Reports" ? 1 : 0,
                  borderBottomColor: category === "Reports" ? "blue" : "black",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full h-[calc(84vh-35px)] flex flex-col justify-start items-start gap-2 px-2 overflow-x-scroll"
        id="cont"
      >
        {data?.map((d, i) => (
          <div
            className="px-4 p-1 text-black bg-gray-200 rounded-md flex flex-row justify-between items-center w-full hover:cursor-pointer"
            key={i}
            onClick={() => {}}
          >
            <div className="flex flex-row gap-2 ">
              <p className="text-[12px] text-gray-500">{`${i + 1} -`}</p>
              <p className="text-[12px] text-gray-500">{d.Equipment}</p>
              <p className="text-[12px] text-gray-400">{`(${new Date(
                d.DateTime
              ).toLocaleString()})`}</p>
            </div>
            <div>
              <img
                src={`${process.env.REACT_APP_BASE_URL}/${d.UserImage}`}
                className="w-6 h-6 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Report;
