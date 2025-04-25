import React from "react";

const CustomTooltip = (props) => {
  const {
    X_Axis,
    tooltipProps,
    tooltips,
    Y_Axis,
    tooltipFontSize,
    tooltipFontWeight,
    expressions,
  } = props?.item;
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  // console.log(expressions);
  if (props.active && props.payload && props.payload.length) {
    return (
      <div className="p-2 bg-white border-1 border-gray-300">
        <p
          className="text-[10px] font-[600]"
          style={{
            fontSize: `${tooltipFontSize}px`,
            fontWeight: tooltipFontWeight,
          }}
        >{`${X_Axis}: ${
          props?.label ? props?.label : props.payload[0]?.name
        } `}</p>
        {Y_Axis?.map((item) => (
          <p
            key={item?.name}
            className="text-[10px] font-[600]"
            style={{
              fontSize: `${tooltipFontSize}px`,
              fontWeight: tooltipFontWeight,
            }}
          >
            {!isNaN(props.payload[0]?.payload?.[`${item?.name}`])
              ? `${`${item?.name}`}: ${formatter.format(
                  props.payload[0]?.payload?.[`${item?.name}`]
                )}`
              : `${`${item?.name}`}: ${
                  props.payload[0]?.payload?.[`${item?.name}`]
                }`}
          </p>
        ))}
        {tooltips?.map((item) => (
          <p
            key={item?.name}
            className="text-[10px] font-[600]"
            style={{
              fontSize: `${tooltipFontSize}px`,
              fontWeight: tooltipFontWeight,
            }}
          >
            {!isNaN(props.payload[0]?.payload?.[`${item?.name}`])
              ? `${`${item?.name}`}: ${formatter.format(
                  props.payload[0]?.payload?.[`${item?.name}`]
                )}`
              : `${`${item?.name}`}: ${
                  props.payload[0]?.payload?.[`${item?.name}`]
                }`}
          </p>
        ))}
        {expressions?.map(
          (item) =>
            item?.firstArg &&
            item?.secondArg &&
            item?.firstArg !== "" &&
            item?.secondArg !== "" && (
              <p
                key={item?.name}
                className="text-[10px] font-[600]"
                style={{
                  fontSize: `${tooltipFontSize}px`,
                  fontWeight: tooltipFontWeight,
                }}
              >
                {item?.opType === "Division"
                  ? `${`${item?.name}`}: ${formatter.format(
                      props.payload[0]?.payload?.[`${item?.firstArg}`] /
                        props.payload[0]?.payload?.[`${item?.secondArg}`]
                    )}`
                  : item?.opType === "Multiply"
                  ? `${`${item?.name}`}: ${formatter.format(
                      props.payload[0]?.payload?.[`${item?.firstArg}`] *
                        props.payload[0]?.payload?.[`${item?.secondArg}`]
                    )}`
                  : item?.opType === "Sum"
                  ? `${`${item?.name}`}: ${formatter.format(
                      props.payload[0]?.payload?.[`${item?.firstArg}`] +
                        props.payload[0]?.payload?.[`${item?.secondArg}`]
                    )}`
                  : `${`${item?.name}`}: ${formatter.format(
                      props.payload[0]?.payload?.[`${item?.firstArg}`] -
                        props.payload[0]?.payload?.[`${item?.secondArg}`]
                    )}`}
              </p>
            )
        )}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
