import React, { useEffect } from "react";

const Video = () => {
  const readSingleFile = (evt) => {
    let video = document.getElementById("video");
    let f = evt.target.files[0];
    console.log(evt.target.files[0]);
    if (f) {
      let r = new FileReader();
      console.log(r);
      r.onload = function (e) {
        let contents = e.target.result;
        let unit8array = new Uint8Array(contents);
        let arrayBuffer = unit8array.buffer;
        let blob = new Blob([arrayBuffer], { type: "video/mp4" });
        // let blob = new Blob([contents], { type: "video/x-msvideo" });
        // let blob = new Blob([contents]);
        video.src = URL.createObjectURL(blob);
        console.log(e.target.result);
        console.log(unit8array);
      };
      r.readAsArrayBuffer(f);
    }
  };

  useEffect(() => {
    document
      .getElementById("fileinput")
      .addEventListener("change", readSingleFile, false);
  }, []);
  return (
    <div className="w-full h-screen flex flex-col md:mt-0 mt-20">
      <input type="file" id="fileinput" />
      <video id="video" width="200" height="200" controls />
    </div>
  );
};

export default Video;
