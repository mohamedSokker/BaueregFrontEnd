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
  } = item;

  const { chartData } = useChartsData({ tableData, item, data, tablesData });

  return (
    <div className="w-full h-full flex flex-col">
      {/* {name && (
        <div className="text-[10px] font-semibold mb-2 text-center">{name}</div>
      )} */}

      <div className="flex-1">
        {chartData && (
          <ResponsiveContainer
            width={"100%"}
            height={`100%`}
            className="text-[10px]"
          >
            <BarChart data={chartData} title="Name">
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
        )}
      </div>
    </div>
  );
};

export default PieChart;
