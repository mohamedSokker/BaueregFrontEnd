import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Vnc = ({ socket }) => {
  const axiosPrivate = useAxiosPrivate();

  const { tableName } = useParams();
  const [image, setImage] = useState(null);
  console.log(image);
  useEffect(() => {
    const createTunnel = async () => {
      if (!socket?.connected) socket?.connect();
      const url = `/create-tunnel/${8000}`;
      await axiosPrivate(url);

      socket.emit("join-message", tableName);
      socket.on("screen-data", (message) => {
        setImage(message);
        socket.emit("request-image", "new Image");
      });
    };
    if (tableName && socket) {
      createTunnel();
    }
  }, [tableName, socket]);
  return (
    <div className="flex justify-center items-center w-screen h-screen p-2">
      <img src={`data:image/png;base64,${image}`} className="w-full h-full" />
    </div>
  );
};
export default Vnc;
