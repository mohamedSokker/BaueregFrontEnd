import React from "react";

import AddTableCard from "./AddTableCard";
import AddActions from "./AddActions";
// import AddTableSceneCard from "./AddToScene/AddTableCard";
// import AddBarChartCard from "./AddToScene/AddBarChart";
// import AddCard from "./AddToScene/AddCard";
// import AddGauge from "./AddToScene/AddGuage";
// import AddLineChart from "./AddToScene/AddLineChart";
// import AddPieChartCard from "./AddToScene/AddPieChart";
// import AddSlicerCard from "./AddToScene/AddSlicer";
// import AddTimeline from "./AddToScene/AddTimeline";
import AddRelationshipTableCard from "./Sidebars/AddRelationshipTableCard";
import { useInitContext } from "../Contexts/InitContext";
import ConfirmDeleteCard from "../../../components/Accessories/ConfirmDeleteCard";
import AddExpression from "./AddExpression";

const FiltersCards = ({}) => {
  const {
    isTableCard,
    setIsTableCard,
    isActionCard,
    isExpressionCard,
    setIsExpressionCard,
    setIsActionCard,
    isRelationshipTableCard,
    setIsRelationshipTableCard,
    selectedTable,
    setSelectedTable,
    selectedRelationshipsTable,
    setSelectedRelationshipsTable,
    isDataReady,
    setIsDataReady,
    setTablesData,
    copiedTablesData,
    setCopiedTablesData,
    tablesData,
    isChoose,
    setIsChoose,
    isRelationshipChoose,
    setIsRelationshipChoose,
    isDeleteCard,
    setIsDeleteCard,
    handleSend,
    setSavedTablesData,
  } = useInitContext();
  return (
    <>
      {isTableCard && (
        <AddTableCard
          setIsTableCard={setIsTableCard}
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
          isDataReady={isDataReady}
          setIsDataReady={setIsDataReady}
          tablesData={tablesData}
          setTablesData={setTablesData}
          copiedTablesData={copiedTablesData}
          setCopiedTablesData={setCopiedTablesData}
          isChoose={isChoose}
          setIsChoose={setIsChoose}
          setSavedTablesData={setSavedTablesData}
        />
      )}

      {isActionCard && <AddActions setIsActionCard={setIsActionCard} />}

      {isExpressionCard && (
        <AddExpression setIsExpressionCard={setIsExpressionCard} />
      )}

      {isDeleteCard && (
        <ConfirmDeleteCard
          setIsCard={setIsDeleteCard}
          handleDelete={handleSend}
          message={`Do you really want to continue without choose users or name or group ? This process cannot be undone `}
        />
      )}

      {isRelationshipTableCard && (
        <AddRelationshipTableCard
          setIsRelationshipTableCard={setIsRelationshipTableCard}
          selectedTable={selectedRelationshipsTable}
          setSelectedTable={setSelectedRelationshipsTable}
          isDataReady={isDataReady}
          setIsDataReady={setIsDataReady}
          tablesData={tablesData}
          setTablesData={setTablesData}
          copiedTablesData={copiedTablesData}
          setCopiedTablesData={setCopiedTablesData}
          isRelationshipChoose={isRelationshipChoose}
          setIsRelationshipChoose={setIsRelationshipChoose}
          setSavedTablesData={setSavedTablesData}
        />
      )}

      {/* {isTableSceneCard && tablesData && (
        <AddTableSceneCard
          setIsTableSceneCard={setIsTableSceneCard}
          data={data}
          setData={setData}
          tables={Object.keys(tablesData)}
          currentID={currentID}
          setCurrentID={setCurrentID}
          tablesData={tablesData}
          virtualTables={virtualTables}
        />
      )}

      {isPieChartCard && tablesData && (
        <AddPieChartCard
          setIsPieChartCard={setIsPieChartCard}
          data={data}
          setData={setData}
          tables={Object.keys(tablesData)}
          tablesData={tablesData}
          currentID={currentID}
          setCurrentID={setCurrentID}
        />
      )}

      {isBarChartCard && tablesData && (
        <AddBarChartCard
          setIsBarChartCard={setIsBarChartCard}
          data={data}
          setData={setData}
          tables={Object.keys(tablesData)}
          tablesData={tablesData}
          currentID={currentID}
          setCurrentID={setCurrentID}
        />
      )}

      {isSlicerCard && tablesData && (
        <AddSlicerCard
          setIsSlicerCard={setIsSlicerCard}
          data={data}
          setData={setData}
          tables={Object.keys(tablesData)}
          tablesData={tablesData}
          currentID={currentID}
          setCurrentID={setCurrentID}
        />
      )}

      {isCard && tablesData && (
        <AddCard
          setIsCard={setIsCard}
          data={data}
          setData={setData}
          tables={Object.keys(tablesData)}
          tablesData={tablesData}
          currentID={currentID}
          setCurrentID={setCurrentID}
        />
      )}

      {isTimeline && tablesData && (
        <AddTimeline
          setIsTimeline={setIsTimeline}
          data={data}
          setData={setData}
          tables={Object.keys(tablesData)}
          tablesData={tablesData}
          currentID={currentID}
          setCurrentID={setCurrentID}
        />
      )}

      {isGauge && tablesData && (
        <AddGauge
          setIsGauge={setIsGauge}
          data={data}
          setData={setData}
          tables={Object.keys(tablesData)}
          tablesData={tablesData}
          currentID={currentID}
          setCurrentID={setCurrentID}
        />
      )}

      {isLineChart && tablesData && (
        <AddLineChart
          setIsLineChart={setIsLineChart}
          data={data}
          setData={setData}
          tables={Object.keys(tablesData)}
          tablesData={tablesData}
          currentID={currentID}
          setCurrentID={setCurrentID}
        />
      )} */}
    </>
  );
};

export default FiltersCards;
