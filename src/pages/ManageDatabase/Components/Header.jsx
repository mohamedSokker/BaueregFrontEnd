import React from "react";
import { VscRunAll } from "react-icons/vsc";
import { FaSheetPlastic } from "react-icons/fa6";

const Header = ({ query, setDBResult, setCategory }) => {
  return (
    <div className="w-full min-h-[40px] flex flex-row justify-end items-center px-2 gap-1">
      <button className="p-1 px-2 text-black text-[12px]  flex flex-row gap-1 items-center hover:bg-gray-300">
        <VscRunAll color="green" />
        Execute
      </button>

      <button
        className="p-1 px-2 text-black text-[12px]  flex flex-row gap-1 items-center hover:bg-gray-300"
        onClick={() => setCategory("Blank Query")}
      >
        <FaSheetPlastic color="orange" />
        Query
      </button>
    </div>
  );
};

export default Header;
