import React from "react";
import { IoIosArrowBack } from "react-icons/io";

import { useNavContext } from "../../../contexts/NavContext";
import useDataEntry from "../Controllers/dataEntry";
import { regix } from "../Model/model";
import Dropdown from "../Components/Dropdown";
import PageLoading from "../../../components/PageLoading";
import Name from "../Components/Name";
import ExistingTable from "../Components/ExistingTable";
import ChooseTable from "../Components/ChooseTable";
import Columns from "../Components/Columns";
import NonExistingColumns from "../Components/NonExistingColumns";
import ColumnsName from "../Components/ColumnsName";
import ChooseUsers from "../Components/ChooseUsers";

const cat = ["Name", "ExistingTable", "ChooseTable", "Columns"];

const ManageCustomDataEntry = ({ selectedTable }) => {
  const { closeSmallSidebar, usersData } = useNavContext();

  console.log(selectedTable);

  const {
    loading,
    setLoading,
    setMessage,
    data,
    setData,
    allData,
    errorData,
    setError,
    setErrorData,
    setAllData,
    handleAdd,
    message,
    siteData,
    isExistingTable,
    setIsExistingTable,
    tableColumns,
    setTableColumns,
    categoryCount,
    setCategoryCount,
    found,
  } = useDataEntry({ selectedTable });

  console.log(data);
  //   console.log(isExistingTable);
  return (
    <div
      className={`w-full flex flex-col px-4 pb-8 gap-8 bg-gray-100 Main--Page dark:bg-background-logoColor h-full relative text-[14px]`}
      onClick={closeSmallSidebar}
    >
      {loading && <PageLoading message={message} />}
      <div className="w-full flex flex-row justify-start items-center gap-4 py-4 font-[600] text-[18px]">
        <div
          className="hover:cursor-pointer"
          onClick={() => {
            if (categoryCount > 0) setCategoryCount((prev) => prev - 1);
          }}
        >
          <IoIosArrowBack size={18} />
        </div>
        <p>Manage New Data Entry</p>
      </div>

      <div className="w-full h-full flex flex-row overflow-hidden">
        {!found && (
          <>
            {/* <ExistingTable
              setData={setData}
              isExistingTable={isExistingTable}
              setIsExistingTable={setIsExistingTable}
              setCategoryCount={setCategoryCount}
              setTableColumns={setTableColumns}
              categoryCount={categoryCount}
            /> */}

            <ChooseUsers
              setLoading={setLoading}
              setMessage={setMessage}
              siteData={siteData}
              setAllData={setAllData}
              allData={allData}
              data={data}
              setData={setData}
              errorData={errorData}
              setError={setError}
              setErrorData={setErrorData}
              tableColumns={tableColumns}
              setTableColumns={setTableColumns}
              setCategoryCount={setCategoryCount}
              categoryCount={categoryCount}
            />

            {!isExistingTable && (
              <Name
                data={data}
                setData={setData}
                setCategoryCount={setCategoryCount}
                categoryCount={categoryCount}
                allData={allData}
              />
            )}

            {!isExistingTable && (
              <ColumnsName
                categoryCount={categoryCount}
                tableColumns={tableColumns}
                setTableColumns={setTableColumns}
                setCategoryCount={setCategoryCount}
                setData={setData}
                found={found}
              />
            )}
          </>
        )}

        {!isExistingTable && (
          <NonExistingColumns
            setLoading={setLoading}
            setMessage={setMessage}
            tableColumns={tableColumns}
            categoryCount={categoryCount}
            data={data}
            setData={setData}
            errorData={errorData}
            setError={setError}
            setErrorData={setErrorData}
            allData={allData}
            found={found}
          />
        )}

        {!found && (
          <>
            {isExistingTable && (
              <ChooseTable
                setLoading={setLoading}
                setMessage={setMessage}
                siteData={siteData}
                setAllData={setAllData}
                allData={allData}
                data={data}
                setData={setData}
                errorData={errorData}
                setError={setError}
                setErrorData={setErrorData}
                tableColumns={tableColumns}
                setTableColumns={setTableColumns}
                setCategoryCount={setCategoryCount}
                categoryCount={categoryCount}
                selectedTable={selectedTable}
              />
            )}

            {isExistingTable && (
              <Columns
                setLoading={setLoading}
                setMessage={setMessage}
                tableColumns={tableColumns}
                categoryCount={categoryCount}
                data={data}
                setData={setData}
                errorData={errorData}
                setError={setError}
                setErrorData={setErrorData}
                allData={allData}
                found={found}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ManageCustomDataEntry;
