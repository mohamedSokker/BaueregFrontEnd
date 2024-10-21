import React, { useEffect, useState } from "react";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const useDropdown = ({
  name,
  label,
  localData,
  data,
  setData,
  condition,
  setErrorData,
  setLoading,
  setMessage,
  setTableColumns,
  setCurrentColumns,
}) => {
  const [datas, setDatas] = useState([]);
  const [datasLoading, setDatasLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const handleClick = async () => {
    try {
      if (!condition) throw new Error(`Can't choose ${label} right away`);
      setDatasLoading(true);
      setDatas(localData);

      setDatasLoading(false);
    } catch (err) {
      setErrorData((prev) => [
        ...prev,
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message,
      ]);
    } finally {
      setDatasLoading(false);
    }
  };

  const handleChange = async (e) => {
    try {
      const tableName = e.target.value;
      console.log(label);
      if (label === "Table") {
        setLoading(true);
        setMessage(`Loading Table Columns...`);
        const URLs = [
          `/api/v3/getTableData?table=${e.target.value}`,
          `/api/v3/${e.target.value}Schema`,
        ];

        const responseData = await Promise.all(
          URLs.map((url) => {
            return axiosPrivate(url, { method: "GET" });
          })
        );

        let fieldsResult = {};
        Object.keys(responseData[1].data)?.map((item) => {
          if (item !== "ID") fieldsResult = { ...fieldsResult, [item]: {} };
        });

        setTableColumns(responseData[0].data);
        setData((prev) => ({
          ...prev,
          Name: e.target.value,
          Schemas: data?.Exist
            ? responseData[1].data
            : {
                ID: { databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY" },
              },
          Fields: fieldsResult,
        }));
        setLoading(false);
      } else if (label === "Type") {
        if (tableName === "DropDown" || tableName === "Text") {
          setData((prev) => ({
            ...prev,
            Fields: {
              ...prev?.Fields,
              [name]: {
                ...prev?.Fields?.[name],
                [label]: e.target.value,
                validateString: "nvarChar255",
                Column: "",
                Condition: [],
                onDropMakesEmpty: [],
                Length: "",
              },
            },
            Schemas: data?.Exist
              ? data?.Schemas
              : {
                  ...prev?.Schemas,
                  [name]: {
                    ...prev?.Schemas?.[name],
                    databaseType: "NVARCHAR(255)",
                  },
                },
          }));
        } else if (tableName === "Date") {
          setData((prev) => ({
            ...prev,
            Fields: {
              ...prev?.Fields,
              [name]: {
                ...prev?.Fields?.[name],
                [label]: e.target.value,
                validateString: "date",
                Length: "",
              },
            },
            Schemas: data?.Exist
              ? data?.Schemas
              : {
                  ...prev?.Schemas,
                  [name]: {
                    ...prev?.Schemas?.[name],
                    databaseType: "DATE",
                  },
                },
          }));
        } else if (tableName === "Int") {
          setData((prev) => ({
            ...prev,
            Fields: {
              ...prev?.Fields,
              [name]: {
                ...prev?.Fields?.[name],
                [label]: e.target.value,
                validateString: "int",
                Length: "",
              },
            },
            Schemas: data?.Exist
              ? data?.Schemas
              : {
                  ...prev?.Schemas,
                  [name]: {
                    ...prev?.Schemas?.[name],
                    databaseType: "INT",
                  },
                },
          }));
        } else if (tableName === "DateTime") {
          setData((prev) => ({
            ...prev,
            Fields: {
              ...prev?.Fields,
              [name]: {
                ...prev?.Fields?.[name],
                [label]: e.target.value,
                validateString: "dateTime",
                Length: "",
              },
            },
            Schemas: data?.Exist
              ? data?.Schemas
              : {
                  ...prev?.Schemas,
                  [name]: {
                    ...prev?.Schemas?.[name],
                    databaseType: "DATETIME",
                  },
                },
          }));
        } else {
          setData((prev) => ({
            ...prev,
            Fields: {
              ...prev?.Fields,
              [name]: {
                ...prev?.Fields?.[name],
                [label]: e.target.value,
                validateString: "decimal(8,1)",
                Length: "",
              },
            },
            Schemas: data?.Exist
              ? data?.Schemas
              : {
                  ...prev?.Schemas,
                  [name]: {
                    ...prev?.Schemas?.[name],
                    databaseType: "DECIMAL(8,1)",
                  },
                },
          }));
        }
      } else if (label === "Length") {
        if (
          data?.Fields?.[name]?.Type === "DropDown" ||
          data?.Fields?.[name]?.Type === "Text"
        ) {
          if (e.target.value === "> 255") {
            setData((prev) => ({
              ...prev,
              Fields: {
                ...prev?.Fields,
                [name]: {
                  ...prev?.Fields?.[name],
                  Length: "> 255",
                  validateString: "text",
                },
              },
              Schemas: data?.Exist
                ? data?.Schemas
                : {
                    ...prev?.Schemas,
                    [name]: {
                      ...prev?.Schemas?.[name],
                      databaseType: "TEXT",
                    },
                  },
            }));
          } else {
            setData((prev) => ({
              ...prev,
              Fields: {
                ...prev?.Fields,
                [name]: {
                  ...prev?.Fields?.[name],
                  Length: "< 255",
                  validateString: "nvarChar255",
                },
              },
              Schemas: data?.Exist
                ? data?.Schemas
                : {
                    ...prev?.Schemas,
                    [name]: {
                      ...prev?.Schemas?.[name],
                      databaseType: "NVARCHAR(255)",
                    },
                  },
            }));
          }
        } else if (data?.Fields?.[name]?.Type === "Decimal") {
          if (e.target.value === "(8,2)") {
            setData((prev) => ({
              ...prev,
              Fields: {
                ...prev?.Fields,
                [name]: {
                  ...prev?.Fields?.[name],
                  Length: "(8,2)",
                  validateString: "decimal(8,2)",
                },
              },
              Schemas: data?.Exist
                ? data?.Schemas
                : {
                    ...prev?.Schemas,
                    [name]: {
                      ...prev?.Schemas?.[name],
                      databaseType: "DECIMAL(8,2)",
                    },
                  },
            }));
          } else {
            setData((prev) => ({
              ...prev,
              Fields: {
                ...prev?.Fields,
                [name]: {
                  ...prev?.Fields?.[name],
                  Length: "(8,1)",
                  validateString: "decimal(8,1)",
                },
              },
              Schemas: data?.Exist
                ? data?.Schemas
                : {
                    ...prev?.Schemas,
                    [name]: {
                      ...prev?.Schemas?.[name],
                      databaseType: "DECIMAL(8,1)",
                    },
                  },
            }));
          }
        } else {
          setData((prev) => ({
            ...prev,
            Fields: {
              ...prev?.Fields,
              [name]: {
                ...prev?.Fields?.[name],
                Length: e.target.value,
              },
            },
          }));
        }
      } else if (label === "From") {
        setLoading(true);
        setMessage(`Loading Table Columns...`);

        const URLs = [`/api/v3/getTableData?table=${tableName}`];

        const responseData = await Promise.all(
          URLs.map((url) => {
            return axiosPrivate(url, { method: "GET" });
          })
        );
        setCurrentColumns((prev) => ({
          ...prev,
          [name]: responseData[0]?.data,
        }));
        setData((prev) => ({
          ...prev,
          Fields: {
            ...prev?.Fields,
            [name]: {
              ...prev?.Fields?.[name],
              [label]: e.target.value,
              URL: `/api/v3/${e.target.value}`,
            },
          },
        }));
        setLoading(false);
      } else if (label === "onDropMakesEmpty" || label === "Condition") {
        console.log(e.target.selected);
        if (e.target.selected === true) {
          setData((prev) => ({
            ...prev,
            Fields: prev?.Fields?.[name]?.[label]
              ? {
                  ...prev?.Fields,
                  [name]: {
                    ...prev?.Fields?.[name],
                    [label]: prev?.Fields?.[name]?.[label].includes(tableName)
                      ? [...prev?.Fields?.[name]?.[label]]
                      : [...prev?.Fields?.[name]?.[label], tableName],
                  },
                }
              : {
                  ...prev?.Fields,
                  [name]: {
                    ...prev?.Fields?.[name],
                    [label]: [tableName],
                  },
                },
          }));
        } else if (e.target.selected === false) {
          const array = [...data?.Fields?.[name]?.[label]];
          const result = array.filter((item) => item !== e.target.value);
          setData((prev) => ({
            ...prev,
            Fields: {
              ...prev?.Fields,
              [name]: {
                ...prev?.Fields?.[name],
                [label]: result,
              },
            },
          }));
        }
      } else if (label === "Users") {
        console.log(e.target.selected);
        console.log(data);
        if (e.target.selected === false) {
          setData((prev) => ({
            ...prev,
            Users: prev?.Users
              ? prev?.Users?.includes(tableName)
                ? [...prev?.Users]
                : [...prev?.Users, tableName]
              : [e.target.value],
          }));
        } else if (e.target.selected === true) {
          const array = [...data?.Users];
          const result = array.filter((item) => item !== e.target.value);
          setData((prev) => ({
            ...prev,
            Users: result,
          }));
        }
      } else {
        setData((prev) => ({
          ...prev,
          Fields: {
            ...prev?.Fields,
            [name]: { ...prev?.Fields?.[name], [label]: e.target.value },
          },
        }));
      }
    } catch (err) {
      setErrorData((prev) => [
        ...prev,
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message,
      ]);
      setLoading(false);
    }
  };

  return { datas, datasLoading, handleChange, handleClick };
};

export default useDropdown;
