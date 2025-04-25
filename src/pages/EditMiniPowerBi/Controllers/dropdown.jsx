import React, { useEffect, useState } from "react";

const useDropdown = ({ label, localData, data, setData }) => {
  const [datas, setDatas] = useState([]);
  const [datasLoading, setDatasLoading] = useState(false);

  const handleClick = async () => {
    try {
      setDatasLoading(true);
      setDatas(localData);

      setDatasLoading(false);
    } catch (err) {
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
      //   setErrorData((prev) => [
      //     ...prev,
      //     err?.response?.data?.message
      //       ? err?.response?.data?.message
      //       : err?.message,
      //   ]);
    } finally {
      setDatasLoading(false);
    }
  };

  const handleChange = async (e) => {
    try {
      const tableName = e.target.value;
      if (label === "Users") {
        if (e.target.selected === false) {
          setData((prev) => ({
            ...prev,
            Users: prev?.Users
              ? prev?.Users?.includes(tableName)
                ? [...prev?.Users]
                : [...prev?.Users, tableName]
              : [e.target.value],
          }));
        } else if (e.target.selected === true) {
          const array = data?.Users ? [...data?.Users] : [];
          const result = array.filter((item) => item !== e.target.value);
          setData((prev) => ({
            ...prev,
            Users: result,
          }));
        }
      }
    } catch (err) {
      console.log(err);
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
      //   setErrorData((prev) => [
      //     ...prev,
      //     err?.response?.data?.message
      //       ? err?.response?.data?.message
      //       : err?.message,
      //   ]);
      //   setLoading(false);
    }
  };

  return { datas, datasLoading, handleChange, handleClick };
};

export default useDropdown;
