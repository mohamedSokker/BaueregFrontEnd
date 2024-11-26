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
      console.log(avTrenchData);

      avTrenchData.sort((a, b) => a["Date"] - b["Date"]);
      let s = 0;
      let x = [];
      let y = [];
      avTrenchData.map((d) => {
        s +=
          Number(d["TOTAL_FLUIDMATIC_D2"]) +
          Number(d["TOTAL_AZOLLA_ZS_68"]) +
          Number(d["TOTAL_AZOLLA_ZS_100"]) +
          Number(d["TOTAL_Rubia_15_W_40"]) +
          Number(d["TOTAL_Rubia_SAE_50"]) +
          Number(d["TOTAL_TRAXIUM_AXLE_7_85W_140"]) +
          Number(d["TOTAL _Carter_EP_150"]) +
          Number(d["TOTAL_Carter_SH_220"]) +
          Number(d["MOBIL_ATF_220"]) +
          Number(d["MOBIL_DTE_26"]) +
          Number(d["MOBIL_Delvac_15W40"]) +
          Number(d["MOBILGEAR_600_XP_150"]) +
          Number(d["MOBILGEAR_SHC_630"]);
        x.push(d["Date"]);
        y.push(
          Number(d["TOTAL_FLUIDMATIC_D2"]) +
            Number(d["TOTAL_AZOLLA_ZS_68"]) +
            Number(d["TOTAL_AZOLLA_ZS_100"]) +
            Number(d["TOTAL_Rubia_15_W_40"]) +
            Number(d["TOTAL_Rubia_SAE_50"]) +
            Number(d["TOTAL_TRAXIUM_AXLE_7_85W_140"]) +
            Number(d["TOTAL _Carter_EP_150"]) +
            Number(d["TOTAL_Carter_SH_220"]) +
            Number(d["MOBIL_ATF_220"]) +
            Number(d["MOBIL_DTE_26"]) +
            Number(d["MOBIL_Delvac_15W40"]) +
            Number(d["MOBILGEAR_600_XP_150"]) +
            Number(d["MOBILGEAR_SHC_630"])
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
