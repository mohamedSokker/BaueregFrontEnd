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

  // console.log(allData);
  console.log(editData);

  useEffect(() => {
    const getData = async () => {
      // console.log(editData);
      try {
        if (!responseData.sitesData) {
          setLoading(true);
          setMessage(`Loading Selection Data...`);
          const URLs = [
            "/api/v1/getActiveData",
            "/api/v1/getBreakdowns",
            "/api/v1/getUserSites",
          ];

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
            usersResult: responseData[2].data,
            allBreakdownTypes: responseData[1].data,
          });
          // const url = `/api/v1/getActiveData`;
          // const result = await axiosPrivate(url, {
          //   method: "POST",
          //   data: JSON.stringify({ username: usersData[0].username }),
          // });
          // // console.log(result.data);
          setSiteData({
            sitesResult: responseData[0].data,
            usersResult: responseData[2].data,
            allBreakdownTypes: responseData[1].data,
          });
          responseData.sitesData = {
            sitesResult: responseData[0].data,
            usersResult: responseData[1].data,
            allBreakdownTypes: responseData[2].data,
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
    // const sites = siteData?.usersResult ? siteData?.usersResult : [];

    let sitesFilter = siteData?.sitesResult ? siteData?.sitesResult : [];

    const sitesFilterBdType = siteData?.allBreakdownTypes
      ? siteData?.allBreakdownTypes
      : [];

    sitesFilter = sitesFilter?.filter(
      (value, index, array) => array.indexOf(value) === index
    );

    editData?.End_Date === null ||
    editData?.End_Date === "" ||
    editData?.End_Date === undefined ||
    editData?.End_Date === "1970-01-01"
      ? setData({
          ...editData,
          End_Date: new Date().toISOString().slice(0, 10),
        })
      : setData(editData);

    setAllData((prev) => ({
      ...prev,
      sites: sitesFilter,
      eqsType: sitesFilter,
      eqsModel: sitesFilter,
      eqs: sitesFilter,
      UnderCarrage_Type: sitesFilter,
      store: jsonifyArray(AllStocks, `stock`),
      Breakdown_Type: sitesFilterBdType,
      "Periodic Maintenance Interval": perMaintPlan,
    }));
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
        const result = isEndDateChecked ? data : { ...data, End_Date: null };
        console.log(result);
        const url = `/api/v3/dataEntryHandleEditEqLocation/${data.ID}`;
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

      const url = `/api/v3/QCTable/${data.ID}`;
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
