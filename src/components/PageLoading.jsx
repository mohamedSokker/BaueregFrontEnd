import React from "react";
import { ColorRing } from "react-loader-spinner";
import { logoColor } from "../BauerColors";

const PageLoading = ({ message }) => {
  return (
    <div
      className="fixed bg-black opacity-50 w-screen h-screen Header flex flex-col items-center justify-center left-0 top-0"
      style={{ zIndex: "10000000000000000" }}
    >
      <ColorRing
        type="ColorRing"
        // color={logoColor}
        colors={["White", "White", "White", "White", "White"]}
        height={50}
        width={200}
        // className="m-5"
      />
      <p className="text-lg text-center px-2 text-white font-bold">{message}</p>
    </div>
  );
};

export default PageLoading;
