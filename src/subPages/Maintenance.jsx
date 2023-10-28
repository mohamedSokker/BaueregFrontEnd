import React, { useState } from "react";

import { useNavContext } from "../contexts/NavContext";
import { logoColor } from "../BauerColors";

const Maintenance = () => {
  const { closeSmallSidebar } = useNavContext();
  const [currentCat, setCurrentCat] = useState("Data Entry");

  return (
    <div
      className={`w-full flex flex-col bg-main-bg Main--Page dark:bg-background-logoColor h-full`}
      onClick={closeSmallSidebar}
    >
      <div className="flex flex-row justify-around h-[20%]">
        <div
          className="w-[20%] h-[100%] px-2 py-4 flex justify-center items-center cursor-pointer"
          style={{
            borderBottomWidth: 1,
            borderBottomColor:
              currentCat === "Data Entry" ? logoColor : "white",
          }}
          onClick={() => setCurrentCat("Data Entry")}
        >
          Data Entry
        </div>
        <div
          className="w-[20%] h-[100%] px-2 py-4 flex  justify-center items-center cursor-pointer"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: currentCat === "Table" ? logoColor : "white",
          }}
          onClick={() => setCurrentCat("Table")}
        >
          Table
        </div>
        <div
          className="w-[20%] h-[100%] px-2 py-4 flex  justify-center items-center cursor-pointer"
          style={{
            borderBottomWidth: 1,
            borderBottomColor:
              currentCat === "Import From Excel" ? logoColor : "white",
          }}
          onClick={() => setCurrentCat("Import From Excel")}
        >
          Import From Excel
        </div>
      </div>
      <div className="flex flex-row flex-wrap h-[80%]"></div>
    </div>
  );
};

export default Maintenance;
