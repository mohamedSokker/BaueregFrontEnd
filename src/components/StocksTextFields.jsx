import React, { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";

import { allData } from "../data/allRoles";

const TextFields = ({ count, eq }) => {
  const [error, setError] = useState(true);

  const handleSelectEq = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="flex flex-col w-full h-full mb-20">
      <div className="flex md:flex-row flex-col p-2 items-center">
        <div className="flex flex-row w-full items-center p-1  md:mb-0 mb-8">
          <p className="w-10 dark:text-white">{`${count} -`} </p>
          <input
            id={`text-${count}`}
            type="text"
            className="text-black pl-2 bg-white border-b-2 border-logoColor border-solid outline-none w-64 mr-4 dark:rounded-md"
            placeholder="Enter Stock Code"
            onChange={() => {
              setError((prev) => !prev);
            }}
          />
          {error ? (
            <MdErrorOutline className=" text-green-800 dark:text-green-600 mr-8 font-light text-[20px]" />
          ) : (
            <AiOutlineCheckCircle className=" text-green-800 mr-8 font-light text-[20px]" />
          )}
        </div>
        <input
          type="text"
          className="text-black pl-2 bg-white border-b-2 border-logoColor border-solid outline-none w-36 mr-4 md:mb-0 mb-8 dark:rounded-md"
          placeholder="Quantity"
        />
        <input
          type="text"
          className="text-black pl-2 bg-white border-b-2 border-logoColor border-solid outline-none w-64 mr-4 md:mb-0 mb-8 dark:rounded-md"
          placeholder="Description"
          disabled
        />
        <select
          className=" text-[16px] rounded-lg p-2 bg-logoColor text-white mr-8 pr-8 max-w-[200px] outline-none"
          onChange={handleSelectEq}
        >
          {eq.map((item) => (
            <option>{item}</option>
          ))}
        </select>
        {/* <input
          type="text"
          className="text-black pl-2 bg-white border-b-2 border-logoColor border-solid outline-none w-64 mr-4 md:mb-0 mb-8"
          placeholder="For Equipment"
          disabled
        /> */}
      </div>
      {/* <div className="flex flex-col items-end mt-8 pl-4">
        <textarea
          className="text-black pl-2 bg-white border-b-2 border-logoColor border-solid outline-none w-full h-20 mr-4"
          placeholder="Report"
          disabled
        ></textarea>
      </div> */}
    </div>
  );
};

export default TextFields;
