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
import { CheckEditorRole } from "../Functions/checkEditorRole";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const EditTables = ({ socket }) => {
  const { tableName } = useParams();
  const [tableData, setTableData] = useState({});
  const [tableGrid, setTableGrid] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState({});
  const [selectedIndex, setSelectedIndex] = useState({});
  const [error, setError] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");
  const { closeSmallSidebar, usersData, token } = useNavContext();
  const axiosPrivate = useAxiosPrivate();

  let grid;

  useEffect(() => {
    // let isMounted = true;
    // const controller = new AbortController();
    if (socket.connected) socket.on("appDataUpdate", getData());

    return () => {
      // isMounted = false;
      // controller.abort();
      socket.off("appDataUpdate", getData());
    };
  }, [socket, usersData]);

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
      setError(false);
      const url = `/api/v1/${tableName}`;
      const data = await axiosPrivate(url, { method: "GET" });
      setTableData(data?.data);
      setTableGrid([]);
      Object.keys(data?.data[0]).map((item) => {
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

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    getData();
    return () => {
      isMounted = false;
      controller.abort();
    };
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
            actionComplete={async (args) => {
              try {
                if (
                  !usersData[0]?.roles?.Admin &&
                  !usersData[0]?.roles?.Editor?.Kanban &&
                  !usersData[0]?.roles?.User?.Kanban
                ) {
                  alert(`You Are not authorized to edit tasks`);
                } else {
                  if (args.requestType === "delete") {
                    await axiosPrivate(
                      `/api/v1/${tableName}/${
                        JSON.parse(selectedRow)[0]["ID"]
                      }`,
                      { method: "DELETE" }
                    );
                  } else if (
                    args.action === "edit" &&
                    args.requestType === "save"
                  ) {
                    axiosPrivate(
                      `/api/v1/${tableName}/${
                        JSON.parse(selectedRow)[0]["ID"]
                      }`,
                      {
                        method: "PUT",
                        data: JSON.stringify(
                          grid.currentViewData[selectedIndex]
                        ),
                      }
                    );
                  } else if (
                    args.action === "add" &&
                    args.requestType === "save"
                  ) {
                    axiosPrivate(`/api/v1/${tableName}`, {
                      method: "POST",
                      data: JSON.stringify(grid.currentViewData[0]),
                    });
                  }
                }
              } catch (error) {
                setError(true);
                setErrorDetails(error.message);
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
