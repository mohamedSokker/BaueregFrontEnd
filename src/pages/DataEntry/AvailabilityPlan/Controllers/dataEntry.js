import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useNavContext } from "../../../../contexts/NavContext";
import {
  initialAllData,
  initialData,
  regix,
  responseData,
} from "../Model/model";

const useDataEntry = () => {
  const { usersData, setError, setErrorData, errorData } = useNavContext();
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(``);
  const [siteData, setSiteData] = useState([]);
  const [allData, setAllData] = useState(initialAllData);

  const axiosPrivate = useAxiosPrivate();

  console.log(data);
  //   console.log(allData);

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

  const validateData = () => {
    const dataKeys = Object.keys(data);
    let flag = true;
    for (let i = 0; i < dataKeys.length; i++) {
      if (data[dataKeys[i]] === "") {
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
        // console.log(data);
        const url = `/api/v3/dataEntryHandleAvPlan`;
        const response = await axiosPrivate(url, {
          method: "POST",
          data: JSON.stringify(data),
        });
        console.log(response.data);
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
    allData,
    // getChildData,
    errorData,
    setError,
    setErrorData,
    data,
    setData,
    setAllData,
    handleAdd,
    message,
    siteData,
  };
};

export default useDataEntry;
