import React, { useState } from "react";
import { SiMicrosoftexcel } from "react-icons/si";
import { GrTable } from "react-icons/gr";
import { BsDatabaseAdd } from "react-icons/bs";

import { useNavContext } from "../contexts/NavContext";
import { logoColor } from "../BauerColors";
import DataEntry from "../components/DataEntry/DataEntry";
import Table from "../components/DataEntry/Table";
import ImportExcel from "../components/DataEntry/ImportExcel";

const Maintenance = () => {
  const { closeSmallSidebar } = useNavContext();
  const [currentCat, setCurrentCat] = useState("Data Entry");

  return (
    <div
      className={`w-full flex flex-col bg-main-bg Main--Page dark:bg-background-logoColor h-full relative`}
      onClick={closeSmallSidebar}
    >
      <div className="flex flex-row justify-around h-[10%]">
        <div
          className="w-[20%] h-[100%] px-2 py-4 flex justify-center items-center cursor-pointer gap-2 text-green-800"
          style={{
            borderBottomWidth: 1,
            borderBottomColor:
              currentCat === "Data Entry" ? logoColor : "white",
          }}
          onClick={() => setCurrentCat("Data Entry")}
        >
          <BsDatabaseAdd />
          <p className="text-black text-[14px]">Data Entry</p>
        </div>
        <div
          className="w-[20%] h-[100%] px-2 py-4 flex  justify-center items-center cursor-pointer gap-2 text-orange-600"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: currentCat === "Table" ? logoColor : "white",
          }}
          onClick={() => setCurrentCat("Table")}
        >
          <GrTable />
          <p className="text-black text-[14px]">Table</p>
        </div>
        <div
          className="w-[20%] h-[100%] px-2 py-4 flex  justify-center items-center cursor-pointer gap-2 text-green-800"
          style={{
            borderBottomWidth: 1,
            borderBottomColor:
              currentCat === "Import From Excel" ? logoColor : "white",
          }}
          onClick={() => setCurrentCat("Import From Excel")}
        >
          <SiMicrosoftexcel />
          <p className="text-black text-[14px]">Import From Excel</p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap w-[100vw] h-[90%] bg-white p-4">
        {currentCat === "Data Entry" ? (
          <DataEntry />
        ) : currentCat === "Table" ? (
          <Table />
        ) : (
          <ImportExcel />
        )}
      </div>
    </div>
  );
};

export default Maintenance;
