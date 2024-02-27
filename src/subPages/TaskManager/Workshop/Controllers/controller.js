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
      const url = `/api/v1/taskManagerUpdateTasks`;
      await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({
          Category: "Waiting Inspection",
          ID: item.id,
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
