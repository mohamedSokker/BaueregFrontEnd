import React, { useEffect, useState } from "react";

import { useNavContext } from "../../../contexts/NavContext";

const useAnalysis = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  const { usersData } = useNavContext();

  useEffect(() => {
    if (data) {
      let eqs = [];
      usersData[0]?.roles?.Editor?.Equipments?.concat(
        usersData[0]?.roles?.User?.Equipments
      )?.map((eq) => {
        // if (
        //   eq.name.startsWith("MC") ||
        //   eq.name.startsWith("BC") ||
        //   eq.name.startsWith("BG")
        // )
        eqs.push(eq.name);
      });
      let result = {};
      data?.fuelCons?.map((d) => {
        if (eqs.includes(d.Equipment)) {
          result = result[d.Equipment]?.fuelSum
            ? {
                ...result,
                [d.Equipment]: {
                  ...result[d.Equipment],
                  fuelSum: (
                    Number(result[d.Equipment]?.fuelSum) +
                    Number(d["Fuel Consumption Quantity (Liter)"])
                  )?.toFixed(0),
                },
              }
            : {
                ...result,
                [d.Equipment]: {
                  ...result[d.Equipment],
                  fuelSum: Number(
                    d["Fuel Consumption Quantity (Liter)"]
                  )?.toFixed(0),
                },
              };
        }
      });

      data?.oilCons?.map((d) => {
        if (eqs.includes(d.Equipment)) {
          result = result[d.Equipment]?.oilSum
            ? {
                ...result,
                [d.Equipment]: {
                  ...result[d.Equipment],
                  oilSum: (
                    Number(result[d.Equipment]?.oilSum) +
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
                  )?.toFixed(0),
                },
              }
            : {
                ...result,
                [d.Equipment]: {
                  ...result[d.Equipment],
                  oilSum: (
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
                  )?.toFixed(0),
                },
              };
        }
      });

      data?.prodTrench?.map((d) => {
        if (eqs.includes(d["# Machine"])) {
          result = result[d["# Machine"]]?.prod
            ? {
                ...result,
                [d["# Machine"]]: {
                  ...result[d["# Machine"]],
                  prod: (
                    Number(result[d["# Machine"]]?.prod) +
                    Number(d["Actual M2"])
                  )?.toFixed(0),
                },
              }
            : {
                ...result,
                [d["# Machine"]]: {
                  ...result[d["# Machine"]],
                  prod: Number(d["Actual M2"])?.toFixed(0),
                },
              };
        }
      });

      data?.prodDrill?.map((d) => {
        if (eqs.includes(d["# Machine"])) {
          result = result[d["# Machine"]]?.prod
            ? {
                ...result,
                [d["# Machine"]]: {
                  ...result[d["# Machine"]],
                  prod: (
                    Number(result[d["# Machine"]]?.prod) +
                    Number(d["Actual Depth"])
                  )?.toFixed(0),
                },
              }
            : {
                ...result,
                [d["# Machine"]]: {
                  ...result[d["# Machine"]],
                  prod: Number(d["Actual Depth"])?.toFixed(0),
                },
              };
        }
      });
      let resultArray = [];
      Object.keys(result).map((item) => {
        resultArray.push({
          name: item,
          fuelCons: result[item]?.fuelSum ? result[item]?.fuelSum : 0,
          oilCons: result[item]?.oilSum ? result[item]?.oilSum : 0,
          prod: result[item]?.prod ? result[item]?.prod : 0,
        });
      });
      setChartData(resultArray);
    }
  }, [data]);
  return { chartData };
};

export default useAnalysis;
