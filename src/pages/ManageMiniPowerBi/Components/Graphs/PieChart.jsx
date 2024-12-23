import React, { useEffect, useState } from "react";
import {
  PieChart as Pie1Chart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// import { COLORS } from "../../Model/model";

const PieChart = ({ tableData, item, data }) => {
  const [chartData, setChartData] = useState(null);

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
  } = item;
  // console.log(chartData);

  useEffect(() => {
    let result = {};
    let resultArray = [];
    if (operationType === "Count") {
      tableData?.forEach((v) => {
        result[v?.[label]] = (result[v?.[label]] || 0) + 1;
      });
      Object.keys(result).map((key, index) => {
        resultArray.push({
          id: index,
          label: key,
          name: key,
          value: result[key],
        });
      });
      resultArray.sort((a, b) => b.value - a.value);
      resultArray = resultArray.slice(0, count);
      setChartData(resultArray);
    } else if (operationType === "Sum") {
      tableData?.forEach((v) => {
        result[v?.[label]] = (result[v?.[label]] || 0) + v?.[value];
      });
      Object.keys(result).map((key, index) => {
        resultArray.push({
          id: index,
          label: key,
          name: key,
          value: result[key],
        });
      });
      resultArray.sort((a, b) => b.value - a.value);
      resultArray = resultArray.slice(0, count);
      setChartData(resultArray);
    } else if (operationType === "Average") {
      tableData?.forEach((v) => {
        result[v?.[label]] = {
          sum: (result[v?.[label]]?.sum || 0) + v?.[value],
          count: (result[v?.[label]]?.count || 0) + 1,
        };
      });
      console.log(result);
      Object.keys(result).map((key, index) => {
        resultArray.push({
          id: index,
          label: key,
          name: key,
          value:
            result[key]?.count && result[key]?.count !== 0
              ? Number((result[key]?.sum / result[key]?.count).toFixed(2))
              : 0,
        });
      });
      resultArray.sort((a, b) => b.value - a.value);
      resultArray = resultArray.slice(0, count);
      setChartData(resultArray);
    }
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
              label
              cx={cx}
              cy={cy}
              outerRadius={outerRadius}
              innerRadius={innerRadius}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={Colors[index % Colors.length]}
                />
              ))}
            </Pie>
            {isTooltip && (
              <Tooltip
                labelStyle={{ fontSize: "8px" }}
                itemStyle={{ fontSize: "12px" }}
                wrapperStyle={{ fontSize: "6px" }}
              />
            )}

            {isLegend && (
              <Legend
                verticalAlign="top"
                // width={100}
                // height={40}
                fontSize={"10px"}
              />
            )}
          </Pie1Chart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PieChart;
