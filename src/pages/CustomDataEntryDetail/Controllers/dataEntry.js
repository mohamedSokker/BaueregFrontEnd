import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavContext } from "../../../contexts/NavContext";
import { regix } from "../Models/model";

const useDataEntry = ({ targetData }) => {
  const { usersData, setError, setErrorData, errorData } = useNavContext();
  const [data, setData] = useState({});
  const [dataCheck, setDataCheck] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(``);
  const [siteData, setSiteData] = useState([]);
  const [allData, setAllData] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getData = async () => {
      try {
        if (targetData) {
          setLoading(true);
          setMessage(`Loading Selection Data...`);
          const URLs = [];
          console.log(targetData[0]?.Fields);
          targetData &&
            targetData.length > 0 &&
            Object.keys(targetData[0]?.Fields)?.map((item) => {
              console.log(item);
              if (
                !URLs.includes(targetData[0]?.Fields[item].URL) &&
                targetData[0]?.Fields[item].Type === "DropDown"
              )
                URLs.push(targetData[0]?.Fields[item].URL);
            });

          console.log(URLs);

          const responseData = await Promise.all(
            URLs.map((url) => {
              return axiosPrivate(url, {
                method: "GET",
              });
            })
          );

          let result = {};
          let resultData = {};
          Object.keys(targetData[0]?.Fields).map((item) => {
            if (targetData[0]?.Fields[item].Type === "DropDown")
              result = {
                ...result,
                [item]:
                  responseData[URLs.indexOf(targetData[0]?.Fields[item].URL)]
                    .data,
              };
            if (targetData[0]?.Fields[item].Type === "Date") {
              resultData = {
                ...resultData,
                [item]: new Date().toISOString().slice(0, 10),
              };
            } else {
              resultData = { ...resultData, [item]: "" };
            }
          });

          setData(resultData);
          setSiteData(result);

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
    getData();
  }, [targetData]);

  const validateData = () => {
    const dataKeys = Object.keys(data);
    let flag = true;
    for (let i = 0; i < dataKeys.length; i++) {
      if (
        data[dataKeys[i]] === "" &&
        !targetData?.[0]?.Fields?.[dataKeys[i]]?.validationException
      ) {
        flag = false;
        break;
      }

      if (
        !regix[targetData?.[0]?.Fields?.[dataKeys[i]]?.validateString].test(
          data[dataKeys[i]]
        )
      ) {
        flag = false;
        break;
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
        let result = { ...data };
        Object.keys(targetData?.[0]?.Fields)?.map((item) => {
          if (targetData?.[0]?.Fields?.[item]?.Type === "Date") {
            if (targetData?.[0]?.Fields?.[item]?.isCheck) {
              result = {
                ...result,
                [item]: dataCheck?.[item] ? data?.[item] : null,
              };
            } else {
              result = {
                ...result,
                [item]: data?.[item],
              };
            }
          }
        });
        console.log(result);

        const url = `/api/v3/${targetData[0]?.Name}`;
        const response = await axiosPrivate(url, {
          method: "POST",
          data: JSON.stringify(result),
        });
        console.log(response?.data);
        // const eqsToolsLocURL = `/api/v3/EqsToolsLocHandleAdd`;
        // const eqsToolsLocResponse = await axiosPrivate(eqsToolsLocURL, {
        //   method: "POST",
        //   data: JSON.stringify(result),
        // });

        // console.log(eqsToolsLocResponse.data);
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
    errorData,
    setError,
    setErrorData,
    data,
    setData,
    setAllData,
    handleAdd,
    message,
    siteData,
    dataCheck,
    setDataCheck,
  };
};

export default useDataEntry;
