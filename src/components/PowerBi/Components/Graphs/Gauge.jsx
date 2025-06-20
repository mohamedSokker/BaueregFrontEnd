import React, { useState, useEffect, useMemo } from "react";

import "../../Styles/EditCard.css";

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
    greenRange,
    yellowRange,
    redRange,
    width,
    height,
  } = item;

  useEffect(() => {
    setMinimum(Number(min));
    setMaximum(Number(max));
  }, [min, max]);

  useEffect(() => {
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

    setValue(total);
  }, [tableData, data]);

  const clampedValue = Math.min(Math.max(value, minimun), maximum);

  // Determine the zone color based on current value
  const getZoneColor = () => {
    const greenThreshold = Number(greenRange); // 50%
    const yellowThreshold = Number(greenRange) + Number(yellowRange); // 80%

    const percentage = (clampedValue - minimun) / (maximum - minimun);

    if (percentage <= greenThreshold) {
      return "#16a34a"; // Green
    } else if (percentage <= yellowThreshold) {
      return "#ffeb3b"; // Yellow
    } else {
      return "#f44336"; // Red
    }
  };
  const zoneColor = getZoneColor();

  // const svgWidth =
  //   (parseFloat(width, 10) * parseFloat(data?.containerStyles?.width, 10)) /
  //   100;
  // const svgHeight =
  //   (parseFloat(height, 10) * parseFloat(data?.containerStyles?.height, 10)) /
  //   100;

  const { svgWidth, svgHeight, radius, centerX, centerY } = useMemo(() => {
    const containerWidth = parseFloat(data?.containerStyles?.width, 10);
    const containerHeight = parseFloat(data?.containerStyles?.height, 10);
    const computedWidth = (parseFloat(width, 10) * containerWidth) / 100;
    const computedHeight = (parseFloat(height, 10) * containerHeight) / 100;

    const computedRadius = Math.min(computedWidth, computedHeight) / 2 - 20;
    const computedCenterX = computedWidth / 2;
    const computedCenterY = computedHeight / 1.5;

    // console.log(data?.containerStyles?.width, data?.containerStyles?.height);
    return {
      svgWidth: computedWidth,
      svgHeight: computedHeight,
      radius: computedRadius,
      centerX: computedCenterX,
      centerY: computedCenterY,
    };
  }, [width, height]);

  // const radius = Math.min(svgWidth, svgHeight) / 2 - 20; // Radius of the gauge
  const strokeWidth = radius * 0.2; // Thickness of the gauge arc
  const needleLength = radius * 0.85; // Length of the needle
  const needleWidth = 2; // Thickness of the needle
  // const centerX = svgWidth / 2; // Center X of the SVG
  // const centerY = svgHeight / 1.5; // Center Y of the SVG

  // Calculate the angle for the needle based on the clamped value
  const angle = ((clampedValue - minimun) / (maximum - minimun)) * 180 - 180; // Adjusted to start from -180 degrees

  // Calculate the stroke dash offset for the gauge background
  const circumference = Math.PI * radius; // Half-circle circumference
  const strokeDashoffset =
    circumference - ((clampedValue - min) / (max - min)) * circumference;

  const greenLength = circumference * greenRange;
  const yellowLength = circumference * yellowRange;
  const redLength = circumference * redRange;

  const greenOffset = 0;
  const yellowOffset = -greenLength;
  const redOffset = -(greenLength + yellowLength);

  // Function to generate tick marks
  const generateTicks = () => {
    const ticks = [];
    const numTicks = 9; // Number of ticks (including min and max)
    const tickLength = radius / 10; // Length of each tick
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
          opacity={0.9}
          strokeWidth="1"
        />
      );

      // Add tick label
      const labelValue = minimun + ((maximum - minimun) / (numTicks - 1)) * i;
      const labelX =
        centerX + (radius + radius / 4) * Math.cos((tickAngle * Math.PI) / 180);
      const labelY =
        centerY + (radius + radius / 4) * Math.sin((tickAngle * Math.PI) / 180);

      ticks.push(
        <text
          key={`label-${i}`}
          x={labelX}
          y={labelY}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={radius * 0.1}
          fill="currentColor"
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
        position: "flex",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Gauge SVG */}
      <svg
        width="100%"
        length="auto"
        viewBox={`0 0 ${svgWidth} ${svgHeight / 1.3}`}
        // style={{ overflow: "visible" }}
      >
        {/* Zone Arcs using strokeDasharray & offset */}
        <path
          // d={`M 25,125 A ${radius},${radius} 0 0 1 225,125`}
          d={`M ${centerX - radius},${centerY} A ${radius},${radius} 0 0 1 ${
            centerX + radius
          },${centerY}`}
          fill="none"
          stroke="#16a34a"
          strokeWidth={strokeWidth}
          strokeDasharray={`${greenLength} ${circumference}`}
          strokeDashoffset={greenOffset}
        />
        <path
          // d={`M 25,125 A ${radius},${radius} 0 0 1 225,125`}
          d={`M ${centerX - radius},${centerY} A ${radius},${radius} 0 0 1 ${
            centerX + radius
          },${centerY}`}
          fill="none"
          stroke="#ffeb3b"
          strokeWidth={strokeWidth}
          strokeDasharray={`${yellowLength} ${circumference}`}
          strokeDashoffset={yellowOffset}
        />
        <path
          // d={`M 25,125 A ${radius},${radius} 0 0 1 225,125`}
          d={`M ${centerX - radius},${centerY} A ${radius},${radius} 0 0 1 ${
            centerX + radius
          },${centerY}`}
          fill="none"
          stroke="#f44336"
          strokeWidth={strokeWidth}
          strokeDasharray={`${redLength} ${circumference}`}
          strokeDashoffset={redOffset}
        />
        {/* Tick Marks and Labels */}
        {generateTicks()}
        {/* Needle */}
        <line
          x1={centerX}
          y1={centerY}
          x2={centerX + needleLength * Math.cos((-180 * Math.PI) / 180)}
          y2={centerY + needleLength * Math.sin((-180 * Math.PI) / 180)}
          stroke={zoneColor}
          strokeWidth={needleWidth}
          strokeLinecap="round"
          style={{
            transform: `rotate(${angle - 180}deg)`,
            transformOrigin: `${centerX}px ${centerY}px`,
            transition: "transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)", // Animation for the needle
          }}
        />
        {/* Center Circle */}
        <circle cx={centerX} cy={centerY} r="4" fill={zoneColor} />
        {/* Value Display in the Middle */}
        <text
          x={centerX}
          y={centerY + radius / 5}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={radius / 9}
          fontWeight={`700`}
          fill="currentColor"
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
