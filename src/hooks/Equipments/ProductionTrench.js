import { useEffect } from "react";

import { useDashboardContext } from "../../contexts/DashboardContext";
import { useNavContext } from "../../contexts/NavContext";
import useAxiosPrivate from "../useAxiosPrivate";
// import updateData from "../../Functions/updateData";

const useProductionTrench = (tableName) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const axiosPrivate = useAxiosPrivate();
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
    const getProdTrenchData = async () => {
      if (usersData) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, ProductionTrench: true }));
          setFieldsPerLoading((prev) => ({ ...prev, ProductionTrench: true }));
          const url = `/api/v1/eqProduction`;
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
          const result = await axiosPrivate(url, {
            signal: controller.signal,
            method: "POST",
            data: JSON.stringify(body),
          });
          setFieldsAllResults(result?.data);
          let data = [];
          result?.data?.data?.map((item) => {
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
          result?.data?.data?.map((item) => {
            dataX.push(formatDate(item["Pouring Finish"]));
            return dataX;
          });
          setFieldsXData((prev) => ({
            ...prev,
            ProductionTrench: dataX,
          }));
          let dataY = [];
          result?.data?.data?.map((item) => {
            dataY.push(Number(item["Actual M2"]));
            return dataY;
          });
          setFieldsYData((prev) => ({
            ...prev,
            ProductionTrench: dataY,
          }));
          setFieldsData((prev) => ({
            ...prev,
            ProductionTrench: formatNo(result?.data?.per),
          }));
          setFieldsPerData((prev) => ({
            ...prev,
            ProductionTrench: result?.data?.diff,
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
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [cardsData.ProductionTrench, usersData, tableName]);
};

export default useProductionTrench;
