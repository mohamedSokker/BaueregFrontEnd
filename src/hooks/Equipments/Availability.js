import { useEffect } from "react";

import { useDashboardContext } from "../../contexts/DashboardContext";
import { useNavContext } from "../../contexts/NavContext";
import useAxiosPrivate from "../useAxiosPrivate";
// import updateData from "../../Functions/updateData";

const useAvailability = (tableName) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const axiosPrivate = useAxiosPrivate();
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

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getAvData = async () => {
      if (usersData) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, Availability: true }));
          setFieldsPerLoading((prev) => ({ ...prev, Availability: true }));
          const url = `/api/v1/eqAv`;
          const body = {
            usersData: usersData,
            filter:
              cardsData?.Availability?.filter === "All"
                ? null
                : cardsData?.Availability?.filter,
            dateTime: cardsData?.Availability?.dateTime,
            Equipment: tableName,
          };
          const result = await axiosPrivate(url, {
            signal: controller.signal,
            method: "POST",
            data: JSON.stringify(body),
          });
          let data = [];
          result?.data?.data?.map((item) => {
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
          result?.data?.data?.map((item) => {
            dataX.push(item.Date_Time);
            return dataX;
          });
          setFieldsXData((prev) => ({
            ...prev,
            Availability: dataX,
          }));
          let dataY = [];
          result?.data?.data?.map((item) => {
            dataY.push(Number(item.Maintenance_Availability));
            return dataY;
          });
          setFieldsYData((prev) => ({
            ...prev,
            Availability: dataY,
          }));
          setFieldsData((prev) => ({
            ...prev,
            Availability: result?.data?.per,
          }));
          setFieldsPerData((prev) => ({
            ...prev,
            Availability: result?.data?.diff,
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
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [cardsData.Availability, usersData, tableName]);
};

export default useAvailability;
