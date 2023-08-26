import React, { useEffect, useState } from "react";

import DashboardCard from "../components/DashboardCard";
import DashboardBrekdownCard from "../components/DashboardBrekdownCard";
import DashboardPerMaint from "../components/DashboardPerMaint";
import fetchDataOnly from "../Functions/fetchDataOnly";
import { useNavContext } from "../contexts/NavContext";
import { Cookies } from "react-cookie";

const Dashboard = () => {
  const { usersData } = useNavContext();
  const [cardsData, setCardsData] = useState([]);
  const [sites, setSites] = useState([]);
  const [locURL, setLocURL] = useState(null);
  const [fieldsData, setFieldsData] = useState({
    Availability: 0,
    FuelConsumption: 0,
    OilConsumption: 0,
    Production: 0,
    Breakdowns: [],
    PeriodicMaintenance: 0,
  });
  const [fieldsPerData, setFieldsPerData] = useState({
    Availability: 0,
    FuelConsumption: 0,
    OilConsumption: 0,
    Production: 0,
    Breakdowns: [],
    PeriodicMaintenance: 0,
  });

  const getChildData = (field, name) => {
    setCardsData((prev) => ({ ...prev, [name]: field[name] }));
  };

  useEffect(() => {
    if (usersData.length > 0) {
      setSites(
        usersData[0]?.roles?.Editor?.Sites.concat(
          usersData[0]?.roles?.User?.Sites
        )
      );
    }
  }, [usersData]);

  useEffect(() => {
    if (usersData) {
      let avURL = ``;
      for (let i = 0; i < sites.length; i++) {
        if (i === 0) {
          avURL += ` Location = '${sites[i].name}'`;
        } else {
          avURL += ` OR Location = '${sites[i].name}'`;
        }
      }
      setLocURL(avURL);
    }
  }, [usersData, sites]);

  const getData = async (name, table, fullquery, DateTime) => {
    try {
      if (usersData && locURL) {
        const cookies = new Cookies();
        const token = cookies?.get("token");
        let per = 0;
        let perLastWeek = 0;
        let avURL = `${process.env.REACT_APP_BASE_URL}/api/v1/${table}?fullquery=${fullquery}`;
        avURL += locURL;
        switch (name) {
          case "Breakdowns":
            avURL += `GROUP BY Breakdown_Type
                      HAVING COUNT(Breakdown_Type) > 0
                      ORDER BY value DESC`;
            break;
          default:
            avURL = avURL;
        }
        const avData = await fetchDataOnly(avURL, "GET", token);
        switch (name) {
          case "Availability":
            per = ((avData[0].SUM / avData[0].COUNT) * 100).toFixed(1);
            break;
          case "FuelConsumption":
            per = avData[0].SUM.toFixed(0);
            break;
          case "OilConsumption":
            per = avData[0].SUM.toFixed(0);
            break;
          case "Breakdowns":
            per = avData;
            break;
        }
        setFieldsData((prev) => ({
          ...prev,
          [name]: per,
        }));

        let avLastweekURL = `${process.env.REACT_APP_BASE_URL}/api/v1/${table}?fullquery=${fullquery}`;
        avLastweekURL += ` ${DateTime} < GETDATE() - 7 AND`;
        avLastweekURL += locURL;
        switch (name) {
          case "Breakdowns":
            avLastweekURL += `GROUP BY Breakdown_Type
                      HAVING COUNT(Breakdown_Type) > 0
                      ORDER BY value DESC`;
            break;
          default:
            avLastweekURL = avLastweekURL;
        }
        const avLastWeekData = await fetchDataOnly(avLastweekURL, "GET", token);
        switch (name) {
          case "Availability":
            perLastWeek = (
              (avLastWeekData[0].SUM / avLastWeekData[0].COUNT) *
              100
            ).toFixed(1);
            break;
          case "FuelConsumption":
            perLastWeek = avLastWeekData[0].SUM.toFixed(0);
            break;
          case "OilConsumption":
            perLastWeek = avLastWeekData[0].SUM.toFixed(0);
            break;
        }
        setFieldsPerData((prev) => ({
          ...prev,
          [name]: (per - perLastWeek).toFixed(1),
        }));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const avFullquery = `SELECT SUM(CONVERT(float,Maintenance_Availability)) AS SUM,
                      COUNT(Maintenance_Availability) AS COUNT FROM Availability WHERE `;
    const fuelConsFullquery = `SELECT SUM(Quantity) AS SUM FROM FuelConsumption WHERE `;
    const oilConsquery = `SELECT SUM(TotalConsumption) AS SUM FROM OilConsumption WHERE `;
    const Breakdownsquery = `SELECT DISTINCT TOP 10 Breakdown_Type AS label,
                             COUNT(Breakdown_Type)
                             AS value FROM Maintenance WHERE `;
    const getAvData = async () => {
      await getData("Availability", "Availability", avFullquery, "Date_Time");
    };
    const getfuelConsData = async () => {
      await getData(
        "FuelConsumption",
        "FuelConsumption",
        fuelConsFullquery,
        "Date"
      );
    };

    const getoilConsData = async () => {
      await getData("OilConsumption", "OilConsumption", oilConsquery, "Date");
    };

    const getbreakdownData = async () => {
      await getData("Breakdowns", "Maintenance", Breakdownsquery, "Date_Time");
    };
    const getAllData = async () => {
      await getAvData();
      await getfuelConsData();
      await getoilConsData();
      await getbreakdownData();
    };
    getAllData();
  }, [cardsData, locURL]);

  // console.log(cardsData);
  // console.log(sites);
  // console.log(fieldsData);
  // console.log(fieldsPerData);

  return (
    <div className="w-full md:h-[100%] h-auto Main--Page flex flex-col justify-around items-center bg-gray-100 overflow-y-scroll md:mt-0 mt-[58px]">
      <div className="w-full md:h-[25%] h-[800px] flex md:flex-row flex-col flex-nowrap justify-around">
        <DashboardCard
          name="Availability"
          title="Availability"
          value={`${fieldsData.Availability} %`}
          percentage={fieldsPerData.Availability}
          getChildData={getChildData}
          cardsData={cardsData}
        />
        <DashboardCard
          name="Fuel Consumption"
          title="FuelConsumption"
          value={`${fieldsData.FuelConsumption}`}
          percentage={fieldsPerData.FuelConsumption}
          getChildData={getChildData}
          cardsData={cardsData}
        />
        <DashboardCard
          name="Oil Consumption"
          title="OilConsumption"
          value={`${fieldsData.OilConsumption}`}
          percentage={fieldsPerData.OilConsumption}
          getChildData={getChildData}
          cardsData={cardsData}
        />
        <DashboardCard
          name="Production"
          value={0}
          percentage={0}
          getChildData={getChildData}
          cardsData={cardsData}
        />
      </div>
      <div className="w-full md:h-[70%] h-[800px] flex md:flex-row flex-col justify-around items-center">
        <DashboardBrekdownCard
          name={`Breakdowns`}
          cardsData={cardsData}
          getChildData={getChildData}
          data={fieldsData.Breakdowns}
        />
        <DashboardPerMaint
          name={`Periodic Maintenance`}
          cardsData={cardsData}
          getChildData={getChildData}
        />
      </div>
    </div>
  );
};

export default Dashboard;
