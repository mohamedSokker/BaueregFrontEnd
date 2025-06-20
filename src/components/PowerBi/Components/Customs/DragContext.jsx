import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useInitContext } from "../../Contexts/InitContext";

const DragContext = createContext();

export const DragContextProvider = ({ children }) => {
  const { dragItem, setDragItem } = useInitContext();

  const parentRef = useRef(null);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [xCord, setXCord] = useState(0);
  const [yCord, setYCord] = useState(0);
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [currentElement, setCurrentElement] = useState(null);
  // const [currentIndex, setCurrentIndex] = useState(null);
  const [eventType, setEventType] = useState(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [width, setWidth] = useState(0);
  const [dropPosition, setDropPosition] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });
  const [dragSource, setDragSource] = useState(null);

  const mouseMove = (e) => {
    if (isMouseDown && currentElement && eventType) {
      const resizableElement = document.getElementById(currentElement);

      if (eventType === "move") {
        const dx = e.clientX - xCord;
        const dy = e.clientY - yCord;

        setXCord(e.clientX);
        setYCord(e.clientY);

        setXPosition((prev) => prev + dx);
        setYPosition((prev) => prev + dy);

        resizableElement.style.top = `${parseFloat(yPosition)}px`;
        resizableElement.style.left = `${parseFloat(xPosition) - width / 2}px`;
      }
    }
  };
  const mouseUp = () => {
    setEventType(null);
    setDragItem(null);
    setIsMouseDown(false);
  };

  return (
    <DragContext.Provider
      value={{
        parentRef,
        dragItem,
        position,
        width,
        mouseMove,
        mouseUp,
        setEventType,
        isMouseDown,
        setIsMouseDown,
        currentElement,
        setCurrentElement,
        setDragItem,
        xCord,
        yCord,
        setXCord,
        setYCord,
        setXPosition,
        setYPosition,
        setPosition,
        setWidth,
        dropPosition,
        setDropPosition,
        dragSource,
        setDragSource,
      }}
    >
      {children}
    </DragContext.Provider>
  );
};

export const useDragContext = () => useContext(DragContext);
