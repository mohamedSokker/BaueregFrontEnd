import React from "react";

const DragComponent = ({ name, target, children }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        target: target,
        data: name,
        // component: e.target.innerHTML,
      })
    );
    // e.dataTransfer.setData("react-element", name);
    e.target.style.opacity = "0.4"; // Animation effect
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1"; // Reset opacity after drag
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ cursor: "move" }}
    >
      {children}
    </div>
  );
};

export default DragComponent;
