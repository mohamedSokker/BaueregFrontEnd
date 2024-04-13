import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useNavContext } from "../../../../contexts/NavContext";
import {
  initialAllData,
  initialData,
  initialPerMaintData,
  initialSaved,
  jsonifyArray,
  regix,
  responseData,
  validationException,
} from "../Model/model";

const useDataEntry = () => {
  const { usersData, setError, setErrorData, errorData } = useNavContext();
  const [data, setData] = useState(initialData);
  const [perMaintData, setPerMaintData] = useState(initialPerMaintData);
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(``);
  const [perLoading, setPerLoading] = useState(false);
  const [siteData, setSiteData] = useState([]);
  const [allData, setAllData] = useState(initialAllData);

  const axiosPrivate = useAxiosPrivate();

  // console.log(data);
  console.log(allData);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!responseData.sitesData) {
          setLoading(true);
          setMessage(`Loading Selection Data...`);
          const url = `/api/v1/getActiveData`;
          const result = await axiosPrivate(url, {
            method: "POST",
            data: JSON.stringify({ username: usersData[0].username }),
          });
          // console.log(result.data);
          setSiteData(result?.data);
          responseData.sitesData = result?.data;
          setLoading(false);
        } else {
          setSiteData(responseData.sitesData);
        }
      } catch (err) {
        setErrorData((prev) => [
          ...prev,
          err?.response?.data?.message
            ? err?.response?.data?.message
            : err?.message,
        ]);
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (
      data[`Periodic Maintenance Interval`] === "250" &&
      data.Equipment_Model.startsWith("MC")
    ) {
      setPerLoading(true);
      setSaved((prev) => ({ ...prev, MC250: true }));
    }
    if (
      data[`Periodic Maintenance Interval`] === "250" &&
      data.Equipment_Model.startsWith("BC")
    ) {
      setPerLoading(true);
      setSaved((prev) => ({ ...prev, BC250: true }));
    }
    if (
      data[`Periodic Maintenance Interval`] === "250" &&
      data.Equipment_Model.startsWith("BG")
    ) {
      setPerLoading(true);
      setSaved((prev) => ({ ...prev, BG250: true }));
    }
    if (
      data[`Periodic Maintenance Interval`] === "1000" &&
      data.Equipment_Model.startsWith("MC")
    ) {
      setPerLoading(true);
      setSaved((prev) => ({ ...prev, MC250: true, MC1000: true }));
    }
    if (
      data[`Periodic Maintenance Interval`] === "1000" &&
      data.Equipment_Model.startsWith("BC")
    ) {
      setPerLoading(true);
      setSaved((prev) => ({ ...prev, BC250: true, BC1000: true }));
    }
    if (
      data[`Periodic Maintenance Interval`] === "1000" &&
      data.Equipment_Model.startsWith("BG")
    ) {
      setPerLoading(true);
      setSaved((prev) => ({ ...prev, BG250: true, BG1000: true }));
    }
    if (
      data[`Periodic Maintenance Interval`] === "2000" &&
      data.Equipment_Model.startsWith("MC")
    ) {
      setPerLoading(true);
      setSaved((prev) => ({
        ...prev,
        MC250: true,
        MC1000: true,
        MC2000: true,
      }));
    }
    if (
      data[`Periodic Maintenance Interval`] === "2000" &&
      data.Equipment_Model.startsWith("BC")
    ) {
      setPerLoading(true);
      setSaved((prev) => ({
        ...prev,
        BC250: true,
        BC1000: true,
        BC2000: true,
      }));
    }
    if (
      data[`Periodic Maintenance Interval`] === "2000" &&
      data.Equipment_Model.startsWith("BG")
    ) {
      setPerLoading(true);
      setSaved((prev) => ({
        ...prev,
        BG250: true,
        BG1000: true,
        BG2000: true,
      }));
    }
  }, [data["Periodic Maintenance Interval"]]);

  useEffect(() => {
    if (data["Periodic Maintenance Interval"] !== "")
      setData((prev) => ({
        ...prev,
        Action: JSON.stringify(perMaintData),
        Problem: `Periodic Maintenance ${data["Periodic Maintenance Interval"]}`,
      }));
  }, [perMaintData]);

  const validateData = () => {
    const dataKeys = Object.keys(data);
    let flag = true;
    for (let i = 0; i < dataKeys.length; i++) {
      if (
        data[dataKeys[i]] === "" &&
        !validationException.includes(dataKeys[i])
      ) {
        flag = false;
        break;
      }
      if (regix[dataKeys[i]]) {
        console.log(regix[dataKeys[i]]);
        if (!regix[dataKeys[i]].test(data[dataKeys[i]])) {
          flag = false;
          break;
        }
      }
    }
    return flag;
  };

  const handleAdd = async () => {
    try {
      setLoading(true);
      setMessage(`Adding Data...`);
      if (!validateData()) {
        throw new Error(`Validation Error`);
      } else {
        const body = {
          UserName: usersData[0].username,
          TableName: "Maintenance",
          Data: JSON.stringify(data),
          Sent: "false",
        };
        const url = `/api/v3/QCTable`;
        const response = await axiosPrivate(url, {
          method: "POST",
          data: JSON.stringify(body),
        });
        console.log(response);
        setLoading(false);
      }
    } catch (err) {
      setErrorData((prev) => [
        ...prev,
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message,
      ]);
      setLoading(false);
    }
  };

  return {
    loading,
    perLoading,
    allData,
    // getChildData,
    errorData,
    setError,
    setErrorData,
    data,
    setData,
    setAllData,
    saved,
    setPerMaintData,
    setPerLoading,
    setSaved,
    handleAdd,
    message,
    siteData,
  };
};

export default useDataEntry;
