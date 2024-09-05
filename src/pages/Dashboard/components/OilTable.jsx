import React, { useEffect, useRef, useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
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

import "../styles/UploadCard.css";
import { Spinner } from "../../../components";

const OilTable = ({ setIsOilTable, data }) => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [tableGrid, setTableGrid] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [selectedIndex, setSelectedIndex] = useState({});
  const [loading, setLoading] = useState(true);

  console.log(data);

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

  const rowsSelected = () => {
    if (grid) {
      const selectedrowindex = grid.getSelectedRowIndexes();
      const selectedrecords = grid.getSelectedRecords();
      setSelectedIndex(selectedrowindex);
      setSelectedRow(JSON.stringify(selectedrecords));
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      setTableGrid([]);
      setTableData(data?.oilCons);
      data?.oilCons &&
        data?.oilCons[0] &&
        Object.keys(data?.oilCons[0]).map((item, i) => {
          setTableGrid((prev) => [
            ...prev,
            {
              field: item,
              headerText: item,
              width: "200",
              textAlign: "Center",
            },
          ]);
        });
      setLoading(false);
    } catch (err) {
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
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
    };
  }, []);

  const filterOptions = { ignoreAccent: true, type: "Menu" };

  if (loading) return <Spinner message={`Loading  Data`} />;

  return (
    <div
      className="fixed opacity-100 w-screen h-screen flex flex-col items-center justify-center left-0 top-0"
      style={{ zIndex: "1000" }}
    >
      <div
        className="absolute  w-screen h-screen flex flex-col items-center justify-center left-0 top-0 z-[1000]"
        style={{ backdropFilter: "blur(2px)", opacity: 0.8 }}
      ></div>
      <div
        className={`md:w-[98%] w-[90%] md:h-[90%] h-[80%] flex flex-col justify-between items-center bg-white relative z-[1001] mainContent overflow-y-scroll`}
        style={{
          animation: !isCanceled
            ? "animate-in 0.5s ease-in-out"
            : "animate-out 0.5s ease-in-out",
        }}
      >
        <div className="flex flex-row w-full p-2 px-6 justify-between">
          <div>
            <TooltipComponent
              content="close"
              position="BottomCenter"
              className="flex items-center"
            >
              <button
                className="hover:cursor-pointer p-2 hover:rounded-full hover:bg-gray-300 aspect-square flex justify-center items-center"
                onClick={() => {
                  setIsCanceled(true);
                  setTimeout(() => {
                    setIsOilTable(false);
                  }, 500);
                }}
              >
                X
              </button>
            </TooltipComponent>
          </div>
        </div>

        <div className="w-full">
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
            rowSelected={rowsSelected}
            ref={(g) => (grid = g)}
            toolbar={["Search", "ExcelExport", "PdfExport"]}
            toolbarClick={toolbarClick}
            allowExcelExport={true}
            allowPdfExport={true}
          >
            <ColumnsDirective>
              {tableGrid.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
            </ColumnsDirective>
            <Inject
              services={[
                Page,
                Edit,
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
        </div>

        <div className="w-full flex flex-row  justify-between items-center p-2 px-6">
          <div className="w-full"></div>

          <div className="flex flex-row gap-4 items-center">
            <button
              className=" text-gray-500 font-[600] text-[14px]"
              onClick={() => {
                setIsCanceled(true);
                setTimeout(() => {
                  setIsOilTable(false);
                }, 500);
              }}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OilTable;
