import React from "react";
import { VscRunAll } from "react-icons/vsc";
import { FaSheetPlastic } from "react-icons/fa6";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Header = ({
  query,
  setDBResult,
  setCategory,
  selectedTable,
  setLoading,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const handleExecute = async () => {
    try {
      setLoading(true);
      const url = `/api/v3/performQuery`;
      const data = await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({ query: query, table: selectedTable }),
      });
      console.log(data?.data?.result?.rowsAffected?.[0]);
      setDBResult(`${data?.data?.result?.rowsAffected?.[0]} Rows Affected`);
      setLoading(false);
    } catch (err) {
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
      setLoading(false);
    }
  };
  return (
    <div className="w-full min-h-[40px] flex flex-row justify-end items-center px-2 gap-1">
      <button
        className="p-1 px-2 text-black text-[12px]  flex flex-row gap-1 items-center hover:bg-gray-300"
        onClick={handleExecute}
      >
        <VscRunAll color="green" />
        Execute
      </button>

      <button
        className="p-1 px-2 text-black text-[12px]  flex flex-row gap-1 items-center hover:bg-gray-300"
        onClick={() => setCategory("Blank Query")}
      >
        <FaSheetPlastic color="orange" />
        Query
      </button>
    </div>
  );
};

export default Header;
