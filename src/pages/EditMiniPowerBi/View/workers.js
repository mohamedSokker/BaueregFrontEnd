import { detectTableColumnTypes } from "../Services/getTypes.js";
import { getHelperFunctionWorker } from "../Controllers/Expressions/KeyWordsHelper.js";

onmessage = function (e) {
  const { type, payload } = e.data;

  switch (type) {
    case "PROCESS_EXPRESSIONS":
      postMessage({ status: "start", type: "PROCESS_EXPRESSIONS" });
      const result = processExpressions(payload);
      postMessage({
        status: "done",
        type: "PROCESS_EXPRESSIONS",
        data: result,
      });
      break;

    case "PERFORM_RELATIONS":
      postMessage({ status: "start", type: "PERFORM_RELATIONS" });
      const relationsResult = performRelations(payload);
      postMessage({
        status: "done",
        type: "PERFORM_RELATIONS",
        data: relationsResult,
      });
      break;

    case "HANDLE_APPLY":
      postMessage({ status: "start", type: "HANDLE_APPLY" });
      const applyResult = handleApply(payload);
      postMessage({
        status: "done",
        type: "HANDLE_APPLY",
        data: applyResult,
      });
      break;

    case "PERFORM_SELECTS":
      postMessage({ status: "start", type: "PERFORM_SELECTS" });
      const selectsResult = performSelects(payload);
      postMessage({
        status: "done",
        type: "PERFORM_SELECTS",
        data: selectsResult,
      });
      break;

    default:
      console.warn("Unknown message type:", type);
  }
};

const sortByKey = (array, key) => {
  return array?.sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    // Handle null or undefined
    if (valA == null) return 1;
    if (valB == null) return -1;

    // Number
    if (typeof valA === "number" && typeof valB === "number") {
      return valA - valB;
    }

    // Date (ISO strings or Date objects)
    if (valA instanceof Date || !isNaN(Date.parse(valA))) {
      return new Date(valA) - new Date(valB);
    }

    // String (localeCompare handles case and diacritics)
    return String(valA).localeCompare(String(valB));
  });
};

const processExpressions = ({ tablesData, expressions, selectedRefTable }) => {
  let copiedData = { ...tablesData };
  const added = {};
  const addedTables = [];
  //Initialize added tables
  const tablesKeys = Object.keys(copiedData);
  const expKeys = Object.keys(expressions);
  expKeys?.forEach((table) => {
    if (!tablesKeys?.includes(table)) {
      addedTables.push(table);
      copiedData = {
        ...copiedData,
        [table]: { name: table, data: [] },
      };
    }
  });
  Object.keys(expressions || {})?.forEach((table) => {
    const tableData = copiedData?.[table]?.data;
    if (!tableData || !Array.isArray(tableData)) return;

    const allowedKeys = Object.keys(
      tableData[0] ||
        copiedData[
          selectedRefTable?.[table]?.[Object.keys(selectedRefTable[table])[0]]
        ]?.data[0] ||
        {}
    );
    const sanitizedKeys = allowedKeys.map((key) =>
      key.replace(/[^a-zA-Z0-9_]/g, "_")
    );
    const expressionsForTable = expressions[table] || {};
    const cols = Object.keys(expressionsForTable);

    // Initialize added columns
    if (!added[table]) added[table] = [];
    cols.forEach((col) => {
      if (!added[table].includes(col)) added[table].push(col);
    });

    // Process each expression column
    cols?.forEach((col) => {
      try {
        if (!addedTables?.includes(table)) {
          const exp = expressionsForTable[col].replace(/\bDate\b/g, "Date_");
          const funcBody = getHelperFunctionWorker(exp, tablesData);
          const tableData = copiedData[table]?.data;
          const expressionFunction = new Function(
            ...sanitizedKeys,
            `${getHelperFunctionWorker(exp, tablesData)};`
          );

          copiedData[table].data = tableData.map((row) => ({
            ...row,
            [col]: expressionFunction(...allowedKeys.map((key) => row[key])),
          }));

          // Update data types after adding new column
          copiedData[table].dataTypes = detectTableColumnTypes(
            copiedData[table].data
          );
        } else {
          let copiedData1 = { ...copiedData };
          let tablesData = copiedData1;
          const sanitizedKeys = allowedKeys.map((key) =>
            /^(date|Date|Array|Object|String|Number)$/i.test(key)
              ? `${key}_`
              : key
          );
          // const sanitizedKeys = allowedKeys.map((key) =>
          //   key.replace(/[^a-zA-Z0-9_]/g, "_")
          // );
          const exp = expressionsForTable[col];
          const funcBody = getHelperFunctionWorker(exp, tablesData).replace(
            /Today\(\)/g,
            "new Date().toISOString()"
          );
          const expressionFunction = new Function(
            "tablesData",
            ...sanitizedKeys,
            "Date",
            funcBody
          );

          // Loop through the table and add the new column based on the expression
          // const result = copiedData1?.[
          //   selectedRefTable?.[table]?.[col]
          // ]?.data?.flatMap((row) => {
          //   const args = sanitizedKeys.map((key, i) => {
          //     const originalKey = allowedKeys[i];
          //     return row[originalKey];
          //   });

          //   const newValue = expressionFunction(copiedData1, ...args, Date);

          //   if (Array.isArray(newValue)) {
          //     return newValue.map((item, i) => {
          //       return { ...item };
          //     });
          //   } else {
          //     return {
          //       ...row,
          //       [col]: newValue,
          //     };
          //   }
          // });
          const result = expressionFunction(tablesData, ...allowedKeys, Date);
          // console.log(result);
          copiedData1[table].data = result;
          copiedData1[table].dataTypes = detectTableColumnTypes(result);
        }
      } catch (error) {
        console.error(
          `Error evaluating expression for ${table}.${col}:`,
          error
        );
      }
    });
  });

  return { copiedData, added, addedTables, expressions };
};

const performRelations = ({
  relDataMap,
  relationsTable,
  isRelationshipChoose,
  tablesData,
}) => {
  const updatedTables = tablesData;
  for (const item of relationsTable) {
    if (isRelationshipChoose?.includes(item.Name)) {
      const relationships = JSON.parse(item?.RelationShips);
      const copiedRelationstablesData = {
        ...relDataMap,
      };
      let sourceTable = relationships?.[0]?.source;
      let sourceData = copiedRelationstablesData?.[sourceTable]
        ? copiedRelationstablesData?.[sourceTable]
        : [];
      let currentVT = [];

      for (const rel of relationships) {
        if (rel?.source === "FiltersNode") {
          if (rel?.sourceHandle === "Blank()") {
            copiedRelationstablesData[rel?.target] =
              copiedRelationstablesData?.[rel?.target]?.filter(
                (row) => row?.[rel?.targetHandle] === null
              );
          }
        }
      }

      for (const item of relationships) {
        currentVT = [];
        currentVT.push(
          ...sourceData?.map((row1) => {
            const match = copiedRelationstablesData?.[item?.target]?.find(
              (row2) =>
                row1?.[item?.sourceHandle] === row2?.[item?.targetHandle]
            );
            return { ...match, ID: row1.ID, ...row1 };
          })
        );
        sourceData = currentVT;
      }

      currentVT.push(sourceData);
      currentVT.pop();

      updatedTables[item.Name] = {
        name: item.Name,
        data: sourceData,
        dataTypes:
          sourceData.length > 0 ? detectTableColumnTypes(sourceData) : {},
      };
    }
  }

  return { updatedTables };
};

const performSelects = ({
  savedTablesData,
  isItemChecked,
  isItemUnChecked,
  isSelectAllChecked,
  isSortChecked,
}) => {
  const result = {};
  const uncheckedResult = {};
  const selectAllResult = {};
  const sortResult = {};

  let colFlag = false;

  Object.entries(savedTablesData).forEach(([table, tableData]) => {
    if (!isItemChecked?.[table]) {
      const rows = tableData?.data || [];
      const firstRow = rows[0] || {};

      sortResult[table] = sortResult[table] || [];

      Object.keys(firstRow).forEach((col) => {
        selectAllResult[table] = selectAllResult[table] || {};
        selectAllResult[table][col] = { SelectAll: true };

        result[table] = result[table] || {};
        result[table][col] = [];

        uncheckedResult[table] = uncheckedResult[table] || {};
        uncheckedResult[table][col] = [];

        if (!sortResult[table].includes("ID")) {
          sortResult[table].push("ID");
        }

        const uniqueValues = new Set();

        rows.forEach((item) => {
          const value = item[col];
          if (!uniqueValues.has(value)) {
            uniqueValues.add(value);
          }
        });

        result[table][col] = Array.from(uniqueValues).sort((a, b) => {
          if (a == null) return 1;
          if (b == null) return -1;
          if (!isNaN(Date.parse(a)) && !isNaN(Date.parse(b))) {
            return new Date(a) - new Date(b);
          }
          if (typeof a === "number" && typeof b === "number") {
            return a - b;
          }
          return String(a).localeCompare(String(b));
        });
      });
      colFlag = true;
    } else {
      result[table] = isItemChecked[table];
      uncheckedResult[table] = isItemUnChecked[table];
      selectAllResult[table] = isSelectAllChecked[table];
      sortResult[table] = isSortChecked[table];
      colFlag = false;
    }
  });

  return { result, selectAllResult, uncheckedResult, sortResult, colFlag };
};

const handleApply = ({ isItemUnChecked, isSortChecked, savedTablesData }) => {
  let slicers = {};

  Object.keys(isItemUnChecked || {}).forEach((table) => {
    slicers[table] = [];
    Object.keys(isItemUnChecked[table] || {}).forEach((col) => {
      (isItemUnChecked[table][col] || []).forEach((item) => {
        //   if (!slicers[table]) slicers[table] = [];
        slicers[table].push({ colName: col, item });
      });
    });
  });

  // console.log(slicers);

  let result = { ...savedTablesData };
  let resultData = [];
  Object.keys(savedTablesData)?.map((table) => {
    sortByKey(savedTablesData?.[table]?.data, isSortChecked?.[table]?.[0]);
    resultData = [];
    resultData = savedTablesData?.[table]?.data?.filter((row) => {
      if (slicers?.[table]?.length === 0) {
        return true;
      }
      return slicers?.[table]?.every(({ colName, item }) => {
        if (row[colName] === item) {
          return false;
        } else {
          return true;
        }
      });
    });
    result[table] = {
      ...result[table],
      data: resultData,
    };
  });
  return { result };
};
