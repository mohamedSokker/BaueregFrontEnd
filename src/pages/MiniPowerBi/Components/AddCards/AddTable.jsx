import React from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { PiTableFill } from "react-icons/pi";

const AddTable = ({ setIsTableSceneCard }) => {
  return (
    <div className="w-full p-2">
      <div className="w-full flex flex-row flex-wrap justify-start items-center gap-4 p-1">
        <TooltipComponent content={`Add Table`} position="BottomCenter">
          <div
            className="cursor-pointer"
            onClick={() => setIsTableSceneCard(true)}
          >
            <PiTableFill size={20} />
          </div>
        </TooltipComponent>
      </div>
    </div>
  );
};

export default AddTable;
