import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { PageLoading } from "../components";

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
    <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh] p-2">
      {/* <p className=" p-2 font-[900] text-[20px]">Bauer Screen</p> */}
      {!image ? (
        <PageLoading />
      ) : (
        <img
          src={`${image}`}
          className="w-full h-full flex justify-center items-center"
          style={{ objectFit: "contain" }}
        />
      )}
    </div>
  );
};
export default Vnc;
