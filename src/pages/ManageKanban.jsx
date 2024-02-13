import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { IoFilter } from "react-icons/io5";

import { stores } from "../data/Kanban/tasks";

import MainCard from "../components/TaskManager/MainCard";
import { logoColor } from "../BauerColors";

const headerClass =
  "h-full py-2 w-[calc(100vw/6)] flex justify-center items-center text-black font-[400] text-[14px] cursor-pointer";

const ManageKanban = () => {
  const [category, setCategory] = useState("Tasks");
  const handleDragAndDrop = (result) => {
    const { source, destination, type } = result;
    console.log(`source: ${JSON.stringify(source)}`);
    console.log(`destination: ${JSON.stringify(destination)}`);
    console.log(`type: ${type}`);

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
  };

  const handleDragUpdate = () => {};

  useEffect(() => {
    const handleMouseMove = (e) => {
      e.preventDefault();
      const el = document.getElementById("cont");
      const mouseX = e.clientX;

      const isNearRightEdge = window.innerWidth - mouseX < 50;
      const isNearLeftEdge = mouseX < 50;

      if (isNearRightEdge) el.scrollBy(10, 0);

      if (isNearLeftEdge) el.scrollBy(-10, 0);
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const el = document.getElementById("cont");
      const touchX = e.touches[0].clientX;

      const isNearRightEdge = window.innerWidth - touchX < 50;
      const isNearLeftEdge = touchX < 50;

      if (isNearRightEdge) el.scrollBy(10, 0);

      if (isNearLeftEdge) el.scrollBy(-10, 0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
  return (
    <DragDropContext
      onDragEnd={handleDragAndDrop}
      onDragUpdate={handleDragUpdate}
    >
      <div className="w-full h-[92vh] md:mt-0 mt-[58px] flex flex-col gap-2 justify-center">
        <div className="flex flex-col w-full items-center bg-gray-300">
          <div className="w-full flex justify-start items-center font-[700] text-[18px] p-3">
            <p>Yard Task Manager</p>
          </div>
          <div className="w-full h-[35px] flex flex-row justify-between items-center overflow-x-scroll px-2">
            <div
              className={headerClass}
              onClick={() => setCategory("Tasks")}
              style={{
                backgroundColor:
                  category === "Tasks" ? "white" : "rgb(209,213,219)",
                borderTopWidth: category === "Tasks" ? 1 : 0,
                borderRightWidth: category === "Tasks" ? 1 : 0,
                borderLeftWidth: category === "Tasks" ? 1 : 0,
                borderBottomWidth: category === "Tasks" ? 0 : 1,
                borderTopRightRadius: "6px",
                borderTopLeftRadius: "6px",
                borderColor: "rgb(156,163,175)",
              }}
            >
              <p
                className="border-r-1 w-full text-center border-gray-400"
                style={{
                  borderRightWidth:
                    category === "Tasks" || category === "Workshop" ? 0 : 1,
                }}
              >
                Tasks
              </p>
            </div>
            <div
              className={headerClass}
              onClick={() => setCategory("Workshop")}
              style={{
                backgroundColor:
                  category === "Workshop" ? "white" : "rgb(209,213,219)",
                borderTopWidth: category === "Workshop" ? 1 : 0,
                borderRightWidth: category === "Workshop" ? 1 : 0,
                borderLeftWidth: category === "Workshop" ? 1 : 0,
                borderBottomWidth: category === "Workshop" ? 0 : 1,
                borderTopRightRadius: "6px",
                borderTopLeftRadius: "6px",
                borderColor: "rgb(156,163,175)",
              }}
            >
              <p
                className="border-r-1 w-full text-center border-gray-400"
                style={{
                  borderRightWidth:
                    category === "Workshop" || category === "Inspection"
                      ? 0
                      : 1,
                }}
              >
                Workshop
              </p>
            </div>
            <div
              className={headerClass}
              onClick={() => setCategory("Inspection")}
              style={{
                backgroundColor:
                  category === "Inspection" ? "white" : "rgb(209,213,219)",
                borderTopWidth: category === "Inspection" ? 1 : 0,
                borderRightWidth: category === "Inspection" ? 1 : 0,
                borderLeftWidth: category === "Inspection" ? 1 : 0,
                borderBottomWidth: category === "Inspection" ? 0 : 1,
                borderTopRightRadius: "6px",
                borderTopLeftRadius: "6px",
                borderColor: "rgb(156,163,175)",
              }}
            >
              <p
                className="border-r-1 w-full text-center border-gray-400"
                style={{
                  borderRightWidth:
                    category === "Inspection" || category === "Report" ? 0 : 1,
                }}
              >
                Inspection
              </p>
            </div>
            <div
              className={headerClass}
              onClick={() => setCategory("Report")}
              style={{
                backgroundColor:
                  category === "Report" ? "white" : "rgb(209,213,219)",
                borderTopWidth: category === "Report" ? 1 : 0,
                borderRightWidth: category === "Report" ? 1 : 0,
                borderLeftWidth: category === "Report" ? 1 : 0,
                borderBottomWidth: category === "Report" ? 0 : 1,
                borderTopRightRadius: "6px",
                borderTopLeftRadius: "6px",
                borderColor: "rgb(156,163,175)",
              }}
            >
              <p
                className="border-r-1 w-full text-center border-gray-400"
                style={{
                  borderRightWidth:
                    category === "Report" || category === "Planning" ? 0 : 1,
                }}
              >
                Report
              </p>
            </div>
            <div
              className={headerClass}
              onClick={() => setCategory("Planning")}
              style={{
                backgroundColor:
                  category === "Planning" ? "white" : "rgb(209,213,219)",
                borderTopWidth: category === "Planning" ? 1 : 0,
                borderRightWidth: category === "Planning" ? 1 : 0,
                borderLeftWidth: category === "Planning" ? 1 : 0,
                borderBottomWidth: category === "Planning" ? 0 : 1,
                borderTopRightRadius: "6px",
                borderTopLeftRadius: "6px",
                borderColor: "rgb(156,163,175)",
              }}
            >
              <p
                className="border-r-1 w-full text-center border-gray-400"
                style={{
                  borderRightWidth:
                    category === "Planning" || category === "QA Inspection"
                      ? 0
                      : 1,
                }}
              >
                Planning
              </p>
            </div>
            <div
              className={headerClass}
              onClick={() => setCategory("QA Inspection")}
              style={{
                backgroundColor:
                  category === "QA Inspection" ? "white" : "rgb(209,213,219)",
                borderTopWidth: category === "QA Inspection" ? 1 : 0,
                borderRightWidth: category === "QA Inspection" ? 1 : 0,
                borderLeftWidth: category === "QA Inspection" ? 1 : 0,
                borderBottomWidth: category === "QA Inspection" ? 0 : 1,
                borderTopRightRadius: "6px",
                borderTopLeftRadius: "6px",
                borderColor: "rgb(156,163,175)",
              }}
            >
              <p className="w-full text-center border-gray-400">
                QA Inspection
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[6vh] p-2 flex items-center">
          <div className="flex flex-row justify-start gap-2 text-gray-400 text-[12px] items-center py-1 px-3 w-full rounded-[8px] border-1 border-gray-300">
            <IoFilter />
            <p>All</p>
          </div>
        </div>
        <div
          className="w-full h-[72vh] flex flex-row justify-start items-start gap-2 px-2 overflow-x-scroll"
          id="cont"
        >
          <MainCard
            titleBorderColor="green"
            title="To Do"
            id="To Do"
            stores={stores}
          />
          <MainCard
            titleBorderColor="blue"
            title="Ready"
            id="Ready"
            stores={stores}
          />
          <MainCard
            titleBorderColor="red"
            title="Delayed"
            id="Delayed"
            stores={stores}
          />
          <MainCard
            titleBorderColor="red"
            title="Rejected"
            id="Rejected"
            stores={stores}
          />
          <MainCard
            titleBorderColor="green"
            title="Done"
            id="Done"
            stores={stores}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default ManageKanban;
