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
        if (eq.name.startsWith("MC") || eq.name.startsWith("BC"))
          eqs.push(eq.name);
      });

      const avTrenchData = data.filter(
        (d) =>
          (d.Equipment.startsWith("MC") || d.Equipment.startsWith("BC")) &&
          eqs.includes(d.Equipment)
      );
      avTrenchData.sort((a, b) => a.Date_Time - b.Date_Time);
      let s = 0;
      let x = [];
      let y = [];
      avTrenchData.map((d) => {
        s += Number(d.Maintenance_Availability);
        x.push(d.Date_Time);
        y.push(Number(d.Maintenance_Availability));
      });
      setXData(x);
      setYData(y);
      setSum(`${(s / avTrenchData.length).toFixed(2)} %`);
    }
  }, [data]);
  return { sum, xData, yData };
};

export default useAv;
