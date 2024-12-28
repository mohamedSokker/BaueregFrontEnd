import React, { useState } from "react";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

import AddGraph from "../AddCards/AddGraph";
import { useInitContext } from "../../Contexts/InitContext";

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
    handleSend,
    viewName,
    setViewName,
    viewGroup,
    setViewGroup,
  } = useInitContext();
  const [isOpenPanel, setIsOpenPanel] = useState(true);

  const handleClick = () => {
    setIsOpenPanel((prev) => !prev);
  };

  const handleSave = () => {
    if (
      usersNamesData?.Users.length === 0 ||
      viewName === "" ||
      viewGroup === ""
    ) {
      setIsDeleteCard(true);
    } else {
      handleSend();
    }
  };

  return isOpenPanel ? (
    <div
      className="flex w-[200px] h-full flex-col overflow-y-scroll bg-gray-300 p-2"
      style={{ transition: "width 0.5s ease-in-out" }}
    >
      <div className="w-full">
        <div className="w-full flex flex-row justify-between p-1">
          <p className="text-[12px] font-[800]">Visualization</p>
          <div className="cursor-pointer" onClick={handleClick}>
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

        <div className="w-full p-2 flex flex-col gap-2">
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
        </div>

        <div className="w-full p-2">
          <button
            className="w-full p-2 bg-green-600 text-white rounded-[8px]"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div
      className="flex flex-col h-full justify-start items-center gap-8 bg-gray-300 p-2 w-[30px]"
      style={{ transition: "width 0.5s ease-in-out" }}
    >
      <div className="hover:cursor-pointer" onClick={handleClick}>
        <MdKeyboardDoubleArrowRight size={15} />
      </div>
      <div
        className="text-black font-[800] text-[12px]"
        style={{ writingMode: "vertical-lr" }}
      >
        {`Visualization`}
      </div>
    </div>
  );
};

export default Visualization;
