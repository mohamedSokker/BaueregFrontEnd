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

const useData = ({ socket }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    avData: [],
    maintData: [],
    maintStocksData: [],
    fuelCons: [],
    oilCons: [],
    prodDrill: [],
    prodTrench: [],
  });
  const [copiedData, setCopiedData] = useState(null);
  const [currentSpare, setCurrentSpare] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [searchItems, setSearchItems] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  // let avData = ``;

  // const handleAvData = (data) => {
  //   avData += data;
  //   setData((prev) => ({
  //     ...prev,
  //     avData: JSON.parse(`[${avData.slice(0, -1).trim()}]`),
  //   }));
  //   // console.log(`[${avData.slice(0, -1).trim()}]`);
  //   // console.log(JSON.parse(`[${avData.slice(0, -1).trim()}]`));
  // };

  // useEffect(() => {
  //   socket.emit("requestAvData", "requestAvData");
  //   socket.on("avData", handleAvData);

  //   return () => {
  //     socket.off("avData", handleAvData);
  //   };
  // }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const avurl = `/api/v1/availability`;
      const avData = await axiosPrivate(avurl, { method: "GET" });
      const mainturl = `/api/v1/maintenance`;
      const maintData = await axiosPrivate(mainturl, { method: "GET" });
      const maintStocksurl = `/api/v1/maintenanceStocks`;
      const maintStocksData = await axiosPrivate(maintStocksurl, {
        method: "GET",
      });
      const fuelConsurl = `/api/v1/fuelCons`;
      const fuelCons = await axiosPrivate(fuelConsurl, { method: "GET" });
      const oilConsurl = `/api/v1/oilCons`;
      const oilCons = await axiosPrivate(oilConsurl, { method: "GET" });
      const prodDrillurl = `/api/v1/prodDrill`;
      const prodDrill = await axiosPrivate(prodDrillurl, { method: "GET" });
      const prodTrenchurl = `/api/v1/prodTrench`;
      const prodTrench = await axiosPrivate(prodTrenchurl, { method: "GET" });

      console.log(avData.data);

      // const data = {
      //   avData: JSON.parse(`[${avData.data.slice(0, -1).trim()}]`),
      //   maintData: JSON.parse(`[${maintData.data.slice(0, -1).trim()}]`),
      //   maintStocksData: JSON.parse(
      //     `[${maintStocksData.data.slice(0, -1).trim()}]`
      //   ),
      //   fuelCons: JSON.parse(`[${fuelCons.data.slice(0, -1).trim()}]`),
      //   oilCons: JSON.parse(`[${oilCons.data.slice(0, -1).trim()}]`),
      //   prodDrill: JSON.parse(`[${prodDrill.data.slice(0, -1).trim()}]`),
      //   prodTrench: JSON.parse(`[${prodTrench.data.slice(0, -1).trim()}]`),
      // };
      const data = {
        avData: avData.data,
        maintData: maintData.data,
        maintStocksData: maintStocksData.data,
        fuelCons: fuelCons.data,
        oilCons: oilCons.data,
        prodDrill: prodDrill.data,
        prodTrench: prodTrench.data,
      };

      setData(data);
      setCopiedData(data);
      setCurrentSpare(data?.maintStocksData[3]);
      console.log(data);
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
