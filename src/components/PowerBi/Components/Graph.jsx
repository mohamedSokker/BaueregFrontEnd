import React, { useRef } from "react";
import PieChart from "./Graphs/PieChart";
import BarChart from "./Graphs/Barchart";
// import BarChart from "./Graphs/CustomBarChart";
// import GaugeChart from "./Graphs/GaugeChart";
import LineChart from "./Graphs/LineChart";
import Timeline from "./Graphs/Timeline";
import Gauge from "./Graphs/Gauge";

import "../Styles/EditCard.css";

const Graph = ({ item, tableData, data, tablesData }) => {
  return (
    <div
      className="w-full h-full relative overflow-auto flex flex-col flex-grow"
      style={item?.style}
    >
      <div className="max-h-[20px]">
        <p className="w-full text-center py-1 text-[10px] dark:text-white">
          {item?.name}
        </p>
      </div>

      <div className="h-[calc(100%-25px)]">
        {item.graphType === "Pie" && (
          <PieChart
            tableData={tableData}
            item={item}
            data={data}
            tablesData={tablesData}
            // label={item?.label}
            // value={item?.value}
            // count={item?.count}
            // operationType={item?.operationType}
            // isCount={item?.isCount}
          />
        )}
        {item.graphType === "Bar" && (
          <BarChart
            tableData={tableData}
            item={item}
            data={data}
            tablesData={tablesData}
            // label={item?.label}
            // value={item?.value}
            // count={item?.count}
            // operationType={item?.operationType}
            // isCount={item?.isCount}
          />
        )}
        {item.graphType === "Gauge" && (
          <div className="gauge-wrapper ">
            <Gauge
              tableData={tableData}
              item={item}
              data={data}
              tablesData={tablesData}
              // label={item?.label}
              // value={item?.value}
              // count={item?.count}
              // operationType={item?.operationType}
              // isCount={item?.isCount}
            />
          </div>
        )}
        {item.graphType === "Line" && (
          <LineChart
            tableData={tableData}
            item={item}
            data={data}
            tablesData={tablesData}
            // label={item?.label}
            // value={item?.value}
            // count={item?.count}
            // operationType={item?.operationType}
            // isCount={item?.isCount}
          />
        )}
        {item.graphType === "Timeline" && (
          <Timeline
            tableData={tableData}
            item={item}
            data={data}
            tablesData={tablesData}
            // label={item?.label}
            // value={item?.value}
            // count={item?.count}
            // operationType={item?.operationType}
            // isCount={item?.isCount}
          />
        )}
      </div>
    </div>
  );
};

export default Graph;
