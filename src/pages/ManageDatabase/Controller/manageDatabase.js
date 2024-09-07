import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavContext } from "../../../contexts/NavContext";

const useManageDatabase = () => {
  const { usersData, setError, setErrorData, errorData } = useNavContext();

  const axiosPrivate = useAxiosPrivate();

  const [DBdata, setDBData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(``);
  const [tableSchema, setTableSchema] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isChoose, setIsChoose] = useState({});
  const [category, setCategory] = useState({});
  const [selectedTable, setSelectedTable] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setMessage(`Loading Selection Data...`);
        const URLs = ["/api/v3/AllTables"];

        const responseData = await Promise.all(
          URLs.map((url) => {
            return axiosPrivate(url, { method: "GET" });
          })
        );

        setDBData(
          responseData[0]?.data.sort((a, b) => a.TABLE_NAME > b.TABLE_NAME)
        );

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
      setLoading(true);
      const url = `/api/v3/${tableName}`;
      const responseData = await axiosPrivate(url, { method: "GET" });
      //   console.log(responseData.data);
      setTableData(responseData.data);
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
    setLoading,
    setMessage,
    errorData,
    setError,
    setErrorData,
    DBdata,
    setDBData,
    message,
    getTableSchema,
    getTableData,
    tableData,
    setTableData,
    tableSchema,
    setTableSchema,
    isChoose,
    setIsChoose,
    category,
    setCategory,
    selectedTable,
    setSelectedTable,
    query,
    setQuery,
  };
};

export default useManageDatabase;
