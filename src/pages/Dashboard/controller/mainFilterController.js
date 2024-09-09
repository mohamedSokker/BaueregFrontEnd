import React, { useEffect, useState } from "react";

import { avTrenchFilterModel, mainFilterModel } from "../Model/model";
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
    if (!mainFilterModel.checkedItems) {
      let eqs = [];
      let sites = [];
      usersData[0].roles?.Editor?.Equipments.concat(
        usersData[0].roles?.User?.Equipments
      ).map((eq) => {
        // if (eq.name.startsWith("MC") || eq.name.startsWith("BC"))
        eqs.push({ checked: false, value: eq.name });
      });
      usersData[0].roles?.Editor?.Sites.concat(
        usersData[0].roles?.User?.Sites
      ).map((site) => {
        sites.push({ checked: false, value: site.name });
      });
      const avTrenchData = copiedData.avData;
      //   .filter(
      //     (d) => d.Equipment.startsWith("MC") || d.Equipment.startsWith("BC")
      //   );
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
      setItems(mainFilterModel.checkedItems);
      //   setCount(mainFilterModel.count);
      setFilteredData(mainFilterModel.filteredData);
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

    const avData = copiedData.avData?.filter(
      (item) =>
        new Date(item.Date_Time) >=
          new Date(items.Time.data.currentDate.start) &&
        new Date(item.Date_Time) <= new Date(items.Time.data.currentDate.end) &&
        (eqsCheck.includes(item.Equipment) ||
          sitesCheck.includes(item.Location))
    );
    avData.sort((a, b) => new Date(a.Date_Time) - new Date(b.Date_Time));

    const maintData = copiedData.maintData?.filter(
      (item) =>
        new Date(item.Date_Time) >=
          new Date(items.Time.data.currentDate.start) &&
        new Date(item.Date_Time) <= new Date(items.Time.data.currentDate.end) &&
        (eqsCheck.includes(item.Equipment) ||
          sitesCheck.includes(item.Location))
    );
    maintData.sort((a, b) => new Date(a.Date_Time) - new Date(b.Date_Time));

    const fuelCons = copiedData.fuelCons?.filter(
      (item) =>
        new Date(item["Date "]) >=
          new Date(items.Time.data.currentDate.start) &&
        new Date(item["Date "]) <= new Date(items.Time.data.currentDate.end) &&
        (eqsCheck.includes(item["Equipment"]) ||
          sitesCheck.includes(item["Job Site"]))
    );
    fuelCons.sort((a, b) => new Date(a["Date "]) - new Date(b["Date "]));

    const oilCons = copiedData.oilCons?.filter(
      (item) =>
        new Date(item["Date"]) >= new Date(items.Time.data.currentDate.start) &&
        new Date(item["Date"]) <= new Date(items.Time.data.currentDate.end) &&
        (eqsCheck.includes(item["Equipment"]) ||
          sitesCheck.includes(item["Job Site"]))
    );
    oilCons.sort((a, b) => new Date(a["Date"]) - new Date(b["Date"]));

    // const eqs = [];
    // let eqsItem = {};
    const prodDrill = [];
    const prodTrench = [];
    copiedData?.location?.map((loc) => {
      sitesCheck.map((site) => {
        if (loc.Location === site) {
          prodDrill.push(
            ...copiedData.prodDrill?.filter(
              (item) =>
                new Date(item["Pouring Finish"]) >=
                  new Date(items.Time.data.currentDate.start) &&
                new Date(item["Pouring Finish"]) <=
                  new Date(items.Time.data.currentDate.end) &&
                (eqsCheck.includes(item["# Machine"]) ||
                  (item?.["# Machine"] === loc.Equipment &&
                    new Date(item?.["Pouring Finish"]) >=
                      new Date(loc.Start_Date) &&
                    new Date(item?.["Pouring Finish"]) <=
                      new Date(
                        loc.End_Date === null ? new Date() : loc.End_Date
                      )))
            )
          );
          prodTrench.push(
            ...copiedData.prodTrench?.filter(
              (item) =>
                new Date(item["Pouring Finish"]) >=
                  new Date(items.Time.data.currentDate.start) &&
                new Date(item["Pouring Finish"]) <=
                  new Date(items.Time.data.currentDate.end) &&
                (eqsCheck.includes(item["# Machine"]) ||
                  (item?.["# Machine"] === loc.Equipment &&
                    new Date(item?.["Pouring Finish"]) >=
                      new Date(loc.Start_Date) &&
                    new Date(item?.["Pouring Finish"]) <=
                      new Date(
                        loc.End_Date === null ? new Date() : loc.End_Date
                      )))
            )
          );
        }
      });
    });

    prodDrill.sort(
      (a, b) => new Date(a["Pouring Finish"]) - new Date(b["Pouring Finish"])
    );

    prodTrench.sort(
      (a, b) => new Date(a["Pouring Finish"]) - new Date(b["Pouring Finish"])
    );

    setFilteredData({
      avData: avData,
      maintData: maintData,
      fuelCons: fuelCons,
      oilCons: oilCons,
      prodDrill: prodDrill,
      prodTrench: prodTrench,
    });

    //get sum
    // const sum = filterData.length;
    // setCount(sum);
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

    const avData = copiedData.avData?.filter(
      (item) =>
        new Date(item.Date_Time) >=
          new Date(items.Time.data.currentDate.start) &&
        new Date(item.Date_Time) <= new Date(items.Time.data.currentDate.end) &&
        (eqsCheck.includes(item.Equipment) ||
          sitesCheck.includes(item.Location))
    );
    avData.sort((a, b) => new Date(a.Date_Time) - new Date(b.Date_Time));

    const maintData = copiedData.maintData?.filter(
      (item) =>
        new Date(item.Date_Time) >=
          new Date(items.Time.data.currentDate.start) &&
        new Date(item.Date_Time) <= new Date(items.Time.data.currentDate.end) &&
        (eqsCheck.includes(item.Equipment) ||
          sitesCheck.includes(item.Location))
    );
    maintData.sort((a, b) => new Date(a.Date_Time) - new Date(b.Date_Time));

    const fuelCons = copiedData.fuelCons?.filter(
      (item) =>
        new Date(item["Date "]) >=
          new Date(items.Time.data.currentDate.start) &&
        new Date(item["Date "]) <= new Date(items.Time.data.currentDate.end) &&
        (eqsCheck.includes(item["Equipment"]) ||
          sitesCheck.includes(item["Job Site"]))
    );
    fuelCons.sort((a, b) => new Date(a["Date "]) - new Date(b["Date "]));

    const oilCons = copiedData.oilCons?.filter(
      (item) =>
        new Date(item["Date"]) >= new Date(items.Time.data.currentDate.start) &&
        new Date(item["Date"]) <= new Date(items.Time.data.currentDate.end) &&
        (eqsCheck.includes(item["Equipment"]) ||
          sitesCheck.includes(item["Job Site"]))
    );
    oilCons.sort((a, b) => new Date(a["Date"]) - new Date(b["Date"]));

    const eqs = [];
    // let eqsItem = {};
    const prodDrill = [];
    const prodTrench = [];
    copiedData?.location?.map((loc) => {
      sitesCheck.map((site) => {
        if (loc.Location === site) {
          prodDrill.push(
            ...copiedData.prodDrill?.filter(
              (item) =>
                new Date(item["Pouring Finish"]) >=
                  new Date(items.Time.data.currentDate.start) &&
                new Date(item["Pouring Finish"]) <=
                  new Date(items.Time.data.currentDate.end) &&
                (eqsCheck.includes(item["# Machine"]) ||
                  (item?.["# Machine"] === loc.Equipment &&
                    new Date(item?.["Pouring Finish"]) >=
                      new Date(loc.Start_Date) &&
                    new Date(item?.["Pouring Finish"]) <=
                      new Date(
                        loc.End_Date === null ? new Date() : loc.End_Date
                      )))
            )
          );
          prodTrench.push(
            ...copiedData.prodTrench?.filter(
              (item) =>
                new Date(item["Pouring Finish"]) >=
                  new Date(items.Time.data.currentDate.start) &&
                new Date(item["Pouring Finish"]) <=
                  new Date(items.Time.data.currentDate.end) &&
                (eqsCheck.includes(item["# Machine"]) ||
                  (item?.["# Machine"] === loc.Equipment &&
                    new Date(item?.["Pouring Finish"]) >=
                      new Date(loc.Start_Date) &&
                    new Date(item?.["Pouring Finish"]) <=
                      new Date(
                        loc.End_Date === null ? new Date() : loc.End_Date
                      )))
            )
          );
        }
      });
    });

    prodDrill.sort(
      (a, b) => new Date(a["Pouring Finish"]) - new Date(b["Pouring Finish"])
    );

    prodTrench.sort(
      (a, b) => new Date(a["Pouring Finish"]) - new Date(b["Pouring Finish"])
    );

    setFilteredData({
      avData: avData,
      maintData: maintData,
      fuelCons: fuelCons,
      oilCons: oilCons,
      prodDrill: prodDrill,
      prodTrench: prodTrench,
    });

    //get sum
    // const sum = filterData.length;
    // setCount(sum);
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

    const avData = copiedData.avData?.filter(
      (item) =>
        new Date(item.Date_Time) >=
          new Date(items.Time.data.currentDate.start) &&
        new Date(item.Date_Time) <= new Date(items.Time.data.currentDate.end) &&
        (eqsCheck.includes(item.Equipment) ||
          sitesCheck.includes(item.Location))
    );
    avData.sort((a, b) => new Date(a.Date_Time) - new Date(b.Date_Time));

    const maintData = copiedData.maintData?.filter(
      (item) =>
        new Date(item.Date_Time) >=
          new Date(items.Time.data.currentDate.start) &&
        new Date(item.Date_Time) <= new Date(items.Time.data.currentDate.end) &&
        (eqsCheck.includes(item.Equipment) ||
          sitesCheck.includes(item.Location))
    );
    maintData.sort((a, b) => new Date(a.Date_Time) - new Date(b.Date_Time));

    const fuelCons = copiedData.fuelCons?.filter(
      (item) =>
        new Date(item["Date "]) >=
          new Date(items.Time.data.currentDate.start) &&
        new Date(item["Date "]) <= new Date(items.Time.data.currentDate.end) &&
        (eqsCheck.includes(item["Equipment"]) ||
          sitesCheck.includes(item["Job Site"]))
    );
    fuelCons.sort((a, b) => new Date(a["Date "]) - new Date(b["Date "]));

    const oilCons = copiedData.oilCons?.filter(
      (item) =>
        new Date(item["Date"]) >= new Date(items.Time.data.currentDate.start) &&
        new Date(item["Date"]) <= new Date(items.Time.data.currentDate.end) &&
        (eqsCheck.includes(item["Equipment"]) ||
          sitesCheck.includes(item["Job Site"]))
    );
    oilCons.sort((a, b) => new Date(a["Date"]) - new Date(b["Date"]));

    const eqs = [];
    // let eqsItem = {};
    const prodDrill = [];
    const prodTrench = [];
    copiedData?.location?.map((loc) => {
      sitesCheck.map((site) => {
        if (loc.Location === site) {
          prodDrill.push(
            ...copiedData.prodDrill?.filter(
              (item) =>
                new Date(item["Pouring Finish"]) >=
                  new Date(items.Time.data.currentDate.start) &&
                new Date(item["Pouring Finish"]) <=
                  new Date(items.Time.data.currentDate.end) &&
                (eqsCheck.includes(item["# Machine"]) ||
                  (item?.["# Machine"] === loc.Equipment &&
                    new Date(item?.["Pouring Finish"]) >=
                      new Date(loc.Start_Date) &&
                    new Date(item?.["Pouring Finish"]) <=
                      new Date(
                        loc.End_Date === null ? new Date() : loc.End_Date
                      )))
            )
          );
          prodTrench.push(
            ...copiedData.prodTrench?.filter(
              (item) =>
                new Date(item["Pouring Finish"]) >=
                  new Date(items.Time.data.currentDate.start) &&
                new Date(item["Pouring Finish"]) <=
                  new Date(items.Time.data.currentDate.end) &&
                (eqsCheck.includes(item["# Machine"]) ||
                  (item?.["# Machine"] === loc.Equipment &&
                    new Date(item?.["Pouring Finish"]) >=
                      new Date(loc.Start_Date) &&
                    new Date(item?.["Pouring Finish"]) <=
                      new Date(
                        loc.End_Date === null ? new Date() : loc.End_Date
                      )))
            )
          );
        }
      });
    });

    prodDrill.sort(
      (a, b) => new Date(a["Pouring Finish"]) - new Date(b["Pouring Finish"])
    );

    prodTrench.sort(
      (a, b) => new Date(a["Pouring Finish"]) - new Date(b["Pouring Finish"])
    );

    setFilteredData({
      avData: avData,
      maintData: maintData,
      fuelCons: fuelCons,
      oilCons: oilCons,
      prodDrill: prodDrill,
      prodTrench: prodTrench,
    });

    //get sum
    // const sum = filterData.length;
    // setCount(sum);
  };

  const handleShowResult = () => {
    mainFilterModel.filteredData = filteredData;
    // mainFilterModel.count = count;
    mainFilterModel.checkedItems = items;
    setData((prev) => ({ ...prev, ...filteredData }));
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
