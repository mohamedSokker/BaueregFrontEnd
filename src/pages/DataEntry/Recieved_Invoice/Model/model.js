import { AllStocks } from "../../../../data/Tablesdata";

export const equipmentTypes = [
  { Equipment_Type: "Trench_Cutting_Machine" },
  { Equipment_Type: "Drilling_Machine" },
  { Equipment_Type: "Heavy_Cranes" },
  { Equipment_Type: "Cranes_25_Ton" },
  { Equipment_Type: "Forklift" },
  { Equipment_Type: "Micro_Piling_Machine" },
  { Equipment_Type: "Excavator" },
  { Equipment_Type: "Grouting_Container_13" },
];

export const perMaintPlan = [
  { plan: "250" },
  { plan: "1000" },
  { plan: "2000" },
];

export const stocksList = () => {
  let stocks = [];
  for (let i = 0; i < AllStocks.length; i++) {
    stocks.push({ stock: AllStocks[i] });
  }
  return stocks;
};

export const jsonifyArray = (array, name) => {
  let arr = [];
  for (let i = 0; i < array?.length; i++) {
    arr.push({ [name]: array[i] });
  }
  return arr;
};

export const getDate = (date) => {
  const dt = new Date(date);
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  return dt.toISOString().slice(0, 16);
};

export const initialData = {
  Invoices: "",
  Received_Date: new Date().toISOString().slice(0, 10),
};

export const regix = {
  Working_Hours: /^[0-9]*$/,
};

export const initialPerMaintData = {};
export const initialSaved = {
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
export const initialAllData = {
  sites: [],
};

export const validationException = [];

export const responseData = {
  sitesData: null,
};

export const allAddData = {
  sites: null,
  eqsModel: null,
  eqsType: null,
  eqs: null,
};

export const fieldsAddData = {
  Location: "",
  Equipment_Type: "",
  Equipment: "",
  UnderCarrage_Type: "",
  Working_Hours: "",
  Start_Date: new Date().toISOString().slice(0, 10),
  End_Date: new Date().toISOString().slice(0, 10),
};

export const isMount = {
  Location: false,
  Equipment_Type: false,
};

export const fieldsEditData = {
  Location: null,
  Equipment_Type: null,
  Equipment: null,
  UnderCarrage_Type: null,
  Working_Hours: null,
  Start_Date: null,
  End_Date: null,
};

// export const dropDownListData = {
//   Location: {
//     label: "Location",
//     // URL="/api/v1/Location_Bauer"
//     column: "Location",
//     condition: true,
//     local: true,
//     localData: allData?.sites,
//     getChildData: getChildData,
//     errorData: errorData,
//     setError: setError,
//     setErrorData: setErrorData,
//   },
//   Equipment_Type: "",
//   Equipment_Model: "",
//   Equipment: "",
//   Working_Hours: "",
//   Breakdown_Type: "",
//   "Periodic Maintenance Interval": "",
//   Problem: "",
//   Action: "",
//   Problem_start_From: getDate(new Date()),
//   Problem_End_To: getDate(new Date()),
//   Site_QC_Min: "",
//   Store: "",
//   Spare_part: "",
// };
