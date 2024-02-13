import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { CiClock1 } from "react-icons/ci";

const Card = ({ id, items }) => {
  return (
    <Droppable droppableId={id} isScrollable={true} shouldUsePlaceholder={true}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="w-full h-full flex flex-col gap-1"
        >
          {items.map((item, index) => (
            <Draggable draggableId={item.id} index={index} key={item.id}>
              {(provided) => (
                <div
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                  className="w-full flex flex-col gap-2 bg-gray-100 rounded-md border-1 border-gray-400 p-2"
                >
                  <div className="w-full flex flex-row gap-2 justify-between items-center text-gray-600">
                    <div className="flex flex-row gap-1 items-center">
                      <div className="w-3 h-3 rounded-full border-1 border-green-600 flex justify-center items-center">
                        <div className="w-0 h-0 border-1 border-green-600 rounded-full"></div>
                      </div>
                      <p>{item?.title}</p>
                    </div>
                    {item.pic !== "" && (
                      <img
                        src={item?.pic}
                        alt="profile-pic"
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                  </div>
                  <div className="w-full font-[600]">
                    <h4>{item?.desc}</h4>
                  </div>
                  <div className="w-full flex flex-col items-start gap-2 text-gray-600 font-[200] text-[14px]">
                    {item.start !== "" && (
                      <div className="flex flex-row gap-1 items-center">
                        <CiClock1 />
                        <p className="text-[10px]">
                          {`Start: ${new Date(
                            item.start
                          ).toLocaleTimeString()}`}
                        </p>
                      </div>
                    )}
                    {item.end !== "" && (
                      <div className="flex flex-row gap-1 items-center">
                        <CiClock1 />
                        <p className="text-[10px]">{`End: ${new Date(
                          item.end
                        ).toLocaleTimeString()}`}</p>
                      </div>
                    )}
                  </div>
                  <div className="w-full flex flex-row gap-2 flex-wrap">
                    <div className="p-[2px] px-4 rounded-full border-1 border-blue-600 text-[14px] text-blue-600 bg-[rgba(37,99,235,0.3)] font-[500]">
                      {item?.eq}
                    </div>
                    <div
                      className="p-[2px] px-4 rounded-full border-1 text-[14px] font-[500] bg-[rgb(235,166,37)]"
                      style={{
                        borderColor:
                          item.periority === "high"
                            ? "rgb(220,38,38)"
                            : item.periority === "medium"
                            ? "rgb(235,166,37)"
                            : "rgb(68,220,38)",
                        backgroundColor:
                          item.periority === "high"
                            ? "rgba(220,38,38,0.1)"
                            : item.periority === "medium"
                            ? "rgba(235,166,37,0.1)"
                            : "rgba(68,220,38,0.1)",
                        color:
                          item.periority === "high"
                            ? "rgba(220,38,38,1)"
                            : item.periority === "medium"
                            ? "rgba(235,166,37,1)"
                            : "rgba(68,220,38,1)",
                      }}
                    >
                      {item?.periority}
                    </div>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Card;
