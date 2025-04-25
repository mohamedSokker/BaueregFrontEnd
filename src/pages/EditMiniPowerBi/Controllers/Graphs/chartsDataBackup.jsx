import React, { useState, useEffect } from "react";

import {
  countData,
  sumData,
  averageData,
} from "../../Services/chartsOperations";

const useChartsData = ({ tableData, item, data }) => {
  const [chartData, setChartData] = useState(null);

  const { X_Axis, tooltipProps, count, Y_Axis } = item;

  useEffect(() => {
    let result = {};
    let resultArray = [];
    tableData?.forEach((v) => {
      Y_Axis?.map((prop) => {
        if (prop?.opType === "Count") {
          countData(result, prop, v, X_Axis, prop?.name);
          // result[v?.[X_Axis]] = {
          //   ...result[v?.[X_Axis]],
          //   [`${prop?.name}`]:
          //     v?.[prop?.name] !== null && v?.[prop?.name] !== ""
          //       ? (result[v?.[X_Axis]]?.[`${prop?.name}`] || 0) + 1
          //       : (result[v?.[X_Axis]]?.[`${prop?.name}`] || 0) + 0,
          // };
        } else if (prop?.opType === "Sum") {
          sumData(result, prop, v, X_Axis, prop?.name);
          // result[v?.[X_Axis]] = {
          //   ...result[v?.[X_Axis]],
          //   [`${prop?.name}`]:
          //     (result[v?.[X_Axis]]?.[`${prop?.name}`] || 0) +
          //     (Number(v?.[`${prop?.name}`]) || 0),
          // };
        } else if (prop?.opType === "Average") {
          averageData(result, prop, v, X_Axis, prop?.name);
          // result[v?.[X_Axis]] = {
          //   ...result[v?.[X_Axis]],
          //   [`${prop?.name}`]: {
          //     count:
          //       v?.[prop?.name] !== null && v?.[prop?.name] !== ""
          //         ? (result[v?.[X_Axis]]?.[`${prop?.name}`]?.count || 0) + 1
          //         : (result[v?.[X_Axis]]?.[`${prop?.name}`]?.count || 0) + 0,
          //     sum:
          //       (result[v?.[X_Axis]]?.[`${prop?.name}`]?.sum || 0) +
          //       (Number(v?.[`${prop?.name}`]) || 0),
          //   },
          // };
        }
      });

      tooltipProps?.map((prop) => {
        if (prop?.opType === "Count") {
          countData(result, prop, v, X_Axis, `Count Of ${prop?.name}`);
          // result[v?.[X_Axis]] = {
          //   ...result[v?.[X_Axis]],
          //   [`Count Of ${prop?.name}`]:
          //     v?.[prop?.name] !== null && v?.[prop?.name] !== ""
          //       ? (result[v?.[X_Axis]]?.[`Count Of ${prop?.name}`] || 0) + 1
          //       : (result[v?.[X_Axis]]?.[`Count Of ${prop?.name}`] || 0) + 0,
          // };
        } else if (prop?.opType === "Sum") {
          sumData(result, prop, v, X_Axis, `Sum Of ${prop?.name}`);
          // result[v?.[X_Axis]] = {
          //   ...result[v?.[X_Axis]],
          //   [`Sum Of ${prop?.name}`]:
          //     (result[v?.[X_Axis]]?.[`Sum Of ${prop?.name}`] || 0) +
          //     (Number(v?.[`${prop?.name}`]) || 0),
          // };
        } else if (prop?.opType === "Average") {
          averageData(result, prop, v, X_Axis, `Average Of ${prop?.name}`);
          // result[v?.[X_Axis]] = {
          //   ...result[v?.[X_Axis]],
          //   [`Average Of ${prop?.name}`]: {
          //     count:
          //       v?.[prop?.name] !== null && v?.[prop?.name] !== ""
          //         ? (result[v?.[X_Axis]]?.[`Average Of ${prop?.name}`]?.count ||
          //             0) + 1
          //         : (result[v?.[X_Axis]]?.[`Average Of ${prop?.name}`]?.count ||
          //             0) + 0,
          //     sum:
          //       (result[v?.[X_Axis]]?.[`Average Of ${prop?.name}`]?.sum || 0) +
          //       (Number(v?.[`${prop?.name}`]) || 0),
          //   },
          // };
        }
      });
    });
    Object.keys(result).map((key, index) => {
      let toolTipsObj = {};
      let yAxisObj = {};
      tooltipProps?.map((prop) => {
        if (prop?.opType === "Count") {
          toolTipsObj = {
            ...toolTipsObj,
            [`Count Of ${prop?.name}`]: result[key]?.[`Count Of ${prop?.name}`],
          };
        } else if (prop?.opType === "Sum") {
          toolTipsObj = {
            ...toolTipsObj,
            [`Sum Of ${prop?.name}`]: Number(
              Number(result[key]?.[`Sum Of ${prop?.name}`]).toFixed(1)
            ),
          };
        } else if (prop?.opType === "Average") {
          toolTipsObj = {
            ...toolTipsObj,
            [`Average Of ${prop?.name}`]:
              result[key]?.[`Average Of ${prop?.name}`]?.count &&
              result[key]?.[`Average Of ${prop?.name}`]?.count !== 0
                ? Number(
                    Number(
                      result[key]?.[`Average Of ${prop?.name}`]?.sum /
                        result[key]?.[`Average Of ${prop?.name}`]?.count
                    ).toFixed(1)
                  )
                : 0,
          };
        }
      });

      Y_Axis?.map((prop) => {
        if (prop?.opType === "Count") {
          yAxisObj = {
            ...yAxisObj,
            [`${prop?.name}`]: result[key]?.[`${prop?.name}`],
          };
        } else if (prop?.opType === "Sum") {
          yAxisObj = {
            ...yAxisObj,
            [`${prop?.name}`]: Number(
              Number(result[key]?.[`${prop?.name}`]).toFixed(2)
            ),
          };
        } else if (prop?.opType === "Average") {
          yAxisObj = {
            ...yAxisObj,
            [`${prop?.name}`]:
              result[key]?.[`${prop?.name}`]?.count &&
              result[key]?.[`${prop?.name}`]?.count !== 0
                ? Number(
                    Number(
                      result[key]?.[`${prop?.name}`]?.sum /
                        result[key]?.[`${prop?.name}`]?.count
                    ).toFixed(1)
                  )
                : 0,
          };
        }
      });
      resultArray.push({
        id: index,
        label: key,
        name: key,
        ...yAxisObj,
        ...toolTipsObj,
      });
    });
    resultArray.sort((a, b) => {
      let sortingSumA = 0;
      let sortingSumB = 0;
      Y_Axis.map((datakey) => {
        sortingSumA += Number(a[datakey?.name]);
        sortingSumB += Number(b[datakey?.name]);
      });
      return sortingSumB - sortingSumA;
    });
    if (count) resultArray = resultArray.slice(0, count);
    setChartData(resultArray);
  }, [tableData, data]);
  return { chartData };
};

export default useChartsData;
