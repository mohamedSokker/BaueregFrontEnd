import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Selection,
  Page,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
  Resize,
  ContextMenu,
} from "@syncfusion/ej2-react-grids";

const TableAbstract = ({ data, settings }) => {
  // console.log(data);
  return (
    <div className="w-full h-full relative overflow-scroll">
      {data && (
        <React.Fragment>
          <GridComponent
            dataSource={data}
            allowPaging={settings?.allowPaging ? true : false}
            allowSorting={settings?.allowSorting ? true : false}
            allowFiltering={settings?.allowFiltering ? true : false}
            filterSettings={{
              ignoreAccent: settings?.ignoreAccent ? true : false,
              type: settings?.filterType ? settings?.filterType : "Excel",
            }}
            rowHeight={settings?.rowHeight ? settings?.rowHeight : 30}
            allowResizing={settings?.allowResizing}
            pageSettings={
              settings?.allowPaging
                ? { pageSize: settings?.pageCount }
                : undefined
            }
            autoFit={settings?.autoFit ? true : false}
          >
            {data?.length > 0 && (
              <ColumnsDirective>
                {data?.[0] &&
                  Object.keys(data?.[0])?.map((item, index) => (
                    <ColumnDirective
                      key={index}
                      field={item}
                      headerText={item}
                      width={`100`}
                      textAlign="Center"
                    />
                  ))}
              </ColumnsDirective>
            )}

            <Inject
              services={
                settings?.allowPaging
                  ? [
                      Toolbar,
                      Page,
                      Selection,
                      Edit,
                      Sort,
                      Filter,
                      Resize,
                      ContextMenu,
                    ]
                  : [
                      Toolbar,
                      Selection,
                      Edit,
                      Sort,
                      Filter,
                      Resize,
                      ContextMenu,
                    ]
              }
            />
          </GridComponent>
        </React.Fragment>
      )}
    </div>
  );
};

export default TableAbstract;
