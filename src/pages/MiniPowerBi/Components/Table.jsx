import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
  Resize,
  ContextMenu,
  InfiniteScroll,
} from "@syncfusion/ej2-react-grids";

import "../Styles/EditCard.css";

const Table = ({ item, tableData, data }) => {
  const [tableHeight, setTableHeight] = useState(100);

  useEffect(() => {
    const container = document.getElementById("Main-Area");
    const containerStyles = container && window.getComputedStyle(container);
    const containerHeight = containerStyles?.height;
    const targetHeight =
      (parseInt(item?.height) * parseInt(containerHeight)) /
      100 /
      parseFloat(item?.heightFactor);
    setTableHeight(targetHeight);
  }, [tableData, data, item]);

  const filterOptions = { ignoreAccent: true, type: "Excel" };

  return (
    <div className="w-full h-full relative pr-1 table_body">
      {(item || tableData) &&
        (item?.columns?.length > 0 || tableData ? (
          <GridComponent
            dataSource={tableData}
            allowSorting
            // allowFiltering={true}
            // filterSettings={filterOptions}
            rowHeight={item?.rowHeight}
            height={tableHeight}
            allowResizing={true}
            autoFit={true}
            enableInfiniteScrolling={true}
            pageSettings={{ pageSize: 12 }}
          >
            {tableData?.length > 0 && (
              <ColumnsDirective>
                {tableData?.[0] &&
                  Object.keys(tableData?.[0])?.map(
                    (col, index) =>
                      item?.columns?.includes(col) && (
                        <ColumnDirective
                          key={index}
                          field={col}
                          headerText={col}
                          width={`100`}
                          textAlign="Center"
                        />
                      )
                  )}
              </ColumnsDirective>
            )}

            <Inject
              services={[
                Toolbar,
                Selection,
                Edit,
                Sort,
                // Filter,
                Resize,
                ContextMenu,
                InfiniteScroll,
              ]}
            />
          </GridComponent>
        ) : (
          <div className="text-[10px] w-full h-full flex justify-center items-center">
            No Records
          </div>
        ))}
    </div>
  );
};

export default Table;
