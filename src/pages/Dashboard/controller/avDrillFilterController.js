import React, { useEffect, useState } from "react";

import { avDrillFilterModel } from "../Model/model";
import { useNavContext } from "../../../contexts/NavContext";

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

const useFilter = ({ copiedData, setData, count, setCount }) => {
  const { usersData } = useNavContext();

  const [items, setItems] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (!avDrillFilterModel.checkedItems) {
      let eqs = [];
      let sites = [];
      usersData[0].roles?.Editor?.Equipments.concat(
        usersData[0].roles?.User?.Equipments
      ).map((eq) => {
        if (eq.name.startsWith("BG"))
          eqs.push({ checked: false, value: eq.name });
      });
      usersData[0].roles?.Editor?.Sites.concat(
        usersData[0].roles?.User?.Sites
      ).map((site) => {
        sites.push({ checked: false, value: site.name });
      });
      const avTrenchData = copiedData.avData.filter((d) =>
        d.Equipment.startsWith("BG")
      );
      avTrenchData.sort((a, b) => a.Date_Time - b.Date_Time);
      eqs = getUniqueArray(eqs);
      sites = getUniqueArray(sites);
      setItems({
        Time: {
          col: "Date_Time",
          data: {
            minDate: new Date(avTrenchData[0].Date_Time)
              .toISOString()
              .slice(0, 10),
            maxDate: new Date(avTrenchData[avTrenchData.length - 1].Date_Time)
              .toISOString()
              .slice(0, 10),
            currentDate: {
              start: new Date(avTrenchData[0].Date_Time)
                .toISOString()
                .slice(0, 10),
              end: new Date(avTrenchData[avTrenchData.length - 1].Date_Time)
                .toISOString()
                .slice(0, 10),
            },
          },
        },
        Equipments: { col: "Equipment", data: eqs },
        Sites: { col: "Location", data: sites },
      });
    } else {
      setItems(avDrillFilterModel.checkedItems);
      setCount(avDrillFilterModel.count);
      setFilteredData(avDrillFilterModel.filteredData);
    }
  }, []);

  const handleCheck = ({ title, store, index }) => {
    // change item checked
    let data = [];
    let eqsCheck = [];
    let sitesCheck = [];
    items[title].data.map((item, i) => {
      if (i === index) {
        data.push({ checked: !item.checked, value: item.value });
      } else {
        data.push({ checked: item.checked, value: item.value });
      }
    });
    setItems((prev) => ({ ...prev, [title]: { ...prev[title], data: data } }));

    // get filtered date
    Object.keys(items).map((t) => {
      if (items[t].col !== "Date_Time") {
        items[t].data.map((d, i) => {
          if (i === index && t === title) {
            if (!d.checked) {
              if (items[t].col === "Equipment") {
                eqsCheck.push(d.value);
              } else {
                sitesCheck.push(d.value);
              }
            }
          } else {
            if (d.checked) {
              if (items[t].col === "Equipment") {
                eqsCheck.push(d.value);
              } else {
                sitesCheck.push(d.value);
              }
            }
          }
        });
      }
    });

    const filterData = copiedData.avData?.filter(
      (item) =>
        new Date(item.Date_Time) >=
          new Date(items.Time.data.currentDate.start) &&
        new Date(item.Date_Time) <= new Date(items.Time.data.currentDate.end) &&
        (eqsCheck.includes(item.Equipment) ||
          sitesCheck.includes(item.Location)) &&
        item.Equipment.startsWith("BG")
    );
    filterData.sort((a, b) => new Date(a.Date_Time) - new Date(b.Date_Time));
    setFilteredData(filterData);

    //get sum
    const sum = filterData.length;
    setCount(sum);
  };

  const handleStartTimeChange = (e) => {
    setItems((prev) => ({
      ...prev,
      Time: {
        col: "Date_Time",
        data: {
          ...prev.Time.data,
          currentDate: {
            ...prev.Time.data.currentDate,
            start: e.target.value,
          },
        },
      },
    }));

    let eqsCheck = [];
    let sitesCheck = [];

    Object.keys(items).map((t) => {
      if (items[t].col !== "Date_Time") {
        items[t].data.map((d, i) => {
          if (d.checked) {
            if (items[t].col === "Equipment") {
              eqsCheck.push(d.value);
            } else {
              sitesCheck.push(d.value);
            }
          }
        });
      }
    });

    const filterData = copiedData.avData?.filter(
      (item) =>
        new Date(item.Date_Time) >= new Date(e.target.value) &&
        new Date(item.Date_Time) <= new Date(items.Time.data.currentDate.end) &&
        (eqsCheck.includes(item.Equipment) ||
          sitesCheck.includes(item.Location))
    );
    filterData.sort((a, b) => new Date(a.Date_Time) - new Date(b.Date_Time));
    setFilteredData(filterData);

    //get sum
    const sum = filterData.length;
    setCount(sum);
  };

  const handleEndTimeChange = (e) => {
    setItems((prev) => ({
      ...prev,
      Time: {
        col: "Date_Time",
        data: {
          ...prev.Time.data,
          currentDate: {
            ...prev.Time.data.currentDate,
            end: e.target.value,
          },
        },
      },
    }));

    let eqsCheck = [];
    let sitesCheck = [];

    Object.keys(items).map((t) => {
      if (items[t].col !== "Date_Time") {
        items[t].data.map((d, i) => {
          if (d.checked) {
            if (items[t].col === "Equipment") {
              eqsCheck.push(d.value);
            } else {
              sitesCheck.push(d.value);
            }
          }
        });
      }
    });

    const filterData = copiedData.avData?.filter(
      (item) =>
        new Date(item.Date_Time) >=
          new Date(items.Time.data.currentDate.start) &&
        new Date(item.Date_Time) <= new Date(e.target.value) &&
        (eqsCheck.includes(item.Equipment) ||
          sitesCheck.includes(item.Location))
    );
    filterData.sort((a, b) => new Date(a.Date_Time) - new Date(b.Date_Time));
    setFilteredData(filterData);

    //get sum
    const sum = filterData.length;
    setCount(sum);
  };

  const handleShowResult = () => {
    avDrillFilterModel.filteredData = filteredData;
    avDrillFilterModel.count = count;
    avDrillFilterModel.checkedItems = items;
    setData((prev) => ({ ...prev, avData: filteredData }));
  };

  return {
    items,
    handleCheck,
    handleStartTimeChange,
    handleEndTimeChange,
    handleShowResult,
  };
};

export default useFilter;
