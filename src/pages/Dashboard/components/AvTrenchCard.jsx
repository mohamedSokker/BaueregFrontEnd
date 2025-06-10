import React from "react";
import { IoFilter } from "react-icons/io5";
import { SparkLineChart } from "@mui/x-charts";
import useAv from "../controller/avTrenchController";

const AvTrenchCard = ({
  title,
  data,
  setIsAvTrenchFilterCard,
  setIsAvTrenchTable,
}) => {
  const { sum, xData, yData } = useAv({ data });

  return (
    <div className="min-w-[220px] h-full  px-4 py-3 flex flex-col justify-between rounded-xl bg-white shadow-md border border-gray-200 transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500 ring-2 ring-green-200"></div>
          <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
        </div>
        <button
          onClick={() => setIsAvTrenchFilterCard(true)}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition"
          aria-label="Open filter"
        >
          <IoFilter size={18} />
        </button>
      </div>

      {/* Content */}
      {data && (
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between h-full gap-3 cursor-pointer"
          onClick={() => setIsAvTrenchTable(true)}
        >
          {/* Statistic Value */}
          <div className="text-left">
            <p className="text-3xl font-extrabold text-gray-800">{sum}</p>
          </div>

          {/* Sparkline Chart */}
          <div className="w-full md:w-1/2 h-20">
            <SparkLineChart
              data={[1, 4, 2, 5, 7, 5, 9, 1, 4, 2, 5, 7, 5, 9]}
              curve="natural"
              colors={["#16a34a"]} // Tailwind green-600
              areaProps={{ fillOpacity: 0.2 }}
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AvTrenchCard;
