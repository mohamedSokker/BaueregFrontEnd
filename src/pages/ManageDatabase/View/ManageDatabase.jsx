import ManageCustomDataEntry from "../../../components/ManageCustomDataEntry/View/ManageCustomDataEntry";
import PageLoading from "../../../components/PageLoading";
import { useNavContext } from "../../../contexts/NavContext";
import ChoosePanel from "../Components/ChoosePanel";
import GetData from "../Components/GetData";
import GetSchema from "../Components/GetSchema";
import Header from "../Components/Header";
import QueryPanel from "../Components/QueryPanel";
import useManageDatabase from "../Controller/manageDatabase";

const ManageDatabase = () => {
  const { closeSmallSidebar, setErrorData } = useNavContext();

  const {
    DBdata,
    loading,
    setLoading,
    message,
    getTableData,
    tableData,
    setTableData,
    tableSchema,
    setTableSchema,
    isChoose,
    setIsChoose,
    category,
    setCategory,
    selectedTable,
    setSelectedTable,
    query,
    setQuery,
  } = useManageDatabase();

  return (
    <div
      className={`w-full flex flex-col px-4 bg-gray-100 dark:bg-background-logoColor h-full relative text-[14px] overflow-hidden`}
      onClick={closeSmallSidebar}
    >
      {loading && <PageLoading message={message} />}
      {/* {(category === "Insert Query" ||
        category === "Update Query" ||
        category === "Delete Query" ||
        category === "Drop Table Query") && <Header />} */}

      <div className="w-full h-full flex flex-row">
        <div className="w-[250px] h-full flex flex-col border-r-[1px] border-gray-300">
          <p className="text-blue-500 font-[600] text-[16px]">Tables</p>
          <div
            className="w-full h-full flex flex-col m-auto overflow-y-scroll pb-8 pt-2 px-2"
            style={{ scrollbarWidth: "none" }}
          >
            {DBdata?.map((item, i) => (
              <div
                key={i}
                className="text-[12px] hover:cursor-pointer relative hover:bg-gray-200 p-2 rounded-md"
                style={{
                  backgroundColor: isChoose?.[item?.TABLE_NAME]
                    ? "rgb(229,231,235)"
                    : "",
                  // color: isChoose?.[item?.TABLE_NAME] ? "rgb(59,130,246)" : "",
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setIsChoose((prev) => ({
                    [item?.TABLE_NAME]: !prev?.[item?.TABLE_NAME],
                  }));
                }}
              >
                <p>{item?.TABLE_NAME}</p>
                {isChoose?.[item?.TABLE_NAME] && (
                  <ChoosePanel
                    item={item}
                    setIsChoose={setIsChoose}
                    setCategory={setCategory}
                    getTableData={getTableData}
                    setSelectedTable={setSelectedTable}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-[calc(100%-250px)] h-full p-2">
          {category === "Get Data" && (
            <GetData
              selectedTable={selectedTable}
              setErrorData={setErrorData}
              tableData={tableData}
              setTableData={setTableData}
            />
          )}

          {category === "Get Schema" && (
            <GetSchema
              selectedTable={selectedTable}
              setErrorData={setErrorData}
              tableSchema={tableSchema}
              setTableSchema={setTableSchema}
            />
          )}

          {category === "Get Data Entry" && (
            <ManageCustomDataEntry selectedTable={selectedTable} />
          )}

          {(category === "Insert Query" ||
            category === "Update Query" ||
            category === "Delete Query" ||
            category === "Drop Table Query" ||
            category === "Blank Query") && (
            <QueryPanel
              selectedTable={selectedTable}
              setErrorData={setErrorData}
              query={query}
              setQuery={setQuery}
              category={category}
              setCategory={setCategory}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageDatabase;
