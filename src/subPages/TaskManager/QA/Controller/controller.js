import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const useQA = () => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getData = async () => {
    try {
      setMessage(`Loading Reports...`);
      setLoading(true);
      const url = `/api/v1/taskManagerGetReports`;
      const data = await axiosPrivate(url, {
        method: "GET",
      });
      setData(data?.data);
      setLoading(false);
    } catch (err) {
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
      setLoading(false);
    }
  };

  return { data, setData, message, setMessage, loading, setLoading, getData };
};

export default useQA;
