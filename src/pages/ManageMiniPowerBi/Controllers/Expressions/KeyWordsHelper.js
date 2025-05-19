export const keywords = [
  "IF",
  "IFS",
  "SUM",
  "SUMIF",
  "SUMIFS",
  "CALC",
  "CALCIF",
  "CALCIFS",
  "EXPANDDATES",
  "EXPANDDATETIME",
  "VLOOKUP",
  "Blank()",
  "Today()",
  "YEAR",
  "DATE",
];

export const getHelperText = (text) => {
  switch (text) {
    case "IF":
      return `IF(Condition, Value if true, Value if False)`;
    case "IFS":
      return `IFS(Conditions, Value if true, Value if False)`;
    case "SUM":
      return `SUM(number1 or [column1], number2 or [column2],...)`;
    case "SUMIF":
      return `SUM(number1 or [column1], number2 or [column2],...,Condition)`;
    case "SUMIFS":
      return `SUM(number1 or [column1], number2 or [column2],...,Conditions)`;
    case "CALC":
      return `CALC(Expression)`;
    case "CALCIF":
      return `CALCIF(Condition, Expression if true, Expression if False)`;
    case "CALCIFS":
      return `CALCIFS(Conditions, Expression if true, Expression if False)`;
    case "YEAR":
      return `YEAR(Date)`;
    default:
      return `Write Valid expression`;
  }
};

//  const keywordReplacer = (text) => {
//   return
//  }

export const getHelperFunction1 = (input, tablesData) => {
  const smartSplit = (str) => {
    let result = [];
    let current = "";
    let depth = 0;

    for (let i = 0; i < str.length; i++) {
      const char = str[i];

      if (char === "(") {
        depth++;
        current += char;
      } else if (char === ")") {
        depth--;
        current += char;
      } else if (char === "," && depth === 0) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    if (current) {
      result.push(current.trim());
    }
    return result;
  };

  const parseExpression = (expr) => {
    expr = expr?.trim();

    if (expr?.startsWith("IF(")) {
      const inside = expr?.slice(3, -1); // remove IF( and final )
      const parts = smartSplit(inside);

      if (parts.length !== 3) {
        throw new Error(
          `Invalid IF expression: Expected 3 parts, got ${parts.length}`
        );
      }

      const rawCondition = parts[0];
      const valueIfTrue = parseExpression(parts[1]);
      const valueIfFalse = parseExpression(parts[2]);

      // Break condition into operands and operator, e.g. A > B
      const binaryMatch = rawCondition.match(/(.+?)([<>=!]=?|===|!==)(.+)/);

      let condition;
      if (binaryMatch) {
        const left = parseExpression(binaryMatch[1].trim());
        const op = binaryMatch[2].trim();
        const right = parseExpression(binaryMatch[3].trim());
        condition = `${left} ${op} ${right}`;
      } else {
        condition = parseExpression(rawCondition);
      }

      return `((${condition}) ? (${valueIfTrue}) : (${valueIfFalse}))`;
    } else if (expr?.startsWith("IFS(")) {
      const inside = expr?.slice(4, -1); // remove IFS( and final )
      const parts = smartSplit(inside);

      if (parts.length !== 3) {
        throw new Error(
          `Invalid IFS expression: Expected 3 parts, got ${parts.length}`
        );
      }

      const rawCondition = parts[0];
      const valueIfTrue = parseExpression(parts[1]);
      const valueIfFalse = parseExpression(parts[2]);

      // Split condition on * (AND) and + (OR) while respecting parentheses
      const logicalSplit = (condition) => {
        const result = [];
        let current = "";
        let depth = 0;
        for (let i = 0; i < condition.length; i++) {
          const char = condition[i];
          if (char === "(") depth++;
          if (char === ")") depth--;
          if ((char === "*" || char === "+") && depth === 0) {
            result.push(current.trim());
            result.push(char); // preserve operator
            current = "";
          } else {
            current += char;
          }
        }
        if (current) result.push(current.trim());
        return result;
      };

      const conditionParts = logicalSplit(rawCondition);

      const parsedConditions = [];
      for (let i = 0; i < conditionParts.length; i++) {
        const part = conditionParts[i];
        if (part === "*") {
          parsedConditions.push("&&");
        } else if (part === "+") {
          parsedConditions.push("||");
        } else {
          // Handle binary operators inside each sub-condition
          const match = part.match(/(.+?)([<>=!]=?|===|!==)(.+)/);
          if (match) {
            const left = parseExpression(match[1].trim());
            const op = match[2].trim().replace(/^=$/, "==="); // convert = to ===
            const right = parseExpression(match[3].trim());
            parsedConditions.push(`(${left} ${op} ${right})`);
          } else {
            parsedConditions.push(parseExpression(part));
          }
        }
      }

      const condition = parsedConditions.join(" ");
      return `((${condition}) ? (${valueIfTrue}) : (${valueIfFalse}))`;
    } else if (expr?.startsWith("SUM(")) {
      const inside = expr?.slice(4, -1); // remove SUM( and final )
      const parts = smartSplit(inside);

      const parsedParts = parts.map((part) => parseExpression(part));

      return `(${parsedParts.join(" + ")})`;
    } else if (expr?.startsWith("SUMIF(")) {
      const inside = expr?.slice(6, -1);
      const parts = smartSplit(inside);
      const condition = parts
        .pop()
        .replace(/=/g, "===")
        .replace(/Blank\(\)/g, "null")
        .replace(/Today\(\)/g, "new window.Date().toISOString()");
      const sum = parts.map((p) => parseExpression(p)).join(" + ");
      return `((${condition}) ? (${sum}) : (0))`;
    } else if (expr?.startsWith("SUMIFS(")) {
      const inside = expr?.slice(7, -1);
      const parts = smartSplit(inside);
      const condition = parts
        .pop()
        .replace(/\*/g, "&&")
        .replace(/\+/g, "||")
        .replace(/=/g, "===")
        .replace(/Blank\(\)/g, "null")
        .replace(/Today\(\)/g, "new window.Date().toISOString()");
      const sum = parts.map((p) => parseExpression(p)).join(" + ");
      return `((${condition}) ? (${sum}) : (0))`;
    } else if (expr?.startsWith("CALC(")) {
      const inside = expr?.slice(5, -1);
      return `(${parseExpression(inside)})`;
    } else if (expr?.startsWith("CALCIF(")) {
      const inside = expr?.slice(7, -1);
      const parts = smartSplit(inside);
      if (parts.length !== 3) throw new Error(`Invalid CALCIF expression`);
      const condition = parts[0]
        .replace(/\*/g, "&&")
        .replace(/\+/g, "||")
        .replace(/=/g, "===")
        .replace(/Blank\(\)/g, "null")
        .replace(/Today\(\)/g, "new window.Date().toISOString()");
      return `((${condition}) ? (${parts[1]}) : (${parts[2]}))`;
    } else if (expr?.startsWith("CALCIFS(")) {
      const inside = expr?.slice(8, -1);
      const parts = smartSplit(inside);
      if (parts.length !== 3) throw new Error(`Invalid CALCIFS expression`);
      const condition = parts[0]
        .replace(/\*/g, "&&")
        .replace(/\+/g, "||")
        .replace(/=/g, "===")
        .replace(/Blank\(\)/g, "null")
        .replace(/Today\(\)/g, "new window.Date().toISOString()");
      return `((${condition}) ? (${parts[1]}) : (${parts[2]}))`;
    } else if (expr?.startsWith("YEAR(")) {
      const inside = expr?.slice(5, -1);
      return `((${inside} !== null) ? (new window.Date(${inside}).getFullYear()) : (new window.Date().getFullYear()))`;
    } else if (expr?.startsWith("DATE(")) {
      const inside = expr?.slice(5, -1).trim();
      return `((${inside} !== null) ? (new window.Date(${parseExpression(
        inside
      )})) : (new window.Date()))`;
    } else if (expr?.startsWith("MONTH(")) {
      const inside = expr?.slice(6, -1);
      return `((${inside} !== null) ? (new window.Date(${inside}).getMonth() + 1) : (new window.Date().getMonth() + 1))`;
    } else if (expr?.startsWith("EXPANDDATES(")) {
      const inside = expr.slice(12, -1); // remove EXPANDDATES( and final )
      const parts = smartSplit(inside);
      if (parts.length !== 2) throw new Error(`Invalid EXPANDDATES expression`);

      const from = parts[0];
      const to = parts[1];

      return `(function() {
    const start = new Date(${from});
    const end = new Date(${to});
    const dates = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(d.toISOString().split('T')[0] );
    }
    return dates;
  })()`;
    } else if (expr?.startsWith("EXPANDAVPLAN(")) {
      return `(function() {
      const dates = [];
      tablesData?.["Availability_Plan"]?.data?.flatMap((row) => { 
        const start = new Date(row?.DateFrom);
        const end = new Date(row?.DateTo);
        const location = row?.Location;
        const valueMap = {Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday};
        

        const eqsLocData = (tablesData?.["Equipments_Location"]?.data || []).filter(
          item =>
            item?.Location === location &&
            (item?.Equipment_Type === "Trench_Cutting_Machine" || item?.Equipment_Type === "Drilling_Machine")
        );

        const maintData = (tablesData?.["Maintenance"]?.data || []).filter(
          item => item?.Location === location
        );

        function getUTCDateStr(dt) {
          return dt.getUTCFullYear() + "-" +
                String(dt.getUTCMonth() + 1).padStart(2, "0") + "-" +
                String(dt.getUTCDate()).padStart(2, "0");
        }

        function getStartOfUTCDate(date) {
          return new Date(Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate()
          ));
        }

        function getEndOfUTCDate(date) {
          return new Date(Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            23, 59, 59, 999
          ));
        }

        // Main loop over each UTC date from start to end
        for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
          const dateStr = getUTCDateStr(d);
          const dayName = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
                          .toLocaleDateString("en-US", { weekday: "long" });
          const totalTimeHours = row[dayName] ?? 0;

          const eqsLocFiltered = eqsLocData.filter(item => {
            const startDate = new Date(item?.Start_Date);
            const endDate = item?.End_Date ? new Date(item?.End_Date) : new Date();
            return d >= startDate && d < endDate;
          });

          const dateFilteredMaint = maintData.filter(el => {
            const startFrom = getUTCDateStr(new Date(el?.Problem_start_From));
            const endTo = getUTCDateStr(new Date(el?.Problem_End_To));
            return startFrom <= dateStr && endTo >= dateStr;
          });

          eqsLocFiltered.forEach((item) => {
            const equipment = item?.Equipment;
            const relatedMaint = dateFilteredMaint.filter(el => el?.Equipment === equipment);

            let breakdowns = 0;
            let perMaint = 0;

            for (const el of relatedMaint) {
              const problemStart = new Date(el?.Problem_start_From);
              const problemEnd = new Date(el?.Problem_End_To);

              let currentDate = getStartOfUTCDate(new Date(problemStart));

              while (currentDate <= problemEnd) {
                const nextDay = new Date(currentDate);
                nextDay.setUTCDate(nextDay.getUTCDate() + 1);

                const overlapStart = problemStart > currentDate ? problemStart : currentDate;
                const overlapEnd = problemEnd < nextDay ? problemEnd : nextDay;

                if (overlapStart < overlapEnd) {
                  const minutes = Math.max(0, (overlapEnd - overlapStart) / (1000 * 60));
                  const curDateStr = getUTCDateStr(overlapStart);

                  if (curDateStr === dateStr) {
                    if (el?.Breakdown_Type === 'Periodic Maintenance') {
                      perMaint += minutes;
                    } else {
                      breakdowns += minutes;
                    }
                  }
                }

                currentDate = nextDay;
              }
            }

            const maxMins = totalTimeHours;
            breakdowns = Math.min(breakdowns, maxMins);
            perMaint = Math.min(perMaint, maxMins);

            const AvailableTime = maxMins - breakdowns - perMaint;
            const MaintAvailability = (maxMins - perMaint) !== 0
              ? AvailableTime / (maxMins - perMaint)
              : 0;
            const Month = new Date(dateStr).getFullYear() + "-" + (Number(new Date(dateStr).getMonth()) + 1)

            dates.push({
              Date: dateStr,
              Location: location,
              TotalTime: totalTimeHours,
              Equipment: equipment,
              Breakdown_Time: breakdowns ,
              Periodic_Maintenance: perMaint ,
              AvailableTime: AvailableTime ,
              MaintAvailability: MaintAvailability,
              Month: Month
            });
          });
        }
      })
    

    return dates;
  })()`;
    } else if (expr?.startsWith("EXPANDMAINTSTOCKS(")) {
      return `(function() {
    const spareParts = [];
    const history = {};
    const allData = {};
    const LeadTime = 1;

    let targetData = tablesData?.["Maintenance"]?.data?.filter(item => 
      new Date(item?.Date_Time) >= new Date("2022-10-17")
    ).sort((a, b) => 
      new Date(a?.Date_Time) - new Date(b?.Date_Time)
    );

    targetData?.forEach(row => {
      const rowItems = row?.Spare_part?.split(",") || [];

      rowItems.forEach(item => {
        const partDetails = item.split("(");
        const rowSparePart = partDetails?.[0]?.trim();
        const contentInside = partDetails?.[1]?.split(")") || [];
        const rowQuantity = parseFloat(contentInside?.[0]?.trim() || "0");
        const rowDesc = contentInside?.[1]?.trim() || "";

        const equipment = row?.Equipment;
        const lastWH = history?.[rowSparePart]?.[equipment]?.Last_WH || 0;
        const lastDate = history?.[rowSparePart]?.[equipment]?.LastDate_Changed || null;
        const hours = lastWH ? Number(row?.Working_Hours) - Number(lastWH) : 0;

        const TotalEqWH = Number(history?.[rowSparePart]?.[equipment]?.Total_Eq_WH || 0) + hours;
        const TotalWH = Number(allData?.[rowSparePart]?.Total_WH || 0) + hours;
        const TotalQ = hours > 0 ? Number(allData?.[rowSparePart]?.Total_Quantity || 0) + rowQuantity : Number(allData?.[rowSparePart]?.Total_Quantity || 0);

        const AvCons = TotalWH > 0 ? ((TotalQ / TotalWH) * 24 * 30).toFixed(2) : 0;
        const currentCons = lastDate ? hours > 0 ? (rowQuantity / hours) : 20 : 0;

        const MaxCons = Math.max(currentCons, allData?.[rowSparePart]?.Max_Consumption || 0, TotalWH > 0 ? (TotalQ / TotalWH) : 0);
        const MinQuantity = Math.ceil(AvCons * LeadTime);
        const MaxQuantity = Math.ceil(MaxCons * 24 * 30 * LeadTime);
        const Month = new Date(row?.Date_Time).getFullYear() + "-" + (Number(new Date(row?.Date_Time).getMonth()) + 1);
        const Year = new Date(row?.Date_Time).getFullYear();

        spareParts.push({
          Date: row?.Date_Time,
          Location: row?.Location,
          Equipment_Type: row?.Equipment_Type,
          Equipment_Model: row?.Equipment_Model,
          Equipment: equipment,
          sparePart_Code: rowSparePart,
          sparePart_Quantity: rowQuantity,
          Description: rowDesc,
          Working_Hours: row?.Working_Hours,
          Last_WH: lastWH,
          LastDate_Changed: lastDate,
          Hours: hours,
          AverageConsumption: AvCons,
          MaxConsumption: Number(MaxCons * 24 * 30)?.toFixed(2),
          MinQuantity,
          MaxQuantity,
          Month,
          Year
        });

        if (rowSparePart) {
          history[rowSparePart] = history[rowSparePart] || {};
          allData[rowSparePart] = {
            Total_Quantity: TotalQ,
            Max_Consumption: MaxCons,
            Total_WH: TotalWH,
          };
          history[rowSparePart][equipment] = {
            Last_WH: row?.Working_Hours,
            LastDate_Changed: row?.Date_Time,
            Total_Eq_WH: TotalEqWH,
          };
        }
      });
    });

    return spareParts;
  })()`;
    } else if (expr?.startsWith("EXPANDDATETIME(")) {
      const inside = expr.slice(15, -1); // remove EXPANDDATETIME( and final )
      const parts = smartSplit(inside);
      if (parts.length !== 2)
        throw new Error(`Invalid EXPANDDATETIME expression`);

      const startExpr = parts[0];
      const endExpr = parts[1];

      return `(function() {
    const start = new Date(${startExpr});
    const end = new Date(${endExpr});
    const result = [];
    const current = new Date(start);

    while (current < end) {
      const dateKey = current.toISOString().split("T")[0];
      const endOfDay = new Date(dateKey + "T23:59:59.999Z");
      const next = new Date(Math.min(end.getTime(), endOfDay.getTime()));
      const hours = (next - current) / (1000 * 60 * 60);
      const mins = hours * 60

      result.push({ date: dateKey, hours: parseFloat(hours.toFixed(2)), mins: parseFloat(hours.toFixed(0)) });
      current.setUTCDate(current.getUTCDate() + 1);
      current.setUTCHours(0, 0, 0, 0);
    }
    return result;
  })()`;
    } else if (expr?.startsWith("VLOOKUP(")) {
      const inside = expr.slice(8, -1); // Remove 'VLOOKUP(' and ')'
      const parts = smartSplit(inside);
      if (parts.length !== 3) throw new Error(`Invalid VLOOKUP expression`);

      const rawCondition = parts[0];
      const tableName = parts[1].trim();
      const returnKey = parts[2].replace(/['"]/g, "");

      // Utility function to split the condition by logical operators
      const logicalSplit = (condition) => {
        const result = [];
        let current = "";
        let depth = 0;
        for (let i = 0; i < condition.length; i++) {
          const char = condition[i];
          if (char === "(") depth++;
          if (char === ")") depth--;
          if ((char === "*" || char === "+") && depth === 0) {
            result.push(current.trim());
            result.push(char); // Keep logical operator
            current = "";
          } else {
            current += char;
          }
        }
        if (current) result.push(current.trim());
        return result;
      };

      // Split the condition by logical operators ('+' and '*')
      const conditionParts = logicalSplit(rawCondition);

      const parsedConditions = [];
      for (let i = 0; i < conditionParts.length; i++) {
        const part = conditionParts[i];
        if (part === "*") {
          parsedConditions.push("&&");
        } else if (part === "+") {
          parsedConditions.push("||");
        } else {
          // Remove outer parentheses (if any)
          const conditionWithoutParens = part.replace(/^\((.*)\)$/, "$1");

          // Handle binary operators within each condition
          const match = conditionWithoutParens.match(
            /(.+?)([<>=!]=?|===|!==)(.+)/
          );
          if (match) {
            const leftRaw = match[1].trim();
            const op = match[2].trim().replace(/^=$/, "===");
            const rightRaw = match[3].trim();

            const left = parseExpression(
              leftRaw.startsWith("DATE(") || leftRaw.startsWith("Today(")
                ? leftRaw
                : `row[${JSON.stringify(leftRaw)}]`
            );
            const right = parseExpression(rightRaw);

            parsedConditions.push(`(${left} ${op} ${right})`);
          } else {
            parsedConditions.push(
              parseExpression(`row[${JSON.stringify(conditionWithoutParens)}]`)
            );
          }
        }
      }

      // Join the parsed conditions with logical operators
      const finalCondition = parsedConditions.join(" ");

      return `(function() {
    const rows = (tablesData?.["${tableName}"]?.data || []);
    const matches = rows.filter(row => ${finalCondition});   
    if (matches.length === 0) return null;
    const sample = matches[0]["${returnKey}"];
    if (typeof sample === "number") {
      return matches.reduce((sum, row) => sum + (row["${returnKey}"] || 0), 0);
    }
    return sample;
  })()`;
    } else {
      return expr
        ?.replace(/=/g, "===")
        .replace(/Blank\(\)/g, "null")
        .replace(/Today\(\)/g, "new window.Date().toISOString()");
    }
  };

  return `return ${parseExpression(input)};`;
};

export const getHelperFunction = (input, sanitizedKeys) => {
  const key = input?.split("(")[0];
  if (key === "IF") {
    const openParen = input.indexOf("(");
    const closeParen = input.lastIndexOf(")");

    if (openParen === -1 || closeParen === -1) {
      console.log("Input string is not in the correct format");
    }

    const content = input.substring(openParen + 1, closeParen);

    const parts = content.split(",");

    if (parts.length !== 3) {
      console.log(
        "Invalid input format. Expected three arguments separated by commas."
      );
    }

    const condition = parts[0]
      .trim()
      .split("=")
      .join("===")
      .split("Blank()")
      .join("null")
      .split("Today()")
      .join("new window.Date().toISOString()");
    const valueIfTrue = parts[1]
      .trim()
      .split("=")
      .join("===")
      .split("Blank()")
      .join("null")
      .split("Today()")
      .join("new window.Date().toISOString()");
    const valueIfFalse = parts[2]
      .trim()
      .split("=")
      .join("===")
      .split("Blank()")
      .join("null")
      .split("Today()")
      .join("new window.Date().toISOString()");

    return `if (${condition}) {\n  return ${valueIfTrue};\n} else {\n  return ${valueIfFalse};\n}`;
  } else if (key === "IFS") {
    const openParen = input.indexOf("(");
    const closeParen = input.lastIndexOf(")");

    if (openParen === -1 || closeParen === -1) {
      console.log("Input string is not in the correct format");
    }

    const content = input.substring(openParen + 1, closeParen);

    const parts = content.split(",");

    if (parts.length !== 3) {
      console.log(
        "Invalid input format. Expected three arguments separated by commas."
      );
    }

    const condition = parts[0]
      .trim()
      .split("*")
      .join("&&")
      .split("+")
      .join("||")
      .split("=")
      .join("===")
      .split("Blank()")
      .join("null")
      .split("Today()")
      .join("new window.Date().toISOString()");
    const valueIfTrue = parts[1]
      .trim()
      .split("=")
      .join("===")
      .split("Blank()")
      .join("null")
      .split("Today()")
      .join("new window.Date().toISOString()");
    const valueIfFalse = parts[2]
      .trim()
      .split("=")
      .join("===")
      .split("Blank()")
      .join("null")
      .split("Today()")
      .join("new window.Date().toISOString()");

    return `if (${condition}) {\n  return ${valueIfTrue};\n} else {\n  return ${valueIfFalse};\n}`;
  } else if (key === "SUM") {
    const openParen = input.indexOf("(");
    const closeParen = input.lastIndexOf(")");

    if (openParen === -1 || closeParen === -1) {
      console.log("Input string is not in the correct format");
    }

    const content = input.substring(openParen + 1, closeParen);

    const parts = content.split(",");

    let sum = ``;
    const parsedParts = parts.map((part) => getHelperFunction(part));

    return `(${parsedParts.join(" + ")})`;
    // parts.map((item) => {
    //   const newItem = item
    //     .split("Blank()")
    //     .join("null")
    //     .split("Today()")
    //     .join("new window.Date().toISOString()");
    //   if (
    //     newItem.includes("(") &&
    //     newItem.includes(")") &&
    //     !newItem.includes("()")
    //   ) {
    //     getHelperFunction(newItem, sanitizedKeys)
    //   } else {
    //     sum = sum === `` ? `${newItem}` : `${sum} + ${newItem}`;
    //   }
    // });

    // return `return ${sum}`;
  } else if (key === "SUMIF") {
    const openParen = input.indexOf("(");
    const closeParen = input.lastIndexOf(")");

    if (openParen === -1 || closeParen === -1) {
      console.log("Input string is not in the correct format");
    }

    const content = input.substring(openParen + 1, closeParen);

    const parts = content.split(",");

    const condition = parts[parts.length - 1]
      .trim()
      .split("=")
      .join("===")
      .split("Blank()")
      .join("null")
      .split("Today()")
      .join("new window.Date().toISOString()");

    let sum = ``;
    parts.map((item, idx) => {
      if (idx !== parts.length - 1) {
        sum = sum === `` ? `${item}` : `${sum} + ${item}`;
      }
    });

    return `if (${condition}) {\n  return ${sum};\n} else {\n  return 0;\n}`;
  } else if (key === "SUMIFS") {
    const openParen = input.indexOf("(");
    const closeParen = input.lastIndexOf(")");

    if (openParen === -1 || closeParen === -1) {
      console.log("Input string is not in the correct format");
    }

    const content = input.substring(openParen + 1, closeParen);

    const parts = content.split(",");

    const condition = parts[parts.length - 1]
      .trim()
      .split("*")
      .join("&&")
      .split("+")
      .join("||")
      .split("=")
      .join("===")
      .split("Blank()")
      .join("null")
      .split("Today()")
      .join("new window.Date().toISOString()");

    let sum = ``;
    parts.map((item, idx) => {
      if (idx !== parts.length - 1) {
        sum = sum === `` ? `${item}` : `${sum} + ${item}`;
      }
    });

    return `if (${condition}) {\n  return ${sum};\n} else {\n  return 0;\n}`;
  } else if (key === "CALC") {
    const openParen = input.indexOf("(");
    const closeParen = input.lastIndexOf(")");

    if (openParen === -1 || closeParen === -1) {
      console.log("Input string is not in the correct format");
    }

    const content = input.substring(openParen + 1, closeParen).trim();

    return `return ${content}`;
  } else if (key === "CALCIF") {
    const openParen = input.indexOf("(");
    const closeParen = input.lastIndexOf(")");

    if (openParen === -1 || closeParen === -1) {
      console.log("Input string is not in the correct format");
    }

    const content = input.substring(openParen + 1, closeParen);

    const parts = content.split(",");

    const condition = parts[0]
      .trim()
      .split("*")
      .join("&&")
      .split("+")
      .join("||")
      .split("=")
      .join("===")
      .split("Blank()")
      .join("null")
      .split("Today()")
      .join("new window.Date().toISOString()");
    const valueIfTrue = parts[1]
      .trim()
      .split("*")
      .join("&&")
      .split("+")
      .join("||")
      .split("=")
      .join("===")
      .split("Blank()")
      .join("null")
      .split("Today()")
      .join("new window.Date().toISOString()");
    const valueIfFalse = parts[2]
      .trim()
      .split("*")
      .join("&&")
      .split("+")
      .join("||")
      .split("=")
      .join("===")
      .split("Blank()")
      .join("null")
      .split("Today()")
      .join("new window.Date().toISOString()");

    return `if (${condition}) {\n  return ${valueIfTrue};\n} else {\n  return ${valueIfFalse};\n}`;
  } else if (key === "CALCIFS") {
    const openParen = input.indexOf("(");
    const closeParen = input.lastIndexOf(")");

    if (openParen === -1 || closeParen === -1) {
      console.log("Input string is not in the correct format");
    }

    const content = input.substring(openParen + 1, closeParen);

    const parts = content.split(",");

    const condition = parts[0]
      .trim()
      .split("*")
      .join("&&")
      .split("+")
      .join("||")
      .split("=")
      .join("===")
      .split("Blank()")
      .join("null")
      .split("Today()")
      .join("new window.Date().toISOString()");
    const valueIfTrue = parts[1]
      .trim()
      .split("*")
      .join("&&")
      .split("+")
      .join("||")
      .split("=")
      .join("===")
      .split("Blank()")
      .join("null")
      .split("Today()")
      .join("new window.Date().toISOString()");
    const valueIfFalse = parts[2]
      .trim()
      .split("*")
      .join("&&")
      .split("+")
      .join("||")
      .split("=")
      .join("===")
      .split("Blank()")
      .join("null")
      .split("Today()")
      .join("new window.Date().toISOString()");

    return `if (${condition}) {\n  return ${valueIfTrue};\n} else {\n  return ${valueIfFalse};\n}`;
  } else if (key === "YEAR") {
    const openParen = input.indexOf("(");
    const closeParen = input.lastIndexOf(")");

    if (openParen === -1 || closeParen === -1) {
      console.log("Input string is not in the correct format");
    }

    const content = input.substring(openParen + 1, closeParen);

    return `if (${content} !== null) {\n return new window.Date(${content}).getFullYear();\n} else {\n return new window.Date().getFullYear();\n}`;
  } else if (key === "MONTH") {
    const openParen = input.indexOf("(");
    const closeParen = input.lastIndexOf(")");

    if (openParen === -1 || closeParen === -1) {
      console.log("Input string is not in the correct format");
    }

    const content = input.substring(openParen + 1, closeParen);

    return `if (${content} !== null) {\n return new window.Date(${content}).getMonth() + 1;\n} else {\n return new window.Date().getMonth() + 1;\n}`;
  } else {
    return `${input}`;
  }
};

// if (End_Date === null) {
//   return new Date().toISOString();
// } else {
//   return End_Date;
// }
