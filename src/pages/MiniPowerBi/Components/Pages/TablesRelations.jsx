import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  //   MdKeyboardDoubleArrowDown,
  //   MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  reconnectEdge,
} from "reactflow";

import "reactflow/dist/style.css";
import ToolsSIdebar from "../Sidebars/ToolsSIdebar";
import { useInitContext } from "../../Contexts/InitContext";

const Output = ({ data }) => {
  const [styles, setStyles] = useState(null);

  const nodeRef = useRef(null);

  useEffect(() => {
    if (nodeRef.current)
      setStyles(nodeRef.current && window.getComputedStyle(nodeRef.current));
  }, [nodeRef.current]);
  return (
    <div
      className="bg-gray-200  border border-solid border-gray-400 -auto overflow-hidden text-logoColor"
      ref={nodeRef}
      style={{ height: data?.columns?.length * 10 + 20 }}
    >
      {data?.columns?.map((item, i) => (
        <React.Fragment key={i}>
          <Handle
            type={data?.type}
            position={data?.type === "target" ? Position.Left : Position.Right}
            id={item}
            style={{
              top: 10 * i + 20,
            }}
          >
            <div
              className=" bottom-1 relative text-[6px]  text-logo-secColor"
              style={{
                left:
                  data?.type === "target"
                    ? "8px"
                    : `-${parseInt(styles?.width, 10) - 8}px`,
              }}
            >
              {item}
            </div>
          </Handle>
        </React.Fragment>
      ))}

      <div className="px-8 p-[2px] bg-gray-300 text-[6px] font-[800] flex flex-row gap-2 justify-center items-center">
        <p className="h-full flex justify-center items-center">{data?.name}</p>
      </div>
    </div>
  );
};

const nodeTypes = { Output: Output };

const initialNodes = [];

const initialEdges = [];

const TablesRelations = () => {
  const {
    categoryCount,
    setCategoryCount,
    relationstablesData,
    setRelationsTablesData,
    selectedTable,
    // setCopiedTablesData,
    setRelationShips,
  } = useInitContext();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [isPanelDown, setIsPanelDown] = useState({});

  // console.log(tablesData);

  useEffect(() => {
    const tables = selectedTable;
    let currentXPosition = 0;
    let currentYPosition = 0;
    const currentNodes = [];
    tables?.map((item, i) => {
      currentNodes.push({
        id: item,
        position: { x: currentXPosition, y: currentYPosition },
        type: "Output",
        data: {
          label: item,
          name: item,
          columns: relationstablesData?.[item]?.data?.[0]
            ? Object.keys(relationstablesData?.[item]?.data?.[0])
            : [],
          type: relationstablesData?.[item]?.type,
        },
      });
      //   currentID += 1;
      currentXPosition += 200;
    });
    setNodes([...initialNodes, ...currentNodes]);
  }, [relationstablesData]);

  useEffect(() => {
    setRelationShips(edges);
  }, [edges]);

  //   console.log(tablesData);
  // console.log(tablesData);

  const edgeReconnectSuccessful = useRef(false);

  const onConnect = useCallback(
    (params) => {
      // console.log(params);
      return setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const onReconnectStart = useCallback(() => {
    // console.log("starts");
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback((oldEdge, newConnection) => {
    // console.log(oldEdge, newConnection);
    edgeReconnectSuccessful.current = true;
    setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
  }, []);

  const onReconnectEnd = useCallback((_, edge) => {
    // console.log(edge);
    if (!edgeReconnectSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeReconnectSuccessful.current = true;
  }, []);

  return (
    <div
      className="w-full h-full flex flex-col justify-between flex-shrink-0 flex-grow-0 overflow-scroll"
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
        <ReactFlow
          className="flex flex-grow"
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          snapToGrid
          onReconnect={onReconnect}
          onReconnectStart={onReconnectStart}
          onReconnectEnd={onReconnectEnd}
          fitView
          //   attributionPosition="top-right"
          style={{ backgroundColor: "#F7F9FB" }}
          nodeTypes={nodeTypes}
        >
          {/* <MiniMap /> */}
          <Controls />
          {/* <Background /> */}
        </ReactFlow>
        <div className="w-[200px] h-[90%] flex flex-col bg-gray-200 p-2 overflow-hidden">
          <div className="w-full">
            <p className="text-[10px] font-[800]">Nodes</p>
          </div>
          <div className="w-full h-full overflow-scroll p-1 flex flex-col gap-1">
            {relationstablesData &&
              selectedTable?.map((item, i) => (
                <div key={i} className="flex flex-col w-full">
                  <div className="w-full flex flex-row gap-2 justify-start items-center bg-white rounded-[4px] p-1 text-[12px] ">
                    <div
                      className="h-full w-full flex flex-row items-center justify-start gap-2 cursor-pointer"
                      onClick={() =>
                        setIsPanelDown((prev) =>
                          prev?.[item]
                            ? {
                                ...prev,
                                [item]: !prev?.[item],
                              }
                            : { ...prev, [item]: true }
                        )
                      }
                    >
                      <div className="w-[10px]">
                        {isPanelDown?.[item] ? (
                          <MdKeyboardArrowDown size={14} />
                        ) : (
                          <MdKeyboardArrowRight size={14} />
                        )}
                      </div>

                      <p className="text-[10px] w-[calc(100%-30px)] overflow-ellipsis whitespace-nowrap overflow-hidden">
                        {relationstablesData?.[item]?.name}
                      </p>
                    </div>
                  </div>

                  {isPanelDown?.[item] && (
                    <div className="w-full flex flex-col text-[10px] gap-1 py-1">
                      <div className="w-full flex flex-row gap-2 pl-3">
                        <input
                          type="radio"
                          name={`${item}`}
                          checked={
                            relationstablesData?.[item]?.type === "source"
                              ? true
                              : false
                          }
                          onChange={(e) => {
                            setRelationsTablesData((prev) => ({
                              ...prev,
                              [item]: {
                                ...prev?.[item],
                                type: "source",
                              },
                            }));
                            // setCopiedTablesData((prev) => ({
                            //   ...prev,
                            //   [item]: {
                            //     ...prev?.[item],
                            //     type: "source",
                            //   },
                            // }));
                          }}
                        />
                        <p>source</p>
                      </div>
                      <div className="w-full flex flex-row gap-2 pl-3">
                        <input
                          type="radio"
                          name={`${item}`}
                          checked={
                            relationstablesData?.[item]?.type === "target"
                              ? true
                              : false
                          }
                          onChange={(e) => {
                            setRelationsTablesData((prev) => ({
                              ...prev,
                              [item]: {
                                ...prev?.[item],
                                type: "target",
                              },
                            }));
                            // setCopiedTablesData((prev) => ({
                            //   ...prev,
                            //   [item]: {
                            //     ...prev?.[item],
                            //     type: "target",
                            //   },
                            // }));
                          }}
                        />
                        <p>target</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="w-full p-2">
        <button
          className="w-full p-2 bg-green-600 text-white rounded-[8px]"
          onClick={() => {
            setCategoryCount((prev) => prev + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TablesRelations;