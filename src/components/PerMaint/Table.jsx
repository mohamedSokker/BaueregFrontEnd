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

import { Spinner } from "../../components";
import { Header } from "../../components";
import { useNavContext } from "../../contexts/NavContext";
import { CheckEditorRole } from "../../Functions/checkEditorRole";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Table = () => {
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

  const getData = async () => {
    try {
      setLoading(true);
      setError(false);
      const url = `/api/v1/appMaint`;
      const data = await axiosPrivate(url, { method: "GET" });
      setTableData(data?.data);
      setTableGrid([]);
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
  }, [token]);

  const filterOptions = { ignoreAccent: true, type: "Menu" };

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

  if (loading) return <Spinner message={`Loading Data`} />;
  return (
    <div className="w-full p-2 bg-white rounded-xl Main--Page dark:bg-background-logoColor h-full">
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
        toolbar={["ExcelExport", "PdfExport", "Search"]}
        toolbarClick={toolbarClick}
        editSettings={{
          allowDeleting: true,
          allowEditing: true,
          allowAdding: true,
        }}
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
    </div>
  );
};

export default Table;
