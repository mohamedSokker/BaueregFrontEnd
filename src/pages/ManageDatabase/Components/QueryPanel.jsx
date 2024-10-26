import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

import Header from "./Header";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const QueryPanel = ({
  selectedTable,
  setErrorData,
  query,
  setQuery,
  category,
  setCategory,
}) => {
  const [loading, setLoading] = useState(false);
  const [DBResult, setDBResult] = useState("");

  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const getTableSchema = async () => {
      try {
        setLoading(true);
        const url = `/api/v3/${selectedTable}Schema`;
        const responseData = await axiosPrivate(url, { method: "GET" });
        // console.log(responseData.data);
        let result = ``;
        let values = ``;
        if (category === "Insert Query") {
          result = `INSERT INTO ${selectedTable} (`;
          Object.keys(responseData.data)?.map((item) => {
            if (item !== "ID") {
              result += `${item},`;
              values += `'',`;
            }
          });
          result = result.slice(0, -1);
          values = values.slice(0, -1);
          values += ")";
          result += ") VALUES (";
          result += values;
          setQuery(result);
        } else if (category === "Update Query") {
          result = `UPDATE ${selectedTable} SET `;
          Object.keys(responseData.data)?.map((item) => {
            if (item !== "ID") {
              result += `"${item}" = '',`;
            }
          });
          result = result.slice(0, -1);
          result += ` WHERE ID = ''`;

          setQuery(result);
        } else if (category === "Delete Query") {
          setQuery(`DELETE FROM ${selectedTable} WHERE ID = ''`);
        } else if (category === "Drop Table Query") {
          setQuery(`DROP TABLE ${selectedTable}`);
        } else if (category === "Blank Query") {
          setQuery("");
        }

        setLoading(false);
      } catch (err) {
        setErrorData((prev) => [
          ...prev,
          err?.response?.data?.message
            ? err?.response?.data?.message
            : err?.message,
        ]);
        setLoading(false);
      }
    };
    getTableSchema();
  }, [selectedTable, category]);
  return (
    <div className="flex flex-col gap-3 justify-center items-center h-full w-full px-2">
      <Header
        query={query}
        setDBResult={setDBResult}
        setCategory={setCategory}
        selectedTable={selectedTable}
        setLoading={setLoading}
      />
      {loading ? (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <ColorRing
            type="ColorRing"
            colors={[
              "rgb(59,130,246)",
              "rgb(59,130,246)",
              "rgb(59,130,246)",
              "rgb(59,130,246)",
              "rgb(59,130,246)",
            ]}
            height={30}
            width={30}
          />
          <p className="text-[14px] text-center px-2 text-blue-500 font-bold">
            {`Loading ${selectedTable} Data`}
          </p>
        </div>
      ) : (
        <>
          <textarea
            className="w-full outline-none border-b-[1px] border-gray-300 h-[50%] p-2 text-[12px] text-red-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex flex-col justify-start items-center h-[30%] w-full border-1 border-gray-300">
            <div className="flex flex-row justify-start items-center gap-1 w-full h-[24px] bg-white">
              <button className="p-1 px-3 border-r-1 border-b-1 border-gray-300 text-[10px] bg-gray-100">
                Result
              </button>
            </div>
            <div className="bg-white w-full h-full p-2 text-[12px]">
              {DBResult}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QueryPanel;
