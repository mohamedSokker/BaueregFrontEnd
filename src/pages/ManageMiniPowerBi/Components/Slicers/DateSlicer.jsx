import React, { useEffect, useState } from "react";
import { Slider } from "@mui/material";
import { format, parseISO } from "date-fns";

import "../../Styles/EditCard.css";
import {
  // handleDateChange,
  handleDateSubmit,
} from "../../Controllers/Slicers/checkSlicer";
// import { useInitContext } from "../../Contexts/InitContext";

const DateSlicer = ({
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
}) => {
  // const { tablesData } = useInitContext();
  // const [slicers, setSlicers] = useState([]);
  // const [isOpen, setIsOpen] = useState({});
  // const [isChecked, setIsChecked] = useState({});
  const [copiedData, setCopiedData] = useState({ ...tablesData });
  const [dateRange, setDateRange] = useState([0, 100]);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);

  const { mainSlicer, subSlicers, actions, table } = item;

  // console.log(tablesData);

  // useEffect(() => {
  //   setCopiedData(tablesData);
  // }, [tablesData]);
  // console.log(minDate);
  // console.log(maxDate);

  useEffect(() => {
    // console.log(tableData);
    const dates = tableData?.map((item) => {
      return mainSlicer && mainSlicer !== "" && parseISO(item?.[mainSlicer]);
    }); // Assuming 'date' is the key for the date in your data
    const min = dates && Math.min(...dates);
    const max = dates && Math.max(...dates);
    setMinDate(min);
    setMaxDate(max);
  }, [data]);

  // Convert the slider value to a date
  const sliderValueToDate = (value) => {
    if (!minDate || !maxDate) return null;
    const date = new Date(minDate + (maxDate - minDate) * (value / 100));
    return date;
  };

  // useEffect(() => {
  //   const result = [];
  //   tableData?.map((item) => {
  //     result.push(item?.[mainSlicer]);
  //   });
  //   setSlicers(Array.from(new Set(result)));
  // }, [data]);

  // Handle slider change
  const handleSliderChange = (event, newValue) => {
    setDateRange(newValue);
    // const targetMinDate = slicerMinDates?.find(
    //   (item) => item.table === table && item.col === mainSlicer
    // );
    let copiedMinDates = [];
    let copiedMaxDates = [];
    const targetMinDateIndex = slicerMinDates?.findIndex(
      (item) => item.table === table && item.col === mainSlicer
    );
    // const targetMaxDate = slicerMaxDates?.find(
    //   (item) => item.table === table && item.col === mainSlicer
    // );
    const targetMaxDateIndex = slicerMaxDates?.findIndex(
      (item) => item.table === table && item.col === mainSlicer
    );
    // console.log(targetMinDateIndex);
    // console.log(targetMaxDateIndex);
    if (targetMinDateIndex !== -1) {
      copiedMinDates[targetMinDateIndex] = {
        table: table,
        col: mainSlicer,
        startDate: sliderValueToDate(newValue[0]),
      };
    } else {
      copiedMinDates.push({
        table: table,
        col: mainSlicer,
        startDate: sliderValueToDate(newValue[0]),
      });
    }
    if (targetMaxDateIndex !== -1) {
      copiedMaxDates[targetMaxDateIndex] = {
        table: table,
        col: mainSlicer,
        endDate: sliderValueToDate(newValue[1]),
      };
    } else {
      copiedMaxDates.push({
        table: table,
        col: mainSlicer,
        endDate: sliderValueToDate(newValue[1]),
      });
    }
    // console.log(copiedMinDates);
    // console.log(copiedMaxDates);
    setSlicersMinDates(copiedMinDates);
    setSlicersMaxDates(copiedMaxDates);
    // const startDate = sliderValueToDate(newValue[0]);
    // const endDate = sliderValueToDate(newValue[1]);
    // const filtered = tableData.filter((item) => {
    //   const itemDate = parseISO(item.date);
    //   return itemDate >= startDate && itemDate <= endDate;
    // });
    // setFilteredData(filtered);
  };

  return (
    <div className="px-[6px] py-[2px] w-full h-full">
      <div className="w-full h-full flex flex-col p-2 gap-2 justify-center items-center text-[10px] text-[hsl(0,0,0%)]">
        <form
          className="w-full h-full flex flex-col gap-2 justify-center items-center"
          // onSubmit={(e) =>
          //   handleDateSubmit({
          //     e,
          //     mainSlicer,
          //     newValue: dateRange,
          //     minDate,
          //     maxDate,
          //     setDateRange,
          //     copiedData,
          //     tablesData,
          //     checkArray,
          //     table,
          //     setTablesData,
          //     slicersCheckedItems,
          //   })
          // }
        >
          <input type="text" className="w-0 h-0" />
          <Slider
            //   aria-label="Default"
            size="small"
            getAriaLabel={() => "Duration range"}
            value={dateRange}
            onChangeCommitted={(e) =>
              handleDateSubmit({
                e,
                mainSlicer,
                newValue: dateRange,
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
              })
            }
            onChange={handleSliderChange}
            // onChange={handleDurationChange}
            //   mins
            // value={currentDuration}
            // valueLabelFormat={(val, i) => {
            //   return currentDuration[i].toString();
            // }}
            valueLabelFormat={(value) =>
              format(sliderValueToDate(value), "yyyy-MM-dd")
            }
            valueLabelDisplay="auto"
          />
        </form>
      </div>
    </div>
  );
};

export default DateSlicer;
