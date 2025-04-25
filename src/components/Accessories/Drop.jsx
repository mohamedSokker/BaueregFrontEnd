import React, { useState } from "react";
import { RxCross2, RxCheck } from "react-icons/rx";

const DropComponent = ({ children, name, className = "", onDrop }) => {
  const [isOver, setIsOver] = useState(false);
  const [droppedItems, setDroppedItems] = useState([]);

  console.log(droppedItems);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedTarget = e.dataTransfer.getData("application/json");
    if (!droppedTarget) return;

    const data = JSON.parse(droppedTarget);
    // console.log(data);
    // console.log(name);
    if (data?.target === name) {
      //   console.log(data);
      setDroppedItems((prev) => [...prev, { ...data }]);
      //   onDrop();
      //   alert(`Dropped ${data?.data} successfully!`);
    } else {
      //   alert("Incorrect drop target!");
    }
    setIsOver(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        width: "100%",
        height: "100%",
        padding: "20px",
        margin: "10px",
        // backgroundColor: isOver ? "lightgreen" : "lightgray",
        border: isOver ? "1px dashed gray" : "none",
        borderRadius: "5px",
        transition: "background-color 0.3s ease",
      }}
      className={className}
    >
      {droppedItems?.map((item, idx) => (
        <div
          key={idx}
          className="w-full p-1 px-2 flex flex-row items-center justify-between bg-gray-400 opacity-60 border-gray-500 border rounded-md relative"
        >
          <div className="flex flex-grow text-[10px]">
            <p className="overflow-ellipsis whitespace-nowrap overflow-hidden">
              {item.data}
            </p>
          </div>
          <div className="flex flex-row gap-[2px]">
            <div
              className="cursor-pointer hover:text-gray-700"
              //   onClick={handleDelete}
            >
              <RxCross2 size={14} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DropComponent;
