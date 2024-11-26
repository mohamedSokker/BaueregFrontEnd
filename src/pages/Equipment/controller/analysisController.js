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
                    Number(result[d.Equipment]?.fuelSum) + Number(d["Quantity"])
                  )?.toFixed(0),
                },
              }
            : {
                ...result,
                [d.Equipment]: {
                  ...result[d.Equipment],
                  fuelSum: Number(d["Quantity"])?.toFixed(0),
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
                  )?.toFixed(0),
                },
              }
            : {
                ...result,
                [d.Equipment]: {
                  ...result[d.Equipment],
                  oilSum: (
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
