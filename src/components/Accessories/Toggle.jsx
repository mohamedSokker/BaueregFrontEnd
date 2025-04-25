import React from "react";

import "./CSS/Toggle.css";

const Toggle = ({ value, onChange, props }) => {
  return (
    <>
      <label className="switch">
        <input type="checkbox" checked={value} onChange={onChange} />
        <span className="slider"></span>
      </label>
    </>
  );
};

export default Toggle;
