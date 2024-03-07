import React, { useState, useEffect } from "react";
import { storeModel, filterModel, objectModel } from "../Model/model";
import { allowedCategories } from "../Constants/constants";

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

const useFilter = (
  newStore,
  setNewStore,
  copiedNewStore,
  copiedStores,
  setStores,
  count,
  setCount,
  setCurrentDuration,
  filteredData,
  setFilteredData,
  currentDate,
  setCurrentDate
) => {
  useEffect(() => {
    filterModel.checkedItems
      ? setNewStore(filterModel.checkedItems)
      : setNewStore(copiedNewStore);
    filterModel.count ? setCount(filterModel.count) : setCount(0);
  }, []);

  const handleCheck = async (title, store, index) => {
    let newCopiedStore = { ...objectModel };
    Object.keys(newStore).map((t) => {
      newStore[t].map((item, i) => {
        let r = {};
        if (t === title && index === i) {
          r = { value: item.value, checked: !item.checked, col: item.col };
          newCopiedStore = {
            ...newCopiedStore,
            [t]: [...newCopiedStore[t], r],
          };
        } else {
          r = { value: item.value, checked: item.checked, col: item.col };
          newCopiedStore = {
            ...newCopiedStore,
            [t]: [...newCopiedStore[t], r],
          };
        }
      });
    });
    setNewStore(newCopiedStore);

    const jsonData = await storetoJSON(copiedStores);
    let result = [];
    Object.keys(newCopiedStore).map((title) => {
      newCopiedStore[title].map((item) => {
        if (item.checked) {
          if (item.col === "pic") {
            jsonData.map((d) => {
              d[item.col].map((user) => {
                if (
                  user.name === item.value &&
                  allowedCategories.includes(d.category)
                ) {
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
              if (
                d[item.col] === item.value &&
                allowedCategories.includes(d.category)
              ) {
                result.push(d);
              }
            });
          }
        }
      });
    });
    result = getUniqueArray(result);
    console.log(result);
    result = await JSONtoStore(result);
    // console.log(result);
    setFilteredData(result);

    let sum = 0;
    Object.keys(result).map((title) => {
      sum += result[title].length;
    });
    setCount(sum);
  };

  const handleShowResult = async () => {
    filterModel.filteredData = filteredData;
    filterModel.checkedItems = newStore;
    filterModel.count = count;
    setStores(filteredData);
  };

  const handleDurationChange = async (e, newValue) => {
    console.log(newValue);
    setCurrentDuration(newValue);
    filterModel.currentDuration = newValue;

    const jsonData = await storetoJSON(copiedStores);
    let result = [];

    Object.keys(newStore).map((title) => {
      newStore[title].map((item) => {
        if (item.col === "duration") {
          jsonData.map((d) => {
            if (
              d[item.col] >= newValue[0] &&
              d[item.col] <= newValue[1] &&
              allowedCategories.includes(d.category)
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

  const handleStartDateChange = async (e) => {
    console.log(e.target.value);
    filterModel.currentDate = {
      start: e.target.value,
      end: filterModel.currentDate.end,
    };
    setCurrentDate((prev) => ({ ...prev, start: e.target.value }));

    const jsonData = await storetoJSON(copiedStores);
    let result = [];

    Object.keys(newStore).map((title) => {
      newStore[title].map((item) => {
        if (item.col === "start") {
          jsonData.map((d) => {
            // console.log(
            //   new Date(d[item.col]).toLocaleDateString(),
            //   new Date(e.target.value).toLocaleDateString(),
            //   new Date(currentDate.end).toLocaleDateString()
            // );
            if (
              new Date(d[item.col]).toLocaleDateString() >=
                new Date(e.target.value).toLocaleDateString() &&
              new Date(d[item.col]).toLocaleDateString() <=
                new Date(currentDate.end).toLocaleDateString() &&
              allowedCategories.includes(d.category)
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
    filterModel.currentDate = {
      start: filterModel.currentDate.end,
      end: e.target.value,
    };
    setCurrentDate((prev) => ({ ...prev, end: e.target.value }));

    const jsonData = await storetoJSON(copiedStores);
    let result = [];

    Object.keys(newStore).map((title) => {
      newStore[title].map((item) => {
        if (item.col === "start") {
          jsonData.map((d) => {
            // console.log(
            //   new Date(d[item.col]).toLocaleDateString(),
            //   new Date(e.target.value).toLocaleDateString(),
            //   new Date(currentDate.start).toLocaleDateString()
            // );
            if (
              new Date(d[item.col]).toLocaleDateString() >=
                new Date(currentDate.start).toLocaleDateString() &&
              new Date(d[item.col]).toLocaleDateString() <=
                new Date(e.target.value).toLocaleDateString() &&
              allowedCategories.includes(d.category)
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
