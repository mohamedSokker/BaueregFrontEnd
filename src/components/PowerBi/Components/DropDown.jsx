import React, { useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";

const DropDown = ({ label, tableData, handleChange, selectedData }) => {
  //   const [selectedData, setSelectedData] = useState(null);

  return (
    <div className="p-2 flex flex-col justify-center items-center ">
      <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start">{`Select ${label}`}</p>
      <div className={`flex flex-row gap-2 items-center relative`}>
        <select
          className="p-2 w-[30vw] bg-white border-b-1 border-logoColor appearance-none text-[14px]"
          style={{
            color:
              !selectedData || selectedData === ""
                ? "rgb(156 163 175)"
                : "black",
          }}
          //   onClick={handleClick}
          onChange={handleChange}
          value={!selectedData || selectedData === "" ? "" : selectedData}
        >
          <option hidden selected disabled>
            {""}
          </option>
          {tableData &&
            tableData?.map((item, i) => (
              <option key={i} value={item} onClick={handleChange}>
                {item}
              </option>
            ))}
        </select>

        <AiOutlineCaretDown className="absolute right-2" size={14} />
      </div>
    </div>
  );
};

export default DropDown;
