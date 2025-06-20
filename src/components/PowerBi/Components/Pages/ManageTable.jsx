import React, { useState } from "react";

import ToolsSIdebar from "../Sidebars/ToolsSIdebar";
import TableAbstract from "../TableAbstract";
import ManageTablesLists from "../Sidebars/ManageTablesLists";
import ManageTablesTaskbar from "../Sidebars/ManageTablesTaskbar";
import { useInitContext } from "../../Contexts/InitContext";

const ManageTables = () => {
  const { categoryCount, setCategoryCount, selectedTableData } =
    useInitContext();

  const [tableLoading, setTableLoading] = useState(false);
  return (
    <div
      className="w-full h-full flex flex-col justify-center flex-shrink-0 flex-grow-0 overflow-scroll"
      style={{
        translate: `${-100 * categoryCount}%`,
        transition: `all 0.5s ease-in-out`,
      }}
    >
      <ManageTablesTaskbar />

      <div className="flex flex-row w-full h-[calc(100%-78px)]">
        <ToolsSIdebar
          categoryCount={categoryCount}
          setCategoryCount={setCategoryCount}
        />

        {!tableLoading && (
          <TableAbstract
            data={selectedTableData}
            defaultWidth={`100px`}
            settings={{
              allowPaging: true,
              allowSorting: true,
              allowFiltering: true,
              ignoreAccent: true,
              filterType: "Excel",
              rowHeight: 30,
              allowResizing: true,
              pageCount: 11,
              autoFit: true,
            }}
          />
        )}

        <ManageTablesLists setTableLoading={setTableLoading} />
      </div>
    </div>
  );
};

export default ManageTables;
