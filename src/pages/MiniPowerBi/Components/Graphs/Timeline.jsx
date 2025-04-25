import React from "react";

import GanttChart from "./GanttChart";

const Timeline = ({ tableData, item, data, tablesData }) => {
  // useEffect(() => {
  //   let result = {};
  //   let resultArray = [];
  //   if (operationType === "Count") {
  //     tableData?.forEach((v) => {
  //       result[v?.[label]] = (result[v?.[label]] || 0) + 1;
  //     });
  //     Object.keys(result).map((key, index) => {
  //       resultArray.push({
  //         id: index,
  //         label: key,
  //         name: key,
  //         value: result[key],
  //       });
  //     });
  //     //   resultArray.sort((a, b) => b.value - a.value);
  //     //   resultArray = resultArray.slice(0, count);
  //     setChartData(resultArray);
  //   } else if (operationType === "Sum") {
  //     tableData?.forEach((v) => {
  //       datakeys?.map((datakey, idx) => {
  //         result[v?.[label]] = {
  //           ...result[v?.[label]],
  //           [datakey]:
  //             (result[v?.[label]]?.[datakey] || 0) + (v?.[datakey] || 0),
  //         };
  //       });
  //     });
  //     console.log(result);
  //     let keysData = {};
  //     Object.keys(result).map((key, index) => {
  //       keysData = {};
  //       datakeys?.map((datakey, idx) => {
  //         keysData[datakey] = result?.[key]?.[datakey];
  //       });
  //       resultArray.push({
  //         id: index,
  //         label: key,
  //         name: key,
  //         ...keysData,
  //       });
  //     });
  //     console.log(resultArray);
  //     //   resultArray.sort((a, b) => b.value - a.value);
  //     //   resultArray = resultArray.slice(0, count);
  //     setChartData(resultArray);
  //   } else if (operationType === "Average") {
  //     tableData?.forEach((v) => {
  //       datakeys?.map((datakey, idx) => {
  //         result[v?.[label]] = {
  //           sum: {
  //             ...result[v?.[label]]?.sum,
  //             [datakey]:
  //               (result[v?.[label]]?.sum?.[datakey] || 0) + (v?.[datakey] || 0),
  //           },
  //           count: {
  //             ...result[v?.[label]]?.count,
  //             [datakey]: (result[v?.[label]]?.count?.[datakey] || 0) + 1,
  //           },
  //         };
  //       });
  //       // result[v?.[label]] = {
  //       //   sum: (result[v?.[label]]?.sum || 0) + v?.[value],
  //       //   count: (result[v?.[label]]?.count || 0) + 1,
  //       // };
  //     });
  //     console.log(result);
  //     let keysData = {};
  //     Object.keys(result).map((key, index) => {
  //       keysData = {};
  //       datakeys?.map((datakey, idx) => {
  //         keysData[datakey] =
  //           result?.[key]?.count?.[datakey] &&
  //           result?.[key]?.count?.[datakey] !== 0
  //             ? Number(
  //                 (
  //                   result[key]?.sum?.[datakey] / result[key]?.count?.[datakey]
  //                 ).toFixed(2)
  //               )
  //             : 0;
  //       });
  //       resultArray.push({
  //         id: index,
  //         label: key,
  //         name: key,
  //         ...keysData,
  //         //   value:
  //         //     result[key]?.count && result[key]?.count !== 0
  //         //       ? Number((result[key]?.sum / result[key]?.count).toFixed(2))
  //         //       : 0,
  //       });
  //     });
  //     //   resultArray.sort((a, b) => b.value - a.value);
  //     //   resultArray = resultArray.slice(0, count);
  //     setChartData(resultArray);
  //   }
  // }, [tableData, data]);

  return (
    <div className="w-full h-full p-2">
      <GanttChart item={item} data={data} tableData={tableData} />
    </div>
  );
};

export default Timeline;
