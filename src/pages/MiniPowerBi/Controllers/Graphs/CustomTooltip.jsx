import React from "react";

const CustomTooltip = ({ active, payload, label, item }) => {
  const {
    X_Axis,
    tooltipProps,
    tooltips = [],
    Y_Axis = [],
    tooltipFontSize,
    tooltipFontWeight,
    expressions = [],
  } = item;

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const getValue = (name) => payload?.[0]?.payload?.[name];

  const formatValue = (name) => {
    const val = getValue(name);
    return !isNaN(val) ? formatter.format(val) : val;
  };

  const renderLine = (name) => (
    <p
      key={name}
      className="text-[10px] font-[600]"
      style={{
        fontSize: `${tooltipFontSize}px`,
        fontWeight: tooltipFontWeight,
      }}
    >
      {`${name}: ${formatValue(name)}`}
    </p>
  );

  const renderExpression = (exp) => {
    const { firstArg, secondArg, name, opType } = exp;
    const val1 = getValue(firstArg);
    const val2 = getValue(secondArg);
    if (
      [firstArg, secondArg].some((arg) => !arg || isNaN(getValue(arg))) ||
      (opType === "Division" && val2 === 0)
    )
      return null;

    let result;
    switch (opType) {
      case "Division":
        result = val1 / val2;
        break;
      case "Multiply":
        result = val1 * val2;
        break;
      case "Sum":
        result = val1 + val2;
        break;
      default:
        result = val1 - val2;
    }

    return (
      <p
        key={name}
        className="text-[10px] font-[600]"
        style={{
          fontSize: `${tooltipFontSize}px`,
          fontWeight: tooltipFontWeight,
        }}
      >
        {`${name}: ${formatter.format(result)}`}
      </p>
    );
  };

  if (!active || !payload?.length) return null;

  return (
    <div className="p-2 bg-white border border-gray-300">
      <p
        className="text-[10px] font-[600]"
        style={{
          fontSize: `${tooltipFontSize}px`,
          fontWeight: tooltipFontWeight,
        }}
      >
        {`${X_Axis}: ${label || payload[0]?.name}`}
      </p>

      {Y_Axis.map(({ name }) => renderLine(name))}
      {tooltips.map(({ name }) => renderLine(name))}
      {expressions.map(renderExpression)}
    </div>
  );
};

export default CustomTooltip;
