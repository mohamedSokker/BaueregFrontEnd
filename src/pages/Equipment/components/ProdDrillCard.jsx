import React, { useEffect } from "react";
import { IoFilter } from "react-icons/io5";
import {
  Chart as Chartjs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { SparkLineChart } from "@mui/x-charts";

import useProd from "../controller/prodDrillController";

Chartjs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ProdDrillCard = ({
  title,
  data,
  setIsProdDrillFilterCard,
  setIsProdDrillTable,
}) => {
  const { sum, xData, yData } = useProd({ data });

  return (
    <div className="min-w-[200px] h-full px-2 py-1 flex flex-col items-center justify-start flex-1 rounded-[8px] bg-white border-1 border-gray-300">
      <div className="w-full h-[26px] flex flex-row justify-between gap-1 items-center ">
        <div className="flex flex-row gap-1 items-center">
          <div className="w-3 h-3 rounded-full border-1 border-red-600 flex justify-center items-center">
            <div className="w-0 h-0 border-1 border-red-600 rounded-full"></div>
          </div>
          <p className="text-gray-400 font-bold text-[12px]">{title}</p>
        </div>
        <div
          className="flex flex-row cursor-pointer"
          onClick={() => setIsProdDrillFilterCard(true)}
        >
          <IoFilter />
        </div>
      </div>

      {data && (
        <div className="w-full h-[calc(100%-26px)] flex flex-row items-center justify-start">
          <div className="w-[60%] h-full flex flex-row items-center pl-4">
            <p className="text-[18px] font-extrabold">{sum}</p>
          </div>

          <div
            className="w-[40%] h-[100%] flex flex-row cursor-pointer"
            onClick={() => setIsProdDrillTable(true)}
          >
            <SparkLineChart
              className=" bg-slate-500"
              data={[9, 5, 7, 5, 2, 4, 1]}
              curve="natural"
              colors={["rgb(220,38,38)"]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProdDrillCard;
