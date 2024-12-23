import React from "react";
import { ColorRing } from "react-loader-spinner";

import Table from "../Table";
import useTablesData from "../../Controllers/TablesData";
import { logoColor } from "../../../../BauerColors";
import ToolsSIdebar from "../Sidebars/ToolsSIdebar";

const SelectTables = ({
  categoryCount,
  setCategoryCount,
  setSelectedTable,
  setTablesData,
  // setCopiedTablesData,
}) => {
  const { DBdata, loading, getTableData, tableData, isChoose, setIsChoose } =
    useTablesData();

  const handleNext = () => {
    setSelectedTable(isChoose);

    isChoose?.map(async (item, i) => {
      const data = await getTableData(item);
      setTablesData((prev) => {
        return i === 0
          ? {
              ...prev,
              [item]: {
                name: prev?.[item]?.name ? prev?.[item]?.name : item,
                type: "source",
                data: data,
              },
            }
          : {
              ...prev,
              [item]: {
                name: prev?.[item]?.name ? prev?.[item]?.name : item,
                type: "target",
                data: data,
              },
            };
      });
      // setCopiedTablesData((prev) => {
      //   return i === 0
      //     ? {
      //         ...prev,
      //         [item]: {
      //           name: prev?.[item]?.name ? prev?.[item]?.name : item,
      //           type: "source",
      //           data: data,
      //         },
      //       }
      //     : {
      //         ...prev,
      //         [item]: {
      //           name: prev?.[item]?.name ? prev?.[item]?.name : item,
      //           type: "target",
      //           data: data,
      //         },
      //       };
      // });
    });
    setCategoryCount((prev) => prev + 1);
  };

  // console.log(tableData);
  return (
    <div
      className="w-full h-full flex flex-col justify-between flex-shrink-0 flex-grow-0"
      style={{
        translate: `${-100 * categoryCount}%`,
        transition: `all 0.5s ease-in-out`,
      }}
    >
      <div className="w-full h-full flex flex-row gap-8 items-start overflow-scroll">
        <div className="w-full h-full flex flex-row justify-start items-start px-1">
          <ToolsSIdebar
            categoryCount={categoryCount}
            setCategoryCount={setCategoryCount}
          />
          <div className="w-[200px] h-full bg-gray-300 overflow-x-scroll overflow-y-scroll flex flex-col gap-2 p-2">
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
                  className="w-full flex flex-row gap-2 justify-start items-center bg-white rounded-[4px] p-1 text-[12px] "
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
                    className="h-full w-full cursor-pointer"
                    onClick={() => getTableData(item.TABLE_NAME)}
                  >
                    <p>{item?.TABLE_NAME}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="w-[calc(100%-100px)] overflow-x-scroll">
            {tableData.length > 0 && <Table tableData={tableData} />}
          </div>
        </div>
      </div>

      <div className="w-full p-2">
        <button
          className="w-full p-2 bg-green-600 text-white rounded-[8px]"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectTables;
