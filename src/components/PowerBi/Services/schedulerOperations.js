export const countData = (result, prop, X_Axis, itemName, tableData) => {
  tableData?.[prop?.table]?.data?.forEach((v) => {
    result[v?.[X_Axis]] = {
      ...result[v?.[X_Axis]],
      [itemName]:
        v?.[itemName] !== null && v?.[itemName] !== "" && v?.[itemName] !== 0
          ? (result[v?.[X_Axis]]?.[`${itemName}`] || 0) + 1
          : (result[v?.[X_Axis]]?.[`${itemName}`] || 0) + 0,
    };
  });
};

export const sumData = (result, prop, X_Axis, itemName, tableData) => {
  tableData?.[prop?.table]?.data?.forEach((v) => {
    result[v?.[X_Axis]] = {
      ...result[v?.[X_Axis]],
      [itemName]:
        (result[v?.[X_Axis]]?.[`${itemName}`] || 0) +
        (Number(v?.[`${prop?.col}`]) || 0),
    };
  });
};

export const averageData = (result, prop, X_Axis, itemName, tableData) => {
  tableData?.[prop?.table]?.data?.forEach((v) => {
    result[v?.[X_Axis]] = {
      ...result[v?.[X_Axis]],
      [itemName]: {
        count:
          v?.[itemName] !== null && v?.[itemName] !== "" && v?.[itemName] !== 0
            ? (result[v?.[X_Axis]]?.[`${itemName}`]?.count || 0) + 1
            : (result[v?.[X_Axis]]?.[`${itemName}`]?.count || 0) + 0,
        sum:
          (result[v?.[X_Axis]]?.[`${itemName}`]?.sum || 0) +
          (Number(v?.[`${prop?.col}`]) || 0),
      },
    };
  });
};

export const firstData = (result, prop, X_Axis, itemName, tableData) => {
  tableData?.[prop?.table]?.data?.forEach((v) => {
    if (!result[v?.[X_Axis]]?.[itemName]) {
      result[v?.[X_Axis]] = {
        ...result[v?.[X_Axis]],
        [itemName]: v?.[`${prop?.col}`],
      };
    }
  });
};

export const lastData = (result, prop, X_Axis, itemName, tableData) => {
  tableData?.[prop?.table]?.data?.forEach((v) => {
    result[v?.[X_Axis]] = {
      ...result[v?.[X_Axis]],
      [itemName]: v?.[`${prop?.col}`],
    };
  });
};

export const minData = (result, prop, X_Axis, itemName, tableData) => {
  tableData?.[prop?.table]?.data?.forEach((v) => {
    if (
      !result[v?.[X_Axis]]?.[`${itemName}`] &&
      result[v?.[X_Axis]]?.[`${itemName}`] !== 0
    ) {
      result[v?.[X_Axis]] = {
        ...result[v?.[X_Axis]],
        [itemName]: Number(v?.[`${prop?.col}`]) || 0,
      };
    } else {
      if (
        Number(v?.[`${prop?.col}`]) < Number(result[v?.[X_Axis]]?.[itemName])
      ) {
        result[v?.[X_Axis]] = {
          ...result[v?.[X_Axis]],
          [itemName]: Number(v?.[`${prop?.col}`]),
        };
      }
    }
  });
};

export const maxData = (result, prop, X_Axis, itemName, tableData) => {
  tableData?.[prop?.table]?.data?.forEach((v) => {
    if (
      !result[v?.[X_Axis]]?.[itemName] &&
      result[v?.[X_Axis]]?.[`${itemName}`] !== 0
    ) {
      result[v?.[X_Axis]] = {
        ...result[v?.[X_Axis]],
        [itemName]: v?.[`${prop?.col}`],
      };
    } else {
      if (
        Number(v?.[`${prop?.col}`]) > Number(result[v?.[X_Axis]]?.[itemName])
      ) {
        result[v?.[X_Axis]] = {
          ...result[v?.[X_Axis]],
          [itemName]: v?.[`${prop?.col}`],
        };
      }
    }
  });
};

export const getResultArray = (result, Y_Axis, count) => {
  let resultArray = [];
  const keys = Object.keys(result);
  let index = 0;
  for (const key of keys) {
    let yAxisObj = {};

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
                  )
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
      id: index,
      label: key,
      name: key,
      ...yAxisObj,
    });

    index++;
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
