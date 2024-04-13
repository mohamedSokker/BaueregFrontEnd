import React, { useEffect, useState } from "react";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const useData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [copiedData, setCopiedData] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  const getData = async () => {
    try {
      setLoading(true);
      const url = `/api/v1/dashboard`;
      const data = await axiosPrivate(url, { method: "GET" });
      setData(data.data);
      setCopiedData(data?.data);
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

  return { loading, data, copiedData, setData };
};

export default useData;
