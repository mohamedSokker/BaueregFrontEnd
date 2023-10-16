import { useState } from "react";

import { useNavContext } from "../../contexts/NavContext";

const useStates = () => {
  const { token, usersData } = useNavContext();
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
  });

  return {
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
    token,
    usersData,
  };
};

export default useStates;
