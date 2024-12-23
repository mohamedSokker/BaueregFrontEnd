import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CiWarning } from "react-icons/ci";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
  Resize,
  ContextMenu,
} from "@syncfusion/ej2-react-grids";
// import {
//   RxCornerBottomLeft,
//   RxCornerBottomRight,
//   RxCornerTopLeft,
//   RxCornerTopRight,
// } from "react-icons/rx";
// import { TbMinusVertical, TbMinus } from "react-icons/tb";

import { Spinner } from "../../../components";
// import { Header } from "../../../components";
// import { useNavContext } from "../../../contexts/NavContext";
// import { CheckEditorRole } from "../../../Functions/checkEditorRole";
// import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Table = ({ item, tableData, data }) => {
  // const [tableData, setTableData] = useState({});
  const [tableGrid, setTableGrid] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { token, setErrorData } = useNavContext();
  // const axiosPrivate = useAxiosPrivate();

  // console.log(item);
  // console.log(data);

  const getData = async () => {
    try {
      setLoading(true);
      // const url = `/api/v3/${tableName}`;
      // const data = await axiosPrivate(url, { method: "GET" });
      // setTableData(data?.data);
      setTableGrid([]);
      item?.columns
        ? item?.columns.map((el) => {
            setTableGrid((prev) => [
              ...prev,
              {
                field: el,
                headerText: el,
                width: "100",
                textAlign: "Center",
              },
            ]);
          })
        : Object.keys(tableData[0]).map((el) => {
            setTableGrid((prev) => [
              ...prev,
              {
                field: el,
                headerText: el,
                width: "100",
                textAlign: "Center",
              },
            ]);
          });
      setLoading(false);
    } catch (err) {
      // setErrorData((prev) => [
      //   ...prev,
      //   err?.response?.data?.message
      //     ? err?.response?.data?.message
      //     : err?.message,
      // ]);
      setLoading(false);
    }
  };

  useEffect(() => {
    // let isMounted = true;
    // const controller = new AbortController();
    getData();
    // return () => {
    //   isMounted = false;
    //   controller.abort();
    // };
  }, [tableData, data]);

  const filterOptions = { ignoreAccent: true, type: "Excel" };

  if (loading)
    return (
      <div className="relative z-[1] p-1" style={item?.style}>
        <Spinner message={`Loading Table Data`} />
      </div>
    );
  return (
    <div
      className="w-full h-full relative overflow-scroll p-1"
      style={item?.style}
    >
      {(item || tableData) && (
        <GridComponent
          dataSource={tableData}
          // allowPaging
          allowSorting
          allowFiltering={true}
          filterSettings={filterOptions}
          height={`${parseInt(item?.height) / 1.25}`}
          rowHeight={30}
          // height={250}
          allowResizing={true}
          // pageSettings={
          //   item?.pagging ? { pageSize: Number(item?.pageCount) } : undefined
          // }
          autoFit={true}
        >
          <ColumnsDirective>
            {tableGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[
              Toolbar,
              Selection,
              Edit,
              Sort,
              Filter,
              Resize,
              ContextMenu,
            ]}
          />
        </GridComponent>
      )}
    </div>
  );
};

export default Table;
