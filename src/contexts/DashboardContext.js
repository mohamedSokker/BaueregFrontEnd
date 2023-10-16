import React, { useContext, createContext, useState } from "react";

const DashboardContext = createContext();

export const DashboardContextProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");
  const [fieldsLoading, setFieldsLoading] = useState({
    Availability: true,
    FuelConsumption: true,
    OilConsumption: true,
    ProductionTrench: true,
    ProductionPiles: true,
    Breakdowns: true,
    PeriodicMaintenance: true,
  });
  const [fieldsPerLoading, setFieldsPerLoading] = useState({
    Availability: true,
    FuelConsumption: true,
    OilConsumption: true,
    ProductionTrench: true,
    ProductionPiles: true,
    Breakdowns: true,
    PeriodicMaintenance: true,
  });
  const [cardsData, setCardsData] = useState([]);
  const [fieldsData, setFieldsData] = useState({
    Availability: 0,
    FuelConsumption: 0,
    OilConsumption: 0,
    ProductionTrench: 0,
    ProductionPiles: 0,
    Breakdowns: [],
    PeriodicMaintenance: [],
  });
  const [fieldsAllData, setFieldsAllData] = useState({
    Availability: [],
    FuelConsumption: [],
    OilConsumption: [],
    ProductionTrench: [],
    ProductionPiles: [],
  });
  const [fieldsXData, setFieldsXData] = useState({
    Availability: [],
    FuelConsumption: [],
    OilConsumption: [],
    ProductionTrench: [],
    ProductionPiles: [],
  });
  const [fieldsYData, setFieldsYData] = useState({
    Availability: [],
    FuelConsumption: [],
    OilConsumption: [],
    ProductionTrench: [],
    ProductionPiles: [],
  });
  const [fieldsPerData, setFieldsPerData] = useState({
    Availability: 0,
    FuelConsumption: 0,
    OilConsumption: 0,
    ProductionTrench: 0,
    ProductionPiles: 0,
    Breakdowns: [],
    PeriodicMaintenance: [],
    ProductionTrench: 0,
    ProductionPiles: 0,
  });
  const [realTime, setRealTime] = useState(false);
  const [count, setCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  return (
    <DashboardContext.Provider
      value={{
        error,
        setError,
        errorDetails,
        setErrorDetails,
        fieldsLoading,
        setFieldsLoading,
        fieldsPerLoading,
        setFieldsPerLoading,
        cardsData,
        setCardsData,
        fieldsData,
        setFieldsData,
        fieldsAllData,
        setFieldsAllData,
        fieldsXData,
        setFieldsXData,
        fieldsYData,
        setFieldsYData,
        fieldsPerData,
        setFieldsPerData,
        realTime,
        setRealTime,
        count,
        setCount,
        messages,
        setMessages,
        currentMessage,
        setCurrentMessage,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
