import React, { useRef, useState, useEffect } from "react";

// import { useDragContext } from "./DragContext";
import PropertyCard from "./PropertyCard";
import { useInitContext } from "../../Contexts/InitContext";
// import Drag from "./Drag";
import PropretyCardSkelton from "./PropretyCardSkelton";

const childs = {
  number: [
    { name: "Count" },
    { name: "Sum" },
    { name: "Average" },
    { name: "First" },
    { name: "Last" },
    { name: "Min" },
    { name: "Max" },
  ],
  string: [{ name: "Count" }, { name: "First" }, { name: "Last" }],
  expressions: [
    { name: "Sum" },
    { name: "Multiply" },
    { name: "Difference" },
    { name: "Division" },
  ],
};

const Drop = ({
  category,
  categoryKey,
  item,
  initialItems,
  handleChange,
  onSeenChange,
  handleChoose,
  onDelete,
  limit,
  isSeen,
  isSelect,
  children,
  childItems,
}) => {
  // const { dragItem, isMouseDown, setDragSource } = useDragContext();
  const { data, setData, selectedItem, tablesData } = useInitContext();

  const parentRef = useRef(null);

  // const [isDropTarget, setIsDropTarget] = useState(false);
  const [droppedItems, setDroppedItems] = useState([]);
  const [isOver, setIsOver] = useState(false);
  // const [currentPointer, setCurrentPointer] = useState(null);

  const getPropsIndex = (copiedData, cat, name, table) => {
    console.log(cat);
    if (cat === "X_Axis") {
      return;
    } else if (cat === "expressions") {
    } else {
      return copiedData.el[selectedItem]?.[cat]?.findIndex((el) => {
        if (tablesData?.[table]?.dataTypes?.[name]?.[0] === "number") {
          if (el.name) {
            return el.name === `${name}`;
          } else {
            return el === `${name}`;
          }
        } else {
          if (el.name) {
            return el.name === `${name}`;
          } else {
            return el === `${name}`;
          }
        }
      });
    }
  };

  const filterProps = (copiedData, cat, name, table) => {
    if (cat === "X_Axis") {
      return null;
    } else if (cat === "expressions") {
    } else {
      return copiedData.el[selectedItem]?.[cat]?.filter((el) => {
        if (el.name) {
          return el.name !== name;
        } else {
          return el !== name;
        }
      });
    }
  };

  const updatePropsPosition = (
    copiedData,
    cat,
    name,
    col,
    table,
    currentIndex,
    position,
    flag
  ) => {
    if (cat === "X_Axis") {
      copiedData.el[selectedItem].X_Axis = col;
    } else if (cat === "expressions") {
    } else {
      copiedData.el[selectedItem]?.[cat]?.splice(
        currentIndex < position && flag ? position - 1 : position,
        0,
        typeof copiedData.el[selectedItem]?.[cat]?.[0] === "string"
          ? name
          : {
              opType:
                tablesData?.[table]?.dataTypes?.[name]?.[0] === "number"
                  ? "Sum"
                  : "Count",
              isSeen: true,
              name: name,
              col: col,
              table: table,
              childItems:
                tablesData?.[table]?.dataTypes?.[name]?.[0] === "number"
                  ? childs?.number
                  : childs?.string,
            }
      );
      console.log(copiedData);
    }
  };

  useEffect(() => {
    if (categoryKey === "X_Axis") {
      setDroppedItems(
        data?.el[selectedItem]?.[categoryKey] &&
          data?.el[selectedItem]?.[categoryKey] !== ""
          ? [
              {
                opType: "Count",
                name: data?.el[selectedItem]?.[categoryKey],
                col: data?.el[selectedItem]?.[categoryKey],
                childItems: childs?.string,
              },
            ]
          : []
      );
    } else if (categoryKey === "expressions") {
      setDroppedItems(data?.el[selectedItem]?.[categoryKey]);
    } else {
      setDroppedItems(
        typeof data?.el[selectedItem]?.[categoryKey] === "string"
          ? [data?.el[selectedItem]?.[categoryKey]]
          : data?.el[selectedItem]?.[categoryKey]
      );
    }
  }, [data]);

  const dropAction = (table, name, col, category, position) => {
    if (category === "Fields") {
      handleChange({ table, name, col }, position);
    } else {
      const copiedData = { ...data };
      const currentIndex = getPropsIndex(copiedData, categoryKey, name, table);
      copiedData.el[selectedItem][category] = filterProps(
        copiedData,
        category,
        name,
        table
      );
      updatePropsPosition(
        copiedData,
        categoryKey,
        name,
        col,
        table,
        currentIndex,
        position,
        category === categoryKey
      );
      setData(copiedData);
    }
  };

  const handleDelete = (it) => {
    onDelete(it);
    const copiedItems = [...droppedItems];
    const result = copiedItems.filter((el) => el?.name !== it);
    setDroppedItems(result);
  };

  const handleInputChange = () => {};

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e, position) => {
    e?.preventDefault();
    const droppedTarget = e?.dataTransfer.getData("application/json");
    setIsOver(false);
    if (!droppedTarget) return;

    const data = JSON.parse(droppedTarget);

    dropAction(data?.table, data?.name, data.col, data.category, position);
  };

  return (
    <div
      className="cursor-pointer w-full min-h-[33px] bg-gray-200 dark:bg-gray-800 rounded-md px-1 flex flex-col justify-center items-center"
      ref={parentRef}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDragLeave}
      // onDrop={handleDrop}
      style={{
        borderWidth: isOver ? "1px" : "",
        borderColor: isOver ? "rgb(107,114,128)" : "transparent",
        borderStyle: "dashed",
      }}
    >
      <PropretyCardSkelton handleDrop={(e) => handleDrop(e, 0)} />
      {droppedItems?.map((item, idx) => (
        <React.Fragment
          key={`${item?.name ? item?.name : item}-${idx}-${selectedItem}`}
        >
          <PropertyCard
            childItems={item?.childItems}
            // key={`${item?.name}-${idx}-${selectedItem}`}
            propName={item?.name ? item?.name : item}
            isSeen={isSeen}
            isSelect={isSelect}
            handleDelete={() => handleDelete(item?.name ? item?.name : item)}
            handleChoose={handleChoose}
            onSeenChange={() => onSeenChange(item?.name ? item?.name : item)}
            handleInputChange={handleInputChange}
            categoryKey={categoryKey}
            droppedItems={item}
            cardPosition={idx + 1}
            isDroppable={categoryKey === "expressions" ? true : false}
            // itemOrder={idx}
            // currentPointer={currentPointer}
          />
          <PropretyCardSkelton handleDrop={(e) => handleDrop(e, idx + 1)} />
        </React.Fragment>
      ))}
      {children}
    </div>
  );
};

export default Drop;
