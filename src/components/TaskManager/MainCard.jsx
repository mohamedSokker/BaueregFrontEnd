import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import profile from "../../assets/profile.jpg";

import Card from "./Card";

const stores = {
  "To Do": [
    {
      id: "1",
      desc: "Task1",
      name: "sokker",
      pic: "",
      eq: ["MC 128 #169"],
      periority: "high",
      title: "Gearbox",
      start: "",
      end: "",
    },
    {
      id: "2",
      desc: "Task2",
      name: "bahaa",
      pic: "",
      eq: ["MC 128 #169"],
      periority: "medium",
      title: "Deisel",
      start: "",
      end: "",
    },
    {
      id: "3",
      desc: "Task3",
      name: "wael",
      pic: "",
      eq: ["MC 128 #169"],
      periority: "low",
      title: "Painting",
      start: "",
      end: "",
    },
    {
      id: "22",
      desc: "Task22",
      name: "sokker",
      pic: "",
      eq: ["MC 128 #169"],
      periority: "high",
      title: "Gearbox",
      start: "",
      end: "",
    },
    {
      id: "23",
      desc: "Task23",
      name: "bahaa",
      pic: "",
      eq: ["MC 128 #169"],
      periority: "medium",
      title: "Gearbox",
      start: "",
      end: "",
    },
    {
      id: "24",
      desc: "Task24",
      name: "wael",
      pic: "",
      eq: ["MC 128 #169"],
      periority: "low",
      title: "Gearbox",
      start: "",
      end: "",
    },
  ],
  Ready: [
    {
      id: "4",
      desc: "Task4",
      name: "sokker",
      pic: profile,
      eq: ["MC 128 #169"],
      periority: "high",
      title: "Gearbox",
      start: "2024-02-12 08:00",
      end: "",
    },
    {
      id: "5",
      desc: "Task5",
      name: "bahaa",
      pic: profile,
      eq: ["MC 128 #169"],
      periority: "high",
      title: "Gearbox",
      start: "2024-02-12 08:00",
      end: "",
    },
    {
      id: "6",
      desc: "Task6",
      name: "wael",
      pic: profile,
      eq: ["MC 128 #169"],
      periority: "high",
      title: "Gearbox",
      start: "2024-02-12 08:00",
      end: "",
    },
  ],
  Delayed: [
    {
      id: "7",
      desc: "Task7",
      name: "sokker",
      pic: profile,
      eq: ["MC 128 #169"],
      periority: "high",
      title: "Gearbox",
      start: "2024-02-12 08:00",
      end: "",
    },
    {
      id: "8",
      desc: "Task8",
      name: "bahaa",
      pic: profile,
      eq: ["MC 128 #169"],
      periority: "high",
      title: "Gearbox",
      start: "2024-02-12 08:00",
      end: "",
    },
    {
      id: "9",
      desc: "Task9",
      name: "wael",
      pic: profile,
      eq: ["MC 128 #169"],
      periority: "high",
      title: "Gearbox",
      start: "2024-02-12 08:00",
      end: "",
    },
  ],
  Rejected: [
    {
      id: "13",
      desc: "Task13",
      name: "sokker",
      pic: profile,
      eq: ["MC 128 #169"],
      periority: "high",
      title: "Gearbox",
      start: "2024-02-12 08:00",
      end: "2024-02-12 10:30",
    },
    {
      id: "14",
      desc: "Task14",
      name: "bahaa",
      pic: profile,
      eq: ["MC 128 #169"],
      periority: "high",
      title: "Gearbox",
      start: "2024-02-12 08:00",
      end: "2024-02-12 10:30",
    },
    {
      id: "15",
      desc: "Task15",
      name: "wael",
      pic: profile,
      eq: ["MC 128 #169"],
      periority: "high",
      title: "Gearbox",
      start: "2024-02-12 08:00",
      end: "2024-02-12 10:30",
    },
  ],
  Done: [
    {
      id: "16",
      desc: "Task16",
      name: "sokker",
      pic: profile,
      eq: ["MC 128 #169"],
      periority: "high",
      title: "Gearbox",
      start: "2024-02-12 08:00",
      end: "2024-02-12 10:30",
    },
    {
      id: "17",
      desc: "Task17",
      name: "bahaa",
      pic: profile,
      eq: ["MC 128 #169"],
      periority: "high",
      title: "Gearbox",
      start: "2024-02-12 08:00",
      end: "2024-02-12 10:30",
    },
    {
      id: "18",
      desc: "Task18",
      name: "wael",
      pic: profile,
      eq: ["MC 128 #169"],
      periority: "high",
      title: "Gearbox",
      start: "2024-02-12 08:00",
      end: "2024-02-12 10:30",
    },
    {
      id: "19",
      desc: "Task19",
      name: "sokker",
      pic: profile,
      eq: ["MC 128 #169"],
      periority: "high",
      title: "Gearbox",
      start: "2024-02-12 08:00",
      end: "2024-02-12 10:30",
    },
    {
      id: "20",
      desc: "Task20",
      name: "bahaa",
      pic: profile,
      eq: ["MC 128 #169"],
      periority: "high",
      title: "Gearbox",
      start: "2024-02-12 08:00",
      end: "2024-02-12 10:30",
    },
    {
      id: "21",
      desc: "Task21",
      name: "wael",
      pic: profile,
      eq: ["MC 128 #169"],
      periority: "high",
      title: "Gearbox",
      start: "2024-02-12 08:00",
      end: "2024-02-12 10:30",
    },
  ],
};

const MainCard = ({ titleBorderColor, title, id }) => {
  return (
    <div className="flex flex-col justify-start items-start min-w-[300px] h-[98%] bg-gray-300 rounded-md p-1 border-1 border-gray-400 ">
      <div className="w-full flex flex-row justify-start items-center gap-[6px] mb-2 px-1">
        <div
          className="w-4 h-4 rounded-full border-2 bg-gray-200"
          style={{ borderColor: titleBorderColor }}
        ></div>
        <div className="text-black font-[800] text-[16px]">{title}</div>
        <div className="bg-gray-100 px-1 rounded-full text-gray-600 text-[12px] font-[800] flex justify-center items-center">
          {stores[id].length}
        </div>
      </div>
      <div className="w-full h-full overflow-y-scroll">
        <Card id={id} items={stores[id]} />
      </div>
    </div>
  );
};

export default MainCard;
