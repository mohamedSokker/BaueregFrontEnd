import React from "react";
import PieChart from "./Graphs/PieChart";
import BarChart from "./Graphs/Barchart";
import GaugeChart from "./Graphs/GaugeChart";
import LineChart from "./Graphs/LineChart";
import Timeline from "./Graphs/Timeline";

const Graph = ({ item, tableData, data }) => {
  return (
    <div
      className="w-full h-full relative overflow-scroll flex flex-grow"
      style={item?.style}
    >
      {item.graphType === "Pie" && (
        <PieChart
          tableData={tableData}
          item={item}
          data={data}
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
          // label={item?.label}
          // value={item?.value}
          // count={item?.count}
          // operationType={item?.operationType}
          // isCount={item?.isCount}
        />
      )}
      {item.graphType === "Gauge" && (
        <GaugeChart
          tableData={tableData}
          item={item}
          data={data}
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
