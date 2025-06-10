import React from "react";
import { IoFilter } from "react-icons/io5";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

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

// 🎨 Custom Legend Component – Positioned Vertically on Right
const CustomLegend = ({ payload }) => (
  <ul className="flex flex-col gap-2 text-xs text-gray-600 w-32">
    {payload.map((entry, index) => (
      <li
        key={`legend-item-${index}`}
        className="flex items-center gap-2 truncate"
      >
        <span
          className="inline-block w-3 h-3"
          style={{ backgroundColor: COLORS[index % COLORS.length] }}
        ></span>
        <span title={entry.value} className="truncate">
          {entry.label}
        </span>
      </li>
    ))}
  </ul>
);

// 📊 Main Card Component
const FuelConsCard = ({ title, data, setIsBdFilterCard }) => {
  const { chartData } = useBd({ data });

  return (
    <div className="min-w-[350px] h-full px-4 py-3 flex flex-col justify-between rounded-xl bg-white shadow-md border border-gray-200 transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-violet-500 ring-2 ring-violet-200"></div>
          <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsBdFilterCard(true);
          }}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition"
          aria-label="Open filter"
        >
          <IoFilter size={18} />
        </button>
      </div>

      {/* Chart + Legend Layout */}
      {data && (
        <div className="flex-1 flex items-center gap-4 mt-2 overflow-hidden">
          {/* Pie Chart Area */}
          <div className="w-1/2 h-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
              className="text-[10px]"
            >
              <PieChart>
                <Pie
                  dataKey="value"
                  data={chartData}
                  label
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  isAnimationActive={true}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  labelStyle={{ fontSize: "10px" }}
                  itemStyle={{ fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Scrollable Legend - Right Side */}
          <div className="w-1/2 h-full overflow-y-auto pr-1">
            <CustomLegend payload={chartData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FuelConsCard;
