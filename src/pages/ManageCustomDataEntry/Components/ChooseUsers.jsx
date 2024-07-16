import Dropdown from "./Dropdown";

const ChooseUsers = ({
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
      <div className="w-full h-full flex flex-row gap-8 items-start">
        <div className="w-[30vw] flex flex-col justify-center items-center">
          <Dropdown
            multiple={true}
            setLoading={setLoading}
            setMessage={setMessage}
            label="Users"
            column="UserName"
            siteData={siteData}
            setAllData={setAllData}
            condition={true}
            local={true}
            localData={allData?.Users}
            data={data}
            setData={setData}
            errorData={errorData}
            setError={setError}
            setErrorData={setErrorData}
            tableColumns={tableColumns}
            setTableColumns={setTableColumns}
          />
        </div>
        <div
          className=" flex flex-col p-4 max-h-[200px] min-w-[250px] gap-4 border-red-300 border-1 items-start overflow-y-scroll"
          style={{ scrollbarWidth: "none" }}
        >
          <p className="text-blue-500 font-[700] text-[20]">Choosed Users</p>
          {data?.Users?.length === 0 ? (
            <div className="text-red-700 text-[12px]">No Users Choosed</div>
          ) : (
            data?.Users?.map((item, i) => (
              <div
                className="w-full text-[12px] border-b-1 border-gray-300"
                key={i}
              >
                {item}
              </div>
            ))
          )}
        </div>
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

export default ChooseUsers;
