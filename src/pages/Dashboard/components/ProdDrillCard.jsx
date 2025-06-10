import React from "react";
import { IoFilter } from "react-icons/io5";
import { SparkLineChart } from "@mui/x-charts";
import useProd from "../controller/prodDrillController";

const ProdDrillCard = ({
  title,
  data,
  setIsProdDrillFilterCard,
  setIsProdDrillTable,
}) => {
  const { sum } = useProd({ data });

  return (
    <div
      className="min-w-[220px] h-full cursor-pointer px-4 py-3 flex flex-col justify-between rounded-xl bg-white shadow-md border border-gray-200 transition-transform duration-200 hover:shadow-lg hover:-translate-y-1"
      onClick={() => setIsProdDrillTable(true)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 ring-2 ring-red-200"></div>
          <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering parent click
            setIsProdDrillFilterCard(true);
          }}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition"
          aria-label="Open filter"
        >
          <IoFilter size={18} />
        </button>
      </div>

      {/* Content */}
      {data && (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between h-full gap-3">
          {/* Statistic Value */}
          <div className="text-left">
            <p className="text-2xl md:text-3xl font-bold text-gray-800 whitespace-nowrap">
              {sum}
            </p>
          </div>

          {/* Sparkline Chart */}
          <div className="w-full md:w-1/2 h-20">
            <SparkLineChart
              data={[9, 5, 7, 5, 2, 4, 1]}
              curve="natural"
              colors={["#dc2626"]} // Tailwind red-600
              areaProps={{ fillOpacity: 0.2 }}
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProdDrillCard;
