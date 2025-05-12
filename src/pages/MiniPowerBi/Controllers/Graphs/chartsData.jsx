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

const addExpressionsToData = (data, expressions) => {
  return data.map((row) => {
    const newRow = { ...row };

    expressions?.forEach((expr) => {
      const { name, firstArg, secondArg, opType } = expr;
      // console.log(newRow);
      // console.log(name);
      // console.log(newRow[name]);
      let val1 = firstArg;
      let val2 = secondArg;
      const numericValue1 = Number(val1);
      const numericValue2 = Number(val2);

      if (!isNaN(numericValue1)) {
        val1 = numericValue1;
      } else {
        val1 = parseFloat(row[firstArg]);
      }

      if (!isNaN(numericValue2)) {
        val2 = numericValue2;
      } else {
        val2 = parseFloat(row[secondArg]);
      }

      // console.log(expressions);
      // console.log(data);
      // console.log(firstArg, secondArg, val1, val2);

      if (isNaN(val1) || isNaN(val2)) return;

      switch (opType) {
        case "Division":
          newRow[name] = val2 !== 0 ? val1 / val2 : null;
          break;
        case "Multiply":
          newRow[name] = val1 * val2;
          break;
        case "Sum":
          newRow[name] = val1 + val2;
          break;
        case "Subtraction":
        default:
          newRow[name] = val1 - val2;
      }
    });

    return newRow;
  });
};

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
    if (item?.expressions?.length) {
      resultArray = addExpressionsToData(resultArray, item.expressions);
    }

    setChartData(resultArray);
  }, [tableData, data]);
  return { chartData };
};

export default useChartsData;
