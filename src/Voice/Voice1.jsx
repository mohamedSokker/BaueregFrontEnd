import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BsMic } from "react-icons/bs";
import { IoMdPause, IoMdPlay } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const Voice1 = () => {
  const [audioRecords, setAudioRecords] = useState([]);
  //   const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    const record = document.querySelector(".record");

    if (navigator.mediaDevices.getUserMedia) {
      console.log(record);
      const constraints = { audio: true };
      let chunks = [];
      let onSuccess = (stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        console.log(mediaRecorder);
        // visualize(stream);

        const handleMouseDown = () => {
          console.log("start");
          mediaRecorder.start();
        };

        record.addEventListener("mousedown", handleMouseDown);
        record.addEventListener("touchstart", handleMouseDown);

        // record.onMouseDown = function () {
        //   console.log("start");
        //   mediaRecorder.start();
        // };

        const handleMouseUp = () => {
          console.log("stop");
          mediaRecorder.stop();
        };

        record.addEventListener("mouseup", handleMouseUp);
        record.addEventListener("touchend", handleMouseUp);

        // record.onMouseUp = function () {
        //   console.log("stop");
        //   mediaRecorder.stop();
        // };

        mediaRecorder.ondataavailable = function (e) {
          console.log(`data: ${e.data}`);
          chunks.push(e.data);
        };

        mediaRecorder.onstop = (e) => {
          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          chunks = [];
          const audioURL = window.URL.createObjectURL(blob);
          setAudioRecords((prev) => [
            ...prev,
            <div className="bg-white p-2 w-72 flex items-center rounded-3xl mb-3 sm:justify-center">
              <audio controls src={audioURL}></audio>
              {/* <button
                className="ml-2"
                onClick={(e) => {
                  e.target.closest("div").firstChild.play();
                }}
              >
                <IoMdPlay className="hover:drop-shadow-lg" />
                {isPlayed ? <IoMdPause className="hover:drop-shadow-lg" /> : <IoMdPlay className="hover:drop-shadow-lg" />}
              </button>
              <hr width="100%" />
              <MdDelete className="ml-2 hover:cursor-pointer text-xl hover:drop-shadow-lg" /> */}
            </div>,
          ]);
        };
        return () => {
          record.removeEventListener("mouseup", handleMouseUp);
          record.removeEventListener("touchend", handleMouseUp);
          record.removeEventListener("mousedown", handleMouseDown);
          record.removeEventListener("touchstart", handleMouseDown);
        };
      };

      let onError = function (err) {
        console.log("The following error occured: " + err);
      };

      // navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
    }
  }, []);

  return (
    <div className="w-full h-screen flex flex-col md:mt-0 mt-20">
      <div
        className="flex flex-row justify-around items-center mb-3"
        style={{ color: "black" }}
      >
        <input
          type="text"
          placeholder="Type your text"
          className=" bg-white rounded-3xl p-3 w-4/5 outline-none"
        />
        <button className="w-8 h-8 rounded-full bg-logo-color flex items-center justify-center record">
          <BsMic style={{ color: "white" }} className=" " />
        </button>
      </div>
      {audioRecords}
      {/* <div className="bg-white p-2 w-72 flex items-center rounded-3xl mb-3">
        <audio></audio>
        <button
          style={{
            width: "0px",
            height: "0px",
            borderLeft: "10px solid #000",
            borderRight: "10px solid transparent",
            borderTop: "10px solid transparent",
            borderBottom: "10px solid transparent",
          }}
          className="ml-2"
        ></button>
        <hr width="100%" />
      </div> */}
    </div>
  );
};

export default Voice1;
