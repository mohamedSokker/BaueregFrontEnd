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
          className="w-full border-b-1 border-gray-300 outline-none focus:border-red-400 font-[400] text-[12px]"
        />
      ) : input === "textarea" ? (
        <textarea
          ref={inputRef}
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
          className="w-full border-b-1 border-gray-300 outline-none focus:border-red-400 font-[400] text-[12px]"
        />
      ) : (
        <select
          onChange={(e) => {
            setVal((prev) => ({ ...prev, [col]: e.target.value }));
          }}
          className=" bg-white w-full border-b-1 border-gray-300 outline-none focus:border-red-400 font-[400] text-[12px]"
          onFocus={(e) => {
            e.target.previousElementSibling.classList.add("focused");
          }}
          onBlur={(e) => {
            e.target.previousElementSibling.classList.remove("focused");
          }}
          value={val[col]}
        >
          {options.map((o, i) => (
            <option key={i}>{o}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default EditCardFields;
