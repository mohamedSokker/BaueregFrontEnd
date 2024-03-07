import React, { useState, useEffect } from "react";
import { filterModel, objectModel } from "../Model/model";

const storetoJSON = async (store) => {
  let result = [];
  Object.keys(store).map((title) => {
    store[title].map((item) => {
      result.push({ ...item, category: title });
    });
  });
  return result;
};

const getUniqueItems = (array, compareValue) => {
  let flag = true;
  for (let i = 0; i < array.length; i++) {
    if (array[i]?.value === compareValue || compareValue === "") {
      flag = false;
      break;
    }
  }
  return flag;
};

const useFilter = (stores, setStores, copiedStores, setCopiedStores) => {
  const [count, setCount] = useState(filterModel.count);
  const [isFilterCard, setIsFilterCard] = useState(false);
  const [newStore, setNewStore] = useState(null);
  const [copiedNewStore, setCopiedNewStore] = useState(null);
  const [minDuration, setMinDuration] = useState(filterModel.minDuration);
  const [maxDuration, setMaxDuration] = useState(filterModel.maxDuration);
  const [currentDuration, setCurrentDuration] = useState(
    filterModel.currentDuration
  );
  const [filteredData, setFilteredData] = useState(filterModel.filteredData);
  const [minDate, setMinDate] = useState(filterModel.minDate);
  const [maxDate, setMaxDate] = useState(filterModel.maxDate);
  const [currentDate, setCurrentDate] = useState(filterModel.currentDate);

  useEffect(() => {
    let copyStore = { ...copiedStores };
    let copyResult = { ...objectModel };
    Object.keys(copyStore).map((store) => {
      copyStore[store].map((item) => {
        if (getUniqueItems(copyResult.Description, item.desc))
          copyResult = {
            ...copyResult,
            Description: [
              ...copyResult.Description,
              {
                value: item.desc,
                checked: false,
                col: "desc",
              },
            ],
          };

        item.pic.map((user) => {
          if (getUniqueItems(copyResult.UserName, user.name))
            copyResult = {
              ...copyResult,
              UserName: [
                ...copyResult.UserName,
                {
                  value: user.name,
                  checked: false,
                  col: "pic",
                },
              ],
            };
        });
        if (getUniqueItems(copyResult.Equipment, item.eq))
          copyResult = {
            ...copyResult,
            Equipment: [
              ...copyResult.Equipment,
              {
                value: item.eq,
                checked: false,
                col: "eq",
              },
            ],
          };
        if (getUniqueItems(copyResult.Periority, item.periority))
          copyResult = {
            ...copyResult,
            Periority: [
              ...copyResult.Periority,
              {
                value: item.periority,
                checked: false,
                col: "periority",
              },
            ],
          };

        if (getUniqueItems(copyResult.Title, item.title))
          copyResult = {
            ...copyResult,
            Title: [
              ...copyResult.Title,
              {
                value: item.title,
                checked: false,
                col: "title",
              },
            ],
          };

        if (getUniqueItems(copyResult.Time, item.start)) {
          copyResult = {
            ...copyResult,
            Time: [
              ...copyResult.Time,
              {
                value: item.start,
                checked: false,
                col: "start",
              },
            ],
          };
        }

        if (getUniqueItems(copyResult.Time, item.end)) {
          copyResult = {
            ...copyResult,
            Time: [
              ...copyResult.Time,
              {
                value: item.end,
                checked: true,
                col: "end",
              },
            ],
          };
        }

        if (getUniqueItems(copyResult.Duration, item.duration)) {
          copyResult = {
            ...copyResult,
            Duration: [
              ...copyResult.Duration,
              {
                value: item.duration,
                checked: false,
                col: "duration",
              },
            ],
          };
        }

        if (getUniqueItems(copyResult.Workshop, item.workshop))
          copyResult = {
            ...copyResult,
            Workshop: [
              ...copyResult.Workshop,
              {
                value: item.workshop,
                checked: false,
                col: "workshop",
              },
            ],
          };
      });
    });
    setNewStore(copyResult);
    setCopiedNewStore(copyResult);
  }, []);

  useEffect(() => {
    filterModel.filteredData
      ? setStores(filterModel.filteredData)
      : setStores(copiedStores);
  }, []);

  useEffect(() => {
    const getMinDuration = async () => {
      const jsonData = await storetoJSON(copiedStores);
      let durs = [];
      jsonData.map((dur) => {
        if (dur.duration && dur.duration !== "") {
          durs.push(dur.duration);
        }
      });
      // console.log(durs);

      const minDur = durs.length > 0 ? Math.min.apply(null, durs) : "";
      // console.log(minDur);
      filterModel.minDuration = minDur;
      filterModel.currentDuration = [
        filterModel.currentDuration[0] === ""
          ? minDur
          : filterModel.currentDuration[0],
        filterModel.currentDuration[1],
      ];
      setMinDuration(minDur);
      setCurrentDuration((prev) => [filterModel.currentDuration[0], prev[1]]);
    };
    const getMaxDuration = async () => {
      const jsonData = await storetoJSON(copiedStores);
      let durs = [];
      jsonData.map((dur) => {
        if (dur.duration && dur.duration !== "") {
          durs.push(dur.duration);
        }
      });
      // console.log(durs);
      const maxDur = durs.length > 0 ? Math.max.apply(null, durs) : "";
      // console.log(maxDur);
      filterModel.maxDuration = maxDur;
      filterModel.currentDuration = [
        filterModel.currentDuration[0],
        filterModel.currentDuration[1] === ""
          ? maxDur
          : filterModel.currentDuration[1],
      ];
      setMaxDuration(maxDur);
      setCurrentDuration((prev) => [prev[0], filterModel.currentDuration[1]]);
    };
    const getMinDate = async () => {
      const jsonData = await storetoJSON(copiedStores);
      let dates = [];
      jsonData.map((date) => {
        if (date.start && date.start !== "") {
          dates.push(new Date(date.start));
        }
      });
      // console.log(dates);
      const minDate =
        dates.length > 0
          ? new Date(Math.min.apply(null, dates)).toISOString().slice(0, 10)
          : "";
      filterModel.minDate = minDate;
      filterModel.currentDate = {
        start:
          filterModel.currentDate.start === ""
            ? minDate
            : filterModel.currentDate.start,
        end: filterModel.currentDate.end,
      };
      setMinDate(minDate);
      setCurrentDate((prev) => ({
        ...prev,
        start: filterModel.currentDate.start,
      }));
      // console.log(minDate);
    };
    const getMaxDate = async () => {
      const jsonData = await storetoJSON(copiedStores);
      let dates = [];
      jsonData.map((date) => {
        if (date.start && date.start !== "") {
          dates.push(new Date(date.start));
        }
      });
      const maxDate =
        dates.length > 0
          ? new Date(Math.max.apply(null, dates)).toISOString().slice(0, 10)
          : "";
      filterModel.maxDate = maxDate;
      filterModel.currentDate = {
        start: filterModel.currentDate.start,
        end:
          filterModel.currentDate.end === ""
            ? maxDate
            : filterModel.currentDate.end,
      };
      setMaxDate(maxDate);
      setCurrentDate((prev) => ({ ...prev, end: filterModel.currentDate.end }));
    };
    getMinDuration();
    getMaxDuration();
    getMinDate();
    getMaxDate();
  }, []);
  return {
    newStore,
    setNewStore,
    copiedNewStore,
    count,
    setCount,
    copiedStores,
    setCopiedStores,
    isFilterCard,
    setIsFilterCard,
    minDuration,
    setMinDuration,
    maxDuration,
    setMaxDuration,
    minDate,
    setMinDate,
    maxDate,
    setMaxDate,
    currentDate,
    setCurrentDate,
    currentDuration,
    setCurrentDuration,
    filteredData,
    setFilteredData,
  };
};

export default useFilter;
