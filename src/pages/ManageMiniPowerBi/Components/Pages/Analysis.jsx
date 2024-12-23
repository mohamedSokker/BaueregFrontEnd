import React from "react";
import MainArea from "../MainArea/MainArea";
import Visualization from "../Sidebars/Visualization";
import TablesList from "../Sidebars/TablesList";
import ToolsSIdebar from "../Sidebars/ToolsSIdebar";
import Properties from "../Sidebars/Properties";

const Analysis = ({
  data,
  setData,
  categoryCount,
  setCategoryCount,
  mouseDownBottomResize,
  mouseDownLeftResize,
  mouseDownMove,
  mouseDownRightResize,
  mouseDownTopResize,
  tablesData,
  setTablesData,
  setIsPieChartCard,
  setIsBarChartCard,
  setIsSlicerCard,
  setIsCard,
  setIsTimeline,
  setIsGauge,
  setIsLineChart,
  setIsTableSceneCard,
  isDataReady,
  isPanelDown,
  selectedTable,
  setIsPanelDown,
  setIsTableCard,
  setIsRelationshipTableCard,
  selectedItem,
  setSelectedItem,
  copiedTablesData,
  setCopiedTablesData,

  tableData,
  setSelectedTable,
  selectedTableData,
  setSelectedTableData,
  activeItem,
  setActiveItem,
  AddedCols,
  setAddedCols,
  AddedTables,
  setAddedTables,
  checkArray,
  setCheckArray,
}) => {
  return (
    <div
      className="w-full h-full flex flex-col justify-between flex-shrink-0 flex-grow-0"
      style={{
        translate: `${-100 * categoryCount}%`,
        transition: `all 0.5s ease-in-out`,
      }}
    >
      <div className="w-full h-full flex flex-row">
        <ToolsSIdebar
          categoryCount={categoryCount}
          setCategoryCount={setCategoryCount}
        />
        <MainArea
          data={data}
          setData={setData}
          mouseDownBottomResize={mouseDownBottomResize}
          mouseDownLeftResize={mouseDownLeftResize}
          mouseDownMove={mouseDownMove}
          mouseDownRightResize={mouseDownRightResize}
          mouseDownTopResize={mouseDownTopResize}
          tablesData={tablesData}
          setTablesData={setTablesData}
          copiedTablesData={copiedTablesData}
          setCopiedTablesData={setCopiedTablesData}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          checkArray={checkArray}
          setCheckArray={setCheckArray}
        />

        <Properties
          data={data}
          setData={setData}
          selectedItem={selectedItem}
          tablesData={tablesData}
        />

        <Visualization
          setIsPieChartCard={setIsPieChartCard}
          setIsBarChartCard={setIsBarChartCard}
          setIsTableSceneCard={setIsTableSceneCard}
          setIsSlicerCard={setIsSlicerCard}
          setIsCard={setIsCard}
          setIsTimeline={setIsTimeline}
          setIsGauge={setIsGauge}
          setIsLineChart={setIsLineChart}
          setCategoryCount={setCategoryCount}
          data={data}
          setData={setData}
        />

        <TablesList
          isDataReady={isDataReady}
          selectedTable={selectedTable}
          isPanelDown={isPanelDown}
          setIsPanelDown={setIsPanelDown}
          setIsTableCard={setIsTableCard}
          setIsRelationshipTableCard={setIsRelationshipTableCard}
          tablesData={tablesData}
          tableData={tablesData}
          setTablesData={setTablesData}
          setSelectedTableData={setSelectedTableData}
          selectedTableData={selectedTableData}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          AddedCols={AddedCols}
          setAddedCols={setAddedCols}
          AddedTables={AddedTables}
          setAddedTables={setAddedTables}
          data={data}
          setData={setData}
        />
      </div>
    </div>
  );
};

export default Analysis;
