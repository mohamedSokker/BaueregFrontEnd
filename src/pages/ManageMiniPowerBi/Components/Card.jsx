import React, { useEffect, useState } from "react";

const Card = ({ tableData, item, data }) => {
  const { column, text, operationType } = item;

  const [result, setResult] = useState(0);

  useEffect(() => {
    let total = 0;

    if (operationType === "Count") {
      tableData?.map((row) => {
        total += 1;
      });
    } else if (operationType === "Sum") {
      tableData?.map((row) => {
        total += row?.[column];
      });
    } else if (operationType === "Average") {
      let sum = 0;
      let count = 0;
      tableData?.map((row) => {
        sum += row?.[column];
        count += 1;
      });
      total = Number(sum / count).toFixed(2);
    }
    setResult(total);
  }, [tableData, data]);
  return (
    <div className="w-full h-full flex flex-row  overflow-scroll p-1">
      <div className="flex flex-col w-full gap-2 justify-center items-center">
        <p className="text-[14px] font-[600]">
          {text && text !== "" ? `${text}` : `${operationType} of ${column}`}
        </p>
        <p className="text-[40px] font-[800]">
          {result > 1000000
            ? `${(result / 1000000).toFixed(1)} M`
            : result > 1000
            ? `${(result / 1000).toFixed(1)} K`
            : `${result}`}
        </p>
      </div>
    </div>
  );
};

export default Card;
