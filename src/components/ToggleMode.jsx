import React from "react";
import { useNavContext } from "../contexts/NavContext";

const ToggleMode = () => {
  const { setCurrentMode } = useNavContext();
  return (
    <div
      id="toggleParent"
      className="w-8 h-4 p-1 bg-gray-300 mr-2 ml-2 flex flex-row justify-start items-center hover:cursor-pointer rounded-full"
      style={{ transition: "all 0.5s ease-in-out" }}
      onClick={() => {
        let toggleEl = document.getElementById("toggle-Mode");
        let toggleParent = document.getElementById("toggleParent");
        if (toggleEl.classList.contains("toggleMode-in")) {
          toggleEl.classList.remove("toggleMode-in");
          toggleEl.classList.add("toggleMode-out");
          toggleParent.style.backgroundColor = "rgb(209,213,219)";
          setCurrentMode("Light");
        } else {
          toggleEl.classList.remove("toggleMode-out");
          toggleEl.classList.add("toggleMode-in");
          toggleParent.style.backgroundColor = "green";
          setCurrentMode("Dark");
        }
      }}
    >
      <div id="toggle-Mode" className="bg-white w-3 h-3 rounded-full"></div>
    </div>
  );
};

export default ToggleMode;
