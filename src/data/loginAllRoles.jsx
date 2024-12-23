import { Cookies } from "react-cookie";
import { FiUserPlus, FiUserMinus, FiUserCheck } from "react-icons/fi";

import { AllTables } from "./AllTables";
import { AllStocks } from "./Tablesdata";
import fetchDataOnly from "../Functions/fetchDataOnly";

let allEqs = [];
let allSites = [];
let allTablesWithName = [];
let allStocksWithName = [];
let allEqsWithName = [];
let allSitesWithName = [];

export const allSitesEqsdata = async (token) => {
  //   const cookies = new Cookies();
  //   const token = cookies?.get("token");
  try {
    const url = `${process.env.REACT_APP_BASE_URL}/api/v1/Location_Bauer`;
    const data = await fetchDataOnly(url, "GET", token);
    allSites = [];
    allSitesWithName = [];
    data.map((item) => {
      allSites.push(item.Location);
      allSitesWithName.push({ name: item.Location });
    });
  } catch (error) {
    return [];
  }
  try {
    const eqsURL = `${process.env.REACT_APP_BASE_URL}/api/v1/Bauer_Equipments`;
    const dataEq = await fetchDataOnly(eqsURL, "GET", token);
    allEqs = [];
    allEqsWithName = [];
    dataEq.map((item) => {
      allEqs.push(item.Equipment);
      allEqsWithName.push({ name: item.Equipment });
    });
  } catch (error) {
    return [];
  }
};

export const allData = async () => {
  await allSitesEqsdata();
  return {
    Dashboard: ["true"],
    Kanban: ["true"],
    Transportations: ["true"],
    Sites: allSites,
    Equipments: allEqs,
    Orders: [
      "Order",
      "Quotation",
      "Confirmation",
      "Invoice",
      "Order_IncompleteItems",
      "Order_Status",
      "OrderInvoice_NotFound",
    ],
    Stocks: [
      "Barcode Generation",
      "Barcode Reader",
      "Stock Order",
      "Stocks Consumption",
    ],
    StocksList: AllStocks,
    Tables: AllTables,
    Catalogues: [],
    OilSamples: ["true"],
    OilSamplesAnalyzed: ["true"],
    ManageUsers: ["true"],
    ManageAppUsers: ["true"],
    CustomDataEntry: ["true"],
    ManageDataEntry: ["true"],
    ManageDatabase: ["true"],
    ManageMiniPowerBi: ["true"],
    MiniPowerBi: ["true"],
  };
};

const allTablesWithNames = async () => {
  allTablesWithName = [];
  AllTables.map((table) => {
    allTablesWithName.push({ name: table });
  });
};

const allStocksWithNames = async () => {
  allStocksWithName = [];
  AllStocks.map((stock) => {
    allStocksWithName.push({ name: stock });
  });
};

export const allDataWithName = async (token) => {
  await allSitesEqsdata(token);
  await allTablesWithNames();
  await allStocksWithNames();
  return {
    Dashboard: true,
    Kanban: true,
    Transportations: true,
    Sites: allSitesWithName,
    Equipments: allEqsWithName,
    Orders: [
      { name: "Order" },
      { name: "Quotation" },
      { name: "Confirmation" },
      { name: "Invoice" },
      { name: "Order_IncompleteItems" },
      { name: "Order_Status" },
      { name: "OrderInvoice_NotFound" },
    ],
    Stocks: [
      { name: "Barcode Generation" },
      { name: "Barcode Reader" },
      { name: "Stock Order" },
      { name: "Stocks Consumption" },
    ],
    StocksList: allStocksWithName,
    Tables: allTablesWithName,
    Catalogues: [],
    OilSamples: true,
    OilSamplesAnalyzed: true,
    ManageUsers: [
      { name: "Add User", icon: <FiUserPlus />, dest: "AddUser" },
      { name: "Edit User", icon: <FiUserCheck />, dest: "EditUser" },
      { name: "Delete User", icon: <FiUserMinus />, dest: "DeleteUser" },
    ],
    ManageAppUsers: [
      { name: "Add User", icon: <FiUserPlus />, dest: "AddAppUser" },
      { name: "Edit User", icon: <FiUserCheck />, dest: "EditAppUser" },
      { name: "Delete User", icon: <FiUserMinus />, dest: "DeleteAppUser" },
    ],
    CustomDataEntry: true,
    ManageDataEntry: true,
    ManageDatabase: true,
    ManageMiniPowerBi: true,
    MiniPowerBi: true,
  };
};
