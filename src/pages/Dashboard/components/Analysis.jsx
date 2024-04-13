import React from "react";
import { IoFilter } from "react-icons/io5";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import useAnalysis from "../controller/analysisController";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-white border-1 border-gray-300">
        <p className="text-[12px] font-[600]">{`${label} `}</p>
        <p className="text-[10px] font-[600]">{`Productuion: ${payload[0]?.payload?.prod}`}</p>
        <p className="text-[10px] font-[600]">{`Fuel Consumption: ${payload[0]?.payload?.fuelCons}`}</p>
        <p className="text-[10px] font-[600]">{`Oil Consumption : ${payload[0]?.payload?.oilCons}`}</p>
        <p className="text-[10px] font-[600]">
          {label.startsWith("MC") || label.startsWith("BC")
            ? `Fuel Consumption / m² : ${(
                Number(payload[0]?.payload?.fuelCons) /
                Number(payload[0]?.payload?.prod)
              ).toFixed(2)}`
            : `Fuel Consumption / ml : ${(
                Number(payload[0]?.payload?.fuelCons) /
                Number(payload[0]?.payload?.prod)
              ).toFixed(2)}`}
        </p>
        <p className="text-[10px] font-[600]">
          {label.startsWith("MC") || label.startsWith("BC")
            ? `Oil Consumption / m² : ${(
                Number(payload[0]?.payload?.oilCons) /
                Number(payload[0]?.payload?.prod)
              ).toFixed(2)}`
            : `Oil Consumption / ml : ${(
                Number(payload[0]?.payload?.oilCons) /
                Number(payload[0]?.payload?.prod)
              ).toFixed(2)}`}
        </p>
      </div>
    );
  }

  return null;
};

const Analysis = ({ data, title }) => {
  const { chartData } = useAnalysis({ data });
  return (
    <div className="w-full h-full px-2 py-1 rounded-[8px] bg-white border-1 border-gray-300">
      <div className="w-full h-[26px] flex flex-row justify-between gap-1 items-center ">
        <div className="flex flex-row gap-1 items-center">
          <div className="w-3 h-3 rounded-full border-1 border-violet-600 flex justify-center items-center">
            <div className="w-0 h-0 border-1 border-violet-600 rounded-full"></div>
          </div>
          <p className="text-gray-400 font-bold">{title}</p>
        </div>
        {/* <div className="flex flex-row cursor-pointer">
          <IoFilter />
        </div> */}
      </div>

      {data && (
        <div className="w-full h-[calc(100%-26px)] flex flex-row items-center justify-start">
          <ResponsiveContainer
            width="100%"
            height="100%"
            className="text-[10px]"
          >
            <BarChart data={chartData}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="fuelCons" stackId="a" fill="#8884d8" barSize={20} />
              <Bar dataKey="oilCons" stackId="a" fill="#82ca9d" barSize={20} />
              <Bar dataKey="prod" stackId="a" fill="#AE4F46" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Analysis;
