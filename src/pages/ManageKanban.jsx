import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import Header from "../subPages/TaskManager/Tasks/components/Header";
import Tasks from "../subPages/TaskManager/Tasks/view/Tasks";
import Workshop from "../subPages/TaskManager/Workshop/View/Workshop";
import Inspection from "../subPages/TaskManager/Inspection/View/Inspection";
import Planning from "../subPages/TaskManager/Planning/View/Planning";
import QA from "../subPages/TaskManager/QA/View/QA";
import Report from "../subPages/TaskManager/Report/View/Report";
import PageLoading from "../components/PageLoading";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavContext } from "../contexts/NavContext";

const storeModel = {
  "To Do": [],
  InProgress: [],
  "Waiting Inspection": [],
  Inspected: [],
  Rejected: [],
  Done: [],
};

const userModel = {
  Tasks: ["Workshop Engineer"],
  Workshop: ["Workshop"],
  Inspection: ["Site Engineer", "Yard Engineer"],
  Report: ["Site Engineer", "Yard Engineer"],
  QA: ["QA Engineer"],
  Planning: ["Planning Engineer"],
};

const ManageKanban = () => {
  const [category, setCategory] = useState("Tasks");
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState(storeModel);

  const { usersData } = useNavContext();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (usersData[0].roles.Admin) {
      setCategory("Tasks");
    } else if (usersData[0].department === "Maintenance") {
      if (userModel.Tasks.includes(usersData[0].title)) {
        setCategory("Tasks");
      } else if (userModel.Inspection.includes(usersData[0].title)) {
        setCategory("Inspection");
      } else if (userModel.Report.includes(usersData[0].title)) {
        setCategory("Inspection");
      } else if (userModel.Planning.includes(usersData[0].title)) {
        setCategory("Planning");
      } else if (userModel.QA.includes(usersData[0].title)) {
        setCategory("QA");
      } else if (userModel.Workshop.includes(usersData[0].title)) {
        setCategory("Workshop");
      }
    }
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const url = `/api/v1/taskManagerGetTasks`;
      const data = await axiosPrivate(url, { method: "GET" });
      console.log(data?.data);
      let result = storeModel;
      data?.data?.map((d) => {
        result = result[d.Category]
          ? {
              ...result,
              [d.Category]: [
                ...result[d.Category],
                {
                  id: d.ID.toString(),
                  desc: d.Description ? d.Description : "",
                  pic: d.ToUser ? JSON.parse(d.ToUser) : [],
                  eq: d.Equipment,
                  periority: d.Periority ? d.Periority : "",
                  title: d.Title ? d.Title : "",
                  start: d.StartTime
                    ? new Date(d.StartTime).toISOString().slice(0, 16)
                    : "",
                  end: d.EndTime
                    ? new Date(d.EndTime).toISOString().slice(0, 16)
                    : "",
                  duration: d.Duration ? d.Duration : "",
                  workshop: d.Workshop ? d.Workshop : "",
                },
              ],
            }
          : {
              ...result,
              [d.Category]: [
                {
                  id: d.ID.toString(),
                  desc: d.Description ? d.Description : "",
                  pic: d.ToUser ? JSON.parse(d.ToUser) : [],
                  eq: d.Equipment,
                  periority: d.Periority ? d.Periority : "",
                  title: d.Title ? d.Title : "",
                  start: d.StartTime
                    ? new Date(d.StartTime).toISOString().slice(0, 16)
                    : "",
                  end: d.EndTime
                    ? new Date(d.EndTime).toISOString().slice(0, 16)
                    : "",
                  duration: d.Duration ? d.Duration : "",
                  workshop: d.Workshop ? d.Workshop : "",
                },
              ],
            };
      });
      console.log(result);
      setStores(result);
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

  useEffect(() => {
    getData();
  }, []);

  const handleDragAndDrop = async (result) => {
    try {
      const { source, destination } = result;

      if (!destination) return;

      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      )
        return;

      const itemSourceIndex = source.index;
      const itemDestinationIndex = destination.index;

      const itemSourceCategory = source.droppableId;
      const itemDestinationCategory = destination.droppableId;

      const sourceData = stores[itemSourceCategory][itemSourceIndex];
      setLoading(true);

      if (source.droppableId !== destination.droppableId) {
        const url = `/api/v1/taskManagerUpdateTasks`;
        await axiosPrivate(url, {
          method: "POST",
          data: JSON.stringify({
            Category: destination.droppableId,
            ID: stores[itemSourceCategory][itemSourceIndex]?.id,
          }),
        });
      }

      let newStore = { ...stores };

      newStore[itemSourceCategory].splice(itemSourceIndex, 1);
      newStore[itemDestinationCategory].splice(
        itemDestinationIndex,
        0,
        sourceData
      );
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

  return (
    <DragDropContext onDragEnd={handleDragAndDrop}>
      {loading && <PageLoading message={`Loading Tasks`} />}
      <div className="w-full h-[92vh] md:mt-0 mt-[58px] flex flex-col gap-2 justify-start">
        <div className="flex flex-col w-full items-center bg-gray-300">
          {/* <div className="w-full flex justify-start items-center font-[700] text-[18px] p-3">
            <p>Yard Task Manager</p>
          </div> */}
          <div className="w-full h-[35px] flex flex-row justify-start items-start overflow-x-auto px-2">
            {(usersData[0].roles.Admin ||
              (userModel.Tasks.includes(usersData[0].title) &&
                usersData[0].department === "Maintenance")) && (
              <Header
                name={`Tasks`}
                isParBorder={true}
                Par2Cond={`Workshop`}
                category={category}
                setCategory={setCategory}
              />
            )}

            {(usersData[0].roles.Admin ||
              (userModel.Workshop.includes(usersData[0].title) &&
                usersData[0].department === "Maintenance")) && (
              <Header
                name={`Workshop`}
                isParBorder={true}
                Par2Cond={`Inspection`}
                category={category}
                setCategory={setCategory}
              />
            )}
            {(usersData[0].roles.Admin ||
              (userModel.Inspection.includes(usersData[0].title) &&
                usersData[0].department === "Maintenance")) && (
              <Header
                name={`Inspection`}
                isParBorder={true}
                Par2Cond={`Report`}
                category={category}
                setCategory={setCategory}
              />
            )}
            {(usersData[0].roles.Admin ||
              (userModel.Report.includes(usersData[0].title) &&
                usersData[0].department === "Maintenance")) && (
              <Header
                name={`Report`}
                isParBorder={true}
                Par2Cond={`Planning`}
                category={category}
                setCategory={setCategory}
              />
            )}
            {(usersData[0].roles.Admin ||
              (userModel.Planning.includes(usersData[0].title) &&
                usersData[0].department === "Maintenance")) && (
              <Header
                name={`Planning`}
                isParBorder={true}
                Par2Cond={`QA`}
                category={category}
                setCategory={setCategory}
              />
            )}
            {(usersData[0].roles.Admin ||
              (userModel.QA.includes(usersData[0].title) &&
                usersData[0].department === "Maintenance")) && (
              <Header
                name={`QA`}
                isParBorder={false}
                category={category}
                setCategory={setCategory}
              />
            )}
          </div>
        </div>
        {category === "Tasks" && stores ? (
          <Tasks stores={stores} setStores={setStores} />
        ) : category === "Workshop" && stores ? (
          <Workshop stores={stores} setStores={setStores} />
        ) : category === "Inspection" && stores ? (
          <Inspection />
        ) : category === "Report" && stores ? (
          <Report stores={stores} setStores={setStores} />
        ) : category === "QA" && stores ? (
          <QA stores={stores} setStores={setStores} />
        ) : (
          stores && <Planning stores={stores} setStores={setStores} />
        )}
      </div>
    </DragDropContext>
  );
};

export default ManageKanban;
