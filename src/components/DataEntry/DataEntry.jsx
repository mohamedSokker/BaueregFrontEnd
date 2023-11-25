import React, { useState } from "react";

import Dropdown from "../Dropdown";
import { AllStocks } from "../../data/Tablesdata";
import BC250 from "./BC250";
import BC1000 from "./BC1000";
import BC2000 from "./BC2000";
import BG250 from "./BG250";
import BG1000 from "./BG1000";
import BG2000 from "./BG2000";
import MC250 from "./MC250";
import MC1000 from "./MC1000";
import MC2000 from "./MC2000";

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

const initialPerMaintData = {};
const initialSaved = {
  BC250: false,
  BC1000: false,
  BC2000: false,
  BG250: false,
  BG1000: false,
  BG2000: false,
  MC250: false,
  MC1000: false,
  MC2000: false,
};
const DataEntry = () => {
  const [data, setData] = useState(initialData);
  const [perMaintData, setPerMaintData] = useState(initialPerMaintData);
  const [saved, setSaved] = useState(initialSaved);

  // console.log(data);
  console.log(perMaintData);
  // console.log(saved);

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
      {data[`Periodic Maintenance Interval`] === "250" &&
        data[`Equipment Model`].startsWith("BC") &&
        !saved.BC250 && (
          <BC250 setPerMaintData={setPerMaintData} setSaved={setSaved} />
        )}
      {data[`Periodic Maintenance Interval`] === "1000" &&
        data[`Equipment Model`].startsWith("BC") && (
          <>
            {!saved.BC250 && (
              <BC250 setPerMaintData={setPerMaintData} setSaved={setSaved} />
            )}
            {!saved.BC1000 && (
              <BC1000 setPerMaintData={setPerMaintData} setSaved={setSaved} />
            )}
          </>
        )}
      {data[`Periodic Maintenance Interval`] === "2000" &&
        data[`Equipment Model`].startsWith("BC") && (
          <>
            {!saved.BC250 && (
              <BC250 setPerMaintData={setPerMaintData} setSaved={setSaved} />
            )}
            {!saved.BC1000 && (
              <BC1000 setPerMaintData={setPerMaintData} setSaved={setSaved} />
            )}
            {!saved.BC2000 && (
              <BC2000 setPerMaintData={setPerMaintData} setSaved={setSaved} />
            )}
          </>
        )}

      {data[`Periodic Maintenance Interval`] === "250" &&
        data[`Equipment Model`].startsWith("MC") &&
        !saved.MC250 && (
          <MC250 setPerMaintData={setPerMaintData} setSaved={setSaved} />
        )}
      {data[`Periodic Maintenance Interval`] === "1000" &&
        data[`Equipment Model`].startsWith("MC") && (
          <>
            {!saved.MC250 && (
              <MC250 setPerMaintData={setPerMaintData} setSaved={setSaved} />
            )}
            {!saved.MC1000 && (
              <MC1000 setPerMaintData={setPerMaintData} setSaved={setSaved} />
            )}
          </>
        )}
      {data[`Periodic Maintenance Interval`] === "2000" &&
        data[`Equipment Model`].startsWith("MC") && (
          <>
            {!saved.MC250 && (
              <MC250 setPerMaintData={setPerMaintData} setSaved={setSaved} />
            )}
            {!saved.MC1000 && (
              <MC1000 setPerMaintData={setPerMaintData} setSaved={setSaved} />
            )}
            {!saved.MC2000 && (
              <MC2000 setPerMaintData={setPerMaintData} setSaved={setSaved} />
            )}
          </>
        )}

      {data[`Periodic Maintenance Interval`] === "250" &&
        data[`Equipment Type`] === "Drilling_Machine" &&
        !saved.BG250 && (
          <BG250 setPerMaintData={setPerMaintData} setSaved={setSaved} />
        )}
      {data[`Periodic Maintenance Interval`] === "1000" &&
        data[`Equipment Type`] === "Drilling_Machine" && (
          <>
            {!saved.BG250 && (
              <BG250 setPerMaintData={setPerMaintData} setSaved={setSaved} />
            )}
            {!saved.BG1000 && (
              <BG1000 setPerMaintData={setPerMaintData} setSaved={setSaved} />
            )}
          </>
        )}
      {data[`Periodic Maintenance Interval`] === "2000" &&
        data[`Equipment Type`] === "Drilling_Machine" && (
          <>
            {!saved.BG250 && (
              <BG250 setPerMaintData={setPerMaintData} setSaved={setSaved} />
            )}
            {!saved.BG1000 && (
              <BG1000 setPerMaintData={setPerMaintData} setSaved={setSaved} />
            )}
            {!saved.BG2000 && (
              <BG2000 setPerMaintData={setPerMaintData} setSaved={setSaved} />
            )}
          </>
        )}
    </div>
  );
};

export default DataEntry;
