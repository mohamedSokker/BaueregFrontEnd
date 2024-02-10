import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CiWarning } from "react-icons/ci";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { PageLoading } from "../components";
import { useNavContext } from "../contexts/NavContext";

const Vnc = ({ socket }) => {
  const axiosPrivate = useAxiosPrivate();
  const { error, errorData, setError, setErrorData } = useNavContext();

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

  const handleErr = (err) => {
    console.log("Client Connection error" + err);
    setError(true);
    setErrorData((prev) => [
      ...prev,
      err?.response?.data?.message ? err?.response?.data?.message : err,
    ]);
    setTimeout(() => {
      setError(false);
      setTimeout(() => {
        setErrorData([]);
      }, 1000);
    }, 5000);
  };

  useEffect(() => {
    socket.emit("join-message", tableName);
    socket.on("screen-data", screenData);
    socket.on(`Client Connection error`, handleErr);

    return () => {
      socket.off("screen-data", screenData);
      socket.off(`Client Connection error`, handleErr);
    };
  }, []);
  return (
    <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh] p-2">
      {/* <p className=" p-2 font-[900] text-[20px]">Bauer Screen</p> */}
      {!image && !error ? (
        <PageLoading />
      ) : error ? (
        <div className="flex flex-col justify-center w-[100vw] h-[100vh] p-2">
          <div className="w-[95%] rounded-[8px] bg-red-500 text-white p-4 flex justify-center items-center">
            <CiWarning className="text-[40px] font-extrabold" />
            <p className="ml-5 text-xl font-semibold">{errorData}</p>
          </div>
        </div>
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
