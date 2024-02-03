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
  const screenData = (message) => {
    setImage(message);
  };
  useEffect(() => {
    socket.emit("join-message", tableName);
    socket.on("screen-data", screenData);

    return () => {
      socket.off("screen-data", screenData);
    };
  }, []);
  return (
    <div className="flex justify-center items-center w-[95vw] h-[90vh] p-5 rounded-[8px]">
      <p className=" p-2 font-bold text-[16px]">Bauer Screen</p>
      <img src={`${image}`} className="w-full h-full rounded-[8px]" />
    </div>
  );
};
export default Vnc;
