import React, { useEffect, useState } from "react";

const useEqCons = ({ data, currentSpare }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (currentSpare && data) {
      const targetData = data?.filter(
        (item) => item.SparePart_Code === currentSpare.SparePart_Code
      );

      let eqs = [];

      targetData.map((item) => {
        eqs.push(item.Equipment);
      });

      eqs = eqs?.filter(
        (value, index, array) => array.indexOf(value) === index
      );

      let result = [];
      let history = {};

      eqs.map((eq) => {
        let totalQuantity = 0;
        let totalWH = 0;
        history = {};
        targetData.map((item) => {
          if (eq === item.Equipment) {
            if (history[eq]) {
              totalQuantity += Number(item.SparePart_Quantity);
              totalWH += Number(item.Working_Hours) - history[eq].currentWH;
              history = {
                ...history,
                [eq]: { currentWH: item.Working_Hours },
              };
            } else {
              history = {
                ...history,
                [eq]: { currentWH: item.Working_Hours },
              };
            }
          }
        });
        result.push({
          name: eq,
          "Total Quantity": totalQuantity,
          "Total Operation Hours": totalWH,
          "Avreage Consumption":
            totalWH > 0
              ? ((Number(totalQuantity) / Number(totalWH)) * (24 * 30)).toFixed(
                  2
                )
              : 0,
        });
      });
      setChartData(result);
    }
  }, [currentSpare]);
  return { chartData };
};

export default useEqCons;
