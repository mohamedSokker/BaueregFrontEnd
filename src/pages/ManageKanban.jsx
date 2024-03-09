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
import QAInspection from "../subPages/TaskManager/QA Inspection/View/QA Inspection";
import Analysis from "../subPages/TaskManager/Analysis/View/Analysis";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavContext } from "../contexts/NavContext";
import Files from "../subPages/TaskManager/Files/View/Files";

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
  "QA Inspection": ["QA Engineer"],
  Planning: ["Planning Engineer"],
};

const ManageKanban = () => {
  const [category, setCategory] = useState("Tasks");
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState(null);
  const [copiedStores, setCopiedStores] = useState(null);
  const [users, setUsers] = useState([]);
  const [fullusers, setFullUsers] = useState([]);

  const { usersData } = useNavContext();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (usersData[0].roles.Admin) {
      setCategory("Planning");
      getData();
    } else if (usersData[0].department === "Maintenance") {
      if (userModel.Tasks.includes(usersData[0].title)) {
        setCategory("Tasks");
        getData();
      } else if (userModel.Inspection.includes(usersData[0].title)) {
        setCategory("Inspection");
      } else if (userModel.Report.includes(usersData[0].title)) {
        setCategory("Inspection");
      } else if (userModel.Planning.includes(usersData[0].title)) {
        setCategory("Planning");
        getData();
      } else if (userModel.QA.includes(usersData[0].title)) {
        setCategory("QA Inspection");
      } else if (userModel["QA Inspection"].includes(usersData[0].title)) {
        setCategory("QA Inspection");
      } else if (userModel.Workshop.includes(usersData[0].title)) {
        setCategory("Workshop");
        getData();
      }
    }
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const url = `/api/v1/taskManagerGetTasks`;
      const data = await axiosPrivate(url, { method: "GET" });
      const usersURL = `/api/v1/taskManagergetUsers`;
      const usersResponse = await axiosPrivate(usersURL, { method: "GET" });
      // setFullUsers(usersResponse.data);
      const usersResult = [];
      let fullUsersResult = {};
      usersResponse.data.map((d) => {
        usersResult.push(d.UserName);
        fullUsersResult[d.UserName] = d.ProfileImg;
      });
      setFullUsers(fullUsersResult);
      setUsers(usersResult);
      // console.log(data?.data);
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
                  descAr: d.Description_Ar ? d.Description_Ar : "",
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
                  reportID: d.ReportID ? d.ReportID : "",
                  IsReady: d.IsReady ? d.IsReady : "",
                },
              ],
            }
          : {
              ...result,
              [d.Category]: [
                {
                  id: d.ID.toString(),
                  desc: d.Description ? d.Description : "",
                  descAr: d.Description_Ar ? d.Description_Ar : "",
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
                  reportID: d.ReportID ? d.ReportID : "",
                  IsReady: d.IsReady ? d.IsReady : "",
                },
              ],
            };
      });
      // console.log(result);
      setStores(result);
      setCopiedStores(result);
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

  // useEffect(() => {
  //   getData();
  // }, []);

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
            data: {
              Category: destination.droppableId,
              ID: stores[itemSourceCategory][itemSourceIndex]?.id,
            },
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
            {userModel.Tasks.includes(usersData[0].title) &&
              usersData[0].department === "Maintenance" && (
                <Header
                  name={`Tasks`}
                  isParBorder={true}
                  Par2Cond={`Workshop`}
                  category={category}
                  setCategory={setCategory}
                />
              )}

            {userModel.Workshop.includes(usersData[0].title) &&
              usersData[0].department === "Maintenance" && (
                <Header
                  name={`Workshop`}
                  isParBorder={true}
                  Par2Cond={`Inspection`}
                  category={category}
                  setCategory={setCategory}
                />
              )}
            {userModel.Inspection.includes(usersData[0].title) &&
              usersData[0].department === "Maintenance" && (
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
                Par2Cond={`Analysis`}
                category={category}
                setCategory={setCategory}
              />
            )}
            {usersData[0].roles.Admin && (
              <Header
                name={`Analysis`}
                isParBorder={true}
                Par2Cond={`Files`}
                category={category}
                setCategory={setCategory}
              />
            )}
            {usersData[0].roles.Admin && (
              <Header
                name={`Files`}
                isParBorder={false}
                category={category}
                setCategory={setCategory}
              />
            )}
            {userModel.QA.includes(usersData[0].title) &&
              usersData[0].department === "Maintenance" && (
                <Header
                  name={`QA`}
                  isParBorder={true}
                  Par2Cond={`QA Inspection`}
                  category={category}
                  setCategory={setCategory}
                />
              )}
            {userModel["QA Inspection"].includes(usersData[0].title) &&
              usersData[0].department === "Maintenance" && (
                <Header
                  name={`QA Inspection`}
                  isParBorder={false}
                  category={category}
                  setCategory={setCategory}
                />
              )}
          </div>
        </div>
        {category === "Tasks" && stores && copiedStores ? (
          <Tasks
            stores={stores}
            setStores={setStores}
            users={users}
            fullusers={fullusers}
            copiedStores={copiedStores}
            setCopiedStores={setCopiedStores}
          />
        ) : category === "Workshop" && stores ? (
          <Workshop stores={stores} setStores={setStores} />
        ) : category === "Inspection" ? (
          <Inspection />
        ) : category === "Report" && stores ? (
          <Report stores={stores} setStores={setStores} />
        ) : category === "QA" && stores && copiedStores ? (
          <QA
            stores={stores}
            setStores={setStores}
            users={users}
            fullusers={fullusers}
            copiedStores={copiedStores}
            setCopiedStores={setCopiedStores}
          />
        ) : category === "QA Inspection" ? (
          <QAInspection stores={stores} setStores={setStores} />
        ) : category === "Analysis" && stores ? (
          <Analysis
            stores={stores}
            setStores={setStores}
            copiedStores={copiedStores}
          />
        ) : category === "Files" ? (
          <Files
            stores={stores}
            setStores={setStores}
            copiedStores={copiedStores}
          />
        ) : (
          stores &&
          copiedStores && (
            <Planning
              stores={stores}
              setStores={setStores}
              users={users}
              fullusers={fullusers}
              copiedStores={copiedStores}
              setCopiedStores={setCopiedStores}
            />
          )
        )}
      </div>
    </DragDropContext>
  );
};

export default ManageKanban;
