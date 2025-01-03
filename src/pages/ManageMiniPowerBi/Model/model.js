export const COLORS = [
  "#156E84",
  "#7F608F",
  "#AE4F46",
  "#CD8880",
  "#A39547",
  "#CFC99D",
  "#3AAE61",
  "#96D6AB",
  "#613A67",
  "#88D3E5",
];

export const tableProps = [
  { name: "table", inputType: "select", dataType: "ref", ref: "Tables" },
  { name: "count", inputType: "number", ref: "columns" },
  {
    name: "columns",
    inputType: "listDropsRefColumns",
  },
  { name: "rowHeight", inputType: "number" },
  { name: "width", unit: "%", inputType: "number" },
  { name: "height", unit: "%", inputType: "number" },
  { name: "top", unit: "%", inputType: "number" },
  { name: "left", unit: "%", inputType: "number" },
];

export const pieProps = [
  { name: "table", inputType: "select", dataType: "ref", ref: "Tables" },
  { name: "width", unit: "%", inputType: "number" },
  { name: "height", unit: "%", inputType: "number" },
  { name: "top", unit: "%", inputType: "number" },
  { name: "left", unit: "%", inputType: "number" },
  { name: "label", inputType: "select", dataType: "ref", ref: "columns" },
  { name: "value", inputType: "select", dataType: "ref", ref: "columns" },
  {
    name: "operationType",
    inputType: "select",
    dataType: "list",
    data: ["Count", "Sum", "Average"],
  },
  { name: "outerRadius", inputType: "number" },
  { name: "innerRadius", inputType: "number" },
  { name: "cx", inputType: "number", unit: "%" },
  { name: "cy", inputType: "number", unit: "%" },
  { name: "isTooltip", inputType: "toggle" },
  { name: "isLegend", inputType: "toggle" },
  { name: "count", inputType: "number" },
  {
    name: "Colors",
    inputType: "listtext",
    data: COLORS,
  },
];

export const gaugeProps = [
  { name: "table", inputType: "select", dataType: "ref", ref: "Tables" },
  { name: "width", unit: "%", inputType: "number" },
  { name: "height", unit: "%", inputType: "number" },
  { name: "top", unit: "%", inputType: "number" },
  { name: "left", unit: "%", inputType: "number" },
  { name: "label", inputType: "select", dataType: "ref", ref: "columns" },
  { name: "value", inputType: "select", dataType: "ref", ref: "columns" },
  { name: "unit", inputType: "text" },
  {
    name: "operationType",
    inputType: "select",
    dataType: "list",
    data: ["Count", "Sum", "Average"],
  },
  { name: "min", inputType: "number" },
  { name: "max", inputType: "number" },
  { name: "threshold", inputType: "number", unit: "%" },
  { name: "cx", inputType: "number", unit: "%" },
  { name: "cy", inputType: "number", unit: "%" },
];

export const barProps = [
  { name: "table", inputType: "select", dataType: "ref", ref: "Tables" },
  { name: "width", unit: "%", inputType: "number" },
  { name: "height", unit: "%", inputType: "number" },
  { name: "top", unit: "%", inputType: "number" },
  { name: "left", unit: "%", inputType: "number" },
  { name: "count", inputType: "number", ref: "datakeys" },
  { name: "label", inputType: "select", dataType: "ref", ref: "columns" },
  {
    name: "datakeys",
    inputType: "listDropsRefColumns",
  },
  // { name: "value", inputType: "select", dataType: "ref", ref: "columns" },
  {
    name: "operationType",
    inputType: "select",
    dataType: "list",
    data: ["Count", "Sum", "Average"],
  },
  // { name: "cx", inputType: "number", unit: "%" },
  // { name: "cy", inputType: "number", unit: "%" },
  { name: "isTooltip", inputType: "toggle" },
  { name: "isLegend", inputType: "toggle" },
  {
    name: "Colors",
    inputType: "listtext",
    data: COLORS,
  },
];

export const timelineProps = [
  { name: "table", inputType: "select", dataType: "ref", ref: "Tables" },
  { name: "width", unit: "%", inputType: "number" },
  { name: "height", unit: "%", inputType: "number" },
  { name: "top", unit: "%", inputType: "number" },
  { name: "left", unit: "%", inputType: "number" },
  // { name: "count", inputType: "number", ref: "datakeys" },
  { name: "label", inputType: "select", dataType: "ref", ref: "columns" },
  { name: "start", inputType: "select", dataType: "ref", ref: "columns" },
  { name: "end", inputType: "select", dataType: "ref", ref: "columns" },
  { name: "category", inputType: "select", dataType: "ref", ref: "columns" },
  {
    name: "datakeys",
    inputType: "listDropsRefColumns",
  },
  // { name: "value", inputType: "select", dataType: "ref", ref: "columns" },
  {
    name: "operationType",
    inputType: "select",
    dataType: "list",
    data: ["Count", "Sum", "Average"],
  },
  // { name: "cx", inputType: "number", unit: "%" },
  // { name: "cy", inputType: "number", unit: "%" },
  { name: "isTooltip", inputType: "toggle" },
  { name: "isLegend", inputType: "toggle" },
  { name: "isCurveSlicer", inputType: "toggle" },
  {
    name: "Colors",
    inputType: "listtext",
    data: COLORS,
  },
];

export const lineProps = [
  { name: "table", inputType: "select", dataType: "ref", ref: "Tables" },
  { name: "width", unit: "%", inputType: "number" },
  { name: "height", unit: "%", inputType: "number" },
  { name: "top", unit: "%", inputType: "number" },
  { name: "left", unit: "%", inputType: "number" },
  { name: "count", inputType: "number", ref: "datakeys" },
  { name: "label", inputType: "select", dataType: "ref", ref: "columns" },
  {
    name: "datakeys",
    inputType: "listDropsRefColumns",
  },
  // { name: "value", inputType: "select", dataType: "ref", ref: "columns" },
  {
    name: "operationType",
    inputType: "select",
    dataType: "list",
    data: ["Count", "Sum", "Average"],
  },
  // { name: "cx", inputType: "number", unit: "%" },
  // { name: "cy", inputType: "number", unit: "%" },
  { name: "isTooltip", inputType: "toggle" },
  { name: "isLegend", inputType: "toggle" },
  { name: "isCurveSlicer", inputType: "toggle" },
  {
    name: "Colors",
    inputType: "listtext",
    data: COLORS,
  },
];

export const slicerProps = [
  { name: "table", inputType: "select", dataType: "ref", ref: "Tables" },
  { name: "mainSlicer", inputType: "select", dataType: "ref", ref: "columns" },
  { name: "count", inputType: "number", ref: "subSlicers" },
  {
    name: "subSlicers",
    inputType: "listDropsRefColumns",
  },
  {
    name: "actions",
    inputType: "listDropsRefTables",
  },
  {
    name: "slicerType",
    inputType: "select",
    dataType: "list",
    data: ["Checks", "Date"],
  },
  { name: "width", unit: "%", inputType: "number" },
  { name: "height", unit: "%", inputType: "number" },
  { name: "top", unit: "%", inputType: "number" },
  { name: "left", unit: "%", inputType: "number" },
];

export const cardProps = [
  { name: "table", inputType: "select", dataType: "ref", ref: "Tables" },
  { name: "column", inputType: "select", dataType: "ref", ref: "columns" },
  { name: "width", unit: "%", inputType: "number" },
  { name: "height", unit: "%", inputType: "number" },
  { name: "top", unit: "%", inputType: "number" },
  { name: "left", unit: "%", inputType: "number" },
  {
    name: "operationType",
    inputType: "select",
    dataType: "list",
    data: ["Count", "Sum", "Average"],
  },
  { name: "text", inputType: "text" },
];

export const tablesOptions = {
  // table: "EqsTools",
  width: "200px",
  count: 0,
  columns: [],
  rowHeight: 30,
  height: "200px",
  top: 0,
  left: 0,
  Type: "Table",
  props: tableProps,
};

export const pieOptions = {
  table: null,
  name: null,
  label: null,
  count: 2,
  width: "200px",
  height: "200px",
  top: 0,
  left: 0,
  Type: "Graph",
  graphType: "Pie",
  operationType: "Count",
  outerRadius: 80,
  innerRadius: 0,
  cx: "50%",
  cy: "50%",
  isTooltip: true,
  isLegend: true,
  props: pieProps,
  Colors: [...COLORS],
};

export const gaugeOptions = {
  table: null,
  name: null,
  label: null,
  unit: "",
  threshold: 80,
  width: "200px",
  height: "200px",
  top: 0,
  left: 0,
  Type: "Graph",
  graphType: "Gauge",
  operationType: "Count",
  cx: "50%",
  cy: "50%",
  outerRadius: 80,
  min: 0,
  max: 100,
  props: gaugeProps,
};

export const barOptions = {
  table: null,
  name: null,
  label: null,
  count: 1,
  datakeys: ["value"],
  width: "200px",
  height: "200px",
  top: 0,
  left: 0,
  Type: "Graph",
  graphType: "Bar",
  operationType: "Count",
  cx: "50%",
  cy: "50%",
  isTooltip: true,
  isLegend: true,
  props: barProps,
  Colors: [...COLORS],
};

export const timelineOptions = {
  table: null,
  name: null,
  label: null,
  start: null,
  end: null,
  category: null,
  count: 10,
  datakeys: ["value"],
  width: "200px",
  height: "200px",
  top: 0,
  left: 0,
  Type: "Graph",
  graphType: "Timeline",
  operationType: "Count",
  cx: "50%",
  cy: "50%",
  isTooltip: true,
  isLegend: false,
  isCurveSlicer: false,
  props: timelineProps,
  Colors: [...COLORS],
};

export const lineOptions = {
  table: null,
  name: null,
  label: null,
  count: 1,
  datakeys: ["value"],
  width: "200px",
  height: "200px",
  top: 0,
  left: 0,
  Type: "Graph",
  graphType: "Line",
  operationType: "Count",
  cx: "50%",
  cy: "50%",
  isTooltip: true,
  isLegend: true,
  isCurveSlicer: false,
  props: lineProps,
  Colors: [...COLORS],
};

export const slicerOptions = {
  table: null,
  name: null,
  width: "200px",
  height: "200px",
  top: 0,
  left: 0,
  Type: "Slicer",
  mainSlicer: null,
  count: 0,
  subSlicers: [],
  actions: [],
  slicerType: "Checks",
  props: slicerProps,
};

export const cardOptions = {
  table: null,
  name: null,
  width: "200px",
  height: "200px",
  top: 0,
  left: 0,
  Type: "Card",
  column: "",
  operationType: "Count",
  text: "",
  props: cardProps,
};

export const DBData = [
  {
    name: "EqsTools",
    Type: "Table",
    table: "EqsTools",
    pageCount: 7,
  },
  {
    name: "Maintenance",
    Type: "Graph",
    graphType: "Pie",
    table: "Maintenance",
    label: "Breakdown_Type",
    value: "Total_EURO",
    isCount: true,
    count: 10,
  },
];
