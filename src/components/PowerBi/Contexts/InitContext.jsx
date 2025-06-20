import React, { useContext, createContext, useState, useEffect } from "react";
import useEvenetListener from "../Controllers/eventListeners copy";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useDataContext } from "./DataContext";
import { useNavContext } from "../../../contexts/NavContext";

const InitContext = createContext();

export const PowerPiInitContextProvider = ({ children }) => {
  const axiosPrivate = useAxiosPrivate();

  const { closeSmallSidebar, usersData } = useNavContext();

  const { setLoading } = useDataContext();

  const [selectedTable, setSelectedTable] = useState([]);
  const [selectedRelationshipsTable, setSelectedRelationshipsTable] = useState(
    []
  );
  const [relationsSelectedTable, setRelationsSelectedTable] = useState([]);
  const [relationshipSelectedTable, setRelationshipSelectedTable] = useState(
    []
  );
  const [relationShipsExpressions, setRelationshipsExpressions] = useState([]);
  const [isTableCard, setIsTableCard] = useState(false);
  const [isActionCard, setIsActionCard] = useState(false);
  const [isRelationshipTableCard, setIsRelationshipTableCard] = useState(false);
  const [isTableSceneCard, setIsTableSceneCard] = useState(false);
  const [isPieChartCard, setIsPieChartCard] = useState(false);
  const [isBarChartCard, setIsBarChartCard] = useState(false);
  const [isSlicerCard, setIsSlicerCard] = useState(false);
  const [isCard, setIsCard] = useState(false);
  const [isTimeline, setIsTimeline] = useState(false);
  const [isGauge, setIsGauge] = useState(false);
  const [isLineChart, setIsLineChart] = useState(false);
  const [isDataReady, setIsDataReady] = useState(true);
  const [tablesData, setTablesData] = useState({});
  const [relationstablesData, setRelationsTablesData] = useState({});
  const [copiedTablesData, setCopiedTablesData] = useState({});
  const [savedTablesData, setSavedTablesData] = useState({});
  const [isPanelDown, setIsPanelDown] = useState({});
  const [currentID, setCurrentID] = useState(0);
  const [relationShips, setRelationShips] = useState([]);
  const [virtualTables, setVirsualTables] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [checkArray, setCheckArray] = useState([]);

  const [selectedTableData, setSelectedTableData] = useState([]);
  const [activeItem, setActiveItem] = useState("");
  const [AddedCols, setAddedCols] = useState({});
  const [activeColItem, setActiveColItem] = useState({});
  const [AddedTables, setAddedTables] = useState([]);

  const [expressions, setExpressions] = useState({});

  const [inputValue, setInputValue] = useState("");

  const [isChoose, setIsChoose] = useState([]);
  const [isRelationshipChoose, setIsRelationshipChoose] = useState([]);

  const [usersNamesData, setUsersNamesData] = useState({ Users: [] });

  const [isDeleteCard, setIsDeleteCard] = useState(false);

  const [viewName, setViewName] = useState("");
  const [viewGroup, setViewGroup] = useState("");

  const [isPerview, setIsPreview] = useState(false);

  const [dragItem, setDragItem] = useState(null);

  const [slicersCheckedItems, setSlicersCheckedItems] = useState({});
  const [slicerMinDates, setSlicersMinDates] = useState([]);
  const [slicerMaxDates, setSlicersMaxDates] = useState([]);
  const [isChatbot, setIsChatBot] = useState(false);

  //Filters
  const [isSelectAllChecked, setIsSelectAllChecked] = useState({});
  const [isItemChecked, setIsItemChecked] = useState({});
  const [isItemUnChecked, setIsItemUnChecked] = useState({});
  const [colData, setColData] = useState({});
  const [isSortChecked, setIsSortChecked] = useState({});

  //AddExpression
  const [isExpressionCard, setIsExpressionCard] = useState(false);

  const [selectedRefTable, setSelectedRefTable] = useState({});

  const {
    data,
    setData,
    categoryCount,
    setCategoryCount,
    mouseMoveMove,
    mouseDownMove,
    mouseUpMove,
    mouseDownTopResize,
    mouseDownBottomResize,
    mouseDownLeftResize,
    mouseDownRightResize,
  } = useEvenetListener();

  // useEffect(() => {
  //   if (savedTablesData && Object.keys(savedTablesData)?.length > 0) {
  //     const result = {};
  //     const uncheckedResult = {};
  //     const selectAllResult = {};
  //     const sortResult = {};

  //     let colFlag = false;

  //     Object.entries(savedTablesData).forEach(([table, tableData]) => {
  //       if (!isItemChecked?.[table]) {
  //         const rows = tableData?.data || [];
  //         const firstRow = rows[0] || {};

  //         sortResult[table] = sortResult[table] || [];

  //         Object.keys(firstRow).forEach((col) => {
  //           selectAllResult[table] = selectAllResult[table] || {};
  //           selectAllResult[table][col] = { SelectAll: true };

  //           result[table] = result[table] || {};
  //           result[table][col] = [];

  //           uncheckedResult[table] = uncheckedResult[table] || {};
  //           uncheckedResult[table][col] = [];

  //           if (!sortResult[table].includes("ID")) {
  //             sortResult[table].push("ID");
  //           }

  //           const uniqueValues = new Set();

  //           rows.forEach((item) => {
  //             const value = item[col];
  //             if (!uniqueValues.has(value)) {
  //               uniqueValues.add(value);
  //             }
  //           });

  //           result[table][col] = Array.from(uniqueValues).sort((a, b) => {
  //             if (a == null) return 1;
  //             if (b == null) return -1;
  //             if (!isNaN(Date.parse(a)) && !isNaN(Date.parse(b))) {
  //               return new Date(a) - new Date(b);
  //             }
  //             if (typeof a === "number" && typeof b === "number") {
  //               return a - b;
  //             }
  //             return String(a).localeCompare(String(b));
  //           });
  //         });
  //         colFlag = true;
  //       } else {
  //         result[table] = isItemChecked[table];
  //         uncheckedResult[table] = isItemUnChecked[table];
  //         selectAllResult[table] = isSelectAllChecked[table];
  //         sortResult[table] = isSortChecked[table];
  //         colFlag = false;
  //       }
  //     });

  //     if (colFlag) setColData(result);
  //     setIsSelectAllChecked(selectAllResult);
  //     setIsItemChecked(result);
  //     setIsItemUnChecked(uncheckedResult);
  //     setIsSortChecked(sortResult);
  //   }
  // }, [savedTablesData]);

  const handleSendAdd = async () => {
    try {
      setLoading(true);
      const addURL = `/api/v3/PowerBiView`;
      let tableData = {};
      Object.keys(tablesData)?.map((item) => {
        tableData = { ...tableData, [item]: { ...tablesData[item], data: [] } };
      });
      // console.log(tableData);
      await axiosPrivate(addURL, {
        method: "POST",
        data: JSON.stringify({
          Name: viewName,
          Group: viewGroup,
          CreatedBy: usersData[0]?.username,
          UsersToView: JSON.stringify(usersNamesData),
          ViewData: JSON.stringify({
            expressions: expressions,
            data: data,
            tablesData: tableData,
            isChoose: isChoose,
            isRelationshipChoose: isRelationshipChoose,
            unCheckedItems: isItemUnChecked,
            sorted: isSortChecked,
            selectedRefTable: selectedRefTable,
          }),
        }),
      });
      setLoading(false);
    } catch (err) {
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
      setLoading(false);
    }
  };

  const handleSendEdit = async ({ reportID }) => {
    try {
      setLoading(true);
      const addURL = `/api/v3/PowerBiView/${reportID}`;
      let tableData = {};
      Object.keys(tablesData)?.map((item) => {
        tableData = { ...tableData, [item]: { ...tablesData[item], data: [] } };
      });
      // console.log(tableData);
      await axiosPrivate(addURL, {
        method: "PUT",
        data: JSON.stringify({
          Name: viewName,
          Group: viewGroup,
          CreatedBy: usersData[0]?.username,
          UsersToView: JSON.stringify(usersNamesData),
          ViewData: JSON.stringify({
            expressions: expressions,
            data: data,
            tablesData: tableData,
            isChoose: isChoose,
            isRelationshipChoose: isRelationshipChoose,
            unCheckedItems: isItemUnChecked,
            sorted: isSortChecked,
            selectedRefTable: selectedRefTable,
          }),
        }),
      });
      setLoading(false);
    } catch (err) {
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
      setLoading(false);
    }
  };

  return (
    <InitContext.Provider
      value={{
        selectedTable,
        setSelectedTable,
        selectedRelationshipsTable,
        setSelectedRelationshipsTable,
        relationsSelectedTable,
        setRelationsSelectedTable,
        relationShipsExpressions,
        setRelationshipsExpressions,
        relationshipSelectedTable,
        setRelationshipSelectedTable,
        isTableCard,
        setIsTableCard,
        isActionCard,
        setIsActionCard,
        isRelationshipTableCard,
        setIsRelationshipTableCard,
        isTableSceneCard,
        setIsTableSceneCard,
        isPieChartCard,
        setIsPieChartCard,
        isBarChartCard,
        setIsBarChartCard,
        isSlicerCard,
        setIsSlicerCard,
        isCard,
        setIsCard,
        isTimeline,
        setIsTimeline,
        isGauge,
        setIsGauge,
        isLineChart,
        setIsLineChart,
        isDataReady,
        setIsDataReady,
        tablesData,
        setTablesData,
        relationstablesData,
        setRelationsTablesData,
        copiedTablesData,
        setCopiedTablesData,
        isPanelDown,
        setIsPanelDown,
        currentID,
        setCurrentID,
        relationShips,
        setRelationShips,
        virtualTables,
        setVirsualTables,
        selectedItem,
        setSelectedItem,
        checkArray,
        setCheckArray,
        selectedTableData,
        setSelectedTableData,
        activeItem,
        setActiveItem,
        AddedCols,
        setAddedCols,
        activeColItem,
        setActiveColItem,
        AddedTables,
        setAddedTables,
        expressions,
        setExpressions,
        inputValue,
        setInputValue,
        isChoose,
        setIsChoose,
        isRelationshipChoose,
        setIsRelationshipChoose,
        usersNamesData,
        setUsersNamesData,
        isDeleteCard,
        setIsDeleteCard,
        viewName,
        setViewName,
        viewGroup,
        setViewGroup,

        data,
        setData,
        categoryCount,
        setCategoryCount,
        mouseMoveMove,
        mouseDownMove,
        mouseUpMove,
        mouseDownTopResize,
        mouseDownBottomResize,
        mouseDownLeftResize,
        mouseDownRightResize,

        handleSendAdd,
        handleSendEdit,

        closeSmallSidebar,
        usersData,

        isPerview,
        setIsPreview,

        dragItem,
        setDragItem,

        slicersCheckedItems,
        setSlicersCheckedItems,
        slicerMinDates,
        setSlicersMinDates,
        slicerMaxDates,
        setSlicersMaxDates,
        isChatbot,
        setIsChatBot,

        isItemChecked,
        setIsItemChecked,
        isItemUnChecked,
        setIsItemUnChecked,
        isSelectAllChecked,
        setIsSelectAllChecked,
        savedTablesData,
        setSavedTablesData,
        colData,
        setColData,
        isSortChecked,
        setIsSortChecked,

        isExpressionCard,
        setIsExpressionCard,

        selectedRefTable,
        setSelectedRefTable,
      }}
    >
      {children}
    </InitContext.Provider>
  );
};

export const useInitContext = () => useContext(InitContext);
