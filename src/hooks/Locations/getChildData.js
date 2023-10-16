import { useDashboardContext } from "../../contexts/DashboardContext";

const useChildData = () => {
  const { setCardsData } = useDashboardContext();
  const getChildData = (field, name, type) => {
    setCardsData((prev) => ({
      ...prev,
      [name]: { ...prev[name], [type]: field[name] },
    }));
  };
  return { getChildData };
};

export default useChildData;
