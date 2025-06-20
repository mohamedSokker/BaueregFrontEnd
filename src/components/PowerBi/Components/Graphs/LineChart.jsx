import React, { useEffect, useState } from "react";
import {
  LineChart as LineChart1,
  Line,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useChartsData from "../../Controllers/Graphs/chartsData";
import CustomTooltip from "../../Controllers/Graphs/CustomTooltip";
import { useNavContext } from "../../../../contexts/NavContext";

// import { COLORS } from "../../Model/model";

const LineChart = ({ tableData, item, data, tablesData }) => {
  // const [chartData, setChartData] = useState(null);

  const {
    label,
    value,
    X_Axis,
    Y_Axis,
    count,
    tooltips,
    tooltipProps,
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
    xFontSize,
    xFontWeight,
    yFontSize,
    yFontWeight,
  } = item;
  // console.log(chartData);
  const { chartData } = useChartsData({ tableData, item, data, tablesData });
  const { currentMode } = useNavContext();

  const theme = currentMode === "Dark" ? "rgb(255,255,255)" : "rgb(31,41,55)";

  const DataFormater = (number) => {
    if (number > 1000000000) {
      return (number / 1000000000).toString() + "B";
    } else if (number > 1000000) {
      return (number / 1000000).toString() + "M";
    } else if (number > 1000) {
      return (number / 1000).toString() + "K";
    } else {
      return number.toString();
    }
  };

  // const CustomTooltip = (props) => {
  //   if (props.active && props.payload && props.payload.length) {
  //     // console.log(payload[0]?.payload);
  //     return (
  //       <div className="p-2 bg-white border-1 border-gray-300">
  //         <p className="text-[10px] font-[600]">{`${X_Axis}: ${props.label} `}</p>
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

  // useEffect(() => {
  //   let result = {};
  //   let resultArray = [];
  //   // if (operationType === "Count") {
  //   tableData?.forEach((v) => {
  //     Y_Axis?.map((prop) => {
  //       if (prop?.opType === "Count") {
  //         result[v?.[X_Axis]] = {
  //           ...result[v?.[X_Axis]],
  //           [`${prop?.name}`]:
  //             v?.[prop?.name] !== null && v?.[prop?.name] !== ""
  //               ? (result[v?.[X_Axis]]?.[`${prop?.name}`] || 0) + 1
  //               : (result[v?.[X_Axis]]?.[`${prop?.name}`] || 0) + 0,
  //         };
  //       } else if (prop?.opType === "Sum") {
  //         result[v?.[X_Axis]] = {
  //           ...result[v?.[X_Axis]],
  //           [`${prop?.name}`]:
  //             (result[v?.[X_Axis]]?.[`${prop?.name}`] || 0) +
  //             (Number(v?.[`${prop?.name}`]) || 0),
  //         };
  //       } else if (prop?.opType === "Average") {
  //         result[v?.[X_Axis]] = {
  //           ...result[v?.[X_Axis]],
  //           [`${prop?.name}`]: {
  //             count:
  //               v?.[prop?.name] !== null && v?.[prop?.name] !== ""
  //                 ? (result[v?.[X_Axis]]?.[`${prop?.name}`]?.count || 0) + 1
  //                 : (result[v?.[X_Axis]]?.[`${prop?.name}`]?.count || 0) + 0,
  //             sum:
  //               (result[v?.[X_Axis]]?.[`${prop?.name}`]?.sum || 0) +
  //               (Number(v?.[`${prop?.name}`]) || 0),
  //           },
  //         };
  //       }
  //     });

  //     tooltipProps?.map((prop) => {
  //       if (prop?.opType === "Count") {
  //         result[v?.[X_Axis]] = {
  //           ...result[v?.[X_Axis]],
  //           [`Count Of ${prop?.name}`]:
  //             v?.[prop?.name] !== null && v?.[prop?.name] !== ""
  //               ? (result[v?.[X_Axis]]?.[`Count Of ${prop?.name}`] || 0) + 1
  //               : (result[v?.[X_Axis]]?.[`Count Of ${prop?.name}`] || 0) + 0,
  //         };
  //       } else if (prop?.opType === "Sum") {
  //         result[v?.[X_Axis]] = {
  //           ...result[v?.[X_Axis]],
  //           [`Sum Of ${prop?.name}`]:
  //             (result[v?.[X_Axis]]?.[`Sum Of ${prop?.name}`] || 0) +
  //             (Number(v?.[`${prop?.name}`]) || 0),
  //         };
  //       } else if (prop?.opType === "Average") {
  //         result[v?.[X_Axis]] = {
  //           ...result[v?.[X_Axis]],
  //           [`Average Of ${prop?.name}`]: {
  //             count:
  //               v?.[prop?.name] !== null && v?.[prop?.name] !== ""
  //                 ? (result[v?.[X_Axis]]?.[`Average Of ${prop?.name}`]?.count ||
  //                     0) + 1
  //                 : (result[v?.[X_Axis]]?.[`Average Of ${prop?.name}`]?.count ||
  //                     0) + 0,
  //             sum:
  //               (result[v?.[X_Axis]]?.[`Average Of ${prop?.name}`]?.sum || 0) +
  //               (Number(v?.[`${prop?.name}`]) || 0),
  //           },
  //         };
  //       }
  //     });
  //   });
  //   Object.keys(result).map((key, index) => {
  //     if (tooltipProps?.length > 0) {
  //       let toolTipsObj = {};
  //       let yAxisObj = {};
  //       tooltipProps?.map((prop) => {
  //         if (prop?.opType === "Count") {
  //           toolTipsObj = {
  //             ...toolTipsObj,
  //             [`Count Of ${prop?.name}`]:
  //               result[key]?.[`Count Of ${prop?.name}`],
  //           };
  //         } else if (prop?.opType === "Sum") {
  //           toolTipsObj = {
  //             ...toolTipsObj,
  //             [`Sum Of ${prop?.name}`]: result[key]?.[`Sum Of ${prop?.name}`],
  //           };
  //         } else if (prop?.opType === "Average") {
  //           toolTipsObj = {
  //             ...toolTipsObj,
  //             [`Average Of ${prop?.name}`]:
  //               result[key]?.[`Average Of ${prop?.name}`]?.count &&
  //               result[key]?.[`Average Of ${prop?.name}`]?.count !== 0
  //                 ? Number(
  //                     Number(
  //                       result[key]?.[`Average Of ${prop?.name}`]?.sum /
  //                         result[key]?.[`Average Of ${prop?.name}`]?.count
  //                     ).toFixed(2)
  //                   )
  //                 : 0,
  //           };
  //         }
  //       });

  //       Y_Axis?.map((prop) => {
  //         if (prop?.opType === "Count") {
  //           yAxisObj = {
  //             ...yAxisObj,
  //             [`${prop?.name}`]: result[key]?.[`${prop?.name}`],
  //           };
  //         } else if (prop?.opType === "Sum") {
  //           yAxisObj = {
  //             ...yAxisObj,
  //             [`${prop?.name}`]: result[key]?.[`${prop?.name}`],
  //           };
  //         } else if (prop?.opType === "Average") {
  //           // console.log(result[key]?.[`${prop?.name}`]);
  //           yAxisObj = {
  //             ...yAxisObj,
  //             [`${prop?.name}`]:
  //               result[key]?.[`${prop?.name}`]?.count &&
  //               result[key]?.[`${prop?.name}`]?.count !== 0
  //                 ? Number(
  //                     Number(
  //                       result[key]?.[`${prop?.name}`]?.sum /
  //                         result[key]?.[`${prop?.name}`]?.count
  //                     ).toFixed(2)
  //                   )
  //                 : 0,
  //           };
  //         }
  //       });
  //       resultArray.push({
  //         id: index,
  //         label: key,
  //         name: key,
  //         ...yAxisObj,
  //         ...toolTipsObj,
  //       });
  //       // console.log(resultArray);
  //     } else {
  //       let yAxisObj = {};
  //       Y_Axis?.map((prop) => {
  //         if (prop?.opType === "Count") {
  //           yAxisObj = {
  //             ...yAxisObj,
  //             [`${prop?.name}`]: result[key]?.[`${prop?.name}`],
  //           };
  //         } else if (prop?.opType === "Sum") {
  //           yAxisObj = {
  //             ...yAxisObj,
  //             [`${prop?.name}`]: result[key]?.[`${prop?.name}`],
  //           };
  //         } else if (prop?.opType === "Average") {
  //           yAxisObj = {
  //             ...yAxisObj,
  //             [`${prop?.name}`]:
  //               result[key]?.[`${prop?.name}`]?.count &&
  //               result[key]?.[`${prop?.name}`]?.count !== 0
  //                 ? Number(
  //                     Number(
  //                       result[key]?.[`${prop?.name}`]?.sum /
  //                         result[key]?.[`${prop?.name}`]?.count
  //                     ).toFixed(2)
  //                   )
  //                 : 0,
  //           };
  //         }
  //       });
  //       resultArray.push({
  //         id: index,
  //         label: key,
  //         name: key,
  //         ...yAxisObj,
  //       });
  //     }
  //   });
  //   resultArray.sort((a, b) => {
  //     let sortingSumA = 0;
  //     let sortingSumB = 0;
  //     Y_Axis.map((datakey) => {
  //       sortingSumA += Number(a[datakey?.name]);
  //       sortingSumB += Number(b[datakey?.name]);
  //     });
  //     return sortingSumB - sortingSumA;
  //   });
  //   setChartData(resultArray);
  // }, [tableData, data]);

  return (
    <div className="w-full h-full flex flex-row items-center justify-start">
      {chartData && (
        <ResponsiveContainer
          width={"100%"}
          height={`100%`}
          className="text-[10px]"
        >
          <LineChart1 data={chartData}>
            {/* <CartesianGrid stroke="#f5f5f5" /> */}
            <XAxis
              dataKey="label"
              fontSize={`${xFontSize}px`}
              fontWeight={xFontWeight}
              stroke={theme}
            />
            <YAxis
              tickFormatter={DataFormater}
              fontSize={`${yFontSize}px`}
              fontWeight={yFontWeight}
              stroke={theme}
            />
            {isTooltip && <Tooltip content={<CustomTooltip item={item} />} />}
            {isLegend && <Legend />}

            {isCurveSlicer && (
              <Brush dataKey="label" height={20} stroke={Colors[1]} />
            )}

            {Y_Axis?.map((item, idx) => (
              <Line
                key={idx}
                dataKey={item?.name}
                stroke={Colors[idx % Colors.length]}
                dot={{ r: 2 }}
                activeDot={{ r: 6 }}
                // stackId="a"
                fill={Colors[idx % Colors.length]}
                // barSize={20}
                //   cx={cx}
                //   cy={cy}
              />
            ))}

            {/* {operationType !== "Count" ? (
              datakeys?.map((item, idx) => (
                <Line
                  key={idx}
                  dataKey={item}
                  stroke={Colors[idx % Colors.length]}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                  // stackId="a"
                  fill={Colors[idx % Colors.length]}
                  // barSize={20}
                  //   cx={cx}
                  //   cy={cy}
                />
              ))
            ) : (
              <Line
                dataKey={`value`}
                // stackId="a"
                fill={`#8884d8`}
                stroke="#8884d8"
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
                strokeWidth={1}
                // barSize={20}
              />
            )} */}

            {/* <Bar dataKey="oilCons" stackId="a" fill="#82ca9d" barSize={20} />
            <Bar dataKey="prod" stackId="a" fill="#AE4F46" barSize={20} /> */}
          </LineChart1>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default LineChart;
