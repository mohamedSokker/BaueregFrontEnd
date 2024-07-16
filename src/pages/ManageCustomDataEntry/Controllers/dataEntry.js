import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavContext } from "../../../contexts/NavContext";
import { regix, jsonifyArray } from "../Model/model";

const useDataEntry = () => {
  const { usersData, setError, setErrorData, errorData } = useNavContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(``);
  const [siteData, setSiteData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isExistingTable, setIsExistingTable] = useState(false);
  const [tableColumns, setTableColumns] = useState([]);
  const [categoryCount, setCategoryCount] = useState(0);

  const axiosPrivate = useAxiosPrivate();

  console.log(allData);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setMessage(`Loading Selection Data...`);
        const URLs = [
          "/api/v3/AllTables",
          "/api/v3/AdminUsersApp",
          // "/api/v1/getUserSites",
        ];

        const responseData = await Promise.all(
          URLs.map((url) => {
            return axiosPrivate(url, { method: "GET" });
          })
        );

        // console.log(responseData[0]?.data);

        setSiteData({
          sitesResult: responseData[0].data,
          Users: responseData[1]?.data,
        });

        let sites = [];
        let users = [];
        responseData[0].data?.map((item) => {
          sites.push(item.TABLE_NAME);
        });

        responseData[1].data?.map((item) => {
          users.push(item?.UserName);
        });
        // sites = siteData?.usersResult ? siteData?.usersResult : [];
        if (sites)
          sites = sites?.filter(
            (value, index, array) => array.indexOf(value) === index
          );

        if (users)
          users = users?.filter(
            (value, index, array) => array.indexOf(value) === index
          );
        setAllData((prev) => ({
          ...prev,
          Table: jsonifyArray(sites, "TABLE_NAME"),
          Users: jsonifyArray(users, "UserName"),
        }));

        setData((prev) => ({
          ...prev,
          Name: "",
          Exist: false,
          Fields: {},
          Schemas: {},
          Users: [],
        }));

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

  // useEffect(() => {
  //   const getTableData = async () => {
  //     try {
  //       if (data.Table !== "") {
  //         setLoading(true);
  //         setMessage(`Loading Table Columns...`);
  //         const url = `/api/v3/getTableData?table=${data.Table}`;
  //         const response = await axiosPrivate(url, { method: "GET" });
  //         console.log(response.data);
  //         setTableColumns(response.data);
  //         setLoading(false);
  //       } else {
  //         setTableColumns([]);
  //       }
  //     } catch (err) {
  //       setErrorData((prev) => [
  //         ...prev,
  //         err?.response?.data?.message
  //           ? err?.response?.data?.message
  //           : err?.message,
  //       ]);
  //       setLoading(false);
  //     }
  //   };
  //   getTableData();
  // }, [allData.Table]);

  // const validateData = () => {
  //   const dataKeys = Object.keys(data);
  //   let flag = true;
  //   for (let i = 0; i < dataKeys.length; i++) {
  //     if (dataKeys[i] === "Details") {
  //       let detailsKeys = details;
  //       // console.log(details);
  //       for (let j = 0; j < detailsKeys.length; j++) {
  //         if (
  //           !data.Details ||
  //           Object.keys(data.Details).length === 0 ||
  //           data.Details[detailsKeys[j]] === "" ||
  //           !data.Details[detailsKeys[j]]
  //         ) {
  //           flag = false;
  //           break;
  //         }
  //       }
  //     } else {
  //       if (
  //         data[dataKeys[i]] === "" &&
  //         !validationException.includes(dataKeys[i])
  //       ) {
  //         flag = false;
  //         break;
  //       }
  //       if (regix[dataKeys[i]]) {
  //         console.log(regix[dataKeys[i]]);
  //         if (!regix[dataKeys[i]].test(data[dataKeys[i]])) {
  //           flag = false;
  //           break;
  //         }
  //       }
  //     }
  //   }
  //   return flag;
  // };

  // const handleAdd = async () => {
  //   try {
  //     setLoading(true);
  //     setMessage(`Adding Data...`);
  //     // console.log({ ...data, Details: JSON.stringify(data.Details) });
  //     if (!validateData()) {
  //       throw new Error(`Validation Error`);
  //     } else {
  //       // const body = {
  //       //   UserName: usersData[0].username,
  //       //   TableName: "Maintenance",
  //       //   Data: JSON.stringify(data),
  //       //   Sent: "false",
  //       // };
  //       const result = { ...data, Details: JSON.stringify(data.Details) };
  //       const url = `/api/v3/EqsTools`;
  //       const response = await axiosPrivate(url, {
  //         method: "POST",
  //         data: JSON.stringify(result),
  //       });
  //       console.log(response);
  //       setLoading(false);
  //     }
  //   } catch (err) {
  //     setErrorData((prev) => [
  //       ...prev,
  //       err?.response?.data?.message
  //         ? err?.response?.data?.message
  //         : err?.message,
  //     ]);
  //     setLoading(false);
  //   }
  // };

  return {
    loading,
    setLoading,
    setMessage,
    allData,
    errorData,
    setError,
    setErrorData,
    data,
    setData,
    setAllData,
    message,
    siteData,
    isExistingTable,
    setIsExistingTable,
    tableColumns,
    setTableColumns,
    categoryCount,
    setCategoryCount,
  };
};

export default useDataEntry;
