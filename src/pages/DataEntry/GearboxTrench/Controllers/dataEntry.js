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
  const [allData, setAllData] = useState([]);
  const [isEndDateChecked, setIsEndDateChecked] = useState(false);
  const [details, setDetails] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  // console.log(data);
  // console.log(allData);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!responseData.sitesData) {
          setLoading(true);
          setMessage(`Loading Selection Data...`);
          const URLs = [
            "/api/v1/getActiveTools",
            // "/api/v1/getBreakdowns",
            // "/api/v1/getUserSites",
          ];

          const responseData = await Promise.all(
            URLs.map((url) => {
              return axiosPrivate(url, {
                method: "POST",
                data: JSON.stringify({ username: usersData[0].username }),
              });
            })
          );

          // const detailResult = Object.keys(
          //   JSON.parse(responseData[0].data[0]?.Details)
          // );
          // setDetails(detailResult);
          // console.log(detailResult);

          // console.log({
          //   sitesResult: responseData[0].data,
          // });

          setSiteData({
            sitesResult: responseData[0].data,
          });
          responseData.sitesData = {
            sitesResult: responseData[0].data,
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
      if (dataKeys[i] === "Details") {
        let detailsKeys = details;
        // console.log(details);
        for (let j = 0; j < detailsKeys.length; j++) {
          if (
            !data.Details ||
            Object.keys(data.Details).length === 0 ||
            data.Details[detailsKeys[j]] === "" ||
            !data.Details[detailsKeys[j]]
          ) {
            flag = false;
            break;
          }
        }
      } else {
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
    }
    return flag;
  };

  const handleAdd = async () => {
    try {
      setLoading(true);
      setMessage(`Adding Data...`);
      // console.log({ ...data, Details: JSON.stringify(data.Details) });
      if (!validateData()) {
        throw new Error(`Validation Error`);
      } else {
        // const body = {
        //   UserName: usersData[0].username,
        //   TableName: "Maintenance",
        //   Data: JSON.stringify(data),
        //   Sent: "false",
        // };
        const result = { ...data, Details: JSON.stringify(data.Details) };
        const url = `/api/v3/EqsTools`;
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
    details,
    setDetails,
  };
};

export default useDataEntry;
