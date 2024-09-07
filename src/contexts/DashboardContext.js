import React, { useContext, createContext, useState } from "react";

const DashboardContext = createContext();

export const DashboardContextProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState([]);

  return (
    <DashboardContext.Provider
      value={{
        dashboardData,
        setDashboardData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
