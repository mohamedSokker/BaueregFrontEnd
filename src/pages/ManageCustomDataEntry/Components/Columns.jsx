import { useState } from "react";

import Dropdown from "./Dropdown";
import { jsonifyArray } from "../Model/model";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Columns = ({
  setLoading,
  setMessage,
  tableColumns,
  categoryCount,
  data,
  setData,
  errorData,
  setError,
  setErrorData,
  allData,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const [currentColumns, setCurrentColumns] = useState({});
  const [canBeEmpty, setCanBeEmpty] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isException, setIsException] = useState(false);

  const handleFinish = async () => {
    try {
      setLoading(true);
      console.log(data);
      const addURL = `/api/v3/ManageDataEntry`;
      setMessage(`Adding Data...`);
      await axiosPrivate(addURL, {
        method: "POST",
        data: JSON.stringify({
          Name: data?.Name,
          Users: JSON.stringify(data?.Users),
          Schemas: JSON.stringify(data?.Schemas),
          Fields: JSON.stringify(data?.Fields),
          Exist: data?.Exist,
        }),
      });
      setMessage(`Creating Folders...`);
      const foldersURL = `/api/v3/CustomDataEntryCreateFolders`;
      await axiosPrivate(foldersURL, {
        method: "POST",
        data: JSON.stringify({ Name: data?.Name }),
      });
      setMessage(`Initializing Excel`);
      const initExcelURL = `/api/v3/CustomDataEntryInitExcel`;
      await axiosPrivate(initExcelURL, {
        method: "POST",
        data: JSON.stringify({
          Name: data?.Name,
          Fields: data?.Fields,
        }),
      });
      setLoading(false);
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
  console.log(tableColumns);
  return (
    <div
      className="w-full h-full flex flex-col justify-between items-center flex-shrink-0 flex-grow-0"
      style={{
        translate: `${-100 * categoryCount}%`,
        transition: `all 0.5s ease-in-out`,
      }}
    >
      <div className="w-full h-full flex flex-col gap-4 overflow-auto">
        {tableColumns.map(
          (item, i) =>
            item.name !== "ID" && (
              <div key={i} className="flex flex-row gap-4">
                <p className="flex items-center min-w-[150px]">{item?.name}</p>
                <div className="min-w-[20vw] p-2 flex flex-col justify-center items-center">
                  <Dropdown
                    name={item?.name}
                    label="Type"
                    column="Type"
                    condition={true}
                    local={true}
                    localData={[
                      { Type: "DropDown" },
                      { Type: "Int" },
                      { Type: "Decimal" },
                      { Type: "Text" },
                      { Type: "Date" },
                      { Type: "DateTime" },
                    ]}
                    data={data}
                    setData={setData}
                    errorData={errorData}
                    setError={setError}
                    setErrorData={setErrorData}
                  />
                </div>
                <div className="min-w-[20vw] p-2 flex flex-col justify-center items-center">
                  <Dropdown
                    name={item?.name}
                    label="Length"
                    column="Length"
                    condition={true}
                    local={true}
                    localData={
                      data?.Fields?.[item.name]?.Type === "DropDown" ||
                      data?.Fields?.[item.name]?.Type === "Text"
                        ? [{ Length: "< 255" }, { Length: "> 255" }]
                        : data?.Fields?.[item.name]?.Type === "Int"
                        ? [{ Length: "4 Bytes" }]
                        : data?.Fields?.[item.name]?.Type === "Date"
                        ? [{ Length: "8 Bytes" }]
                        : data?.Fields?.[item.name]?.Type === "DateTime"
                        ? [{ Length: "7" }]
                        : [{ Length: "(8,1)" }, { Length: "(8,2)" }]
                    }
                    data={data}
                    setData={setData}
                    errorData={errorData}
                    setError={setError}
                    setErrorData={setErrorData}
                  />
                </div>
                {data?.Fields?.[item?.name]?.Type === "DropDown" && (
                  <>
                    <div className="min-w-[20vw] p-2 flex flex-col justify-center items-center">
                      <Dropdown
                        setLoading={setLoading}
                        setMessage={setMessage}
                        name={item?.name}
                        label="From"
                        column="TABLE_NAME"
                        condition={true}
                        local={true}
                        localData={allData?.Table}
                        data={data}
                        setData={setData}
                        errorData={errorData}
                        setError={setError}
                        setErrorData={setErrorData}
                        setCurrentColumns={setCurrentColumns}
                      />
                    </div>
                    <div className="min-w-[20vw] p-2 flex flex-col justify-center items-center">
                      <Dropdown
                        name={item?.name}
                        label="Column"
                        column="name"
                        condition={true}
                        local={true}
                        localData={currentColumns[item?.name]}
                        data={data}
                        setData={setData}
                        errorData={errorData}
                        setError={setError}
                        setErrorData={setErrorData}
                        setCurrentColumns={setCurrentColumns}
                      />
                    </div>
                    <div className="min-w-[20vw] p-2 flex flex-col justify-center items-center">
                      <Dropdown
                        name={item?.name}
                        label="Condition"
                        column="name"
                        condition={true}
                        local={true}
                        localData={jsonifyArray(
                          Object.keys(data?.Schemas),
                          "name"
                        )}
                        data={data}
                        setData={setData}
                        errorData={errorData}
                        setError={setError}
                        setErrorData={setErrorData}
                        setCurrentColumns={setCurrentColumns}
                      />
                    </div>
                    <div className="min-w-[20vw] p-2 flex flex-col justify-center items-center">
                      <Dropdown
                        multiple={true}
                        name={item?.name}
                        label="onDropMakesEmpty"
                        column="name"
                        condition={true}
                        local={true}
                        localData={jsonifyArray(
                          Object.keys(data?.Schemas),
                          "name"
                        )}
                        data={data}
                        setData={setData}
                        errorData={errorData}
                        setError={setError}
                        setErrorData={setErrorData}
                        setCurrentColumns={setCurrentColumns}
                      />
                    </div>
                  </>
                )}

                {data?.Fields?.[item?.name]?.Type &&
                  data?.Fields?.[item?.name]?.Type !== "" &&
                  data?.Fields?.[item?.name]?.Type !== "DropDown" && (
                    <>
                      <div className="min-w-[12vw] p-2 flex flex-row gap-4 justify-start items-center text-[14px] text-gray-400">
                        <input
                          type="checkbox"
                          checked={data?.Fields?.[item?.name]?.canBeEmpty}
                          onChange={() => {
                            setCanBeEmpty((prev) => !prev);
                            setData((prev) => ({
                              ...prev,
                              Fields: {
                                ...prev?.Fields,
                                [item?.name]: {
                                  ...prev?.Fields?.[item?.name],
                                  canBeEmpty: !canBeEmpty,
                                },
                              },
                            }));
                          }}
                        />
                        <p className="w-full">Can be Empty</p>
                      </div>

                      <div className="min-w-[12vw] p-2 flex flex-row gap-4 justify-start items-center text-[14px] text-gray-400">
                        <input
                          type="checkbox"
                          checked={data?.Fields?.[item?.name]?.isCheck}
                          onChange={() => {
                            setIsCheck((prev) => !prev);
                            setData((prev) => ({
                              ...prev,
                              Fields: {
                                ...prev?.Fields,
                                [item?.name]: {
                                  ...prev?.Fields?.[item?.name],
                                  isCheck: !isCheck,
                                },
                              },
                            }));
                          }}
                        />
                        <p>Has Check Box</p>
                      </div>

                      <div className="min-w-[12vw] p-2 flex flex-row gap-4 justify-start items-center text-[14px] text-gray-400">
                        <input
                          type="checkbox"
                          checked={data?.Fields?.[item?.name]?.isException}
                          onChange={() => {
                            setIsException((prev) => !prev);
                            setData((prev) => ({
                              ...prev,
                              Fields: {
                                ...prev?.Fields,
                                [item?.name]: {
                                  ...prev?.Fields?.[item?.name],
                                  isException: !isException,
                                },
                              },
                            }));
                          }}
                        />
                        <p>Validation Exception</p>
                      </div>
                    </>
                  )}
              </div>
            )
        )}
      </div>

      <div className="w-full p-2">
        <button
          className="w-full p-2 bg-green-600 text-white rounded-[4px]"
          onClick={handleFinish}
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default Columns;
