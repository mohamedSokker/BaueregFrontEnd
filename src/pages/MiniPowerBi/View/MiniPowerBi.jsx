import React from "react";
import { useNavContext } from "../../../contexts/NavContext";

const MiniPowerBi = () => {
  const { closeSmallSidebar, usersData } = useNavContext();
  return (
    <div
      className="w-full bg-gray-100 rounded-xl h-[100%] Main--Content flex flex-col items-start justify-start dark:bg-background-logoColor"
      onClick={closeSmallSidebar}
    ></div>
  );
};

export default MiniPowerBi;
