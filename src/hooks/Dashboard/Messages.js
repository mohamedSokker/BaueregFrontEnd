import { useEffect } from "react";

import { useDashboardContext } from "../../contexts/DashboardContext";

const useMessages = () => {
  const {
    setCurrentMessage,
    setCount,
    messages,
    setRealTime,
    realTime,
    count,
  } = useDashboardContext();

  const getDate = (date) => {
    const dt = new Date(date);
    dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
    return dt.toISOString();
  };

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      if (messages.length !== 0) {
        if (count === messages.length) {
          setCurrentMessage(
            `${1} - ${messages[0]?.Equipment} Started Problem ${
              messages[0]?.Breakdown_Type.split(".")[0]
            } at ${new Date(
              getDate(messages[0]?.Problem_start_From)
            ).toLocaleString()}`
          );
          setCount(1);
        } else {
          setCurrentMessage(
            `${count + 1} - ${messages[count]?.Equipment} Started Problem ${
              messages[count]?.Breakdown_Type.split(".")[0]
            } at ${new Date(
              getDate(messages[count]?.Problem_start_From)
            ).toLocaleString()}`
          );
          setCount((prev) => prev + 1);
        }
      }

      setRealTime((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, [realTime]);
};

export default useMessages;
