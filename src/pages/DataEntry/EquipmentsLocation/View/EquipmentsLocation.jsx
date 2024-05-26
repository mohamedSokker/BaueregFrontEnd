import React, { useState } from "react";
import { GrTable } from "react-icons/gr";
import { BsDatabaseAdd } from "react-icons/bs";

import { logoColor } from "../../../../BauerColors";
import { useNavContext } from "../../../../contexts/NavContext";

import DataEntry from "../Components/DataEntry";
import Table from "../Components/Table";

const EquipmentsLocation = () => {
  const { closeSmallSidebar } = useNavContext();
  const [currentCat, setCurrentCat] = useState("Data Entry");

  return (
    <div
      className={`w-full flex flex-col bg-gray-100 Main--Page dark:bg-background-logoColor h-full relative`}
      onClick={closeSmallSidebar}
    >
      <div className="flex flex-row justify-around h-[10%]">
        <div
          className="w-[20%] h-[100%] px-2 py-4 flex justify-center items-center cursor-pointer gap-2 text-green-800"
          style={{
            borderBottomWidth: 1,
            borderBottomColor:
              currentCat === "Data Entry" ? logoColor : "rgb(243,244,246)",
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
            borderBottomColor:
              currentCat === "Table" ? logoColor : "rgb(243,244,246)",
          }}
          onClick={() => setCurrentCat("Table")}
        >
          <GrTable />
          <p className="text-black text-[14px]">Table</p>
        </div>
      </div>

      <div className="flex flex-row flex-wrap w-[100vw] h-[90%] bg-gray-100 p-4">
        {currentCat === "Data Entry" ? <DataEntry /> : <Table />}
      </div>
    </div>
  );
};

export default EquipmentsLocation;
