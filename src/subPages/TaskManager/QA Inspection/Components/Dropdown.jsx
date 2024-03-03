import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

import { AiOutlineCaretDown } from "react-icons/ai";

const Dropdown = ({
  handleChange,
  handleClick,
  datas,
  datasLoading,
  value,
}) => {
  return (
    <div className="flex flex-row justify-start items-center">
      <div className={`flex flex-row gap-2 items-center relative`}>
        <select
          className="w-[250px] px-2 bg-white border-b-1 border-gray-400 focus:border-red-400 text-black outline-none appearance-none"
          style={{ color: datas.length === 0 ? "rgb(156 163 175)" : "black" }}
          onClick={handleClick}
          onChange={handleChange}
          value={value}
        >
          {datas.length === 0 ? (
            <option>{``}</option>
          ) : (
            <>
              <option hidden selected>
                {""}
              </option>
              {datas?.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </>
          )}
        </select>
        {datasLoading ? (
          <div className="absolute right-2">
            <ColorRing
              type="ColorRing"
              colors={[
                "rgb(156 163 175)",
                "rgb(156 163 175)",
                "rgb(156 163 175)",
                "rgb(156 163 175)",
                "rgb(156 163 175)",
              ]}
              height={20}
              width={20}
            />
          </div>
        ) : (
          <AiOutlineCaretDown className="absolute right-2" />
        )}
      </div>
    </div>
  );
};

export default Dropdown;
