import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  // TooltipPositionerMap,
  // ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "chartjs-adapter-date-fns";

// import { useCurrentYearStartAndEndDates } from "../../Services/userCurrentYearStartAndEndDates";
// import { formatDateInLocal } from "../../Services/formattedDate";
import { useEffect, useState } from "react";
import { COLORS } from "../../Model/model";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  TimeScale
);

// To track cursor position
// interface CustomTooltip extends TooltipPositionerMap {
//   custom: (
//     elements: unknown,
//     eventPosition: { x: string; y: string }
//   ) => { x: string; y: string };
// }

Tooltip.positioners.custom = (_elements, eventPosition) => {
  return {
    x: eventPosition.x,
    y: eventPosition.y,
  };
};

function GanttChart({ tableData, item, data }) {
  // const { startDate, endDate } = useCurrentYearStartAndEndDates();

  const [ganttData, setGanttData] = useState([]);
  const [minDate, setMinDate] = useState(new Date("2020-01-01"));
  const [maxDate, setMaxDate] = useState(new Date("2050-01-01"));
  const [containerHeight, setContainerHeight] = useState(400); // State for container height

  const {
    label,
    value,
    count,
    operationType,
    outerRadius,
    innerRadius,
    Colors,
    cx,
    cy,
    isTooltip,
    isLegend,
    isCurveSlicer,
    datakeys,
    start,
    end,
    category,
    barHeight,
  } = item;

  const formatDateToString = (date) => {
    if (!date || !(date instanceof Date) || isNaN(date)) {
      return "2020-01-01"; // or return a default date string
    }

    const year = date?.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year.toString()}-${month}-${day}`;
  };

  useEffect(() => {
    if (!tableData || !Array.isArray(tableData)) {
      return;
    }

    let result = [];
    let min = new Date("2020-01-01");
    let max = new Date("2050-01-01");

    tableData?.map((item, i) => {
      result.push({
        x: [
          formatDateToString(new Date(item?.[start]?.toString())),
          item?.[end] === null
            ? formatDateToString(new Date())
            : formatDateToString(new Date(item?.[end]?.toString())),
        ],
        y: item?.[label],
        EventName: item?.[category],
      });
      if (i === 0) {
        // setMinDate(formatDateToString(new Date(item?.[start]?.toString())));
        // setMaxDate(formatDateToString(new Date(item?.[end]?.toString())));
        min = new Date(item?.[start]);
        max = new Date(item?.[end]);
      } else {
        if (item?.[start] === null) {
          min = new Date("2020-01-01");
        } else {
          if (
            new Date(item?.[start]) < min &&
            new Date(item?.[start]) > new Date("1910-01-01")
          ) {
            min = new Date(item?.[start]);
          }
        }

        if (item?.[end] === null) {
          max = new Date();
        } else {
          if (new Date(item?.[end]) > max) {
            max = new Date(item?.[end]);
          }
        }
      }
    });
    // const containerBody = document.getElementById("containerBody");
    // const totalLabels = result.length;
    // if (totalLabels > 7) {
    //   const newHeight = 400 + (totalLabels - 7) * 50;
    //   containerBody.style.height = `${Math.min(newHeight, barHeight)}px`; // Limit height to 1000px
    //   // containerBody.style.height =
    //   //   newHeight > 20000 ? `${newHeight / 10}px` : `${newHeight / 6}px`;
    // }
    // result = result.slice(0, 10);
    setMinDate(formatDateToString(min));
    setMaxDate(formatDateToString(max));
    setGanttData(result);
    setContainerHeight(barHeight);
  }, [tableData, data]);

  useEffect(() => {
    const containerBody = document.getElementById("containerBody");
    if (containerBody) {
      containerBody.style.height = `${containerHeight}px`;
    }
  }, [containerHeight]);

  const chartData = {
    labels: [],
    datasets: [
      {
        label: "",
        data: ganttData,
        backgroundColor: COLORS,
        // [
        //   "rgba(225, 26, 104, 0.8)",
        //   "rgba(54, 162, 235, 0.8)",
        //   "rgba(255, 206, 86, 0.8)",
        //   "rgba(74, 192, 200, 0.8)",
        // ]
        borderColor: COLORS,
        // [
        //   "rgba(225, 26, 104, 0.3)",
        //   "rgba(54, 162, 235, 0.3)",
        //   "rgba(255, 206, 86, 0.3)",
        //   "rgba(74, 192, 200, 0.3)",
        // ]
        borderWidth: 1,
        borderSkipped: false,
        borderRadius: 0,
        barPercentage: 0.9,
        // barThickness: barHeight,
      },
    ],
  };

  const baseOptions = {
    indexAxis: "y",
    hight: "100%",
    overflow: "scroll",
    maintainAspectRatio: false,
    scales: {
      x: {
        position: "top",
        type: "time",
        time: {
          unit: "year",
        },
        min: minDate,
        max: maxDate,
        stacked: true,
        // display: false,
      },
      y: {
        stacked: true,
        ticks: {
          callback: function (val, index) {
            // Hide every 2nd tick label
            return this.getLabelForValue(val)?.length > 18
              ? `${this.getLabelForValue(val)?.slice(0, 18)}...`
              : this.getLabelForValue(val);
          },
          font: { size: 10, weight: 900 },
        },
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
          threshold: 10,
        },
        zoom: {
          enabled: true,
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
          limits: {
            x: { min: minDate, max: maxDate },
            y: { min: 0, max: ganttData.length },
          },
        },
      },
      tooltip: {
        callbacks: {
          label(tooltipItem) {
            const label = tooltipItem.label;
            return ``;
          },
          title(tooltipItems) {
            const event = tooltipItems[0].raw.EventName;
            const startDate = new Date(tooltipItems[0].raw.x[0]);
            const endDate = new Date(tooltipItems[0].raw.x[1]);
            const Entity = tooltipItems[0].label;
            return [
              `${category}: ${event}`,
              `Start Date: ${formatDateToString(startDate)}`,
              `End Date: ${formatDateToString(endDate)}`,
              `${label} : ${Entity}`,
            ];
          },
        },
        position: "custom",
        enabled: isTooltip ? true : false,
      },
      legend: {
        display: isLegend ? true : false,
      },
      title: {
        display: false,
      },
      datalabels: {
        labels: {
          index: {
            color: "#1c1c1c",
            // backgroundColor: "rgba(255,255,255, 0.1)",
            align: "right",
            anchor: "start",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            font: { size: 12, weight: 400, lineHeight: 1.7 },
            // formatter(value) {
            //   // const startDate = new Date(value?.x?.[0]);
            //   // const endDate = new Date(value?.x?.[1]);
            //   return value.EventName?.length > 3
            //     ? `${value.EventName?.slice(0, 3)}...`
            //     : value.EventName;
            //   // +
            //   // "\n" +
            //   // formatDateInLocal(startDate) +
            //   // " - " +
            //   // formatDateInLocal(endDate)
            // },
            formatter: (value, context) => {
              const barWidth = context.chart.getDatasetMeta(
                context.datasetIndex
              ).data[context.dataIndex].width;
              const maxChars = Math.floor(barWidth / 12); // Adjust divisor based on font size
              return value.EventName?.length > maxChars
                ? `${value.EventName.slice(0, maxChars)}`
                : value.EventName;
            },
          },
        },
      },
    },
  };

  // console.log(chartData);
  // console.log(baseOptions);

  return (
    <div
      className="max-h-[200px] h-[200px] w-full"
      // className="h-[200px] w-full overflow-auto"
      id="container"
    >
      <div id="containerBody" className="w-full">
        <Bar data={chartData} options={baseOptions} />
      </div>
      {/* <h4>Timeline</h4> */}
    </div>
  );
}

export default GanttChart;
