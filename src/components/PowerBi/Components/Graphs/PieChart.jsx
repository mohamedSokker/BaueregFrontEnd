import React, { useEffect, useState } from "react";
import {
  PieChart as Pie1Chart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import useChartsData from "../../Controllers/Graphs/chartsData";
import CustomTooltip from "../../Controllers/Graphs/CustomTooltip";

// import { COLORS } from "../../Model/model";

const PieChart = ({ tableData, item, data, tablesData }) => {
  // const [chartData, setChartData] = useState(null);

  const {
    X_Axis,
    Y_Axis,
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
    xFontSize,
    xFontWeight,
    yFontSize,
    yFontWeight,
  } = item;
  // console.log(chartData);

  const { chartData } = useChartsData({ tableData, item, data, tablesData });

  const CustomLegend = ({ payload }) => (
    <ul className="flex flex-col gap-2 text-xs text-gray-600 w-full">
      {payload.map((entry, index) => (
        <li
          key={`legend-item-${index}`}
          className="flex items-center gap-2 truncate"
        >
          <span
            className="inline-block w-3 h-3"
            style={{ backgroundColor: Colors[index % Colors.length] }}
          ></span>
          <span title={entry.value} className="truncate">
            {entry.label}
          </span>
        </li>
      ))}
    </ul>
  );

  // const CustomTooltip = (props) => {
  //   if (props.active && props.payload && props.payload.length) {
  //     return (
  //       <div className="p-2 bg-white border-1 border-gray-300">
  //         <p className="text-[10px] font-[600]">{`${X_Axis}: ${props.payload[0]?.name} `}</p>
  //         {Y_Axis?.map((item) => (
  //           <p
  //             key={item?.name}
  //             className="text-[10px] font-[600]"
  //           >{`${`${item?.name}`}: ${
  //             props.payload[0]?.payload?.[`${item?.name}`]
  //           }`}</p>
  //         ))}
  //         {tooltipProps?.map((item) => (
  //           <p key={item?.name} className="text-[10px] font-[600]">
  //             {item?.opType === "Count"
  //               ? `${`Count Of ${item?.name}`}: ${
  //                   props.payload[0]?.payload?.[`Count Of ${item?.name}`]
  //                 }`
  //               : item?.opType === "Sum"
  //               ? `${`Sum Of ${item?.name}`}: ${
  //                   props.payload[0]?.payload?.[`Sum Of ${item?.name}`]
  //                 }`
  //               : `${`Average Of ${item?.name}`}: ${
  //                   props.payload[0]?.payload?.[`Average Of ${item?.name}`]
  //                 }`}
  //           </p>
  //         ))}
  //       </div>
  //     );
  //   }

  //   return null;
  // };

  const DataFormater = (number) => {
    if (number > 1000000000) {
      return (number / 1000000000).toFixed(1) + "B";
    } else if (number > 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number > 1000) {
      return (number / 1000).toFixed(1) + "K";
    } else {
      return number.toFixed(1);
    }
  };

  const CustomPieLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    value,
    index,
  }) => {
    // Calculate the position of the label inside the segment
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5; // Position the label inside the segment
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <foreignObject x={x - 10} y={y - 10} width={30} height={20}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(209, 213, 217, 1)", // Light background for better visibility
            color: "black", // Dark text for contrast
            fontSize: "10px",
            fontWeight: "bold",
            borderRadius: "4px", // Rounded corners
            padding: "2px",
            textAlign: "center",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Optional: Add a subtle shadow
          }}
        >
          {`${DataFormater(value)}`}
        </div>
      </foreignObject>
    );
  };

  return (
    <div className="w-full h-full flex flex-row items-center justify-start">
      {chartData && Y_Axis[0]?.name && (
        <div className="w-full h-full flex items-center gap-4 mt-2 overflow-hidden">
          <div className={` h-full ${isLegend ? "w-[70%]" : "w-full"}`}>
            <ResponsiveContainer
              width={"100%"}
              height={`100%`}
              className="text-[10px]"
            >
              <Pie1Chart>
                <Pie
                  dataKey={`${Y_Axis[0]?.name}`}
                  data={chartData}
                  label={isLabel && <CustomPieLabel />}
                  cx={cx}
                  cy={cy}
                  outerRadius={outerRadius}
                  innerRadius={innerRadius}
                  fontSize={`${yFontSize}px`}
                  fontWeight={yFontWeight}
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
                    content={<CustomTooltip item={item} />}
                  />
                )}

                {/* {isLegend && (
                  <Legend
                    verticalAlign="top"
                    // width={100}
                    // height={40}
                    fontSize={"10px"}
                  />
                )} */}
              </Pie1Chart>
            </ResponsiveContainer>
          </div>
          {/* Scrollable Legend - Right Side */}
          {isLegend && (
            <div
              className="w-[30%] h-[calc(100%-20px)] overflow-y-auto pr-1 py-4 place-content-center"
              style={{ scrollbarWidth: "none" }}
            >
              <CustomLegend payload={chartData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PieChart;
