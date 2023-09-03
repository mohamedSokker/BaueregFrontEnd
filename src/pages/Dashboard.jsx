import React, { useEffect, useState } from "react";
import { CiWarning } from "react-icons/ci";

import DashboardCard from "../components/DashboardCard";
import DashboardBrekdownCard from "../components/DashboardBrekdownCard";
import DashboardPerMaint from "../components/DashboardPerMaint";
import fetchDataOnly from "../Functions/fetchDataOnly";
import { useNavContext } from "../contexts/NavContext";

const Dashboard = () => {
  const { usersData, token } = useNavContext();
  const [error, setError] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");
  const [fieldsLoading, setFieldsLoading] = useState({
    Availability: true,
    FuelConsumption: true,
    OilConsumption: true,
    Production: true,
    Breakdowns: true,
    PeriodicMaintenance: true,
  });
  const [fieldsPerLoading, setFieldsPerLoading] = useState({
    Availability: true,
    FuelConsumption: true,
    OilConsumption: true,
    Production: true,
    Breakdowns: true,
    PeriodicMaintenance: true,
  });
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

  const getChildData = (field, name, type) => {
    setCardsData((prev) => ({
      ...prev,
      [name]: { ...prev[name], [type]: field[name] },
    }));
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
          avURL += ` (Location = '${sites[i].name}'`;
        } else if (i === sites.length - 1) {
          avURL += ` OR Location = '${sites[i].name}')`;
        } else {
          avURL += ` OR Location = '${sites[i].name}'`;
        }
      }
      setLocURL(avURL);
    }
  }, [sites]);

  const getData = async (name, table, fullquery, DateTime) => {
    try {
      if (usersData && locURL) {
        setFieldsLoading((prev) => ({ ...prev, [name]: true }));
        setFieldsPerLoading((prev) => ({ ...prev, [name]: true }));
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
        let sum = avData[0].SUM;
        if (!sum) sum = 0;
        switch (name) {
          case "Availability":
            per = ((sum / avData[0].COUNT) * 100).toFixed(1);
            break;
          case "FuelConsumption":
            per = sum.toFixed(0);
            break;
          case "OilConsumption":
            per = sum.toFixed(0);
            break;
          case "Breakdowns":
            per = avData;
            break;
          case "PeriodicMaintenance":
            per = avData;
            break;
        }
        console.log(avURL);
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
        let lastWeekSum = avLastWeekData[0].SUM;
        if (!lastWeekSum) lastWeekSum = 0;
        switch (name) {
          case "Availability":
            perLastWeek = (
              (lastWeekSum / avLastWeekData[0].COUNT) *
              100
            ).toFixed(1);
            break;
          case "FuelConsumption":
            perLastWeek = lastWeekSum.toFixed(0);
            break;
          case "OilConsumption":
            perLastWeek = lastWeekSum.toFixed(0);
            break;
        }
        setFieldsPerData((prev) => ({
          ...prev,
          [name]: (per - perLastWeek).toFixed(1),
        }));
        setFieldsLoading((prev) => ({ ...prev, [name]: false }));
        setFieldsPerLoading((prev) => ({ ...prev, [name]: false }));
      }
    } catch (err) {
      setErrorDetails(`${err.message}`);
      console.log(err.message);
      setError(true);
      setFieldsLoading((prev) => ({ ...prev, [name]: false }));
      setFieldsPerLoading((prev) => ({ ...prev, [name]: false }));
    }
  };

  useEffect(() => {
    let avFullquery = ``;
    if (cardsData.Availability?.dateTime) {
      avFullquery = `SELECT SUM(CONVERT(float,Maintenance_Availability)) AS SUM,
                     COUNT(Maintenance_Availability) AS COUNT FROM Availability WHERE 
                     Date_Time >= '${cardsData.Availability.dateTime}' AND`;
    } else {
      avFullquery = `SELECT SUM(CONVERT(float,Maintenance_Availability)) AS SUM,
                      COUNT(Maintenance_Availability) AS COUNT FROM Availability WHERE `;
    }
    const getAvData = async () => {
      await getData("Availability", "Availability", avFullquery, "Date_Time");
    };
    getAvData();
  }, [cardsData.Availability, usersData, locURL]);

  useEffect(() => {
    let fuelConsFullquery = ``;
    if (cardsData.FuelConsumption?.dateTime) {
      fuelConsFullquery = `SELECT SUM(Quantity) AS SUM FROM FuelConsumption WHERE
                            Date >= '${cardsData.FuelConsumption.dateTime}' AND `;
    } else {
      fuelConsFullquery = `SELECT SUM(Quantity) AS SUM FROM FuelConsumption WHERE `;
    }
    const getfuelConsData = async () => {
      await getData(
        "FuelConsumption",
        "FuelConsumption",
        fuelConsFullquery,
        "Date"
      );
    };
    getfuelConsData();
  }, [cardsData.FuelConsumption, usersData, locURL]);

  useEffect(() => {
    let oilConsquery = ``;
    if (cardsData.OilConsumption?.dateTime) {
      oilConsquery = `SELECT SUM(TotalConsumption) AS SUM FROM OilConsumption WHERE
                      Date >= '${cardsData.OilConsumption.dateTime}' AND `;
    } else {
      oilConsquery = `SELECT SUM(TotalConsumption) AS SUM FROM OilConsumption WHERE `;
    }
    const getoilConsData = async () => {
      await getData("OilConsumption", "OilConsumption", oilConsquery, "Date");
    };
    getoilConsData();
  }, [cardsData.OilConsumption, usersData, locURL]);

  useEffect(() => {
    let Breakdownsquery = ``;
    if (cardsData.Breakdowns?.dateTime) {
      Breakdownsquery = `SELECT DISTINCT TOP 10 Breakdown_Type AS label,
                             COUNT(Breakdown_Type)
                             AS value FROM Maintenance WHERE 
                             Date_Time >= '${cardsData.Breakdowns.dateTime}' AND `;
    } else {
      Breakdownsquery = `SELECT DISTINCT TOP 10 Breakdown_Type AS label,
                             COUNT(Breakdown_Type)
                             AS value FROM Maintenance WHERE `;
    }
    const getbreakdownData = async () => {
      await getData("Breakdowns", "Maintenance", Breakdownsquery, "Date_Time");
    };
    getbreakdownData();
  }, [cardsData.Breakdowns, usersData, locURL]);

  useEffect(() => {
    let PerMaintquery = ``;
    if (cardsData.PeriodicMaintenance?.dateTime) {
      PerMaintquery = `SELECT TOP 50 ID AS id,
                           TimeStart AS StartTime,
                           TimeEnd AS EndTime,
                           Location %2B '=> ' %2B Equipment AS Location,
                           ExpectedTask AS Subject
                           FROM PeriodicMaintenance_Plan WHERE
                           TimeStart >= '${cardsData.PeriodicMaintenance.dateTime}' AND `;
    } else {
      PerMaintquery = `SELECT TOP 50 ID AS id,
                           TimeStart AS StartTime,
                           TimeEnd AS EndTime,
                           Location %2B '=> ' %2B Equipment AS Location,
                           ExpectedTask AS Subject
                           FROM PeriodicMaintenance_Plan WHERE `;
    }
    const getPerMaintData = async () => {
      await getData(
        "PeriodicMaintenance",
        "PeriodicMaintenance_Plan",
        PerMaintquery,
        "TimeStart"
      );
    };
    getPerMaintData();
  }, [cardsData.PeriodicMaintenance, usersData, locURL]);

  return (
    <div className="w-full h-auto Main--Page flex flex-col justify-around items-center overflow-y-scroll md:mt-0 mt-[58px] gap-4 relative">
      <div className="w-full md:h-[25vh] h-[800px] flex md:flex-row flex-col flex-nowrap justify-around">
        <DashboardCard
          name="Availability"
          title="Availability"
          value={`${fieldsData.Availability} %`}
          percentage={fieldsPerData.Availability}
          getChildData={getChildData}
          cardsData={cardsData?.Availability}
          loading={fieldsLoading.Availability}
          perLoading={fieldsPerLoading.Availability}
        />
        <DashboardCard
          name="Fuel Consumption"
          title="FuelConsumption"
          value={`${fieldsData.FuelConsumption} L`}
          percentage={fieldsPerData.FuelConsumption}
          getChildData={getChildData}
          cardsData={cardsData?.FuelConsumption}
          loading={fieldsLoading.FuelConsumption}
          perLoading={fieldsPerLoading.FuelConsumption}
        />
        <DashboardCard
          name="Oil Consumption"
          title="OilConsumption"
          value={`${fieldsData.OilConsumption} L`}
          percentage={fieldsPerData.OilConsumption}
          getChildData={getChildData}
          cardsData={cardsData?.OilConsumption}
          loading={fieldsLoading.OilConsumption}
          perLoading={fieldsPerLoading.OilConsumption}
        />
        <DashboardCard
          name="Production"
          value={0}
          percentage={0}
          getChildData={getChildData}
          cardsData={cardsData?.Production}
          loading={fieldsLoading.Production}
          perLoading={fieldsPerLoading.Production}
        />
      </div>
      <div className="w-full md:h-[60vh] h-[800px] flex md:flex-row justify-around items-center">
        <DashboardBrekdownCard
          name={`Breakdowns`}
          cardsData={cardsData?.Breakdowns}
          getChildData={getChildData}
          data={fieldsData.Breakdowns}
          loading={fieldsLoading.Breakdowns}
        />
      </div>
      <div className="w-full md:h-[100vh] h-[800px] flex md:flex-row justify-around items-center mb-4">
        <DashboardPerMaint
          name={`Periodic Maintenance`}
          cardsData={cardsData?.PeriodicMaintenance}
          getChildData={getChildData}
          data={fieldsData.PeriodicMaintenance}
          loading={fieldsLoading.PeriodicMaintenance}
        />
      </div>
      {error && (
        <div className=" w-full h-14 bg-red-600 text-white flex justify-center items-center absolute bottom-0 left-0 flex-row border-t-1 border-gray-400">
          <CiWarning className="text-[40px] font-extrabold" />
          <p className="ml-5 text-xl font-semibold">{errorDetails}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
