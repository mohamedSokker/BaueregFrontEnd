import React from "react";

import AddTableCard from "./AddTableCard";
import AddTableSceneCard from "./AddToScene/AddTableCard";
import AddBarChartCard from "./AddToScene/AddBarChart";
import AddCard from "./AddToScene/AddCard";
import AddGauge from "./AddToScene/AddGuage";
import AddLineChart from "./AddToScene/AddLineChart";
import AddPieChartCard from "./AddToScene/AddPieChart";
import AddSlicerCard from "./AddToScene/AddSlicer";
import AddTimeline from "./AddToScene/AddTimeline";
import AddRelationshipTableCard from "./Sidebars/AddRelationshipTableCard";

const FiltersCards = ({
  isTableCard,
  setIsTableCard,
  isRelationshipTableCard,
  setIsRelationshipTableCard,
  selectedTable,
  setSelectedTable,
  relationshipSelectedTable,
  setRelationshipSelectedTable,
  isDataReady,
  setIsDataReady,
  setTablesData,
  copiedTablesData,
  setCopiedTablesData,
  data,
  setData,
  currentID,
  setCurrentID,
  virtualTables,
  isTableSceneCard,
  setIsTableSceneCard,
  isPieChartCard,
  setIsPieChartCard,
  isBarChartCard,
  setIsBarChartCard,
  isCard,
  setIsCard,
  isGauge,
  setIsGauge,
  isLineChart,
  setIsLineChart,
  isSlicerCard,
  setIsSlicerCard,
  isTimeline,
  setIsTimeline,
  tablesData,
}) => {
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
        />
      )}

      {isRelationshipTableCard && (
        <AddRelationshipTableCard
          setIsRelationshipTableCard={setIsRelationshipTableCard}
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
          isDataReady={isDataReady}
          setIsDataReady={setIsDataReady}
          tablesData={tablesData}
          setTablesData={setTablesData}
          copiedTablesData={copiedTablesData}
          setCopiedTablesData={setCopiedTablesData}
        />
      )}

      {isTableSceneCard && tablesData && (
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
      )}
    </>
  );
};

export default FiltersCards;
