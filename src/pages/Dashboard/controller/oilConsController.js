import React, { useEffect, useState } from "react";

import { useNavContext } from "../../../contexts/NavContext";

const useOil = ({ data }) => {
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

      // const avTrenchData = data.filter(
      //   (d) =>
      //     (d?.Equipment?.startsWith("MC") ||
      //       d?.Equipment?.startsWith("BC") ||
      //       d?.Equipment?.startsWith("BG")) &&
      //     eqs.includes(d?.Equipment)
      // );
      const avTrenchData = data;

      avTrenchData.sort((a, b) => a["Date"] - b["Date"]);
      let s = 0;
      let x = [];
      let y = [];
      avTrenchData.map((d) => {
        s +=
          Number(d["TOTAL  Carter EP 150 (L)"]) +
          Number(d["TOTAL AZOLLA ZS 68 (L)"]) +
          Number(d["TOTAL Carter SH 220 (L)"]) +
          Number(d["TOTAL FLUIDMATIC D2 (L)"]) +
          Number(d["TOTAL Rubia 15 W 40 (L)"]) +
          Number(d["TOTAL AZOLLA ZS 100 (L)"]) +
          Number(d["TOTAL rubia SAE 50 (L)"]) +
          Number(d["TOTAL  TRAXIUM AXLE 7 /85W-140 (L)"]) +
          Number(d["MOBIL ™ ATF 220 (L)"]) +
          Number(d["MOBIL ™ DTE 26 (L)"]) +
          Number(d["MOBIL Delvac ™ 15W40 (L)"]) +
          Number(d["MOBILGEAR ™ 600 XP 150 (L)"]) +
          Number(d["MOBILGEAR ™ SHC 630 (L)"]);
        x.push(d["Date"]);
        y.push(
          Number(d["TOTAL  Carter EP 150 (L)"]) +
            Number(d["TOTAL AZOLLA ZS 68 (L)"]) +
            Number(d["TOTAL Carter SH 220 (L)"]) +
            Number(d["TOTAL FLUIDMATIC D2 (L)"]) +
            Number(d["TOTAL Rubia 15 W 40 (L)"]) +
            Number(d["TOTAL AZOLLA ZS 100 (L)"]) +
            Number(d["TOTAL rubia SAE 50 (L)"]) +
            Number(d["TOTAL  TRAXIUM AXLE 7 /85W-140 (L)"]) +
            Number(d["MOBIL ™ ATF 220 (L)"]) +
            Number(d["MOBIL ™ DTE 26 (L)"]) +
            Number(d["MOBIL Delvac ™ 15W40 (L)"]) +
            Number(d["MOBILGEAR ™ 600 XP 150 (L)"]) +
            Number(d["MOBILGEAR ™ SHC 630 (L)"])
        );
      });
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

export default useOil;
