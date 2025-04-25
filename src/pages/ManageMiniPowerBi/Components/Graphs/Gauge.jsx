import React, { useState, useEffect } from "react";

import "../../Styles/EditCard.css";

// Define the bounce animation using CSS keyframes
// const bounceAnimation = `
//   @keyframes bounce {
//     0% { transform: rotate(calc(var(--target-angle) - 5deg)); }
//     50% { transform: rotate(calc(var(--target-angle) + 5deg)); }
//     100% { transform: rotate(var(--target-angle)); }
//   }
// `;

const Gauge = ({ tableData, item, data, tablesData }) => {
  const [value, setValue] = useState(0);
  const [minimun, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(100);

  const {
    label,
    Y_Axis,
    // value,
    operationType,
    cx,
    cy,
    min,
    max,
    threshold,
    unit,
    outerRadius,
  } = item;

  useEffect(() => {
    setMinimum(Number(min));
    setMaximum(Number(max));
  }, [min, max]);

  useEffect(() => {
    //   let result = {};
    //   let resultArray = [];
    let total = 0;
    if (Y_Axis?.[0]?.opType === "Count") {
      tableData?.map((row) => {
        total += 1;
      });
    } else if (Y_Axis?.[0]?.opType === "Sum") {
      tableData?.map((row) => {
        total += row?.[Y_Axis?.[0].name];
      });
    } else if (Y_Axis?.[0]?.opType === "Average") {
      let sum = 0;
      let count = 0;
      tableData?.map((row) => {
        sum += row?.[Y_Axis?.[0].name];
        count += 1;
      });
      // console.log(sum);
      total = count && count > 0 ? Number(Number(sum / count).toFixed(2)) : 0;
    }

    // if (needleRef.current) {
    //   // Remove the animation class
    //   needleRef.current.classList.remove("needle");
    //   // Trigger reflow to restart the animation
    //   void needleRef.current.offsetWidth;
    //   // Re-add the animation class
    //   needleRef.current.classList.add("needle");
    // }
    setValue(total);
  }, [tableData, data]);

  const clampedValue = Math.min(Math.max(value, minimun), maximum);

  const radius = 100; // Radius of the gauge
  const strokeWidth = 20; // Thickness of the gauge arc
  const needleLength = 85; // Length of the needle
  const needleWidth = 4; // Thickness of the needle
  const centerX = 125; // Center X of the SVG
  const centerY = 125; // Center Y of the SVG

  // Calculate the angle for the needle based on the clamped value
  const angle = ((clampedValue - minimun) / (maximum - minimun)) * 180 - 180; // Adjusted to start from -180 degrees

  // Calculate the stroke dash offset for the gauge background
  const circumference = Math.PI * radius; // Half-circle circumference
  const strokeDashoffset =
    circumference - ((clampedValue - min) / (max - min)) * circumference;

  // Function to generate tick marks
  const generateTicks = () => {
    const ticks = [];
    const numTicks = 9; // Number of ticks (including min and max)
    const tickLength = 10; // Length of each tick
    const tickAngleStep = 180 / (numTicks - 1); // Angle between ticks

    for (let i = 0; i < numTicks; i++) {
      const tickAngle = -180 + i * tickAngleStep; // Start from -180 degrees
      const x1 =
        centerX + (radius - tickLength) * Math.cos((tickAngle * Math.PI) / 180);
      const y1 =
        centerY + (radius - tickLength) * Math.sin((tickAngle * Math.PI) / 180);
      const x2 = centerX + radius * Math.cos((tickAngle * Math.PI) / 180);
      const y2 = centerY + radius * Math.sin((tickAngle * Math.PI) / 180);

      // Add tick mark
      ticks.push(
        <line
          key={`tick-${i}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#000"
          opacity={0.4}
          strokeWidth="2"
        />
      );

      // Add tick label
      const labelValue = minimun + ((maximum - minimun) / (numTicks - 1)) * i;
      const labelX =
        centerX + (radius + 25) * Math.cos((tickAngle * Math.PI) / 180);
      const labelY =
        centerY + (radius + 25) * Math.sin((tickAngle * Math.PI) / 180);

      ticks.push(
        <text
          key={`label-${i}`}
          x={labelX}
          y={labelY}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="10"
          fill="#000"
        >
          {/* {Number(Number(labelValue).toFixed(1))} */}
          {Number(Number(labelValue).toFixed(1)) > 1000000
            ? `${Number(
                (Number(Number(labelValue).toFixed(1)) / 1000000)?.toFixed(1)
              )}M`
            : Number(Number(labelValue).toFixed(1)) > 1000
            ? `${Number(
                (Number(Number(labelValue).toFixed(1)) / 1000)?.toFixed(1)
              )}K`
            : `${Number(
                Number(Number(Number(labelValue).toFixed(1)))?.toFixed(1)
              )}`}
        </text>
      );
    }

    return ticks;
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "250px",
        margin: "0 auto",
      }}
    >
      {/* Tooltip */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#333",
          color: "#fff",
          padding: "5px 10px",
          borderRadius: "5px",
          fontSize: "14px",
          opacity: 0,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}
        id="gauge-tooltip"
      >
        {clampedValue}
      </div>
      {/* Gauge SVG */}
      <svg
        width="100%"
        height="auto"
        viewBox="0 0 250 125"
        style={{ overflow: "visible" }}
        // onMouseMove={(e) => {
        //   const tooltip = document.getElementById("gauge-tooltip");
        //   if (tooltip) {
        //     tooltip.style.opacity = 1;
        //   }
        // }}
        // onMouseLeave={() => {
        //   const tooltip = document.getElementById("gauge-tooltip");
        //   if (tooltip) {
        //     tooltip.style.opacity = 0;
        //   }
        // }}
      >
        {/* Gauge Background (Half Circle) */}
        <path
          d={`M 25,125 A ${radius},${radius} 0 0 1 225,125`}
          fill="none"
          stroke="#e0e0e0"
          //   stroke={
          //     Number(value) / Number(max) > Number(parseInt(threshold, 10)) / 100
          //       ? "#ff0000"
          //       : "#e0e0e0"
          //   }
          strokeWidth={strokeWidth}
        />
        {/* Conform and Danger Zones */}
        {/* {generateZoneArcs()} */}
        {/* Gauge Value (Half Circle) */}
        <path
          d={`M 25,125 A ${radius},${radius} 0 0 1 225,125`}
          fill="none"
          //   stroke="#007bff"
          stroke={
            Number(max) > 0
              ? Number(value) / Number(max) >
                Number(parseInt(threshold, 10)) / 100
                ? "#ff0000"
                : "#007bff"
              : "#007bff"
          }
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }} // Animation for the gauge arc
        />
        {/* Tick Marks and Labels */}
        {generateTicks()}
        {/* Needle */}
        <line
          x1={centerX}
          y1={centerY}
          //   x2={centerX + needleLength * Math.cos((angle * Math.PI) / 180)}
          x2={centerX + needleLength * Math.cos((-180 * Math.PI) / 180)}
          //   y2={centerY + needleLength * Math.sin((angle * Math.PI) / 180)}
          y2={centerY + needleLength * Math.sin((-180 * Math.PI) / 180)}
          stroke="#ff0000"
          strokeWidth={needleWidth}
          strokeLinecap="round"
          style={{
            transform: `rotate(${angle - 180}deg)`,
            transformOrigin: `${centerX}px ${centerY}px`,
            // transition: "transform 0.5s ease-in-out", // Animation for the needle
            transition: "transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)", // Animation for the needle
          }}
        />
        {/* Center Circle */}
        <circle cx={centerX} cy={centerY} r="8" fill="#ff0000" />
        {/* Value Display in the Middle */}
        <text
          x={centerX}
          y={centerY + 18}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="12"
          fontWeight={`700`}
          fill="#000"
        >
          {value > 1000000
            ? `${(value / 1000000)?.toFixed(1)}M ${unit}`
            : value > 1000
            ? `${(value / 1000)?.toFixed(1)}K ${unit}`
            : `${Number(value)?.toFixed(1)} ${unit}`}
        </text>
      </svg>
    </div>
  );
};

export default Gauge;
