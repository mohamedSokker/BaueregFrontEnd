import React, { useState } from "react";

import { useNavContext } from "../../../contexts/NavContext";
import useEvenetListener from "../Controllers/eventListeners copy.js";
import Analysis from "../Components/Pages/Analysis.jsx";
import SelectTables from "../Components/Pages/SelectTables.jsx";
import TablesRelations from "../Components/Pages/TablesRelations.jsx";
import VirtualTable from "../Components/Pages/VirtualTable.jsx";
import FiltersCards from "../Components/FiltersCards.jsx";
import ManageTables from "../Components/Pages/ManageTable.jsx";
import ChooseUsers from "../Components/Pages/ChooseUsers.jsx";

const ManageMiniPowerBi = () => {
  const { closeSmallSidebar } = useNavContext();

  const [selectedTable, setSelectedTable] = useState([]);
  const [relationsSelectedTable, setRelationsSelectedTable] = useState([]);
  const [relationshipSelectedTable, setRelationshipSelectedTable] = useState(
    []
  );
  const [isTableCard, setIsTableCard] = useState(false);
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

  // console.log(relationShips);
  // console.log(tablesData);
  // console.log(selectedTable);
  // console.log(copiedTablesData);

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

  // console.log(data?.el?.[selectedItem]);

  return (
    <div
      className="w-full flex flex-col px-4 bg-gray-100 Main--Page dark:bg-background-logoColor h-full relative text-[14px]"
      onClick={closeSmallSidebar}
      onMouseMove={mouseMoveMove}
      onMouseUp={mouseUpMove}
    >
      <FiltersCards
        isTableCard={isTableCard}
        setIsTableCard={setIsTableCard}
        isRelationshipTableCard={isRelationshipTableCard}
        setIsRelationshipTableCard={setIsRelationshipTableCard}
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
        relationshipSelectedTable={relationshipSelectedTable}
        setRelationshipSelectedTable={setRelationshipSelectedTable}
        isDataReady={isDataReady}
        setIsDataReady={setIsDataReady}
        setTablesData={setTablesData}
        copiedTablesData={copiedTablesData}
        setCopiedTablesData={setCopiedTablesData}
        data={data}
        setData={setData}
        currentID={currentID}
        setCurrentID={setCurrentID}
        virtualTables={virtualTables}
        isTableSceneCard={isTableSceneCard}
        setIsTableSceneCard={setIsTableSceneCard}
        isPieChartCard={isPieChartCard}
        setIsPieChartCard={setIsPieChartCard}
        isBarChartCard={isBarChartCard}
        setIsBarChartCard={setIsBarChartCard}
        isCard={isCard}
        setIsCard={setIsCard}
        isGauge={isGauge}
        setIsGauge={setIsGauge}
        isLineChart={isLineChart}
        setIsLineChart={setIsLineChart}
        isSlicerCard={isSlicerCard}
        setIsSlicerCard={setIsSlicerCard}
        isTimeline={isTimeline}
        setIsTimeline={setIsTimeline}
        tablesData={tablesData}
      />

      <div className="w-full h-full flex flex-row overflow-hidden">
        <Analysis
          data={data}
          setData={setData}
          categoryCount={categoryCount}
          setCategoryCount={setCategoryCount}
          mouseDownBottomResize={mouseDownBottomResize}
          mouseDownLeftResize={mouseDownLeftResize}
          mouseDownMove={mouseDownMove}
          mouseDownRightResize={mouseDownRightResize}
          mouseDownTopResize={mouseDownTopResize}
          tablesData={tablesData}
          setTablesData={setTablesData}
          copiedTablesData={copiedTablesData}
          setCopiedTablesData={setCopiedTablesData}
          setIsPieChartCard={setIsPieChartCard}
          setIsBarChartCard={setIsBarChartCard}
          setIsSlicerCard={setIsSlicerCard}
          setIsCard={setIsCard}
          setIsTimeline={setIsTimeline}
          setIsGauge={setIsGauge}
          setIsLineChart={setIsLineChart}
          setIsTableSceneCard={setIsTableSceneCard}
          isDataReady={isDataReady}
          isPanelDown={isPanelDown}
          selectedTable={selectedTable}
          setIsPanelDown={setIsPanelDown}
          setIsTableCard={setIsTableCard}
          setIsRelationshipTableCard={setIsRelationshipTableCard}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          tableData={tablesData}
          setSelectedTable={setSelectedTable}
          selectedTableData={selectedTableData}
          setSelectedTableData={setSelectedTableData}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          AddedCols={AddedCols}
          setAddedCols={setAddedCols}
          AddedTables={AddedTables}
          setAddedTables={setAddedTables}
          checkArray={checkArray}
          setCheckArray={setCheckArray}
        />

        <SelectTables
          categoryCount={categoryCount}
          setCategoryCount={setCategoryCount}
          setTablesData={setRelationsTablesData}
          // setCopiedTablesData={setCopiedTablesData}
          setSelectedTable={setRelationsSelectedTable}
        />
        <TablesRelations
          categoryCount={categoryCount}
          setCategoryCount={setCategoryCount}
          tablesData={relationstablesData}
          setTablesData={setRelationsTablesData}
          // copiedTablesData={copiedTablesData}
          // setCopiedTablesData={setCopiedTablesData}
          relationShips={relationShips}
          setRelationShips={setRelationShips}
          virtualTables={virtualTables}
          setVirsualTables={setVirsualTables}
          selectedTable={relationsSelectedTable}
        />
        <VirtualTable
          categoryCount={categoryCount}
          setCategoryCount={setCategoryCount}
          relationShips={relationShips}
          setVirsualTables={setVirsualTables}
          tableData={relationstablesData}
          setTablesData={setRelationsTablesData}
          // copiedTablesData={copiedTablesData}
          // setCopiedTablesData={setCopiedTablesData}
          virtualTables={virtualTables}
        />

        <ManageTables
          categoryCount={categoryCount}
          setCategoryCount={setCategoryCount}
          tableData={tablesData}
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
          setTablesData={setTablesData}
          selectedTableData={selectedTableData}
          setSelectedTableData={setSelectedTableData}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          AddedCols={AddedCols}
          setAddedCols={setAddedCols}
          AddedTables={AddedTables}
          setAddedTables={setAddedTables}
          activeColItem={activeColItem}
          setActiveColItem={setActiveColItem}
          expressions={expressions}
          setExpressions={setExpressions}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <ChooseUsers
          categoryCount={categoryCount}
          setCategoryCount={setCategoryCount}
        />
      </div>
    </div>
  );
};

export default ManageMiniPowerBi;
