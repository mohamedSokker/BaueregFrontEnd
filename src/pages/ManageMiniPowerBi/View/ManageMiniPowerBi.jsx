import React, { useLayoutEffect, useState } from "react";

import { useNavContext } from "../../../contexts/NavContext";
import useEvenetListener from "../Controllers/eventListeners copy.js";
import Analysis from "../Components/Pages/Analysis.jsx";
import SelectTables from "../Components/Pages/SelectTables.jsx";
import TablesRelations from "../Components/Pages/TablesRelations.jsx";
import VirtualTable from "../Components/Pages/VirtualTable.jsx";
import FiltersCards from "../Components/FiltersCards.jsx";
import ManageTables from "../Components/Pages/ManageTable.jsx";
import ChooseUsers from "../Components/Pages/ChooseUsers.jsx";
// import useTablesData from "../Controllers/TablesData.js";
import PageLoading from "../../../components/PageLoading.jsx";
import { useDataContext } from "../Contexts/DataContext.jsx";
import { useInitContext } from "../Contexts/InitContext.jsx";

const ManageMiniPowerBi = () => {
  // const { closeSmallSidebar } = useNavContext();

  const {
    mouseMoveMove,
    mouseUpMove,
    data,
    setData,
    expressions,
    tablesData,
    isChoose,
    isRelationshipChoose,
    closeSmallSidebar,
  } = useInitContext();

  const { loading } = useDataContext();

  console.log(data);
  console.log(expressions);

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
  // console.log(expressions);
  // console.log(tablesData);
  // console.log(isChoose);
  // console.log(isRelationshipChoose);
  // console.log(tablesData);

  return (
    <div
      className="w-full flex flex-col px-4 bg-gray-100 Main--Page dark:bg-background-logoColor h-full relative text-[14px]"
      onClick={closeSmallSidebar}
      onMouseMove={mouseMoveMove}
      onMouseUp={mouseUpMove}
    >
      {loading && <PageLoading message={`Initializing...`} />}
      <FiltersCards />

      <div className="w-full h-full flex flex-row overflow-hidden">
        <Analysis />
        <SelectTables />
        <TablesRelations />
        <VirtualTable />
        <ManageTables />
        <ChooseUsers />
      </div>
    </div>
  );
};

export default ManageMiniPowerBi;
