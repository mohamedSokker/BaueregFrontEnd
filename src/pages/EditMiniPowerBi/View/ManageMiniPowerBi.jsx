import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.js";

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
import {
  getHelperFunction,
  getHelperFunction1,
} from "../Controllers/Expressions/KeyWordsHelper.js";

const ManageMiniPowerBi = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();

  const [dataExpressions, setDataExpressions] = useState([]);

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

  useEffect(() => {
    if (
      Object.keys(tablesData).length ===
        [...isChoose, ...isRelationshipChoose].length &&
      Object.keys(tablesData).length !== 0
    ) {
      setLoading(true);
      setMessage(`Initializing Expressions...`);
      Object.keys(dataExpressions)?.map((table) => {
        const allowedKeys = [...Object.keys(tablesData?.[table]?.data?.[0])];
        console.log(dataExpressions);
        let added = {};
        Object.keys(dataExpressions?.[table])?.map((col) => {
          added = added?.[table]
            ? { ...added, [table]: [...added?.[table], col] }
            : { ...added, [table]: [col] };
        });
        console.log(added);
        setAddedCols(added);
        // setAddedCols(dataExpressions);
        setExpressions(dataExpressions);
        const cols = Object.keys(dataExpressions?.[table]);
        cols.map((ex) => {
          const exp = dataExpressions?.[table]?.[ex];
          const isChooseValue = exp.split("(")[0];

          const expressionFunction = new Function(
            ...allowedKeys,
            `${getHelperFunction1(exp, isChooseValue)};`
          );
          let copiedData = { ...tablesData };
          const result = tablesData?.[table]?.data?.map((row) => ({
            ...row,
            [ex]: expressionFunction(...allowedKeys.map((key) => row[key])),
          }));
          copiedData[table].data = result;
          console.log(copiedData);
          setTablesData(copiedData);
          setCopiedTablesData(copiedData);
        });
      });
      setLoading(false);
    }
  }, [isChoose, isRelationshipChoose, dataExpressions]);

  const getTablesData = async (d, rshipd) => {
    setLoading(true);
    setMessage(`Getting Data From Database`);
    const urls = [];
    d.map((item) => {
      urls.push(`/api/v3/${item}`);
      if (!selectedTable.includes(item)) {
        setSelectedTable((prev) => [...prev, item]);
      }
    });

    const relUrls = [];
    const tbles = [];
    rshipd.map((item) => {
      const content = item.split(",");
      content.map((el) => {
        if (el !== "" && !relUrls.includes(`/api/v3/${el}`)) {
          relUrls.push(`/api/v3/${el}`);
          tbles.push(el);
        }
      });
    });

    const data = await Promise.all(
      urls.map((url) => {
        return axiosPrivate(url, { method: "GET" });
      })
    );

    const relData = await Promise.all(
      relUrls.map((url) => {
        return axiosPrivate(url, { method: "GET" });
      })
    );

    d.map((item, idx) => {
      setTablesData((prev) => ({
        ...prev,
        [item]: {
          ...d[item],
          data: data[idx].data,
          name: item,
          dataTypes: detectTableColumnTypes(data[idx].data),
        },
      }));
      setCopiedTablesData((prev) => ({
        ...prev,
        [item]: {
          ...d[item],
          data: data[idx].data,
          name: item,
          dataTypes: detectTableColumnTypes(data[idx].data),
        },
      }));
    });

    console.log(relData);

    rshipd.map((item) => {
      if (!selectedRelationshipsTable.includes(item)) {
        setSelectedRelationshipsTable((prev) => [...prev, item]);
      }
      // const content = item.split(",");
      tbles.map((el, idx) => {
        if (el !== "") {
          setRelationshipData((prev) => ({
            ...prev,
            [el]: relData[idx]?.data,
          }));
        }
      });
    });
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setMessage(`Performing Relations...`);
    for (const item of relationsTable) {
      if (isRelationshipChoose?.includes(item.Name)) {
        const relationships = JSON.parse(item?.RelationShips);
        console.log(relationships);
        const copiedRelationstablesData = {
          ...relationshipdata,
        };
        console.log(copiedRelationstablesData);
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
        console.log(currentVT);
        setTablesData((prev) => ({
          ...prev,
          [item?.Name]: {
            name: item?.Name,
            data: currentVT,
            dataTypes: detectTableColumnTypes(currentVT),
          },
        }));
        setCopiedTablesData((prev) => ({
          ...prev,
          [item?.Name]: {
            name: item?.Name,
            data: currentVT,
            dataTypes: detectTableColumnTypes(currentVT),
          },
        }));
      }
    }
    setLoading(false);
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

      // console.log(responseData[1]?.data);
      setRelationsTable(responseData[1]?.data);

      setViewName(targetItem?.Name);
      setViewGroup(targetItem?.Group);
      setUsersNamesData(JSON.parse(targetItem?.UsersToView));
      const viewData = JSON.parse(targetItem?.ViewData);

      setIsChoose(Object.keys(viewData?.tablesData));

      setIsRelationshipChoose(viewData?.isRelationshipChoose);
      await getTablesData(viewData?.isChoose, viewData?.isRelationshipChoose);

      setDataExpressions(viewData?.expressions);

      setData(viewData.data);

      // setLoading(false);
    } catch (err) {
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

  return (
    <div
      className="w-full flex flex-col px-4 bg-gray-100 dark:bg-background-logoColor h-full relative text-[14px]"
      onClick={closeSmallSidebar}
      onMouseMove={mouseMoveMove}
      onMouseUp={mouseUpMove}
    >
      {loading && <PageLoading message={`Initializing...`} />}
      <FiltersCards />

      <div className="w-full h-full flex flex-row overflow-hidden relative">
        <Analysis />
        <SelectTables />
        <TablesRelations />
        <VirtualTable />
        <ManageTables />
        <ChooseUsers reportID={id} />
      </div>
    </div>
  );
};

export default ManageMiniPowerBi;
