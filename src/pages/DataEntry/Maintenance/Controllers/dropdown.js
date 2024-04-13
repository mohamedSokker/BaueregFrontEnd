import React, { useEffect, useState } from "react";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { jsonifyArray, perMaintPlan } from "../Model/model";
import { AllStocks } from "../../../../data/Tablesdata";

const useDropdown = ({
  label,
  URL,
  column,
  local,
  localData,
  data,
  setData,
  siteData,
  setAllData,
  // getChildData,
  condition,
  setErrorData,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [datas, setDatas] = useState([]);
  const [datasLoading, setDatasLoading] = useState(false);

  const handleClick = async () => {
    try {
      if (!condition) throw new Error(`Can't choose ${label} right away`);
      if (local) {
        setDatasLoading(true);
        setDatas(localData);
        switch (label) {
          case "Location":
            let sites = [];

            sites = siteData?.usersResult
              ? siteData?.usersResult?.split(",")
              : [];
            if (sites)
              sites = sites?.filter(
                (value, index, array) => array.indexOf(value) === index
              );
            setAllData((prev) => ({
              ...prev,
              sites: jsonifyArray(sites, "Location"),
            }));
            setData((prev) => ({
              ...prev,
              Equipment_Type: "",
              Equipment_Model: "",
              Equipment: "",
            }));
            break;
          case "Equipment_Type":
            let eqType = [];
            const sitesFilter = siteData?.sitesResult
              ? siteData?.sitesResult?.filter(
                  (site) => site?.Location === data?.Location
                )
              : [];
            sitesFilter?.map((d) => {
              eqType.push(d.Equipment_Type);
            });

            if (eqType)
              eqType = eqType?.filter(
                (value, index, array) => array.indexOf(value) === index
              );
            setAllData((prev) => ({
              ...prev,
              eqsType: jsonifyArray(eqType, "Equipment_Type"),
            }));
            setData((prev) => ({
              ...prev,
              Equipment_Model: "",
              Equipment: "",
            }));
            break;
          case "Equipment_Model":
            let eqModel = [];
            const sitesFilterEqsModel = siteData?.sitesResult
              ? siteData?.sitesResult?.filter(
                  (site) =>
                    site?.Location === data?.Location &&
                    site?.Equipment_Type === data.Equipment_Type
                )
              : [];
            sitesFilterEqsModel?.map((d) => {
              eqModel.push(d.Equipment_Model);
            });
            if (eqModel)
              eqModel = eqModel?.filter(
                (value, index, array) => array.indexOf(value) === index
              );
            setAllData((prev) => ({
              ...prev,
              eqsModel: jsonifyArray(eqModel, "Equipment_Model"),
            }));
            setData((prev) => ({
              ...prev,
              Equipment: "",
            }));
            break;
          case "Equipment":
            let eq = [];
            const sitesFilterEqs = siteData?.sitesResult
              ? siteData?.sitesResult?.filter(
                  (site) =>
                    site?.Location === data?.Location &&
                    site?.Equipment_Type === data.Equipment_Type &&
                    site?.Equipment_Model === data.Equipment_Model
                )
              : [];
            sitesFilterEqs?.map((d) => {
              eq.push(d.Equipment);
            });

            if (eq)
              eq = eq?.filter(
                (value, index, array) => array.indexOf(value) === index
              );
            setAllData((prev) => ({
              ...prev,
              eqs: jsonifyArray(eq, "Equipment"),
            }));
            break;
          case "Store":
            setAllData((prev) => ({
              ...prev,
              store: jsonifyArray(AllStocks, `stock`),
            }));
            break;
          case "Periodic Maintenance Interval":
            setAllData((prev) => ({
              ...prev,
              "Periodic Maintenance Interval": perMaintPlan,
            }));
            break;
          case "Breakdown_Type":
            const sitesFilterBdType = siteData?.allBreakdownTypes
              ? siteData?.allBreakdownTypes
              : [];
            setAllData((prev) => ({
              ...prev,
              Breakdown_Type: sitesFilterBdType,
            }));
            break;
        }
        setDatasLoading(false);
      } else if (localData.length === 0) {
        setDatasLoading(true);
        const url = URL;
        const result = await axiosPrivate(url, {
          //   signal: controller.signal,
          method: "GET",
        });
        const response = result?.data;
        setAllData((prev) => ({ ...prev, Breakdown_Type: result?.data }));
      }
    } catch (err) {
      setErrorData((prev) => [
        ...prev,
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message,
      ]);
    } finally {
      setDatasLoading(false);
    }
  };

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [label]: e.target.value }));
  };

  return { datas, datasLoading, handleChange, handleClick };
};

export default useDropdown;
