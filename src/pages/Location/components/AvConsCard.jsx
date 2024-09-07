import React, { useEffect } from "react";

import useAvCons from "../controller/AvConsController";

const AvConsCard = ({ title, data, currentSpare }) => {
  const { sum } = useAvCons({ data, currentSpare });

  return (
    <div className="min-w-[200px] h-full px-2 py-1 flex flex-col items-center justify-start flex-1 rounded-[8px] bg-white border-1 border-gray-300">
      <div className="w-full h-[26px] flex flex-row justify-between gap-1 items-center ">
        <div className="flex flex-row gap-1 items-center">
          <div className="w-3 h-3 rounded-full border-1 border-orange-500 flex justify-center items-center">
            <div className="w-0 h-0 border-1 border-orange-500 rounded-full"></div>
          </div>
          <p className="text-gray-400 font-bold ">{title}</p>
        </div>
      </div>

      {data && (
        <div className="w-full h-[calc(100%-26px)] flex flex-row items-center justify-start">
          <div className="w-[60%] h-full flex flex-row items-center pl-4">
            <p className="text-[22px] font-extrabold">{sum}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvConsCard;
