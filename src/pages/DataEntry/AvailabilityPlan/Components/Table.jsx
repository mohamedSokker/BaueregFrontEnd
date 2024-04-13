import React, { useEffect, useState } from "react";
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

import { Spinner } from "../../../../components";
import { useNavContext } from "../../../../contexts/NavContext";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
// import EditDataEntry from "./EditDataEntry";

const Table = () => {
  const { usersData, token, setErrorData } = useNavContext();
  const axiosPrivate = useAxiosPrivate();

  const [tableData, setTableData] = useState({});
  const [tableGrid, setTableGrid] = useState([]);
  const [loading, setLoading] = useState(true);
  //   const [pageLoading, setPageLoading] = useState(false);
  //   const [isEdit, setIsEdit] = useState(false);
  //   const [editData, setEditData] = useState(null);

  let grid;

  const getData = async () => {
    try {
      setLoading(true);
      const url = `/api/v3/Availability_plan`;
      const data = await axiosPrivate(url, { method: "GET" });
      const targetData = data?.data?.filter(
        (d) =>
          d.UserName === usersData[0].username && d.TableName === "Maintenance"
      );
      //   let targetTable = [];
      //   targetData?.map((item) => {
      //     item?.Data &&
      //       targetTable.push({
      //         ID: item?.ID,
      //         ...JSON.parse(item?.Data),
      //         Sent: item?.Sent,
      //       });
      //   });
      setTableData(data?.data);
      setTableGrid([]);
      data?.data[0] &&
        Object.keys(data?.data[0])?.map((item) => {
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

  const toolbarClick = (args) => {
    grid && args.item.text === "Excel Export" && grid.excelExport();
  };

  //   const handleCellDoubleClick = (e) => {
  //     setEditData(e.rowData);
  //     setIsEdit(true);
  //   };

  //   const handleSendData = async () => {
  //     try {
  //       setPageLoading(true);
  //       console.log(tableData);
  //       const url = `/api/v3/dataEntryHandleAvCalc`;
  //       const response = await axiosPrivate(url, {
  //         method: "POST",
  //         data: JSON.stringify(tableData),
  //       });
  //       console.log(response.data);
  //       setPageLoading(false);
  //     } catch (err) {
  //       setErrorData((prev) => [
  //         ...prev,
  //         err?.response?.data?.message
  //           ? err?.response?.data?.message
  //           : err?.message,
  //       ]);
  //       setPageLoading(false);
  //     }
  //   };

  if (loading) return <Spinner message={`Loading Data...`} />;
  return (
    <div className="w-full flex flex-col gap-2 p-2 bg-white rounded-xl Main--Page dark:bg-background-logoColor h-full">
      <GridComponent
        style={{ cursor: "pointer" }}
        dataSource={tableData}
        allowPaging
        allowSorting
        allowFiltering={true}
        filterSettings={filterOptions}
        allowResizing={true}
        pageSettings={{ pageSize: 7 }}
        autoFit={true}
        ref={(g) => (grid = g)}
        toolbar={["ExcelExport", "Search"]}
        toolbarClick={toolbarClick}
        allowExcelExport={true}
        allowPdfExport={true}
      >
        <ColumnsDirective className="hover:cursor-pointer">
          {tableGrid.map((item, index) => (
            <ColumnDirective
              key={index}
              {...item}
              className="hover:cursor-pointer"
            />
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
