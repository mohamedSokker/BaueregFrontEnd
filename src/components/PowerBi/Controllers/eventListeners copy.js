import { useLayoutEffect, useState } from "react";
import { slicerProps } from "../Model/model";

// import { DBData } from "../Model/model";

const useEvenetListener = () => {
  const [data, setData] = useState({ el: [] });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [xCord, setXCord] = useState(0);
  const [yCord, setYCord] = useState(0);
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [currentElement, setCurrentElement] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [eventType, setEventType] = useState(null);
  const [categoryCount, setCategoryCount] = useState(0);

  // console.log(data);

  // useLayoutEffect(() => {
  //   const container = document.getElementById("Main-Area");
  //   const containerStyles = container && window.getComputedStyle(container);
  //   setData((prev) => ({
  //     ...prev,
  //     el: [...prev?.el],
  //     containerStyles: {
  //       initialWidth: containerStyles?.width,
  //       width: containerStyles?.width,
  //       height: containerStyles?.height,
  //       scale: 1,
  //     },
  //   }));
  // }, []);

  const resizableElProps = (styles) => {
    // console.log(`Resize Element Function Trigger`);

    const container = document.getElementById("Main-Area");
    const containerStyles = window.getComputedStyle(container);
    // const copiedData = [...data];
    const copiedData = { ...data };
    const targetItem = copiedData?.el?.find(
      (el) => Number(el.ID) === currentIndex
    );

    // console.log(parseFloat(styles.top));

    const updatedData = {
      ...targetItem,
      top: `${
        (parseFloat(styles.top) / parseFloat(containerStyles.height)) * 100
      }%`,
      left: `${
        (parseFloat(styles.left) / parseFloat(containerStyles.width)) * 100
      }%`,
      width: `${
        (parseFloat(styles.width) / parseFloat(containerStyles.width)) * 100
      }%`,
      height: `${
        (parseFloat(styles.height) / parseFloat(containerStyles.height)) * 100
      }%`,
    };
    const targetIndex = copiedData?.el?.findIndex(
      (el) => Number(el.ID) === currentIndex
    );
    // console.log(copiedData, currentIndex, targetItem, targetIndex);
    copiedData.el[targetIndex] = { ...updatedData };
    setData(copiedData);
  };

  const mouseMoveMove = (e) => {
    if (isMouseDown && currentElement && eventType) {
      const resizableElement = document.getElementById(currentElement);
      const styles = window.getComputedStyle(resizableElement);

      const container = document.getElementById("Main-Area");
      const containerStyles = window.getComputedStyle(container);
      let width = parseInt(styles.width, 10);
      let height = parseInt(styles.height, 10);
      if (eventType === "move") {
        // console.log(`move event`);
        const dx = e.clientX - xCord;
        const dy = e.clientY - yCord;

        setXCord(e.clientX);
        setYCord(e.clientY);

        setXPosition((prev) => prev + dx);
        setYPosition((prev) => prev + dy);

        // resizableElement.style.top = `${yPosition}px`;
        resizableElement.style.top = `${
          (parseFloat(yPosition) / parseFloat(containerStyles.height)) * 100
        }%`;
        // resizableElement.style.left = `${xPosition}px`;
        resizableElement.style.left = `${
          (parseFloat(xPosition) / parseFloat(containerStyles.width)) * 100
        }%`;
      } else if (eventType === "resizeTop") {
        // console.log("resizeTop");
        const dy = e.clientY - yCord;
        height = height - dy;
        setYCord(e.clientY);
        resizableElement.style.height = `${height}px`;
        // resizableElement.style.height = `${
        //   (parseFloat(height) / parseFloat(containerStyles.height)) * 100
        // }%`;
      } else if (eventType === "resizeBottom") {
        // console.log("resizeBottom");
        const dy = e.clientY - yCord;
        height = height + dy;
        setYCord(e.clientY);
        resizableElement.style.height = `${height}px`;
        // resizableElement.style.height = `${
        //   (parseFloat(height) / parseFloat(containerStyles.height)) * 100
        // }%`;
      } else if (eventType === "resizeLeft") {
        // console.log(`resizeLeft`);
        const dx = e.clientX - xCord;
        setXCord(e.clientX);
        width = width - dx;
        // resizableElement.style.width = `${width}px`;
        resizableElement.style.width = `${
          (parseFloat(width) / parseFloat(containerStyles.width)) * 100
        }%`;
      } else if (eventType === "resizeRight") {
        // console.log(`resizeRight`);
        const dx = e.clientX - xCord;
        setXCord(e.clientX);
        width = width + dx;
        // resizableElement.style.width = `${width}px`;
        resizableElement.style.width = `${
          (parseFloat(width) / parseFloat(containerStyles.width)) * 100
        }%`;
      }
      // resizableElProps(styles);
    }
  };

  const mouseUpMove = (e) => {
    // console.log(`MouseupMove Function Trigger`);
    setEventType(null);
    if (eventType) {
      setIsMouseDown(false);
      const resizableElement = document.getElementById(currentElement);
      const styles =
        resizableElement && window.getComputedStyle(resizableElement);
      styles && resizableElProps(styles);
    }
  };

  const mouseDownMove = (e, i) => {
    // console.log(`MouseDownMove Function Trigger`);
    setEventType("move");
    setIsMouseDown(true);
    setCurrentElement(`resizable${i}`);
    setCurrentIndex(i);
    setXCord(e.clientX);
    setYCord(e.clientY);

    const targetEl = document.getElementById(`resizable${i}`);
    const styles = window.getComputedStyle(targetEl);

    setXPosition(parseInt(styles.left, 10));
    setYPosition(parseInt(styles.top, 10));

    // console.log(item);
    // mouseMoveMove(item);
  };

  const mouseDownTopResize = (e, i) => {
    // console.log(`mouseDownTopResize Function Trigger`);
    setEventType("resizeTop");
    setIsMouseDown(true);
    setCurrentElement(`resizable${i}`);
    setCurrentIndex(i);
    const resizableElement = document.getElementById(`resizable${i}`);
    setYCord(e.clientY);
    const styles = window.getComputedStyle(resizableElement);

    const container = document.getElementById("Main-Area");
    const containerStyles = window.getComputedStyle(container);
    // resizableElement.style.bottom = styles.bottom;
    resizableElement.style.bottom = `${
      (parseFloat(styles.bottom) / parseFloat(containerStyles.height)) * 100
    }%`;
    resizableElement.style.top = null;
  };

  const mouseDownBottomResize = (e, i) => {
    // console.log(`mouseDownBottomResize Function Trigger`);
    setEventType("resizeBottom");
    setIsMouseDown(true);
    setCurrentElement(`resizable${i}`);
    setCurrentIndex(i);
    const resizableElement = document.getElementById(`resizable${i}`);
    setYCord(e.clientY);
    const styles = window.getComputedStyle(resizableElement);

    const container = document.getElementById("Main-Area");
    const containerStyles = window.getComputedStyle(container);
    // resizableElement.style.top = styles.top;
    resizableElement.style.top = `${
      (parseFloat(styles.top) / parseFloat(containerStyles.height)) * 100
    }%`;
    resizableElement.style.bottom = null;
  };

  const mouseDownLeftResize = (e, i) => {
    // console.log(`mouseDownLeftResize Function Trigger`);
    setEventType("resizeLeft");
    setIsMouseDown(true);
    setCurrentElement(`resizable${i}`);
    setCurrentIndex(i);
    const resizableElement = document.getElementById(`resizable${i}`);
    setXCord(e.clientX);
    const styles = window.getComputedStyle(resizableElement);

    const container = document.getElementById("Main-Area");
    const containerStyles = window.getComputedStyle(container);
    // resizableElement.style.right = styles.right;
    resizableElement.style.right = `${
      (parseFloat(styles.right) / parseFloat(containerStyles.width)) * 100
    }%`;
    resizableElement.style.left = null;
  };

  const mouseDownRightResize = (e, i) => {
    // console.log(`mouseDownRightResize Function Trigger`);
    setEventType("resizeRight");
    setIsMouseDown(true);
    setCurrentElement(`resizable${i}`);
    setCurrentIndex(i);
    const resizableElement = document.getElementById(`resizable${i}`);
    setXCord(e.clientX);
    const styles = window.getComputedStyle(resizableElement);

    const container = document.getElementById("Main-Area");
    const containerStyles = window.getComputedStyle(container);
    // resizableElement.style.left = styles.left;
    resizableElement.style.left = `${
      (parseFloat(styles.left) / parseFloat(containerStyles.width)) * 100
    }%`;
    resizableElement.style.right = null;
  };

  return {
    data,
    setData,
    categoryCount,
    setCategoryCount,
    mouseMoveMove,
    mouseDownMove,
    mouseUpMove,
    mouseDownTopResize,
    mouseDownBottomResize,
    mouseDownLeftResize,
    mouseDownRightResize,
  };
};

export default useEvenetListener;
