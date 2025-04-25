import React, { useEffect, useState } from "react";
import {
  PieChart as Pie1Chart,
  Pie,
  ResponsiveContainer,
  Cell,
  Label,
} from "recharts";

// import { COLORS } from "../../Model/model";

const GaugeChart = ({ tableData, item, data }) => {
  const [chartData, setChartData] = useState(null);

  const {
    label,
    Y_Axis,
    value,
    operationType,
    cx,
    cy,
    min,
    max,
    threshold,
    unit,
    outerRadius,
  } = item;
  console.log(chartData);

  useEffect(() => {
    let result = {};
    let resultArray = [];
    let total = 0;
    if (Y_Axis?.[0]?.opType === "Count") {
      tableData?.map((row) => {
        total += 1;
      });
      resultArray = [
        {
          id: 1,
          label: Y_Axis?.[0].name,
          name: Y_Axis?.[0].name,
          value: total,
        },
        {
          id: 2,
          label: Y_Axis?.[0].name,
          name: Y_Axis?.[0].name,
          value: total < max ? max - total : 0,
        },
      ];
    } else if (Y_Axis?.[0]?.opType === "Sum") {
      tableData?.map((row) => {
        total += row?.[Y_Axis?.[0].name];
      });
      resultArray = [
        {
          id: 1,
          label: Y_Axis?.[0].name,
          name: Y_Axis?.[0].name,
          value: total,
        },
        {
          id: 2,
          label: Y_Axis?.[0].name,
          name: Y_Axis?.[0].name,
          value: total < max ? max - total : 0,
        },
      ];
    } else if (Y_Axis?.[0]?.opType === "Average") {
      let sum = 0;
      let count = 0;
      tableData?.map((row) => {
        sum += row?.[Y_Axis?.[0].name];
        count += 1;
      });
      console.log(sum);
      total = count && count > 0 ? Number(sum / count).toFixed(2) : 0;
      resultArray = [
        {
          id: 1,
          label: Y_Axis?.[0].name,
          name: Y_Axis?.[0].name,
          value: Number(total),
        },
        {
          id: 2,
          label: Y_Axis?.[0].name,
          name: Y_Axis?.[0].name,
          value: total < Number(max) ? Number(max) - total : 0,
        },
      ];
    }
    setChartData(resultArray);
  }, [tableData, data]);

  return (
    <div className="w-full h-full flex flex-row items-center justify-start">
      {chartData && (
        <ResponsiveContainer
          width={"100%"}
          height={`100%`}
          className="text-[10px]"
        >
          <Pie1Chart>
            <Pie
              dataKey={`value`}
              data={chartData}
              //   label={label}
              startAngle={180}
              endAngle={0}
              innerRadius="60%"
              labelLine={false}
              blendStroke
              // isAnimationActive={false}
              stroke="none"
              fill="none"
              cx={cx}
              cy={cy}
            >
              <Cell
                fill={
                  chartData?.[0]?.value / Number(max) >
                  Number(parseInt(threshold, 10)) / 100
                    ? "red"
                    : "green"
                }
              />
              <Cell fill="yellow" />
            </Pie>
            <text
              x={cx}
              y={`${parseInt(cy, 10) - 2}%`}
              style={{
                fontSize: "16px",
                fontWeight: "800",
                fill:
                  chartData?.[0]?.value / Number(max) >
                  Number(parseInt(threshold, 10)) / 100
                    ? "red"
                    : "green",
              }}
              width={200}
              scaleToFit={true}
              textAnchor="middle"
              verticalAnchor="middle"
            >
              {/* {`${chartData?.[0]?.value} ${unit}`} */}
              {chartData?.[0]?.value > 1000000
                ? `${(chartData?.[0]?.value / 1000000)?.toFixed(1)}M ${unit}`
                : chartData?.[0]?.value > 1000
                ? `${(chartData?.[0]?.value / 1000)?.toFixed(1)}K ${unit}`
                : `${Number(chartData?.[0]?.value)?.toFixed(1)} ${unit}`}
            </text>

            <text
              x={`${parseInt(cx, 10) - parseInt(outerRadius, 10) / 2}%`}
              y={`${parseInt(cy, 10) + 7}%`}
              style={{
                fontSize: "10px",
                fontWeight: "600",
                fill: "green",
              }}
              width={200}
              scaleToFit={true}
              textAnchor="middle"
              verticalAnchor="middle"
            >
              {min}
            </text>

            <text
              x={`${parseInt(cx, 10) + parseInt(outerRadius, 10) / 2}%`}
              y={`${parseInt(cy, 10) + 7}%`}
              style={{
                fontSize: "10px",
                fontWeight: "600",
                fill: "red",
              }}
              width={200}
              scaleToFit={true}
              textAnchor="middle"
              verticalAnchor="middle"
            >
              {Number(max) > 1000000
                ? `${(Number(max) / 1000000)?.toFixed(1)}M`
                : Number(max) > 1000
                ? `${(Number(max) / 1000)?.toFixed(1)}K`
                : `${Number(max)?.toFixed(1)}`}
            </text>
          </Pie1Chart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default GaugeChart;
