import React from "react";

const Error = ({ errorData, error }) => {
  return errorData?.map((data, i) => (
    <div
      className="bg-red-700 p-2 px-8 rounded-md flex flex-col relative justify-center items-center"
      key={i}
    >
      <p className=" text-white">{data}</p>
      {error && (
        <div className=" bg-gray-400 h-[3px] absolute bottom-0 left-0 animate-in-out"></div>
      )}
    </div>
  ));
};

export default Error;
