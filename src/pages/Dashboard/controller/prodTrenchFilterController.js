import React, { useEffect, useState } from "react";

import { prodTrenchFilterModel } from "../Model/model";
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
    if (!prodTrenchFilterModel.checkedItems) {
      let eqs = [];
      let sites = [];
      usersData[0].roles?.Editor?.Equipments.concat(
        usersData[0].roles?.User?.Equipments
      ).map((eq) => {
        if (eq.name.startsWith("MC") || eq.name.startsWith("BC"))
          eqs.push({ checked: false, value: eq.name });
      });
      usersData[0].roles?.Editor?.Sites.concat(
        usersData[0].roles?.User?.Sites
      ).map((site) => {
        sites.push({ checked: false, value: site.name });
      });
      const avTrenchData = copiedData.prodTrench.filter(
        (d) =>
          d["# Machine"].startsWith("MC") || d["# Machine"].startsWith("BC")
      );
      avTrenchData.sort((a, b) => a["Pouring Finish"] - b["Pouring Finish"]);
      eqs = getUniqueArray(eqs);
      sites = getUniqueArray(sites);
      setItems({
        Time: {
          col: "Date_Time",
          data: {
            minDate: new Date(avTrenchData[0]["Pouring Finish"])
              .toISOString()
              .slice(0, 10),
            maxDate: new Date(
              avTrenchData[avTrenchData.length - 1]["Pouring Finish"]
            )
              .toISOString()
              .slice(0, 10),
            currentDate: {
              start: new Date(avTrenchData[0]["Pouring Finish"])
                .toISOString()
                .slice(0, 10),
              end: new Date(
                avTrenchData[avTrenchData.length - 1]["Pouring Finish"]
              )
                .toISOString()
                .slice(0, 10),
            },
          },
        },
        Equipments: { col: "Equipment", data: eqs },
        Sites: { col: "Location", data: sites },
      });
    } else {
      setItems(prodTrenchFilterModel.checkedItems);
      setCount(prodTrenchFilterModel.count);
      setFilteredData(prodTrenchFilterModel.filteredData);
    }
  }, []);

  const handleCheck = ({ title, store, index }) => {
    console.log(copiedData);
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
    console.log(eqsCheck);
    console.log(sitesCheck);
    const filterData = copiedData.prodTrench?.filter(
      (item) =>
        new Date(item["Pouring Finish"]) >=
          new Date(items.Time.data.currentDate.start) &&
        new Date(item["Pouring Finish"]) <=
          new Date(items.Time.data.currentDate.end) &&
        (eqsCheck.includes(item["# Machine"]) ||
          sitesCheck.includes(item["Project"]))
    );
    filterData.sort(
      (a, b) => new Date(a["Pouring Finish"]) - new Date(b["Pouring Finish"])
    );
    setFilteredData(filterData);

    //get sum
    const sum = filterData.length;
    setCount(sum);
    console.log(filterData);
    console.log(sum);
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

    const filterData = copiedData.prodTrench?.filter(
      (item) =>
        new Date(item["Pouring Finish"]) >= new Date(e.target.value) &&
        new Date(item["Pouring Finish"]) <=
          new Date(items.Time.data.currentDate.end) &&
        (eqsCheck.includes(item["# Machine"]) ||
          sitesCheck.includes(item["Project"]))
    );
    filterData.sort(
      (a, b) => new Date(a["Pouring Finish"]) - new Date(b["Pouring Finish"])
    );
    setFilteredData(filterData);

    //get sum
    const sum = filterData.length;
    setCount(sum);
    console.log(filterData);
    console.log(sum);
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

    const filterData = copiedData.prodTrench?.filter(
      (item) =>
        new Date(item["Pouring Finish"]) >=
          new Date(items.Time.data.currentDate.start) &&
        new Date(item["Pouring Finish"]) <= new Date(e.target.value) &&
        (eqsCheck.includes(item["# Machine"]) ||
          sitesCheck.includes(item["Project"]))
    );
    filterData.sort(
      (a, b) => new Date(a["Pouring Finish"]) - new Date(b["Pouring Finish"])
    );
    setFilteredData(filterData);

    //get sum
    const sum = filterData.length;
    setCount(sum);
    console.log(filterData);
    console.log(sum);
  };

  const handleShowResult = () => {
    prodTrenchFilterModel.filteredData = filteredData;
    prodTrenchFilterModel.count = count;
    prodTrenchFilterModel.checkedItems = items;
    setData((prev) => ({ ...prev, prodTrench: filteredData }));
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
