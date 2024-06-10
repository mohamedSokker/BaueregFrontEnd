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
  Toolbar,
  Sort,
  Filter,
  Search,
  Resize,
  ContextMenu,
  ExcelExport,
  PdfExport,
} from "@syncfusion/ej2-react-grids";

import { Spinner, Header } from "../../../../../components";
import { useNavContext } from "../../../../../contexts/NavContext";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";

const OrderStatus = () => {
  const [tableData, setTableData] = useState({});
  const [tableGrid, setTableGrid] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState({});
  const [selectedIndex, setSelectedIndex] = useState({});
  const { closeSmallSidebar, usersData, token, setErrorData } = useNavContext();
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
      const url = `/api/v3/Order_Status`;
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
  }, [token]);

  const filterOptions = { ignoreAccent: true, type: "Menu" };

  if (loading) return <Spinner message={`Loading Order_Status Data`} />;
  return (
    <div
      className={`w-full p-2 md:p-10 bg-white rounded-xl Main--Page dark:bg-background-logoColor h-full`}
      onClick={closeSmallSidebar}
    >
      <React.Fragment>
        <div className="flex flex-row items-center justify-between Header mb-10 ">
          <Header category="" title={"Order_Status"} />
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
          toolbar={["ExcelExport", "PdfExport", "Search"]}
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
      </React.Fragment>
    </div>
  );
};

export default OrderStatus;
