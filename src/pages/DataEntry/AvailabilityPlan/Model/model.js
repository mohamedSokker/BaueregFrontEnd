import { AllStocks } from "../../../../data/Tablesdata";

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
  Location: "",
  Date: new Date().toISOString().slice(0, 10),
  DateFrom: new Date().toISOString().slice(0, 10),
  DateTo: new Date().toISOString().slice(0, 10),
  Friday: "",
  Saturday: "",
  Sunday: "",
  Monday: "",
  Tuesday: "",
  Wednesday: "",
  Thursday: "",
};

export const regix = {
  Friday: /^[0-9]*$/,
  Saturday: /^[0-9]*$/,
  Sunday: /^[0-9]*$/,
  Monday: /^[0-9]*$/,
  Tuesday: /^[0-9]*$/,
  Wednesday: /^[0-9]*$/,
  Thursday: /^[0-9]*$/,
};

export const initialAllData = {
  sites: [],
};

export const responseData = {
  sitesData: null,
};

export const allAddData = {
  sites: null,
  eqsModel: null,
  eqsType: null,
  eqs: null,
};
