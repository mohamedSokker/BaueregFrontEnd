import React, { useEffect, useState } from "react";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const getUniqueArray = (array) => {
  const uniqueSet = new Set();

  array.forEach((jsonObject) => {
    uniqueSet.add(JSON.stringify(jsonObject));
  });

  const uniqueArray = Array.from(uniqueSet).map((jsonString) =>
    JSON.parse(jsonString)
  );
  return uniqueArray;
};

const useData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [copiedData, setCopiedData] = useState(null);
  const [currentSpare, setCurrentSpare] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [searchItems, setSearchItems] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  const getData = async () => {
    try {
      setLoading(true);
      const url = `/api/v1/dashboard`;
      const data = await axiosPrivate(url, { method: "GET" });
      data?.data.sort((a, b) => a.DateTime - b.DateTime);
      setData(data.data);
      setCopiedData(data?.data);
      setCurrentSpare(data?.data?.maintStocksData[3]);
      console.log(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearchChange = (e) => {
    let targetData = [];
    let history = [];
    // const targetData = data.maintStocksData.filter(
    //   (item) =>
    //     item.SparePart_Code.includes(e.target.value) ||
    //     item.Description.includes(e.target.value)
    // );

    data.maintStocksData.map((item) => {
      if (
        !history.includes(item.SparePart_Code) &&
        (item.SparePart_Code.includes(e.target.value) ||
          item.Description.includes(e.target.value))
      ) {
        targetData.push(item);
        history.push(item.SparePart_Code);
      }
    });

    console.log(targetData);
    setSearchItems(targetData);
    setIsSearch(true);
  };

  const handleSearchClick = (item) => {
    setCurrentSpare(item);
    setIsSearch(false);
  };

  return {
    loading,
    data,
    currentSpare,
    copiedData,
    isSearch,
    searchItems,
    setData,
    setIsSearch,
    setCurrentSpare,
    handleSearchChange,
    handleSearchClick,
  };
};

export default useData;
