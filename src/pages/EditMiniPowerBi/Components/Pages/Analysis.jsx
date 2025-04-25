import React from "react";
import MainArea from "../MainArea/MainArea";
import Visualization from "../Sidebars/Visualization";
import TablesList from "../Sidebars/TablesList";
import ToolsSIdebar from "../Sidebars/ToolsSIdebar";
import Properties from "../Sidebars/Properties";
import { useInitContext } from "../../Contexts/InitContext";
import Chatbot from "../Sidebars/Chatbot";

const Analysis = () => {
  const { categoryCount, isPerview, isChatbot } = useInitContext();
  // console.log(isChatbot);
  return (
    <div
      className="w-full h-full flex flex-col justify-between flex-shrink-0 flex-grow-0 relative "
      style={{
        translate: `${-100 * categoryCount}%`,
        transition: `all 0.5s ease-in-out`,
      }}
    >
      <div className="w-full h-full flex flex-row relative">
        {<Chatbot />}
        {<ToolsSIdebar />}

        <MainArea />

        {/* {<Properties />} */}

        {<Visualization />}

        {<TablesList />}
      </div>
    </div>
  );
};

export default Analysis;
