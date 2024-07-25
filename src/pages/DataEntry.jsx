import React from "react";
import { useNavContext } from "../contexts/NavContext";
import { useParams } from "react-router-dom";
import Maintenance from "./DataEntry/Maintenance/View/Maintenance";
import AvailabilityPlan from "./DataEntry/AvailabilityPlan/View/AvailabiltyPlan";
import EquipmentsLocation from "../pages/DataEntry/EquipmentsLocation/View/EquipmentsLocation";
import Machinary from "../subPages/Machinary";
import MachinaryLocation from "./DataEntry/MachinaryLocation/View/MachinaryLocation";
import GearboxTrench from "./DataEntry/GearboxTrench/View/GearboxTrench";
import ToolsLocation from "./DataEntry/ToolsLocation/View/ToolsLocation";
import Received_Invoice from "./DataEntry/Recieved_Invoice/View/Received_Invoice";

const DataEntry = () => {
  const { closeSmallSidebar } = useNavContext();
  const { tableName } = useParams();

  const renderPage = () => {
    if (tableName === "Maintenance") {
      return <Maintenance />;
    } else if (tableName === "AvailabilityPlan") {
      return <AvailabilityPlan />;
    } else if (tableName === "EquipmentsLocation") {
      return <EquipmentsLocation />;
    } else if (tableName === "MachinaryLocation") {
      return <MachinaryLocation />;
    } else if (tableName === "Tools") {
      return <GearboxTrench />;
    } else if (tableName === "ToolsLocation") {
      return <ToolsLocation />;
    } else if (tableName === "Received_Invoice") {
      return <Received_Invoice />;
    } else {
      return <Machinary />;
    }
  };

  return (
    <div
      className="w-full bg-gray-100 rounded-xl h-[100%] Main--Content flex items-center justify-center dark:bg-background-logoColor"
      onClick={closeSmallSidebar}
    >
      {renderPage()}
    </div>
  );
};

export default DataEntry;
