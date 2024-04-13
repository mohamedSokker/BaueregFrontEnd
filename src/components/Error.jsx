import React, { useEffect, useState } from "react";

const Error = ({ data, setErrorData, ind }) => {
  const [isTime, setIsTime] = useState(true);

  useEffect(() => {
    setIsTime(false);
    setTimeout(() => {
      setIsTime(true);
      setTimeout(() => {
        setErrorData((prev) => [...prev.slice(1)]);
      }, 500);
    }, 5000);
  }, []);

  return (
    <div
      className="px-4"
      style={
        !isTime
          ? {
              transform: "translate(0)",
              transition: "all 0.5s ease-in-out",
            }
          : {
              transform: "translate(-100%)",
              transition: "all 0.5s ease-in-out",
            }
      }
    >
      <div className="bg-red-700 p-2 px-8 rounded-md flex flex-col relative justify-center items-center">
        <p className=" text-white">{data}</p>
        <div className=" bg-gray-400 h-[3px] absolute bottom-0 left-0 animate-in-out"></div>
      </div>
    </div>
  );
};

export default Error;
