import { useEffect } from "react";

import { useDashboardContext } from "../../contexts/DashboardContext";
import { useNavContext } from "../../contexts/NavContext";
import useAxiosPrivate from "../useAxiosPrivate";
// import usePrivateFetch from "../usePrivateFetch";
// import updateData from "../../Functions/updateData";

const useFuelConsumption = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const axiosPrivate = useAxiosPrivate();
  // const updateData = usePrivateFetch();
  const { token, usersData } = useNavContext();
  const {
    setError,
    setErrorDetails,
    setFieldsLoading,
    setFieldsPerLoading,
    setFieldsAllData,
    setFieldsXData,
    setFieldsYData,
    setFieldsData,
    setFieldsPerData,
    cardsData,
  } = useDashboardContext();

  const formatDate = (anyDate) => {
    let dt = new Date(anyDate);
    const year = dt.getFullYear();
    const day = dt.getDate();
    let month = (Number(dt.getMonth()) + 1).toString();
    if (month.length < 2) month = `0${month}`;
    return `${year}-${month}-${day}`;
  };

  const formatNo = (No) => {
    if (No >= 1000000) {
      return `${Number(No / 1000000).toFixed(2)} M`;
    } else if (No >= 1000) {
      return `${Math.floor(No / 1000)} K`;
    } else {
      return No;
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getfuelConsData = async () => {
      if (usersData.length > 0) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, FuelConsumption: true }));
          setFieldsPerLoading((prev) => ({ ...prev, FuelConsumption: true }));
          const url = `/api/v1/dashboardFuel`;
          const body = {
            usersData: usersData,
            filter:
              cardsData?.FuelConsumption?.filter === "All"
                ? null
                : cardsData?.FuelConsumption?.filter,
            dateTime: cardsData?.FuelConsumption?.dateTime,
          };
          const result = await axiosPrivate(url, {
            signal: controller.signal,
            method: "POST",
            data: JSON.stringify(body),
          });
          let data = [];
          result?.data?.data?.map((item) => {
            data.push({ x: formatDate(item.Date), y: Number(item.Quantity) });
            return data;
          });
          setFieldsAllData((prev) => ({
            ...prev,
            FuelConsumption: data,
          }));
          let dataX = [];
          result?.data?.data?.map((item) => {
            dataX.push(formatDate(item.Date));
            return dataX;
          });
          setFieldsXData((prev) => ({
            ...prev,
            FuelConsumption: dataX,
          }));
          let dataY = [];
          result?.data?.data?.map((item) => {
            dataY.push(Number(item.Quantity));
            return dataY;
          });
          setFieldsYData((prev) => ({
            ...prev,
            FuelConsumption: dataY,
          }));
          setFieldsData((prev) => ({
            ...prev,
            FuelConsumption: formatNo(result?.data?.per),
          }));
          setFieldsPerData((prev) => ({
            ...prev,
            FuelConsumption: formatNo(result?.data?.diff),
          }));
          setFieldsLoading((prev) => ({ ...prev, FuelConsumption: false }));
          setFieldsPerLoading((prev) => ({
            ...prev,
            FuelConsumption: false,
          }));
        } catch (err) {
          setError(true);
          setErrorDetails(err.message);
          setFieldsLoading((prev) => ({ ...prev, FuelConsumption: false }));
          setFieldsPerLoading((prev) => ({
            ...prev,
            FuelConsumption: false,
          }));
        }
      }
    };
    getfuelConsData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [cardsData.FuelConsumption, usersData]);
};

export default useFuelConsumption;
