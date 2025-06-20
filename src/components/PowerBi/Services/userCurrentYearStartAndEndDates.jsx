export const useCurrentYearStartAndEndDates = () => {
  const formatDateToString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year.toString()}-${month}-${day}`;
  };

  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const endDate = new Date(currentDate.getFullYear(), 11, 31);

  return {
    startDate: formatDateToString(startDate),
    endDate: formatDateToString(endDate),
  };
};
