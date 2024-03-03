import React, { useEffect, useRef, useState } from "react";

import "../styles/EditCard.css";

const EditCardFields = ({
  name,
  col,
  data,
  focused,
  inputType,
  w,
  input,
  options,
  val,
  setVal,
  disabled,
  fullusers,
  isMultiple,
}) => {
  const inputRef = useRef(null);

  // useEffect(() => {
  //   console.log(
  //     val && val["pic"] && Array.from(val["pic"], (option) => option.name)
  //   );
  // }, [val]);

  const handleSelectChange = (e) => {
    // console.log(e.target.selectedOptions);
    setVal((prev) => ({ ...prev, pic: [] }));
    Array.from(e.target.selectedOptions, (option) => {
      if (col === "pic") {
        console.log(val);
        setVal((prev) =>
          prev[col]
            ? {
                ...prev,
                [col]: [
                  ...prev[col],
                  {
                    name: option.value,
                    pic: `${process.env.REACT_APP_BASE_URL}/${
                      fullusers[option.value]
                    }`,
                  },
                ],
              }
            : {
                ...prev,
                [col]: [
                  {
                    name: option.value,
                    pic: `${process.env.REACT_APP_BASE_URL}/${
                      fullusers[option.value]
                    }`,
                  },
                ],
              }
        );
      } else {
        setVal((prev) => ({ ...prev, [col]: { name: e.target.value } }));
      }
    });
  };

  useEffect(() => {
    focused && inputRef.current.focus();
  }, []);
  return (
    <div className="flex flex-col gap-2" style={{ width: w }}>
      <p className="font-[400] text-[12px] text-gray-500">{name}</p>
      {input === "input" ? (
        <input
          ref={inputRef}
          disabled={disabled}
          onChange={(e) => {
            setVal((prev) => ({ ...prev, [col]: e.target.value }));
          }}
          onFocus={(e) => {
            e.target.previousElementSibling.classList.add("focused");
          }}
          onBlur={(e) => {
            e.target.previousElementSibling.classList.remove("focused");
          }}
          type={inputType}
          value={val[col]}
          style={{ color: disabled ? "rgb(107,114,128)" : "black" }}
          className="w-full border-b-1 border-gray-300 outline-none focus:border-red-400 font-[400] text-[12px]"
        />
      ) : input === "textarea" ? (
        <textarea
          ref={inputRef}
          disabled={disabled}
          onChange={(e) => {
            setVal((prev) => ({ ...prev, [col]: e.target.value }));
          }}
          onFocus={(e) => {
            e.target.previousElementSibling.classList.add("focused");
          }}
          onBlur={(e) => {
            e.target.previousElementSibling.classList.remove("focused");
          }}
          type={inputType}
          value={val[col]}
          style={{ color: disabled ? "rgb(107,114,128)" : "black" }}
          className="w-full border-b-1 border-gray-300 outline-none focus:border-red-400 font-[400] text-[12px]"
        />
      ) : (
        <select
          disabled={disabled}
          multiple={isMultiple}
          onChange={handleSelectChange}
          style={{
            color:
              disabled || options.length === 0 ? "rgb(107,114,128)" : "black",
          }}
          className=" bg-white w-full border-b-1 border-gray-300 outline-none focus:border-red-400 font-[400] text-[12px] rounded-none"
          onFocus={(e) => {
            e.target.previousElementSibling.classList.add("focused");
          }}
          onBlur={(e) => {
            e.target.previousElementSibling.classList.remove("focused");
          }}
          value={
            col === "pic"
              ? val &&
                val["pic"] &&
                Array.from(val[col], (option) => option.name)
              : val[col]
          }
        >
          {options.length === "" ? (
            <option>{`Select ${name}`}</option>
          ) : (
            <>
              <option hidden selected>
                {""}
              </option>
              {options.map((o, i) => (
                <option key={i} className=" rounded-none">
                  {o}
                </option>
              ))}
            </>
          )}
        </select>
      )}
    </div>
  );
};

export default EditCardFields;
