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
  minDuration,
  maxDuration,
  count,
  setCount
) => {
  const [filteredData, setFilteredData] = useState([]);
  const [currentDuration, setCurrentDuration] = useState([
    minDuration,
    maxDuration,
  ]);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [currentDate, setCurrentDate] = useState({
    start: minDate,
    end: maxDate,
  });

  useEffect(() => {
    const getMinDate = async () => {
      const jsonData = await storetoJSON(copiedStores);
      const dates = jsonData.map((date) => date.start && new Date(date.start));
      const minDate = new Date(Math.min.apply(null, dates))
        .toISOString()
        .slice(0, 10);
      setMinDate(minDate);
      setCurrentDate((prev) => ({ ...prev, start: minDate }));
      console.log(minDate);
    };
    const getMaxDate = async () => {
      const jsonData = await storetoJSON(copiedStores);
      const dates = jsonData.map((date) => date.start && new Date(date.start));
      const maxDate = new Date(Math.max.apply(null, dates))
        .toISOString()
        .slice(0, 10);
      setMaxDate(maxDate);
      setCurrentDate((prev) => ({ ...prev, end: maxDate }));
      console.log(maxDate);
    };
    getMinDate();
    getMaxDate();
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
    count,
    minDate,
    maxDate,
    currentDate,
    minDuration,
    maxDuration,
    currentDuration,
  };
};

export default useFilter;