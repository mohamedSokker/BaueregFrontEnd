import React, { useState, useEffect } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import { PieChart, SparkLineChart } from "@mui/x-charts";

import { logoColor } from "../BauerColors";

const DashboardBrekdownCard = ({
  name,
  percentage,
  getChildData,
  cardsData,
  data,
}) => {
  console.log(data);
  const [dateValue, setDateValue] = useState(
    new Date(
      new Date().setMinutes(
        new Date().getMinutes() - new Date().getTimezoneOffset()
      )
    )
      .toISOString()
      .slice(0, 10)
  );
  const [isFilterActive, setIsFilterActive] = useState(false);

  const filters = ["All", "Trench_Cutting_Machine", "Drilling_Machine"];

  const changeDateValue = (e) => {
    setDateValue(e.target.value);
  };
  return (
    <div
      className={`md:w-[49%] w-[100%] h-[100%] bg-white rounded-lg flex flex-col p-1 md:mb-0 mb-4`}
    >
      <div className=" h-[12%] w-full flex flex-row justify-between items-center">
        <p className=" text-[16px] font-bold pl-2">{name}</p>
        <div className="flex justify-end relative">
          <input
            className="outline-none rounded-lg mr-2 text-[12px]"
            type="date"
            value={dateValue}
            onChange={changeDateValue}
          />
          <button
            className="text-[20px]"
            onClick={() => setIsFilterActive((prev) => !prev)}
          >
            <BsFilterLeft />
          </button>
          {isFilterActive && (
            <div className="absolute flex flex-col top-0 -left-[60px] z-10 bg-gray-200 p-2 rounded-md text-[10px]">
              {filters.map((item) => (
                <div key={item}>
                  <input
                    className="mr-2"
                    id={item}
                    name={name}
                    value={item}
                    type="radio"
                    onChange={() => getChildData({ [name]: item }, name)}
                    checked={
                      cardsData && cardsData[name] === item ? true : false
                    }
                  />
                  <label for={item}>{item}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row h-[88%]">
        <div className=" w-[100%] h-[100%] flex flex-col">
          <div className="h-[100%] text-lg font-bold flex items-center pl-4">
            <PieChart
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
                "--ChartsLegend-itemWidth": "30px",
                "--ChartsLegend-itemMarkSize": "10px",
                "--ChartsLegend-labelSpacing": "5px",
                "--ChartsLegend-rootSpacing": "5px",
              }}
            />
          </div>
          {/* <div className="h-[10%] text-[16px] font-thin flex flex-row items-center p-2">
            {percentage >= 0 ? (
              <div className="text-green-900 flex flex-row items-center">
                <BiTrendingUp />
                <p className="ml-4 text-[12px]">
                  {`increased by `}
                  <span>{`${percentage} %`}</span>
                </p>
              </div>
            ) : (
              <div className="text-red-600 flex flex-row items-center">
                <BiTrendingDown />
                <p className="ml-4 text-[12px]">
                  {`decreased by `}
                  <span>{`${Math.abs(percentage)} %`}</span>
                </p>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardBrekdownCard;
