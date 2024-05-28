import React from "react";
import { useNavContext } from "../contexts/NavContext";
import { useParams } from "react-router-dom";
import Maintenance from "./DataEntry/Maintenance/View/Maintenance";
import AvailabilityPlan from "./DataEntry/AvailabilityPlan/View/AvailabiltyPlan";
import EquipmentsLocation from "./DataEntry/EquipmentsLocation/View/EquipmentsLocation";
import Machinary from "../subPages/Machinary";

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
