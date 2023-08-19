import React from "react";
import { useNavContext } from "../contexts/NavContext";
import { useParams } from "react-router-dom";
import {
  BarcodeGen,
  BarcodeRead,
  StockOrder,
  StocksConsumption,
} from "../components";

const Stocks = () => {
  const { closeSmallSidebar } = useNavContext();
  const { tableName } = useParams();
  const renderPage = () => {
    if (tableName === "Barcode Generation") {
      return <BarcodeGen />;
    } else if (tableName === "Barcode Reader") {
      return <BarcodeRead />;
    } else if (tableName === "Stock Order") {
      return <StockOrder />;
    } else if (tableName === "Stocks Consumption") {
      return <StocksConsumption />;
    }
  };

  return (
    <div
      className="p-2 md:p-10 bg-white rounded-xl Main--Content flex items-center justify-center dark:bg-background-logoColor"
      onClick={closeSmallSidebar}
    >
      {renderPage()}
    </div>
  );
};

export default Stocks;
