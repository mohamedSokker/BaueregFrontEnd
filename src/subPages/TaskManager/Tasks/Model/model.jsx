export const editFields = {
  id: null,
  desc: null,
  descAr: null,
  name: null,
  pic: null,
  eq: null,
  periority: null,
  title: null,
  start: null,
  end: null,
  duration: null,
  workshop: null,
};

export const storeModel = {
  "To Do": [],
  InProgress: [],
  "Waiting Inspection": [],
  Inspected: [],
  Rejected: [],
  Done: [],
};

export const objectModel = {
  Description: [],
  UserName: [],
  Equipment: [],
  Periority: [],
  Title: [],
  Time: [],
  Duration: [],
  Workshop: [],
};

export const filterModel = {
  count: null,
  checkedItems: null,
  filteredData: null,
  minDuration: "",
  maxDuration: "",
  currentDuration: ["", ""],
  minDate: "",
  maxDate: "",
  currentDate: { start: "", end: "" },
};
