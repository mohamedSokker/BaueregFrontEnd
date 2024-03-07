import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiClock1 } from "react-icons/ci";
// import { ResponsiveChartContainer } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  PieChart as Pie1Chart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { storeModel } from "../Model/model";

const COLORS = [
  "#156E84",
  "#88D3E5",
  "#AE4F46",
  "#CD8880",
  "#A39547",
  "#CFC99D",
  "#3AAE61",
  "#96D6AB",
  "#613A67",
  "#7F608F",
];

const JSONtoStore = (store) => {
  let result = { ...storeModel };
  store.map((item) => {
    result = {
      ...result,
      [item.category]: [...result[item.category], item],
    };
  });
  return result;
};

const addHours = (anyDate, hours) => {
  const dt = new Date(anyDate);
  const milliseconds = dt.getTime();
  const milliseconds2 = milliseconds + 1000 * 60 * 60 * (hours + 2);
  return new Date(milliseconds2);
};

const MainCard = ({ workshop, stores, copiedStores, jsonStores }) => {
  const [isMin, setIsMin] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [data, setData] = useState([]);
  const [noOfTasks, setNoOfTasks] = useState(0);
  const [eqs, setEqs] = useState([]);
  const [eqDates, setEqDates] = useState({});

  useEffect(() => {
    const result = jsonStores.filter(
      (item) => item.workshop === `${workshop} Workshop`
    );

    const doneTasks = result.filter((item) => item.category === "Done");
    result.length > 0
      ? setPercentage(Math.round((doneTasks.length / result.length) * 100))
      : setPercentage(0);

    const objectStore = JSONtoStore(result);
    let taskNo = 0;
    let eqsArray = [];
    let dates = {};
    Object.keys(objectStore).map((title, index) => {
      taskNo += objectStore[title].length;
      setNoOfTasks(taskNo);
      setData((prev) => [
        ...prev,
        {
          id: index,
          label: title,
          name: title,
          value: objectStore[title].length,
        },
      ]);
      objectStore[title].map((item) => {
        if (item?.eq && item?.eq !== "") {
          eqsArray.push(item?.eq);
          dates[item.eq] = dates[item.eq]
            ? item.start && item.start !== ""
              ? [...dates[item.eq], addHours(item.start, 0)]
              : [...dates[item.eq]]
            : item.start && item.start !== ""
            ? [addHours(item.start, 0)]
            : [];
          dates[item.eq] = dates[item.eq]
            ? item.end && item.end !== ""
              ? [...dates[item.eq], addHours(item.end, 0)]
              : [...dates[item.eq]]
            : item.end && item.end !== ""
            ? [addHours(item.end, 0)]
            : [];
          dates[item.eq] = dates[item.eq]
            ? item.start &&
              item.start !== "" &&
              (!item.end || item.end === "") &&
              item.duration &&
              item.duration !== ""
              ? [...dates[item.eq], addHours(item.start, item.duration)]
              : [...dates[item.eq]]
            : item.start &&
              item.start !== "" &&
              (!item.end || item.end === "") &&
              item.duration &&
              item.duration !== ""
            ? [addHours(item.start, item.duration)]
            : [];
        }
      });
    });
    let newDates = {};
    Object.keys(dates).map((d) => {
      newDates[d] = {
        start:
          dates[d] && dates[d].length > 0
            ? new Date(Math.min.apply(null, dates[d]))
                .toISOString()
                .slice(0, 16)
            : `Empty`,
        end:
          dates[d] && dates[d].length > 0
            ? new Date(Math.max.apply(null, dates[d]))
                .toISOString()
                .slice(0, 16)
            : `Empty`,
      };
    });
    console.log(newDates);
    setEqDates(newDates);
    eqsArray = Array.from(new Set(eqsArray));
    setEqs(eqsArray);
  }, []);

  return (
    <>
      {!isMin ? (
        <div
          className="h-full min-w-[350px] bg-gray-300 flex flex-col justify-start items-start p-1 rounded-md border-1 border-gray-400 flex-1"
          style={{ transition: "all 0.5s ease-in-out" }}
        >
          <div className="w-full flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-center gap-[6px] mb-2 px-1">
              <div
                className="w-4 h-4 rounded-full border-2 bg-gray-200"
                style={{ borderColor: "green" }}
              ></div>
              <div className="text-black font-[800] text-[14px]">
                {`${workshop} Workshop`}
              </div>
            </div>
            <div className="mb-2 px-1 flex flex-row items-center gap-[6px]">
              <div
                className="hover:cursor-pointer"
                onClick={() => setIsMin((prev) => !prev)}
              >
                <MdKeyboardArrowLeft size={20} />
              </div>
            </div>
          </div>
          <div className="w-full h-full overflow-y-scroll">
            <div className="w-full h-full flex flex-col gap-1">
              <div className="w-full h-full flex flex-col gap-2 bg-gray-100 rounded-md border-1 border-gray-400 p-2">
                <div className="w-full flex flex-row gap-2 justify-between items-center text-gray-600">
                  {`No of Tasks: ${noOfTasks}`}
                </div>
                <div className="w-full font-[600]">
                  <h4>{`Tasks Percentage: ${percentage} %`}</h4>
                </div>
                {Object.keys(eqDates).map((eq, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-start w-full text-gray-400"
                  >
                    <div className="text-[12px] font-[500]">{`Equipment: ${eq}`}</div>
                    <div className="flex flex-row w-full justify-between">
                      <div className="flex flex-row gap-1 items-center">
                        <CiClock1 />
                        <p className="text-[10px]">{`Start: ${
                          eqDates[eq]?.start !== "Empty"
                            ? new Date(eqDates[eq]?.start).toLocaleDateString()
                            : "Empty"
                        } ${
                          eqDates[eq]?.start !== "Empty"
                            ? new Date(eqDates[eq]?.start).toLocaleTimeString()
                            : ""
                        }`}</p>
                      </div>
                      <div className="flex flex-row gap-1 items-center">
                        <CiClock1 />
                        <p className="text-[10px]">{`End: ${
                          eqDates[eq]?.end !== "Empty"
                            ? new Date(eqDates[eq]?.end).toLocaleDateString()
                            : "Empty"
                        } ${
                          eqDates[eq]?.end !== "Empty"
                            ? new Date(eqDates[eq]?.end).toLocaleTimeString()
                            : ""
                        }`}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="w-full flex flex-row gap-2 flex-wrap justify-start">
                  {eqs.map((eq) => (
                    <div className=" px-2 rounded-full border-1 border-blue-600 text-[12px] text-blue-600 bg-[rgba(37,99,235,0.3)] font-[500]">
                      {eq}
                    </div>
                  ))}
                </div>
                <div className="w-full h-full flex flex-row justify-start items-center text-[12px] flex-wrap">
                  <ResponsiveContainer width={"100%"} height={`90%`}>
                    <Pie1Chart>
                      <Pie
                        dataKey={`value`}
                        data={data}
                        label
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                      >
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="top" height={50} fontSize={200} />
                    </Pie1Chart>
                    {/* <PieChart
                      //   margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
                      slotProps={{
                        legend: {
                          //   hidden: true,
                          //   direction: "row",
                          //   //   itemMarkWidth: 8,
                          //   //   itemMarkHeight: 2,
                          //   //   markGap: 5,
                          //   //   itemGap: 10,
                          //   position: { vertical: "top", horizontal: "middle" },
                          //   padding: 0,
                        },
                      }}
                      colors={COLORS}
                      series={[
                        {
                          data: data,
                          paddingAngle: 5,
                          cornerRadius: 5,
                          startAngle: -90,
                          endAngle: 180,
                        },
                      ]}
                      sx={{
                        "--ChartsLegend-itemWidth": "8px",
                        "--ChartsLegend-itemMarkSize": "10px",
                        "--ChartsLegend-labelSpacing": "5px",
                        "--ChartsLegend-rootSpacing": "5px",
                        "--ChartsLegend-rootOffsetX": "10px",
                        "--ChartsLegend-rootOffsetY": "0px",
                      }}
                    >
                      <Legend />
                    </PieChart> */}
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col justify-start items-center gap-8  h-full bg-gray-300 rounded-md p-1 border-1 border-gray-400 md:min-w-[30px]"
          style={{ transition: "all 0.5s ease-in-out" }}
        >
          <div
            className="hover:cursor-pointer"
            onClick={() => setIsMin((prev) => !prev)}
          >
            <MdKeyboardArrowRight size={20} />
          </div>
          <div
            className="text-black font-[800] text-[16px]"
            style={{ writingMode: "vertical-lr" }}
          >
            {`${workshop} Workshop`}
          </div>
          <div
            className="w-4 h-4 rounded-full border-2 bg-gray-200"
            style={{ borderColor: "green" }}
          ></div>
        </div>
      )}
    </>
  );
};

export default MainCard;
