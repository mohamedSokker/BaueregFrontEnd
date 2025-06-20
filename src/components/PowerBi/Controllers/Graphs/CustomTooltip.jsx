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

  const renderLine = (name, isSeen) => (
    <p
      key={name}
      className="text-[10px] font-[600]"
      style={{
        fontSize: `${tooltipFontSize}px`,
        fontWeight: tooltipFontWeight,
      }}
    >
      {isSeen && `${name}: ${formatValue(name)}`}
    </p>
  );

  const renderExpression = (exp) => {
    const { firstArg, secondArg, name, opType, isSeen } = exp;
    let val1 = firstArg;
    let val2 = secondArg;
    const numericValue1 = Number(val1);
    const numericValue2 = Number(val2);

    if (!isNaN(numericValue1)) {
      val1 = numericValue1;
    } else {
      val1 = getValue(firstArg);
    }

    if (!isNaN(numericValue2)) {
      val2 = numericValue2;
    } else {
      val2 = getValue(secondArg);
    }

    if (
      [firstArg, secondArg].some((arg) => !arg) ||
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
        {isSeen && `${name}: ${formatter.format(result)}`}
      </p>
    );
  };

  if (!active || !payload?.length) return null;

  return (
    <div className="p-2 bg-white dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-700">
      <p
        className="text-[10px] font-[600]"
        style={{
          fontSize: `${tooltipFontSize}px`,
          fontWeight: tooltipFontWeight,
        }}
      >
        {`${X_Axis}: ${label || payload[0]?.name}`}
      </p>

      {Y_Axis.map(({ name, isSeen }) => renderLine(name, isSeen))}
      {tooltips.map(({ name, isSeen }) => renderLine(name, isSeen))}
      {expressions.map(renderExpression)}
    </div>
  );
};

export default CustomTooltip;
