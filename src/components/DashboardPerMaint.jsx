import React, { useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { ColorRing } from "react-loader-spinner";

const DashboardPerMaint = ({
  name,
  title,
  getChildData,
  cardsData,
  data,
  loading,
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
    getChildData({ [title]: e.target.value }, title, "dateTime");
  };

  return (
    <div
      className={`md:w-[99%] w-[100%] h-[100%] bg-white rounded-lg flex flex-col p-1 md:mb-0 mb-4 shadow-lg`}
    >
      <div className=" h-[12%] w-full flex flex-row justify-between items-center">
        <p className=" text-[16px] font-bold pl-2">{name}</p>
        <div className="flex justify-end relative">
          <input
            className="outline-none rounded-lg mr-2 text-[12px]"
            type="date"
            value={
              cardsData && cardsData?.dateTime ? cardsData?.dateTime : dateValue
            }
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
                    onChange={() =>
                      getChildData({ [title]: item }, title, "filter")
                    }
                    checked={
                      cardsData && cardsData?.filter === item ? true : false
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
          <div className="h-[100%] text-lg font-bold flex items-center justify-center pl-4">
            {loading ? (
              <ColorRing
                type="ColorRing"
                colors={[
                  "rgb(3,73,124)",
                  "rgb(3,73,124)",
                  "rgb(3,73,124)",
                  "rgb(3,73,124)",
                  "rgb(3,73,124)",
                ]}
                height={50}
                width={200}
              />
            ) : (
              <ScheduleComponent
                height="100%"
                eventSettings={{ dataSource: data }}
                selectedDate={
                  cardsData && cardsData?.dateTime
                    ? cardsData?.dateTime
                    : dateValue
                }
              >
                <Inject
                  services={[
                    Day,
                    Week,
                    WorkWeek,
                    Month,
                    Agenda,
                    Resize,
                    DragAndDrop,
                  ]}
                />
              </ScheduleComponent>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPerMaint;
