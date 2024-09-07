import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useDashboardContext } from "../../../contexts/DashboardContext";

const getUniqueArray = (array) => {
  const uniqueSet = new Set();

  array.forEach((jsonObject) => {
    uniqueSet.add(JSON.stringify(jsonObject));
  });

  const uniqueArray = Array.from(uniqueSet).map((jsonString) =>
    JSON.parse(jsonString)
  );
  return uniqueArray;
};

const ExcelDateToJSDate = (serial) => {
  var utc_days = Math.floor(serial - 25569);
  var utc_value = utc_days * 86400;
  var date_info = new Date(utc_value * 1000);

  var fractional_day = serial - Math.floor(serial) + 0.0000001;

  var total_seconds = Math.floor(86400 * fractional_day);

  var seconds = total_seconds % 60;

  total_seconds -= seconds;

  var hours = Math.floor(total_seconds / (60 * 60));
  var minutes = Math.floor(total_seconds / 60) % 60;

  return new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate(),
    hours,
    minutes,
    seconds
  );
};

const useData = ({ socket, equip }) => {
  const { dashboardData, setDashboardData } = useDashboardContext();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    avData: [],
    maintData: [],
    maintStocksData: [],
    fuelCons: [],
    oilCons: [],
    prodDrill: [],
    prodTrench: [],
    location: [],
  });
  const [copiedData, setCopiedData] = useState(null);
  const [currentSpare, setCurrentSpare] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [searchItems, setSearchItems] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  const getData = async () => {
    try {
      setLoading(true);

      if (dashboardData?.location?.length > 0) {
        console.log("from Global");

        const eqs = [];
        const eqsItem = {};
        dashboardData?.location?.map((item) => {
          if (item.Location === equip) {
            eqs.push(item.Equipment);
            eqsItem = {
              ...eqsItem,
              [item.Equipment]: {
                startDate: item.Start_Date,
                endDate: item.End_Date === null ? new Date() : item.End_Date,
              },
            };
          }
        });

        console.lof(eqsItem);

        const filteredData = {
          avData: dashboardData?.avData?.filter(
            (item) =>
              eqs.includes(item.Equipment) &&
              new Date(item.Date_Time) >
                new Date(eqsItem?.[item.Equipment]?.startDate) &&
              new Date(item.Date_Time) <
                new Date(eqsItem?.[item.Equipment]?.endDate)
          ),
          maintData: dashboardData?.maintData?.filter(
            (item) =>
              eqs.includes(item.Equipment) &&
              new Date(item.Date_Time) >
                new Date(eqsItem?.[item.Equipment]?.startDate) &&
              new Date(item.Date_Time) <
                new Date(eqsItem?.[item.Equipment]?.endDate)
          ),
          maintStocksData: dashboardData?.maintStocksData?.filter(
            (item) =>
              eqs.includes(item.Equipment) &&
              new Date(item.DateTime) >
                new Date(eqsItem?.[item.Equipment]?.startDate) &&
              new Date(item.DateTime) <
                new Date(eqsItem?.[item.Equipment]?.endDate)
          ),
          fuelCons: dashboardData?.fuelCons?.filter(
            (item) =>
              eqs.includes(item.Equipment) &&
              new Date(item?.["Date "]) >
                new Date(eqsItem?.[item.Equipment]?.startDate) &&
              new Date(item?.["Date "]) <
                new Date(eqsItem?.[item.Equipment]?.endDate)
          ),
          oilCons: dashboardData?.oilCons?.filter(
            (item) =>
              eqs.includes(item.Equipment) &&
              new Date(item.Date) >
                new Date(eqsItem?.[item.Equipment]?.startDate) &&
              new Date(item.Date) < new Date(eqsItem?.[item.Equipment]?.endDate)
          ),
          prodTrench: dashboardData?.prodTrench?.filter(
            (item) =>
              eqs.includes(item?.["# Machine"]) &&
              new Date(item?.["Pouring Finish"]) >
                new Date(eqsItem?.[item?.["# Machine"]]?.startDate) &&
              new Date(item?.["Pouring Finish"]) <
                new Date(eqsItem?.[item?.["# Machine"]]?.endDate)
          ),
          prodDrill: dashboardData?.prodDrill?.filter(
            (item) =>
              eqs.includes(item?.["# Machine"]) &&
              new Date(item?.["Pouring Finish"]) >
                new Date(eqsItem?.[item?.["# Machine"]]?.startDate) &&
              new Date(item?.["Pouring Finish"]) <
                new Date(eqsItem?.[item?.["# Machine"]]?.endDate)
          ),
        };

        setData(filteredData);
        setCopiedData(filteredData);
        setCurrentSpare(dashboardData?.maintStocksData[3]);
      } else {
        const URLs = [
          "/api/v1/availability",
          "/api/v1/maintenance",
          "/api/v1/maintenanceStocks",
          "/api/v1/fuelCons",
          "/api/v1/oilCons",
          "/api/v1/prodDrill",
          "/api/v1/prodTrench",
          "/api/v3/Equipments_Location",
        ];

        const responseData = await Promise.all(
          URLs.map((url) => {
            return axiosPrivate(url, { method: "GET" });
          })
        );

        // console.log(responseData[4].data);

        for (let i = 0; i < responseData[3].data.length; i++) {
          responseData[3].data[i]["Date "] = ExcelDateToJSDate(
            responseData[3].data[i]["Date "]
          );
        }

        for (let i = 0; i < responseData[4].data.length; i++) {
          responseData[4].data[i]["Date"] = ExcelDateToJSDate(
            responseData[4].data[i]["Date"]
          );
        }

        for (let i = 0; i < responseData[5].data.length; i++) {
          responseData[5].data[i]["Pouring Finish"] = ExcelDateToJSDate(
            responseData[5].data[i]["Pouring Finish"]
          );
        }

        for (let i = 0; i < responseData[6].data.length; i++) {
          responseData[6].data[i]["Pouring Finish"] = ExcelDateToJSDate(
            responseData[6].data[i]["Pouring Finish"]
          );
        }

        const eqs = [];
        let eqsItem = {};
        responseData[7]?.data?.map((item) => {
          if (item.Location === equip) {
            eqs.push(item.Equipment);
            eqsItem = {
              ...eqsItem,
              [item.Equipment]: {
                startDate: item.Start_Date,
                endDate: item.End_Date === null ? new Date() : item.End_Date,
              },
            };
          }
        });

        const data = {
          avData: responseData[0].data?.filter(
            (item) =>
              eqs.includes(item.Equipment) &&
              new Date(item?.["Date_Time"]) >
                new Date(eqsItem?.[item.Equipment]?.startDate) &&
              new Date(item?.["Date_Time"]) <
                new Date(eqsItem?.[item.Equipment]?.endDate)
          ),
          maintData: responseData[1].data?.filter(
            (item) =>
              eqs.includes(item.Equipment) &&
              new Date(item?.["Date_Time"]) >
                new Date(eqsItem?.[item.Equipment]?.startDate) &&
              new Date(item?.["Date_Time"]) <
                new Date(eqsItem?.[item.Equipment]?.endDate)
          ),
          maintStocksData: responseData[2].data?.filter(
            (item) =>
              eqs.includes(item.Equipment) &&
              new Date(item?.["DateTime"]) >
                new Date(eqsItem?.[item.Equipment]?.startDate) &&
              new Date(item?.["DateTime"]) <
                new Date(eqsItem?.[item.Equipment]?.endDate)
          ),
          fuelCons: responseData[3].data?.filter(
            (item) =>
              eqs.includes(item.Equipment) &&
              new Date(item?.["Date "]) >
                new Date(eqsItem?.[item.Equipment]?.startDate) &&
              new Date(item?.["Date "]) <
                new Date(eqsItem?.[item.Equipment]?.endDate)
          ),
          oilCons: responseData[4].data?.filter(
            (item) =>
              eqs.includes(item.Equipment) &&
              new Date(item?.["Date"]) >
                new Date(eqsItem?.[item.Equipment]?.startDate) &&
              new Date(item?.["Date"]) <
                new Date(eqsItem?.[item.Equipment]?.endDate)
          ),
          prodDrill: responseData[5].data?.filter(
            (item) =>
              eqs.includes(item?.["# Machine"]) &&
              new Date(item?.["Pouring Finish"]) >
                new Date(eqsItem?.[item?.["# Machine"]]?.startDate) &&
              new Date(item?.["Pouring Finish"]) <
                new Date(eqsItem?.[item?.["# Machine"]]?.endDate)
          ),
          prodTrench: responseData[6].data?.filter(
            (item) =>
              eqs.includes(item?.["# Machine"]) &&
              new Date(item?.["Pouring Finish"]) >
                new Date(eqsItem?.[item?.["# Machine"]]?.startDate) &&
              new Date(item?.["Pouring Finish"]) <
                new Date(eqsItem?.[item?.["# Machine"]]?.endDate)
          ),
          location: responseData[7]?.data,
        };

        console.log(data.prodDrill);
        console.log(data.prodTrench);

        setData(data);
        setCopiedData(data);
        setCurrentSpare(data?.maintStocksData[3]);
        // console.log(data);s
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [equip]);

  const handleSearchChange = (e) => {
    let targetData = [];
    let history = [];
    // const targetData = data.maintStocksData.filter(
    //   (item) =>
    //     item.SparePart_Code.includes(e.target.value) ||
    //     item.Description.includes(e.target.value)
    // );

    data.maintStocksData.map((item) => {
      if (
        !history.includes(item.SparePart_Code) &&
        (item.SparePart_Code.includes(e.target.value) ||
          item.Description.includes(e.target.value))
      ) {
        targetData.push(item);
        history.push(item.SparePart_Code);
      }
    });

    console.log(targetData);
    setSearchItems(targetData);
    setIsSearch(true);
  };

  const handleSearchClick = (item) => {
    setCurrentSpare(item);
    setIsSearch(false);
  };

  const handleTypeClick = (item) => {
    if (item.Type === "GearboxTrench") {
      navigate("/GearboxTrench");
    }
  };

  return {
    loading,
    data,
    currentSpare,
    copiedData,
    isSearch,
    searchItems,
    setData,
    setIsSearch,
    setCurrentSpare,
    handleSearchChange,
    handleSearchClick,
    handleTypeClick,
  };
};

export default useData;
