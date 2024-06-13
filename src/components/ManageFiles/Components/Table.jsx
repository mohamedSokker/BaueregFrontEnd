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

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import "../Styles/UploadCard.css";

const Table = ({
  setIsTable,
  tableData,
  setTableData,
  setLoading,
  addDataURL,
  columns,
  values,
}) => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [tableGrid, setTableGrid] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [selectedIndex, setSelectedIndex] = useState({});

  const axiosPrivate = useAxiosPrivate();

  console.log(tableData);

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
      setTableGrid([]);
      let targetTable = [];
      tableData?.map((item, i) => {
        let schemas = { ID: i.toString() };
        columns?.map((it, index) => {
          schemas = { ...schemas, [it]: item[values[index]] };
        });
        targetTable.push(schemas);
      });
      setTableData(targetTable);
      Object.keys(targetTable[0]).map((item, i) => {
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
    } catch (err) {
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
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

  const handleSend = async () => {
    try {
      setLoading(true);
      const url = addDataURL;
      const targetData = [];
      tableData.map((item) => {
        delete item.ID;
        targetData.push(item);
      });
      console.log(targetData);
      const response = await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify(targetData),
      });
      console.log(response.data);
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
                    setIsTable(false);
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
            toolbar={[
              "Add",
              "Edit",
              "Delete",
              "Search",
              "ExcelExport",
              "PdfExport",
            ]}
            toolbarClick={toolbarClick}
            editSettings={{
              allowDeleting: true,
              allowEditing: true,
              allowAdding: true,
            }}
            allowExcelExport={true}
            allowPdfExport={true}
            actionComplete={async (args) => {
              try {
                if (args.requestType === "delete") {
                  const result = tableData.filter(
                    (item) =>
                      Number(item.ID) !==
                      Number(JSON.parse(selectedRow)[0]["ID"])
                  );
                  setTableData(result);
                } else if (
                  args.action === "edit" &&
                  args.requestType === "save"
                ) {
                  const updatedData = grid.currentViewData[selectedIndex];
                  console.log(updatedData);
                  let result = [];
                  tableData.map((item) => {
                    if (
                      Number(item.ID) ===
                      Number(JSON.parse(selectedRow)[0]["ID"])
                    ) {
                      result.push(updatedData);
                    } else {
                      result.push(item);
                    }
                  });
                  setTableData(result);
                } else if (
                  args.action === "add" &&
                  args.requestType === "save"
                ) {
                  const addedData = grid.currentViewData[0];
                  setTableData((prev) => [...prev]);
                }
              } catch (err) {
                console.log(err.message);
              }
            }}
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
              className=" text-red-400 font-[600] text-[14px]"
              onClick={async () => {
                await handleSend();
                //   handleUpload();
                // handleSave(val, category);
                setIsCanceled(true);
                setTimeout(() => {
                  setIsTable(false);
                }, 500);
              }}
            >
              SEND
            </button>
            <button
              className=" text-gray-500 font-[600] text-[14px]"
              onClick={() => {
                setIsCanceled(true);
                setTimeout(() => {
                  setIsTable(false);
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

export default Table;
