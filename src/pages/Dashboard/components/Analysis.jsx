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
    const entry = payload[0]?.payload;

    return (
      <div className="p-3 min-w-[200px] bg-gray-900 text-white rounded shadow-md border border-gray-700">
        <h4 className="text-sm font-semibold mb-1">{label}</h4>
        <p className="text-xs">
          Production:{" "}
          <span className="font-medium">
            {entry.prod}{" "}
            {label.startsWith("MC") || label.startsWith("BC") ? "m²" : "ml"}
          </span>
        </p>
        <p className="text-xs">
          Fuel: <span className="font-medium">{entry.fuelCons} L</span>
        </p>
        <p className="text-xs">
          Oil: <span className="font-medium">{entry.oilCons} L</span>
        </p>
        <p className="text-xs mt-1">
          Fuel /{" "}
          {label.startsWith("MC") || label.startsWith("BC") ? "m²" : "ml"}:{" "}
          <span className="font-medium">
            {(Number(entry.fuelCons) / Number(entry.prod)).toFixed(2)}{" "}
            {label.startsWith("MC") || label.startsWith("BC") ? "L/m²" : "L/ml"}
          </span>
        </p>
        <p className="text-xs">
          Oil / {label.startsWith("MC") || label.startsWith("BC") ? "m²" : "ml"}
          :{" "}
          <span className="font-medium">
            {(Number(entry.oilCons) / Number(entry.prod)).toFixed(2)}{" "}
            {label.startsWith("MC") || label.startsWith("BC") ? "L/m²" : "L/ml"}
          </span>
        </p>
      </div>
    );
  }

  return null;
};

const Analysis = ({ data, title }) => {
  const { chartData } = useAnalysis({ data });

  return (
    <div className="w-full h-full p-4 rounded-[8px] bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-violet-600"></div>
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        </div>
        {/* Optional filter button */}
        <button className="p-1 text-gray-500 hover:text-violet-600 transition-colors">
          <IoFilter size={20} />
        </button>
      </div>

      {data && (
        <div className="w-full h-[calc(100%-26px)] flex flex-row items-center justify-start">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 20 }}
            >
              <CartesianGrid stroke="#f0f0f0" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "#ccc" }}
              />
              <YAxis tick={{ fontSize: 12 }} axisLine={{ stroke: "#ccc" }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />

              <Bar
                name="Fuel Consumption"
                dataKey="fuelCons"
                stackId="a"
                fill="#7C3AED"
                radius={[4, 4, 0, 0]}
                barSize={24}
                animationDuration={600}
              />
              <Bar
                name="Oil Consumption"
                dataKey="oilCons"
                stackId="a"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
                barSize={24}
                animationDuration={600}
              />
              <Bar
                name="Production"
                dataKey="prod"
                stackId="a"
                fill="#EF4444"
                radius={[4, 4, 0, 0]}
                barSize={24}
                animationDuration={600}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {!data && (
        <div className="h-[300px] flex items-center justify-center text-gray-500 text-sm">
          No data available
        </div>
      )}
    </div>
  );
};

export default Analysis;
