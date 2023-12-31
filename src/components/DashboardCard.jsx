import React, { useEffect, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import { SparkLineChart } from "@mui/x-charts";
import { ColorRing } from "react-loader-spinner";
import {
  Chart as Chartjs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
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

import { logoColor } from "../BauerColors";

Chartjs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DashboardCard = ({
  title,
  name,
  value,
  percentage,
  getChildData,
  cardsData,
  loading,
  perLoading,
  data,
  result,
  xData,
  yData,
  label,
  isGraph,
  isPer,
  isFilter,
  filters,
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
  const [isData, setIsData] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [itemType, setItemType] = useState([]);
  const [active, setActive] = useState(false);
  const [keyItem, setKeyItem] = useState("");
  const [itemName, setItemName] = useState("");
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

  let itemCount = 0;

  // const filters = ["All", "Trench_Cutting_Machine", "Drilling_Machine"];

  const changeDateValue = (e) => {
    setDateValue(e.target.value);
    getChildData({ [title]: e.target.value }, title, "dateTime");
  };

  const getDate = (date) => {
    const dt = new Date(date);
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
    return dt.toISOString().slice(0, 10);
  };

  useEffect(() => {
    if (data && data[data?.length - 1]?.x)
      setDateValue(getDate(data[data?.length - 1]?.x));
  }, [data]);

  const datas = {
    labels: xData,
    datasets: [
      {
        barPercentage: 0.5,
        label: label,
        data: yData,
        backgroundColor: "orange",
      },
    ],
  };

  useEffect(() => {
    console.log(data?.data);
    if (data?.data && data?.data?.length > 0) {
      const array = Object.keys(data?.data[0]);
      let targetArray = [];
      if (array.includes("Machinery_Type")) {
        setKeyItem("Machinery_Type");
        setItemName("Code");
        data?.data.map((item) => {
          targetArray.push(item.Machinery_Type);
          return targetArray;
        });
      } else {
        setKeyItem("Equipment_Type");
        setItemName("Equipment");
        data?.data.map((item) => {
          targetArray.push(item.Equipment_Type);
          return targetArray;
        });
      }
      targetArray = targetArray.filter(
        (value, index, array) => array.indexOf(value) === index
      );
      setItemType(targetArray);
    }
  }, [data]);

  return (
    <div
      className={`md:w-[24%] w-[100%] md:h-[25vh] h-[160px] bg-white rounded-lg flex flex-col p-1 md:mb-0 mb-4 shadow-lg`}
    >
      {isData && (
        <div className="absolute top-[-20px] left-[2.5vw] md:w-[95vw] w-[85vw] h-[80vh] z-[1000] bg-gray-100 rounded-lg shadow-lg">
          <div className="w-full h-full relative flex flex-col p-2">
            <div className="w-full flex items-center justify-center h-[10%]">
              <p className="flex justify-center text-[16px] font-bold">
                {name}
              </p>
            </div>
            {isGraph ? (
              <div className="w-full h-[90%] relative flex justify-center items-center">
                <Bar
                  data={datas}
                  width={"95%"}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        grid: { display: false },
                        ticks: { color: "black" },
                      },
                      y: {
                        grid: { display: false },
                        ticks: { color: "black" },
                        beginAtZero: true,
                      },
                    },
                  }}
                ></Bar>
              </div>
            ) : (
              itemType.length > 0 && (
                <div className="w-full p-2 flex flex-col gap-2 overflow-auto">
                  {itemType.map((item) => (
                    <div key={item}>
                      <div
                        className="bg-white rounded-md cursor-pointer flex flex-row justify-between items-center p-2"
                        id={item}
                        onClick={() => {
                          if (
                            !document
                              .getElementById(item)
                              ?.classList.contains("Active")
                          ) {
                            document
                              .getElementById(item)
                              ?.classList.add("Active");
                          } else {
                            document
                              .getElementById(item)
                              ?.classList.remove("Active");
                          }
                          setActive((prev) => !prev);
                        }}
                      >
                        <p>{item}</p>
                        {<div className=" hidden">{(itemCount = 0)}</div>}
                        {data.data.map((d) => {
                          if (d[keyItem] === item) {
                            itemCount += 1;
                          }
                        })}
                        <div className="flex flex-row items-center gap-4">
                          <div className="bg-orange-500 rounded-lg px-4 py-1 text-white">
                            {itemCount}
                          </div>
                          {document
                            .getElementById(item)
                            ?.classList?.contains("Active") ? (
                            <MdKeyboardArrowUp />
                          ) : (
                            <MdKeyboardArrowDown />
                          )}
                        </div>
                      </div>
                      {document
                        .getElementById(item)
                        ?.classList.contains("Active") &&
                        data?.data.map(
                          (d) =>
                            d[keyItem] === item && (
                              <div className="bg-white p-2" key={item}>
                                <p className=" font-light text-[12px] pl-8">
                                  {d[itemName]}
                                </p>
                              </div>
                            )
                        )}
                    </div>
                  ))}
                </div>
              )
            )}
            <div
              className="absolute right-2 top-2 w-4 h-4 rounded-full cursor-pointer"
              onClick={() => setIsData(false)}
            >
              <MdOutlineCancel />
            </div>
          </div>
        </div>
      )}
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
      <div className=" h-[20%] w-full flex flex-row justify-between items-center">
        <p className=" text-[12px] font-bold pl-2">{name}</p>
        {isFilter && (
          <div className="flex justify-end relative items-center">
            <input
              className="outline-none rounded-lg mr-2 text-[10px]"
              type="date"
              value={
                cardsData && cardsData?.dateTime
                  ? cardsData?.dateTime
                  : dateValue
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
                      onChange={() => {
                        getChildData({ [title]: item }, title, "filter");
                        setIsFilterActive(false);
                      }}
                      checked={
                        cardsData && cardsData?.filter === item ? true : false
                      }
                    />
                    <label htmlFor={item}>{item}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-row h-[80%]">
        <div className=" w-[70%] h-[100%] flex flex-col justify-around">
          <div className="h-[90%] text-[30px] font-bold flex items-center pl-4">
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
                height={30}
                width={200}
              />
            ) : (
              <p
                className={`w-full`}
                style={{
                  color:
                    value.split(" ")[1] === "%"
                      ? Number(value.split(" ")[0]) >= 90
                        ? "green"
                        : Number(value.split(" ")[0]) >= 80
                        ? "orange"
                        : "red"
                      : "black",
                }}
              >
                {value}
              </p>
            )}
          </div>
          {isPer && (
            <div className="h-[10%] text-[16px] font-thin flex flex-row items-center p-2 pb-6">
              {Number(percentage.split(" ")[0]) >= 0 ? (
                <div className="text-green-900 flex flex-row items-center">
                  <BiTrendingUp />
                  <div className="ml-4 text-[12px] flex flex-row gap-2">
                    {`increased by `}
                    <span>
                      {perLoading ? (
                        <ColorRing
                          type="ColorRing"
                          colors={[
                            "rgb(3,73,124)",
                            "rgb(3,73,124)",
                            "rgb(3,73,124)",
                            "rgb(3,73,124)",
                            "rgb(3,73,124)",
                          ]}
                          height={20}
                          width={30}
                        />
                      ) : (
                        <p className="w-full">{percentage}</p>
                      )}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-red-600 flex flex-row items-center">
                  <BiTrendingDown />
                  <p className="ml-4 text-[12px]">
                    {`decreased by `}
                    <span>{percentage}</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <div
          className="w-[30%] h-[100%] flex items-center justify-center cursor-pointer"
          onClick={() => setIsData(true)}
        >
          <SparkLineChart
            className=" bg-slate-500"
            data={[1, 4, 2, 5, 7, 5, 9]}
            curve="natural"
            colors={[logoColor]}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
