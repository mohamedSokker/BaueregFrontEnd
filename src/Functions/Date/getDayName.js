export const getDayName = (anyDate) => {
  const dt = new Date(anyDate).toLocaleString("default", { weekday: "long" });
  return dt;
};
