import { useEffect } from "react";

import { useDashboardContext } from "../../contexts/DashboardContext";
import { useNavContext } from "../../contexts/NavContext";
import useAxiosPrivate from "../useAxiosPrivate";
// import updateData from "../../Functions/updateData";

const useEquipments = (tableName) => {
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
    const getEqsData = async () => {
      if (usersData) {
        try {
          setError(false);
          setFieldsLoading((prev) => ({ ...prev, Equipments: true }));
          const url = `/api/v1/sitesEqs`;
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
            Equipments: result?.data,
          }));
          setFieldsData((prev) => ({
            ...prev,
            Equipments: result?.data?.per,
          }));
          setFieldsLoading((prev) => ({ ...prev, Equipments: false }));
        } catch (err) {
          setError(true);
          setErrorDetails(err.message);
          setFieldsLoading((prev) => ({ ...prev, Equipments: false }));
        }
      }
    };
    getEqsData();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [cardsData.Equipments, usersData, tableName]);
};

export default useEquipments;
