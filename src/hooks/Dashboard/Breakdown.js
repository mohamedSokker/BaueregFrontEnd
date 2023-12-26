import { useEffect } from "react";

import { useDashboardContext } from "../../contexts/DashboardContext";
import { useNavContext } from "../../contexts/NavContext";
import useAxiosPrivate from "../useAxiosPrivate";
// import usePrivateFetch from "../usePrivateFetch";
// import updateData from "../../Functions/updateData";

const useBreakdown = () => {
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
    const getbreakdownData = async () => {
      if (usersData.length > 0) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, Breakdowns: true }));
          const url = `/api/v1/dashboardBreakdown`;
          const body = {
            usersData: usersData,
            filter:
              cardsData?.Breakdowns?.filter === "All"
                ? null
                : cardsData?.Breakdowns?.filter,
            dateTime: cardsData?.Breakdowns?.dateTime,
          };
          const result = await axiosPrivate(url, {
            signal: controller.signal,
            method: "POST",
            data: JSON.stringify(body),
          });
          setFieldsAllResults((prev) => ({
            ...prev,
            Breakdowns: result?.data?.data,
          }));
          setFieldsData((prev) => ({
            ...prev,
            Breakdowns: result?.data?.graphData,
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
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [cardsData.Breakdowns, usersData]);
};

export default useBreakdown;
