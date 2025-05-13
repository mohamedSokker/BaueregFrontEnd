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
  const [isAuth, setIsAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Initializing...");

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
    setAddedTables,
    selectedRefTable,
    setSelectedRefTable,
  } = useInitContext();

  const {
    getTableData,
    setRelationshipData,
    relationshipdata,
    relationsTable,
    setRelationsTable,
  } = useDataContext();

  const { usersData } = useNavContext();

  const [worker] = useState(() => {
    return new Worker(new URL("./workers.js", import.meta.url), {
      type: "module",
    });
  });

  useEffect(() => {
    const listener = (e) => {
      const { status, type, data } = e.data;
      switch (type) {
        case "PROCESS_EXPRESSIONS":
          if (status === "done") {
            setTablesData(data.copiedData);
            setCopiedTablesData(data.copiedData);
            setSavedTablesData(data.copiedData);
            setAddedCols(data.added);
            setExpressions(data.expressions);
            setAddedTables(data.addedTables);
          }
          break;

        case "PERFORM_RELATIONS":
          if (status === "done") {
            setTablesData((prev) => ({ ...prev, ...data.updatedTables }));
            setCopiedTablesData((prev) => ({ ...prev, ...data.updatedTables }));
            setSavedTablesData((prev) => ({ ...prev, ...data.updatedTables }));
          }
          break;

        case "HANDLE_APPLY":
          if (status === "done") {
            setTablesData(data.result);
            setCopiedTablesData(data.result);
            setSavedTablesData(data.result);
          }
          break;

        case "PERFORM_SELECTS":
          if (status === "done") {
            if (data.colFlag) setColData(data.result);
            setIsSelectAllChecked(data.selectAllResult);
            setIsItemChecked(data.result);
            setIsItemUnChecked(data.uncheckedResult);
            setIsSortChecked(data.sortResult);
          }
          break;

        default:
          console.log("Unhandled worker message:", type);
      }
    };

    worker.addEventListener("message", listener);
    return () => worker.removeEventListener("message", listener);
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
      console.log(viewData?.expressions);

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

      setMessage(`Processing Expressions...`);
      // --- STEP 2: Process Expressions ---
      const { copiedData } = await runWorkerTask("PROCESS_EXPRESSIONS", {
        tablesData: updatedTables,
        expressions: viewData.expressions,
        selectedRefTable: viewData.selectedRefTable,
      });

      setMessage(`Performing Selects...`);
      // --- STEP 3: Perform Selects ---
      const selectsResult = await runWorkerTask("PERFORM_SELECTS", {
        savedTablesData: copiedData,
        isItemChecked: isItemChecked,
        isItemUnChecked: viewData.unCheckedItems,
        isSelectAllChecked: isSelectAllChecked,
        isSortChecked: viewData.sorted,
      });

      setMessage(`Applying Filters...`);
      // --- STEP 4: Apply Filters ---
      const applyResult = await runWorkerTask("HANDLE_APPLY", {
        isItemUnChecked: viewData.unCheckedItems,
        isSortChecked: viewData.sorted,
        savedTablesData: copiedData,
      });

      setDataExpressions(viewData?.expressions);

      setData(viewData.data);

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
