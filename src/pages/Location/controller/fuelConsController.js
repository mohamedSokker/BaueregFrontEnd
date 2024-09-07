import React, { useEffect, useState } from "react";

import { useNavContext } from "../../../contexts/NavContext";

const useFuel = ({ data }) => {
  const [sum, setSum] = useState(0);
  const [xData, setXData] = useState(null);
  const [yData, setYData] = useState(null);

  const { usersData } = useNavContext();

  useEffect(() => {
    if (data) {
      let eqs = [];
      console.log(data);
      usersData[0].roles?.Editor?.Equipments.concat(
        usersData[0].roles?.User?.Equipments
      ).map((eq) => {
        // if (eq.name.startsWith("MC") || eq.name.startsWith("BC"))
        eqs.push(eq.name);
      });

      const avTrenchData = data;
      console.log(avTrenchData);
      // .filter(
      //   (d) =>
      //     (d?.Equipment?.startsWith("MC") ||
      //       d?.Equipment?.startsWith("BC") ||
      //       d?.Equipment?.startsWith("BG")) &&
      //     eqs.includes(d.Equipment)
      // );

      avTrenchData.sort((a, b) => a["Date "] - b["Date "]);
      let s = 0;
      let x = [];
      let y = [];
      avTrenchData.map((d) => {
        s += Number(d["Fuel Consumption Quantity (Liter)"]);
        x.push(d["Date "]);
        y.push(Number(d["Fuel Consumption Quantity (Liter)"]));
      });
      console.log(s);
      setXData(x);
      setYData(y);
      setSum(
        s <= 1000
          ? `${s.toFixed(1)} L`
          : s <= 1000000
          ? `${(s / 1000).toFixed(1)} K L`
          : `${(s / 1000000).toFixed(1)} M L`
      );
    }
  }, [data]);
  return { sum, xData, yData };
};

export default useFuel;
