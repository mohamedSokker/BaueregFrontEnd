import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CiWarning } from "react-icons/ci";
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

import { Spinner } from "../components";
import { Header } from "../components";
import { useNavContext } from "../contexts/NavContext";
import { bodyData } from "../Functions/bodydata";
import { CheckEditorRole } from "../Functions/checkEditorRole";
import fetchDataOnly from "../Functions/fetchDataOnly";

const EditTables = () => {
  const { tableName } = useParams();
  const [tableData, setTableData] = useState({});
  const [tableGrid, setTableGrid] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState({});
  const [selectedIndex, setSelectedIndex] = useState({});
  const [error, setError] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");
  const { closeSmallSidebar, usersData, token } = useNavContext();

  const baseURL = process.env.REACT_APP_BASE_URL;

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

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(false);
        const url = `${baseURL}/api/v1/${tableName}`;
        const data = await fetchDataOnly(url, "GET", token);
        setTableData(data);
        setTableGrid([]);
        Object.keys(data[0]).map((item) => {
          setTableGrid((prev) => [
            ...prev,
            {
              field: item,
              headerText: item,
              width: "100",
              textAlign: "Center",
            },
          ]);
        });
        setLoading(false);
      } catch (err) {
        setErrorDetails(`${err.message}`);
        console.log(err.message);
        setError(true);
        setLoading(false);
      }
    };
    getData();
  }, [tableName, token]);

  if (loading) return <Spinner message={`Loading ${tableName} Data`} />;
  return (
    <div
      className={`p-2 md:p-10 bg-white rounded-xl Main--Page dark:bg-background-logoColor`}
      onClick={closeSmallSidebar}
    >
      {error ? (
        <div
          className=" bg-yellow-200 h-20 flex justify-center items-center flex-row mb-5 mt-2 rounded-lg"
          style={{ color: "red", width: "90%" }}
        >
          <CiWarning className="text-[40px] font-extrabold" />
          <p className="ml-5 text-xl font-semibold">{errorDetails}</p>
        </div>
      ) : (
        <>
          <div className="flex flex-row items-center justify-between Header mb-10 ">
            <Header category="" title={tableName ? tableName : "Test"} />
          </div>
          <GridComponent
            dataSource={tableData}
            allowPaging
            allowSorting
            height={250}
            allowResizing={true}
            pageSettings={{ pageSize: 50 }}
            autoFit={true}
            rowSelected={rowsSelected}
            ref={(g) => (grid = g)}
            toolbar={
              CheckEditorRole(tableName, usersData)
                ? [
                    "Add",
                    "Edit",
                    "Delete",
                    "Search",
                    "ExcelExport",
                    "PdfExport",
                  ]
                : ["ExcelExport", "PdfExport", "Search"]
            }
            toolbarClick={toolbarClick}
            editSettings={{
              allowDeleting: true,
              allowEditing: true,
              allowAdding: true,
            }}
            allowExcelExport={true}
            allowPdfExport={true}
            actionComplete={(args) => {
              if (args.requestType === "delete") {
                bodyData(
                  `${baseURL}/api/v1/${tableName}/${
                    JSON.parse(selectedRow)[0]["ID"]
                  }`,
                  JSON.parse(selectedRow)[0],
                  "DELETE",
                  "delete"
                );
              } else if (
                args.action === "edit" &&
                args.requestType === "save"
              ) {
                bodyData(
                  `${baseURL}/api/v1/${tableName}/${
                    JSON.parse(selectedRow)[0]["ID"]
                  }`,
                  grid.currentViewData[selectedIndex],
                  "PUT",
                  "update"
                );
              } else if (args.action === "add" && args.requestType === "save") {
                bodyData(
                  `${baseURL}/api/v1/${tableName}`,
                  grid.currentViewData[0],
                  "POST",
                  "add"
                );
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
                Toolbar,
                Selection,
                Edit,
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

export default EditTables;
