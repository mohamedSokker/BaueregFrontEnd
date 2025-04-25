import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import useChartsData from "../../Controllers/Graphs/chartsData";
import CustomTooltip from "../../Controllers/Graphs/CustomTooltip";
import CustomBar from "../../Controllers/Graphs/CustomBar";
import { DataFormater } from "../../Services/FormatNumbers";

const PieChart = ({ tableData, item, data, tablesData }) => {
  const {
    X_Axis,
    value,
    tooltips,
    tooltipProps,
    count,
    operationType,
    outerRadius,
    innerRadius,
    Colors,
    cx,
    cy,
    isTooltip,
    isLegend,
    isLabel,
    Y_Axis,
    xFontSize,
    xFontWeight,
    yFontSize,
    yFontWeight,
    legendFontSize,
    legendFontWeight,
    name,
  } = item;

  const { chartData } = useChartsData({ tableData, item, data, tablesData });

  // const DataFormater = (number) => {
  //   if (number >= 1000000000) {
  //     return (number / 1000000000).toString() + "B";
  //   } else if (number >= 1000000) {
  //     return (number / 1000000).toString() + "M";
  //   } else if (number >= 1000) {
  //     return (number / 1000).toString() + "K";
  //   } else {
  //     return number.toString();
  //   }
  // };

  return (
    // <div className="w-full h-full flex flex-col">
    //   <p
    //     className="w-full text-center py-1 text-[10px]"
    //     style={{ flexGrow: 0, flexShrink: 0 }}
    //   >
    //     {name}
    //   </p>
    //   <div
    //     className="flex-grow"
    //     style={{
    //       flexGrow: 1,
    //       display: "flex",
    //       justifyContent: "center",
    //     }}
    //   >
    chartData && (
      <ResponsiveContainer
        width={"100%"}
        height={`100%`}
        className="text-[10px]"
      >
        <BarChart data={chartData}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="label"
            fontSize={`${xFontSize}px`}
            fontWeight={xFontWeight}
          />
          <YAxis
            tickFormatter={DataFormater}
            fontSize={`${yFontSize}px`}
            fontWeight={yFontWeight}
          />
          {isTooltip && <Tooltip content={<CustomTooltip item={item} />} />}
          {isLegend && <Legend />}

          {Y_Axis?.map((item, idx) => (
            <Bar
              key={idx}
              dataKey={item?.name}
              stackId="a"
              fill={Colors[idx % Colors.length]}
              barSize={100}
              label={
                isLabel && <CustomBar color={Colors[idx % Colors.length]} />
              }
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    )
    //   </div>
    // </div>
  );
};

export default PieChart;
