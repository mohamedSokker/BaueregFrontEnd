import React from "react";
import { IoFilter } from "react-icons/io5";

import { stores } from "../../../../data/Kanban/tasks";
import MainCard from "../components/MainCard";

const Tasks = () => {
  return (
    <>
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
          w={"300px"}
        />
        <MainCard
          titleBorderColor="blue"
          title="Ready"
          id="Ready"
          stores={stores}
          w={"300px"}
        />
        <MainCard
          titleBorderColor="red"
          title="Delayed"
          id="Delayed"
          stores={stores}
          w={"300px"}
        />
        <MainCard
          titleBorderColor="red"
          title="Rejected"
          id="Rejected"
          stores={stores}
          w={"300px"}
        />
        <MainCard
          titleBorderColor="green"
          title="Done"
          id="Done"
          stores={stores}
          w={"300px"}
        />
      </div>
    </>
  );
};

export default Tasks;
