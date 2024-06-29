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
  const [isEndWHChecked, setIsEndWHChecked] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  console.log(allData);
  console.log(editData);

  useEffect(() => {
    const getData = async () => {
      // console.log(editData);
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

  useEffect(() => {
    // const sites = siteData?.usersResult ? siteData?.usersResult : [];

    let sitesFilter = siteData?.sitesResult ? siteData?.sitesResult : [];
    let eqsLocFilter = siteData?.EqsLocResult ? siteData?.EqsLocResult : [];

    sitesFilter = sitesFilter?.filter(
      (value, index, array) => array.indexOf(value) === index
    );

    eqsLocFilter = eqsLocFilter?.filter(
      (value, index, array) => array.indexOf(value) === index
    );

    setAllData((prev) => ({
      ...prev,
      types: sitesFilter,
      code: sitesFilter,
      serial: sitesFilter,
      sites: eqsLocFilter,
      eqs: eqsLocFilter,
    }));

    setData(editData);
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
        let result = isEndDateChecked ? data : { ...data, End_Date: null };
        result = isEndWHChecked ? result : { ...result, End_WH: null };
        console.log(result);

        const eqsToolsLocURL = `/api/v3/EqsToolsLocHandleEdit`;
        const eqsToolsLocResponse = await axiosPrivate(eqsToolsLocURL, {
          method: "POST",
          data: JSON.stringify(result),
        });

        console.log(eqsToolsLocResponse.data);
        // const body = {
        //   UserName: usersData[0].username,
        //   TableName: "Maintenance",
        //   Data: JSON.stringify(data),
        // };
        // const result = isEndDateChecked ? data : { ...data, End_Date: null };
        // console.log(result);
        // const url = `/api/v3/dataEntryHandleEditMachLocation/${data.ID}`;
        // const response = await axiosPrivate(url, {
        //   method: "PUT",
        //   data: JSON.stringify(result),
        // });
        // console.log(response);
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

      console.log(data.ID);

      const eqsToolsLocURL = `/api/v3/EqsToolsLocHandleDelete`;
      const eqsToolsLocResponse = await axiosPrivate(eqsToolsLocURL, {
        method: "POST",
        data: JSON.stringify({ ID: data.ID }),
      });

      console.log(eqsToolsLocResponse.data);
      // const url = `/api/v3/Machinary_Location/${data.ID}`;
      // const response = await axiosPrivate(url, {
      //   method: "DELETE",
      // });
      // console.log(response);
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
    isEndWHChecked,
    setIsEndWHChecked,
  };
};

export default useEditDataEntry;
