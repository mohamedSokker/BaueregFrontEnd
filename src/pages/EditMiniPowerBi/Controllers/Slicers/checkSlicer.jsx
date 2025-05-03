import { format } from "date-fns";
import { detectTableColumnTypes } from "../../Services/getTypes";

export const handleCheck = ({
  e,
  item,
  tablesData,
  copiedData,
  checkArray,
  currentColName,
  mainSlicer,
  subSlicers,
  setIsChecked,
  setTablesData,
  setCheckArray,
  slicersCheckedItems,
  setSlicersCheckedItems,
  slicerMinDates,
  setSlicersMinDates,
  slicerMaxDates,
  setSlicersMaxDates,
  dataToFilter,
  tree,
}) => {
  setIsChecked((prev) => ({
    ...prev,
    [item]: !prev?.[item],
  }));

  let slicersCheckedItemsResult = { ...slicersCheckedItems };
  slicersCheckedItemsResult[item] = {
    group: currentColName,
    checked: !slicersCheckedItemsResult?.[item]?.checked,
    tree: tree,
  };
  setSlicersCheckedItems((prev) => ({
    ...prev,
    [item]: {
      group: currentColName,
      checked: !prev?.[item]?.checked,
      tree: tree,
    },
  }));

  if (e.target.checked === true) {
    handleCheckItems({
      copiedData,
      tablesData,
      checkArray: [...checkArray, item],
      setTablesData,
      slicersCheckedItems: slicersCheckedItemsResult,
      dataToFilter,
      slicerMinDates,
      setSlicersMinDates,
      slicerMaxDates,
      setSlicersMaxDates,
    });

    setCheckArray((prev) => [...prev, item]);
  } else if (e.target.checked === false) {
    handleCheckItems({
      copiedData,
      tablesData,
      checkArray: checkArray?.filter((el) => el !== item),
      setTablesData,
      slicersCheckedItems: slicersCheckedItemsResult,
      dataToFilter,
      slicerMinDates,
      setSlicersMinDates,
      slicerMaxDates,
      setSlicersMaxDates,
    });
    setCheckArray(checkArray?.filter((row) => row !== item));
  }
};

export const handleCheckItems = ({
  copiedData,
  tablesData,
  checkArray,
  setTablesData,
  slicersCheckedItems,
  dataToFilter,
  slicerMinDates,
  setSlicersMinDates,
  slicerMaxDates,
  setSlicersMaxDates,
}) => {
  let slicers = {};

  Object.keys(slicersCheckedItems)?.map((item) => {
    if (slicersCheckedItems?.[item]?.checked === true) {
      slicers = slicers?.[slicersCheckedItems?.[item]?.tree?.[0]?.selectedItem]
        ? {
            ...slicers,
            [slicersCheckedItems?.[item]?.tree?.[0]?.selectedItem]: [
              ...slicers?.[
                slicersCheckedItems?.[item]?.tree?.[0]?.selectedItem
              ],
              slicersCheckedItems?.[item],
            ],
          }
        : {
            ...slicers,
            [slicersCheckedItems?.[item]?.tree?.[0]?.selectedItem]: [
              slicersCheckedItems?.[item],
            ],
          };
      // slicers.push(slicersCheckedItems?.[item]);
    }
  });

  console.log(slicers);

  if (
    Object.keys(slicers)?.length === 0 &&
    slicerMinDates?.length === 0 &&
    slicerMaxDates?.length === 0
  ) {
    setTablesData(dataToFilter);
  } else {
    let resultData = [];
    let result = { ...dataToFilter };
    Object.keys(dataToFilter)?.map((table) => {
      resultData = [];
      resultData = dataToFilter[table]?.data?.filter((row) => {
        const checkedArrayCheck =
          Object.keys(slicers).length === 0
            ? true
            : Object.keys(slicers)?.every((slicer) => {
                return [...slicers?.[slicer]].some(({ tree }) => {
                  return tree?.every(({ colName, item }) => {
                    if (row[colName] === item) {
                      return true;
                    } else {
                      return false;
                    }
                  });
                });
              });
        const minDatesCheck =
          slicerMinDates?.length === 0
            ? true
            : slicerMinDates?.some(
                (item) =>
                  item.table === table &&
                  new Date(row?.[item?.col]) >= item.startDate
              );
        const maxDatesCheck =
          slicerMaxDates?.length === 0
            ? true
            : slicerMaxDates?.some(
                (item) =>
                  item.table === table &&
                  new Date(row?.[item?.col]) <= item.endDate
              );

        if (checkedArrayCheck && minDatesCheck && maxDatesCheck) {
          return true;
        } else {
          return false;
        }
      });
      result[table] = {
        ...result[table],
        data: resultData,
      };
    });
    console.log(result);
    setTablesData(result);
  }
};

const sliderValueToDate = (value, minDate, maxDate) => {
  // if (!minDate || !maxDate) return null;
  const date = new Date(minDate + (maxDate - minDate) * (value / 100));
  return date;
};

export const handleDateChange = ({
  event,
  mainSlicer,
  newValue,
  minDate,
  maxDate,
  setDateRange,
  copiedData,
  tablesData,
  checkArray,
  table,
  setTablesData,
  slicersCheckedItems,
}) => {
  setDateRange(newValue);
};

export const handleDateSubmit = ({
  e,
  mainSlicer,
  newValue,
  minDate,
  maxDate,
  setDateRange,
  copiedData,
  tablesData,
  checkArray,
  table,
  setTablesData,
  slicersCheckedItems,
  slicerMinDates,
  setSlicersMinDates,
  slicerMaxDates,
  setSlicersMaxDates,
}) => {
  console.log("submit");
  e.preventDefault();
  handleCheckItems({
    copiedData,
    checkArray,
    setTablesData,
    slicersCheckedItems,
    tablesData,
    dataToFilter: copiedData,
    slicerMinDates,
    setSlicersMinDates,
    slicerMaxDates,
    setSlicersMaxDates,
  });
  // setTablesData(result);
};
