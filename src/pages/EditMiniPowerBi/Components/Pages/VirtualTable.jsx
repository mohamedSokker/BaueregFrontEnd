import React, { useEffect, useState } from "react";

import { PageLoading, Spinner } from "../../../../components";
import { Header } from "../../../../components";
import ToolsSIdebar from "../Sidebars/ToolsSIdebar";
import TableAbstract from "../TableAbstract";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useNavContext } from "../../../../contexts/NavContext";
import { useInitContext } from "../../Contexts/InitContext";

const VirtualTable = () => {
  const {
    categoryCount,
    setCategoryCount,
    relationShips,
    relationstablesData,
    // setTablesData,
    // setCopiedTablesData,
    virtualTables,
    setVirsualTables,
    relationShipsExpressions,
  } = useInitContext();

  const axiosPrivate = useAxiosPrivate();
  const { usersData } = useNavContext();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const getData = async () => {
    try {
      setLoading(true);
      console.log(relationShips);
      setMessage("Performing Relationships...");
      const copiedRelationstablesData = { ...relationstablesData };
      let sourceTable = relationShips?.[0]?.source;
      let sourceData = copiedRelationstablesData?.[sourceTable]?.data
        ? copiedRelationstablesData?.[sourceTable]?.data
        : [];
      let currentVT = [];

      relationShips?.map((item) => {
        if (item?.source === "FiltersNode") {
          if (item?.sourceHandle === "Blank()") {
            copiedRelationstablesData[item?.target].data =
              copiedRelationstablesData?.[item?.target]?.data?.filter(
                (row) => row?.[item?.targetHandle] === null
              );
          }
        }
      });

      relationShips.map((item) => {
        if (item?.source !== "FiltersNode") {
          currentVT = [];
          currentVT.push(
            ...sourceData?.map((row1) => {
              const match = copiedRelationstablesData?.[
                item?.target
              ]?.data.find(
                (row2) =>
                  row1?.[item?.sourceHandle] === row2?.[item?.targetHandle]
              );
              return { ...row1, ...match, ID: row1.ID };
            })
          );
          sourceData = currentVT;
        }
        // else {
        //   copiedRelationstablesData[item?.target].data =
        //     copiedRelationstablesData?.[item?.target]?.data?.filter(
        //       (row) => row?.[item?.targetHandle] !== null
        //     );
        // }
      });
      currentVT.push(sourceData);
      currentVT.pop();
      setVirsualTables(currentVT);

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [relationstablesData, relationShips, relationShipsExpressions]);

  // if (loading) return <PageLoading message={message} />;
  return (
    <div
      className="w-full h-full flex flex-col justify-between flex-shrink-0 flex-grow-0 overflow-scroll"
      style={{
        translate: `${-100 * categoryCount}%`,
        transition: `all 0.5s ease-in-out`,
      }}
    >
      {loading && <PageLoading message={message} />}
      <React.Fragment>
        <div className="flex flex-row items-center justify-between Header mb-10 ">
          <Header category="" title={`Virtual Table`} />
        </div>
        <div className="flex flex-row w-full h-full">
          <ToolsSIdebar
            categoryCount={categoryCount}
            setCategoryCount={setCategoryCount}
          />

          <TableAbstract
            data={virtualTables}
            settings={{
              allowPaging: true,
              allowSorting: true,
              allowFiltering: true,
              ignoreAccent: true,
              filterType: "Excel",
              rowHeight: 30,
              allowResizing: true,
              pageCount: 7,
              autoFit: true,
            }}
          />
        </div>
      </React.Fragment>

      <div className="w-full p-2">
        <button
          className="w-full p-2 bg-green-600 text-white rounded-[8px]"
          onClick={async () => {
            try {
              setLoading(true);
              setMessage(`Adding Data...`);
              let name = ``;
              relationShips.map((item, idx) => {
                if (idx === 0) {
                  name += `${item.source},${item.target}`;
                } else if (idx === relationShips.length - 1) {
                  name += `,${item.target}`;
                } else {
                  name += `,${item.target},`;
                }
              });
              // console.log(name);
              // console.log(relationShips);
              // console.log(usersData[0]?.username);
              const addURL = `/api/v3/PowerBiRelationShips`;
              await axiosPrivate(addURL, {
                method: "POST",
                data: JSON.stringify({
                  Name: name,
                  CreatedBy: usersData[0]?.username,
                  RelationShips: JSON.stringify(relationShips),
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

            // setTablesData((prev) => ({
            //   ...prev,
            //   VirtualTable: { data: virtualTables },
            // }));
            // setCopiedTablesData((prev) => ({
            //   ...prev,
            //   VirtualTable: { data: virtualTables },
            // }));
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default VirtualTable;
