import React from "react";
import CheckSlicer from "./CheckSlicer";
import DateSlicer from "./DateSlicer";

const Slicer = ({
  item,
  data,
  setData,
  tableData,
  tablesData,
  setTablesData,
  checkArray,
  setCheckArray,
  slicersCheckedItems,
  setSlicersCheckedItems,
  slicerMinDates,
  setSlicersMinDates,
  slicerMaxDates,
  setSlicersMaxDates,
  selectedItem,
  isMainHovered,
}) => {
  return item?.slicerType === "Checks" ? (
    <CheckSlicer
      item={item}
      data={data}
      setData={setData}
      tableData={tableData}
      tablesData={tablesData}
      setTablesData={setTablesData}
      checkArray={checkArray}
      setCheckArray={setCheckArray}
      slicersCheckedItems={slicersCheckedItems}
      setSlicersCheckedItems={setSlicersCheckedItems}
      slicerMinDates={slicerMinDates}
      setSlicersMinDates={setSlicersMinDates}
      slicerMaxDates={slicerMaxDates}
      setSlicersMaxDates={setSlicersMaxDates}
      selectedItem={selectedItem}
      isMainHovered={isMainHovered}
    />
  ) : (
    <DateSlicer
      item={item}
      data={data}
      setData={setData}
      tableData={tableData}
      tablesData={tablesData}
      setTablesData={setTablesData}
      checkArray={checkArray}
      setCheckArray={setCheckArray}
      slicersCheckedItems={slicersCheckedItems}
      setSlicersCheckedItems={setSlicersCheckedItems}
      slicerMinDates={slicerMinDates}
      setSlicersMinDates={setSlicersMinDates}
      slicerMaxDates={slicerMaxDates}
      setSlicersMaxDates={setSlicersMaxDates}
      selectedItem={selectedItem}
      isMainHovered={isMainHovered}
    />
  );
};

export default Slicer;
