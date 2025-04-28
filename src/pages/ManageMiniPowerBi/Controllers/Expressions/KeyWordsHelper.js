export const keywords = [
  "IF",
  "IFS",
  "SUM",
  "SUMIF",
  "SUMIFS",
  "CALC",
  "CALCIF",
  "CALCIFS",
  //   "COUNT",
  //   "COUNTA",
  //   "COUNTIF",
  //   "COUNTIFS",
  //   "AVERAGE",
  //   "AVERAGEIF",
  //   "AVERAGEIFS",
  //   "VLOOKUP",
  //   "HLOOKUP",
  //   "XLOOKUP",
  "Blank()",
  "Today()",
  "YEAR",
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
    // case "COUNT":
    //   return `COUNT('Column')`;
    // case "COUNTA":
    //   return `COUNTA('Column')`;
    // case "COUNTIF":
    //   return `COUNTIF('Column', Condition)`;
    // case "COUNTIFS":
    //   return `COUNTIFS('Column', Conditions)`;
    // case "AVERAGE":
    //   return `AVERAGE('Column')`;
    // case "AVERAGEIF":
    //   return `AVERAGEIF('Column', Condition)`;
    // case "AVERAGEIFS":
    //   return `AVERAGEIFS('Column', Conditions)`;
    // case "VLOOKUP":
    //   return `VLOOKUP('Value', Table, Col_index, IsExact)`;
    // case "HLOOKUP":
    //   return `HLOOKUP('Value', Table, Col_index, IsExact)`;
    // case "XLOOKUP":
    //   return `XLOOKUP('Value', Table, Col_index, IsExact)`;
    default:
      return `Write Valid expression`;
  }
};

//  const keywordReplacer = (text) => {
//   return
//  }

export const getHelperFunction1 = (input) => {
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

      const condition = parseExpression(parts[0]);
      const valueIfTrue = parseExpression(parts[1]);
      const valueIfFalse = parseExpression(parts[2]);

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

      const condition = rawCondition
        .replace(/\*/g, "&&")
        .replace(/\+/g, "||")
        .replace(/=/g, "===")
        .replace(/Blank\(\)/g, "null")
        .replace(/Today\(\)/g, "new window.Date().toISOString()");

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
      return `(${inside})`;
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
    } else if (expr?.startsWith("MONTH(")) {
      const inside = expr?.slice(6, -1);
      return `((${inside} !== null) ? (new window.Date(${inside}).getMonth() + 1) : (new window.Date().getMonth() + 1))`;
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
