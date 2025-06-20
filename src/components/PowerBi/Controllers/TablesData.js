import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavContext } from "../../../contexts/NavContext";

const jsonifyArray = (array, name) => {
  let arr = [];
  for (let i = 0; i < array?.length; i++) {
    arr.push({ [name]: array[i] });
  }
  return arr;
};

const useTablesData = () => {
  const { usersData, setError, setErrorData, errorData } = useNavContext();

  const axiosPrivate = useAxiosPrivate();

  const [DBdata, setDBData] = useState([]);
  const [relationshipdata, setRelationshipData] = useState({});
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [message, setMessage] = useState(``);
  const [tableSchema, setTableSchema] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isChoose, setIsChoose] = useState([]);
  const [isRelationshipChoose, setIsRelationshipChoose] = useState([]);
  const [allData, setAllData] = useState([]);
  const [usersNamesData, setUsersNamesData] = useState({ Users: [] });
  const [relationsTable, setRelationsTable] = useState([]);
  // const [selectedTable, setSelectedTable] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setMessage(`Loading Selection Data...`);
        if (
          DBdata.length === 0 &&
          relationsTable.length === 0 &&
          allData.length === 0
        ) {
          const URLs = [
            "/api/v3/AllTables",
            "/api/v3/AdminUsersApp",
            "/api/v3/PowerBiRelationShips",
          ];

          const responseData = await Promise.all(
            URLs.map((url) => {
              return axiosPrivate(url, { method: "GET" });
            })
          );

          let users = [];

          responseData[1].data?.map((item) => {
            users.push(item?.UserName);
          });

          if (users)
            users = users?.filter(
              (value, index, array) => array.indexOf(value) === index
            );

          setAllData((prev) => ({
            ...prev,
            Users: jsonifyArray(users, "UserName"),
          }));

          setDBData(
            responseData[0]?.data.sort((a, b) => a.TABLE_NAME > b.TABLE_NAME)
          );

          // setRelationshipData(responseData[1]?.data);

          setRelationsTable(responseData[2]?.data);
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
  }, []);

  const getTableSchema = async (tableName) => {
    try {
      setLoading(true);
      const url = `/api/v3/${tableName}Schema`;
      const responseData = await axiosPrivate(url, { method: "GET" });
      console.log(responseData.data);
      setTableSchema(responseData.data);
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

  const getTableData = async (tableName) => {
    try {
      setDataLoading(true);
      const url = `/api/v3/${tableName}`;
      const responseData = await axiosPrivate(url, { method: "GET" });
      //   console.log(responseData.data);
      setTableData(responseData.data);
      setDataLoading(false);
      return responseData?.data;
    } catch (err) {
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
      // setErrorData((prev) => [
      //   ...prev,
      //   err?.response?.data?.message
      //     ? err?.response?.data?.message
      //     : err?.message,
      // ]);
      setDataLoading(false);
    }
  };

  return {
    loading,
    setLoading,
    dataLoading,
    setDataLoading,
    setMessage,
    errorData,
    setError,
    setErrorData,
    DBdata,
    setDBData,
    relationshipdata,
    setRelationshipData,
    message,
    getTableSchema,
    getTableData,
    tableData,
    setTableData,
    tableSchema,
    setTableSchema,
    isChoose,
    setIsChoose,
    allData,
    setAllData,
    usersNamesData,
    setUsersNamesData,
    isRelationshipChoose,
    setIsRelationshipChoose,
    relationsTable,
    setRelationsTable,
    // selectedTable,
    // setSelectedTable,
  };
};

export default useTablesData;
