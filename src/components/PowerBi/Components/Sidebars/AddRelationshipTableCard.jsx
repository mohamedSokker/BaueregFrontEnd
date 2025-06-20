import React, { useEffect, useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { ColorRing } from "react-loader-spinner";

import "../../Styles/EditCard.css";
// import useTablesData from "../../Controllers/TablesData";
import { logoColor } from "../../../../BauerColors";
import { PageLoading } from "../../../../components";
import { useDataContext } from "../../Contexts/DataContext";
import { detectTableColumnTypes } from "../../Services/getTypes";

const AddRelationshipTableCard = ({
  setIsRelationshipTableCard,
  selectedTable,
  setSelectedTable,
  setIsDataReady,
  setTablesData,
  setCopiedTablesData,
  setSavedTablesData,

  isRelationshipChoose,
  setIsRelationshipChoose,
}) => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const {
    relationshipdata,
    setRelationshipData,
    loading,
    getTableData,
    tableData,
    // isRelationshipChoose,
    // setIsRelationshipChoose,
    relationsTable,
  } = useDataContext();

  // console.log(relationshipdata);

  useEffect(() => {
    setIsRelationshipChoose(selectedTable);
  }, []);

  const handleSave = async () => {
    setIsCanceled(true);
    setIsDataReady(false);
    setSelectedTable(isRelationshipChoose);

    for (const item of relationsTable) {
      if (isRelationshipChoose?.includes(item.Name)) {
        const relationships = JSON.parse(item?.RelationShips);
        console.log(relationships);
        const copiedRelationstablesData = {
          ...relationshipdata,
        };
        let sourceTable = relationships?.[0]?.source;
        let sourceData = copiedRelationstablesData?.[sourceTable]
          ? copiedRelationstablesData?.[sourceTable]
          : [];
        let currentVT = [];

        for (const rel of relationships) {
          console.log(`first loop`);
          if (rel?.source === "FiltersNode") {
            console.log(`first loop inside FiltersNode`);
            if (rel?.sourceHandle === "Blank()") {
              console.log("First loop: Filtering data...");
              copiedRelationstablesData[rel?.target] =
                copiedRelationstablesData?.[rel?.target]?.filter(
                  (row) => row?.[rel?.targetHandle] === null
                );
            }
          }
        }

        for (const item of relationships) {
          console.log("Second loop: Joining data...");
          currentVT = [];
          currentVT.push(
            ...sourceData?.map((row1) => {
              const match = copiedRelationstablesData?.[item?.target]?.find(
                (row2) =>
                  row1?.[item?.sourceHandle] === row2?.[item?.targetHandle]
              );
              return { ...match, ID: row1.ID, ...row1 };
            })
          );
          sourceData = currentVT;
        }

        currentVT.push(sourceData);
        currentVT.pop();
        console.log(currentVT);
        setTablesData((prev) => ({
          ...prev,
          [item?.Name]: {
            name: item?.Name,
            data: currentVT,
            dataTypes: detectTableColumnTypes(currentVT),
          },
        }));
        setCopiedTablesData((prev) => ({
          ...prev,
          [item?.Name]: {
            name: item?.Name,
            data: currentVT,
            dataTypes: detectTableColumnTypes(currentVT),
          },
        }));
        setSavedTablesData((prev) => ({
          ...prev,
          [item?.Name]: {
            name: item?.Name,
            data: currentVT,
            dataTypes: detectTableColumnTypes(currentVT),
          },
        }));
      }
    }
    setIsDataReady(true);
    setTimeout(() => {
      setIsRelationshipTableCard(false);
    }, 500);
  };

  //   console.log(selectedTable);

  // if (dataLoading) return <PageLoading message={`Loading Data...`} />;

  return (
    <div
      className="fixed opacity-100 w-screen h-screen flex flex-col items-center justify-center left-0 top-0"
      style={{ zIndex: "1000" }}
    >
      <div
        className="absolute  w-screen h-screen flex flex-col items-center justify-center left-0 top-0 z-[1000]"
        style={{ backdropFilter: "blur(2px)", opacity: 0.8 }}
      ></div>
      {dataLoading && <PageLoading message={`Loading Data...`} />}
      <div
        className={`md:w-[95%] w-[95%] md:h-[85%] h-[90%] flex flex-col justify-between items-center bg-white dark:bg-gray-700 dark:text-white relative z-[1001] mainContent overflow-y-scroll`}
        style={{
          animation: !isCanceled
            ? "animate-in 0.5s ease-in-out"
            : "animate-out 0.5s ease-in-out",
        }}
      >
        <div className="flex flex-row w-full p-2 px-2 justify-end">
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
                    setIsRelationshipTableCard(false);
                  }, 500);
                }}
              >
                X
              </button>
            </TooltipComponent>
          </div>
        </div>

        <div className="w-full h-full flex flex-row justify-start items-start px-1 overflow-y-scroll">
          <div className="w-[100%] bg-gray-300 dark:bg-gray-800 dark:text-white overflow-x-scroll flex flex-col gap-2 p-2">
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
                  {`Loading RelationShips Lists`}
                </p>
              </div>
            ) : (
              relationsTable?.map((item, i) => (
                <div
                  key={i}
                  className="w-full flex flex-row gap-2 justify-start items-center bg-white dark:bg-gray-900 rounded-[4px] p-1 text-[12px] "
                >
                  <input
                    type="checkbox"
                    checked={
                      isRelationshipChoose.includes(item?.Name) ? true : false
                    }
                    onChange={(e) => {
                      // console.log(e.target.checked);
                      setIsRelationshipChoose((prev) =>
                        isRelationshipChoose.includes(item?.Name)
                          ? isRelationshipChoose.filter(
                              (el) => el !== item?.Name
                            )
                          : [...prev, item?.Name]
                      );
                      const relationsData = JSON.parse(item?.RelationShips);

                      relationsData?.map(async (el, idx) => {
                        setDataLoading(true);
                        if (idx === 0) {
                          const sourceData = await getTableData(el?.source);
                          const targetData = await getTableData(el?.target);
                          setRelationshipData((prev) => ({
                            ...prev,
                            [el?.source]: sourceData,
                            [el?.target]: targetData,
                          }));
                        } else {
                          const targetData = await getTableData(el?.target);
                          setRelationshipData((prev) => ({
                            ...prev,
                            [el?.target]: targetData,
                          }));
                        }
                        setDataLoading(false);
                      });
                    }}
                  />
                  <div
                    className="h-full w-full cursor-pointer overflow-ellipsis whitespace-nowrap overflow-hidden"
                    // onClick={() => getTableData(item.TABLE_NAME)}
                  >
                    <p className="overflow-ellipsis whitespace-nowrap overflow-hidden">{`${item?.Name}`}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* <div className="w-[calc(100%-100px)] overflow-x-scroll">
            {tableData.length > 0 && <Table tableData={tableData} />}
          </div> */}
        </div>

        <div className="w-full flex flex-row  justify-between items-center p-2 px-2 text-[10px]">
          <div className="">
            <button
              className="text-white w-full font-[600] text-[10px] bg-[rgb(0,0,255)] rounded-md p-1 px-8"
              onClick={async () => {
                setIsCanceled(true);
                setTimeout(() => {
                  setIsRelationshipTableCard(false);
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

export default AddRelationshipTableCard;
