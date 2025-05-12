import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { TiFlowMerge } from "react-icons/ti";
import { GiChart } from "react-icons/gi";
import { TbChartHistogram } from "react-icons/tb";
import { PiTableFill } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { GrTableAdd } from "react-icons/gr";
import { TiFlowChildren } from "react-icons/ti";
import { VscPreview } from "react-icons/vsc";
import { SiProbot } from "react-icons/si";
import { BsFileEarmarkExcelFill } from "react-icons/bs";

import { logoColor } from "../../../../BauerColors";
import { useInitContext } from "../../Contexts/InitContext";
import "../../Styles/EditCard.css";
import Chatbot from "./Chatbot";

const ToolsSIdebar = () => {
  const {
    categoryCount,
    setCategoryCount,
    setIsTableCard,
    setIsRelationshipTableCard,
    setIsExcelCard,
    setIsPreview,
    isPerview,
    isChatbot,
    setIsChatBot,
  } = useInitContext();
  // console.log(isChatbot);
  return (
    <div
      className="w-[40px] h-full flex flex-col justify-between items-center font-[600] text-[18px] bg-gray-300 gap-1 relative z-[1] py-1"
      style={{
        width: isPerview ? "0px" : "40px",
        transition: "width 0.5s ease-in-out",
        // animation: isPerview
        //   ? "animate-in 0.5s ease-in-out"
        //   : "animate-out 0.5s ease-in-out",
      }}
    >
      <div className="flex flex-col w-full gap-1">
        <div
          className="w-full hover:cursor-pointer hover:text-gray-400 text-logoColor flex justify-center items-center flex-row gap-1 p-2 rounded-md"
          onClick={() => {
            if (categoryCount > 0) setCategoryCount((prev) => prev - 1);
          }}
        >
          <IoIosArrowBack size={16} />
          {/* <p className="text-[10px] text-logoColor">Back</p> */}
        </div>

        <div
          className="w-full hover:cursor-pointer hover:text-gray-400 text-logoColor flex justify-center items-center flex-row gap-1 p-2 rounded-md"
          style={{
            color: categoryCount === 4 ? "rgb(55,65,81)" : "",
          }}
          onClick={() => {
            setCategoryCount(4);
          }}
        >
          <PiTableFill size={16} />
          {/* <p className="text-[10px] text-logoColor">Relations</p> */}
        </div>

        <div
          className="w-full hover:cursor-pointer hover:text-gray-400 text-logoColor flex justify-center items-center flex-row gap-1 p-2 rounded-md"
          style={{
            color: categoryCount === 1 ? "rgb(55,65,81)" : "",
          }}
          onClick={() => {
            setCategoryCount(1);
          }}
        >
          <TiFlowMerge size={16} />
          {/* <p className="text-[10px] text-logoColor">Relations</p> */}
        </div>

        <div
          className="w-full hover:cursor-pointer hover:text-gray-400 text-logoColor flex justify-center items-center flex-row gap-1 p-2 rounded-md"
          style={{
            color: categoryCount === 0 ? "rgb(55,65,81)" : "",
          }}
          onClick={() => {
            setCategoryCount(0);
          }}
        >
          <TbChartHistogram size={16} />
          {/* <p className="text-[10px] text-logoColor">Relations</p> */}
        </div>

        <div
          className="w-full hover:cursor-pointer hover:text-gray-400 text-logoColor flex justify-center items-center flex-row gap-1 p-2 rounded-md"
          style={{
            color: categoryCount === 5 ? "rgb(55,65,81)" : "",
          }}
          onClick={() => {
            setCategoryCount(5);
          }}
        >
          <FiUsers size={16} />
          {/* <p className="text-[10px] text-logoColor">Relations</p> */}
        </div>

        <div className="w-full h-[1px] bg-gray-400"></div>

        <div
          className="w-full hover:cursor-pointer hover:text-gray-400 text-logoColor flex justify-center items-center flex-row gap-1 p-2 rounded-md"
          onClick={() => {
            setIsExcelCard(true);
            // setCategoryCount(4);
          }}
        >
          <BsFileEarmarkExcelFill size={16} />
          {/* <p className="text-[10px] text-logoColor">Relations</p> */}
        </div>

        <div
          className="w-full hover:cursor-pointer hover:text-gray-400 text-logoColor flex justify-center items-center flex-row gap-1 p-2 rounded-md"
          onClick={() => setIsTableCard(true)}
        >
          <GrTableAdd size={16} />
        </div>

        <div
          className="w-full hover:cursor-pointer hover:text-gray-400 text-logoColor flex justify-center items-center flex-row gap-1 p-2 rounded-md"
          onClick={() => setIsRelationshipTableCard(true)}
        >
          <TiFlowChildren size={16} />
        </div>

        <div
          className="w-full hover:cursor-pointer hover:text-gray-400 text-logoColor flex justify-center items-center flex-row gap-1 p-2 rounded-md"
          onClick={() => setIsPreview(true)}
        >
          <VscPreview size={16} />
        </div>
      </div>

      <div className="w-full">
        <div
          className="w-full hover:cursor-pointer hover:text-gray-400 text-logoColor flex justify-center items-center flex-row gap-1 p-2 rounded-md relative"
          // style={{
          //   color: categoryCount === 6 ? "rgb(55,65,81)" : "",
          // }}
          onClick={() => {
            setIsChatBot(true);
            // setCategoryCount(6);
          }}
        >
          <SiProbot size={16} />
          {/* <p className="text-[10px] text-logoColor">Relations</p> */}
        </div>
      </div>

      {/* <p>Manage New Data Entry</p> */}
    </div>
  );
};

export default ToolsSIdebar;
