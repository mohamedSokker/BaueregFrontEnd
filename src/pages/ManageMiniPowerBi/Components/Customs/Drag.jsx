import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useInitContext } from "../../Contexts/InitContext";
import { useDragContext } from "./DragContext";

const Child = ({ position, width, category, name, dragItem, component }) => {
  return ReactDOM.createPortal(
    <div
      className="absolute z-[2001] "
      style={{
        width: width,
        top: position?.top,
        left: position?.left,
        display:
          dragItem?.category === category && dragItem?.name === name
            ? "flex"
            : "none",
      }}
      id={`drag-${category}-${name}`}
    >
      {component}
    </div>,
    document.body
  );
};

const Drag = ({ targets = [], name, category, table, children }) => {
  const {
    parentRef,
    dragItem,
    // mouseDown,
    position,
    width,
    setEventType,
    setIsMouseDown,
    currentElement,
    setCurrentElement,
    setDragItem,
    setXCord,
    setYCord,
    setXPosition,
    setYPosition,
    setPosition,
    setWidth,
    mouseMove,
    mouseUp,
    setDragSource,
  } = useDragContext();

  useEffect(() => {
    if (parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();

      setWidth(rect.width);
    }
  }, [parentRef]);

  const mouseDown = (e) => {
    setEventType("move");
    setIsMouseDown(true);
    const resizableElement = document.getElementById(
      `drag-${category}-${name}`
    );

    setCurrentElement(`drag-${category}-${name}`);
    setDragItem({ targets, category, name, table });
    setDragSource({ targets, category, name, table });
    setXCord(e.clientX);
    setYCord(e.clientY);

    const targetEl = document.getElementById(`drag-${category}-${name}`);
    const styles = window.getComputedStyle(targetEl);

    setXPosition(e.clientX);
    setYPosition(e.clientY);

    resizableElement.style.top = `${e.clientY}px`;
    resizableElement.style.left = `${e.clientX - width / 2}px`;
  };

  return (
    <div
      className="relative w-full cursor-grab z-[2001]"
      onMouseDown={mouseDown}
      ref={parentRef}
    >
      {dragItem?.category === category && dragItem?.name === name && (
        <div
          className="absolute  w-full h-full flex flex-col items-center justify-center left-0 top-0 z-[1000]"
          style={{ backdropFilter: "blur(2px)", opacity: 0.8 }}
        ></div>
      )}

      {
        <Child
          position={position}
          width={width}
          category={category}
          name={name}
          dragItem={dragItem}
          component={children}
        />
      }
      {children}
    </div>
  );
};

export default Drag;
