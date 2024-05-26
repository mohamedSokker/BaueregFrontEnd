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
  return dt.toISOString().slice(0, 19);
};

export const initialData = {
  Location: "",
  Equipment_Type: "",
  Equipment_Model: "",
  Equipment: "",
  Working_Hours: "",
  Breakdown_Type: "",
  "Periodic Maintenance Interval": "",
  Problem: "",
  Action: "",
  Problem_start_From: getDate(new Date()),
  Problem_End_To: getDate(new Date()),
  Site_QC_Min: "",
  Store: "",
  Spare_part: "",
};

export const regix = {
  Working_Hours: /^[0-9]*$/,
  //   Problem: /^[a-zA-Z0-9\s"{}[\]:]*$/,
  Problem: /^[a-zA-Z0-9 :,"{}[\]]*$/,
  Action: /^[a-zA-Z0-9 :,"{}[\]]*$/,
  Spare_part:
    /^(\d{1,}(-\d{1,})? \(\d{1,}\) [a-zA-Z0-9\s]{1,})(, (\d{1,}(-\d{1,})? \(\d{1,}\) [a-zA-Z0-9\s]{1,}))*$/,
  Site_QC_Min: /^[0-9]*$/,
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
  eqsModel: [],
  eqsType: [],
  eqs: [],
  store: [],
  "Periodic Maintenance Interval": [],
  Breakdown_Type: [],
};

export const validationException = [
  "Store",
  "Periodic Maintenance Interval",
  "Spare_part",
];

export const responseData = {
  sitesData: null,
};

export const allAddData = {
  sites: null,
  eqsModel: null,
  eqsType: null,
  eqs: null,
  store: null,
  bdType: null,
  perMaintPlan: null,
};

export const fieldsAddData = {
  Location: "",
  Equipment_Type: "",
  Equipment_Model: "",
  Equipment: "",
  Working_Hours: "",
  Breakdown_Type: "",
  "Periodic Maintenance Interval": "",
  Problem: "",
  Action: "",
  Problem_start_From: getDate(new Date()),
  Problem_End_To: getDate(new Date()),
  Site_QC_Min: "",
  Store: "",
  Spare_part: "",
};

export const isMount = {
  Location: false,
  Equipment_Type: false,
  Equipment_Model: false,
};

export const fieldsEditData = {
  Location: null,
  Equipment_Type: null,
  Equipment_Model: null,
  Equipment: null,
  Working_Hours: null,
  Breakdown_Type: null,
  "Periodic Maintenance Interval": null,
  Problem: null,
  Action: null,
  Problem_start_From: null,
  Problem_End_To: null,
  Site_QC_Min: null,
  Store: null,
  Spare_part: null,
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
