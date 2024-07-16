import { useState } from "react";

import { jsonifyArray } from "../Models/model";

const useDropdown = ({
  label,
  localData,
  data,
  setData,
  siteData,
  setAllData,
  condition,
  setErrorData,
  targetData,
}) => {
  const [datas, setDatas] = useState([]);
  const [datasLoading, setDatasLoading] = useState(false);

  const handleClick = async () => {
    try {
      if (!condition) throw new Error(`Can't choose ${label} right away`);
      setDatasLoading(true);
      setDatas(localData);
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
                      // console.log(data);
                      // console.log(data[key[Object.keys(key)]]);
                      // console.log(Object.keys(key)[0]);
                      // console.log(key[Object.keys(key)]);
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
            // console.log(siteData[item]);
            // console.log(dropsDown);
            // console.log(arrFilter);

            arr = Array.from(new Set(arr));
            setAllData((prev) => ({
              ...prev,
              [item]: jsonifyArray(arr, targetData[0]?.Fields[item].Column),
            }));

            dropsDown.push({ [targetData[0]?.Fields[item].Column]: item });
          }
        });

      if (targetData[0]?.Fields[label].Type === "DropDown") {
        setData((prev) => {
          const newValues = { ...prev };
          targetData[0]?.Fields[label].onDropMakesEmpty.map((it) => {
            newValues[it] = "";
          });
          return newValues;
        });
      }

      setDatasLoading(false);
    } catch (err) {
      setErrorData((prev) => [
        ...prev,
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message,
      ]);
    } finally {
      setDatasLoading(false);
    }
  };

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [label]: e.target.value }));
  };

  return { datas, datasLoading, handleChange, handleClick };
};

export default useDropdown;
