import React, { useState } from "react";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const useTask = (stores, setStores) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const axiosPrivate = useAxiosPrivate();

  const handleSave = async (d, cat) => {
    try {
      setMessage(`Updating Tasks...`);
      setLoading(true);
      const url = `/api/v1/taskManagerUpdateTasks`;
      await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({
          ID: d?.id,
          Description: d?.desc !== "" ? d?.desc : null,
          Description_Ar: d?.descAr !== "" ? d?.descAr : null,
          ToUser: d?.pic !== "" ? d?.pic : null,
          Periority: d?.periority !== "" ? d?.periority : null,
          Title: d?.title !== "" ? d?.title : null,
          StartTime: d?.start !== "" ? new Date(d?.start) : null,
          EndTime: d?.end !== "" ? new Date(d?.end) : null,
          Duration: d?.duration !== "" ? d?.duration : null,
          Workshop: d?.workshop !== "" ? d?.workshop : null,
        }),
      });
      let newStore = { ...stores };
      newStore[cat].map((item, index) => {
        if (item.id === d.id) {
          newStore[cat].splice(index, 1, d);
        }
      });
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

  const handleDelete = async (d, cat) => {
    try {
      setMessage(`Deleting Task...`);
      setLoading(true);
      const url = `/api/v1/taskManagerDeleteTask`;
      await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({ ID: d?.id }),
      });
      let newStore = { ...stores };
      newStore[cat].map((item, index) => {
        if (item.id === d.id) {
          newStore[cat].splice(index, 1);
        }
      });
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

  return { loading, setLoading, message, setMessage, handleSave, handleDelete };
};

export default useTask;
