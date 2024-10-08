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
  const [isEndDateChecked, setIsEndDateChecked] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  // console.log(data);
  console.log(allData);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!responseData.sitesData) {
          setLoading(true);
          setMessage(`Loading Selection Data...`);
          const URLs = [
            "/api/v1/getActiveData",
            "/api/v3/Location_Bauer",
            "/api/v1/getUserSites",
          ];

          const responseData = await Promise.all(
            URLs.map((url) => {
              if (url === "/api/v3/Location_Bauer") {
                return axiosPrivate(url, {
                  method: "GET",
                });
              } else {
                return axiosPrivate(url, {
                  method: "POST",
                  data: JSON.stringify({ username: usersData[0].username }),
                });
              }
            })
          );

          setSiteData({
            sitesResult: responseData[0].data,
            usersResult: responseData[2].data,
            allSites: responseData[1].data,
          });
          responseData.sitesData = {
            sitesResult: responseData[0].data,
            usersResult: responseData[2].data,
            allSites: responseData[1].data,
          };
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
        // const body = {
        //   UserName: usersData[0].username,
        //   TableName: "Maintenance",
        //   Data: JSON.stringify(data),
        //   Sent: "false",
        // };
        const result = isEndDateChecked ? data : { ...data, End_Date: null };
        const url = `/api/v3/dataEntryHandleAddEqLocation`;
        const response = await axiosPrivate(url, {
          method: "POST",
          data: JSON.stringify(result),
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
    isEndDateChecked,
    setIsEndDateChecked,
  };
};

export default useDataEntry;
