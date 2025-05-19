export function inferColumnType(values) {
  const types = values.map((value) => {
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    if (typeof value === "object" && value instanceof Date) return "date";

    if (!isNaN(value) && typeof value === "number") {
      return "number";
    }

    if (typeof value === "string") {
      // Check if the string is a valid date
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return "date";
      }
    }

    return typeof value;
  });

  return [...new Set(types)]; // Return unique types
}

export function getColumnTypes(data, columnName) {
  const columnValues = data.map((row) => row[columnName]);
  const types = columnValues.map((value) => getType(value));
  return [...new Set(types)]; // Return unique types
}

export function getType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (typeof value === "object" && value instanceof Date) return "date";
  return typeof value;
}

export function detectTableColumnTypes(table) {
  if (!Array.isArray(table) || table.length === 0) {
    throw new Error("Input must be a non-empty array of objects.");
  }

  // Get the keys (column names) from the first object
  const columns = Object.keys(table[0]);
  const columnTypes = {};

  // Initialize type tracking for each column
  columns.forEach((column) => {
    columnTypes[column] = new Set();
  });

  // Helper function to determine if a value is a valid date or datetime
  function isValidDateOrDatetime(value) {
    // Define regex patterns for date and datetime formats
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
    const datetimeRegex =
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})$/; // YYYY-MM-DDTHH:mm:ss or YYYY-MM-DD HH:mm:ss

    // Check if the value matches the date format
    if (typeof value === "string" && dateRegex.test(value)) {
      const date = new Date(value);
      return !isNaN(date.getTime()); // Ensure the parsed date is valid
    }

    // Check if the value matches the datetime format
    if (typeof value === "string" && datetimeRegex.test(value)) {
      const datetime = new Date(value.replace(" ", "T")); // Replace space with 'T' for ISO compatibility
      return !isNaN(datetime.getTime()); // Ensure the parsed datetime is valid
    }

    return false;
  }

  // Analyze each row to infer column types
  table.forEach((row) => {
    columns.forEach((column) => {
      const value = row[column];

      if (value === null || value === undefined) {
        columnTypes[column].add("null");
      } else if (typeof value === "number") {
        columnTypes[column].add("number");
      } else if (typeof value === "string") {
        // Check if the string is a valid number
        const numericValue = Number(value); // Attempt to parse the string as a number
        if (!isNaN(numericValue)) {
          columnTypes[column].add("number"); // Classified as number
        }
        // Check if the string is a valid date or datetime
        else if (isValidDateOrDatetime(value)) {
          if (value.includes("T") || value.includes(" ")) {
            columnTypes[column].add("datetime"); // Classified as datetime
          } else {
            columnTypes[column].add("date"); // Classified as date
          }
        } else {
          columnTypes[column].add("string");
        }
      } else if (typeof value === "boolean") {
        columnTypes[column].add("boolean");
      } else {
        columnTypes[column].add(typeof value); // Fallback for other types
      }
    });
  });

  let result = {};
  // Convert Sets to arrays for readability
  for (const column in columnTypes) {
    const types = Array.from(columnTypes[column]);
    // columnTypes[column] = Array.from(columnTypes[column]);

    if (types.length === 1) {
      result[column] = [types[0]];
    } else {
      result[column] = ["string"];
    }
  }

  return result;
}
