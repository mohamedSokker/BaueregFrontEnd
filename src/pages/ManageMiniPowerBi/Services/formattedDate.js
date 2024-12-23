export const formatDateInLocal = (date) => {
  return date.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour12: true,
  });
};
