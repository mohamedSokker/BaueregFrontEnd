import React, { useState, useEffect } from "react";

const storeModel = {
  "To Do": [],
  InProgress: [],
  "Waiting Inspection": [],
  Inspected: [],
  Rejected: [],
  Done: [],
};

const useFilter = (
  newStore,
  setNewStore,
  copiedStores,
  setStores,
  setCount,
  filteredData,
  setFilteredData,
  setMinDate,
  setMaxDate,
  setMinDuration,
  setMaxDuration,
  currentDate,
  setCurrentDate,
  setCurrentDuration
) => {
  useEffect(() => {
    const getMinDate = async () => {
      const jsonData = await storetoJSON(copiedStores);
      let dates = [];
      jsonData.map((date) => {
        if (date.start && date.start !== "") {
          console.log(date.start);
          dates.push(new Date(date.start));
        }
      });
      console.log(dates);
      const minDate = new Date(Math.min.apply(null, dates))
        .toISOString()
        .slice(0, 10);
      setMinDate(minDate);
      setCurrentDate((prev) => ({ ...prev, start: minDate }));
      console.log(minDate);
    };
    const getMaxDate = async () => {
      const jsonData = await storetoJSON(copiedStores);
      const dates = jsonData.map(
        (date) => date.start && date.start !== "" && new Date(date.start)
      );
      const maxDate = new Date(Math.max.apply(null, dates))
        .toISOString()
        .slice(0, 10);
      setMaxDate(maxDate);
      setCurrentDate((prev) => ({ ...prev, end: maxDate }));
      console.log(maxDate);
    };
    const getMinDuration = async () => {
      const jsonData = await storetoJSON(copiedStores);
      const durs = jsonData.map(
        (dur) => dur.duration && dur.duration !== "" && dur.duration
      );
      const minDur = Math.min.apply(null, durs);
      console.log(minDur);
      setMinDuration(minDur);
    };
    const getMaxDuration = async () => {
      const jsonData = await storetoJSON(copiedStores);
      const durs = jsonData.map(
        (dur) => dur.duration && dur.duration !== "" && dur.duration
      );
      const maxDur = Math.max.apply(null, durs);
      console.log(maxDur);
      setMaxDuration(maxDur);
    };
    getMinDate();
    getMaxDate();
    getMinDuration();
    getMaxDuration();
  }, []);

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

  const handleCheck = async (title, store, index) => {
    let copiedNewStore = { ...newStore };
    copiedNewStore[title][index].checked =
      !copiedNewStore[title][index].checked;
    setNewStore(copiedNewStore);

    const jsonData = await storetoJSON(copiedStores);
    let result = [];
    Object.keys(newStore).map((title) => {
      newStore[title].map((item) => {
        if (item.checked) {
          if (item.col === "pic") {
            jsonData.map((d) => {
              d[item.col].map((user) => {
                if (user.name === item.value) {
                  console.log(d);
                  result.push(d);
                }
              });
            });
          } else if (item.col === "start") {
          } else if (item.col === "end") {
          } else if (item.col === "duration") {
          } else {
            jsonData.map((d) => {
              if (d[item.col] === item.value) {
                result.push(d);
              }
            });
          }
        }
      });
    });
    result = getUniqueArray(result);
    result = await JSONtoStore(result);
    console.log(result);
    setFilteredData(result);

    let sum = 0;
    Object.keys(result).map((title) => {
      sum += result[title].length;
    });
    setCount(sum);
  };

  const storetoJSON = async (store) => {
    let result = [];
    Object.keys(store).map((title) => {
      store[title].map((item) => {
        result.push({ ...item, category: title });
      });
    });
    return result;
  };

  const JSONtoStore = async (store) => {
    let result = { ...storeModel };
    store.map((item) => {
      result = {
        ...result,
        [item.category]: [...result[item.category], item],
      };
    });
    return result;
  };

  const handleShowResult = async () => {
    setStores(filteredData);
  };

  const handleDurationChange = async (e, newValue) => {
    console.log(newValue);
    setCurrentDuration(newValue);

    const jsonData = await storetoJSON(copiedStores);
    let result = [];

    Object.keys(newStore).map((title) => {
      newStore[title].map((item) => {
        if (item.col === "duration") {
          jsonData.map((d) => {
            if (d[item.col] >= newValue[0] && d[item.col] <= newValue[1]) {
              result.push(d);
            }
          });
        }
      });
    });

    result = getUniqueArray(result);
    result = await JSONtoStore(result);
    // console.log(result);
    setFilteredData(result);

    let sum = 0;
    Object.keys(result).map((title) => {
      sum += result[title].length;
    });
    setCount(sum);
  };

  const handleStartDateChange = async (e) => {
    console.log(e.target.value);
    setCurrentDate((prev) => ({ ...prev, start: e.target.value }));

    const jsonData = await storetoJSON(copiedStores);
    let result = [];

    Object.keys(newStore).map((title) => {
      newStore[title].map((item) => {
        if (item.col === "start") {
          jsonData.map((d) => {
            console.log(
              new Date(d[item.col]).toLocaleDateString(),
              new Date(e.target.value).toLocaleDateString(),
              new Date(currentDate.end).toLocaleDateString()
            );
            if (
              new Date(d[item.col]).toLocaleDateString() >=
                new Date(e.target.value).toLocaleDateString() &&
              new Date(d[item.col]).toLocaleDateString() <=
                new Date(currentDate.end).toLocaleDateString()
            ) {
              result.push(d);
            }
          });
        }
      });
    });

    result = getUniqueArray(result);
    result = await JSONtoStore(result);
    // console.log(result);
    setFilteredData(result);

    let sum = 0;
    Object.keys(result).map((title) => {
      sum += result[title].length;
    });
    setCount(sum);
  };

  const handleEndDateChange = async (e) => {
    console.log(e.target.value);
    setCurrentDate((prev) => ({ ...prev, end: e.target.value }));

    const jsonData = await storetoJSON(copiedStores);
    let result = [];

    Object.keys(newStore).map((title) => {
      newStore[title].map((item) => {
        if (item.col === "start") {
          jsonData.map((d) => {
            console.log(
              new Date(d[item.col]).toLocaleDateString(),
              new Date(e.target.value).toLocaleDateString(),
              new Date(currentDate.start).toLocaleDateString()
            );
            if (
              new Date(d[item.col]).toLocaleDateString() >=
                new Date(currentDate.start).toLocaleDateString() &&
              new Date(d[item.col]).toLocaleDateString() <=
                new Date(e.target.value).toLocaleDateString()
            ) {
              result.push(d);
            }
          });
        }
      });
    });

    result = getUniqueArray(result);
    result = await JSONtoStore(result);
    // console.log(result);
    setFilteredData(result);

    let sum = 0;
    Object.keys(result).map((title) => {
      sum += result[title].length;
    });
    setCount(sum);
  };

  return {
    handleCheck,
    handleShowResult,
    handleDurationChange,
    handleStartDateChange,
    handleEndDateChange,
  };
};

export default useFilter;
