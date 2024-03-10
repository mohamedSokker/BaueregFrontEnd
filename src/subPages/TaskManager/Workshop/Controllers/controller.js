import { useEffect, useState } from "react";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { storeModel } from "../Model/model";

const storetoJSON = async (store) => {
  let result = [];
  Object.keys(store).map((title) => {
    store[title].map((item) => {
      result.push({ ...item, category: title });
    });
  });
  return result;
};

const JSONtoStore = async (store) => {
  let result = { ...storeModel };
  store.map((item) => {
    result = {
      ...result,
      [item.category]: [...result[item.category], item],
    };
  });
  return result;
};

const useWorkshop = (stores, setStores, usersData) => {
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const filterData = async () => {
    const jsonData = await storetoJSON(stores);
    console.log(jsonData);
    const targetWorkshop = usersData[0]?.title?.split("(")[1]?.split(")")[0];
    console.log(targetWorkshop);
    const targetData = jsonData.filter((d) => d.workshop === targetWorkshop);
    console.log(targetData);
    const storeData = await JSONtoStore(targetData);
    console.log(storeData);
    setStores(storeData);
  };

  useEffect(() => {
    filterData();
  }, []);

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
            EndTime: "Date.Now",
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

      newStore["Waiting Inspection"].splice(0, 0, { ...item, end: new Date() });
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
