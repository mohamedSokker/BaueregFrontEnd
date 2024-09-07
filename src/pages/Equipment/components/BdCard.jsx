import React, { useEffect } from "react";
import { IoFilter } from "react-icons/io5";
import {
  PieChart as Pie1Chart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import useBd from "../controller/bdController";

const COLORS = [
  "#156E84",
  "#7F608F",
  "#AE4F46",
  "#CD8880",
  "#A39547",
  "#CFC99D",
  "#3AAE61",
  "#96D6AB",
  "#613A67",
  "#88D3E5",
];

const FuelConsCard = ({ title, data, setIsBdFilterCard }) => {
  const { chartData } = useBd({ data });

  return (
    <div className="min-w-[200px] h-full px-2 py-1 flex flex-col items-center justify-start flex-1 rounded-[8px] bg-white border-1 border-gray-300">
      <div className="w-full h-[26px] flex flex-row justify-between gap-1 items-center ">
        <div className="flex flex-row gap-1 items-center">
          <div className="w-3 h-3 rounded-full border-1 border-violet-600 flex justify-center items-center">
            <div className="w-0 h-0 border-1 border-violet-600 rounded-full"></div>
          </div>
          <p className="text-gray-400 font-bold">{title}</p>
        </div>
        <div
          className="flex flex-row cursor-pointer"
          onClick={() => setIsBdFilterCard(true)}
        >
          <IoFilter />
        </div>
      </div>

      {data && (
        <div className="w-full h-[calc(100%-26px)] flex flex-row items-center justify-start">
          <ResponsiveContainer
            width={"100%"}
            height={`100%`}
            className="text-[10px]"
          >
            <Pie1Chart>
              <Pie
                dataKey={`value`}
                data={chartData}
                label
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                labelStyle={{ fontSize: "8px" }}
                itemStyle={{ fontSize: "12px" }}
                wrapperStyle={{ fontSize: "6px" }}
              />
              <Legend verticalAlign="top" height={40} fontSize={"10px"} />
            </Pie1Chart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default FuelConsCard;
