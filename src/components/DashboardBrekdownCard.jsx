import React, { useState, useEffect } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import { PieChart, SparkLineChart } from "@mui/x-charts";
import { ColorRing } from "react-loader-spinner";
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

const DashboardBrekdownCard = ({
  name,
  percentage,
  getChildData,
  cardsData,
  data,
  result,
  loading,
}) => {
  const [dateValue, setDateValue] = useState(
    new Date(
      new Date().setMinutes(
        new Date().getMinutes() - new Date().getTimezoneOffset()
      )
    )
      .toISOString()
      .slice(0, 10)
  );
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [totalSum, setTotalSum] = useState(0);
  const [isResult, setIsResult] = useState(false);
  const [tableData, setTableData] = useState({});
  const [tableGrid, setTableGrid] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [selectedIndex, setSelectedIndex] = useState({});

  let grid;

  const getData = async () => {
    try {
      setTableData(result);
      setTableGrid([]);
      Object.keys(result[0]).map((item) => {
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
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (result) getData();
  }, [result]);

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

  const filters = ["All", "Trench_Cutting_Machine", "Drilling_Machine"];

  const changeDateValue = (e) => {
    setDateValue(e.target.value);
    getChildData({ [name]: e.target.value }, name, "dateTime");
  };

  useEffect(() => {
    console.log(data);
    if (data) {
      setTotalSum(0);
      data.map((d) => setTotalSum((prev) => prev + d.value));
    }
  }, [data]);

  console.log(totalSum);

  const customFormat = (d) => {
    // console.log(d);
    return `${d.data} times \n (${((Number(d.data) / totalSum) * 100).toFixed(
      2
    )} %)`;
  };
  return (
    <div
      className={`md:w-[99%] w-[100%] h-[100%] bg-white rounded-lg flex flex-col p-1 md:mb-0 mb-4 shadow-lg`}
    >
      {isResult && (
        <div className="absolute top-[-20px] left-[2.5vw] md:w-[95vw] w-[85vw] h-[80vh] z-[1000] bg-gray-100 rounded-lg shadow-lg">
          <div className="w-full h-full relative flex flex-col p-2">
            <div className="w-full flex items-center justify-center h-[10%]">
              <p className="flex justify-center text-[16px] font-bold">
                {name}
              </p>
            </div>
            <div className="w-full h-[90%] relative flex items-center overflow-x-auto flex-nowrap whitespace-nowrap">
              <GridComponent
                style={{ marginLeft: `auto` }}
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
            </div>
            <div
              className="absolute right-2 top-2 w-4 h-4 rounded-full cursor-pointer"
              onClick={() => setIsResult(false)}
            >
              <MdOutlineCancel />
            </div>
          </div>
        </div>
      )}
      <div className=" h-[12%] w-full flex flex-row justify-between items-center">
        <p className=" text-[16px] font-bold pl-2">{name}</p>
        <div className="flex justify-end relative">
          <input
            className="outline-none rounded-lg mr-2 text-[12px]"
            type="date"
            value={
              cardsData && cardsData?.dateTime ? cardsData?.dateTime : dateValue
            }
            onChange={changeDateValue}
          />
          <button
            className="text-[20px] mr-2"
            onClick={() => setIsFilterActive((prev) => !prev)}
          >
            <BsFilterLeft />
          </button>
          <button className="text-[15px]" onClick={() => setIsResult(true)}>
            <FaDatabase />
          </button>
          {isFilterActive && (
            <div className="absolute flex flex-col top-0 -left-[60px] z-10 bg-gray-200 p-2 rounded-md text-[10px]">
              {filters.map((item) => (
                <div key={item}>
                  <input
                    className="mr-2"
                    id={item}
                    name={name}
                    value={item}
                    type="radio"
                    onChange={() =>
                      getChildData({ [name]: item }, name, "filter")
                    }
                    checked={
                      cardsData && cardsData?.filter === item ? true : false
                    }
                  />
                  <label for={item}>{item}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row h-[88%]">
        <div className=" w-[100%] h-[100%] flex flex-col">
          <div className="h-[100%] w-full text-lg font-bold flex items-center justify-center pl-4">
            {loading ? (
              <ColorRing
                type="ColorRing"
                colors={[
                  "rgb(3,73,124)",
                  "rgb(3,73,124)",
                  "rgb(3,73,124)",
                  "rgb(3,73,124)",
                  "rgb(3,73,124)",
                ]}
                height={50}
                width={200}
              />
            ) : (
              <PieChart
                colors={[
                  "#156E84",
                  "#88D3E5",
                  "#AE4F46",
                  "#CD8880",
                  "#A39547",
                  "#CFC99D",
                  "#3AAE61",
                  "#96D6AB",
                  "#613A67",
                  "#7F608F",
                ]}
                width={500}
                series={[
                  {
                    data: data,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -90,
                    endAngle: 180,
                    valueFormatter: customFormat,
                  },
                ]}
                sx={{
                  "--ChartsLegend-itemWidth": "30px",
                  "--ChartsLegend-itemMarkSize": "10px",
                  "--ChartsLegend-labelSpacing": "5px",
                  "--ChartsLegend-rootSpacing": "5px",
                  "--ChartsLegend-rootOffsetX": "10px",
                  "--ChartsLegend-rootOffsetY": "0px",
                }}
              />
            )}
          </div>
          {/* <div className="h-[10%] text-[16px] font-thin flex flex-row items-center p-2">
            {percentage >= 0 ? (
              <div className="text-green-900 flex flex-row items-center">
                <BiTrendingUp />
                <p className="ml-4 text-[12px]">
                  {`increased by `}
                  <span>{`${percentage} %`}</span>
                </p>
              </div>
            ) : (
              <div className="text-red-600 flex flex-row items-center">
                <BiTrendingDown />
                <p className="ml-4 text-[12px]">
                  {`decreased by `}
                  <span>{`${Math.abs(percentage)} %`}</span>
                </p>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardBrekdownCard;
