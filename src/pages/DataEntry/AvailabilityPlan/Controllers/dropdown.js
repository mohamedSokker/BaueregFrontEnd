import React, { useEffect, useState } from "react";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { jsonifyArray } from "../Model/model";

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
