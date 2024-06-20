import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useNavContext } from "../../../../contexts/NavContext";
import { AllStocks } from "../../../../data/Tablesdata";
import {
  initialAllData,
  initialData,
  initialPerMaintData,
  initialSaved,
  jsonifyArray,
  regix,
  responseData,
  perMaintPlan,
  validationException,
} from "../Model/model";

const useEditDataEntry = ({ editData }) => {
  const { usersData, setError, setErrorData, errorData } = useNavContext();
  const [data, setData] = useState([]);
  const [perMaintData, setPerMaintData] = useState(initialPerMaintData);
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(``);
  const [perLoading, setPerLoading] = useState(false);
  const [siteData, setSiteData] = useState([]);
  const [sites, setSites] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isEndDateChecked, setIsEndDateChecked] = useState(false);
  const [details, setDetails] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  console.log(data);

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

  useEffect(() => {
    let sitesFilter = siteData?.sitesResult ? siteData?.sitesResult : [];

    sitesFilter = sitesFilter?.filter(
      (value, index, array) => array.indexOf(value) === index
    );

    setAllData((prev) => ({
      ...prev,
      sites: sitesFilter,
    }));

    const targetType = siteData?.sitesResult?.filter(
      (item) => item.Type === data.Type
    );
    const detailResult =
      targetType && Object.keys(JSON.parse(targetType[0]?.Details));
    setDetails(detailResult);

    editData.Details &&
      setData({ ...editData, Details: JSON.parse(editData.Details) });
  }, [siteData]);

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

  const handleEdit = async () => {
    try {
      setLoading(true);
      setMessage(`Editing Data...`);
      if (!validateData()) {
        throw new Error(`Validation Error`);
      } else {
        // console.log({ ...data, Details: JSON.stringify(data.Details) });
        // const body = {
        //   UserName: usersData[0].username,
        //   TableName: "Maintenance",
        //   Data: JSON.stringify(data),
        // };
        const result = { ...data, Details: JSON.stringify(data.Details) };
        // console.log(result);
        const url = `/api/v3/EqsTools/${data.ID}`;
        const response = await axiosPrivate(url, {
          method: "PUT",
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

  const handleDelete = async () => {
    try {
      setLoading(true);
      setMessage(`Deleting Data...`);
      // console.log(data.ID);

      const url = `/api/v3/EqsTools/${data.ID}`;
      const response = await axiosPrivate(url, {
        method: "DELETE",
      });
      console.log(response);
      setLoading(false);
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
    handleEdit,
    handleDelete,
    message,
    siteData,
    isEndDateChecked,
    setIsEndDateChecked,
    details,
    setDetails,
  };
};

export default useEditDataEntry;
