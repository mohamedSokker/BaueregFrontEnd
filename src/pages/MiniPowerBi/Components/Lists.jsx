import React, { useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";

const Lists = ({
  label,
  tableData,
  handleChange,
  selectedData,
  //   setSelectedData,
}) => {
  //   const [selectedData, setSelectedData] = useState(null);

  //   const handleChange = (e) => {
  //     if (e.target.selected === false) {
  //       const result = [...selectedData];
  //       result.push(e.target.value);
  //       setSelectedData(result);
  //     } else if (e.target.selected === true) {
  //       const result = [...selectedData];
  //       result.filter((item) => item !== e.target.value);
  //       setSelectedData(result);
  //     }
  //   };

  return (
    <div className="p-2 flex flex-col justify-center items-center ">
      <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start">{`Select ${label}`}</p>
      <div className={`flex flex-col gap-2 items-center relative`}>
        {tableData &&
          tableData?.map((item, i) => (
            <div key={i} className="w-full flex flex-row gap-2">
              <input
                type="checkbox"
                onChange={(e) => handleChange(e, item)}
                checked={selectedData?.includes(item) ? true : false}
              />
              <p>{item}</p>
            </div>
          ))}

        {/* <AiOutlineCaretDown className="absolute right-2" size={14} /> */}
      </div>
    </div>
  );
};

export default Lists;
