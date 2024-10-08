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
          case "Invoices":
            let sites = [];
            console.log(siteData);
            siteData?.sitesResult.map((item) => {
              sites.push(item.InvoiceNo);
            });
            // sites = siteData?.usersResult ? siteData?.usersResult : [];
            if (sites)
              sites = sites?.filter(
                (value, index, array) => array.indexOf(value) === index
              );
            setAllData((prev) => ({
              ...prev,
              sites: jsonifyArray(sites, "InvoiceNo"),
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
