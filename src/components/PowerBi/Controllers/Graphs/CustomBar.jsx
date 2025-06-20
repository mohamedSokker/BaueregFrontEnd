import React from "react";

const CustomBar = (props) => {
  const { x, y, width, height, value, color } = props;

  const DataFormater = (number) => {
    if (number > 1000000000) {
      return (number / 1000000000).toFixed(1) + "B";
    } else if (number > 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number > 1000) {
      return (number / 1000).toFixed(1) + "K";
    } else {
      return number.toFixed(1);
    }
  };

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={color} />
      <foreignObject
        x={x + width / 2 - (width * 0.85) / 2}
        y={height > 28 ? y - 20 : y - 20}
        width={width * 0.85}
        height={20}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            // backgroundColor: height >= 28 ? "white" : "black",
            // backgroundColor: "rgb(209,213,217)",
            // color: "black",
            fontSize: "10px",
            fontWeight: "700",
            // borderRadius: "4px", // Rounded corners
            textAlign: "center",
            opacity: 0.8,
          }}
          className="dark:text-white text-black"
        >
          {DataFormater(value)}
        </div>
      </foreignObject>
    </g>
  );
};

export default CustomBar;
