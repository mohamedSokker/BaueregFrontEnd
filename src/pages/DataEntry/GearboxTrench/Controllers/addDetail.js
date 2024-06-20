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

const useAddDetail = () => {
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

  useEffect(() => {
    const getData = async () => {
      try {
        if (!responseData.sitesData) {
          setLoading(true);
          setMessage(`Loading Selection Data...`);
          const URLs = ["/api/v1/getActiveTools"];

          const responseData = await Promise.all(
            URLs.map((url) => {
              return axiosPrivate(url, {
                method: "POST",
                data: JSON.stringify({ username: usersData[0].username }),
              });
            })
          );

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

  const handleAdd = async () => {
    try {
      setLoading(true);
      setMessage(`Adding Data...`);

      const targetData = siteData?.sitesResult
        ?.filter((item) => item.Type === data.Type)
        .sort((a, b) => a.ID - b.ID)[0];

      const targetDetail = {
        ...data.Details,
        ...JSON.parse(targetData.Details),
      };

      //   console.log({
      //     ...data,
      //     Code: targetData.Code,
      //     Serial: targetData.Serial,
      //     Details: JSON.stringify(targetDetail),
      //   });

      const result = {
        ...data,
        Code: targetData.Code,
        Serial: targetData.Serial,
        Details: JSON.stringify(targetDetail),
      };
      const url = `/api/v3/EqsTools/${targetData.ID}`;
      const response = await axiosPrivate(url, {
        method: "PUT",
        data: JSON.stringify(result),
      });
      console.log(response);
      setLoading(false);
      //   }
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

export default useAddDetail;
