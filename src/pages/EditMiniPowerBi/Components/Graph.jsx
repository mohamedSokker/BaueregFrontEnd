import React from "react";
import PieChart from "./Graphs/PieChart";
import BarChart from "./Graphs/Barchart";
// import BarChart from "./Graphs/CustomBarChart";
import GaugeChart from "./Graphs/GaugeChart";
import LineChart from "./Graphs/LineChart";
import Timeline from "./Graphs/Timeline";
import Gauge from "./Graphs/Gauge";

const Graph = ({ item, tableData, data, tablesData }) => {
  return (
    <div
      className="w-full h-full relative overflow-scroll flex flex-col flex-grow"
      style={item?.style}
    >
      <p className="w-full text-center py-1 text-[10px]">{item?.name}</p>
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
  );
};

export default Graph;
