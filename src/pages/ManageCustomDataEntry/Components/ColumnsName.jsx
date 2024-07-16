import React, { useState } from "react";

const InputName = ({ tableColumns, setTableColumns }) => {
  const [inputData, setInputData] = useState("");
  const [confimed, setConfirmed] = useState(false);
  console.log(tableColumns);
  return (
    <div className="w-full p-2 flex flex-row gap-4 items-center">
      <input
        placeholder="Column Name"
        className="p-2 w-full bg-gray-100 border-b-1 border-logoColor appearance-none text-[14px] focus:border-[rgb(248,113,113)] outline-none"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <button
        className="p-2 min-w-[15vw]  text-white rounded-md"
        style={{
          backgroundColor: !confimed ? "rgb(220,38,38)" : "rgb(22,163,74)",
        }}
        onClick={() => {
          if (!confimed) {
            setTableColumns((prev) => [...prev, { name: inputData }]);
            setConfirmed(true);
          }
        }}
      >
        {!confimed ? `Confirm` : `Confirmed`}
      </button>
    </div>
  );
};

const ColumnsName = ({
  categoryCount,
  tableColumns,
  setTableColumns,
  setCategoryCount,
  setData,
}) => {
  const [countArr, setCountArr] = useState([]);
  return (
    <div
      className="w-full h-full flex flex-col justify-between items-center flex-shrink-0 flex-grow-0 overflow-auto"
      style={{
        translate: `${-100 * categoryCount}%`,
        transition: `all 0.5s ease-in-out`,
      }}
    >
      <div className="w-full flex flex-row justify-end p-2">
        <button
          className="p-2 min-w-[15vw] bg-green-600 text-white rounded-md"
          onClick={() =>
            setCountArr((prev) => [...prev, { name: categoryCount }])
          }
        >
          Add Column
        </button>
      </div>
      <InputName
        tableColumns={tableColumns}
        setTableColumns={setTableColumns}
      />
      {countArr?.map((item, i) => (
        <InputName
          tableColumns={tableColumns}
          setTableColumns={setTableColumns}
        />
      ))}
      <div className="w-full p-2">
        <button
          className="w-full p-2 bg-green-600 text-white rounded-[4px]"
          onClick={() => {
            let fieldsResult = {};
            tableColumns?.map((item) => {
              console.log(item);
              fieldsResult = { ...fieldsResult, [item?.name]: {} };
            });

            setData((prev) => ({
              ...prev,
              Schemas: {
                ID: {
                  databaseType: "INT NOT NULL IDENTITY(1,1) PRIMARY KEY",
                },
              },
              Fields: fieldsResult,
            }));
            setCategoryCount((prev) => prev + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ColumnsName;
