import React from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { PiGauge, PiTableFill } from "react-icons/pi";
import { BsCardText } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";

import {
  FcBarChart,
  FcPieChart,
  FcDoughnutChart,
  FcLineChart,
  FcAreaChart,
  FcComboChart,
  FcTimeline,
} from "react-icons/fc";
import {
  barOptions,
  cardOptions,
  gaugeOptions,
  lineOptions,
  pieOptions,
  schedulerOptions,
  slicerOptions,
  tablesOptions,
  timelineOptions,
} from "../../Model/model";

const AddGraph = ({
  setIsPieChartCard,
  setIsTableSceneCard,
  setIsBarChartCard,
  setIsSlicerCard,
  setIsCard,
  setIsTimeline,
  setIsGauge,
  setIsLineChart,
  data,
  setData,
}) => {
  return (
    <div className="w-full p-1">
      <div className="w-full border-[1px] border-gray-400 flex flex-row flex-wrap justify-center items-center gap-4 p-1">
        <TooltipComponent content={`Bar Chart`} position="BottomCenter">
          <div
            className="cursor-pointer"
            // onClick={() => setIsBarChartCard(true)}
            onClick={() => {
              // const container = document.getElementById("Main-Area");
              // const containerStyles = window.getComputedStyle(container);
              const currentData = {
                ID: data.el?.length,
                ...JSON.parse(JSON.stringify(barOptions)),
                width: `${
                  ((data.containerStyles.scale * 200) /
                    parseFloat(data.containerStyles.width)) *
                  100
                }%`,
                height: `${
                  ((data.containerStyles.scale * 200) /
                    parseFloat(data.containerStyles.height)) *
                  100
                }%`,
              };
              setData((prev) => ({
                ...prev,
                el: [...prev?.el, { ...currentData }],
                // containerStyles: containerStyles,
              }));
            }}
          >
            <FcBarChart size={20} />
          </div>
        </TooltipComponent>

        <TooltipComponent content={`Timeline`} position="BottomCenter">
          <div
            className="cursor-pointer"
            // onClick={() => setIsTimeline(true)}
            onClick={() => {
              // const container = document.getElementById("Main-Area");
              // const containerStyles = window.getComputedStyle(container);
              const currentData = {
                ID: data.el?.length,
                ...JSON.parse(JSON.stringify(timelineOptions)),
                width: `${
                  ((data.containerStyles.scale * 200) /
                    parseFloat(data.containerStyles.width)) *
                  100
                }%`,
                height: `${
                  ((data.containerStyles.scale * 200) /
                    parseFloat(data.containerStyles.height)) *
                  100
                }%`,
              };
              setData((prev) => ({
                ...prev,
                el: [...prev?.el, { ...currentData }],
                // containerStyles: containerStyles,
              }));
            }}
          >
            <FcTimeline size={20} />
          </div>
        </TooltipComponent>

        <TooltipComponent content={`Pie Chart`} position="BottomCenter">
          <div
            className="cursor-pointer"
            // onClick={() => setIsPieChartCard(true)}
            onClick={() => {
              // const container = document.getElementById("Main-Area");
              // const containerStyles = window.getComputedStyle(container);
              const currentData = {
                ID: data.el?.length,
                ...JSON.parse(JSON.stringify(pieOptions)),
                width: `${
                  ((data.containerStyles.scale * 200) /
                    parseFloat(data.containerStyles.width)) *
                  100
                }%`,
                height: `${
                  ((data.containerStyles.scale * 200) /
                    parseFloat(data.containerStyles.height)) *
                  100
                }%`,
              };
              setData((prev) => ({
                ...prev,
                el: [...prev?.el, { ...currentData }],
                // containerStyles: containerStyles,
              }));
            }}
          >
            <FcPieChart size={20} />
          </div>
        </TooltipComponent>

        {/* <TooltipComponent content={`Doughnut Chart`} position="BottomCenter">
          <div className="cursor-pointer">
            <FcDoughnutChart size={20} />
          </div>
        </TooltipComponent> */}

        <TooltipComponent content={`Line Chart`} position="BottomCenter">
          <div
            className="cursor-pointer"
            // onClick={() => setIsLineChart(true)}
            onClick={() => {
              // const container = document.getElementById("Main-Area");
              // const containerStyles = window.getComputedStyle(container);
              const currentData = {
                ID: data.el?.length,
                ...JSON.parse(JSON.stringify(lineOptions)),
                width: `${
                  ((data.containerStyles.scale * 200) /
                    parseFloat(data.containerStyles.width)) *
                  100
                }%`,
                height: `${
                  ((data.containerStyles.scale * 200) /
                    parseFloat(data.containerStyles.height)) *
                  100
                }%`,
              };
              setData((prev) => ({
                ...prev,
                el: [...prev?.el, { ...currentData }],
                // containerStyles: containerStyles,
              }));
            }}
          >
            <FcLineChart size={20} />
          </div>
        </TooltipComponent>

        {/* <TooltipComponent content={`Area Chart`} position="BottomCenter">
          <div className="cursor-pointer">
            <FcAreaChart size={20} />
          </div>
        </TooltipComponent>

        <TooltipComponent content={`Combo Chart`} position="BottomCenter">
          <div className="cursor-pointer">
            <FcComboChart size={20} />
          </div>
        </TooltipComponent> */}

        <TooltipComponent content={`Guage`} position="BottomCenter">
          <div
            className="cursor-pointer"
            // onClick={() => setIsGauge(true)}
            onClick={() => {
              // const container = document.getElementById("Main-Area");
              // const containerStyles = window.getComputedStyle(container);
              const currentData = {
                ID: data.el?.length,
                ...JSON.parse(JSON.stringify(gaugeOptions)),
                width: `${
                  ((data.containerStyles.scale * 200) /
                    parseFloat(data.containerStyles.width)) *
                  100
                }%`,
                height: `${
                  ((data.containerStyles.scale * 200) /
                    parseFloat(data.containerStyles.height)) *
                  100
                }%`,
              };
              setData((prev) => ({
                ...prev,
                el: [...prev?.el, { ...currentData }],
                // containerStyles: containerStyles,
              }));
            }}
          >
            <PiGauge size={20} />
          </div>
        </TooltipComponent>

        <TooltipComponent content={`Add Table`} position="BottomCenter">
          <div
            className="cursor-pointer"
            // onClick={() => setIsTableSceneCard(true)}
            onClick={() => {
              // const container = document.getElementById("Main-Area");
              // const containerStyles = window.getComputedStyle(container);
              const currentData = {
                ID: data.el?.length,
                ...JSON.parse(JSON.stringify(tablesOptions)),
                width: `${
                  ((data.containerStyles.scale * 200) /
                    parseFloat(data.containerStyles.width)) *
                  100
                }%`,
                height: `${
                  ((data.containerStyles.scale * 200) /
                    parseFloat(data.containerStyles.height)) *
                  100
                }%`,
              };
              setData((prev) => ({
                ...prev,
                el: [...prev?.el, { ...currentData }],
                // containerStyles: containerStyles,
              }));
            }}
          >
            <PiTableFill size={20} />
          </div>
        </TooltipComponent>

        <TooltipComponent content={`Card`} position="BottomCenter">
          <div
            className="cursor-pointer"
            // onClick={() => setIsCard(true)}
            onClick={() => {
              // const container = document.getElementById("Main-Area");
              // const containerStyles = window.getComputedStyle(container);
              const currentData = {
                ID: data.el?.length,
                ...JSON.parse(JSON.stringify(cardOptions)),
                width: `${
                  ((data.containerStyles.scale * 200) /
                    parseFloat(data.containerStyles.width)) *
                  100
                }%`,
                height: `${
                  ((data.containerStyles.scale * 200) /
                    parseFloat(data.containerStyles.height)) *
                  100
                }%`,
              };
              setData((prev) => ({
                ...prev,
                el: [...prev?.el, { ...currentData }],
                // containerStyles: containerStyles,
              }));
            }}
          >
            <BsCardText size={20} />
          </div>
        </TooltipComponent>

        <TooltipComponent content={`Slicer`} position="BottomCenter">
          <div
            className="cursor-pointer"
            // onClick={() => setIsSlicerCard(true)}
            onClick={() => {
              // const container = document.getElementById("Main-Area");
              // const containerStyles = window.getComputedStyle(container);
              const currentData = {
                ID: data.el?.length,
                ...JSON.parse(JSON.stringify(slicerOptions)),
                width: `${
                  ((data.containerStyles.scale * 200) /
                    parseFloat(data.containerStyles.width)) *
                  100
                }%`,
                height: `${
                  ((data.containerStyles.scale * 200) /
                    parseFloat(data.containerStyles.height)) *
                  100
                }%`,
              };
              setData((prev) => ({
                ...prev,
                el: [...prev?.el, { ...currentData }],
                // containerStyles: containerStyles,
              }));
            }}
          >
            <CiFilter size={20} />
          </div>
        </TooltipComponent>
        <TooltipComponent content={`Scheduler`} position="BottomCenter">
          <div
            className="cursor-pointer"
            // onClick={() => setIsSlicerCard(true)}
            onClick={() => {
              // const container = document.getElementById("Main-Area");
              // const containerStyles = window.getComputedStyle(container);
              const currentData = {
                ID: data.el?.length,
                ...JSON.parse(JSON.stringify(schedulerOptions)),
                width: `${
                  ((data.containerStyles.scale * 200) /
                    parseFloat(data.containerStyles.width)) *
                  100
                }%`,
                height: `${
                  ((data.containerStyles.scale * 200) /
                    parseFloat(data.containerStyles.height)) *
                  100
                }%`,
              };
              setData((prev) => ({
                ...prev,
                el: [...prev?.el, { ...currentData }],
                // containerStyles: containerStyles,
              }));
            }}
          >
            <SlCalender size={20} />
          </div>
        </TooltipComponent>
      </div>
    </div>
  );
};

export default AddGraph;
