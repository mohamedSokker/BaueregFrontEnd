import React, { useEffect, useState } from "react";

import { useNavContext } from "../../../contexts/NavContext";

const useAv = ({ data }) => {
  const [sum, setSum] = useState(0);
  const [xData, setXData] = useState(null);
  const [yData, setYData] = useState(null);

  const { usersData } = useNavContext();

  useEffect(() => {
    if (data) {
      let eqs = [];
      usersData[0].roles?.Editor?.Equipments.concat(
        usersData[0].roles?.User?.Equipments
      ).map((eq) => {
        if (eq.name.startsWith("BG")) eqs.push(eq.name);
      });

      const avDrillData = data.filter(
        (d) => d.Equipment.startsWith("BG") && eqs.includes(d.Equipment)
      );
      avDrillData.sort((a, b) => a.Date_Time - b.Date_Time);
      let s = 0;
      let x = [];
      let y = [];
      avDrillData.map((d) => {
        s += Number(d.Maintenance_Availability);
        x.push(d.Date_Time);
        y.push(Number(d.Maintenance_Availability));
      });
      setXData(x);
      setYData(y);
      setSum(`${((s / avDrillData.length) * 100).toFixed(2)} %`);
    }
  }, [data]);
  return { sum, xData, yData };
};

export default useAv;
