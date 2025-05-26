import React, { useEffect, useState } from "react";
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
import { MAXCOLOR, MINCOLOR } from "../../Model/model";

const PieChart = ({ tableData, item, data, tablesData }) => {
  const {
    Colors,
    isTooltip,
    isLegend,
    isLabel,
    Y_Axis,
    xFontSize,
    xFontWeight,
    yFontSize,
    yFontWeight,
    name,
    max,
    min,
    expressions,
  } = item;

  const { chartData } = useChartsData({ tableData, item, data, tablesData });

  return (
    <div className="w-full h-full flex flex-col">
      {/* {name && (
        <div className="text-[10px] font-semibold mb-2 text-center">{name}</div>
      )} */}

      <div className="flex-1 w-full h-full">
        {chartData && (
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
              {isTooltip && (
                <Tooltip
                  labelStyle={{ fontSize: "8px" }}
                  itemStyle={{ fontSize: "12px" }}
                  wrapperStyle={{ fontSize: "6px" }}
                  content={<CustomTooltip item={item} />}
                />
              )}
              {isLegend && <Legend />}

              {Y_Axis?.map((item, idx) => (
                <Bar
                  key={item.name}
                  dataKey={item.name}
                  stackId="a"
                  barSize={100}
                  label={
                    isLabel && <CustomBar color={Colors[idx % Colors.length]} />
                  }
                >
                  {chartData.map((entry, index) => {
                    const value = entry[expressions?.[0]?.name]; // Get the current bar's value
                    let color;
                    if (expressions.length > 0) {
                      if (value > max) {
                        color = MAXCOLOR;
                      } else if (value < min) {
                        color = MINCOLOR;
                      } else {
                        color = Colors[idx % Colors.length];
                      }
                    } else {
                      color = Colors[idx % Colors.length];
                    }

                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default PieChart;
