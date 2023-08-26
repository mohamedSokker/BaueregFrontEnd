import React, { useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import { SparkLineChart } from "@mui/x-charts";

import { logoColor } from "../BauerColors";

const DashboardCard = ({
  name,
  value,
  percentage,
  getChildData,
  cardsData,
}) => {
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
      className={`md:w-[24%] w-[100%] md:h-[100%] h-[160px] bg-white rounded-lg flex flex-col p-1 md:mb-0 mb-4`}
    >
      <div className=" h-[20%] w-full flex flex-row justify-between">
        <p className=" text-[12px] font-bold pl-2">{name}</p>
        <div className="flex justify-end relative">
          <input
            className="outline-none rounded-lg mr-2 text-[10px]"
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
      <div className="flex flex-row h-[80%]">
        <div className=" w-[70%] h-[100%] flex flex-col justify-around">
          <div className="h-[90%] text-[36px] font-bold flex items-center pl-4">
            {value}
          </div>
          <div className="h-[10%] text-[16px] font-thin flex flex-row items-center p-2 pb-6">
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
          </div>
        </div>
        <div className="w-[30%] h-[100%] flex items-center justify-center ">
          <SparkLineChart
            className=" bg-slate-500"
            data={[1, 4, 2, 5, 7, 5, 9]}
            curve="natural"
            colors={[logoColor]}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
