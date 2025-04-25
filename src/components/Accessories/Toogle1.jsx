import React, { useState } from "react";

import "./CSS/Toggle1.css";

// Inline SVG for the checkmark
const CheckmarkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="12"
    height="12"
    fill="none"
    stroke="#4caf50"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const Toogle1 = ({ value, onChange, size = 1 }) => {
  const [isOn, setIsOn] = useState(value);

  return (
    <button
      onClick={() => {
        onChange();
        setIsOn((prev) => !prev);
      }}
      className={`toggle-switch ${isOn ? "on" : "off"}`}
      style={{ "--size": size }} // Control size via CSS variable
    >
      <div className={`switch ${isOn ? "on" : "off"}`}>
        {isOn && <CheckmarkIcon />} {/* Render the checkmark SVG */}
      </div>
    </button>
  );
};

export default Toogle1;
