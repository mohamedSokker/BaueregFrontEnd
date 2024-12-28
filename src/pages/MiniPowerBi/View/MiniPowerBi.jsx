import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const MiniPowerBi = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();

  const {
    mouseMoveMove,
    mouseUpMove,
    data,
    setData,
    expressions,
    tablesData,
    setTablesData,
    copiedTablesData,
    setCopiedTablesData,
    isChoose,
    isRelationshipChoose,
    setIsRelationshipChoose,
    closeSmallSidebar,
    message,
  } = useInitContext();

  // console.log(tablesData);
  // console.log(copiedTablesData);

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

  // console.log(relationshipdata);

  const getTablesData = async (d, rshipd) => {
    d?.map(async (item) => {
      const url = `/api/v3/${item}`;
      const data = await axiosPrivate(url, { method: "GET" });
      setTablesData((prev) => ({
        ...prev,
        [item]: { ...d[item], data: data.data },
      }));
      setCopiedTablesData((prev) => ({
        ...prev,
        [item]: { ...d[item], data: data.data },
      }));
    });

    // let relationShipData = {};
    rshipd?.map(async (item) => {
      const content = item.split(",");
      // console.log(relHandles);
      content.map(async (el) => {
        const data = await getTableData(el);
        setRelationshipData((prev) => ({
          ...prev,
          [el]: data,
        }));
        // relationShipData = { ...relationShipData, [el]: data };
      });
    });
    // console.log(relationShipData);
  };

  useEffect(() => {
    relationsTable?.map(async (item) => {
      if (isRelationshipChoose?.includes(item.Name)) {
        const relationships = JSON.parse(item?.RelationShips);
        let sourceTable = relationships?.[0]?.source;
        // const data = await getTableData(sourceTable);
        let sourceData = relationshipdata?.[sourceTable]
          ? relationshipdata?.[sourceTable]
          : [];
        let currentVT = [];

        relationships?.map((item) => {
          currentVT = [];
          currentVT.push(
            ...sourceData?.map((row1) => {
              const match = relationshipdata?.[item?.target]?.find(
                (row2) =>
                  row1?.[item?.sourceHandle] === row2?.[item?.targetHandle]
              );
              return { ...row1, ...match, ID: row1.ID };
            })
          );
          sourceData = currentVT;
        });
        currentVT.push(sourceData);
        currentVT.pop();
        setTablesData((prev) => ({
          ...prev,
          [item?.Name]: { name: item?.Name, data: currentVT },
        }));
        setCopiedTablesData((prev) => ({
          ...prev,
          [item?.Name]: { name: item?.Name, data: currentVT },
        }));
      }
    });
  }, [relationshipdata]);

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

      setRelationsTable(responseData[1]?.data);

      const allowedUsers = JSON.parse(targetItem?.UsersToView);
      const createdUser = targetItem?.CreatedBy;
      const viewData = JSON.parse(targetItem?.ViewData);

      setIsRelationshipChoose(viewData?.isRelationshipChoose);
      await getTablesData(viewData?.isChoose, viewData?.isRelationshipChoose);

      setData(viewData.data);

      console.log(viewData);
      setLoading(false);
    } catch (err) {
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
      // setErrorData((prev) => [
      //   ...prev,
      //   err?.response?.data?.message
      //     ? err?.response?.data?.message
      //     : err?.message,
      // ]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // console.log(data);
  // console.log(expressions);

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
