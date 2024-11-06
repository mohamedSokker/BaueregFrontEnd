export const regix = {
  int: /^[0-9]*$/,
  intEmpty: /^$|^[0-9]*$/,
  date: /^(?:\d{4}-\d{2}-\d{2})$/,
  dateEmty: /^$|^(?:\d{4}-\d{2}-\d{2})$/,
  dateTime:
    /^(?:\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(.\d{3})?|(?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z))$/,
  dateTimeOrNull:
    /^(?:\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(.\d{3})?|(?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z))$/,
  nvarChar255: /^[0-9a-zA-Z\#\"\s\/\-\_\.\,]{0,255}$/,
  nvarchar255Empty: /^$|^.{0,255}$/,
  decimal81: /^\d{1,7}(\.\d{1})?$/,
  "decimal(8,1)": /^\d{1,7}(\.\d{1,})?$/,
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

export const getDate = (date) => {
  const dt = new Date(date);
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  return dt.toISOString().slice(0, 16);
};

export const DBdata = [
  {
    ID: 1,
    Name: "Kelly_Location",
    Users: ["Eng Bahaa"],
    Schemas: {
      ID: { databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY" },
      "Location ": { databaseType: "NVARCHAR(255)" },
      "Equipment Type": { databaseType: "NVARCHAR(255)" },
      Start_Date: { databaseType: "DATE" },
      End_Date: { databaseType: "DATE NULL" },
      Type: { databaseType: "TEXT" },
      Status: { databaseType: "TEXT" },
      Code: { databaseType: "TEXT" },
    },
    Fields: {
      "Location ": {
        Type: "DropDown",
        From: "Equipments_Location",
        URL: "/api/v3/Equipments_Location",
        Column: "Location",
        validate: regix.nvarChar255,
        validateString: "nvarChar255",
        onDropMakesEmpty: ["Equipment Type"],
      },
      "Equipment Type": {
        Type: "DropDown",
        From: "Equipments_Location",
        URL: "/api/v3/Equipments_Location",
        Column: "Equipment_Type",
        validate: regix.nvarChar255,
        validateString: "nvarChar255",
        Condition: ["Location"],
        onDropMakesEmpty: [],
      },
      Start_Date: {
        Type: "Date",
        validate: regix.date,
        validateString: "date",
      },
      End_Date: {
        Type: "Date",
        validate: regix.dateEmty,
        validateString: "dateEmty",
        canBeEmpty: true,
        isCheck: true,
      },
      Type: {
        Type: "Text",
        validate: regix.nvarChar255,
        validateString: "nvarChar255",
      },
      Status: {
        Type: "Text",
        validate: regix.nvarChar255,
        validateString: "nvarChar255",
      },
      Code: {
        Type: "Text",
        validate: regix.nvarChar255,
        validateString: "nvarChar255",
        validationException: true,
      },
    },
  },
];
