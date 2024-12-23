import React, { useState } from "react";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

import AddGraph from "../AddCards/AddGraph";

const Visualization = ({
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
}) => {
  const [isOpenPanel, setIsOpenPanel] = useState(true);

  const handleClick = () => {
    setIsOpenPanel((prev) => !prev);
    // const result = [];
    // const scale = isOpenPanel
    //   ? (parseInt(data.containerStyles.width) + 170) /
    //     parseInt(data.containerStyles.width)
    //   : (parseInt(data.containerStyles.width) - 170) /
    //     parseInt(data.containerStyles.width);
    // data?.el?.map((item) => {
    //   result.push({
    //     ...item,
    //     left: `${Math.round(parseInt(item.left) * scale)}%`,
    //   });
    // });
    // setData((prev) => ({
    //   ...prev,
    //   el: result,
    //   containerStyles: { ...prev.containerStyles },
    // }));
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

        <div className="w-full p-2">
          <button
            className="w-full p-2 bg-green-600 text-white rounded-[8px]"
            onClick={() => {
              // setCategoryCount((prev) => prev + 1);
            }}
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
