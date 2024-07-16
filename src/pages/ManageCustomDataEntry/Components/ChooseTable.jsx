import Dropdown from "./Dropdown";

const ChooseTable = ({
  setLoading,
  setMessage,
  siteData,
  setAllData,
  allData,
  data,
  setData,
  errorData,
  setError,
  setErrorData,
  tableColumns,
  setTableColumns,
  setCategoryCount,
  categoryCount,
}) => {
  return (
    <div
      className="w-full h-full flex flex-col justify-between flex-shrink-0 flex-grow-0"
      style={{
        translate: `${-100 * categoryCount}%`,
        transition: `all 0.5s ease-in-out`,
      }}
    >
      <div className="w-[30vw] p-2 flex flex-col justify-center items-center">
        <Dropdown
          setLoading={setLoading}
          setMessage={setMessage}
          label="Table"
          column="TABLE_NAME"
          siteData={siteData}
          setAllData={setAllData}
          condition={true}
          local={true}
          localData={allData?.Table}
          data={data}
          setData={setData}
          errorData={errorData}
          setError={setError}
          setErrorData={setErrorData}
          tableColumns={tableColumns}
          setTableColumns={setTableColumns}
        />
      </div>
      <div className="w-full p-2">
        <button
          className="w-full p-2 bg-green-600 text-white rounded-[4px]"
          onClick={() => {
            setCategoryCount((prev) => prev + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ChooseTable;
