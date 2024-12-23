import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { TiFlowMerge } from "react-icons/ti";
import { GiChart } from "react-icons/gi";
import { TbChartHistogram } from "react-icons/tb";
import { PiTableFill } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";

import { logoColor } from "../../../../BauerColors";

const ToolsSIdebar = ({ categoryCount, setCategoryCount }) => {
  return (
    <div className="w-[40px] h-full flex flex-col justify-start items-center font-[600] text-[18px] bg-gray-200 gap-1 p-1">
      <div
        className="hover:cursor-pointer bg-gray-300 flex justify-center items-center flex-row gap-1 p-2 rounded-md"
        onClick={() => {
          if (categoryCount > 0) setCategoryCount((prev) => prev - 1);
        }}
      >
        <IoIosArrowBack size={16} color={logoColor} />
        {/* <p className="text-[10px] text-logoColor">Back</p> */}
      </div>

      <div
        className="hover:cursor-pointer bg-gray-300 flex justify-center items-center flex-row gap-1 p-2 rounded-md"
        onClick={() => {
          setCategoryCount(4);
        }}
      >
        <PiTableFill size={16} color={logoColor} />
        {/* <p className="text-[10px] text-logoColor">Relations</p> */}
      </div>

      <div
        className="hover:cursor-pointer bg-gray-300 flex justify-center items-center flex-row gap-1 p-2 rounded-md"
        onClick={() => {
          setCategoryCount(1);
        }}
      >
        <TiFlowMerge size={16} color={logoColor} />
        {/* <p className="text-[10px] text-logoColor">Relations</p> */}
      </div>

      <div
        className="hover:cursor-pointer bg-gray-300 flex justify-center items-center flex-row gap-1 p-2 rounded-md"
        onClick={() => {
          setCategoryCount(0);
        }}
      >
        <TbChartHistogram size={16} color={logoColor} />
        {/* <p className="text-[10px] text-logoColor">Relations</p> */}
      </div>

      <div
        className="hover:cursor-pointer bg-gray-300 flex justify-center items-center flex-row gap-1 p-2 rounded-md"
        onClick={() => {
          setCategoryCount(5);
        }}
      >
        <FiUsers size={16} color={logoColor} />
        {/* <p className="text-[10px] text-logoColor">Relations</p> */}
      </div>

      {/* <p>Manage New Data Entry</p> */}
    </div>
  );
};

export default ToolsSIdebar;
