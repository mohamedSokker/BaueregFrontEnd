import React, { useEffect, useRef, useState } from "react";

import { DBData } from "../Model/model";

const useEvenetListener = () => {
  const [data, setData] = useState(DBData);

  const refBox = useRef(null);
  const refTop = useRef(null);
  const refRight = useRef(null);
  const refBottom = useRef(null);
  const refLeft = useRef(null);
  const refMove = useRef(null);

  useEffect(() => {
    if (refBox.current) {
      const resizableElement = refBox.current;
      const styles = window.getComputedStyle(resizableElement);
      let width = parseInt(styles.width, 10);
      let height = parseInt(styles.height, 10);

      let xCord = 0;
      let yCord = 0;
      let xPosition = 0;
      let yPosition = 0;

      resizableElement.style.top = "10px";
      resizableElement.style.left = "10px";

      // TOP
      const onMouseMoveTopResize = (event) => {
        const dy = event.clientY - yCord;
        height = height - dy;
        yCord = event.clientY;
        resizableElement.style.height = `${height}px`;
      };

      const onMouseUpTopResize = (event) => {
        document.removeEventListener("mousemove", onMouseMoveTopResize);
      };

      const onMouseDownTopResize = (event) => {
        yCord = event.clientY;
        const styles = window.getComputedStyle(resizableElement);
        resizableElement.style.bottom = styles.bottom;
        resizableElement.style.top = null;
        document.addEventListener("mousemove", onMouseMoveTopResize);
        document.addEventListener("mouseup", onMouseUpTopResize);
      };

      //Right
      const onMouseMoveRightResize = (event) => {
        const dx = event.clientX - xCord;
        xCord = event.clientX;
        width = width + dx;
        resizableElement.style.width = `${width}px`;
      };

      const onMouseUpRightResize = (event) => {
        document.removeEventListener("mousemove", onMouseMoveRightResize);
      };

      const onMouseDownRightResize = (event) => {
        xCord = event.clientX;
        resizableElement.style.left = styles.left;
        resizableElement.style.right = null;
        document.addEventListener("mousemove", onMouseMoveRightResize);
        document.addEventListener("mouseup", onMouseUpRightResize);
      };

      //Bottom
      const onMouseMoveBottomResize = (event) => {
        const dy = event.clientY - yCord;
        height = height + dy;
        yCord = event.clientY;
        resizableElement.style.height = `${height}px`;
      };

      const onMouseUpBottomResize = (event) => {
        document.removeEventListener("mousemove", onMouseMoveBottomResize);
      };

      const onMouseDownBottomResize = (event) => {
        yCord = event.clientY;
        const styles = window.getComputedStyle(resizableElement);
        resizableElement.style.top = styles.top;
        resizableElement.style.bottom = null;
        document.addEventListener("mousemove", onMouseMoveBottomResize);
        document.addEventListener("mouseup", onMouseUpBottomResize);
      };

      //LEFT
      const onMouseMoveLeftResize = (event) => {
        const dx = event.clientX - xCord;
        xCord = event.clientX;
        width = width - dx;
        resizableElement.style.width = `${width}px`;
      };

      const onMouseUpLeftResize = (event) => {
        document.removeEventListener("mousemove", onMouseMoveLeftResize);
      };

      const onMouseDownLeftResize = (event) => {
        xCord = event.clientX;
        resizableElement.style.right = styles.right;
        resizableElement.style.left = null;
        document.addEventListener("mousemove", onMouseMoveLeftResize);
        document.addEventListener("mouseup", onMouseUpLeftResize);
      };

      //Move
      const onMouseMoveMove = (event) => {
        const dx = event.clientX - xCord;
        const dy = event.clientY - yCord;

        xCord = event.clientX;
        yCord = event.clientY;

        xPosition = xPosition + dx;
        yPosition = yPosition + dy;

        resizableElement.style.top = `${yPosition}px`;
        resizableElement.style.left = `${xPosition}px`;
      };

      const onMouseUpMove = (event) => {
        document.removeEventListener("mousemove", onMouseMoveMove);
      };

      const onMouseDownMove = (event) => {
        xCord = event.clientX;
        yCord = event.clientY;
        //   resizableElement.style.right = styles.right;
        //   resizableElement.style.left = styles.left;
        //   resizableElement.style.top = styles.top;
        //   resizableElement.style.bottom = styles.bottom;
        document.addEventListener("mousemove", onMouseMoveMove);
        document.addEventListener("mouseup", onMouseUpMove);
      };

      //Mouse Down event listener
      const risizeRight = refRight.current;
      risizeRight.addEventListener("mousedown", onMouseDownRightResize);

      const risizeTop = refTop.current;
      risizeTop.addEventListener("mousedown", onMouseDownTopResize);

      const risizeBottom = refBottom.current;
      risizeBottom.addEventListener("mousedown", onMouseDownBottomResize);

      const risizeLeft = refLeft.current;
      risizeLeft.addEventListener("mousedown", onMouseDownLeftResize);

      const move = refMove.current;
      move.addEventListener("mousedown", onMouseDownMove);
    }

    return () => {
      risizeRight.removeEventListener("mousedown", onMouseDownRightResize);
      risizeTop.removeEventListener("mousedown", onMouseDownTopResize);
      risizeBottom.removeEventListener("mousedown", onMouseDownBottomResize);
      risizeLeft.removeEventListener("mousedown", onMouseDownLeftResize);
      move.removeEventListener("mousedown", onMouseDownMove);
    };
  }, [data]);
  return {
    data,
    setData,
    refBox,
    refBottom,
    refLeft,
    refRight,
    refTop,
    refMove,
  };
};

export default useEvenetListener;
