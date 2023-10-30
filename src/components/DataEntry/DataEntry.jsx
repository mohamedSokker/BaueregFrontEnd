import React, { useState } from "react";

import Dropdown from "../Dropdown";
import { AllStocks } from "../../data/Tablesdata";

const equipmentTypes = [
  { Equipment_Type: "Trench_Cutting_Machine" },
  { Equipment_Type: "Drilling_Machine" },
  { Equipment_Type: "Heavy_Cranes" },
  { Equipment_Type: "Cranes_25_Ton" },
  { Equipment_Type: "Forklift" },
  { Equipment_Type: "Micro_Piling_Machine" },
  { Equipment_Type: "Excavator" },
  { Equipment_Type: "Grouting_Container_13" },
];

const perMaintPlan = [{ plan: "250" }, { plan: "1000" }, { plan: "2000" }];

const stocksList = () => {
  let stocks = [];
  for (let i = 0; i < AllStocks.length; i++) {
    stocks.push({ stock: AllStocks[i] });
  }
  return stocks;
};

const getDate = (date) => {
  const dt = new Date(date);
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  return dt.toISOString().slice(0, 16);
};

const initialData = {
  Site: "",
  "Equipment Type": "",
  "Equipment Model": "",
  Equipment: "",
  "Working Hours": "",
  Breakdown: "",
  "Periodic Maintenance Interval": "",
  Problem: "",
  Action: "",
  "Problem Start From": "",
  "Problem End To": "",
  "Site QC Time": "",
  Store: "",
  "Spare Part": "",
};
const DataEntry = () => {
  const [data, setData] = useState(initialData);

  console.log(data);

  const getChildData = (label, value) => {
    setData((prev) => ({ ...prev, [label]: value }));
  };

  return (
    <div className="w-full h-full flex flex-col justify-around">
      <div className="w-[100%] h-[100%] flex flex-row flex-wrap justify-start items-start overflow-auto">
        <Dropdown
          label="Site"
          URL="/api/v1/Location_Bauer"
          column="Location"
          local={false}
          getChildData={getChildData}
        />
        <Dropdown
          label="Breakdown"
          URL="/api/v1/Bauer_Breakdown"
          column="Trench_Cutting_Machine"
          local={false}
          getChildData={getChildData}
        />
        <div className="p-2 flex flex-row justify-start items-center">
          <input
            type="datetime-local"
            value={getDate(new Date())}
            className="w-[30vw] border-1 border-logoColor rounded-md outline-none p-2"
          />
        </div>
        <Dropdown
          label="Equipment Type"
          local={true}
          localData={equipmentTypes}
          column="Equipment_Type"
          getChildData={getChildData}
        />
        <Dropdown
          label="Periodic Maintenance Interval"
          local={true}
          localData={perMaintPlan}
          column="plan"
          getChildData={getChildData}
        />
        <div className="p-2 flex flex-row justify-start items-center">
          <input
            type="text"
            placeholder="Site QC Time"
            className="w-[30vw] border-1 border-logoColor rounded-md outline-none p-2"
          />
        </div>
        <Dropdown
          label="Equipment Model"
          URL="/api/v1/Bauer_Equipments"
          local={false}
          column="Equipment_Model"
          getChildData={getChildData}
        />
        <div className="p-2 flex flex-row justify-start items-center">
          <input
            type="text"
            placeholder="Problem"
            className="w-[30vw] border-1 border-logoColor rounded-md outline-none p-2"
          />
        </div>
        <Dropdown
          label="Store"
          local={true}
          localData={stocksList()}
          column="stock"
          getChildData={getChildData}
        />
        <Dropdown
          label="Equipment"
          URL="/api/v1/Bauer_Equipments"
          column="Equipment"
          local={false}
          getChildData={getChildData}
        />
        <div className="p-2 flex flex-row justify-start items-center">
          <input
            type="text"
            placeholder="Action"
            className="w-[30vw] border-1 border-logoColor rounded-md outline-none p-2"
          />
        </div>
        <div className="p-2 flex flex-row justify-start items-center">
          <input
            type="text"
            placeholder="Spare Part"
            className="w-[30vw] border-1 border-logoColor rounded-md outline-none p-2"
          />
        </div>
        <div className="p-2 flex flex-row justify-start items-center">
          <input
            type="text"
            placeholder="Working Hours"
            className="w-[30vw] border-1 border-logoColor rounded-md outline-none p-2"
          />
        </div>
        <div className="p-2 flex flex-row justify-start items-center">
          <input
            type="datetime-local"
            value={getDate(new Date())}
            className="w-[30vw] border-1 border-logoColor rounded-md outline-none p-2"
          />
        </div>
        <div className="w-[100%] h-[20%] text-white font-bold text-[16px] flex items-center p-2">
          <button className="w-full p-2 px-4 flex flex-row justify-around bg-green-700 rounded-lg">
            + Add Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataEntry;
