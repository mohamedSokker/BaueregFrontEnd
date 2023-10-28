import React from "react";
import { useNavContext } from "../contexts/NavContext";
import { useParams } from "react-router-dom";
import Maintenance from "../subPages/Maintenance";
import PeriodicMaintenance from "../subPages/PeriodicMaintenance";
import EquipmentsLocation from "../subPages/EquipmentsLocation";
import Machinary from "../subPages/Machinary";

const DataEntry = () => {
  const { closeSmallSidebar } = useNavContext();
  const { tableName } = useParams();
  const renderPage = () => {
    if (tableName === "Maintenance") {
      return <Maintenance />;
    } else if (tableName === "PeriodicMaintenance") {
      return <PeriodicMaintenance />;
    } else if (tableName === "EquipmentsLocation") {
      return <EquipmentsLocation />;
    } else {
      return <Machinary />;
    }
  };

  return (
    <div
      className="bg-white rounded-xl Main--Content flex items-center justify-center dark:bg-background-logoColor"
      onClick={closeSmallSidebar}
    >
      {renderPage()}
    </div>
  );
};

export default DataEntry;
