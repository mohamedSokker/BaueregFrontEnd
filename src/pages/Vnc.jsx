import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Jimp from "jimp";

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
    if (!socket?.connected) socket?.connect();
    if (tableName && socket.connected) {
      socket.emit("join-message", tableName);
      socket.on("screen-data", ({ width, height, data }) => {
        new Jimp(
          {
            width: width,
            height: height,
            data: data,
          },
          async (err, image) => {
            if (err) {
              console.log(`Image Error: ${err.message}`);
            }

            imageBuffer = await image.getBase64Async(Jimp.MIME_JPEG);
            setImage(message);
            // socket.emit("screen-data", imageBuffer);
          }
        );
        // socket.emit("request-image", "new Image");
      });
    }
  }, [tableName, socket]);
  return (
    <div className="flex justify-center items-center w-screen h-screen p-2">
      <img src={`${image}`} className="w-full h-full" />
    </div>
  );
};
export default Vnc;
