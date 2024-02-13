import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import MainCard from "../components/TaskManager/MainCard";

const ManageKanban = () => {
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

  useEffect(() => {
    const handleMouseMove = (e) => {
      const el = document.getElementById("cont");
      const mouseX = e.clientX;

      const isNearRightEdge = window.innerWidth - mouseX < 50;
      const isNearLeftEdge = mouseX < 50;

      if (isNearRightEdge) el.scrollBy(10, 0);

      if (isNearLeftEdge) el.scrollBy(-10, 0);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <DragDropContext onDragEnd={handleDragAndDrop}>
      <div className="w-full h-full md:mt-0 mt-[58px] pt-3">
        <div
          className="w-full h-full flex flex-row justify-start items-start gap-2 px-2 overflow-x-scroll"
          id="cont"
        >
          <MainCard titleBorderColor="green" title="To Do" id="To Do" />
          <MainCard titleBorderColor="blue" title="Ready" id="Ready" />
          <MainCard titleBorderColor="red" title="Delayed" id="Delayed" />
          <MainCard titleBorderColor="red" title="Rejected" id="Rejected" />
          <MainCard titleBorderColor="green" title="Done" id="Done" />
        </div>
      </div>
    </DragDropContext>
  );
};

export default ManageKanban;
