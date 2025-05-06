export const countData = (
  result,
  prop,
  X_Axis,
  itemName,
  tableData,
  operationType
) => {
  tableData?.[prop?.table]?.data?.forEach((v) => {
    result[operationType] = {
      ...result[operationType],
      [itemName]:
        v?.[itemName] !== null && v?.[itemName] !== "" && v?.[itemName] !== 0
          ? (result[operationType]?.[`${itemName}`] || 0) + 1
          : (result[operationType]?.[`${itemName}`] || 0) + 0,
    };
  });
};

export const sumData = (
  result,
  prop,
  X_Axis,
  itemName,
  tableData,
  operationType
) => {
  tableData?.[prop?.table]?.data?.forEach((v) => {
    result[operationType] = {
      ...result[operationType],
      [itemName]:
        (result[operationType]?.[`${itemName}`] || 0) +
        (Number(v?.[`${prop?.col}`]) || 0),
    };
  });
};

export const averageData = (
  result,
  prop,
  X_Axis,
  itemName,
  tableData,
  operationType,
  avResult
) => {
  tableData?.[prop?.table]?.data?.forEach((v) => {
    avResult[operationType] = {
      ...avResult[operationType],
      [itemName]: {
        count:
          v?.[itemName] !== null && v?.[itemName] !== "" && v?.[itemName] !== 0
            ? (avResult[operationType]?.[`${itemName}`]?.count || 0) + 1
            : (avResult[operationType]?.[`${itemName}`]?.count || 0) + 0,
        sum:
          (avResult[operationType]?.[`${itemName}`]?.sum || 0) +
          (Number(v?.[`${prop?.col}`]) || 0),
      },
    };
  });
  result[operationType] = {
    ...result[operationType],
    [itemName]:
      avResult[operationType]?.[itemName]?.count &&
      avResult[operationType]?.[itemName]?.count !== 0
        ? Number(
            Number(
              avResult[operationType]?.[itemName]?.sum /
                avResult[operationType]?.[itemName]?.count
            ).toFixed(1)
          )
        : 0,
  };
};

export const firstData = (
  result,
  prop,
  X_Axis,
  itemName,
  tableData,
  operationType
) => {
  tableData?.[prop?.table]?.data?.forEach((v) => {
    if (
      !result[operationType]?.[itemName] &&
      result[operationType]?.[`${itemName}`] !== 0
    ) {
      result[operationType] = {
        ...result[operationType],
        [itemName]: v?.[`${prop?.col}`],
      };
    }
  });
};

export const lastData = (
  result,
  prop,
  X_Axis,
  itemName,
  tableData,
  operationType
) => {
  tableData?.[prop?.table]?.data?.forEach((v) => {
    result[operationType] = {
      ...result[operationType],
      [itemName]: v?.[`${prop?.col}`],
    };
  });
};

export const minData = (
  result,
  prop,
  X_Axis,
  itemName,
  tableData,
  operationType
) => {
  tableData?.[prop?.table]?.data?.forEach((v) => {
    if (
      !result[operationType]?.[`${itemName}`] &&
      result[operationType]?.[`${itemName}`] !== 0
    ) {
      result[operationType] = {
        ...result[operationType],
        [itemName]: v?.[`${prop?.col}`],
      };
    } else {
      if (
        Number(v?.[`${prop?.col}`]) <
        Number(result[operationType]?.[`${itemName}`])
      ) {
        result[operationType] = {
          ...result[operationType],
          [itemName]: v?.[`${prop?.col}`],
        };
      }
    }
  });
};

export const maxData = (
  result,
  prop,
  X_Axis,
  itemName,
  tableData,
  operationType
) => {
  tableData?.[prop?.table]?.data?.forEach((v) => {
    if (
      !result[operationType]?.[itemName] &&
      result[v?.[X_Axis]]?.[`${itemName}`] !== 0
    ) {
      result[operationType] = {
        ...result[operationType],
        [itemName]: v?.[`${prop?.col}`],
      };
    } else {
      if (
        Number(v?.[`${prop?.col}`]) > Number(result[operationType]?.[itemName])
      ) {
        result[operationType] = {
          ...result[operationType],
          [itemName]: v?.[`${prop?.col}`],
        };
      }
    }
  });
};

export const getResultArray = (result, tooltipProps, Y_Axis, count) => {
  let resultArray = [];
  const keys = Object.keys(result);
  for (const key of keys) {
    let toolTipsObj = {};
    let yAxisObj = {};
    tooltipProps?.map((prop) => {
      if (prop?.opType === "Count") {
        toolTipsObj = {
          ...toolTipsObj,
          [`${prop?.name}`]: result[key]?.[`${prop?.name}`] || 0,
        };
      } else if (prop?.opType === "Sum") {
        toolTipsObj = {
          ...toolTipsObj,
          [`${prop?.name}`]: Number(result[key]?.[`${prop?.name}`])
            ? Number(Number(result[key]?.[`${prop?.name}`]).toFixed(1))
            : 0,
        };
      } else if (prop?.opType === "Average") {
        toolTipsObj = {
          ...toolTipsObj,
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
      } else if (prop?.opType === "First") {
        toolTipsObj = {
          ...toolTipsObj,
          [`${prop?.name}`]: result[key]?.[`${prop?.name}`],
        };
      } else if (prop?.opType === "Last") {
        toolTipsObj = {
          ...toolTipsObj,
          [`${prop?.name}`]: result[key]?.[`${prop?.name}`],
        };
      } else if (prop?.opType === "Min") {
        toolTipsObj = {
          ...toolTipsObj,
          [`${prop?.name}`]: result[key]?.[`${prop?.name}`],
        };
      } else if (prop?.opType === "Max") {
        toolTipsObj = {
          ...toolTipsObj,
          [`${prop?.name}`]: result[key]?.[`${prop?.name}`],
        };
      }
    });

    Y_Axis?.map((prop) => {
      if (prop?.opType === "Count") {
        yAxisObj = {
          ...yAxisObj,
          [`${prop?.name}`]: result[key]?.[`${prop?.name}`] || 0,
        };
      } else if (prop?.opType === "Sum") {
        yAxisObj = {
          ...yAxisObj,
          [`${prop?.name}`]: Number(result[key]?.[`${prop?.name}`])
            ? Number(Number(result[key]?.[`${prop?.name}`]).toFixed(2))
            : 0,
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
      } else if (prop?.opType === "First") {
        yAxisObj = {
          ...yAxisObj,
          [`${prop?.name}`]: result[key]?.[`${prop?.name}`],
        };
      } else if (prop?.opType === "Last") {
        yAxisObj = {
          ...yAxisObj,
          [`${prop?.name}`]: result[key]?.[`${prop?.name}`],
        };
      } else if (prop?.opType === "Min") {
        yAxisObj = {
          ...yAxisObj,
          [`${prop?.name}`]: result[key]?.[`${prop?.name}`],
        };
      } else if (prop?.opType === "Max") {
        yAxisObj = {
          ...yAxisObj,
          [`${prop?.name}`]: result[key]?.[`${prop?.name}`],
        };
      }
    });
    resultArray.push({
      //   id: index,
      label: key,
      name: key,
      ...yAxisObj,
      ...toolTipsObj,
    });
  }

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

  return resultArray;
};
