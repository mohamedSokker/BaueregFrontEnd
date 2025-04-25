import React, { useState } from "react";

const PropretyCardSkelton = ({ handleDrop }) => {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <div
      className={
        showDrop
          ? `w-full h-[25px]  px-2 flex flex-row items-center justify-center bg-gray-200 opacity-40 border-gray-500 border rounded-md relative text-[10px]`
          : `w-full h-[4px] flex flex-row items-center justify-center opacity-0 text-[10px]`
      }
      style={{
        borderWidth: showDrop ? "1px" : "0px",
        borderColor: showDrop ? "rgb(107,114,128)" : "transparent",
        borderStyle: showDrop ? "dashed" : "none",
        // transition: "all 0.2s ease-in-out",
      }}
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={(e) => {
        handleDrop(e);
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
    ></div>
  );
};

export default PropretyCardSkelton;
