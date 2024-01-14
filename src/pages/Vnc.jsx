import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const Vnc = ({ socket }) => {
  const { tableName } = useParams();
  const [image, setImage] = useState(null);
  console.log(image);
  useEffect(() => {
    if (!socket?.connected) socket?.connect();
    if (tableName && socket) {
      socket.emit("join-message", tableName);
      socket.on("screen-data", (message) => {
        setImage(message);
        socket.emit("request-image", "new Image");
      });
    }
  }, [tableName, socket]);
  return (
    <div className="flex justify-center items-center w-screen h-screen p-2">
      <img src={`data:image/png;base64,${image}`} className="w-full h-full" />
    </div>
  );
};
export default Vnc;
