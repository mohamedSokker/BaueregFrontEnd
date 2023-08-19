import React, { useEffect, useState } from "react";
import { BsMic } from "react-icons/bs";
// import {
//   WebVoiceProcessor,
//   browserCompatibilityCheck,
// } from "@picovoice/web-voice-processor";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
// import alanBtn from "@alan-ai/alan-sdk-web";

// window.SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;

// const recognition = new window.SpeechRecognition();
// recognition.interimResults = true;
// const alankey =
//   "38afd2c99283158e6d387e568e888ac02e956eca572e1d8b807a3e2338fdd0dc/stage";

const Voice = () => {
  const [transcript, setTranscript] = useState([]);
  useEffect(() => {
    const micbtn = document.getElementById("mic-button");
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const mic = new SpeechRecognition();

    mic.continuous = true;
    mic.interimResults = true;
    mic.lang = "ar-AE";
    // mic.lang = "en-US";

    mic.onstart = () => {
      console.log("Started");
    };

    mic.onend = () => {
      console.log("Ended");
    };

    mic.addEventListener("result", (e) => {
      console.log(e.results);
      console.log(Array.from(e.results));
      const trans = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setTranscript(trans);
    });

    const handleMouseDown = () => {
      mic.start();
    };

    const handleMouseUp = () => {
      mic.stop();
    };

    micbtn.addEventListener("mousedown", handleMouseDown);
    micbtn.addEventListener("touchstart", handleMouseDown);
    micbtn.addEventListener("mouseup", handleMouseUp);
    micbtn.addEventListener("touchend", handleMouseUp);

    mic.onError = () => {
      console.log("Error");
    };

    return () => {
      micbtn.removeEventListener("mousedown", handleMouseDown);
      micbtn.removeEventListener("touchstart", handleMouseDown);
      micbtn.removeEventListener("mouseup", handleMouseUp);
      micbtn.removeEventListener("touchend", handleMouseUp);
    };

    // mic.start();
  }, []);
  //   useEffect(() => {
  //     alanBtn({
  //       key: alankey,
  //       onCommand: ({ commandData }) => {
  //         // console.log(commandData);
  //         if (commandData.command === "testcommand") {
  //           alert("this code was executed");
  //         }
  //       },
  //     });
  //   }, []);

  return (
    <div className="w-full h-full flex flex-row justify-around">
      <div
        className=" shadow-lg p-5 relative flex flex-col justify-center"
        style={{ width: "45%", height: "240px" }}
      >
        <h2>Current Note</h2>
        {/* <video></video> */}
        {/* <audio controls></audio> */}
        {transcript}
        <button
          id="mic-button"
          className=" mr-5 border-logoColor border-solid border-1 rounded-md absolute bottom-5 right-24 p-1 shadow-lg"
          onClick={() => {}}
        >
          <BsMic />
        </button>
        {/* <button
          id="stop-button"
          className="absolute bottom-5 right-5 border-logoColor border-solid border-1 rounded-md p-1 shadow-lg"
          onClick={() => {}}
        >
          Stop
        </button> */}
      </div>
      <div className="shadow-lg p-5" style={{ width: "45%", height: "240px" }}>
        <h2>Notes</h2>
      </div>
    </div>
  );
};

export default Voice;
