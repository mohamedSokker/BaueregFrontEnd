export const regix = {
  int: /^[0-9]*$/,
  intEmpty: /^$|^[0-9]*$/,
  date: /^(?:\d{4}-\d{2}-\d{2})$/,
  dateEmty: /^$|^(?:\d{4}-\d{2}-\d{2})$/,
  dateTime:
    /^(?:\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(.\d{3})?|(?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z))$/,
  dateTimeOrNull:
    /^(?:\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(.\d{3})?|(?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z))$/,
  nvarChar255: /^[0-9a-zA-Z\#\s\/\-\_\.]{0,255}$/,
  nvarchar255Empty: /^$|^.{0,255}$/,
  decimal81: /^\d{1,7}(\.\d{1})?$/,
  decimal82: /^\d{1,7}(\.\d{2})?$/,
  text: /^[a-zA-Z0-9 :,"{}[\]]*$/,
};

export const jsonifyArray = (array, name) => {
  let arr = [];
  for (let i = 0; i < array?.length; i++) {
    arr.push({ [name]: array[i] });
  }
  return arr;
};

const regixModel = {
  TEXT: "text",
  INT: "int",
  DATE: "date",
  DATETIME: "dateTime",
  "DECIMAL(8,1)": "decimal81",
  "DECIMAL(8,2)": "decimal82",
  "NVARCHAR(255)": "nvarChar255",
};
