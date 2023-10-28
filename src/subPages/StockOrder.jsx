import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlineSend } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";

import { TextFields, PageLoading } from "../components";
import { allData } from "../data/allRoles";

const StockOrder = () => {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sites, setSites] = useState([]);
  const [eq, setEq] = useState([]);
  const [dateValue, setDateValue] = useState(
    new Date(
      new Date().setMinutes(
        new Date().getMinutes() - new Date().getTimezoneOffset()
      )
    )
      .toISOString()
      .slice(0, 10)
  );
  const [data, setData] = useState([]);

  const addTextFields = () => {
    setData((prev) => [...prev, <TextFields count={count} eq={eq} />]);
    setCount((prev) => prev + 1);
  };

  const deleteTextFields = () => {
    let copData = data;
    copData.pop();
    setData(copData);
    if (count >= 2) {
      setCount((prev) => prev - 1);
    }
  };

  const changeDateValue = (e) => {
    setDateValue(e.target.value);
  };

  const handleSelectFrom = (e) => {
    console.log(e.target.value);
  };

  const handleSelectTo = (e) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    allData().then((data) => {
      setSites(data.Sites);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    allData().then((data) => {
      setEq(data.Equipments);
      setLoading(false);
    });
  }, []);

  const submitTextFields = () => {};

  return (
    <>
      {loading && <PageLoading />}
      <div className="flex flex-col md:w-full w-screen p-2 md:p-0 h-full items-end">
        <div className="w-full flex md:flex-row flex-col items-center gap-2 mb-8">
          <input
            className="outline-none p-2 bg-logoColor text-white rounded-lg mr-8"
            type="date"
            value={dateValue}
            onChange={changeDateValue}
          />
          <p className=" dark:text-white">From</p>
          <select
            className=" text-[16px] rounded-lg p-2 bg-logoColor text-white mr-8 px-4 max-w-[100px] outline-none"
            onChange={handleSelectFrom}
          >
            {sites.map((site) => (
              <option className="bg-white text-black">{site}</option>
            ))}
          </select>
          <p className=" dark:text-white">To</p>
          <select
            className=" text-[16px] rounded-lg p-2 bg-logoColor text-white mr-8 px-4 max-w-[100px] outline-none"
            onChange={handleSelectTo}
          >
            {sites.map((site) => (
              <option className="bg-white text-black">{site}</option>
            ))}
          </select>
        </div>
        {data.map((item) => item)}
        <div className="flex flex-row mr-2">
          <button
            className="flex flex-row items-center bg-logoColor rounded-full text-white font-bold justify-center py-1 pr-4 pl-2 mt-8"
            onClick={addTextFields}
          >
            <IoMdAdd className="mr-1 font-bold text-[20px]" />
            Add
          </button>
          <button
            className="flex flex-row items-center bg-logoColor rounded-full text-white font-bold justify-center py-1 pr-4 pl-2 mt-8 ml-4"
            onClick={deleteTextFields}
          >
            <AiOutlineMinus className="mr-1 font-bold text-[20px]" />
            Delete
          </button>
        </div>
        <div className="w-full flex mr-2">
          <button
            className="flex flex-row items-center bg-logoColor rounded-full text-white font-bold justify-center py-1 pr-4 pl-2 mt-8 ml-4 w-full"
            onClick={submitTextFields}
          >
            <AiOutlineSend className="mr-1 font-bold text-[20px]" />
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default StockOrder;
