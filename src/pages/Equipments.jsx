import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { CiWarning } from "react-icons/ci";
import { BsFilterLeft } from "react-icons/bs";

import DashboardCard from "../components/DashboardCard";
import DashboardBrekdownCard from "../components/DashboardBrekdownCard";
import DashboardPerMaint from "../components/DashboardPerMaint";
import updateData from "../Functions/updateData";
import { useNavContext } from "../contexts/NavContext";

const Equipments = () => {
  // const { tableName } = useParams();
  const location = useLocation();
  const tableName = `${location.pathname.split("/")[2].replaceAll("%20", " ")}${
    location.hash
  }`;

  console.log(tableName);

  const { usersData, token } = useNavContext();
  const [error, setError] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");
  const [fieldsLoading, setFieldsLoading] = useState({
    Availability: true,
    FuelConsumption: true,
    OilConsumption: true,
    ProductionTrench: true,
    ProductionPiles: true,
    Breakdowns: true,
    PeriodicMaintenance: true,
    Machinary: true,
    Equipments: true,
  });
  const [fieldsPerLoading, setFieldsPerLoading] = useState({
    Availability: true,
    FuelConsumption: true,
    OilConsumption: true,
    ProductionTrench: true,
    ProductionPiles: true,
    Breakdowns: true,
    PeriodicMaintenance: true,
    Machinary: true,
    Equipments: true,
  });
  const [cardsData, setCardsData] = useState([]);
  const [mainCardsData, setMainCardsData] = useState([]);
  const [fieldsData, setFieldsData] = useState({
    Availability: 0,
    FuelConsumption: 0,
    OilConsumption: 0,
    ProductionTrench: 0,
    ProductionPiles: 0,
    Breakdowns: [],
    PeriodicMaintenance: [],
    Machinary: [],
    Equipments: [],
  });
  const [fieldsAllData, setFieldsAllData] = useState({
    Availability: [],
    FuelConsumption: [],
    OilConsumption: [],
    ProductionTrench: [],
    ProductionPiles: [],
    Machinary: [],
    Equipments: [],
  });
  const [fieldsXData, setFieldsXData] = useState({
    Availability: [],
    FuelConsumption: [],
    OilConsumption: [],
    ProductionTrench: [],
    ProductionPiles: [],
    Machinary: [],
    Equipments: [],
  });
  const [fieldsYData, setFieldsYData] = useState({
    Availability: [],
    FuelConsumption: [],
    OilConsumption: [],
    ProductionTrench: [],
    ProductionPiles: [],
    Machinary: [],
    Equipments: [],
  });
  const [fieldsPerData, setFieldsPerData] = useState({
    Availability: 0,
    FuelConsumption: 0,
    OilConsumption: 0,
    ProductionTrench: 0,
    ProductionPiles: 0,
    Breakdowns: [],
    PeriodicMaintenance: [],
    Machinary: [],
    Equipments: [],
  });
  const [startDate, setStartDate] = useState(
    new Date(
      new Date().setMinutes(
        new Date().getMinutes() - new Date().getTimezoneOffset()
      )
    )
      .toISOString()
      .slice(0, 10)
  );
  const [endDate, setSEndDate] = useState(
    new Date(
      new Date().setMinutes(
        new Date().getMinutes() - new Date().getTimezoneOffset()
      )
    )
      .toISOString()
      .slice(0, 10)
  );
  const [isFilterActive, setIsFilterActive] = useState(false);

  // const filters = ["All", "Trench_Cutting_Machine", "Drilling_Machine"];
  const baseURL = process.env.REACT_APP_BASE_URL;

  const getChildData = (field, name, type) => {
    setCardsData((prev) => ({
      ...prev,
      [name]: { ...prev[name], [type]: field[name] },
    }));
  };

  const formatDate = (anyDate) => {
    let dt = new Date(anyDate);
    const year = dt.getFullYear();
    const day = dt.getDate();
    let month = (Number(dt.getMonth()) + 1).toString();
    if (month.length < 2) month = `0${month}`;
    return `${year}-${month}-${day}`;
  };

  // console.log(cardsData);

  useEffect(() => {
    const getAvData = async () => {
      if (usersData) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, Availability: true }));
          setFieldsPerLoading((prev) => ({ ...prev, Availability: true }));
          const url = `${baseURL}/api/v1/eqAv`;
          const body = {
            usersData: usersData,
            filter:
              cardsData?.Availability?.filter === "All"
                ? null
                : cardsData?.Availability?.filter,
            dateTime: cardsData?.Availability?.dateTime,
            Equipment: tableName,
          };
          const result = await updateData(url, "POST", token, body);
          let data = [];
          result.data.map((item) => {
            data.push({
              x: formatDate(item.Date_Time),
              y: Number(item.Maintenance_Availability),
            });
            return data;
          });
          setFieldsAllData((prev) => ({
            ...prev,
            Availability: data,
          }));
          let dataX = [];
          result.data.map((item) => {
            dataX.push(item.Date_Time);
            return dataX;
          });
          setFieldsXData((prev) => ({
            ...prev,
            Availability: dataX,
          }));
          let dataY = [];
          result.data.map((item) => {
            dataY.push(Number(item.Maintenance_Availability));
            return dataY;
          });
          setFieldsYData((prev) => ({
            ...prev,
            Availability: dataY,
          }));
          setFieldsData((prev) => ({
            ...prev,
            Availability: result.per,
          }));
          setFieldsPerData((prev) => ({
            ...prev,
            Availability: result.diff,
          }));
          setFieldsLoading((prev) => ({ ...prev, Availability: false }));
          setFieldsPerLoading((prev) => ({ ...prev, Availability: false }));
        } catch (err) {
          setError(true);
          setErrorDetails(err.message);
          setFieldsLoading((prev) => ({ ...prev, Availability: false }));
          setFieldsPerLoading((prev) => ({ ...prev, Availability: false }));
        }
      }
    };
    getAvData();
  }, [cardsData.Availability, usersData, tableName]);

  useEffect(() => {
    const getfuelConsData = async () => {
      if (usersData) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, FuelConsumption: true }));
          setFieldsPerLoading((prev) => ({ ...prev, FuelConsumption: true }));
          const url = `${baseURL}/api/v1/eqFuel`;
          const body = {
            usersData: usersData,
            filter:
              cardsData?.FuelConsumption?.filter === "All"
                ? null
                : cardsData?.FuelConsumption?.filter,
            dateTime: cardsData?.FuelConsumption?.dateTime,
            Equipment: tableName,
          };
          const result = await updateData(url, "POST", token, body);
          let data = [];
          result.data.map((item) => {
            data.push({ x: formatDate(item.Date), y: Number(item.Quantity) });
            return data;
          });
          setFieldsAllData((prev) => ({
            ...prev,
            FuelConsumption: data,
          }));
          let dataX = [];
          result.data.map((item) => {
            dataX.push(formatDate(item.Date));
            return dataX;
          });
          setFieldsXData((prev) => ({
            ...prev,
            FuelConsumption: dataX,
          }));
          let dataY = [];
          result.data.map((item) => {
            dataY.push(Number(item.Quantity));
            return dataY;
          });
          setFieldsYData((prev) => ({
            ...prev,
            FuelConsumption: dataY,
          }));
          setFieldsData((prev) => ({
            ...prev,
            FuelConsumption: result.per,
          }));
          setFieldsPerData((prev) => ({
            ...prev,
            FuelConsumption: result.diff,
          }));
          setFieldsLoading((prev) => ({ ...prev, FuelConsumption: false }));
          setFieldsPerLoading((prev) => ({ ...prev, FuelConsumption: false }));
        } catch (err) {
          setError(true);
          setErrorDetails(err.message);
          setFieldsLoading((prev) => ({ ...prev, FuelConsumption: false }));
          setFieldsPerLoading((prev) => ({ ...prev, FuelConsumption: false }));
        }
      }
    };
    getfuelConsData();
  }, [cardsData.FuelConsumption, usersData, tableName]);

  useEffect(() => {
    const getoilConsData = async () => {
      if (usersData) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, OilConsumption: true }));
          setFieldsPerLoading((prev) => ({ ...prev, OilConsumption: true }));
          const url = `${baseURL}/api/v1/eqOil`;
          const body = {
            usersData: usersData,
            filter:
              cardsData?.OilConsumption?.filter === "All"
                ? null
                : cardsData?.OilConsumption?.filter,
            dateTime: cardsData?.OilConsumption?.dateTime,
            Equipment: tableName,
          };
          const result = await updateData(url, "POST", token, body);
          let data = [];
          result.data.map((item) => {
            data.push({
              x: formatDate(item.Date),
              y: Number(item.TotalConsumption),
            });
            return data;
          });
          setFieldsAllData((prev) => ({
            ...prev,
            OilConsumption: data,
          }));
          let dataX = [];
          result.data.map((item) => {
            dataX.push(formatDate(item.Date));
            return dataX;
          });
          setFieldsXData((prev) => ({
            ...prev,
            OilConsumption: dataX,
          }));
          let dataY = [];
          result.data.map((item) => {
            dataY.push(Number(item.TotalConsumption));
            return dataY;
          });
          setFieldsYData((prev) => ({
            ...prev,
            OilConsumption: dataY,
          }));
          setFieldsData((prev) => ({
            ...prev,
            OilConsumption: result.per,
          }));
          setFieldsPerData((prev) => ({
            ...prev,
            OilConsumption: result.diff,
          }));
          setFieldsLoading((prev) => ({ ...prev, OilConsumption: false }));
          setFieldsPerLoading((prev) => ({ ...prev, OilConsumption: false }));
        } catch (err) {
          setError(true);
          setErrorDetails(err.message);
          setFieldsLoading((prev) => ({ ...prev, OilConsumption: false }));
          setFieldsPerLoading((prev) => ({ ...prev, OilConsumption: false }));
        }
      }
    };
    getoilConsData();
  }, [cardsData.OilConsumption, usersData, tableName]);

  useEffect(() => {
    const getProdTrenchData = async () => {
      if (usersData) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, ProductionTrench: true }));
          setFieldsPerLoading((prev) => ({ ...prev, ProductionTrench: true }));
          const url = `${baseURL}/api/v1/eqProduction`;
          const body = {
            usersData: usersData,
            filter:
              cardsData?.ProductionTrench?.filter === "All"
                ? null
                : cardsData?.ProductionTrench?.filter,
            dateTime: cardsData?.ProductionTrench?.dateTime,
            Equipment: tableName,
            Type: "Trench_Cutting_Machine",
          };
          const result = await updateData(url, "POST", token, body);
          let data = [];
          result.data.map((item) => {
            data.push({
              x: formatDate(item["Pouring Finish"]),
              y: Number(item["Actual M2"]),
            });
            return data;
          });
          setFieldsAllData((prev) => ({
            ...prev,
            ProductionTrench: data,
          }));
          let dataX = [];
          result.data.map((item) => {
            dataX.push(formatDate(item["Pouring Finish"]));
            return dataX;
          });
          setFieldsXData((prev) => ({
            ...prev,
            ProductionTrench: dataX,
          }));
          let dataY = [];
          result.data.map((item) => {
            dataY.push(Number(item["Actual M2"]));
            return dataY;
          });
          setFieldsYData((prev) => ({
            ...prev,
            ProductionTrench: dataY,
          }));
          setFieldsData((prev) => ({
            ...prev,
            ProductionTrench: result.per,
          }));
          setFieldsPerData((prev) => ({
            ...prev,
            ProductionTrench: result.diff,
          }));
          setFieldsLoading((prev) => ({ ...prev, ProductionTrench: false }));
          setFieldsPerLoading((prev) => ({ ...prev, ProductionTrench: false }));
        } catch (err) {
          setError(true);
          setErrorDetails(err.message);
          setFieldsLoading((prev) => ({ ...prev, ProductionTrench: false }));
          setFieldsPerLoading((prev) => ({ ...prev, ProductionTrench: false }));
        }
      }
    };
    getProdTrenchData();
  }, [cardsData.ProductionTrench, usersData, tableName]);

  useEffect(() => {
    const getProdTrenchData = async () => {
      if (usersData) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, ProductionPiles: true }));
          setFieldsPerLoading((prev) => ({ ...prev, ProductionPiles: true }));
          const url = `${baseURL}/api/v1/eqProduction`;
          const body = {
            usersData: usersData,
            filter:
              cardsData?.ProductionPiles?.filter === "All"
                ? null
                : cardsData?.ProductionPiles?.filter,
            dateTime: cardsData?.ProductionPiles?.dateTime,
            Equipment: tableName,
            Type: "Drilling_Machine",
          };
          const result = await updateData(url, "POST", token, body);
          let data = [];
          result.data.map((item) => {
            data.push({
              x: formatDate(item["Pouring Finish"]),
              y: Number(item["Actual Depth"]),
            });
            return data;
          });
          setFieldsAllData((prev) => ({
            ...prev,
            ProductionPiles: data,
          }));
          let dataX = [];
          result.data.map((item) => {
            dataX.push(formatDate(item["Pouring Finish"]));
            return dataX;
          });
          setFieldsXData((prev) => ({
            ...prev,
            ProductionPiles: dataX,
          }));
          let dataY = [];
          result.data.map((item) => {
            dataY.push(Number(item["Actual Depth"]));
            return dataY;
          });
          setFieldsYData((prev) => ({
            ...prev,
            ProductionPiles: dataY,
          }));
          setFieldsData((prev) => ({
            ...prev,
            ProductionPiles: result.per,
          }));
          setFieldsPerData((prev) => ({
            ...prev,
            ProductionPiles: result.diff,
          }));
          setFieldsLoading((prev) => ({ ...prev, ProductionPiles: false }));
          setFieldsPerLoading((prev) => ({ ...prev, ProductionPiles: false }));
        } catch (err) {
          setError(true);
          setErrorDetails(err.message);
          setFieldsLoading((prev) => ({ ...prev, ProductionPiles: false }));
          setFieldsPerLoading((prev) => ({ ...prev, ProductionPiles: false }));
        }
      }
    };
    getProdTrenchData();
  }, [cardsData.ProductionPiles, usersData, tableName]);

  useEffect(() => {
    const getbreakdownData = async () => {
      if (usersData) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, Breakdowns: true }));
          const url = `${baseURL}/api/v1/eqBreakdown`;
          const body = {
            usersData: usersData,
            filter:
              cardsData?.Breakdowns?.filter === "All"
                ? null
                : cardsData?.Breakdowns?.filter,
            dateTime: cardsData?.Breakdowns?.dateTime,
            Location: tableName,
          };
          const result = await updateData(url, "POST", token, body);
          setFieldsData((prev) => ({
            ...prev,
            Breakdowns: result,
          }));
          setFieldsLoading((prev) => ({ ...prev, Breakdowns: false }));
        } catch (err) {
          setError(true);
          setErrorDetails(err.message);
          setFieldsLoading((prev) => ({ ...prev, Breakdowns: false }));
        }
      }
    };
    getbreakdownData();
  }, [cardsData.Breakdowns, usersData, tableName]);

  useEffect(() => {
    const getPerMaintData = async () => {
      if (usersData) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, PeriodicMaintenance: true }));
          const url = `${baseURL}/api/v1/eqPerMaint`;
          const body = {
            usersData: usersData,
            filter:
              cardsData?.PeriodicMaintenance?.filter === "All"
                ? null
                : cardsData?.PeriodicMaintenance?.filter,
            dateTime: cardsData?.PeriodicMaintenance?.dateTime,
            Location: tableName,
          };
          const result = await updateData(url, "POST", token, body);
          console.log(result);
          setFieldsData((prev) => ({
            ...prev,
            PeriodicMaintenance: result,
          }));
          setFieldsLoading((prev) => ({ ...prev, PeriodicMaintenance: false }));
        } catch (err) {
          setError(true);
          setErrorDetails(err.message);
          setFieldsLoading((prev) => ({ ...prev, PeriodicMaintenance: false }));
        }
      }
    };
    getPerMaintData();
  }, [cardsData.PeriodicMaintenance, usersData, tableName]);

  const changeDateValue = (e) => {
    setStartDate(e.target.value);
    setCardsData((prev) => ({
      ...prev,
      Availability: { ...prev["Availability"], dateTime: e.target.value },
      FuelConsumption: { ...prev["FuelConsumption"], dateTime: e.target.value },
      OilConsumption: { ...prev["OilConsumption"], dateTime: e.target.value },
      Breakdowns: { ...prev["Breakdowns"], dateTime: e.target.value },
      PeriodicMaintenance: {
        ...prev["PeriodicMaintenance"],
        dateTime: e.target.value,
      },
    }));
  };
  return (
    <div className="w-full h-auto Main--Page flex flex-col justify-around items-center overflow-y-scroll md:mt-0 mt-[58px] gap-4">
      <div className="w-[99%] h-[3vh] bg-white p-4 flex items-center flex-row mb-2 shadow-lg rounded-md relative mt-2 justify-between">
        <div className="flex items-center flex-row w-[50%] h-full">
          {/* <input
            className="outline-none rounded-lg mr-2 text-[14px]"
            type="date"
            value={startDate}
            onChange={changeDateValue}
          />
          <button
            className="text-[26px]"
            onClick={() => setIsFilterActive((prev) => !prev)}
          >
            <BsFilterLeft />
          </button> */}
        </div>
        <div className="font-bold text-[16px]">{tableName}</div>
        {/* {isFilterActive && (
          <div className="absolute flex flex-col top-[3vh] left-[180px] z-10 bg-gray-200 p-2 rounded-md text-[10px]">
            {filters.map((item) => (
              <div key={item}>
                <input
                  className="mr-2"
                  id={item}
                  value={item}
                  type="radio"
                  onChange={() => {
                    setMainCardsData({ filter: item });
                    setCardsData((prev) => ({
                      ...prev,
                      Availability: {
                        ...prev["Availability"],
                        filter: item,
                      },
                      FuelConsumption: {
                        ...prev["FuelConsumption"],
                        filter: item,
                      },
                      OilConsumption: {
                        ...prev["OilConsumption"],
                        filter: item,
                      },
                      Breakdowns: {
                        ...prev["Breakdowns"],
                        filter: item,
                      },
                      PeriodicMaintenance: {
                        ...prev["PeriodicMaintenance"],
                        filter: item,
                      },
                    }));
                    // getChildData({ [title]: item }, title, "filter");
                    setIsFilterActive(false);
                  }}
                  checked={
                    mainCardsData && mainCardsData["filter"] === item
                      ? true
                      : false
                  }
                />
                <label htmlFor={item}>{item}</label>
              </div>
            ))}
          </div>
        )} */}
      </div>
      <div className="w-full flex md:flex-row flex-col flex-wrap relative gap-2 p-2">
        <DashboardCard
          name="Availability"
          title="Availability"
          value={`${fieldsData.Availability} %`}
          percentage={fieldsPerData.Availability}
          getChildData={getChildData}
          cardsData={cardsData?.Availability}
          loading={fieldsLoading.Availability}
          perLoading={fieldsPerLoading.Availability}
          data={null}
          xData={fieldsXData.Availability}
          yData={fieldsYData.Availability}
          label="Percentage"
          isGraph={true}
          isPer={true}
          isFilter={true}
          filters={["All", "Trench_Cutting_Machine", "Drilling_Machine"]}
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
          data={null}
          xData={fieldsXData.FuelConsumption}
          yData={fieldsYData.FuelConsumption}
          label="Consumption"
          isGraph={true}
          isPer={true}
          isFilter={true}
          filters={["All", "Trench_Cutting_Machine", "Drilling_Machine"]}
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
          data={null}
          xData={fieldsXData.OilConsumption}
          yData={fieldsYData.OilConsumption}
          label="Consumption"
          isGraph={true}
          isPer={true}
          isFilter={true}
          filters={["All", "Trench_Cutting_Machine", "Drilling_Machine"]}
        />
        <DashboardCard
          name="Production Trench"
          title={`ProductionTrench`}
          value={fieldsData.ProductionTrench}
          percentage={fieldsPerData.ProductionTrench}
          getChildData={getChildData}
          cardsData={cardsData?.ProductionTrench}
          loading={fieldsLoading.ProductionTrench}
          perLoading={fieldsPerLoading.ProductionTrench}
          data={null}
          xData={fieldsXData.ProductionTrench}
          yData={fieldsYData.ProductionTrench}
          label="m2"
          isGraph={true}
          isPer={true}
          isFilter={true}
          filters={["All", "DW", "Barrettes", "Cut-Off Wall"]}
        />
        <DashboardCard
          name="Production Piles"
          title={`ProductionPiles`}
          value={fieldsData.ProductionPiles}
          percentage={fieldsPerData.ProductionPiles}
          getChildData={getChildData}
          cardsData={cardsData?.ProductionPiles}
          loading={fieldsLoading.ProductionPiles}
          perLoading={fieldsPerLoading.ProductionPiles}
          data={null}
          xData={fieldsXData.ProductionPiles}
          yData={fieldsYData.ProductionPiles}
          label="ml"
          isGraph={true}
          isPer={true}
          isFilter={true}
          filters={["All", "Piles"]}
        />
      </div>
      <div className="w-full md:h-[56vh] h-[800px] flex md:flex-row justify-around items-center">
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
          title={`PeriodicMaintenance`}
          cardsData={cardsData?.PeriodicMaintenance}
          getChildData={getChildData}
          data={fieldsData.PeriodicMaintenance}
          loading={fieldsLoading.PeriodicMaintenance}
        />
      </div>
      {error && (
        <div className=" w-full h-14 bg-red-600 text-white flex justify-center items-center fixed bottom-0 left-0 flex-row border-t-1 border-gray-400">
          <CiWarning className="text-[40px] font-extrabold" />
          <p className="ml-5 text-xl font-semibold">{errorDetails}</p>
        </div>
      )}
    </div>
  );
};

export default Equipments;
