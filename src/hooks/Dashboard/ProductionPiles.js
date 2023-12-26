import { useEffect } from "react";

import { useDashboardContext } from "../../contexts/DashboardContext";
import { useNavContext } from "../../contexts/NavContext";
import useAxiosPrivate from "../useAxiosPrivate";
// import usePrivateFetch from "../usePrivateFetch";
// import updateData from "../../Functions/updateData";

const useProductionPiles = () => {
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
    setFieldsAllResults,
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
    const getProducationTrenchData = async () => {
      if (usersData.length > 0) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, ProductionPiles: true }));
          setFieldsPerLoading((prev) => ({ ...prev, ProductionPiles: true }));
          const url = `/api/v1/dashboardProduction`;
          const body = {
            usersData: usersData,
            filter:
              cardsData?.ProductionPiles?.filter === "All"
                ? null
                : cardsData?.ProductionPiles?.filter,
            dateTime: cardsData?.ProductionPiles?.dateTime,
            Type: "Drilling_Machine",
          };
          const result = await axiosPrivate(url, {
            signal: controller.signal,
            method: "POST",
            data: JSON.stringify(body),
          });
          setFieldsAllResults((prev) => ({
            ...prev,
            ProductionPiles: result?.data?.data,
          }));
          console.log(result);
          let data = [];
          result?.data?.data?.map((item) => {
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
          result?.data?.data?.map((item) => {
            dataX.push(formatDate(item["Pouring Finish"]));
            return dataX;
          });
          setFieldsXData((prev) => ({
            ...prev,
            ProductionPiles: dataX,
          }));
          let dataY = [];
          result?.data?.data?.map((item) => {
            dataY.push(Number(item["Actual Depth"]));
            return dataY;
          });
          setFieldsYData((prev) => ({
            ...prev,
            ProductionPiles: dataY,
          }));
          setFieldsData((prev) => ({
            ...prev,
            ProductionPiles: formatNo(result?.data?.per),
          }));
          setFieldsPerData((prev) => ({
            ...prev,
            ProductionPiles: result?.data?.diff,
          }));
          setFieldsLoading((prev) => ({ ...prev, ProductionPiles: false }));
          setFieldsPerLoading((prev) => ({
            ...prev,
            ProductionPiles: false,
          }));
        } catch (err) {
          setError(true);
          setErrorDetails(err.message);
          setFieldsLoading((prev) => ({ ...prev, ProductionPiles: false }));
          setFieldsPerLoading((prev) => ({
            ...prev,
            ProductionPiles: false,
          }));
        }
      }
    };
    getProducationTrenchData();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [cardsData.ProductionPiles, usersData]);
};

export default useProductionPiles;
