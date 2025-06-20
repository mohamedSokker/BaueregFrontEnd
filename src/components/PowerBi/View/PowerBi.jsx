import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CiWarning } from "react-icons/ci";

import Analysis from "../Components/Pages/Analysis.jsx";
import SelectTables from "../Components/Pages/SelectTables.jsx";
import TablesRelations from "../Components/Pages/TablesRelations.jsx";
import VirtualTable from "../Components/Pages/VirtualTable.jsx";
import FiltersCards from "../Components/FiltersCards.jsx";
import ManageTables from "../Components/Pages/ManageTable.jsx";
import ChooseUsers from "../Components/Pages/ChooseUsers.jsx";
import PageLoading from "../../../components/PageLoading.jsx";
import { useDataContext } from "../Contexts/DataContext.jsx";
import { useInitContext } from "../Contexts/InitContext.jsx";
import { detectTableColumnTypes } from "../Services/getTypes.js";
import { useNavContext } from "../../../contexts/NavContext";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.jsx";
import {
  barOptions,
  barProps,
  cardOptions,
  cardProps,
  gaugeOptions,
  gaugeProps,
  lineOptions,
  lineProps,
  pieOptions,
  pieProps,
  schedulerOptions,
  schedulerProps,
  slicerOptions,
  slicerProps,
  tableProps,
  tablesOptions,
  timelineOptions,
  timelineProps,
} from "../Model/model.js";

const PowerBi = ({ sidebarPreview, isWorker }) => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();

  const [dataExpressions, setDataExpressions] = useState([]);
  const [isAuth, setIsAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Initializing...");
  const {
    mouseMoveMove,
    mouseUpMove,
    setData,
    closeSmallSidebar,
    setIsPreview,

    savedTablesData,
    isItemChecked,
    isItemUnChecked,
    isSelectAllChecked,
    isSortChecked,

    setColData,
    setIsSelectAllChecked,
    setIsItemChecked,
    setIsItemUnChecked,
    setIsSortChecked,

    data,
    expressions,
    tablesData,
    setTablesData,
    copiedTablesData,
    setCopiedTablesData,
    setSavedTablesData,
    isChoose,
    setIsChoose,
    isRelationshipChoose,
    setIsRelationshipChoose,
    setSelectedRelationshipsTable,
    selectedRelationshipsTable,
    setSelectedTable,
    selectedTable,
    setViewName,
    setViewGroup,
    setUsersNamesData,
    setAddedCols,
    setExpressions,
    colData,
    setAddedTables,
    selectedRefTable,
    setSelectedRefTable,
  } = useInitContext();

  // const { loading } = useDataContext();
  const {
    getTableData,
    setRelationshipData,
    relationshipdata,
    relationsTable,
    setRelationsTable,
  } = useDataContext();

  const { usersData } = useNavContext();

  const RENAME_MAP = {
    Date: "Date_",
    // Add other reserved keys here if needed
  };

  const RETRUN_RENAME_MAP = {
    Date_: "Date",
  };

  const MODEL_MAP = {
    Table: { props: tableProps, options: tablesOptions },
    Pie: { props: pieProps, options: pieOptions },
    Gauge: { props: gaugeProps, options: gaugeOptions },
    Bar: { props: barProps, options: barOptions },
    Timeline: { props: timelineProps, options: timelineOptions },
    Line: { props: lineProps, options: lineOptions },
    Scheduler: { props: schedulerProps, options: schedulerOptions },
    Slicer: { props: slicerProps, options: slicerOptions },
    Card: { props: cardProps, options: cardOptions },
  };

  function renameKeys(obj) {
    if (Array.isArray(obj)) {
      return obj.map((item) => renameKeys(item));
    } else if (obj !== null && typeof obj === "object") {
      return Object.keys(obj).reduce((acc, key) => {
        const newKey = RENAME_MAP[key] || key;
        acc[newKey] = renameKeys(obj[key]);
        return acc;
      }, {});
    }
    return obj;
  }

  function renameReservedKeys(inputData) {
    if (Array.isArray(inputData)) {
      // If it's a plain array like ['Av'], just return it as-is
      return inputData;
    }

    const result = {};

    for (const key in inputData) {
      const value = inputData[key];

      // Case: value is an array (could be ["Date"] or [] or table.data)
      if (Array.isArray(value)) {
        // Check if elements are objects (like row data), otherwise treat as string[]
        const hasObjects = value.some(
          (item) => typeof item === "object" && item !== null
        );

        if (hasObjects) {
          // It's tabular object data -> rename each object's keys
          result[key] = renameKeys(value);
        } else {
          // It's an array of primitives (e.g., ["Date"])
          result[key] = value.map((k) => RENAME_MAP[k] || k);
        }
      } else if (value !== null && typeof value === "object") {
        // Plain object (like { Date: "..." }) -> rename its keys
        result[key] = renameKeys(value);
      } else {
        // Fallback for unexpected values
        result[key] = value;
      }
    }

    return result;
  }

  function returnRenameKeys(obj) {
    if (Array.isArray(obj)) {
      return obj.map((item) => returnRenameKeys(item));
    } else if (obj !== null && typeof obj === "object") {
      return Object.keys(obj).reduce((acc, key) => {
        const newKey = RETRUN_RENAME_MAP[key] || key;
        acc[newKey] = returnRenameKeys(obj[key]);
        return acc;
      }, {});
    }
    return obj;
  }

  function returnRenameReservedKeys(inputData) {
    if (Array.isArray(inputData)) {
      // If it's a plain array like ['Av'], just return it as-is
      return inputData;
    }

    const result = {};

    for (const key in inputData) {
      const value = inputData[key];

      // Case: value is an array (could be ["Date"] or [] or table.data)
      if (Array.isArray(value)) {
        // Check if elements are objects (like row data), otherwise treat as string[]
        const hasObjects = value.some(
          (item) => typeof item === "object" && item !== null
        );

        if (hasObjects) {
          // It's tabular object data -> rename each object's keys
          result[key] = returnRenameKeys(value);
        } else {
          // It's an array of primitives (e.g., ["Date"])
          result[key] = value.map((k) => RETRUN_RENAME_MAP[k] || k);
        }
      } else if (value !== null && typeof value === "object") {
        // Plain object (like { Date: "..." }) -> rename its keys
        result[key] = returnRenameKeys(value);
      } else {
        // Fallback for unexpected values
        result[key] = value;
      }
    }

    return result;
  }

  const [worker] = useState(() => {
    return new Worker(new URL("./workers.js", import.meta.url), {
      type: "module",
    });
  });

  useEffect(() => {
    if (isWorker === true) {
      const listener = (e) => {
        const { status, type, data } = e.data;
        switch (type) {
          case "PROCESS_EXPRESSIONS":
            if (status === "done") {
              setTablesData(data.copiedData);
              setCopiedTablesData(data.copiedData);
              setSavedTablesData(data.copiedData);
              setAddedCols(data.added);
              setAddedTables(data.addedTables);
            }
            break;

          case "PERFORM_RELATIONS":
            if (status === "done") {
              setTablesData((prev) => ({ ...prev, ...data.updatedTables }));
              setCopiedTablesData((prev) => ({
                ...prev,
                ...data.updatedTables,
              }));
              setSavedTablesData((prev) => ({
                ...prev,
                ...data.updatedTables,
              }));
            }
            break;

          case "HANDLE_APPLY":
            if (status === "done") {
              setTablesData(data.result);
              setCopiedTablesData(data.result);
            }
            break;

          case "PERFORM_SELECTS":
            if (status === "done") {
              if (data.colFlag) setColData(data.result);
              setIsSelectAllChecked(data.selectAllResult);
              setIsItemChecked(data.result);
            }
            break;

          default:
            console.log("Unhandled worker message:", type);
        }
      };

      worker.addEventListener("message", listener);
      return () => worker.removeEventListener("message", listener);
    }
  }, []);

  const runWorkerTask = (taskType, payload) => {
    return new Promise((resolve) => {
      const listener = (e) => {
        if (e.data.type === taskType && e.data.status === "done") {
          worker.removeEventListener("message", listener);
          resolve(e.data.data);
        }
      };
      worker.addEventListener("message", listener);
      worker.postMessage({ type: taskType, payload });
    });
  };

  const getTablesData = async (selectedTables, relationshipTables) => {
    setMessage("Getting Data From Database");

    // Step 1: Prepare URLs
    const urls = [];
    const tablesToFetch = [];

    selectedTables.forEach((table) => {
      urls.push(`/api/v3/${table}`);
      if (!selectedTable.includes(table)) {
        setSelectedTable((prev) => [...prev, table]);
      }
      tablesToFetch.push(table);
    });

    const relUrls = [];
    const relTables = [];

    relationshipTables.forEach((item) => {
      item.split(",").forEach((el) => {
        if (el && !relUrls.includes(`/api/v3/${el}`)) {
          relUrls.push(`/api/v3/${el}`);
          relTables.push(el);
        }
      });
    });

    try {
      // Step 2: Fetch Table Data
      const [tableResponses, relResponses] = await Promise.all([
        Promise.allSettled(
          urls.map((url) => axiosPrivate(url, { method: "GET" }))
        ),
        Promise.allSettled(
          relUrls.map((url) => axiosPrivate(url, { method: "GET" }))
        ),
      ]);

      // Step 3: Process Table Data
      const newTablesData = {};

      tableResponses.forEach((res, index) => {
        if (res.status === "fulfilled") {
          const table = tablesToFetch[index];
          const data = res.value?.data || [];
          const dataTypes = detectTableColumnTypes(data);

          newTablesData[table] = {
            data,
            name: table,
            dataTypes,
          };
        }
      });

      setTablesData(newTablesData);
      setCopiedTablesData(newTablesData);
      setSavedTablesData(newTablesData);

      // Step 4: Process Relationship Data
      const relDataMap = {};
      relResponses.forEach((res, index) => {
        if (res.status === "fulfilled") {
          relDataMap[relTables[index]] = res.value?.data || [];
        }
      });

      setRelationshipData(relDataMap);

      // Step 5: Handle Selected Relationships
      const relTablesMap = [];
      relationshipTables.forEach((item) => {
        if (!selectedRelationshipsTable.includes(item)) {
          relTablesMap.push(item);
        }
      });
      setSelectedRelationshipsTable((prev) => relTablesMap);
      return { newTablesData, relDataMap };
    } catch (error) {
      console.error("Error fetching table data:", error);
      setMessage("Failed to load data from database.");
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      setMessage(`Loading Selection Data...`);
      const URLs = ["/api/v3/PowerBiView", "/api/v3/PowerBiRelationShips"];

      const responseData = await Promise.all(
        URLs.map((url) => {
          return axiosPrivate(url, { method: "GET" });
        })
      );

      const targetItem = responseData[0]?.data?.find(
        (item) => Number(item.ID) === Number(id)
      );

      // console.log(responseData[1]?.data);
      setRelationsTable(responseData[1]?.data);

      setViewName(targetItem?.Name);
      setViewGroup(targetItem?.Group);
      setUsersNamesData(JSON.parse(targetItem?.UsersToView));

      const userstoView = JSON.parse(targetItem?.UsersToView)?.Users;
      const isAuthorized = [targetItem?.CreatedBy, ...userstoView]?.includes(
        usersData[0].username
      );
      setIsAuth(isAuthorized);

      if (!isAuthorized) {
        setLoading(false);
        return; // Or handle unauthorized case differently
      }

      const viewData = JSON.parse(targetItem?.ViewData);

      setIsItemUnChecked(viewData?.unCheckedItems);
      setIsSortChecked(viewData?.sorted);

      setIsChoose(viewData?.isChoose);

      setIsRelationshipChoose(viewData?.isRelationshipChoose);
      setSelectedRefTable(viewData?.selectedRefTable);
      const { newTablesData, relDataMap } = await getTablesData(
        viewData?.isChoose,
        viewData?.isRelationshipChoose
      );

      setMessage(`Performing Relations...`);
      // --- STEP 1: Run Relations ---
      const { updatedTables } = await runWorkerTask("PERFORM_RELATIONS", {
        relDataMap,
        relationsTable: responseData[1]?.data,
        isRelationshipChoose: viewData.isRelationshipChoose,
        tablesData: newTablesData,
      });

      const copiedDataSanitized = renameReservedKeys(updatedTables);

      setMessage(`Processing Expressions...`);
      // --- STEP 2: Process Expressions ---
      const { copiedData } = await runWorkerTask("PROCESS_EXPRESSIONS", {
        tablesData: copiedDataSanitized,
        expressions: viewData.expressions,
        selectedRefTable: viewData.selectedRefTable,
      });

      const returnedCopiedData = returnRenameReservedKeys(copiedData);

      setMessage(`Performing Selects...`);
      // --- STEP 3: Perform Selects ---
      const selectsResult = await runWorkerTask("PERFORM_SELECTS", {
        savedTablesData: returnedCopiedData,
        isItemChecked: isItemChecked,
        isItemUnChecked: viewData.unCheckedItems,
        isSelectAllChecked: isSelectAllChecked,
        isSortChecked: viewData?.sorted,
      });

      setMessage(`Applying Filters...`);
      // --- STEP 4: Apply Filters ---
      const applyResult = await runWorkerTask("HANDLE_APPLY", {
        isItemUnChecked: viewData.unCheckedItems,
        isSortChecked: viewData?.sorted,
        savedTablesData: returnedCopiedData,
      });

      setExpressions(viewData?.expressions);

      // setData(viewData.data);
      const copiedData1 = { ...viewData.data };
      if (isWorker === true) {
        Object.keys(copiedData1?.el).forEach((selectedItem) => {
          if (copiedData1?.el[selectedItem]?.Type === "Graph") {
            copiedData1.el[selectedItem] = {
              ...MODEL_MAP?.[copiedData1?.el[selectedItem]?.graphType]?.options,
              ...copiedData1?.el?.[selectedItem],
            };
            copiedData1.el[selectedItem].props = [
              ...MODEL_MAP?.[copiedData1?.el[selectedItem]?.graphType]?.props,
            ];
          } else {
            copiedData1.el[selectedItem] = {
              ...MODEL_MAP?.[copiedData1?.el[selectedItem]?.Type]?.options,
              ...copiedData1?.el?.[selectedItem],
            };
            copiedData1.el[selectedItem].props = [
              ...MODEL_MAP?.[copiedData1?.el[selectedItem]?.Type]?.props,
            ];
          }
        });
      }

      setData(copiedData1);

      console.log(viewData);

      setLoading(false);
    } catch (err) {
      console.log(err);
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isWorker === true) {
      getData();
    }
  }, []);

  useEffect(() => {
    if (isWorker === false) {
      if (savedTablesData && Object.keys(savedTablesData)?.length > 0) {
        const result = {};
        const uncheckedResult = {};
        const selectAllResult = {};
        const sortResult = {};

        let colFlag = false;

        Object.entries(savedTablesData).forEach(([table, tableData]) => {
          if (!isItemChecked?.[table]) {
            const rows = tableData?.data || [];
            const firstRow = rows[0] || {};

            sortResult[table] = sortResult[table] || [];

            Object.keys(firstRow).forEach((col) => {
              selectAllResult[table] = selectAllResult[table] || {};
              selectAllResult[table][col] = { SelectAll: true };

              result[table] = result[table] || {};
              result[table][col] = [];

              uncheckedResult[table] = uncheckedResult[table] || {};
              uncheckedResult[table][col] = [];

              if (!sortResult[table].includes("ID")) {
                sortResult[table].push("ID");
              }

              const uniqueValues = new Set();

              rows.forEach((item) => {
                const value = item[col];
                if (!uniqueValues.has(value)) {
                  uniqueValues.add(value);
                }
              });

              result[table][col] = Array.from(uniqueValues).sort((a, b) => {
                if (a == null) return 1;
                if (b == null) return -1;
                if (!isNaN(Date.parse(a)) && !isNaN(Date.parse(b))) {
                  return new Date(a) - new Date(b);
                }
                if (typeof a === "number" && typeof b === "number") {
                  return a - b;
                }
                return String(a).localeCompare(String(b));
              });
            });
            colFlag = true;
          } else {
            result[table] = isItemChecked[table];
            uncheckedResult[table] = isItemUnChecked[table];
            selectAllResult[table] = isSelectAllChecked[table];
            sortResult[table] = isSortChecked[table];
            colFlag = false;
          }
        });

        if (colFlag) setColData(result);
        setIsSelectAllChecked(selectAllResult);
        setIsItemChecked(result);
        setIsItemUnChecked(uncheckedResult);
        setIsSortChecked(sortResult);
      }
    }
  }, [savedTablesData]);

  useLayoutEffect(() => {
    const container = document.getElementById("Main-Area");
    const containerStyles = container && window.getComputedStyle(container);
    setData((prev) => ({
      ...prev,
      el: [...prev?.el],
      containerStyles: {
        initialWidth: containerStyles?.width,
        width: containerStyles?.width,
        height: containerStyles?.height,
        scale: 1,
      },
    }));
  }, []);

  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.key === "Escape") {
        setIsPreview(false);
      }
    };
  }, []);

  if (!isAuth && isWorker === true)
    return (
      <div
        id="Main--Page"
        className=" dark:bg-background-logoColor relative bg-white overflow-x-hidden"
        style={{
          width: "100vw",
          height: "92vh",
        }}
        onClick={closeSmallSidebar}
      >
        <div className="w-full h-full flex justify-center p-4">
          <div
            className=" bg-red-600 h-20 flex justify-center items-center flex-row mb-5 mt-2 rounded-lg"
            style={{ color: "white", width: "90%" }}
          >
            <CiWarning className="text-[40px] font-extrabold" />
            <p className="ml-5 text-xl font-semibold">
              Unauthorized to see this page!
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <div
      className="w-full flex flex-col bg-gray-100 dark:bg-background-logoColor h-full relative text-[14px]"
      onClick={closeSmallSidebar}
      onMouseMove={mouseMoveMove}
      onMouseUp={mouseUpMove}
    >
      {loading && (
        <PageLoading message={message ? message : `Initializing...`} />
      )}
      {sidebarPreview && <FiltersCards reportID={id} isWorker={isWorker} />}

      <div className="w-full h-full flex flex-row overflow-hidden relative">
        <Analysis sidebarPreview={sidebarPreview} />
        {sidebarPreview && (
          <>
            <SelectTables />
            <TablesRelations />
            <VirtualTable />
            <ManageTables />
            <ChooseUsers reportID={id} isWorker={isWorker} />
          </>
        )}
      </div>
    </div>
  );
};

export default PowerBi;
