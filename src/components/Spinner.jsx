import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import { logoColor } from "../BauerColors";

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col items-center w-full h-full Header dark:text-white">
      <MagnifyingGlass
        type="MagnifyingGlass"
        color={logoColor}
        height={50}
        width={200}
        className="m-5"
      />
      <p className="text-lg text-center px-2 ">{message}</p>
    </div>
  );
};

export default Spinner;
