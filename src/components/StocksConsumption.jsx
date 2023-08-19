import React, { useState, useEffect } from "react";
import { CiWarning } from "react-icons/ci";
import { Cookies, useCookies } from "react-cookie";
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

import { useNavContext } from "../contexts/NavContext";
import { Header } from "../components";
import { Spinner } from "../components";

const StocksConsumption = () => {
  const [tableData, setTableData] = useState({});
  const [tableGrid, setTableGrid] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");
  const { closeSmallSidebar } = useNavContext();
  const cookies = new Cookies();

  const baseURL = process.env.REACT_APP_BASE_URL;

  useEffect(async () => {
    setLoading(true);
    setError(false);
    setTableData([]);
    // let dataArray = [];
    const token = cookies.get("token");
    await fetch(
      `${baseURL}/api/v1/Maintenance_Stocks?fullquery=SELECT DISTINCT Maintenance_Stocks.SparePart_Code, Stocks.Item FROM Maintenance_Stocks JOIN Stocks ON (Maintenance_Stocks.SparePart_Code LIKE Stocks.Code)`,
      // `${baseURL}/api/v1/Maintenance_Stocks?fullquery=SELECT DISTINCT SparePart_Code FROM Maintenance_Stocks`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.forEach(async (item) => {
          await fetch(
            `${baseURL}/api/v1/Maintenance_Stocks?fullquery=SELECT SUM(CONVERT(FLOAT,TotalValueStock)) As SparePartSum FROM Maintenance_Stocks  WHERE SparePart_Code = '${item.SparePart_Code}'`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
            .then((res) => res.json())
            .then((newData) => {
              console.log(item.SparePart_Code, newData[0].SparePartSum);
              setTableData((prev) => [
                ...prev,
                {
                  SparePart_Code: item.SparePart_Code,
                  SparePart_Item: item.Item,
                  SparePart_Value: newData[0].SparePartSum,
                },
              ]);
            });
        });
        // setTableGrid([]);
        setTableGrid([
          {
            field: "SparePart_Code",
            headerText: "SparePart_Code",
            textAlign: "Center",
          },
          {
            field: "SparePart_Item",
            headerText: "SparePart_Item",
            textAlign: "Center",
          },
          {
            field: "SparePart_Value",
            headerText: "SparePart_Value",
            textAlign: "Center",
          },
        ]);
        // Object.keys(data[0]).map((item) => {
        //   setTableGrid((prev) => [
        //     ...prev,
        //     {
        //       field: item,
        //       headerText: item,
        //       // width: "100",
        //       textAlign: "Center",
        //     },
        //   ]);
        // });
        setLoading(false);
      })
      .catch((err) => {
        setErrorDetails(`Unothorized Or ${err.message}`);
        console.log(err.message);
        setError(true);
        setLoading(false);
      });
  }, []);

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

  if (loading) return <Spinner message={`Loading Data`} />;
  return (
    <div
      className={`flex flex-col md:w-full w-screen p-2 md:p-0 h-full items-start`}
    >
      {error ? (
        <div
          className=" bg-yellow-200 h-20 flex justify-center items-center flex-row mb-5 mt-2"
          style={{ color: "red", width: "90%" }}
        >
          <CiWarning className="text-xl" />
          <p className="ml-5 text-xl">{errorDetails}</p>
        </div>
      ) : (
        <>
          <div className="flex flex-row items-center justify-between Header mb-10 ">
            <Header category="" title="Stocks Consuption" />
          </div>
          <GridComponent
            dataSource={tableData}
            allowPaging
            allowSorting
            height={250}
            ref={(g) => (grid = g)}
            allowResizing={true}
            pageSettings={{ pageSize: 50 }}
            autoFit={true}
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
        </>
      )}
    </div>
  );
};

export default StocksConsumption;
