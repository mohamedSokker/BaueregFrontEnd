import React, { useEffect, useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { ColorRing } from "react-loader-spinner";

import "../Styles/EditCard.css";
// import useTablesData from "../Controllers/TablesData";
import Table from "./Table";
import { logoColor } from "../../../BauerColors";
import { useDataContext } from "../Contexts/DataContext";
import { detectTableColumnTypes } from "../Services/getTypes";
import TableAbstract from "./TableAbstract";

const AddTableCard = ({
  setIsTableCard,
  selectedTable,
  setSelectedTable,
  isDataReady,
  setIsDataReady,
  tablesData,
  setTablesData,
  copiedTablesData,
  setCopiedTablesData,
  setSavedTablesData,
  isChoose,
  setIsChoose,
}) => {
  const [isCanceled, setIsCanceled] = useState(false);
  console.log(tablesData);

  const {
    DBdata,
    loading,
    // setLoading,
    // dataLoading,
    // setDataLoading,
    // message,
    getTableData,
    tableData,
    // setTableData,
    // tableSchema,
    // setTableSchema,
    // isChoose,
    // setIsChoose,
    // selectedTable,
    // setSelectedTable,
  } = useDataContext();

  useEffect(() => {
    setIsChoose(selectedTable);
  }, []);

  const handleSave = async () => {
    setIsCanceled(true);
    setIsDataReady(false);
    setSelectedTable(isChoose);
    isChoose?.map(async (item) => {
      const data = tablesData?.[item]?.data
        ? tablesData?.[item]?.data
        : await getTableData(item);
      if (data) {
        setTablesData((prev) => ({
          ...prev,
          [item]: {
            ...prev[item],
            name: item,
            data: data,
            dataTypes: detectTableColumnTypes(data),
          },
        }));
        setCopiedTablesData((prev) => ({
          ...prev,
          [item]: {
            ...prev[item],
            name: item,
            data: data,
            dataTypes: detectTableColumnTypes(data),
          },
        }));
        setSavedTablesData((prev) => ({
          ...prev,
          [item]: {
            ...prev[item],
            name: item,
            data: data,
            dataTypes: detectTableColumnTypes(data),
          },
        }));
      }
    });
    setIsDataReady(true);
    setTimeout(() => {
      setIsTableCard(false);
    }, 500);
  };

  return (
    <div
      className="fixed opacity-100 w-screen h-screen flex flex-col items-center justify-center left-0 top-0"
      style={{ zIndex: "1000" }}
    >
      <div
        className="absolute  w-screen h-screen flex flex-col items-center justify-center left-0 top-0 z-[1000]"
        style={{ backdropFilter: "blur(2px)", opacity: 0.8 }}
      ></div>
      <div
        className={`md:w-[95%] w-[95%] md:h-[85%] h-[90%] flex flex-col justify-between items-center bg-white dark:bg-gray-700 dark:text-white relative z-[1001] mainContent`}
        style={{
          animation: !isCanceled
            ? "animate-in 0.5s ease-in-out"
            : "animate-out 0.5s ease-in-out",
        }}
      >
        <div className="flex h-[10%] flex-row w-full p-2 px-2 justify-end">
          <div>
            <TooltipComponent
              content="close"
              position="BottomCenter"
              className="flex items-center"
            >
              <button
                className="hover:cursor-pointer p-1 text-[10px] rounded-full bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-900  w-[25px] aspect-square flex justify-center items-center"
                onClick={() => {
                  setIsCanceled(true);
                  setTimeout(() => {
                    setIsTableCard(false);
                  }, 500);
                }}
              >
                X
              </button>
            </TooltipComponent>
          </div>
        </div>

        <div className="w-full h-[80%] flex flex-row justify-start items-start px-1">
          <div className="w-[200px] h-full bg-gray-300 dark:bg-gray-800 overflow-scroll flex flex-col gap-2 p-2">
            {loading ? (
              <div className="flex flex-row justify-center items-center text-logoColor">
                <ColorRing
                  type="ColorRing"
                  colors={[
                    logoColor,
                    logoColor,
                    logoColor,
                    logoColor,
                    logoColor,
                  ]}
                  height={20}
                  width={20}
                />
                <p className="text-[12px] text-center px-2 text-logoColor font-bold">
                  {`Loading Tables Lists`}
                </p>
              </div>
            ) : (
              DBdata?.map((item, i) => (
                <div
                  key={i}
                  className="w-full flex flex-row gap-2 justify-start items-center bg-white dark:bg-gray-900 dark:text-whites rounded-[4px] p-1 text-[12px] "
                >
                  <input
                    type="checkbox"
                    checked={isChoose.includes(item?.TABLE_NAME) ? true : false}
                    onChange={() =>
                      setIsChoose((prev) =>
                        isChoose.includes(item?.TABLE_NAME)
                          ? isChoose.filter((el) => el !== item?.TABLE_NAME)
                          : [...prev, item?.TABLE_NAME]
                      )
                    }
                  />
                  <div
                    className="h-full w-full cursor-pointer truncate"
                    onClick={() => getTableData(item.TABLE_NAME)}
                  >
                    <TooltipComponent
                      position="RightCenter"
                      content={item?.TABLE_NAME}
                    >
                      <p className="truncate">{item?.TABLE_NAME}</p>
                    </TooltipComponent>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="w-[calc(100%-100px)] h-full overflow-scroll text-[10px]">
            {tableData.length > 0 && <TableAbstract data={tableData} />}
          </div>
        </div>

        <div className="w-full h-full flex flex-row  justify-between items-center p-2 px-2 text-[10px]">
          <div className="">
            <button
              className="text-white w-full font-[600] text-[10px] bg-[rgb(0,0,255)] rounded-md p-1 px-8"
              onClick={async () => {
                setIsCanceled(true);
                setTimeout(() => {
                  setIsTableCard(false);
                }, 500);
              }}
            >
              {`Cancel`}
            </button>
          </div>
          <div className="">
            <button
              className="text-white w-full font-[600] text-[10px] bg-[rgb(0,0,255)] rounded-md p-1 px-10"
              onClick={handleSave}
            >
              {`Save`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTableCard;
