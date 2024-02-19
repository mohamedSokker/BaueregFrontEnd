import React, { useEffect, useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import "../Styles/EditCard.css";

const UsersCard = ({ setIsUsersCard, item }) => {
  const [isCanceled, setIsCanceled] = useState(false);

  return (
    <div
      className="fixed opacity-100 w-screen h-screen flex flex-col items-center justify-center left-0 top-0"
      style={{ zIndex: "1000" }}
    >
      <div
        className="absolute  w-screen h-screen flex flex-col items-center justify-center left-0 top-0 z-[1000]"
        style={{ backdropFilter: "blur(2px)", opacity: 0.8 }}
      ></div>
      <div
        className={`md:w-[36.6%] w-[90%] md:h-[74.5%] h-[80%] flex flex-col justify-start items-center bg-white relative z-[1001] mainContent overflow-y-scroll`}
        style={{
          animation: !isCanceled
            ? "animate-in 0.5s ease-in-out"
            : "animate-out 0.5s ease-in-out",
        }}
      >
        <div className="flex flex-row w-full p-2 px-6 justify-between">
          <div>Users</div>
          <div>
            <TooltipComponent
              content="close"
              position="BottomCenter"
              className="flex items-center"
            >
              <button
                className="hover:cursor-pointer p-2 hover:rounded-full hover:bg-gray-300 aspect-square flex justify-center items-center"
                onClick={() => {
                  setIsCanceled(true);
                  setTimeout(() => {
                    setIsUsersCard(false);
                  }, 500);
                }}
              >
                X
              </button>
            </TooltipComponent>
          </div>
        </div>
        <div className="flex flex-col w-full justify-start items-start">
          {item.pic.map((image, i) => (
            <div
              key={i}
              className="flex flex-row w-full p-2 px-8 gap-4 items-center"
            >
              <img
                src={image.pic}
                className="w-10 h-10 rounded-[4px] border-1 border-gray-300"
              />
              <p className="text-[14px]">{image.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersCard;
