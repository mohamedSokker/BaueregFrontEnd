import React, { useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import { SparkLineChart } from "@mui/x-charts";
import { ColorRing } from "react-loader-spinner";
// import { BarChart } from "@mui/x-charts";
// import {
//   ChartComponent,
//   SeriesCollectionDirective,
//   SeriesDirective,
//   Inject,
//   Legend,
//   Category,
//   Tooltip,
//   DataLabel,
//   ColumnSeries,
//   BarSeries,
// } from "@syncfusion/ej2-react-charts";
import {
  Chart as Chartjs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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
  xData,
  yData,
  label,
  isGraph,
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

  const filters = ["All", "Trench_Cutting_Machine", "Drilling_Machine"];

  const changeDateValue = (e) => {
    setDateValue(e.target.value);
    getChildData({ [title]: e.target.value }, title, "dateTime");
  };

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
  // const primaryxAxis = {
  //   minimum: 2023,
  //   maximum: 2024,
  //   interval: 1,
  //   title: "Year",
  // };
  // const primaryyAxis = {
  //   title: "Percentage",
  //   labelFormat: "{value}%",
  // };
  return (
    <div
      className={`md:w-[24%] w-[100%] md:h-[25vh] h-[160px] bg-white rounded-lg flex flex-col p-1 md:mb-0 mb-4 shadow-lg`}
    >
      {isData && (
        <div className="absolute top-[50px] left-[10%] md:w-[50vw] w-[85vw] h-[70vh] z-[1000] bg-gray-100 rounded-lg shadow-lg">
          <div
            className="w-full h-full relative flex flex-col p-2"
            onClick={() => setIsData(false)}
          >
            <div className="w-full flext items-center justify-center h-[10%]">
              <p className="flex justify-center text-[16px] font-bold">
                {name}
              </p>
            </div>
            {isGraph && (
              <Bar
                data={datas}
                options={{
                  scales: {
                    x: { grid: { display: false }, ticks: { color: "black" } },
                    y: {
                      grid: { display: false },
                      ticks: { color: "black" },
                      beginAtZero: true,
                    },
                  },
                }}
              ></Bar>
            )}

            {/* <ChartComponent
              id="charts"
              // primaryXAxis={barPrimaryXAxis}
              // primaryYAxis={barPrimaryYAxis}
              chartArea={{ border: { width: 0 } }}
              tooltip={{ enable: true }}
              height="70%"
              // background={currentMode === "Dark" ? "#33373E" : "#fff"}
              legendSettings={{ background: "white" }}
            >
              <Inject
                services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]}
              />
              <SeriesCollectionDirective>
                <SeriesDirective
                  dataSource={data}
                  xName="x"
                  yName="y"
                  type="Column"
                />
              </SeriesCollectionDirective>
            </ChartComponent> */}
            {/* <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: xData,
                  categoryGapRatio: 0.9,
                  barGapRatio: 0.1,
                },
              ]}
              series={[{ data: yData }]}
              // width={350}
              // height={300}
            /> */}
            <div className="absolute right-2 top-2 w-4 h-4 rounded-full cursor-pointer">
              <MdOutlineCancel />
            </div>
          </div>
        </div>
      )}
      <div className=" h-[20%] w-full flex flex-row justify-between items-center">
        <p className=" text-[12px] font-bold pl-2">{name}</p>
        <div className="flex justify-end relative items-center">
          <input
            className="outline-none rounded-lg mr-2 text-[10px]"
            type="date"
            value={
              cardsData && cardsData?.dateTime ? cardsData?.dateTime : dateValue
            }
            onChange={changeDateValue}
          />
          <button
            className="text-[20px]"
            onClick={() => setIsFilterActive((prev) => !prev)}
          >
            <BsFilterLeft />
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
              <p className="w-full">{value}</p>
            )}
          </div>
          <div className="h-[10%] text-[16px] font-thin flex flex-row items-center p-2 pb-6">
            {percentage >= 0 ? (
              <div className="text-green-900 flex flex-row items-center">
                <BiTrendingUp />
                <p className="ml-4 text-[12px] flex flex-row gap-2">
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
                      <p className="w-full">{`${percentage} %`}</p>
                    )}
                  </span>
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
          </div>
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
