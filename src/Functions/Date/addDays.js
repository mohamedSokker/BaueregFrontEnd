export const addDays = (anyDate, days) => {
  const dt = new Date(anyDate);
  const milliseconds = dt.getTime();
  const milliseconds2 = milliseconds + 1000 * 60 * 60 * 24 * days;
  return new Date(milliseconds2);
};
