import React, { useState } from "react";
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
    return `${hours}:${minutes}`;
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
        className={`md:w-[90%] w-[90%] md:h-[90%] h-[80%] flex flex-col justify-between items-center bg-white relative z-[1001] mainContent overflow-y-scroll`}
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

        <div className="w-full h-full flex flex-col">
          <div className="w-full h-[90%] relative flex justify-center items-center font-[300] p-2">
            <Line
              data={{
                labels: graphData?.Time,
                datasets: [
                  {
                    tension: 0.9,
                    borderColor: "red",
                    borderWidth: 0.5,
                    label: "Depth",
                    data: graphData?.Tiefe,
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
                    data: graphData?.Frdszeit,
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
                        customFormat(Math.ceil(graphData?.Time[val])),
                    },
                  },
                  y: {
                    grid: { display: true, drawTicks: true, tickLength: 10 },
                    ticks: {
                      color: "black",
                      max: Math.max(graphData?.Frdszeit),
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
                labels: graphData?.Time,
                datasets: [
                  {
                    tension: 0.9,
                    borderColor: "blue",
                    borderWidth: 0.5,
                    label: "Druck FRR",
                    data: graphData?.["Druck FRR"],
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
                    data: graphData?.["Druck FRL"],
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
                        max: Math.max(graphData?.["Druck FRR"]),
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
                        customFormat(Math.ceil(graphData?.Time[val])),
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graphs;
