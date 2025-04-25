import React, { useState, useEffect, useRef, useMemo } from "react";
import useChartsData from "../../Controllers/Graphs/chartsData";

const CustomTooltip = (props) => {
  const { X_Axis, tooltipProps, Y_Axis } = props?.item;

  if (props.active && props.payload && props.payload.length) {
    return (
      <div className="p-2 bg-white border-gray-300 text-black">
        <p className="text-[10px] font-[600]">{`${X_Axis}: ${
          props?.label ? props?.label : props.payload[0]?.name
        } `}</p>
        {Y_Axis?.map((item) => (
          <p
            key={item?.name}
            className="text-[10px] font-[600]"
          >{`${`${item?.name}`}: ${
            props.payload[0]?.payload?.[`${item?.name}`]
          }`}</p>
        ))}
        {tooltipProps?.map((item) => (
          <p key={item?.name} className="text-[10px] font-[600]">
            {item?.opType === "Count"
              ? `${`Count Of ${item?.name}`}: ${
                  props.payload[0]?.payload?.[`Count Of ${item?.name}`]
                }`
              : item?.opType === "Sum"
              ? `${`Sum Of ${item?.name}`}: ${
                  props.payload[0]?.payload?.[`Sum Of ${item?.name}`]
                }`
              : `${`Average Of ${item?.name}`}: ${
                  props.payload[0]?.payload?.[`Average Of ${item?.name}`]
                }`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const Label = ({
  x,
  y,
  value,
  angle = 0,
  fontSize = 12,
  textAnchor = "middle",
}) => (
  <text
    x={x}
    y={y}
    fontSize={fontSize}
    textAnchor={textAnchor}
    transform={`rotate(${angle}, ${x}, ${y})`}
  >
    {value}
  </text>
);

const formatYAxisTick = (value) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  } else {
    return value.toString();
  }
};

const BarChart = ({
  legendPosition = "topCenter",
  TooltipComponent,
  legendWidthPercentage = 10,
  tableData,
  item,
  data,
}) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const chartContainerRef = useRef(null);

  const {
    X_Axis,
    value,
    tooltips,
    tooltipProps,
    count,
    operationType,
    outerRadius,
    innerRadius,
    Colors,
    cx,
    cy,
    isTooltip,
    isLabel,
    isLegend,
    Y_Axis,
  } = item;

  const { chartData } = useChartsData({ tableData, item, data });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    return () => {
      if (chartContainerRef.current) {
        resizeObserver.unobserve(chartContainerRef.current);
      }
    };
  }, []);

  const { stackedData, maxCumulativeValue, yTicks } = useMemo(() => {
    if (!chartData || chartData.length === 0 || Y_Axis.length === 0) {
      return { stackedData: [], maxCumulativeValue: 0, yTicks: [] };
    }

    const newStackedData = chartData.map((item) => {
      const stackedItem = { ...item, slices: [] };
      let cumulativeValue = 0;
      Y_Axis.forEach((dataKey) => {
        const value = item[dataKey.name] || 0;
        stackedItem.slices.push({
          key: dataKey.name,
          value,
          cumulativeValue,
        });
        cumulativeValue += value;
      });
      return stackedItem;
    });

    const newMaxCumulativeValue = Math.max(
      ...newStackedData.map((item) =>
        item.slices.reduce((sum, slice) => sum + slice.value, 0)
      )
    );

    const generateTicks = (min, max) => {
      const range = max - min;
      if (range <= 0) return [min, max];
      const magnitude = Math.pow(10, Math.floor(Math.log10(range)));
      const step = magnitude / 2;
      const ticks = [];
      for (let i = min; i <= max; i += step) {
        ticks.push(i);
      }
      return ticks;
    };

    const newYTicks = generateTicks(0, newMaxCumulativeValue);

    return {
      stackedData: newStackedData,
      maxCumulativeValue: newMaxCumulativeValue,
      yTicks: newYTicks,
    };
  }, [chartData, Y_Axis]);

  const calculateMargins = () => {
    if (!isLegend) {
      return { top: 20, right: 30, bottom: 40, left: 40 };
    }

    const legendWidth = dimensions.width * (legendWidthPercentage / 100);
    const legendHeight = Y_Axis.length * 10;

    switch (legendPosition) {
      case "topLeft":
      case "topCenter":
      case "topRight":
        return {
          top: legendHeight + 20,
          right: 30,
          bottom: 40,
          left: 40,
        };
      case "bottomLeft":
      case "bottomCenter":
      case "bottomRight":
        return {
          top: 20,
          right: 30,
          bottom: legendHeight + 40,
          left: 40,
        };
      case "leftTop":
      case "leftCenter":
      case "leftBottom":
        return {
          top: 20,
          right: 30,
          bottom: 40,
          left: legendWidth + 40,
        };
      case "rightTop":
      case "rightCenter":
      case "rightBottom":
        return {
          top: 20,
          right: legendWidth + 30,
          bottom: 40,
          left: 40,
        };
      default:
        return { top: 20, right: 30, bottom: 40, left: 40 };
    }
  };

  const margin = calculateMargins();
  const innerWidth = Math.max(0, dimensions.width - margin.left - margin.right);
  const innerHeight = Math.max(
    0,
    dimensions.height - margin.top - margin.bottom
  );

  const barWidth =
    (innerWidth - (chartData?.length - 1) * 2) / chartData?.length;

  const scaleX = (index) => margin.left + index * (barWidth + 2);
  const scaleY = (value) =>
    margin.top +
    innerHeight -
    ((value - 0) / (maxCumulativeValue - 0)) * innerHeight;

  const handleMouseMove = (event) => {
    if (!chartData || chartData.length === 0) return;

    const svgRect = chartContainerRef.current.getBoundingClientRect();
    const mouseX = event.clientX - svgRect.left - margin.left;
    const mouseY = event.clientY - svgRect.top - margin.top;

    const barIndex = Math.floor(mouseX / (barWidth + 2));

    if (barIndex >= 0 && barIndex < chartData.length) {
      const barData = stackedData[barIndex];

      const tooltipContent = [
        { key: X_Axis, value: barData.label },
        ...Y_Axis.map((dataKey, sliceIndex) => ({
          key: dataKey.name,
          value: barData.slices[sliceIndex].value,
        })),
      ];

      const isLeftHalf = scaleX(barIndex) < dimensions.width / 2;
      const tooltipX = isLeftHalf
        ? scaleX(barIndex) + barWidth + 10
        : scaleX(barIndex) - 10;

      const tooltipY = scaleY(
        barData.slices[barData.slices.length - 1].cumulativeValue +
          barData.slices[barData.slices.length - 1].value
      );

      setTooltip({
        visible: true,
        content: tooltipContent,
        x: tooltipX,
        y: tooltipY,
        isLeftHalf,
        barIndex,
      });
    } else {
      setTooltip({ visible: false, content: "", x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, content: "", x: 0, y: 0 });
  };

  const trimLabel = (label, maxWidth) => {
    const maxChars = Math.floor(maxWidth / 8);
    return label.length > maxChars
      ? `${label.substring(0, maxChars)}...`
      : label;
  };

  const getLegendPosition = () => {
    if (!isLegend) return null;

    const legendWidth = dimensions.width * (legendWidthPercentage / 100);
    const legendHeight = Y_Axis.length * 20;

    switch (legendPosition) {
      case "topLeft":
        return { x: 40, y: 10, direction: "row" };
      case "topCenter":
        return {
          x: dimensions.width / 2 - legendWidth / 2,
          y: 10,
          direction: "row",
        };
      case "topRight":
        return {
          x: dimensions.width - legendWidth * Y_Axis?.length - 30,
          y: 10,
          direction: "row",
        };
      case "bottomLeft":
        return {
          x: 40,
          y: dimensions.height - legendHeight + 10,
          direction: "row",
        };
      case "bottomCenter":
        return {
          x: dimensions.width / 2 - legendWidth / 2,
          y: dimensions.height - legendHeight + 10,
          direction: "row",
        };
      case "bottomRight":
        return {
          x: dimensions.width - legendWidth * Y_Axis?.length - 30,
          y: dimensions.height - legendHeight + 10,
          direction: "row",
        };
      case "leftTop":
        return { x: 10, y: margin.top, direction: "column" };
      case "leftCenter":
        return {
          x: 10,
          y: dimensions.height / 2 - legendHeight / 2,
          direction: "column",
        };
      case "leftBottom":
        return {
          x: 10,
          y: dimensions.height - margin.bottom - legendHeight,
          direction: "column",
        };
      case "rightTop":
        return {
          x: dimensions.width - legendWidth - 10,
          y: margin.top,
          direction: "column",
        };
      case "rightCenter":
        return {
          x: dimensions.width - legendWidth - 10,
          y: dimensions.height / 2 - legendHeight / 2,
          direction: "column",
        };
      case "rightBottom":
        return {
          x: dimensions.width - legendWidth - 10,
          y: dimensions.height - margin.bottom - legendHeight,
          direction: "column",
        };
      default:
        return {
          x: dimensions.width - legendWidth,
          y: margin.top,
          direction: "row",
        };
    }
  };

  const linePoints = chartData?.map((item, index) => ({
    x: scaleX(index) + barWidth / 2,
    y: scaleY(item.totalValue),
  }));

  return (
    <div
      ref={chartContainerRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <svg width={dimensions.width} height={dimensions.height}>
        <line
          x1={margin.left}
          y1={dimensions.height - margin.bottom}
          x2={dimensions.width - margin.right}
          y2={dimensions.height - margin.bottom}
          stroke="black"
        />
        <line
          x1={margin.left}
          y1={margin.top}
          x2={margin.left}
          y2={dimensions.height - margin.bottom}
          stroke="black"
        />

        {yTicks.map((tick, index) => (
          <g key={index}>
            <line
              x1={margin.left - 5}
              y1={scaleY(tick)}
              x2={margin.left}
              y2={scaleY(tick)}
              stroke="black"
            />
            <text
              x={margin.left - 10}
              y={scaleY(tick) + 5}
              textAnchor="end"
              fontSize="12"
            >
              {formatYAxisTick(tick)}
            </text>
          </g>
        ))}

        {chartData &&
          chartData.map((item, index) => (
            <g key={item.id}>
              <line
                x1={scaleX(index) + barWidth / 2}
                y1={dimensions.height - margin.bottom}
                x2={scaleX(index) + barWidth / 2}
                y2={dimensions.height - margin.bottom + 5}
                stroke="black"
              />
              <text
                x={scaleX(index) + barWidth / 2}
                y={dimensions.height - margin.bottom + 20}
                textAnchor="middle"
                fontSize="12"
                transform={`rotate(-45, ${scaleX(index) + barWidth / 2}, ${
                  dimensions.height - margin.bottom + 20
                })`}
              >
                {trimLabel(item.label, barWidth - 20)}
              </text>
            </g>
          ))}

        {stackedData.map((item, index) =>
          item.slices.map((slice, sliceIndex) => {
            const y = scaleY(slice.cumulativeValue + slice.value);
            const height = Math.max(0, scaleY(slice.cumulativeValue) - y);
            return (
              <rect
                key={`${item.id}-${slice.key}`}
                x={scaleX(index)}
                y={y}
                width={barWidth}
                height={height}
                fill={Colors[sliceIndex % Colors.length]}
              />
            );
          })
        )}

        {isLegend && Y_Axis.length > 0 && (
          <g
            transform={`translate(${getLegendPosition().x}, ${
              getLegendPosition().y
            })`}
          >
            {Y_Axis.map((dataKey, index) => (
              <g
                key={dataKey.name}
                transform={
                  getLegendPosition().direction === "row"
                    ? `translate(${index * 100}, 0)`
                    : `translate(0, ${index * 20})`
                }
              >
                <rect
                  width={18}
                  height={18}
                  fill={Colors[index % Colors.length]}
                />
                <text x={24} y={14} fontSize="12">
                  {dataKey.name}
                </text>
              </g>
            ))}
          </g>
        )}

        <path
          d={linePoints
            ?.map(
              (point, index) =>
                `${index === 0 ? "M" : "L"}${point.x},${point.y}`
            )
            .join(" ")}
          stroke="#8884d8"
          strokeWidth={2}
          fill="none"
        />
      </svg>

      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            left: tooltip.isLeftHalf ? tooltip.x - 20 : tooltip.x + 20,
            top: dimensions.height / 3,
            backgroundColor: "rgba(255, 255, 255, 1)",
            color: "black",
            border: "1px solid rgb(156,163,175)",
            padding: "5px",
            borderRadius: "2px",
            fontSize: "12px",
            transform: tooltip.isLeftHalf
              ? "translateX(0)"
              : "translateX(-100%)",
          }}
        >
          {tooltipProps?.length > 0 ? (
            <CustomTooltip
              active={true}
              payload={tooltip.content.map((slice) => ({
                name: slice.key,
                value: slice.value,
                payload: {
                  ...stackedData[tooltip.barIndex],
                  [slice.key]: slice.value,
                },
              }))}
              label={stackedData[tooltip.barIndex]?.label}
              item={item}
            />
          ) : (
            <div>
              {tooltip.content.map((slice, index) => (
                <div key={index}>
                  <p className="text-[10px] font-[600]">{`${slice.key} : ${slice.value}`}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {(!chartData || chartData.length === 0 || Y_Axis.length === 0) && (
        <text
          x={dimensions.width / 2}
          y={dimensions.height / 2}
          textAnchor="middle"
          fontSize="16"
          fill="gray"
        >
          No chartData available
        </text>
      )}
    </div>
  );
};

export default React.memo(BarChart);
