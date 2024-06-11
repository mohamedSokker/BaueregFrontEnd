import React, { useEffect, useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Line } from "react-chartjs-2";
import {
  Chart as Chartjs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

Chartjs.register(LineElement, CategoryScale, LinearScale, PointElement);

const Graphs = ({ setIsGraph, graphData, label }) => {
  const [isCanceled, setIsCanceled] = useState(false);
  console.log(graphData);

  const customFormat = (anyTime) => {
    let seconds = (anyTime % 60).toString();
    let minutes = Math.floor((anyTime / 60) % 60).toString();
    let hours = Math.floor(anyTime / 3600).toString();
    if (hours.length === 1) hours = `0${hours}`;
    if (minutes.length === 1) minutes = `0${minutes}`;
    if (seconds.length === 1) seconds = `0${seconds}`;
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div
      className="fixed opacity-100 w-screen h-screen flex flex-col items-center justify-center left-0 top-0"
      style={{ zIndex: "1000" }}
    >
      <div
        className="absolute  w-screen h-screen flex flex-col items-center justify-center left-0 top-0 z-[1000]"
        style={{ backdropFilter: "blur(2px)", opacity: 0.5 }}
      ></div>
      <div
        className={`md:w-[98%] w-[98%] md:h-[90%] h-[80%] flex flex-col justify-between items-center bg-white relative z-[1001] mainContent overflow-y-scroll`}
        style={{
          animation: !isCanceled
            ? "animate-in 0.5s ease-in-out"
            : "animate-out 0.5s ease-in-out",
        }}
      >
        <div className="flex flex-row w-full p-2 px-6 justify-between">
          <div>
            <TooltipComponent
              content="close"
              position="BottomCenter"
              className="flex items-center"
            >
              <button
                className="hover:cursor-pointer p-2 rounded-full bg-gray-300 hover:bg-gray-400 aspect-square flex justify-center items-center"
                onClick={() => {
                  setIsCanceled(true);
                  setTimeout(() => {
                    setIsGraph(false);
                  }, 500);
                }}
              >
                X
              </button>
            </TooltipComponent>
          </div>
        </div>

        <div className="w-full h-full flex flex-col overflow-y-scroll">
          <div className="w-full min-h-[50%] relative flex flex-row justify-center items-center font-[300] p-2">
            <div className="flex flex-col flex-1 h-full border-r-[1px] border-gray-300 px-6">
              {Object.keys(graphData.headers).map(
                (item, i) =>
                  i < Object.keys(graphData.headers).length / 2 && (
                    <div
                      key={i}
                      className="w-full flex flex-row justify-between flex-1 text-[14px]"
                    >
                      <p className="w-[70%] flex justify-start text-red-600">{`${item} : `}</p>
                      <p className="w-[30%] flex justify-start text-blue-700">{`${graphData.headers[item]}`}</p>
                    </div>
                  )
              )}
            </div>
            <div className="flex flex-col flex-1 h-full px-6">
              {Object.keys(graphData.headers).map(
                (item, i) =>
                  i >= Object.keys(graphData.headers).length / 2 && (
                    <div
                      key={i}
                      className="w-full flex flex-row justify-between flex-1 text-[14px]"
                    >
                      <p className="w-[70%] flex justify-start text-red-600">{`${item} : `}</p>
                      <p className="w-[30%] flex justify-start text-blue-700">{`${graphData.headers[item]}`}</p>
                    </div>
                  )
              )}
            </div>
          </div>
          {Object.keys(graphData?.items)?.map((item, i) => (
            <div
              key={i}
              className={`w-full min-h-[50%] relative flex justify-center items-center font-[300] p-2`}
            >
              <Line
                data={{
                  labels: graphData?.data?.Time,
                  datasets: graphData?.items[item],
                }}
                width={"100%"}
                options={{
                  animation: false,
                  plugins: { legend: true },
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: { display: true },
                      ticks: {
                        color: "black",
                        autoSkip: true,
                        maxTicksLimit: 35,
                        callback: (val) =>
                          customFormat(Math.ceil(graphData?.data?.Time[val])),
                      },
                    },
                    y: {
                      grid: { display: true, drawTicks: true, tickLength: 10 },
                      ticks: {
                        color: "black",
                        // max: Math.max(graphData?.data?.[item?.name]),
                        //   autoSkip: true,
                        maxTicksLimit: 40,
                        stepSize: 2,
                        //   count: 40,
                      },
                      //   beginAtZero: true,
                    },
                  },
                }}
              ></Line>
            </div>
          ))}
          {/* <div className="w-full h-[90%] relative flex justify-center items-center font-[300] p-2">
            <Line
              data={{
                labels: graphData?.data?.Time,
                datasets: [
                  {
                    tension: 0.9,
                    borderColor: "red",
                    borderWidth: 0.5,
                    label: "Depth",
                    data: graphData?.data?.Tiefe,
                    pointStyle: "cross",
                    pointRadius: 0.1,
                    pointBorderColor: "red",
                    // backgroundColor: "orange",
                  },
                  {
                    tension: 0.9,
                    borderColor: "blue",
                    borderWidth: 0.5,
                    label: "Frdszeit",
                    data: graphData?.data?.Frdszeit,
                    pointStyle: "cross",
                    pointRadius: 0.1,
                    pointBorderColor: "blue",
                    // backgroundColor: "orange",
                  },
                ],
              }}
              width={"95%"}
              options={{
                plugins: { legend: true },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: { display: true },
                    ticks: {
                      color: "black",
                      autoSkip: true,
                      maxTicksLimit: 35,
                      callback: (val) =>
                        customFormat(Math.ceil(graphData?.data?.Time[val])),
                    },
                  },
                  y: {
                    grid: { display: true, drawTicks: true, tickLength: 10 },
                    ticks: {
                      color: "black",
                      max: Math.max(graphData?.data?.Frdszeit),
                      //   autoSkip: true,
                      maxTicksLimit: 40,
                      stepSize: 2,
                      //   count: 40,
                    },
                    //   beginAtZero: true,
                  },
                },
              }}
            ></Line>
          </div>

          <div className="w-full h-[90%] relative flex justify-center items-center font-[300] p-2">
            <Line
              data={{
                labels: graphData?.data?.Time,
                datasets: [
                  {
                    tension: 0.9,
                    borderColor: "blue",
                    borderWidth: 0.5,
                    label: "Druck FRR",
                    data: graphData?.data?.["Druck FRR"],
                    pointStyle: "cross",
                    pointRadius: 0.1,
                    pointBorderColor: "blue",
                    // backgroundColor: "orange",
                  },
                  {
                    tension: 0.9,
                    borderColor: "red",
                    borderWidth: 0.5,
                    label: "Druck FRL",
                    data: graphData?.data?.["Druck FRL"],
                    pointStyle: "cross",
                    pointRadius: 0.1,
                    pointBorderColor: "red",
                  },
                ],
              }}
              width={"95%"}
              options={{
                plugins: { legend: true },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  XAxis: [
                    {
                      type: "time",
                      time: {
                        unit: "minute",
                        unitStepSize: 60,
                      },
                      ticks: {
                        max: Math.max(graphData?.data?.["Druck FRR"]),
                      },
                    },
                  ],
                  x: {
                    grid: { display: true },
                    ticks: {
                      color: "black",
                      autoSkip: true,
                      maxTicksLimit: 35,
                      callback: (val) =>
                        customFormat(Math.ceil(graphData?.data?.Time[val])),
                    },
                  },
                  y: {
                    grid: { display: true },
                    ticks: {
                      color: "black",
                      autoSkip: true,
                      maxTicksLimit: 40,
                      count: 40,
                    },
                    //   beginAtZero: true,
                  },
                },
              }}
            ></Line>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Graphs;
