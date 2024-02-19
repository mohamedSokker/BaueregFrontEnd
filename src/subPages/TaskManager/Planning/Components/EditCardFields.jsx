import React, { useEffect, useRef, useState } from "react";

import "../Styles/EditCard.css";

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
}) => {
  const inputRef = useRef(null);

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
          placeholder={name}
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
          onChange={(e) => {
            setVal((prev) => ({ ...prev, [col]: e.target.value }));
          }}
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
          value={val[col]}
        >
          {options.length === 0 ? (
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
