import React, { useEffect, useState } from "react";

import { useNavContext } from "../../../contexts/NavContext";

const useProd = ({ data }) => {
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

      const avTrenchData = data.filter(
        (d) => d["# Machine"].startsWith("BG") && eqs.includes(d["# Machine"])
      );
      avTrenchData.sort((a, b) => a["Pouring Finish"] - b["Pouring Finish"]);
      console.log(avTrenchData);
      let s = 0;
      let x = [];
      let y = [];
      avTrenchData.map((d) => {
        s += Number(d["Actual Depth"]);
        x.push(d["Pouring Finish"]);
        y.push(Number(d["Actual Depth"]));
      });
      setXData(x);
      setYData(y);
      setSum(
        s <= 1000
          ? `${s.toFixed(0)} Ml`
          : s <= 1000000
          ? `${(s / 1000).toFixed(0)} K Ml`
          : `${(s / 1000000).toFixed(0)} M Ml`
      );
    }
  }, [data]);
  return { sum, xData, yData };
};

export default useProd;
