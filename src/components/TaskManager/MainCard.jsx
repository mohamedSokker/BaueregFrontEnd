import React from "react";

import Card from "./Card";

const MainCard = ({ titleBorderColor, title, id, stores }) => {
  return (
    <div className="flex flex-col justify-start items-start min-w-[300px] h-[98%] bg-gray-300 rounded-md p-1 border-1 border-gray-400 ">
      <div className="w-full flex flex-row justify-start items-center gap-[6px] mb-2 px-1">
        <div
          className="w-4 h-4 rounded-full border-2 bg-gray-200"
          style={{ borderColor: titleBorderColor }}
        ></div>
        <div className="text-black font-[800] text-[16px]">{title}</div>
        <div className="bg-gray-100 px-1 rounded-full text-gray-600 text-[12px] font-[800] flex justify-center items-center">
          {stores[id].length}
        </div>
      </div>
      <div className="w-full h-full overflow-y-scroll">
        <Card id={id} items={stores[id]} />
      </div>
    </div>
  );
};

export default MainCard;
