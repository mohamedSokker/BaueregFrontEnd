import React, { useState, useEffect } from "react";

import {
  countData,
  sumData,
  averageData,
  getResultArray,
  firstData,
  lastData,
  minData,
  maxData,
} from "../../Services/chartsOperations";

const useChartsData = ({ tableData, item, data, tablesData }) => {
  const [chartData, setChartData] = useState(null);

  const { X_Axis, tooltipProps, tooltips, count, Y_Axis } = item;

  useEffect(() => {
    let result = {};
    let resultArray = [];
    // tableData?.forEach((v) => {
    Y_Axis?.map((prop) => {
      if (prop?.opType === "Count") {
        countData(result, prop, X_Axis, prop?.name, tablesData);
      } else if (prop?.opType === "Sum") {
        sumData(result, prop, X_Axis, prop?.name, tablesData);
      } else if (prop?.opType === "Average") {
        averageData(result, prop, X_Axis, prop?.name, tablesData);
      } else if (prop?.opType === "First") {
        firstData(result, prop, X_Axis, `${prop?.name}`, tablesData);
      } else if (prop?.opType === "Last") {
        lastData(result, prop, X_Axis, `${prop?.name}`, tablesData);
      } else if (prop?.opType === "Min") {
        minData(result, prop, X_Axis, `${prop?.name}`, tablesData);
      } else if (prop?.opType === "Max") {
        maxData(result, prop, X_Axis, `${prop?.name}`, tablesData);
      }
    });

    tooltips?.map((prop) => {
      if (prop?.opType === "Count") {
        countData(result, prop, X_Axis, `${prop?.name}`, tablesData);
      } else if (prop?.opType === "Sum") {
        sumData(result, prop, X_Axis, `${prop?.name}`, tablesData);
      } else if (prop?.opType === "Average") {
        averageData(result, prop, X_Axis, `${prop?.name}`, tablesData);
      } else if (prop?.opType === "First") {
        firstData(result, prop, X_Axis, `${prop?.name}`, tablesData);
      } else if (prop?.opType === "Last") {
        lastData(result, prop, X_Axis, `${prop?.name}`, tablesData);
      } else if (prop?.opType === "Min") {
        minData(result, prop, X_Axis, `${prop?.name}`, tablesData);
      } else if (prop?.opType === "Max") {
        maxData(result, prop, X_Axis, `${prop?.name}`, tablesData);
      }
    });
    // });

    resultArray = getResultArray(result, tooltips, Y_Axis, count);

    setChartData(resultArray);
  }, [tableData, data]);
  return { chartData };
};

export default useChartsData;
