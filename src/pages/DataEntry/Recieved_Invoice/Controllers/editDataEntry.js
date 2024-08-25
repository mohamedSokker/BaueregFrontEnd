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
  const [data, setData] = useState(initialData);
  const [perMaintData, setPerMaintData] = useState(initialPerMaintData);
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(``);
  const [perLoading, setPerLoading] = useState(false);
  const [siteData, setSiteData] = useState([]);
  const [sites, setSites] = useState([]);
  const [allData, setAllData] = useState(initialAllData);
  const [isEndDateChecked, setIsEndDateChecked] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  console.log(allData);
  console.log(editData);
  console.log(data);

  useEffect(() => {
    const getData = async () => {
      // console.log(editData);
      try {
        setLoading(true);
        setMessage(`Loading Selection Data...`);
        const URLs = ["/api/v1/getActiveInvoice"];

        const responseData = await Promise.all(
          URLs.map((url) => {
            return axiosPrivate(url, {
              method: "POST",
              data: JSON.stringify({ username: usersData[0].username }),
            });
          })
        );

        setSiteData({
          sitesResult: responseData[0].data.map((item) => {
            return { ...item, InvoiceNo: item?.InvoiceNo?.toString() };
          }),
        });
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
    getData();
  }, []);

  useEffect(() => {
    // const sites = siteData?.usersResult ? siteData?.usersResult : [];

    let sitesFilter = siteData?.sitesResult ? siteData?.sitesResult : [];

    sitesFilter = sitesFilter?.filter(
      (value, index, array) => array.indexOf(value) === index
    );

    setAllData((prev) => ({
      ...prev,
      sites: sitesFilter,
    }));

    editData?.Received_Date === null ||
    editData?.Received_Date === "" ||
    editData?.Received_Date === undefined ||
    editData?.Received_Date === "1970-01-01"
      ? setData({
          ...editData,
          Received_Date: new Date().toISOString().slice(0, 10),
        })
      : setData(editData);
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
        // const body = {
        //   UserName: usersData[0].username,
        //   TableName: "Maintenance",
        //   Data: JSON.stringify(data),
        // };
        const result = isEndDateChecked
          ? data
          : { ...data, Received_Date: null };
        console.log(result);
        const url = `/api/v3/Recieved_Invoices/${data.ID}`;
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

      console.log(data?.ID);

      const url = `/api/v3/Recieved_Invoices/${data.ID}`;
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
  };
};

export default useEditDataEntry;
