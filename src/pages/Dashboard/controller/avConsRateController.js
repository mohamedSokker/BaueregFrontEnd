import React, { useEffect, useState } from "react";

const formatDate = (anyDate) => {
  const dt = new Date(anyDate);
  const year = dt.getFullYear();
  let day = dt.getDate().toString();
  let month = (Number(dt.getMonth()) + 1).toString();
  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  return `${year}-${month}-${day}`;
};

const useAvConsRate = ({ data, currentSpare }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (currentSpare && data) {
      const targetData = data?.filter(
        (item) => item.SparePart_Code === currentSpare.SparePart_Code
      );
      console.log(targetData);

      let result = [];
      targetData.map((item) => {
        result.push({
          name: formatDate(item.DateTime),
          Equipment: item.Equipment,
          Quantity: item.SparePart_Quantity,
          "Working Hours": item.Working_Hours,
          "Operational Hours": item.Hours,
          "Avreage Consumption": item?.AvaregeConsumption,
        });
      });
      setChartData(result);
    }
  }, [currentSpare]);
  return { chartData };
};

export default useAvConsRate;
