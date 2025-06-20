import React, { useEffect, useState } from "react";

const GaugeChart = ({ item, tableData }) => {
  const {
    label,
    Y_Axis,
    min = 0,
    max = 100,
    threshold = "80",
    unit = "",
  } = item;

  const [value, setValue] = useState(0);
  const size = 250;
  const center = size / 2;
  const radius = center - 10;
  const needleLength = radius * 0.9;
  const strokeWidth = 20;

  // Calculate moderate threshold (60% of max)
  const moderateThreshold = 0.6 * max;
  const dangerThreshold = parseInt(threshold, 10);

  useEffect(() => {
    let total = 0;

    if (Y_Axis?.[0]?.opType === "Count") {
      total = tableData?.length || 0;
    } else if (Y_Axis?.[0]?.opType === "Sum") {
      total = tableData?.reduce(
        (sum, row) => sum + (row[Y_Axis?.[0].name] || 0),
        0
      );
    } else if (Y_Axis?.[0]?.opType === "Average") {
      const sum = tableData?.reduce(
        (s, row) => s + (row[Y_Axis?.[0].name] || 0),
        0
      );
      const count = tableData?.length || 1;
      total = Number((sum / count).toFixed(2));
    }

    setValue(Math.min(max, Math.max(min, total)));
  }, [tableData, item]);

  // Calculate angle in degrees
  const getAngle = () => ((Math.min(value, max) - min) / (max - min)) * 180;

  const angle = getAngle();

  // Convert degrees to radians
  const degToRad = (deg) => (deg * Math.PI) / 180;

  // Coordinates for needle tip
  const rad = degToRad(angle - 90); // Offset by 90° to start from bottom
  const x = center + needleLength * Math.cos(rad);
  const y = center + needleLength * Math.sin(rad);

  return (
    <div className="flex flex-col items-center justify-center text-gray-800 dark:text-gray-100">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#374151"
          strokeWidth={strokeWidth}
        />

        {/* Green Arc (Safe Zone) */}
        <path
          d={`
            M ${center}, ${center}
            L ${center + radius * Math.cos(degToRad(-90))}, ${
            center + radius * Math.sin(degToRad(-90))
          }
            A ${radius},${radius} 0 0,1 ${
            center +
            radius * Math.cos(degToRad(-90 + 180 * (moderateThreshold / max)))
          },${
            center +
            radius * Math.sin(degToRad(-90 + 180 * (moderateThreshold / max)))
          }
            Z
          `}
          fill="#10B981"
        />

        {/* Yellow Arc (Moderate Zone) */}
        <path
          d={`
            M ${center}, ${center}
            L ${
              center +
              radius * Math.cos(degToRad(-90 + 180 * (moderateThreshold / max)))
            }, ${
            center +
            radius * Math.sin(degToRad(-90 + 180 * (moderateThreshold / max)))
          }
            A ${radius},${radius} 0 0,1 ${
            center +
            radius * Math.cos(degToRad(-90 + 180 * (dangerThreshold / 100)))
          },${
            center +
            radius * Math.sin(degToRad(-90 + 180 * (dangerThreshold / 100)))
          }
            Z
          `}
          fill="#FBBF24"
        />

        {/* Red Arc (Danger Zone) */}
        <path
          d={`
            M ${center}, ${center}
            L ${
              center +
              radius * Math.cos(degToRad(-90 + 180 * (dangerThreshold / 100)))
            }, ${
            center +
            radius * Math.sin(degToRad(-90 + 180 * (dangerThreshold / 100)))
          }
            A ${radius},${radius} 0 0,1 ${
            center + radius * Math.cos(degToRad(90))
          },${center + radius * Math.sin(degToRad(90))}
            Z
          `}
          fill="#EF4444"
        />

        {/* Needle */}
        <line
          x1={center}
          y1={center}
          x2={x}
          y2={y}
          stroke={value > dangerThreshold ? "#EF4444" : "#374151"}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Needle base circle */}
        <circle cx={center} cy={center} r="6" fill="#374151" />

        {/* Value Text */}
        <text
          x={center}
          y={center + 40}
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill={
            value > dangerThreshold
              ? "#EF4444"
              : value > moderateThreshold
              ? "#FBBF24"
              : "#10B981"
          }
        >
          {value >= max
            ? `${max}${unit}`
            : `${Number(value).toFixed(1)}${unit}`}
        </text>
      </svg>

      {/* Labels */}
      <div className="flex justify-between w-full mt-2 text-xs px-6">
        <span className="text-green-500">Min: {min}</span>
        <span className="text-yellow-500">Moderate: {moderateThreshold}</span>
        <span className="text-red-500">Max: {max}</span>
      </div>
    </div>
  );
};

export default GaugeChart;
