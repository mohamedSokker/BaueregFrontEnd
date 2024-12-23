import React from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { CiFilter } from "react-icons/ci";

const AddSlicer = () => {
  return (
    <div className="w-full p-2">
      <div className="w-full flex flex-row flex-wrap justify-start items-center gap-4 p-1">
        <TooltipComponent content={`Add Slicer`} position="BottomCenter">
          <div className="cursor-pointer">
            <CiFilter size={20} />
          </div>
        </TooltipComponent>
      </div>
    </div>
  );
};

export default AddSlicer;
