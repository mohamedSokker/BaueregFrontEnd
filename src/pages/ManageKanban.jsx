import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import Header from "../subPages/TaskManager/Tasks/components/Header";
import Tasks from "../subPages/TaskManager/Tasks/view/Tasks";
import Workshop from "../subPages/TaskManager/Workshop/View/Workshop";
import Inspection from "../subPages/TaskManager/Inspection/View/Inspection";
import Planning from "../subPages/TaskManager/Planning";
import QA from "../subPages/TaskManager/QA";
import Report from "../subPages/TaskManager/Report";

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
            <Header
              name={`Tasks`}
              isParBorder={true}
              Par2Cond={`Workshop`}
              category={category}
              setCategory={setCategory}
            />
            <Header
              name={`Workshop`}
              isParBorder={true}
              Par2Cond={`Inspection`}
              category={category}
              setCategory={setCategory}
            />
            <Header
              name={`Inspection`}
              isParBorder={true}
              Par2Cond={`Report`}
              category={category}
              setCategory={setCategory}
            />
            <Header
              name={`Report`}
              isParBorder={true}
              Par2Cond={`Planning`}
              category={category}
              setCategory={setCategory}
            />
            <Header
              name={`Planning`}
              isParBorder={true}
              Par2Cond={`QA Inspection`}
              category={category}
              setCategory={setCategory}
            />
            <Header
              name={`QA`}
              isParBorder={false}
              category={category}
              setCategory={setCategory}
            />
          </div>
        </div>
        {category === "Tasks" ? (
          <Tasks />
        ) : category === "Workshop" ? (
          <Workshop />
        ) : category === "Inspection" ? (
          <Inspection />
        ) : category === "Report" ? (
          <Report />
        ) : category === "QA" ? (
          <QA />
        ) : (
          <Planning />
        )}
      </div>
    </DragDropContext>
  );
};

export default ManageKanban;
