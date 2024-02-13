import React from "react";
import { ProgressBar } from "react-loader-spinner";
import { logoColor } from "../BauerColors";

const MainLoading = () => {
  return (
    <ProgressBar
      type="ProgressBar"
      barColor={logoColor}
      borderColor={"orange"}
      height={50}
      width={200}
      className="m-5"
    />
  );
};

export default MainLoading;
