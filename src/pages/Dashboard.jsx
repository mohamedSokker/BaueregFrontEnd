import React from "react";
import { BarChart, SparkLineChart } from "@mui/x-charts";

const Dashboard = () => {
  return (
    <div className="w-full h-screen Main--Page justify-center items-center">
      <div className="w-full flex-[1/5] flex-row">
        <div className="flex-[1/4]">
          <SparkLineChart data={[1, 4, 2, 5, 7, 2, 4, 6]} />
        </div>
        <div className="flex-[1/4]"></div>
        <div className="flex-[1/4]"></div>
        <div className="flex-[1/4]"></div>
      </div>
      <div className="w-full flex=[3/5]"></div>
      <div className="w-full flex-[1/5]"></div>
    </div>
  );
};

export default Dashboard;
