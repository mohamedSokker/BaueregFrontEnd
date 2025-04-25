import React, { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BiSend } from "react-icons/bi";

import { useInitContext } from "../../Contexts/InitContext";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import {
  pieOptions,
  barOptions,
  lineOptions,
  slicerOptions,
  slicerProps,
} from "../../Model/model";

const Chatbot = () => {
  const [chatText, setChatText] = useState("");
  const [aiResponseData, setAiResponseData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     setData({
  //       containerStyles: {
  //         initialWidth: "894px",
  //         width: "894px",
  //         height: "343.156px",
  //         scale: 1,
  //       },
  //       el: [
  //         {
  //           ID: 0,
  //           Type: "Slicer",
  //           actions: [],
  //           count: 0,
  //           dataFontSize: "10",
  //           dataFontWeight: "500",
  //           headerFontSize: "10",
  //           headerFontWeight: "500",
  //           height: "58.2825303943396%",
  //           left: 0,
  //           mainSlicer: "Equipment_Type",
  //           name: "Equipments_Location",
  //           props: [...slicerProps],
  //           slicerType: "Checks",
  //           subSlicers: ["Equipment"],
  //           table: "Equipments_Location",
  //           top: 0,
  //           width: "22.371364653243848%",
  //         },
  //       ],
  //     });
  //   }, []);
  const {
    setIsChatBot,
    isChatbot,
    setTablesData,
    tablesData,
    copiedTablesData,
    setCopiedTablesData,
    selectedTable,
    setSelectedTable,
    setData,
    data,
  } = useInitContext();
  const axiosPrivate = useAxiosPrivate();
  //   console.log(tablesData);
  //   console.log(selectedTable);
  //   console.log(data);

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      const url = `/api/v3/ai2`;
      const aiResponse = await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({
          query: chatText,
        }),
      });
      const result = [];
      const tables = [];
      const URLs = [];
      console.log(aiResponse?.data?.graphConfig?.graphs);
      aiResponse?.data?.graphConfig?.graphs?.map((item, idx) => {
        item?.table?.split(",")?.map((table) => {
          const schemaIndex = table?.indexOf("Schema");
          if (!tables?.includes(table?.slice(0, schemaIndex).trim()))
            tables?.push(table?.slice(0, schemaIndex)?.trim());
          if (!URLs?.includes(`api/v3/${table?.slice(0, schemaIndex).trim()}`))
            URLs.push(`api/v3/${table?.slice(0, schemaIndex).trim()}`);
        });

        if (item?.graphType) {
          if (item?.graphType === "Bar") {
            result?.push({
              ...barOptions,
              ...item,
              ID: idx + data?.el?.length,
              table: item?.table?.split("Schema").join("").trim(),
              name: item?.table?.split("Schema").join("").trim(),
            });
          } else if (item?.graphType === "Pie") {
            result?.push({
              ...pieOptions,
              ...item,
              ID: idx + data?.el?.length,
              table: item?.table?.split("Schema").join("").trim(),
              name: item?.table?.split("Schema").join("").trim(),
            });
          } else if (item?.graphType === "Line") {
            result?.push({
              ...lineOptions,
              ...item,
              ID: idx + data?.el?.length,
              table: item?.table?.split("Schema").join("").trim(),
              name: item?.table?.split("Schema").join("").trim(),
            });
          }
        } else if (item.slicerType) {
          result?.push({
            ...slicerOptions,
            ...item,
            ID: idx + data?.el?.length,
            table: item?.table?.split("Schema").join("").trim(),
            name: item?.table?.split("Schema").join("").trim(),
          });
        }
      });

      console.log(URLs);
      console.log(result);

      const responseData = await Promise.all(
        URLs.map((url) => {
          return axiosPrivate(url, { method: "GET" });
        })
      );

      let currentTablesData = {};

      responseData?.map((res, idx) => {
        currentTablesData = {
          ...currentTablesData,
          [tables?.[idx]]: { name: tables?.[idx], data: res?.data },
        };
        // if (!selectedTable?.includes(tables?.[idx]))
        //   setSelectedTable((prev) => [...prev, tables?.[idx]]);
      });

      aiResponse?.data?.graphConfig?.graphs?.map((item) => {
        const relationships = item?.table?.split(",");
        if (relationships?.length > 1) {
          let sourceTable = relationships?.[0]?.split("Schema").join("").trim();
          let sourceData = currentTablesData?.[sourceTable]?.data
            ? currentTablesData?.[sourceTable]?.data
            : [];
          let currentVT = [];

          const targetRelations = relationships?.slice(1);

          console.log(targetRelations);
          for (const item of targetRelations) {
            console.log("Second loop: Joining data...");
            currentVT = [];
            currentVT.push(
              ...sourceData?.map((row1) => {
                const match = currentTablesData?.[
                  item?.split("Schema")?.join("").trim()
                ]?.data?.find((row2) => row1?.Equipment === row2?.Equipment);
                return { ...match, ...row1 };
              })
            );
            sourceData = currentVT;
          }
          //   console.log(sourceData);
          console.log(currentVT);

          currentVT.push(sourceData);
          currentVT.pop();

          currentTablesData = {
            ...currentTablesData,
            [item?.table?.split("Schema").join("")]: {
              name: item?.table?.split("Schema").join(""),
              data: currentVT,
            },
          };
        }
      });

      console.log(currentTablesData);

      Object.keys(currentTablesData)?.map((item) => {
        if (!selectedTable?.includes(item))
          setSelectedTable((prev) => [...prev, item]);
      });

      setTablesData(currentTablesData);
      setCopiedTablesData(currentTablesData);
      setData((prev) => ({ ...prev, el: [...prev?.el, ...result] }));
      if (aiResponse === "") {
        setAiResponseData(chatText);
      } else {
        setAiResponseData((prev) => `${prev}\n${chatText}`);
      }

      setChatText("");
      setIsLoading(false);
    } catch (err) {
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
      setIsLoading(false);
    }
  };
  return (
    <div
      className="w-[500px] h-[250px] bg-gray-300 absolute flex flex-col justify-between items-center left-[45px] bottom-[5px] z-[2000]"
      style={{
        width: isChatbot ? "500px" : "0px",
        //   padding: isChatbot ? "0px" : "8px",
        transition: "width 0.5s ease-in-out",
      }}
    >
      <div
        className="w-full p-2 cursor-pointer flex flex-row justify-end"
        onClick={() => setIsChatBot(false)}
      >
        <IoIosCloseCircleOutline size={20} color="rgba(0,0,0,0.5)" />
      </div>
      <div className="flex w-full overflow-y-scroll">
        {isLoading ? (
          <p className="text-[10px]">Loading...</p>
        ) : (
          <p className="text-[10px]">{aiResponseData}</p>
        )}
      </div>
      <div
        className="h-[20%] w-full p-1 relative"
        style={{
          padding: isChatbot ? "4px" : "0px",
        }}
      >
        <form
          className="w-full h-full bg-white rounded-[6px] flex flex-row justify-between items-center px-1"
          style={{
            paddingRight: isChatbot ? "4px" : "0px",
            paddingLeft: isChatbot ? "4px" : "0px",
            resize: "none",
          }}
        >
          <textarea
            className="rounded-[6px] outline-none h-full p-1 pr-4 flex flex-grow"
            style={{
              padding: isChatbot ? "4px" : "0px",
              resize: "none",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Message AI"
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
          />
          <div
            className="flex flex-row justify-end items-center h-full cursor-pointer"
            style={{
              height: isChatbot ? "100%" : "0px",
              opacity: isLoading ? 0.5 : 1,
            }}
            onClick={handleSubmit}
          >
            {isChatbot && <BiSend size={18} />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
