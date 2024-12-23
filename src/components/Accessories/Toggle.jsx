import React from "react";

import "./CSS/Toggle.css";

const Toggle = (value, setValue) => {
  return (
    <>
      <label className="switch">
        <input
          type="checkbox"
          checked={value}
          onChange={() => setValue((prev) => !prev)}
        />
        <span className="slider"></span>
      </label>
    </>
  );
};

export default Toggle;
