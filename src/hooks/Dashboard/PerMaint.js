import { useEffect } from "react";

import { useDashboardContext } from "../../contexts/DashboardContext";
import { useNavContext } from "../../contexts/NavContext";
import useAxiosPrivate from "../useAxiosPrivate";
// import usePrivateFetch from "../usePrivateFetch";
// import updateData from "../../Functions/updateData";

const usePerMaint = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const axiosPrivate = useAxiosPrivate();
  // const updateData = usePrivateFetch();
  const { token, usersData } = useNavContext();
  const {
    setError,
    setErrorDetails,
    setFieldsLoading,
    setFieldsData,
    setFieldsAllResults,
    cardsData,
  } = useDashboardContext();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getPerMaintData = async () => {
      if (usersData.length > 0) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({
            ...prev,
            PeriodicMaintenance: true,
          }));
          const url = `/api/v1/dashboardPerMaint`;
          const body = {
            usersData: usersData,
            filter:
              cardsData?.PeriodicMaintenance?.filter === "All"
                ? null
                : cardsData?.PeriodicMaintenance?.filter,
            dateTime: cardsData?.PeriodicMaintenance?.dateTime,
          };
          const result = await axiosPrivate(url, {
            signal: controller.signal,
            method: "POST",
            data: JSON.stringify(body),
          });
          setFieldsAllResults(result?.data);
          // console.log(result);
          let targetData = [];
          result?.data?.map((d) => {
            if (d.Type !== "Actual") {
              targetData.push({ ...d, color: "green" });
            } else {
              targetData.push({ ...d, color: "blue" });
            }

            return targetData;
          });
          setFieldsData((prev) => ({
            ...prev,
            PeriodicMaintenance: targetData,
          }));
          setFieldsLoading((prev) => ({
            ...prev,
            PeriodicMaintenance: false,
          }));
        } catch (err) {
          setError(true);
          setErrorDetails(err.message);
          setFieldsLoading((prev) => ({
            ...prev,
            PeriodicMaintenance: false,
          }));
        }
      }
    };
    getPerMaintData();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [cardsData.PeriodicMaintenance, usersData]);
};

export default usePerMaint;
