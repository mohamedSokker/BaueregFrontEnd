import React, { useEffect, useRef, useState } from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule";

const Scheduler = ({ item, tableData, data, tablesData }) => {
  const {
    X_Axis,
    Y_Axis,
    Title,
    Description,
    Location,
    StartTime,
    EndTime,
    expressions,
  } = item;

  const [chartData, setChartData] = useState([]);

  const scheduleRef = useRef(null);

  useEffect(() => {
    if (Title.length === 0) return;
    const table = Title?.[0]?.table;
    const result = [];
    tablesData?.[table]?.data?.forEach((v, idx) => {
      const newRow = {
        Id: idx,
        Subject: v?.[Title?.[0]?.name],
        Description: Description?.map((desc) => v?.[desc?.name]).join(", "),
        Location: v?.[Location?.[0]?.name] || "",
        StartTime: new Date(v?.[StartTime?.[0]?.name]),
        EndTime: new Date(v?.[EndTime?.[0]?.name]),
      };
      result.push(newRow);
    });
    setChartData([]); // Clear previous data first
    const newEvents = [...result];
    setChartData(newEvents);
  }, [data, tablesData, Title, Description, Location, StartTime, EndTime]);

  useEffect(() => {
    const scheduler = scheduleRef.current;

    if (scheduler && chartData.length > 0) {
      scheduler.refreshEvents();
    }
  }, [chartData]);
  // const schedularData = [
  //   {
  //     Id: 2,
  //     Subject: "MC 96 #303 (250)",
  //     Description: "Meeting",
  //     Location: "Metro",
  //     StartTime: new Date(2025, 4, 15, 10, 0),
  //     EndTime: new Date(2025, 4, 15, 12, 30),
  //   },
  // ];

  const eventSettings = {
    dataSource: chartData,
    fields: {
      id: "Id",
      subject: { name: "Subject" },
      startTime: { name: "StartTime" },
      endTime: { name: "EndTime" },
    },
  };

  return (
    <div className="w-full h-full min-h-[200px] flex flex-col">
      <ScheduleComponent
        key={JSON.stringify(chartData)}
        ref={scheduleRef}
        rowAutoHeight={true}
        height="100%"
        width="100%"
        selectedDate={new Date()}
        eventSettings={{ dataSource: chartData }}
        currentView="Month"
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
};

export default Scheduler;
