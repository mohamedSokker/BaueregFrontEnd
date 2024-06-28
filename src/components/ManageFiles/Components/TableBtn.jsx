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
import { ColorRing } from "react-loader-spinner";

const TableBtn = ({
  setIsTableBtn,
  tableBtnData,
  setTableBtnData,
  tableBtnURL,
}) => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [tableGrid, setTableGrid] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [selectedIndex, setSelectedIndex] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  //   console.log(tableBtnData);

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
      setIsLoading(true);
      const url = tableBtnURL;

      const response = await axiosPrivate(url, {
        method: "GET",
      });
      setTableBtnData(response.data);
      console.log(response.data);

      setTableGrid([]);
      let targetTable = response.data.sort((a, b) => b?.ID - a?.ID);

      setTableBtnData(targetTable);
      targetTable &&
        targetTable[0] &&
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
      setIsLoading(false);
    } catch (err) {
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
      setIsLoading(false);
    }
  };

  const handleCellDoubleClick = (e) => {
    const url = e.rowData?.URL;
    url && url !== "" && window.open(url, "_blank");
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
                    setIsTableBtn(false);
                  }, 500);
                }}
              >
                X
              </button>
            </TooltipComponent>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-2 w-full justify-center items-center">
            <ColorRing
              type="ColorRing"
              colors={[
                "rgb(0,74,128,0.7)",
                "rgb(0,74,128,0.7)",
                "rgb(0,74,128,0.7)",
                "rgb(0,74,128,0.7)",
                "rgb(0,74,128,0.7)",
              ]}
              height={40}
              width={200}
            />
            <p className="text-lg text-center px-2 text-[rgb(0,74,128,0.7)] font-bold">
              {`Loading Table...`}
            </p>
          </div>
        ) : (
          <div className="w-full">
            <GridComponent
              dataSource={tableBtnData}
              style={{ cursor: "pointer" }}
              recordDoubleClick={handleCellDoubleClick}
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
        )}

        <div className="w-full flex flex-row  justify-between items-center p-2 px-6">
          <div className="w-full"></div>

          <div className="flex flex-row gap-4 items-center">
            <button
              className=" text-gray-500 font-[600] text-[14px]"
              onClick={() => {
                setIsCanceled(true);
                setTimeout(() => {
                  setIsTableBtn(false);
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

export default TableBtn;
