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
  try {
    const url = `${process.env.REACT_APP_BASE_URL}/api/v1/Location_Bauer`;
    const data = await fetchDataOnly(url, "GET", token);
    allSites = [];
    allSitesWithName = [];
    for (let i = 0; i < data.length; i++) {
      allSites.push(data[i].Location);
      allSitesWithName.push({ name: data[i].Location });
    }
    // data.map((item) => {
    //   allSites.push(item.Location);
    //   allSitesWithName.push({ name: item.Location });
    // });

    const eqsURL = `${process.env.REACT_APP_BASE_URL}/api/v1/Bauer_Equipments`;
    const dataEq = await fetchDataOnly(eqsURL, "GET", token);
    allEqs = [];
    allEqsWithName = [];
    for (let j = 0; j < dataEq.length; j++) {
      allSites.push(dataEq[i].Location);
      allSitesWithName.push({ name: dataEq[i].Location });
    }
    // dataEq.map((item) => {
    //   allEqs.push(item.Equipment);
    //   allEqsWithName.push({ name: item.Equipment });
    // });
  } catch (error) {
    return [];
  }

  // try {
  //   const eqsURL = `${process.env.REACT_APP_BASE_URL}/api/v1/Bauer_Equipments`;
  //   const dataEq = await fetchDataOnly(eqsURL, "GET", token);
  //   allEqs = [];
  //   allEqsWithName = [];
  //   dataEq.map((item) => {
  //     allEqs.push(item.Equipment);
  //     allEqsWithName.push({ name: item.Equipment });
  //   });
  // } catch (error) {
  //   return [];
  // }
};

export const allData = async (token) => {
  await allSitesEqsdata(token);
  return {
    Dashboard: ["true"],
    Kanban: ["true"],
    Sites: allSites,
    Equipments: allEqs,
    Orders: ["Order", "Quotation", "Confirmation", "Invoice"],
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

export const allDataWithName = async () => {
  await allSitesEqsdata();
  await allTablesWithNames();
  await allStocksWithNames();
  return {
    Dashboard: true,
    Kanban: true,
    Sites: allSitesWithName,
    Equipments: allEqsWithName,
    Orders: [
      { name: "Order" },
      { name: "Quotation" },
      { name: "Confirmation" },
      { name: "Invoice" },
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
  };
};
