import React, { useEffect, useState } from "react";
import { useNavContext } from "../contexts/NavContext";
import { useParams } from "react-router-dom";
import { OrderNo, Quotation, Confirmation, Invoice } from "../components";

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

  return (
    <div
      // className="p-2 md:p-10 bg-white rounded-xl Main--Content flex items-center justify-center dark:bg-background-logoColor"
      onClick={closeSmallSidebar}
    >
      {renderPage()}
    </div>
  );
};

export default Orders;
