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
    datakeys,
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
      //   resultArray.sort((a, b) => b.value - a.value);
      //   resultArray = resultArray.slice(0, count);
      setChartData(resultArray);
    } else if (operationType === "Sum") {
      tableData?.forEach((v) => {
        datakeys?.map((datakey, idx) => {
          result[v?.[label]] = {
            ...result[v?.[label]],
            [datakey]:
              (result[v?.[label]]?.[datakey] || 0) + (v?.[datakey] || 0),
          };
        });
      });
      console.log(result);
      let keysData = {};
      Object.keys(result).map((key, index) => {
        keysData = {};
        datakeys?.map((datakey, idx) => {
          keysData[datakey] = result?.[key]?.[datakey];
        });
        resultArray.push({
          id: index,
          label: key,
          name: key,
          ...keysData,
        });
      });
      console.log(resultArray);
      //   resultArray.sort((a, b) => b.value - a.value);
      //   resultArray = resultArray.slice(0, count);
      setChartData(resultArray);
    } else if (operationType === "Average") {
      tableData?.forEach((v) => {
        datakeys?.map((datakey, idx) => {
          result[v?.[label]] = {
            sum: {
              ...result[v?.[label]]?.sum,
              [datakey]:
                (result[v?.[label]]?.sum?.[datakey] || 0) + (v?.[datakey] || 0),
            },
            count: {
              ...result[v?.[label]]?.count,
              [datakey]: (result[v?.[label]]?.count?.[datakey] || 0) + 1,
            },
          };
        });
        // result[v?.[label]] = {
        //   sum: (result[v?.[label]]?.sum || 0) + v?.[value],
        //   count: (result[v?.[label]]?.count || 0) + 1,
        // };
      });
      console.log(result);
      let keysData = {};
      Object.keys(result).map((key, index) => {
        keysData = {};
        datakeys?.map((datakey, idx) => {
          keysData[datakey] =
            result?.[key]?.count?.[datakey] &&
            result?.[key]?.count?.[datakey] !== 0
              ? Number(
                  (
                    result[key]?.sum?.[datakey] / result[key]?.count?.[datakey]
                  ).toFixed(2)
                )
              : 0;
        });
        resultArray.push({
          id: index,
          label: key,
          name: key,
          ...keysData,
          //   value:
          //     result[key]?.count && result[key]?.count !== 0
          //       ? Number((result[key]?.sum / result[key]?.count).toFixed(2))
          //       : 0,
        });
      });
      //   resultArray.sort((a, b) => b.value - a.value);
      //   resultArray = resultArray.slice(0, count);
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
          <BarChart data={chartData}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="label" />
            <YAxis />
            {isTooltip && <Tooltip />}
            {isLegend && <Legend />}

            {operationType !== "Count" ? (
              datakeys?.map((item, idx) => (
                <Bar
                  key={idx}
                  dataKey={item}
                  stackId="a"
                  fill={Colors[idx % Colors.length]}
                  barSize={20}
                  //   cx={cx}
                  //   cy={cy}
                />
              ))
            ) : (
              <Bar
                dataKey={`value`}
                stackId="a"
                fill={Colors[0]}
                barSize={20}
              />
            )}

            {/* <Bar dataKey="oilCons" stackId="a" fill="#82ca9d" barSize={20} />
            <Bar dataKey="prod" stackId="a" fill="#AE4F46" barSize={20} /> */}
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PieChart;
