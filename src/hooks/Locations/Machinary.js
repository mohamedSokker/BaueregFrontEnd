import { useEffect } from "react";

import { useDashboardContext } from "../../contexts/DashboardContext";
import { useNavContext } from "../../contexts/NavContext";
import useAxiosPrivate from "../useAxiosPrivate";
// import updateData from "../../Functions/updateData";

const useMachinary = (tableName) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const axiosPrivate = useAxiosPrivate();
  const { token, usersData } = useNavContext();
  const {
    setError,
    setErrorDetails,
    setFieldsLoading,
    setFieldsData,
    setFieldsAllData,
    cardsData,
  } = useDashboardContext();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getMachinaryData = async () => {
      if (usersData) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, Machinary: true }));
          const url = `/api/v1/sitesMachinary`;
          const body = {
            Location: tableName,
          };
          const result = await axiosPrivate(url, {
            signal: controller.signal,
            method: "POST",
            data: JSON.stringify(body),
          });
          setFieldsAllData((prev) => ({
            ...prev,
            Machinary: result?.data,
          }));
          setFieldsData((prev) => ({
            ...prev,
            Machinary: result?.data?.per,
          }));
          setFieldsLoading((prev) => ({ ...prev, Machinary: false }));
        } catch (err) {
          setError(true);
          setErrorDetails(err.message);
          setFieldsLoading((prev) => ({ ...prev, Machinary: false }));
        }
      }
    };
    getMachinaryData();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [cardsData.Machinary, usersData, tableName]);
};

export default useMachinary;
