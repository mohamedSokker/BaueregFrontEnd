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
  const [isEndWHChecked, setIsEndWHChecked] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  // console.log(data);
  // console.log(allData);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!responseData.sitesData) {
          setLoading(true);
          setMessage(`Loading Selection Data...`);
          const URLs = ["/api/v1/getActiveTools", "/api/v1/getActiveData"];

          const responseData = await Promise.all(
            URLs.map((url) => {
              return axiosPrivate(url, {
                method: "POST",
                data: JSON.stringify({ username: usersData[0].username }),
              });
            })
          );

          console.log({
            sitesResult: responseData[0].data,
            EqsLocResult: responseData[1].data,
          });

          setSiteData({
            sitesResult: responseData[0].data,
            EqsLocResult: responseData[1].data,
          });
          responseData.sitesData = {
            sitesResult: responseData[0].data,
            EqsLocResult: responseData[1].data,
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
        let result = isEndDateChecked ? data : { ...data, End_Date: null };
        result = isEndWHChecked ? result : { ...result, End_WH: null };
        console.log(result);

        const eqsToolsLocURL = `/api/v3/EqsToolsLocHandleAdd`;
        const eqsToolsLocResponse = await axiosPrivate(eqsToolsLocURL, {
          method: "POST",
          data: JSON.stringify(result),
        });

        console.log(eqsToolsLocResponse.data);
        // const eqsToolsLoc = eqsToolsLocResponse.data;

        // const targetEqsToolsLoc = eqsToolsLoc.filter(
        //   (item) =>
        //     item.Type === data.Type &&
        //     item.Code === data.Code &&
        //     item.End_Date === null
        // );

        // console.log(targetEqsToolsLoc);

        // await axiosPrivate(eqsToolsLocURL, {
        //   method: "POST",
        //   data: JSON.stringify(result),
        // });

        // targetEqsToolsLoc.length > 0 && await axiosPrivate(`${eqsToolsLocURL}/Many`, {
        //   method: "PUT",
        //   data: JSON.stringify(targetEqsToolsLoc),
        // });
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
    isEndWHChecked,
    setIsEndWHChecked,
  };
};

export default useDataEntry;
