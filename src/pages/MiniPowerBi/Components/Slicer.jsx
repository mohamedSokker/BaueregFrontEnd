import React, { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { TbFilterOff } from "react-icons/tb";

import { logoColor } from "../../../BauerColors";

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
  // checkCol,
  // setCheckCol,
}) => {
  const [slicers, setSlicers] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  // console.log(col);
  //   const [isChecked, setIsChecked] = useState({});

  const handleCheck = (e, item) => {
    setIsChecked((prev) => ({
      ...prev,
      [item]: !prev?.[item],
    }));
    if (e.target.checked === true) {
      if (checkArray?.length === 1 && e.target.checked === false) {
        setTablesData(copiedData);
      } else {
        let array = { ...copiedData };

        let resultData = [];
        let result = { ...tablesData };
        Object.keys(array)?.map((table) => {
          resultData = [];
          resultData = array[table]?.data?.filter(
            (el) => {
              const targetValues = [];
              // [mainSlicer, ...subSlicers]?.map((it) => {
              //   targetValues.push(el?.[it]);
              // });
              Object.keys(el)?.map((it) => {
                targetValues.push(el?.[it]);
              });
              return targetValues.some((els) =>
                [...checkArray, item]?.includes(els)
              );
            }
            // [...checkArray, item]?.includes(el[col])
          );
          result[table] = { ...result[table], data: resultData };
        });
        setTablesData(result);
        // console.log(result);
      }
      setCheckArray((prev) => [...prev, item]);
    } else if (e.target.checked === false) {
      if (checkArray?.length === 1 && e.target.checked === false) {
        setTablesData(copiedData);
      } else {
        let array = { ...copiedData };
        // console.log(copiedData);

        let resultData = [];
        let result = { ...tablesData };
        Object.keys(array)?.map((table) => {
          resultData = [];
          resultData = array[table]?.data?.filter(
            (el) => {
              const targetValues = [];
              // [mainSlicer, ...subSlicers]?.map((it) => {
              //   targetValues.push(el?.[it]);
              // });
              Object.keys(el)?.map((it) => {
                targetValues.push(el?.[it]);
              });
              return targetValues.some((els) =>
                checkArray?.filter((el) => el !== item)?.includes(els)
              );
            }
            // checkArray?.filter((el) => el !== item)?.includes(el[col])
          );
          result[table] = { ...result[table], data: resultData };
        });
        setTablesData(result);
        console.log(result);
      }
      setCheckArray(checkArray?.filter((el) => el !== item));
    }
  };

  useEffect(() => {
    const result = [];
    // let itemCols = {};
    if (rel && relCol) {
      tableData
        ?.filter((el) => el[relCol] === rel)
        ?.map((item) => {
          result.push(item?.[col]);
          // itemCols = { ...itemCols, [item?.[col]]: col };
        });
    } else {
      tableData?.map((item) => {
        result.push(item?.[col]);
      });
    }
    // console.log(col);

    setSlicers(Array.from(new Set(result)));
    // setCheckCol((prev) => ({ ...prev, ...itemCols }));
    // setCheckCol((prev) => ({ ...prev, [item]: col }));
  }, []);

  return slicers?.map((item, idx) => (
    <div key={idx} className="w-full flex flex-col items-start gap-1 pl-5">
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
            onChange={(e) => handleCheck(e, item)}
          />
        </div>
        <div>
          <p className="text-[10px]">{item}</p>
        </div>
      </div>

      {isOpen?.[item] && (
        <SlicerItems
          tableData={tableData}
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
          // checkCol={checkCol}
          // setCheckCol={setCheckCol}
        />
      )}
    </div>
  ));
};

const Slicer = ({
  item,
  data,
  setData,
  tableData,
  tablesData,
  setTablesData,
  checkArray,
  setCheckArray,
}) => {
  const [slicers, setSlicers] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  const [isChecked, setIsChecked] = useState({});

  // const [checkCol, setCheckCol] = useState({});
  // const [copiedData, setCopiedData] = useState({ ...tablesData });
  const copiedData = tablesData;
  // console.log(checkArray);
  // console.log(JSON.stringify(checkCol));

  const { mainSlicer, subSlicers, actions } = item;
  // console.log(tablesData);
  // console.log([mainSlicer, ...subSlicers]);

  const handleCheck = (e, item) => {
    // console.log(e.target.checked);
    setIsChecked((prev) => ({
      ...prev,
      [item]: !prev?.[item],
    }));
    if (e.target.checked === true) {
      let array = { ...copiedData };
      //   console.log(copiedData);

      let resultData = [];
      let result = { ...tablesData };
      Object.keys(array)?.map((table) => {
        resultData = [];
        resultData = array[table]?.data?.filter((el) => {
          const targetValues = [];
          // [mainSlicer, ...subSlicers]?.map((it) => {
          //   targetValues.push(el?.[it]);
          // });
          Object.keys(el)?.map((it) => {
            targetValues.push(el?.[it]);
          });
          return targetValues.some((els) =>
            [...checkArray, item]?.includes(els)
          );
          // return [...checkArray, item]?.includes(el[mainSlicer]);
        });
        result[table] = { ...result[table], data: resultData };
        // console.log(result);
      });
      // console.log(result);
      setTablesData(result);
      setCheckArray((prev) => [...prev, item]);
      // setCheckCol((prev) => ({ ...prev, [item]: mainSlicer }));
    } else if (e.target.checked === false) {
      if (checkArray?.length === 1) {
        setTablesData(copiedData);
      } else {
        let array = { ...copiedData };
        //   console.log(copiedData);

        let resultData = [];
        let result = { ...tablesData };
        Object.keys(array)?.map((table) => {
          resultData = [];
          resultData = array[table]?.data?.filter(
            (el) => {
              const targetValues = [];
              // [mainSlicer, ...subSlicers]?.map((it) => {
              //   targetValues.push(el?.[it]);
              // });
              Object.keys(el)?.map((it) => {
                targetValues.push(el?.[it]);
              });
              return targetValues.some((els) =>
                checkArray?.filter((el) => el !== item)?.includes(els)
              );
            }
            // checkArray?.filter((el) => el !== item)?.includes(el[mainSlicer])
          );
          result[table] = { ...result[table], data: resultData };
          // console.log(result);
        });
        console.log(result);
        setTablesData(result);
      }
      setCheckArray(checkArray?.filter((el) => el !== item));
    }
  };

  useEffect(() => {
    const result = [];
    // let itemCols = {};
    tableData?.map((item) => {
      result.push(item?.[mainSlicer]);
      // itemCols = { ...itemCols, [item?.[mainSlicer]]: mainSlicer };
    });
    // console.log(itemCols);
    setSlicers(Array.from(new Set(result)));
    // setCheckCol((prev) => ({ ...prev, ...itemCols }));

    // setCheckCol(prev => ({...prev, [item]: mainSlicer}))
  }, [data, tablesData]);

  return (
    <div className="w-full h-full flex flex-row overflow-scroll p-1">
      <div
        className="absolute p-[2px] -right-4 top-0 z-[2] bg-gray-400 cursor-pointer opacity-60"
        onClick={() => {
          setIsChecked({});
          setCheckArray([]);
          setTablesData(copiedData);
        }}
      >
        <TbFilterOff size={12} color={logoColor} />
      </div>
      <div className="flex flex-col w-full gap-2 ">
        <p className="text-[10px] font-[800]">
          {subSlicers?.length > 0
            ? `${mainSlicer},${subSlicers.join(",")}`
            : `${mainSlicer}`}
        </p>
        {slicers?.map((item, idx) => (
          <div key={idx} className="w-full flex flex-col items-start gap-1">
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
                  onChange={(e) => handleCheck(e, item)}
                />
              </div>
              <div>
                <p className="text-[10px] overflow-ellipsis whitespace-nowrap overflow-hidden">
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

export default Slicer;
