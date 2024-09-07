import React, { useEffect, useState } from "react";

import { useNavContext } from "../../../contexts/NavContext";

const useBd = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  const { usersData } = useNavContext();

  useEffect(() => {
    if (data) {
      let eqs = [];
      usersData[0].roles?.Editor?.Equipments.concat(
        usersData[0].roles?.User?.Equipments
      ).map((eq) => {
        if (
          eq.name.startsWith("MC") ||
          eq.name.startsWith("BC") ||
          eq.name.startsWith("BG")
        )
          eqs.push(eq.name);
      });

      const filterResult = data.filter(
        (d) =>
          (d.Equipment_Type === "Trench_Cutting_Machine" ||
            d.Equipment_Type === "Drilling_Machine") &&
          d.Breakdown_Type !== "Periodic Maintenance" &&
          d.Breakdown_Type !== "Cutting gearboxes and Mud pump Maintenance" &&
          eqs.includes(d.Equipment)
      );
      let resultData = [];
      let result = {};
      let resultArray = [];
      filterResult.sort((a, b) => a["Date_Time"] - b["Date_Time"]);
      resultData.push(...filterResult);

      resultData.forEach((v) => {
        result[v?.Breakdown_Type] = (result[v?.Breakdown_Type] || 0) + 1;
      });

      Object.keys(result).map((key, index) => {
        resultArray.push({
          id: index,
          label: key,
          name: key,
          value: result[key],
        });
      });

      resultArray.sort((a, b) => b.value - a.value);
      resultArray = resultArray.slice(0, 10);
      setChartData(resultArray);
    }
  }, [data]);
  return { chartData };
};

export default useBd;
