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
  const { closeSmallSidebar, usersData, token, setErrorData } = useNavContext();
  const axiosPrivate = useAxiosPrivate();

  let grid;

  const getDataWithoutLoading = async () => {
    try {
      const url = `/api/v3/${tableName}`;
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
    } catch (err) {
      setErrorData((prev) => [
        ...prev,
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message,
      ]);
    }
  };

  useEffect(() => {
    console.log(socket?.connected);
    // let isMounted = true;
    // const controller = new AbortController();
    socket.on("appDataUpdate", getDataWithoutLoading);

    return () => {
      // isMounted = false;
      // controller.abort();
      socket.off("appDataUpdate", getDataWithoutLoading);
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
      const url = `/api/v3/${tableName}`;
      const data = await axiosPrivate(url, { method: "GET" });
      setTableData(data?.data);
      setTableGrid([]);
      data?.data &&
        data?.data[0] &&
        Object.keys(data?.data[0]).map((item) => {
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
    };
  }, [tableName, token]);

  const filterOptions = { ignoreAccent: true, type: "Menu" };

  if (loading) return <Spinner message={`Loading ${tableName} Data`} />;
  return (
    <div
      className={`w-full p-2 md:p-10 bg-white rounded-xl Main--Page dark:bg-background-logoColor h-full`}
      onClick={closeSmallSidebar}
    >
      <React.Fragment>
        <div className="flex flex-row items-center justify-between Header mb-10 ">
          <Header category="" title={tableName ? tableName : "Test"} />
        </div>
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
          toolbar={
            CheckEditorRole(tableName, usersData)
              ? ["Add", "Edit", "Delete", "Search", "ExcelExport", "PdfExport"]
              : ["ExcelExport", "PdfExport", "Search"]
          }
          toolbarClick={toolbarClick}
          editSettings={{
            allowDeleting:
              usersData[0]?.roles?.Admin ||
              CheckEditorRole(tableName, usersData)
                ? true
                : false,
            allowEditing:
              usersData[0]?.roles?.Admin ||
              CheckEditorRole(tableName, usersData)
                ? true
                : false,
            allowAdding:
              usersData[0]?.roles?.Admin ||
              CheckEditorRole(tableName, usersData)
                ? true
                : false,
          }}
          allowExcelExport={true}
          allowPdfExport={true}
          actionComplete={async (args) => {
            try {
              if (
                !usersData[0]?.roles?.Admin &&
                !usersData[0]?.roles?.Editor?.Kanban &&
                !usersData[0]?.roles?.User?.Kanban &&
                !CheckEditorRole(tableName, usersData)
              ) {
                throw new Error(`You Are not authorized to edit tasks`);
              } else {
                if (args.requestType === "delete") {
                  await axiosPrivate(
                    `/api/v3/${tableName}/${JSON.parse(selectedRow)[0]["ID"]}`,
                    { method: "DELETE" }
                  );
                } else if (
                  args.action === "edit" &&
                  args.requestType === "save"
                ) {
                  axiosPrivate(
                    `/api/v3/${tableName}/${JSON.parse(selectedRow)[0]["ID"]}`,
                    {
                      method: "PUT",
                      data: JSON.stringify(grid.currentViewData[selectedIndex]),
                    }
                  );
                } else if (
                  args.action === "add" &&
                  args.requestType === "save"
                ) {
                  const data = args.data;
                  delete data.ID;
                  let result = {};
                  Object.keys(data).map((item) => {
                    !data[item]
                      ? (result = { ...result, [item]: "" })
                      : (result = { ...result, [item]: data[item] });
                  });
                  console.log(result);
                  axiosPrivate(`/api/v3/${tableName}`, {
                    method: "POST",
                    data: JSON.stringify(result),
                  });
                }
              }
            } catch (err) {
              setErrorData((prev) => [
                ...prev,
                err?.response?.data?.message
                  ? err?.response?.data?.message
                  : err?.message,
              ]);
              setLoading(false);
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
      </React.Fragment>
    </div>
  );
};

export default EditTables;
