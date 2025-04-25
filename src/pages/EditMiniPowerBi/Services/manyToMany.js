export function processRows(data, columns, nonNumericColumns, numericColumns) {
  const seen = new Set();
  const uniqueRows = [];
  const sumResults = {};
  const totals = {}; // To track totals for numeric columns

  numericColumns.forEach((col) => {
    totals[col] = 0; // Initialize totals for each numeric column
  });
  columns.forEach((c) => {
    const tabData = data?.[c.table]?.data;
    tabData.forEach((row) => {
      const uniqueKey = JSON.stringify(pick(row, nonNumericColumns));
      if (!seen.has(uniqueKey)) {
        uniqueRows.push(pick(row, nonNumericColumns));
        seen.add(uniqueKey);
      }

      numericColumns.forEach((col) => {
        if (col === c?.name) {
          const key = nonNumericColumns.map((k) => row[k]).join(",");
          sumResults[col] = sumResults[col] || {};
          sumResults[col][key] =
            (sumResults[col][key] || 0) + (Number(row[col]) || 0);

          // Update totals
          totals[col] += Number(row[col]) || 0;
        }
      });
    });
  });
  // console.log(uniqueRows);

  return { uniqueRows, sumResults, totals };
}

// Utility function to pick specific keys from an object
function pick(obj, keys) {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {});
}

// Helper function to categorize columns
export function categorizeColumns(columns, data) {
  const nonNumericColumns = [];
  const numericColumns = [];
  columns?.forEach((col) => {
    const dataTypes = data[col?.table]?.dataTypes;
    if (dataTypes[col?.name]?.[0] !== "number" || col?.name === "ID") {
      nonNumericColumns.push(col?.name);
    } else {
      numericColumns.push(col?.name);
    }
  });

  return { nonNumericColumns, numericColumns };
}

// Helper function to create a "Total" row
export function createTotalRow(totals, numericColumns, nonNumericColumns) {
  const totalRow = {};

  // Add placeholders for non-numeric columns
  nonNumericColumns.forEach((col, idx) => {
    totalRow[col] = idx === 0 ? "Total" : ""; // Use "Total" or empty string as needed
  });

  // Add totals for numeric columns
  numericColumns.forEach((col) => {
    totalRow[col] = totals[col];
  });

  return totalRow;
}

// Helper function to merge sums with rows
export function mergeSumsWithRows(
  uniqueRows,
  sumResults,
  numericColumns,
  nonNumericColumns
) {
  return uniqueRows.map((row) => {
    const key = nonNumericColumns.map((k) => row[k]).join(",");
    const sums = numericColumns.reduce((acc, col) => {
      acc[col] = sumResults[col]?.[key] || 0;
      return acc;
    }, {});

    return { ...row, ...sums };
  });
}

export const manyToMany = (data, item, nonNumericColumns, numericColumns) => {
  // Step 2: Process data to find unique rows and aggregate sums
  const { uniqueRows, sumResults, totals } = processRows(
    data,
    item.columns,
    // data[item?.columns?.table].data,
    nonNumericColumns,
    numericColumns
  );

  // Step 3: Merge aggregated sums with unique rows
  const resultArray = mergeSumsWithRows(
    uniqueRows,
    sumResults,
    numericColumns,
    nonNumericColumns
  );

  // Step 4: Add a "Total" row
  const totalRow = createTotalRow(totals, numericColumns, nonNumericColumns);

  return { resultArray, totalRow, sumResults };
};
