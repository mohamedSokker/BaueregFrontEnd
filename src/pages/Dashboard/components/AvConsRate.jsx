import React, { useEffect } from "react";
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

import useAvConsRate from "../controller/avConsRateController";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-white border-1 border-gray-300">
        <p className="text-[12px] font-[600]">{`${label} `}</p>
        <p className="text-[10px] font-[600]">{`Equipment: ${payload[0]?.payload?.Equipment}`}</p>
        <p className="text-[10px] font-[600]">{`Quantity: ${payload[0]?.payload?.Quantity}`}</p>
        <p className="text-[10px] font-[600]">{`Working Hours: ${payload[0]?.payload?.["Working Hours"]}`}</p>
        <p className="text-[10px] font-[600]">{`Operational Hours: ${payload[0]?.payload?.["Operational Hours"]}`}</p>
        <p className="text-[10px] font-[600]">{`Average Consumption: ${payload[0]?.payload?.["Avreage Consumption"]} N/month`}</p>
      </div>
    );
  }

  return null;
};

const AvConsRateCard = ({ title, data, currentSpare }) => {
  const { chartData } = useAvConsRate({ data, currentSpare });

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
              <Legend verticalAlign="top" />
              <Bar
                dataKey="Avreage Consumption"
                stackId="a"
                fill="#8884d8"
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default AvConsRateCard;
