import React, { useEffect, useState } from "react";
import { CiWarning } from "react-icons/ci";
import { BsFilterLeft } from "react-icons/bs";

import DashboardCard from "../components/DashboardCard";
import DashboardBrekdownCard from "../components/DashboardBrekdownCard";
import DashboardPerMaint from "../components/DashboardPerMaint";
import updateData from "../Functions/updateData";
import { useNavContext } from "../contexts/NavContext";

const Dashboard = ({ socket }) => {
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
  });
  const [fieldsPerLoading, setFieldsPerLoading] = useState({
    Availability: true,
    FuelConsumption: true,
    OilConsumption: true,
    ProductionTrench: true,
    ProductionPiles: true,
    Breakdowns: true,
    PeriodicMaintenance: true,
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
  });
  const [fieldsAllData, setFieldsAllData] = useState({
    Availability: [],
    FuelConsumption: [],
    OilConsumption: [],
    ProductionTrench: [],
    ProductionPiles: [],
  });
  const [fieldsXData, setFieldsXData] = useState({
    Availability: [],
    FuelConsumption: [],
    OilConsumption: [],
    ProductionTrench: [],
    ProductionPiles: [],
  });
  const [fieldsYData, setFieldsYData] = useState({
    Availability: [],
    FuelConsumption: [],
    OilConsumption: [],
    ProductionTrench: [],
    ProductionPiles: [],
  });
  const [fieldsPerData, setFieldsPerData] = useState({
    Availability: 0,
    FuelConsumption: 0,
    OilConsumption: 0,
    ProductionTrench: 0,
    ProductionPiles: 0,
    Breakdowns: [],
    PeriodicMaintenance: [],
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
  const [realTime, setRealTime] = useState(false);
  const [count, setCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const filters = ["All", "Trench_Cutting_Machine", "Drilling_Machine"];
  const baseURL = process.env.REACT_APP_BASE_URL;

  const getChildData = (field, name, type) => {
    setCardsData((prev) => ({
      ...prev,
      [name]: { ...prev[name], [type]: field[name] },
    }));
  };

  const getDate = (date) => {
    const dt = new Date(date);
    dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
    return dt.toISOString();
  };

  const getData = async () => {
    // console.log(`getData`);
    try {
      const url = `${baseURL}/api/v1/getMessages`;
      const data = await updateData(url, "POST", token, {
        usersData: usersData,
      });
      // console.log(data);
      const target = data?.filter((d) => d.problem_End_To === null);
      // console.log(target);
      setMessages(target);
      setCount(0);
    } catch (error) {
      setError(true);
      setErrorDetails(error.message);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const formatNo = (No) => {
    if (No >= 1000000) {
      return `${Number(No / 1000000).toFixed(2)} M`;
    } else if (No >= 1000) {
      return `${Math.floor(No / 1000)} K`;
    }
  };

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      if (messages.length !== 0) {
        if (count === messages.length) {
          setCurrentMessage(
            `${1} - ${messages[0]?.Equipment} Started Problem ${
              messages[0]?.Breakdown_Type.split(".")[0]
            } at ${new Date(
              getDate(messages[0]?.Problem_start_From)
            ).toLocaleString()}`
          );
          setCount(1);
        } else {
          setCurrentMessage(
            `${count + 1} - ${messages[count]?.Equipment} Started Problem ${
              messages[count]?.Breakdown_Type.split(".")[0]
            } at ${new Date(
              getDate(messages[count]?.Problem_start_From)
            ).toLocaleString()}`
          );
          setCount((prev) => prev + 1);
        }
      }

      setRealTime((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, [realTime]);

  useEffect(() => {
    getData();
  }, [usersData]);

  useEffect(() => {
    if (socket.connected) socket.on("appDataUpdate", getData);

    return () => {
      socket.off("appDataUpdate", getData);
    };
  }, [socket, usersData]);

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
      if (usersData.length > 0) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, Availability: true }));
          setFieldsPerLoading((prev) => ({ ...prev, Availability: true }));
          const url = `${baseURL}/api/v1/dashboardAv`;
          const body = {
            usersData: usersData,
            filter:
              cardsData?.Availability?.filter === "All"
                ? null
                : cardsData?.Availability?.filter,
            dateTime: cardsData?.Availability?.dateTime,
          };
          const result = await updateData(url, "POST", token, body);
          let data = [];
          result?.data?.map((item) => {
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
          result?.data?.map((item) => {
            dataX.push(item.Date_Time);
            return dataX;
          });
          setFieldsXData((prev) => ({
            ...prev,
            Availability: dataX,
          }));
          let dataY = [];
          result?.data?.map((item) => {
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
  }, [cardsData.Availability, usersData]);

  useEffect(() => {
    const getfuelConsData = async () => {
      if (usersData.length > 0) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, FuelConsumption: true }));
          setFieldsPerLoading((prev) => ({ ...prev, FuelConsumption: true }));
          const url = `${baseURL}/api/v1/dashboardFuel`;
          const body = {
            usersData: usersData,
            filter:
              cardsData?.FuelConsumption?.filter === "All"
                ? null
                : cardsData?.FuelConsumption?.filter,
            dateTime: cardsData?.FuelConsumption?.dateTime,
          };
          const result = await updateData(url, "POST", token, body);
          let data = [];
          result?.data?.map((item) => {
            data.push({ x: formatDate(item.Date), y: Number(item.Quantity) });
            return data;
          });
          setFieldsAllData((prev) => ({
            ...prev,
            FuelConsumption: data,
          }));
          let dataX = [];
          result?.data?.map((item) => {
            dataX.push(formatDate(item.Date));
            return dataX;
          });
          setFieldsXData((prev) => ({
            ...prev,
            FuelConsumption: dataX,
          }));
          let dataY = [];
          result?.data?.map((item) => {
            dataY.push(Number(item.Quantity));
            return dataY;
          });
          setFieldsYData((prev) => ({
            ...prev,
            FuelConsumption: dataY,
          }));
          setFieldsData((prev) => ({
            ...prev,
            FuelConsumption: formatNo(result.per),
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
  }, [cardsData.FuelConsumption, usersData]);

  useEffect(() => {
    const getoilConsData = async () => {
      if (usersData.length > 0) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, OilConsumption: true }));
          setFieldsPerLoading((prev) => ({ ...prev, OilConsumption: true }));
          const url = `${baseURL}/api/v1/dashboardOil`;
          const body = {
            usersData: usersData,
            filter:
              cardsData?.OilConsumption?.filter === "All"
                ? null
                : cardsData?.OilConsumption?.filter,
            dateTime: cardsData?.OilConsumption?.dateTime,
          };
          const result = await updateData(url, "POST", token, body);
          let data = [];
          result?.data?.map((item) => {
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
          result?.data?.map((item) => {
            dataX.push(formatDate(item.Date));
            return dataX;
          });
          setFieldsXData((prev) => ({
            ...prev,
            OilConsumption: dataX,
          }));
          let dataY = [];
          result?.data?.map((item) => {
            dataY.push(Number(item.TotalConsumption));
            return dataY;
          });
          setFieldsYData((prev) => ({
            ...prev,
            OilConsumption: dataY,
          }));
          setFieldsData((prev) => ({
            ...prev,
            OilConsumption: formatNo(result.per),
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
  }, [cardsData.OilConsumption, usersData]);

  useEffect(() => {
    const getProducationTrenchData = async () => {
      if (usersData.length > 0) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, ProductionTrench: true }));
          setFieldsPerLoading((prev) => ({ ...prev, ProductionTrench: true }));
          const url = `${baseURL}/api/v1/dashboardProduction`;
          const body = {
            usersData: usersData,
            filter:
              cardsData?.ProductionTrench?.filter === "All"
                ? null
                : cardsData?.ProductionTrench?.filter,
            dateTime: cardsData?.ProductionTrench?.dateTime,
            Type: "Trench_Cutting_Machine",
          };
          const result = await updateData(url, "POST", token, body);
          console.log(result);
          let data = [];
          result?.data?.map((item) => {
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
          result?.data?.map((item) => {
            dataX.push(formatDate(item["Pouring Finish"]));
            return dataX;
          });
          setFieldsXData((prev) => ({
            ...prev,
            ProductionTrench: dataX,
          }));
          let dataY = [];
          result?.data?.map((item) => {
            dataY.push(Number(item["Actual M2"]));
            return dataY;
          });
          setFieldsYData((prev) => ({
            ...prev,
            ProductionTrench: dataY,
          }));
          setFieldsData((prev) => ({
            ...prev,
            ProductionTrench: formatNo(result.per),
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
    getProducationTrenchData();
  }, [cardsData.ProductionTrench, usersData]);

  useEffect(() => {
    const getProducationTrenchData = async () => {
      if (usersData.length > 0) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, ProductionPiles: true }));
          setFieldsPerLoading((prev) => ({ ...prev, ProductionPiles: true }));
          const url = `${baseURL}/api/v1/dashboardProduction`;
          const body = {
            usersData: usersData,
            filter:
              cardsData?.ProductionPiles?.filter === "All"
                ? null
                : cardsData?.ProductionPiles?.filter,
            dateTime: cardsData?.ProductionPiles?.dateTime,
            Type: "Drilling_Machine",
          };
          const result = await updateData(url, "POST", token, body);
          console.log(result);
          let data = [];
          result?.data?.map((item) => {
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
          result?.data?.map((item) => {
            dataX.push(formatDate(item["Pouring Finish"]));
            return dataX;
          });
          setFieldsXData((prev) => ({
            ...prev,
            ProductionPiles: dataX,
          }));
          let dataY = [];
          result?.data?.map((item) => {
            dataY.push(Number(item["Actual Depth"]));
            return dataY;
          });
          setFieldsYData((prev) => ({
            ...prev,
            ProductionPiles: dataY,
          }));
          setFieldsData((prev) => ({
            ...prev,
            ProductionPiles: formatNo(result.per),
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
    getProducationTrenchData();
  }, [cardsData.ProductionPiles, usersData]);

  useEffect(() => {
    const getbreakdownData = async () => {
      if (usersData.length > 0) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, Breakdowns: true }));
          const url = `${baseURL}/api/v1/dashboardBreakdown`;
          const body = {
            usersData: usersData,
            filter:
              cardsData?.Breakdowns?.filter === "All"
                ? null
                : cardsData?.Breakdowns?.filter,
            dateTime: cardsData?.Breakdowns?.dateTime,
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
  }, [cardsData.Breakdowns, usersData]);

  useEffect(() => {
    const getPerMaintData = async () => {
      if (usersData.length > 0) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, PeriodicMaintenance: true }));
          const url = `${baseURL}/api/v1/dashboardPerMaint`;
          const body = {
            usersData: usersData,
            filter:
              cardsData?.PeriodicMaintenance?.filter === "All"
                ? null
                : cardsData?.PeriodicMaintenance?.filter,
            dateTime: cardsData?.PeriodicMaintenance?.dateTime,
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
  }, [cardsData.PeriodicMaintenance, usersData]);

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
      <div className="w-[99%] h-[3vh] bg-white p-4 flex items-center flex-row mb-2 shadow-lg rounded-md relative mt-2">
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
        </button>
        {isFilterActive && (
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
        {(Number(fieldsData.Availability) !== 0 || cardsData?.Availability) && (
          <DashboardCard
            name="Availability"
            title="Availability"
            value={`${fieldsData.Availability} %`}
            percentage={fieldsPerData.Availability}
            getChildData={getChildData}
            cardsData={cardsData?.Availability}
            loading={fieldsLoading.Availability}
            perLoading={fieldsPerLoading.Availability}
            data={fieldsAllData.Availability}
            xData={fieldsXData.Availability}
            yData={fieldsYData.Availability}
            label="Percentage"
            isGraph={true}
            isPer={true}
            isFilter={true}
            filters={["All", "Trench_Cutting_Machine", "Drilling_Machine"]}
          />
        )}

        {(Number(fieldsData.FuelConsumption) !== 0 ||
          cardsData?.FuelConsumption) && (
          <DashboardCard
            name="Fuel Consumption"
            title="FuelConsumption"
            value={`${fieldsData.FuelConsumption} L`}
            percentage={fieldsPerData.FuelConsumption}
            getChildData={getChildData}
            cardsData={cardsData?.FuelConsumption}
            loading={fieldsLoading.FuelConsumption}
            perLoading={fieldsPerLoading.FuelConsumption}
            data={fieldsAllData.FuelConsumption}
            xData={fieldsXData.FuelConsumption}
            yData={fieldsYData.FuelConsumption}
            label="Consumption"
            isGraph={true}
            isPer={true}
            isFilter={true}
            filters={["All", "Trench_Cutting_Machine", "Drilling_Machine"]}
          />
        )}

        {(Number(fieldsData.OilConsumption) !== 0 ||
          cardsData?.OilConsumption) && (
          <DashboardCard
            name="Oil Consumption"
            title="OilConsumption"
            value={`${fieldsData.OilConsumption} L`}
            percentage={fieldsPerData.OilConsumption}
            getChildData={getChildData}
            cardsData={cardsData?.OilConsumption}
            loading={fieldsLoading.OilConsumption}
            perLoading={fieldsPerLoading.OilConsumption}
            data={fieldsAllData.OilConsumption}
            xData={fieldsXData.OilConsumption}
            yData={fieldsYData.OilConsumption}
            label="Consumption"
            isGraph={true}
            isPer={true}
            isFilter={true}
            filters={["All", "Trench_Cutting_Machine", "Drilling_Machine"]}
          />
        )}

        {(Number(fieldsData.ProductionTrench) !== 0 ||
          cardsData?.ProductionTrench) && (
          <DashboardCard
            name="Production Trench"
            title="ProductionTrench"
            value={`${fieldsData.ProductionTrench} M2`}
            percentage={fieldsPerData.ProductionTrench}
            getChildData={getChildData}
            cardsData={cardsData?.ProductionTrench}
            loading={fieldsLoading.ProductionTrench}
            perLoading={fieldsPerLoading.ProductionTrench}
            data={fieldsAllData.ProductionTrench}
            xData={fieldsXData.ProductionTrench}
            yData={fieldsYData.ProductionTrench}
            label="m2"
            isGraph={true}
            isPer={true}
            isFilter={true}
            filters={["All", "DW", "Barrettes", "Cut-Off Wall"]}
          />
        )}

        {(Number(fieldsData.ProductionPiles) !== 0 ||
          cardsData?.ProductionPiles) && (
          <DashboardCard
            name="Production Piles"
            title="ProductionPiles"
            value={`${fieldsData.ProductionPiles} M.L`}
            percentage={fieldsPerData.ProductionPiles}
            getChildData={getChildData}
            cardsData={cardsData?.ProductionPiles}
            loading={fieldsLoading.ProductionPiles}
            perLoading={fieldsPerLoading.ProductionPiles}
            data={fieldsAllData.ProductionPiles}
            xData={fieldsXData.ProductionPiles}
            yData={fieldsYData.ProductionPiles}
            label="ml"
            isGraph={true}
            isPer={true}
            isFilter={true}
            filters={["All", "Piles"]}
          />
        )}
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
        <div className=" w-full h-14 bg-red-600 text-white flex justify-center items-center fixed bottom-14 left-0 flex-row border-t-1 border-gray-400">
          <CiWarning className="text-[40px] font-extrabold" />
          <p className="ml-5 text-xl font-semibold">{errorDetails}</p>
        </div>
      )}

      <div
        className={[
          `w-full h-14 text-white flex justify-center items-center fixed bottom-0 left-0 flex-row border-t-1 border-gray-400`,
        ]}
        style={{
          backgroundColor: messages.length === 0 ? "white" : "orange",
        }}
      >
        <p className="ml-5 text-xl font-semibold">{currentMessage}</p>
      </div>
    </div>
  );
};

export default Dashboard;
