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

import { PageLoading, Spinner } from "../../../../components";
import { useNavContext } from "../../../../contexts/NavContext";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import EditDataEntry from "./EditDataEntry";

const Table = () => {
  const { usersData, token, setErrorData } = useNavContext();
  const axiosPrivate = useAxiosPrivate();

  const [tableData, setTableData] = useState({});
  const [tableGrid, setTableGrid] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  let grid;

  const formatDate = (anyDate) => {
    dt = new Date(anyDate);
    const year = dt.getFullYear();
    let day = dt.getDate().toString();
    let month = (Number(dt.getMonth()) + 1).toString();
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;
    return `${year}-${month}-${day}`;
  };

  const getData = async () => {
    try {
      setLoading(true);
      const url = `/api/v3/QCTable`;
      const data = await axiosPrivate(url, { method: "GET" });
      const targetData = data?.data?.filter(
        (d) =>
          d.UserName === usersData[0].username && d.TableName === "Maintenance"
      );
      let targetTable = [];
      targetData?.map((item) => {
        item?.Data &&
          targetTable.push({
            ID: item?.ID,
            ...JSON.parse(item?.Data),
            Sent: item?.Sent,
          });
      });
      setTableData(targetTable);
      setTableGrid([]);
      targetTable[0] &&
        Object.keys(targetTable[0])?.map((item) => {
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

  const handleCellDoubleClick = (e) => {
    setEditData(e.rowData);
    setIsEdit(true);
  };

  const handleSendData = async () => {
    try {
      setPageLoading(true);
      console.log(tableData);
      const url = `/api/v3/dataEntryHandleAvCalc`;
      const response = await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify(tableData),
      });
      console.log(response.data);
      setPageLoading(false);
    } catch (err) {
      setErrorData((prev) => [
        ...prev,
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message,
      ]);
      setPageLoading(false);
    }
  };

  if (loading) return <Spinner message={`Loading Data...`} />;
  if (isEdit) return <EditDataEntry editData={editData} />;
  return (
    <div className="w-full flex flex-col gap-2 p-2 bg-white rounded-xl Main--Page dark:bg-background-logoColor h-full">
      {pageLoading && <PageLoading message={`Sending Data...`} />}
      <div className="flex flex-row justify-end items-center ">
        <div
          className="bg-logoColor rounded-md text-white text-[12px] py-1 px-3 hover:cursor-pointer"
          onClick={handleSendData}
        >{`Send Data`}</div>
      </div>
      <GridComponent
        style={{ cursor: "pointer" }}
        recordDoubleClick={handleCellDoubleClick}
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
