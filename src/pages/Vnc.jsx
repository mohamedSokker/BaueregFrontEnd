import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Vnc = ({ socket }) => {
  const axiosPrivate = useAxiosPrivate();

  const { tableName } = useParams();
  const [image, setImage] = useState(null);
  // console.log(image);

  // useEffect(() => {
  //   const createTunnel = async () => {
  //     // if (!socket?.connected) socket?.connect();
  //     const url = `/create-tunnel/${8000}`;
  //     const data = await axiosPrivate(url);
  //     console.log(data.data);
  //     setData(data.data);
  //   };
  //   createTunnel();
  // }, []);
  useEffect(() => {
    socket.emit("join-message", tableName);
    socket.on("screen-data", (message) => {
      setImage(message);
      // socket.emit("request-image", "new Image");
    });
  }, []);
  return (
    <div className="flex justify-center items-center w-screen h-screen p-2">
      <img src={`${image}`} className="w-full h-full" />
    </div>
  );
};
export default Vnc;
