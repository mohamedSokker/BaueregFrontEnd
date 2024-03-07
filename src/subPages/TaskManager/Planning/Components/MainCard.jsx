import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoFilter } from "react-icons/io5";

import Card from "./Card";

const MainCard = ({
  titleBorderColor,
  title,
  id,
  stores,
  w,
  handleSave,
  handleDelete,
}) => {
  const [isMin, setIsMin] = useState(false);
  return !isMin ? (
    <div
      className="flex flex-col justify-start items-start  h-[98%] bg-gray-300 rounded-md p-1 border-1 border-gray-400 flex-1"
      style={{ minWidth: w, transition: "all 0.5s ease-in-out" }}
    >
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-row justify-start items-center gap-[6px] mb-2 px-1">
          <div
            className="w-4 h-4 rounded-full border-2 bg-gray-200"
            style={{ borderColor: titleBorderColor }}
          ></div>
          <div className="text-black font-[800] text-[16px]">{title}</div>
          <div className="bg-gray-100 px-1 rounded-full text-gray-600 text-[12px] font-[800] flex justify-center items-center">
            {stores[id].length}
          </div>
        </div>
        <div className="mb-2 px-1 flex flex-row items-center gap-[6px]">
          {/* <div className="hover:cursor-pointer">
            <IoFilter size={16} />
          </div> */}
          <div
            className="hover:cursor-pointer"
            onClick={() => setIsMin((prev) => !prev)}
          >
            <MdKeyboardArrowLeft size={20} />
          </div>
        </div>
      </div>
      <div className="w-full h-full overflow-y-scroll">
        <Card
          id={id}
          items={stores[id]}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  ) : (
    <div
      className="flex flex-col justify-start items-center gap-8  h-[98%] bg-gray-300 rounded-md p-1 border-1 border-gray-400 md:min-w-[30px]"
      style={{ transition: "all 0.5s ease-in-out" }}
      // style={{ minWidth: "20px" }}
    >
      <div
        className="hover:cursor-pointer"
        onClick={() => setIsMin((prev) => !prev)}
      >
        <MdKeyboardArrowRight size={20} />
      </div>
      <div
        className="bg-gray-100 py-1 rounded-full text-gray-600 text-[12px] font-[800] flex justify-center items-center"
        style={{ writingMode: "vertical-lr" }}
      >
        {stores[id].length}
      </div>
      <div
        className="text-black font-[800] text-[16px]"
        style={{ writingMode: "vertical-lr" }}
      >
        {title}
      </div>
      <div
        className="w-4 h-4 rounded-full border-2 bg-gray-200"
        style={{ borderColor: titleBorderColor }}
      ></div>
    </div>
  );
};

export default MainCard;
