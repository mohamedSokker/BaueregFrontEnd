import React, { useEffect, useState } from "react";
import { DataFormater } from "../Services/FormatNumbers";
import useCardsData from "../Controllers/Graphs/cardsData";

const Card = ({ tableData, item, data, tablesData }) => {
  const {
    Y_Axis,
    tooltips,
    expressions,
    text,
    operationType,
    Format,
    headerFontSize,
    headerFontWeight,
    dataFontSize,
    dataFontWeight,
  } = item;

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const { chartData } = useCardsData({ tableData, item, data, tablesData });
  // console.log(chartData);

  // const getValue = (name) => payload?.[0]?.payload?.[name];

  const formatValue = (val) => {
    // const val = getValue(name);
    return !isNaN(val) ? formatter.format(val) : val;
  };

  // const [result, setResult] = useState(0);
  // console.log(result);

  // const addExpressionsToData = (data, expressions) => {
  //   return data.map((row) => {
  //     const newRow = { ...row };

  //     expressions?.forEach((expr) => {
  //       const { name, firstArg, secondArg, opType } = expr;
  //       let val1 = firstArg;
  //       let val2 = secondArg;
  //       const numericValue1 = Number(val1);
  //       const numericValue2 = Number(val2);

  //       if (!isNaN(numericValue1)) {
  //         val1 = numericValue1;
  //       } else {
  //         val1 = parseFloat(row[firstArg]);
  //       }

  //       if (!isNaN(numericValue2)) {
  //         val2 = numericValue2;
  //       } else {
  //         val2 = parseFloat(row[secondArg]);
  //       }

  //       if (isNaN(val1) || isNaN(val2)) return;

  //       switch (opType) {
  //         case "Division":
  //           newRow[name] = val2 !== 0 ? val1 / val2 : null;
  //           break;
  //         case "Multiply":
  //           newRow[name] = val1 * val2;
  //           break;
  //         case "Sum":
  //           newRow[name] = val1 + val2;
  //           break;
  //         case "Subtraction":
  //         default:
  //           newRow[name] = val1 - val2;
  //       }
  //     });

  //     return newRow;
  //   });
  // };

  // useEffect(() => {
  //   if (expressions?.length > 0)
  //     setResult(chartData?.[0]?.[expressions?.[0]?.name]);
  //   // let total = 0;
  //   // let resultArray = [];
  //   // if (item?.expressions?.length) {
  //   //   resultArray = addExpressionsToData(tableData, [
  //   //     ...item.expressions,
  //   //     ...item.tooltips,
  //   //     ...item.Y_Axis,
  //   //   ]);
  //   // }

  //   // console.log(resultArray, [
  //   //   ...item.expressions,
  //   //   ...item.tooltips,
  //   //   ...item.Y_Axis,
  //   // ]);

  //   // if (operationType === "Count") {
  //   //   resultArray?.map((row) => {
  //   //     total += 1;
  //   //   });
  //   // } else if (operationType === "Sum") {
  //   //   resultArray?.map((row) => {
  //   //     total += Number(row?.[expressions?.[0]?.name]);
  //   //   });
  //   // } else if (operationType === "Average") {
  //   //   let sum = 0;
  //   //   let count = 0;
  //   //   resultArray?.map((row) => {
  //   //     sum += Number(row?.[expressions?.[0]?.name]);
  //   //     count += 1;
  //   //   });
  //   //   total = Number(sum / count).toFixed(2);
  //   // } else if (operationType === "First") {
  //   //   total = resultArray?.[0]?.[expressions?.[0]?.name];
  //   //   // let target = null;
  //   //   // resultArray?.map((row) => {
  //   //   //   if (!target) {
  //   //   //     total = row?.[expressions?.[0]?.name];
  //   //   //     target = row?.[expressions?.[0]?.name];
  //   //   //   }
  //   //   // });
  //   // } else if (operationType === "Last") {
  //   //   total = resultArray?.[resultArray?.length - 1]?.[expressions?.[0]?.name];
  //   //   // resultArray?.map((row) => {
  //   //   //   total = row?.[expressions?.[0]?.name];
  //   //   // });
  //   // } else if (operationType === "Min") {
  //   //   resultArray?.map((row, i) => {
  //   //     if (i === 0) {
  //   //       total = row?.[expressions?.[0]?.name];
  //   //     } else {
  //   //       if (total > row?.[expressions?.[0]?.name]) {
  //   //         total = row?.[expressions?.[0]?.name];
  //   //       }
  //   //     }
  //   //   });
  //   // } else if (operationType === "Max") {
  //   //   resultArray?.map((row, i) => {
  //   //     if (i === 0) {
  //   //       total = row?.[expressions?.[0]?.name];
  //   //     } else {
  //   //       if (total < row?.[expressions?.[0]?.name]) {
  //   //         total = row?.[expressions?.[0]?.name];
  //   //       }
  //   //     }
  //   //   });
  //   // }
  //   // setResult(total);
  // }, [tableData, data]);
  return (
    <div className="w-full h-full flex flex-row  overflow-scroll p-1 relative">
      <div className="flex flex-col w-full justify-center items-center">
        {/* <p className="text-[14px] font-[600]">
          {text && text !== "" ? `${text}` : `${operationType} of ${column}`}
        </p> */}
        <p
          className="text-[40px] font-[800] flex justify-center items-center text-center"
          style={{ fontSize: `${dataFontSize}px`, fontWeight: dataFontWeight }}
        >
          {Format === "en-US"
            ? formatValue(chartData)
            : DataFormater(chartData)}
        </p>
        <p
          className="text-[12px] font-[600] absolute bottom-0"
          style={{
            fontSize: `${headerFontSize}px`,
            fontWeight: headerFontWeight,
          }}
        >
          {text}
          {/* {text && text !== ""
            ? `${text}`
            : `${Y_Axis?.[0]?.opType ? Y_Axis?.[0]?.opType : "Count"} of ${
                Y_Axis?.[0]?.name
              }`} */}
        </p>
      </div>
    </div>
  );
};

export default Card;
