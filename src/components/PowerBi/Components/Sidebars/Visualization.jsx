import React, { useState } from "react";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

import AddGraph from "../AddCards/AddGraph";
import { useInitContext } from "../../Contexts/InitContext";
import Properties from "./PropertiesV1";
// import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const Visualization = () => {
  const {
    setIsPieChartCard,
    setIsBarChartCard,
    setIsTableSceneCard,
    setIsSlicerCard,
    setIsCard,
    setIsTimeline,
    setIsGauge,
    setIsLineChart,
    setCategoryCount,
    data,
    setData,
    usersNamesData,
    setUsersNamesData,
    setIsDeleteCard,
    // handleSend,
    viewName,
    setViewName,
    viewGroup,
    setViewGroup,
    isPerview,
  } = useInitContext();
  // const axiosPrivate = useAxiosPrivate();
  const [isOpenPanel, setIsOpenPanel] = useState(true);
  // const [aiQuery, setAiQuery] = useState("");
  // const [aiResult, setAiResult] = useState("Ai Result Here");

  const handleClick = () => {
    setIsOpenPanel((prev) => !prev);
  };

  // const handleSave = () => {
  //   if (
  //     usersNamesData?.Users.length === 0 ||
  //     viewName === "" ||
  //     viewGroup === ""
  //   ) {
  //     setIsDeleteCard(true);
  //   } else {
  //     handleSend();
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const url = `/api/v3/ai`;
  //   console.log("init");
  //   const data = await axiosPrivate(url, {
  //     method: "POST",
  //     data: JSON.stringify({
  //       query: aiQuery,
  //     }),
  //   });
  //   console.log(data?.data);
  //   // setAiResult(data?.data?.message?.content);
  // };

  return isOpenPanel ? (
    <div
      id="prop-panel"
      className={`flex flex-col h-full bg-gray-300 dark:bg-gray-700 z-[1] transition-[width] duration-500 ease-in-out overflow-y-auto ${
        isPerview ? "w-0 p-0" : "w-[100px] md:w-[200px] lg:w-[200px] p-2"
      }`}
      style={{ scrollbarWidth: "none" }}
      // className="flex w-[200px] h-full flex-col overflow-y-scroll bg-gray-300 p-2 relative z-[1]"
      // style={
      //   {
      //     // width: isPerview ? "0px" : "200px",
      //     // padding: isPerview ? "0px" : "8px",
      //     // transition: "width 0.5s ease-in-out",
      //     // animation: isPerview
      //     //   ? "animate-in 0.5s ease-in-out"
      //     //   : "animate-out 0.5s ease-in-out",
      //   }
      // }
      // style={{ transition: "width 0.5s ease-in-out" }}
    >
      <div className="w-full">
        <div className="w-full flex flex-row justify-between p-1">
          <p className="text-[12px] font-[800] text-gray-800 dark:text-gray-200">
            Visualization
          </p>
          <div
            className="cursor-pointer text-gray-600 dark:text-gray-400 dark:hover:text-gray-100 hover:text-gray-900 transition-colors"
            onClick={handleClick}
          >
            <MdKeyboardDoubleArrowDown size={15} />
          </div>
        </div>

        <AddGraph
          setIsPieChartCard={setIsPieChartCard}
          setIsBarChartCard={setIsBarChartCard}
          setIsTableSceneCard={setIsTableSceneCard}
          setIsSlicerCard={setIsSlicerCard}
          setIsCard={setIsCard}
          setIsTimeline={setIsTimeline}
          setIsGauge={setIsGauge}
          setIsLineChart={setIsLineChart}
          data={data}
          setData={setData}
        />

        {/* <div className="w-full flex flex-col">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className=""
              onChange={(e) => setAiQuery(e.target.value)}
              value={aiQuery}
            />
          </form>
          <p>{aiResult}</p>
        </div> */}

        <div className="w-full flex flex-col">
          <Properties />
        </div>

        {/* <div className="w-full p-2 flex flex-col gap-2">
          <div className="text-[10px] flex flex-row gap-2 items-center w-full p-1">
            <p className="max-w-[20%]">Name</p>
            <input
              type="text"
              className="outline-none rounded-[2px] px-2 py-[2px] max-w-[80%]"
              value={viewName}
              onChange={(e) => setViewName(e.target.value)}
            />
          </div>
          <div className="text-[10px] flex flex-row gap-2 items-center w-full p-1">
            <p className="max-w-[20%]">Group</p>
            <input
              type="text"
              className="outline-none rounded-[2px] px-2 py-[2px] max-w-[80%]"
              value={viewGroup}
              onChange={(e) => setViewGroup(e.target.value)}
            />
          </div>
        </div> */}

        {/* <div className="w-full p-2">
          <button
            className="w-full p-2 bg-green-600 text-white rounded-[8px]"
            onClick={handleSave}
          >
            Save
          </button>
        </div> */}
      </div>
    </div>
  ) : (
    <div
      // className="flex flex-col h-full justify-start items-center gap-8 bg-gray-300 p-2 w-[30px]"
      className="flex flex-col h-full justify-start items-center gap-4 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200  transition-all duration-500 ease-in-out"
      style={{
        width: isPerview ? "0px" : "32px",
        padding: isPerview ? "0px" : "8px",
        transition: "width 0.5s ease-in-out",
      }}
    >
      <div className="hover:cursor-pointer" onClick={handleClick}>
        <MdKeyboardDoubleArrowRight size={15} />
      </div>
      <div
        className="text-gray-800 dark:text-gray-200 font-[800] text-[12px]"
        style={{ writingMode: "vertical-lr" }}
      >
        {`Visualization`}
      </div>
    </div>
  );
};

export default Visualization;
