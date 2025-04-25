import React, { useEffect, useState } from "react";
import { DataFormater } from "../Services/FormatNumbers";

const Card = ({ tableData, item, data }) => {
  const {
    Y_Axis,
    text,
    operationType,
    headerFontSize,
    headerFontWeight,
    dataFontSize,
    dataFontWeight,
  } = item;

  const [result, setResult] = useState(0);
  // console.log(Y_Axis);

  useEffect(() => {
    let total = 0;

    if (Y_Axis?.[0]?.opType === "Count") {
      tableData?.map((row) => {
        total += 1;
      });
    } else if (Y_Axis?.[0]?.opType === "Sum") {
      tableData?.map((row) => {
        total += Number(row?.[Y_Axis?.[0]?.name]);
      });
    } else if (Y_Axis?.[0]?.opType === "Average") {
      let sum = 0;
      let count = 0;
      tableData?.map((row) => {
        sum += Number(row?.[Y_Axis?.[0]?.name]);
        count += 1;
      });
      total = Number(sum / count).toFixed(2);
    } else if (Y_Axis?.[0]?.opType === "First Of Type") {
      let target = null;
      tableData?.map((row) => {
        if (!target) {
          total = row?.[Y_Axis?.[0]?.name];
          target = row?.[Y_Axis?.[0]?.name];
        }
      });
    } else if (Y_Axis?.[0]?.opType === "Last Of Type") {
      tableData?.map((row) => {
        total = row?.[Y_Axis?.[0]?.name];
      });
    } else if (Y_Axis?.[0]?.opType === "Min") {
      tableData?.map((row, i) => {
        if (i === 0) {
          total = row?.[Y_Axis?.[0]?.name];
        } else {
          if (total > row?.[Y_Axis?.[0]?.name]) {
            total = row?.[Y_Axis?.[0]?.name];
          }
        }
      });
    } else if (Y_Axis?.[0]?.opType === "Max") {
      tableData?.map((row, i) => {
        if (i === 0) {
          total = row?.[Y_Axis?.[0]?.name];
        } else {
          if (total < row?.[Y_Axis?.[0]?.name]) {
            total = row?.[Y_Axis?.[0]?.name];
          }
        }
      });
    }
    console.log(total);
    setResult(total);
  }, [tableData, data]);
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
          {DataFormater(result)}
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
