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
} from "../../Services/cardsOperations";

const addExpressionsToData = (data, expressions) => {
  return data.map((row) => {
    const newRow = { ...row };

    // console.log(expressions);
    expressions?.forEach((expr) => {
      const { name, firstArg, secondArg, opType } = expr;
      // console.log(newRow);
      // console.log(name);
      // console.log(newRow[name]);
      let val1 = firstArg;
      let val2 = secondArg;
      const numericValue1 = Number(firstArg);
      const numericValue2 = Number(secondArg);

      // console.log(
      //   firstArg,
      //   secondArg,
      //   newRow[firstArg],
      //   newRow[secondArg],
      //   !isNaN(numericValue1)
      // );
      if (!isNaN(numericValue1)) {
        val1 = numericValue1;
      } else {
        val1 = newRow[firstArg];
      }

      if (!isNaN(numericValue2)) {
        val2 = numericValue2;
      } else {
        val2 = newRow[secondArg];
      }

      // console.log(expressions);
      // console.log(data);
      // console.log(firstArg, secondArg, val1, val2);

      if (isNaN(val1) || isNaN(val2)) {
        newRow[name] = val1;
        return;
      }

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

const useCardsData = ({ tableData, item, data, tablesData }) => {
  const [chartData, setChartData] = useState(null);

  const {
    X_Axis,
    tooltipProps,
    tooltips,
    count,
    Y_Axis,
    operationType,
    expressions,
  } = item;

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
    // console.log(resultArray);
    if (item?.expressions?.length) {
      resultArray = addExpressionsToData(resultArray, item.expressions);
    }
    let total = 0;
    if (operationType === "Count") {
      resultArray?.map((item) => {
        total += 1;
      });
    } else if (operationType === "Sum") {
      resultArray?.map((item) => {
        total += !isNaN(item?.[expressions?.[expressions?.length - 1]?.name])
          ? item?.[expressions?.[expressions?.length - 1]?.name]
          : 0;
      });
    } else if (operationType === "Average") {
      let count = 0;
      let sum = 0;
      resultArray?.map((item) => {
        count += 1;
        sum += !isNaN(item?.[expressions?.[expressions?.length - 1]?.name])
          ? item?.[expressions?.[expressions?.length - 1]?.name]
          : 0;
      });
      total = count !== 0 ? sum / count : null;
    } else if (operationType === "First") {
      total = resultArray?.[0]?.[expressions?.[expressions?.length - 1]?.name];
    } else if (operationType === "Last") {
      total =
        resultArray?.[resultArray?.length - 1]?.[
          expressions?.[expressions?.length - 1]?.name
        ];
    } else if (operationType === "Min") {
      total = resultArray?.[0]?.[expressions?.[expressions?.length - 1]?.name];
      resultArray?.map((item) => {
        const target = !isNaN(
          item?.[expressions?.[expressions?.length - 1]?.name]
        )
          ? item?.[expressions?.[expressions?.length - 1]?.name]
          : 0;
        if (Number(target) < total) total = Number(target);
      });
    } else if (operationType === "Max") {
      resultArray?.map((item) => {
        const target = !isNaN(
          item?.[expressions?.[expressions?.length - 1]?.name]
        )
          ? item?.[expressions?.[expressions?.length - 1]?.name]
          : 0;
        if (Number(target) > total) total = Number(target);
      });
    }

    setChartData(total);
  }, [tableData, data]);
  return { chartData };
};

export default useCardsData;
