import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2, RxCheck } from "react-icons/rx";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

import { useInitContext } from "../../Contexts/InitContext";
import { useDragContext } from "./DragContext";

const expressionsSigns = {
  Multiply: "*",
  Sum: "+",
  Difference: "-",
  Division: "/",
};

const Child = ({
  propertyName,
  position,
  width,
  checkedItem,
  setCheckedItem,
  handleChoose,
  setIsPropPanel,
  childItems,
  droppedItems,
}) => {
  return ReactDOM.createPortal(
    <div
      className=" bg-gray-100 dark:bg-gray-900  max-h-[200px] overflow-y-scroll text-[10px] border border-gray-400 rounded-[6px]"
      style={{
        width: width,
        top: position.top,
        left: position.left,
        zIndex: 1001,
        position: "absolute",
        scrollbarWidth: "none",
      }}
    >
      {childItems?.map((item, idx) => (
        <div
          key={idx}
          className="w-full flex flex-row items-center gap-1 p-1 px-2 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700"
          onClick={() => {
            setCheckedItem(item?.name);
            handleChoose(item?.name, droppedItems, propertyName);
            setIsPropPanel(false);
          }}
        >
          {checkedItem === item?.name && <RxCheck />}

          <p>{item?.name}</p>
        </div>
      ))}
    </div>,
    document.body
  );
};

const PropertyCard = ({
  propName = "Name",
  isSeen,
  isSelect,
  handleDelete,
  onSeenChange,
  handleChoose,
  handleInputChange,
  categoryKey,
  childItems,
  droppedItems,
  cardPosition,
  isDroppable,
  // itemOrder,
  // currentPointer,
}) => {
  const { data, setData, selectedItem } = useInitContext();
  // const { xCord, yCord, setXCord, setYCord } = useDragContext();

  const [isChangeProp, setIsChangeProp] = useState(false);
  const [isPropPanel, setIsPropPanel] = useState(false);
  const [propertyName, setPropertyName] = useState(propName);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [width, setWidth] = useState(0);
  const [checkedItem, setCheckedItem] = useState("Count");
  const [currentChangingTooltip, setCurrentChangingTooltip] = useState(null);
  const [isOver, setIsOver] = useState(false);
  // const [xCord, setXCord] = useState(0);
  // const [yCord, setYCord] = useState(0);

  const parentRef = useRef(null);

  const clacParentPosition = () => {
    if (parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();

      setPosition({
        top: rect.top + rect.height / 2,
        left: rect.left - rect.width / 2,
      });

      setWidth(rect.width);
    }
  };

  useEffect(() => {
    clacParentPosition();
  }, []);

  useEffect(() => {
    const propPanel = document.getElementById("prop-panel");
    propPanel.addEventListener("scroll", clacParentPosition);

    return () => {
      propPanel.removeEventListener("scroll", clacParentPosition);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsChangeProp(false);

    if (categoryKey === "tooltips") {
      const copiedData = { ...data };
      // const result = [];
      const toolTipResult = [];
      // copiedData.el[selectedItem]?.tooltipProps?.map((prop) => {
      //   if (prop?.name === currentChangingTooltip?.name) {
      //     result.push({ ...prop, name: propertyName });
      //   } else {
      //     result.push(prop);
      //   }
      // });
      copiedData.el[selectedItem]?.tooltips?.map((prop) => {
        if (prop?.name === currentChangingTooltip?.name) {
          toolTipResult.push({ ...prop, name: propertyName });
        } else {
          toolTipResult.push(prop);
        }
      });
      copiedData.el[selectedItem] = {
        ...copiedData.el[selectedItem],
        // tooltipProps: toolTipResult,
        tooltips: toolTipResult,
      };
      console.log(copiedData);
      setData(copiedData);
    } else if (categoryKey === "Y_Axis") {
      const copiedData = { ...data };
      const result = [];
      copiedData.el[selectedItem]?.[`Y_Axis`]?.map((prop) => {
        if (prop?.name === currentChangingTooltip?.name) {
          result.push({ ...prop, name: propertyName });
        } else {
          result.push(prop);
        }
      });
      copiedData.el[selectedItem] = {
        ...copiedData.el[selectedItem],
        [`Y_Axis`]: result,
      };
      console.log(copiedData);
      setData(copiedData);
    } else if (categoryKey === "expressions") {
      const copiedData = { ...data };
      const result = [];
      copiedData.el[selectedItem]?.[`expressions`]?.map((prop) => {
        if (prop?.name === currentChangingTooltip?.name) {
          result.push({ ...prop, name: propertyName });
        } else {
          result.push(prop);
        }
      });
      copiedData.el[selectedItem] = {
        ...copiedData.el[selectedItem],
        [`expressions`]: result,
      };
      console.log(copiedData);
      setData(copiedData);
    }
    handleInputChange();
  };

  const handleClearChangeProp = () => {
    setIsChangeProp(false);
    setIsPropPanel(false);
  };

  useLayoutEffect(() => {
    const mainArea = document.getElementById("Main-Area");
    mainArea.addEventListener("click", handleClearChangeProp);

    return () => {
      mainArea.removeEventListener("click", handleClearChangeProp);
    };
  }, []);

  const handleDragStart = (e) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        category: `${categoryKey}`,
        name: `${droppedItems?.name ? droppedItems?.name : droppedItems}`,
        col: `${droppedItems?.col}`,
        table: droppedItems?.table,
        targets: [`Tooltip`, `Columns`],
        cardPosition: cardPosition ? cardPosition : "not Exist",
      })
    );

    e.target.style.opacity = "0.4";
  };
  const handleDragEnd = (e) => {
    e.target.style.opacity = "0.6";
    e.target.style.borderTopWidth = "0px";
    e.target.style.borderTopColor = "transparent";
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedTarget = e?.dataTransfer.getData("application/json");
    setIsOver(false);
    if (!droppedTarget) return;

    const droppedData = JSON.parse(droppedTarget);
    console.log(droppedData);
    const copiedData = { ...data };
    const result = [];
    copiedData.el[selectedItem]?.expressions?.map((el) => {
      if (el?.name === propertyName) {
        result.push({
          ...el,
          secondArg: droppedData?.name,
          name: `${el?.firstArg} ${expressionsSigns[el?.opType]} ${
            droppedData?.name
          }`,
        });
      } else {
        result.push(el);
      }
    });
    copiedData.el[selectedItem] = {
      ...copiedData.el[selectedItem],
      expressions: result,
    };
    console.log(copiedData);
    setData(copiedData);
  };

  // const handleDrag = (e) => {
  //   setXCord(e.clientX);
  //   setYCord(e.clientY);
  // };
  return (
    <div
      className="w-full flex flex-col gap-0"
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* {itemOrder === currentPointer && (
        <div className="w-full h-[2px] bg-orange-300"></div>
      )} */}

      <div
        className="w-full h-[25px] px-2 flex flex-row items-center justify-between bg-gray-400 dark:bg-gray-600 opacity-60 border-gray-500 border rounded-md relative "
        style={{
          borderStyle: isOver && isDroppable ? "dashed" : "solid",
          // borderWidth: isOver && isDroppable ? "2px" : "1px",
          borderColor: isOver && isDroppable ? "black" : "rgb(107,114,128)",
          opacity: isOver && isDroppable ? "1" : "0.6",
        }}
        id={`prop-${
          typeof propertyName === "object" ? propertyName?.name : propertyName
        }`}
        draggable={categoryKey !== "expressions" ? true : false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        // onDrag={handleDrag}
        ref={parentRef}
        // style={{
        //   borderTopWidth:
        //     yCord < position?.top && position?.top - yCord < 29 ? "2px" : "0px",
        //   borderTopColor:
        //     yCord < position?.top && position?.top - yCord < 29
        //       ? "orange"
        //       : "transparent",
        // }}
      >
        {isChangeProp ? (
          <form
            className="w-[100%] text-[10px] text-black dark:text-white"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              id={`changePropInput-${
                typeof propertyName === "object"
                  ? propertyName?.name
                  : propertyName
              }-${selectedItem}`}
              className=" outline-none w-full px-1"
              defaultValue={
                typeof propertyName === "object"
                  ? propertyName?.name
                  : propertyName
              }
              onChange={(e) => {
                setPropertyName(e.target.value);
              }}
              onBlur={() => setIsChangeProp(false)}
            />
          </form>
        ) : (
          <>
            <div
              className="flex flex-grow text-[10px] overflow-ellipsis whitespace-nowrap overflow-hidden"
              onDoubleClick={() => {
                setIsChangeProp(true);
                const changePropInput = document.getElementById(
                  `changePropInput-${
                    typeof propertyName === "object"
                      ? propertyName?.name
                      : propertyName
                  }-${selectedItem}`
                );
                changePropInput?.focus();

                const copiedData = { ...data };
                if (categoryKey === "tooltips") {
                  copiedData.el[selectedItem]?.tooltips?.map((prop) => {
                    if (prop?.name === propertyName) {
                      setCurrentChangingTooltip(prop);
                    }
                  });
                } else if (categoryKey === "Y_Axis") {
                  copiedData.el[selectedItem]?.[`Y_Axis`]?.map((prop) => {
                    if (prop?.name === propertyName) {
                      setCurrentChangingTooltip(prop);
                    }
                  });
                } else if (categoryKey === "expressions") {
                  copiedData.el[selectedItem]?.[`expressions`]?.map((prop) => {
                    if (prop?.name === propertyName) {
                      setCurrentChangingTooltip(prop);
                    }
                  });
                }
              }}
            >
              <p className="overflow-ellipsis whitespace-nowrap overflow-hidden">
                {typeof propertyName === "object"
                  ? propertyName?.name
                  : propertyName}
              </p>
            </div>
            <div className="flex flex-row gap-[2px]">
              {isSeen && (
                <div
                  className="cursor-pointer hover:text-gray-700 dark:hover:text-white"
                  onClick={onSeenChange}
                >
                  {droppedItems?.isSeen === true ? (
                    <IoIosEye />
                  ) : (
                    <IoIosEyeOff />
                  )}
                </div>
              )}
              {isSelect && (
                <div
                  className="cursor-pointer hover:text-gray-700 dark:hover:text-white"
                  onClick={() => {
                    clacParentPosition();
                    setIsPropPanel((prev) => !prev);
                    if (categoryKey === "tooltips") {
                      const targetEl = data.el[selectedItem]?.tooltips?.find(
                        (item) => item.name === propertyName
                      );
                      targetEl
                        ? setCheckedItem(targetEl?.opType)
                        : setCheckedItem("Count");
                    } else {
                      const targetEl = data.el[selectedItem]?.[
                        categoryKey
                      ]?.find((item) => {
                        // console.log(item.name);
                        return typeof propertyName === "object"
                          ? item.name === propertyName?.name
                          : item.name === propertyName;
                      });
                      targetEl
                        ? setCheckedItem(targetEl?.opType)
                        : setCheckedItem("Count");
                    }
                  }}
                >
                  <IoIosArrowDown size={14} />
                </div>
              )}

              <div
                className="cursor-pointer hover:text-gray-700 dark:hover:text-white"
                onClick={handleDelete}
              >
                <RxCross2 size={14} />
              </div>
            </div>
          </>
        )}

        {isPropPanel && (
          <Child
            childItems={childItems}
            propertyName={
              typeof propertyName === "object"
                ? propertyName?.name
                : propertyName
            }
            setPropertyName={setPropertyName}
            position={position}
            width={width}
            checkedItem={checkedItem}
            setCheckedItem={setCheckedItem}
            data={data}
            setData={setData}
            selectedItem={selectedItem}
            handleChoose={handleChoose}
            categoryKey={categoryKey}
            setIsPropPanel={setIsPropPanel}
            droppedItems={droppedItems}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
