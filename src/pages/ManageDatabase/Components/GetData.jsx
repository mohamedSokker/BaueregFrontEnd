import React, { useEffect, useRef, useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { ColorRing } from "react-loader-spinner";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
  Search,
  Resize,
  ContextMenu,
  ExcelExport,
  PdfExport,
} from "@syncfusion/ej2-react-grids";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const GetData = ({ selectedTable, setErrorData, tableData, setTableData }) => {
  const [tableGrid, setTableGrid] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [selectedRow, setSelectedRow] = useState({});
  // const [selectedIndex, setSelectedIndex] = useState({});

  console.log(tableData);
  console.log(tableGrid);

  const axiosPrivate = useAxiosPrivate();

  let grid;

  const toolbarClick = (args) => {
    if (grid) {
      if (args.item.text === "PDF Export") {
        grid.pdfExport();
      } else if (args.item.text === "Excel Export") {
        grid.excelExport();
      }
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      const url = `/api/v3/${selectedTable}`;
      const data = await axiosPrivate(url, { method: "GET" });
      setTableData(data?.data);
      let grids = [];
      data?.data &&
        data?.data.length > 0 &&
        Object.keys(data?.data[0]).map((item, index) => {
          return grids.push({
            field: item,
            headerText: item,
            width: "200",
            textAlign: "Center",
          });
        });
      setTableGrid(grids);
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

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    getData();
    return () => {
      isMounted = false;
      controller.abort();
      setTableGrid([]);
    };
  }, [selectedTable]);

  const filterOptions = { ignoreAccent: true, type: "Menu" };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {loading ? (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <ColorRing
            type="ColorRing"
            colors={[
              "rgb(59,130,246)",
              "rgb(59,130,246)",
              "rgb(59,130,246)",
              "rgb(59,130,246)",
              "rgb(59,130,246)",
            ]}
            height={30}
            width={30}
          />
          <p className="text-[14px] text-center px-2 text-blue-500 font-bold">
            {`Loading ${selectedTable} Data`}
          </p>
        </div>
      ) : (
        <>
          <p className="text-[16px] font-[600] text-blue-500">
            {selectedTable}
          </p>
          <GridComponent
            dataSource={tableData}
            allowPaging
            allowSorting
            allowFiltering={true}
            filterSettings={filterOptions}
            // height={250}
            allowResizing={true}
            pageSettings={{ pageSize: 7 }}
            autoFit={true}
            ref={(g) => (grid = g)}
            toolbar={["Search", "ExcelExport", "PdfExport"]}
            toolbarClick={toolbarClick}
            allowExcelExport={true}
            allowPdfExport={true}
          >
            <ColumnsDirective>
              {tableGrid?.map((item) => (
                <ColumnDirective key={item?.headerText} {...item} />
              ))}
            </ColumnsDirective>
            <Inject
              services={[
                Page,
                Toolbar,
                Selection,
                Sort,
                Filter,
                Search,
                Resize,
                ContextMenu,
                ExcelExport,
                PdfExport,
              ]}
            />
          </GridComponent>
        </>
      )}
    </div>
  );
};

export default GetData;
