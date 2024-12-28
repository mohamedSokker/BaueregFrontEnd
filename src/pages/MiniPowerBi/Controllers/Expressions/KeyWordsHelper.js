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

export const getHelperFunction = (input, key) => {
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
      .join("new Date()");
    const valueIfTrue = parts[1]
      .trim()
      .split("=")
      .join("===")
      .split("Blank()")
      .join("null")
      .split("Today()")
      .join("new Date()");
    const valueIfFalse = parts[2]
      .trim()
      .split("=")
      .join("===")
      .split("Blank()")
      .join("null")
      .split("Today()")
      .join("new Date()");

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
      .join("new Date()");
    const valueIfTrue = parts[1]
      .trim()
      .split("=")
      .join("===")
      .split("Blank()")
      .join("null")
      .split("Today()")
      .join("new Date()");
    const valueIfFalse = parts[2]
      .trim()
      .split("=")
      .join("===")
      .split("Blank()")
      .join("null")
      .split("Today()")
      .join("new Date()");

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
    parts.map((item) => {
      sum = sum === `` ? `${item}` : `${sum} + ${item}`;
    });

    return `return ${sum}`;
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
      .join("new Date()");

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
      .join("new Date()");

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
      .join("new Date()");
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
      .join("new Date()");
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
      .join("new Date()");

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
      .join("new Date()");
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
      .join("new Date()");
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
      .join("new Date()");

    return `if (${condition}) {\n  return ${valueIfTrue};\n} else {\n  return ${valueIfFalse};\n}`;
  } else {
    return `${input}`;
  }
};
