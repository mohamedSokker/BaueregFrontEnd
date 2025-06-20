import React from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { BsCardText } from "react-icons/bs";

const AddCard = () => {
  return (
    <div className="w-full p-2">
      <div className="w-full flex flex-row flex-wrap justify-start items-center gap-2 p-1">
        <TooltipComponent content={`Count Card`} position="BottomCenter">
          <div className="cursor-pointer">
            <BsCardText size={20} />
          </div>
        </TooltipComponent>
        <p className="text-[12px]">Count</p>
      </div>

      <div className="w-full flex flex-row flex-wrap justify-start items-center gap-2 p-1">
        <TooltipComponent
          content={`Count Discrete Card`}
          position="BottomCenter"
        >
          <div className="cursor-pointer">
            <BsCardText size={20} />
          </div>
        </TooltipComponent>
        <p className="text-[12px]">Count Discrete</p>
      </div>

      <div className="w-full flex flex-row flex-wrap justify-start items-center gap-2 p-1">
        <TooltipComponent content={`Total Card`} position="BottomCenter">
          <div className="cursor-pointer">
            <BsCardText size={20} />
          </div>
        </TooltipComponent>
        <p className="text-[12px]">Total</p>
      </div>
    </div>
  );
};

export default AddCard;
