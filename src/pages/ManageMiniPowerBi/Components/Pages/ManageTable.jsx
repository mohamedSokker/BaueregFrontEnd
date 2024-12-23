import React, { useState } from "react";

import ToolsSIdebar from "../Sidebars/ToolsSIdebar";
import TableAbstract from "../TableAbstract";
import ManageTablesLists from "../Sidebars/ManageTablesLists";
import ManageTablesTaskbar from "../Sidebars/ManageTablesTaskbar";

const ManageTables = ({
  categoryCount,
  setCategoryCount,
  tableData,
  selectedTable,
  setSelectedTable,
  setTablesData,
  selectedTableData,
  setSelectedTableData,
  activeItem,
  setActiveItem,
  AddedCols,
  setAddedCols,
  activeColItem,
  setActiveColItem,
  AddedTables,
  setAddedTables,
  expressions,
  setExpressions,
  inputValue,
  setInputValue,
}) => {
  const [tableLoading, setTableLoading] = useState(false);
  return (
    <div
      className="w-full h-full flex flex-col justify-center flex-shrink-0 flex-grow-0 overflow-scroll"
      style={{
        translate: `${-100 * categoryCount}%`,
        transition: `all 0.5s ease-in-out`,
      }}
    >
      <ManageTablesTaskbar
        setTablesData={setTablesData}
        AddedTables={AddedTables}
        setAddedTables={setAddedTables}
        setSelectedTable={setSelectedTable}
        activeItem={activeItem}
        tableData={tableData}
        setAddedCols={setAddedCols}
        activeColItem={activeColItem}
        setActiveColItem={setActiveColItem}
        setSelectedTableData={setSelectedTableData}
        expressions={expressions}
        setExpressions={setExpressions}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />

      <div className="flex flex-row w-full h-[calc(100%-78px)]">
        <ToolsSIdebar
          categoryCount={categoryCount}
          setCategoryCount={setCategoryCount}
        />

        {!tableLoading && (
          <TableAbstract
            data={selectedTableData}
            settings={{
              allowPaging: true,
              allowSorting: true,
              allowFiltering: true,
              ignoreAccent: true,
              filterType: "Excel",
              rowHeight: 30,
              allowResizing: true,
              pageCount: 12,
              autoFit: true,
            }}
          />
        )}

        <ManageTablesLists
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
          tableData={tableData}
          setTablesData={setTablesData}
          setSelectedTableData={setSelectedTableData}
          selectedTableData={selectedTableData}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          AddedCols={AddedCols}
          setAddedCols={setAddedCols}
          AddedTables={AddedTables}
          setAddedTables={setAddedTables}
          activeColItem={activeColItem}
          setActiveColItem={setActiveColItem}
          expressions={expressions}
          setExpressions={setExpressions}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setTableLoading={setTableLoading}
        />
      </div>
    </div>
  );
};

export default ManageTables;
