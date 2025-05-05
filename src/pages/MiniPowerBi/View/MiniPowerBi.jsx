import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CiWarning } from "react-icons/ci";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

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

import {
  getHelperFunction,
  getHelperFunction1,
} from "../Controllers/Expressions/KeyWordsHelper";
import { detectTableColumnTypes } from "../Services/getTypes.js";
import { useNavContext } from "../../../contexts/NavContext";

const MiniPowerBi = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();

  const [dataExpressions, setDataExpressions] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  const {
    setIsPreview,
    mouseMoveMove,
    mouseUpMove,
    data,
    setData,
    expressions,
    tablesData,
    setTablesData,
    copiedTablesData,
    setCopiedTablesData,
    savedTablesData,
    setSavedTablesData,
    isChoose,
    setIsChoose,
    isRelationshipChoose,
    setIsRelationshipChoose,
    closeSmallSidebar,
    message,
    setSelectedRelationshipsTable,
    selectedRelationshipsTable,
    setSelectedTable,
    selectedTable,
    setViewName,
    setViewGroup,
    setUsersNamesData,
    setAddedCols,
    setExpressions,
    isItemChecked,
    setIsItemChecked,
    isItemUnChecked,
    setIsItemUnChecked,
    isSelectAllChecked,
    setIsSelectAllChecked,
    colData,
    setColData,
    isSortChecked,
    setIsSortChecked,
  } = useInitContext();

  const {
    loading,
    setLoading,
    setMessage,
    getTableData,
    setRelationshipData,
    relationshipdata,
    relationsTable,
    setRelationsTable,
  } = useDataContext();

  const { usersData } = useNavContext();

  const sortByKey = (array, key) => {
    return array.sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      // Handle null or undefined
      if (valA == null) return 1;
      if (valB == null) return -1;

      // Number
      if (typeof valA === "number" && typeof valB === "number") {
        return valA - valB;
      }

      // Date (ISO strings or Date objects)
      if (valA instanceof Date || !isNaN(Date.parse(valA))) {
        return new Date(valA) - new Date(valB);
      }

      // String (localeCompare handles case and diacritics)
      return String(valA).localeCompare(String(valB));
    });
  };

  const processExpressions = async () => {
    const copiedData = { ...tablesData };
    const added = {};

    Object.keys(dataExpressions || {}).forEach((table) => {
      const tableData = copiedData[table]?.data;
      if (!tableData || !Array.isArray(tableData)) return;

      const allowedKeys = Object.keys(tableData[0] || {});
      const expressionsForTable = dataExpressions[table] || {};
      const cols = Object.keys(expressionsForTable);

      // Initialize added columns
      if (!added[table]) added[table] = [];
      cols.forEach((col) => {
        if (!added[table].includes(col)) added[table].push(col);
      });

      // Process each expression column
      cols.forEach((col) => {
        const exp = expressionsForTable[col];
        const funcBody = getHelperFunction1(exp, exp.split("(")[0]);
        const tableData = copiedData[table]?.data;

        try {
          const expressionFunction = new Function(...allowedKeys, funcBody);

          copiedData[table].data = tableData.map((row) => ({
            ...row,
            [col]: expressionFunction(...allowedKeys.map((key) => row[key])),
          }));

          // Update data types after adding new column
          copiedData[table].dataTypes = detectTableColumnTypes(
            copiedData[table].data
          );
        } catch (error) {
          console.error(
            `Error evaluating expression "${exp}" for ${table}.${col}:`,
            error
          );
        }
      });
    });

    // Batch state updates
    setAddedCols(added);
    setExpressions(dataExpressions);
    setTablesData(copiedData);
    setCopiedTablesData(copiedData);
    setSavedTablesData(copiedData);
  };

  useEffect(() => {
    const shouldProcess =
      Object.keys(tablesData).length > 0 &&
      Object.keys(tablesData).length ===
        [...isChoose, ...isRelationshipChoose].length;

    if (shouldProcess) {
      setLoading(true);
      setMessage("Initializing Expressions...");
      processExpressions();
      setLoading(false);
    }
  }, [isChoose, isRelationshipChoose, dataExpressions]);

  const getTablesData = async (selectedTables, relationshipTables) => {
    setLoading(true);
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
      const newCopiedTablesData = {};
      const newSavedTablesData = {};

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
          newCopiedTablesData[table] = {
            data,
            name: table,
            dataTypes,
          };
          newSavedTablesData[table] = {
            data,
            name: table,
            dataTypes,
          };
        }
      });

      setTablesData(newTablesData);
      setCopiedTablesData(newCopiedTablesData);
      setSavedTablesData(newSavedTablesData);

      // Step 4: Process Relationship Data
      const relDataMap = {};
      relResponses.forEach((res, index) => {
        if (res.status === "fulfilled") {
          relDataMap[relTables[index]] = res.value?.data || [];
        }
      });

      setRelationshipData(relDataMap);

      // Step 5: Handle Selected Relationships
      relationshipTables.forEach((item) => {
        if (!selectedRelationshipsTable.includes(item)) {
          setSelectedRelationshipsTable((prev) => [...prev, item]);
        }
      });
    } catch (error) {
      console.error("Error fetching table data:", error);
      setMessage("Failed to load data from database.");
    } finally {
      setLoading(false);
    }
  };

  const performRelations = async () => {
    setLoading(true);
    setMessage(`Performing Relations...`);
    const updatedTables = {};
    const updatedCopiedTables = {};
    const updatedSavedTables = {};
    for (const item of relationsTable) {
      if (isRelationshipChoose?.includes(item.Name)) {
        const relationships = JSON.parse(item?.RelationShips);
        // console.log(relationships);
        const copiedRelationstablesData = {
          ...relationshipdata,
        };
        // console.log(copiedRelationstablesData);
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
        // console.log(currentVT);

        updatedTables[item.Name] = {
          name: item.Name,
          data: sourceData,
          dataTypes:
            sourceData.length > 0 ? detectTableColumnTypes(sourceData) : {},
        };

        updatedCopiedTables[item.Name] = {
          name: item.Name,
          data: sourceData,
          dataTypes:
            sourceData.length > 0 ? detectTableColumnTypes(sourceData) : {},
        };

        updatedSavedTables[item.Name] = {
          name: item.Name,
          data: sourceData,
          dataTypes:
            sourceData.length > 0 ? detectTableColumnTypes(sourceData) : {},
        };
      }
    }
    setTablesData((prev) => ({ ...prev, ...updatedTables }));
    setCopiedTablesData((prev) => ({ ...prev, ...updatedCopiedTables }));
    setSavedTablesData((prev) => ({ ...prev, ...updatedSavedTables }));
    setLoading(false);
  };

  useEffect(() => {
    performRelations();
  }, [relationshipdata]);

  const performSelects = async () => {
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
    }
  };

  useEffect(() => {
    performSelects();
  }, [savedTablesData]);

  useEffect(() => {
    if (
      Object.keys(isItemUnChecked).length > 0 &&
      Object.keys(isSortChecked).length > 0 &&
      Object.keys(savedTablesData).length > 0
    ) {
      handleApply();
    }
  }, [isItemUnChecked, isSortChecked, savedTablesData]);

  const handleApply = () => {
    let slicers = {};

    Object.keys(isItemUnChecked || {}).forEach((table) => {
      slicers[table] = [];
      Object.keys(isItemUnChecked[table] || {}).forEach((col) => {
        (isItemUnChecked[table][col] || []).forEach((item) => {
          //   if (!slicers[table]) slicers[table] = [];
          slicers[table].push({ colName: col, item });
        });
      });
    });

    // console.log(slicers);

    let result = { ...savedTablesData };
    let resultData = [];
    Object.keys(savedTablesData)?.map((table) => {
      sortByKey(savedTablesData?.[table]?.data, isSortChecked?.[table]?.[0]);
      resultData = [];
      resultData = savedTablesData?.[table]?.data?.filter((row) => {
        return slicers?.[table]?.every(({ colName, item }) => {
          if (row[colName] === item) {
            return false;
          } else {
            return true;
          }
        });
      });
      result[table] = {
        ...result[table],
        data: resultData,
      };
    });

    // console.log(result);
    setTablesData(result);
    setCopiedTablesData(result);
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
      if (
        [targetItem?.CreatedBy, ...userstoView]?.includes(usersData[0].username)
      )
        setIsAuth(true);

      const viewData = JSON.parse(targetItem?.ViewData);

      setIsItemUnChecked(viewData?.unCheckedItems);
      setIsSortChecked(viewData?.sorted);

      setIsChoose(viewData?.isChoose);

      setIsRelationshipChoose(viewData?.isRelationshipChoose);
      await getTablesData(viewData?.isChoose, viewData?.isRelationshipChoose);

      setDataExpressions(viewData?.expressions);

      setData(viewData.data);

      // setLoading(false);
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
    getData();
  }, []);

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

  if (!isAuth)
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
      className="w-full flex flex-col px-4 bg-gray-100 Main--Page dark:bg-background-logoColor h-full relative text-[14px]"
      onClick={closeSmallSidebar}
      // onMouseMove={mouseMoveMove}
      // onMouseUp={mouseUpMove}
    >
      {loading && <PageLoading message={message} />}
      {/* <FiltersCards /> */}

      <div className="w-full h-full flex flex-row overflow-hidden">
        <Analysis />
        {/* <SelectTables />
        <TablesRelations />
        <VirtualTable />
        <ManageTables />
        <ChooseUsers /> */}
      </div>
    </div>
  );
};

export default MiniPowerBi;
