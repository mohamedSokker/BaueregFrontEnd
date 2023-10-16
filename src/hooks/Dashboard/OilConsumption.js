import { useEffect } from "react";

import { useDashboardContext } from "../../contexts/DashboardContext";
import { useNavContext } from "../../contexts/NavContext";
import useAxiosPrivate from "../useAxiosPrivate";
// import usePrivateFetch from "../usePrivateFetch";
// import updateData from "../../Functions/updateData";

const useOilConsumption = () => {
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
    const getoilConsData = async () => {
      if (usersData.length > 0) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, OilConsumption: true }));
          setFieldsPerLoading((prev) => ({ ...prev, OilConsumption: true }));
          const url = `/api/v1/dashboardOil`;
          const body = {
            usersData: usersData,
            filter:
              cardsData?.OilConsumption?.filter === "All"
                ? null
                : cardsData?.OilConsumption?.filter,
            dateTime: cardsData?.OilConsumption?.dateTime,
          };
          const result = await axiosPrivate(url, {
            signal: controller.signal,
            method: "POST",
            data: JSON.stringify(body),
          });
          let data = [];
          result?.data?.data?.map((item) => {
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
          result?.data?.data?.map((item) => {
            dataX.push(formatDate(item.Date));
            return dataX;
          });
          setFieldsXData((prev) => ({
            ...prev,
            OilConsumption: dataX,
          }));
          let dataY = [];
          result?.data?.data?.map((item) => {
            dataY.push(Number(item.TotalConsumption));
            return dataY;
          });
          setFieldsYData((prev) => ({
            ...prev,
            OilConsumption: dataY,
          }));
          setFieldsData((prev) => ({
            ...prev,
            OilConsumption: formatNo(result?.data?.per),
          }));
          setFieldsPerData((prev) => ({
            ...prev,
            OilConsumption: result?.data?.diff,
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
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [cardsData.OilConsumption, usersData]);
};

export default useOilConsumption;
