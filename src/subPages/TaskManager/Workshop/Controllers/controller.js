import { useState } from "react";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const useWorkshop = (stores, setStores) => {
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async (item) => {
    try {
      setMessage(`Updating Tasks...`);
      setLoading(true);
      let result = [];
      Object.keys(stores).map((title) => {
        stores[title].map((t) => {
          if (t.reportID === item.reportID && t.id !== item.id) {
            result.push(title);
          }
        });
      });
      console.log(result);
      let flag = false;
      if (
        result.includes("To Do") ||
        result.includes("Inspected") ||
        result.includes("InProgress")
      ) {
        flag = false;
      } else {
        flag = true;
      }

      console.log(flag);

      const url = `/api/v1/taskManagerUpdateTasks`;
      await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({
          data: {
            Category: "Waiting Inspection",
            ID: item.id,
          },
          flags: {
            updateReport: flag ? true : false,
            reportID: item.reportID,
            IsReady: flag ? "true" : "false",
          },
        }),
      });
      let newStore = { ...stores };
      newStore["InProgress"].map((d, index) => {
        if (d.id === item.id) {
          newStore["InProgress"].splice(index, 1);
        }
      });

      newStore["Waiting Inspection"].splice(0, 0, item);
      console.log(newStore);
      setStores(newStore);
      setLoading(false);
    } catch (err) {
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
      setLoading(false);
    }
  };

  return { handleSave, loading, setLoading, message, setMessage };
};

export default useWorkshop;
