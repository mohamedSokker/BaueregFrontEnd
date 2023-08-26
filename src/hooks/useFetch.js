import { useState, useEffect } from "react";

const useFetch = (url, method, token, depArray, body) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorBody, setErrorBody] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error Fetching Data`);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setErrorBody(err.message);
        setLoading(false);
      });
  }, [url, ...depArray]);

  return {
    data,
    error,
    errorBody,
    loading,
    setData,
    setLoading,
    setError,
    setErrorBody,
  };
};

export default useFetch;
