import React from "react";
import { useNavContext } from "../contexts/NavContext";
import { useParams } from "react-router-dom";
// import { OrderNo, Quotation, Confirmation, Invoice } from "../components";
import OrderNo from "./DataEntry/Orders/OrderNo/View/OrderNo";
import Confirmation from "./DataEntry/Orders/OrderConfirmation/View/OrderConfirmation";
import Quotation from "./DataEntry/Orders/OrderQuotation/View/OrderQuotation";
import Invoice from "./DataEntry/Orders/OrderInvoice/View/OrderInvoice";

const Orders = () => {
  const { closeSmallSidebar } = useNavContext();
  const { tableName } = useParams();
  const renderPage = () => {
    if (tableName === "Order") {
      return <OrderNo />;
    } else if (tableName === "Quotation") {
      return <Quotation />;
    } else if (tableName === "Confirmation") {
      return <Confirmation />;
    } else if (tableName === "Invoice") {
      return <Invoice />;
    }
  };

  return <div onClick={closeSmallSidebar}>{renderPage()}</div>;
};

export default Orders;
