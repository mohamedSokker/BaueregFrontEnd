import React, { useEffect, useState } from "react";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { jsonifyArray, perMaintPlan } from "../Model/model";
import { AllStocks } from "../../../../data/Tablesdata";

const useDropdownText = ({
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
  setDetails,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [datas, setDatas] = useState([]);
  const [datasLoading, setDatasLoading] = useState(false);
  const [isDropped, setIsDropped] = useState(false);

  console.log(isDropped);

  const handleClick = async (e) => {
    try {
      if (!condition) throw new Error(`Can't choose ${label} right away`);
      if (local) {
        setDatasLoading(true);
        setDatas(localData);
        switch (label) {
          case "Type":
            let sites = [];
            // console.log(siteData);
            siteData?.sitesResult.map((item) => {
              sites.push(item.Type);
            });

            if (sites)
              sites = sites?.filter(
                (value, index, array) => array.indexOf(value) === index
              );
            console.log(sites);
            sites = sites.filter((item) =>
              item.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setAllData((prev) => ({
              ...prev,
              sites: jsonifyArray(sites, "Type"),
            }));

            break;
        }
        setDatasLoading(false);
        if (e.target.value === "") {
          setData((prev) => ({
            ...prev,
            [label]: e.target.value,
            Details: {},
          }));
          setDetails([]);
          setIsDropped(false);
        } else {
          setData((prev) => ({
            ...prev,
            [label]: e.target.value,
          }));
          setIsDropped(true);
        }
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

  const handleMenuClick = async () => {
    try {
      if (!condition) throw new Error(`Can't choose ${label} right away`);
      if (local) {
        setDatasLoading(true);
        setDatas(localData);
        switch (label) {
          case "Type":
            let sites = [];
            // console.log(siteData);
            siteData?.sitesResult.map((item) => {
              sites.push(item.Type);
            });

            if (sites)
              sites = sites?.filter(
                (value, index, array) => array.indexOf(value) === index
              );
            setAllData((prev) => ({
              ...prev,
              sites: jsonifyArray(sites, "Type"),
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
      setIsDropped((prev) => !prev);
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

  //   const handleChange = (e) => {
  //     const targetType = siteData?.sitesResult.filter(
  //       (item) => item.Type === e.target.value
  //     );
  //     const detailResult = Object.keys(JSON.parse(targetType[0]?.Details));
  //     setDetails(detailResult);
  //     let detailsObject = {};
  //     detailResult.map((item) => {
  //       detailsObject = { ...detailsObject, [item]: "" };
  //     });
  //     setData((prev) => ({
  //       ...prev,
  //       [label]: e.target.value,
  //       Details: detailsObject,
  //     }));
  //     setIsDropped(false);
  //   };

  const handleDropClick = (data) => {
    // console.log(data);
    const targetType = siteData?.sitesResult.filter(
      (item) => item.Type === data
    );
    const detailResult = Object.keys(JSON.parse(targetType[0]?.Details));
    setDetails(detailResult);
    let detailsObject = {};
    detailResult.map((item) => {
      detailsObject = { ...detailsObject, [item]: "" };
    });
    setData((prev) => ({
      ...prev,
      [label]: data,
      Details: detailsObject,
    }));
    setIsDropped(false);
  };

  return {
    datas,
    datasLoading,
    isDropped,
    setIsDropped,
    handleClick,
    handleDropClick,
    handleMenuClick,
  };
};

export default useDropdownText;
