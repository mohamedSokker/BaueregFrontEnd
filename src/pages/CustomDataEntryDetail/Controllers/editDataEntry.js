import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavContext } from "../../../contexts/NavContext";
import { regix, jsonifyArray } from "../Models/model";

const useEditDataEntry = ({ editData, targetData }) => {
  const { usersData, setError, setErrorData, errorData } = useNavContext();
  const [data, setData] = useState([]);
  const [dataCheck, setDataCheck] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(``);
  const [siteData, setSiteData] = useState([]);
  const [allData, setAllData] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setMessage(`Loading Selection Data...`);

        const URLs = [];
        targetData &&
          targetData.length > 0 &&
          Object.keys(targetData[0]?.Fields).map((item) => {
            if (
              !URLs.includes(targetData[0]?.Fields[item].URL) &&
              targetData[0]?.Fields[item].Type === "DropDown"
            )
              URLs.push(targetData[0]?.Fields[item].URL);
          });

        const responseData = await Promise.all(
          URLs.map((url) => {
            return axiosPrivate(url, {
              method: "GET",
            });
          })
        );

        let result = {};
        Object.keys(targetData[0]?.Fields).map((item) => {
          if (targetData[0]?.Fields[item].Type === "DropDown")
            result = {
              ...result,
              [item]:
                responseData[URLs.indexOf(targetData[0]?.Fields[item].URL)]
                  .data,
            };
        });

        setSiteData(result);

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
  }, [targetData]);

  useEffect(() => {
    let allDataResult = {};
    let dropsDown = [];
    targetData &&
      targetData.length > 0 &&
      Object.keys(targetData[0]?.Fields).map((item, i) => {
        if (targetData[0]?.Fields[item].Type === "DropDown") {
          let arr = [];
          let arrFilter = [];
          if (dropsDown.length === 0) {
            arrFilter = siteData[item] ? siteData[item] : [];
          } else {
            arrFilter = siteData[item]
              ? siteData[item].filter((it) =>
                  dropsDown.every((key) => {
                    return (
                      it[Object.keys(key)[0]] === data[key[Object.keys(key)]]
                    );
                  })
                )
              : [];
          }

          arrFilter?.map((it) => {
            arr.push(it[targetData[0]?.Fields[item].Column]);
          });

          arr = Array.from(new Set(arr));

          allDataResult = {
            ...allDataResult,
            [item]: jsonifyArray(arr, targetData[0]?.Fields[item].Column),
          };
        }
      });

    setAllData((prev) => ({
      ...prev,
      ...allDataResult,
    }));

    setData(editData);
  }, [siteData, targetData]);

  const validateData = () => {
    const dataKeys = Object.keys(data);
    let flag = true;

    for (let i = 0; i < dataKeys.length; i++) {
      if (dataKeys[i] !== "ID") {
        if (
          data[dataKeys[i]] === "" &&
          !targetData?.[0]?.Fields?.[dataKeys[i]]?.validationException
        ) {
          flag = false;
          break;
        }

        if (
          !regix[targetData?.[0]?.Fields?.[dataKeys[i]]?.validateString]?.test(
            data[dataKeys[i]]
          )
        ) {
          flag = false;
          break;
        }
      }

      // if (
      //   data[dataKeys[i]] === "" &&
      //   !validationException.includes(dataKeys[i])
      // ) {
      //   flag = false;
      //   break;
      // }
      // if (regix[dataKeys[i]]) {
      //   console.log(regix[dataKeys[i]]);
      //   if (!regix[dataKeys[i]].test(data[dataKeys[i]])) {
      //     flag = false;
      //     break;
      //   }
      // }
    }
    return flag;
  };

  const handleEdit = async () => {
    try {
      setLoading(true);
      setMessage(`Editing Data...`);
      if (!validateData()) {
        throw new Error(`Validation Error`);
      } else {
        let result = { ...data };
        Object.keys(targetData?.[0]?.Fields)?.map((item) => {
          if (targetData?.[0]?.Fields?.[item]?.Type === "Date") {
            if (targetData?.[0]?.Fields?.[item]?.isCheck) {
              result = {
                ...result,
                [item]: dataCheck?.[item] ? data?.[item] : null,
              };
            } else {
              result = {
                ...result,
                [item]: data?.[item],
              };
            }
          }
        });
        delete result.ID;
        console.log(result);

        const url = `/api/v3/${targetData[0]?.Name}/${data?.ID}`;
        const response = await axiosPrivate(url, {
          method: "PUT",
          data: JSON.stringify(result),
        });
        console.log(response?.data);

        setLoading(false);
      }
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

  const handleDelete = async () => {
    try {
      setLoading(true);
      setMessage(`Deleting Data...`);

      console.log(data.ID);

      const url = `/api/v3/${targetData[0]?.Name}/${data?.ID}`;
      const response = await axiosPrivate(url, {
        method: "DELETE",
      });
      console.log(response?.data);

      // const eqsToolsLocURL = `/api/v3/EqsToolsLocHandleDelete`;
      // const eqsToolsLocResponse = await axiosPrivate(eqsToolsLocURL, {
      //   method: "POST",
      //   data: JSON.stringify({ ID: data.ID }),
      // });

      // console.log(eqsToolsLocResponse.data);
      // const url = `/api/v3/Machinary_Location/${data.ID}`;
      // const response = await axiosPrivate(url, {
      //   method: "DELETE",
      // });
      // console.log(response);
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
    allData,
    errorData,
    setError,
    setErrorData,
    data,
    setData,
    setAllData,
    handleEdit,
    handleDelete,
    message,
    siteData,
    dataCheck,
    setDataCheck,
  };
};

export default useEditDataEntry;
