import React, { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { TbFilterOff } from "react-icons/tb";

import { logoColor } from "../../../../BauerColors";
import {
  handleCheck,
  handleCheckItems,
} from "../../Controllers/Slicers/checkSlicer";

const SlicerItems = ({
  tablesData,
  tableData,
  col,
  rel,
  relCol,
  currentDepth,
  maxDepth,
  subSlicers,
  copiedData,
  setData,
  isChecked,
  setIsChecked,
  checkArray,
  setCheckArray,
  setTablesData,
  mainSlicer,
  slicersCheckedItems,
  setSlicersCheckedItems,
  slicerMinDates,
  setSlicersMinDates,
  slicerMaxDates,
  setSlicersMaxDates,
  filterdData,
  table,
  tree,
  dataFontSize,
  dataFontWeight,
  selectedItem,
}) => {
  const [slicers, setSlicers] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  const [filteredSlicers, setFilteredSlicer] = useState(filterdData);
  // const [filteredData, setFilteredData] = useState({});

  useEffect(() => {
    const result = [];
    const resultArray = filteredSlicers?.filter((el) => el[relCol] === rel);
    // let tableResult = { ...copiedData };
    if (rel && relCol) {
      resultArray?.map((item) => {
        item?.[col] !== null &&
          item?.[col] !== undefined &&
          result.push(item?.[col]);
      });
    } else {
      filteredSlicers?.map((item) => {
        item?.[col] !== null &&
          item?.[col] !== undefined &&
          result.push(item?.[col]);
      });
    }

    // tableResult[table] = { ...tableResult[table], data: resultArray };
    // setFilteredData(tableResult);

    setFilteredSlicer(resultArray);
    setSlicers(
      Array.from(new Set(result)).sort((a, b) => {
        if (a == null) return 1;
        if (b == null) return -1;
        if (!isNaN(Date.parse(a)) && !isNaN(Date.parse(b))) {
          return new Date(a) - new Date(b);
        }
        if (typeof a === "number" && typeof b === "number") {
          return a - b;
        }
        return String(a).localeCompare(String(b));
      })
    );
  }, []);

  return slicers?.map((item, idx) => (
    <div
      key={idx}
      className="w-full flex flex-col items-start gap-[2px] pl-5 text-[hsl(0,0,30%)] "
    >
      <div className="w-full flex flex-row items-center gap-1">
        <div
          className="cursor-pointer"
          onClick={() =>
            setIsOpen((prev) => ({ ...prev, [item]: !prev?.[item] }))
          }
        >
          {currentDepth < maxDepth &&
            (isOpen?.[item] ? (
              <IoIosArrowDown size={12} />
            ) : (
              <IoIosArrowForward size={12} />
            ))}
        </div>
        <div>
          <input
            type="checkbox"
            checked={isChecked?.[item]}
            onChange={(e) =>
              handleCheck({
                e,
                item,
                tablesData,
                copiedData,
                checkArray,
                currentColName: subSlicers[currentDepth - 1],
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
                dataToFilter: copiedData,
                tree: [
                  ...tree,
                  { colName: col, item: item, selectedItem: selectedItem },
                ],
              })
            }
          />
        </div>
        <div>
          <p
            className="text-[10px]"
            style={{
              fontSize: `${dataFontSize}px`,
              fontWeight: dataFontWeight,
            }}
          >
            {item}
          </p>
        </div>
      </div>

      {isOpen?.[item] && (
        <SlicerItems
          tableData={tableData}
          tablesData={tablesData}
          col={subSlicers[currentDepth]}
          rel={item}
          relCol={subSlicers[currentDepth - 1]}
          currentDepth={currentDepth + 1}
          maxDepth={subSlicers?.length}
          subSlicers={subSlicers}
          copiedData={copiedData}
          setData={setData}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          checkArray={checkArray}
          setCheckArray={setCheckArray}
          setTablesData={setTablesData}
          mainSlicer={mainSlicer}
          slicersCheckedItems={slicersCheckedItems}
          setSlicersCheckedItems={setSlicersCheckedItems}
          slicerMinDates={slicerMinDates}
          setSlicersMinDates={setSlicersMinDates}
          slicerMaxDates={slicerMaxDates}
          setSlicersMaxDates={setSlicersMaxDates}
          filterdData={filteredSlicers}
          table={table}
          tree={[
            ...tree,
            { colName: col, item: item, selectedItem: selectedItem },
          ]}
          dataFontSize={dataFontSize}
          dataFontWeight={dataFontWeight}
        />
      )}
    </div>
  ));
};

const CheckSlicer = ({
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
  const [slicers, setSlicers] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  const [isChecked, setIsChecked] = useState({});
  const [copiedData, setCopiedData] = useState({ ...tablesData });

  const {
    mainSlicer,
    subSlicers,
    table,
    actions,
    headerFontSize,
    headerFontWeight,
    dataFontSize,
    dataFontWeight,
  } = item;

  useEffect(() => {
    setCopiedData(tablesData);
  }, [tablesData]);

  // console.log(slicersCheckedItems);

  useEffect(() => {
    const result = [];
    Object.keys(tablesData)?.map((table) => {
      tablesData?.[table]?.data?.map((item) => {
        item?.[mainSlicer] !== null &&
          item?.[mainSlicer] !== undefined &&
          // item?.[mainSlicer] !== "" &&
          result.push(item?.[mainSlicer]);
      });
    });
    // tableData?.map((item) => {
    //   result.push(item?.[mainSlicer]);
    // });
    setSlicers(
      Array.from(new Set(result)).sort((a, b) => {
        if (a == null) return 1;
        if (b == null) return -1;
        if (!isNaN(Date.parse(a)) && !isNaN(Date.parse(b))) {
          return new Date(a) - new Date(b);
        }
        if (typeof a === "number" && typeof b === "number") {
          return a - b;
        }
        return String(a).localeCompare(String(b));
      })
    );
  }, [data, tablesData]);

  return (
    <div className="w-[calc(100%-0.4rem)] h-[calc(100%-0.4rem)] flex flex-row overflow-scroll p-1 table_body">
      <div
        className="absolute p-[2px] -right-4 top-10 z-[2] bg-gray-400 cursor-pointer opacity-60"
        onClick={() => {
          // setSlicersCheckedItems({});
          const checkArrayResult = [];
          let slicersCheckedItemsResult = { ...slicersCheckedItems };
          checkArray?.map((el) => {
            if (isChecked?.[el]) {
              slicersCheckedItemsResult[el] = {
                group: slicersCheckedItemsResult?.[el]?.group,
                tree: slicersCheckedItemsResult?.[el]?.tree,
                checked: false,
              };
              // setSlicersCheckedItems((prev) => ({
              //   ...prev,
              //   [el]: { group: prev?.[el]?.group, checked: false },
              // }));
            } else {
              checkArrayResult.push(el);
            }
          });
          setIsChecked({});
          setCheckArray(checkArrayResult);
          setSlicersCheckedItems(slicersCheckedItemsResult);
          handleCheckItems({
            copiedData,
            checkArray: checkArrayResult,
            setTablesData,
            slicersCheckedItems: slicersCheckedItemsResult,
            dataToFilter: copiedData,
            slicerMinDates,
            setSlicersMinDates,
            slicerMaxDates,
            setSlicersMaxDates,
          });
          // setTablesData(copiedData);
        }}
      >
        <TbFilterOff size={12} color={logoColor} />
      </div>
      <div className="flex flex-col w-full gap-[2px]">
        <p
          className="text-[10px] font-[500] px-2 pt-2 text-[hsl(0,0,0%)] "
          style={{
            fontSize: `${headerFontSize}px`,
            fontWeight: headerFontWeight,
          }}
        >
          {subSlicers?.length > 0
            ? `${mainSlicer},${subSlicers.join(",")}`
            : `${mainSlicer}`}
        </p>
        {slicers?.map((item, idx) => (
          <div
            key={idx}
            className="w-full flex flex-col items-start gap-1 px-1"
          >
            <div className="w-full flex flex-row items-center gap-1">
              <div
                className="cursor-pointer"
                onClick={() =>
                  setIsOpen((prev) => ({ ...prev, [item]: !prev?.[item] }))
                }
              >
                {subSlicers?.length > 0 &&
                  (isOpen?.[item] ? (
                    <IoIosArrowDown size={12} />
                  ) : (
                    <IoIosArrowForward size={12} />
                  ))}
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={isChecked?.[item]}
                  onChange={(e) =>
                    handleCheck({
                      e,
                      item,
                      tablesData,
                      copiedData,
                      checkArray,
                      currentColName: mainSlicer,
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
                      dataToFilter: copiedData,
                      tree: [
                        {
                          colName: mainSlicer,
                          item: item,
                          selectedItem: selectedItem,
                        },
                      ],
                    })
                  }
                />
              </div>
              <div className="w-full overflow-ellipsis whitespace-nowrap overflow-hiddens">
                <p
                  className="text-[10px] text-[hsl(0,0,30%)] overflow-ellipsis whitespace-nowrap overflow-hidden"
                  style={{
                    fontSize: `${dataFontSize}px`,
                    fontWeight: dataFontWeight,
                  }}
                >
                  {item}
                </p>
              </div>
            </div>

            {isOpen?.[item] && (
              <SlicerItems
                tablesData={tablesData}
                tableData={tableData}
                col={subSlicers[0]}
                rel={item}
                relCol={mainSlicer}
                currentDepth={1}
                maxDepth={subSlicers?.length}
                subSlicers={subSlicers}
                copiedData={copiedData}
                setData={setData}
                setTablesData={setTablesData}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                checkArray={checkArray}
                setCheckArray={setCheckArray}
                mainSlicer={mainSlicer}
                slicersCheckedItems={slicersCheckedItems}
                setSlicersCheckedItems={setSlicersCheckedItems}
                slicerMinDates={slicerMinDates}
                setSlicersMinDates={setSlicersMinDates}
                slicerMaxDates={slicerMaxDates}
                setSlicersMaxDates={setSlicersMaxDates}
                filterdData={tableData}
                table={table}
                tree={[{ colName: mainSlicer, item: item }]}
                dataFontSize={dataFontSize}
                dataFontWeight={dataFontWeight}
                selectedItem={selectedItem}
                // checkCol={checkCol}
                // setCheckCol={setCheckCol}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckSlicer;
