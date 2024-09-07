import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavContext } from "../../../contexts/NavContext";
import { jsonifyArray } from "../Model/model";

const useDataEntry = ({ selectedTable }) => {
  const { usersData, setError, setErrorData, errorData } = useNavContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(``);
  const [siteData, setSiteData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isExistingTable, setIsExistingTable] = useState(false);
  const [tableColumns, setTableColumns] = useState([]);
  const [categoryCount, setCategoryCount] = useState(0);
  const [found, setFound] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  console.log(found);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setMessage(`Loading Selection Data...`);
        const URLs = [
          "/api/v3/AllTables",
          "/api/v3/AdminUsersApp",
          "/api/v3/ManageDataEntry",
        ];

        const responseData = await Promise.all(
          URLs.map((url) => {
            return axiosPrivate(url, { method: "GET" });
          })
        );

        const targetDataEntry = responseData[2]?.data?.filter(
          (item) => item.Name === selectedTable
        );

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

        if (targetDataEntry.length > 0) {
          setFound(true);
          setIsExistingTable(false);
          setData({
            ID: targetDataEntry[0]?.ID,
            Name: targetDataEntry[0]?.Name,
            Exist: targetDataEntry[0]?.Exist === "false" ? false : true,
            Fields: JSON.parse(targetDataEntry[0]?.Fields),
            Schemas: JSON.parse(targetDataEntry[0]?.Schemas),
            Users: JSON.parse(targetDataEntry[0]?.Users),
          });
          setTableColumns(
            jsonifyArray(
              Object.keys(JSON.parse(targetDataEntry[0]?.Fields)),
              "name"
            )
          );
        } else {
          setFound(false);
          setData((prev) => ({
            ...prev,
            Name: "",
            Exist: true,
            Fields: {},
            Schemas: {},
            Users: [],
          }));
          setIsExistingTable(true);
        }

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
  }, [selectedTable]);

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
    found,
  };
};

export default useDataEntry;
