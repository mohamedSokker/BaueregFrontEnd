import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
// import noVNC from "novnc";
// import { VncScreen } from "react-vnc";

// const VncViewer = ({ host, port, password }) => {
//   const vncContainerRef = useRef();

//   useEffect(() => {
//     const vncOptions = {
//       host,
//       port,
//       encrypt: true, // Adjust as needed based on your VNC server configuration
//     };

//     const vncViewer = new noVNC({
//       encrypt: vncOptions.encrypt,
//     });

//     vncViewer.connect(vncOptions.host, vncOptions.port);

//     // Handle authentication if required
//     if (password) {
//       vncViewer.addEventListener("credentialsrequired", () => {
//         vncViewer.sendCredentials({ password });
//       });
//     }

//     // Append the VNC viewer to the container
//     vncContainerRef.current.appendChild(vncViewer.canvas);

//     return () => {
//       // Cleanup on component unmount
//       vncViewer.disconnect();
//     };
//   }, [host, port, password]);

//   return <div ref={vncContainerRef}></div>;
// };

const Vnc = ({ socket }) => {
  // const ref = useRef();
  // const vncServerHost = "192.168.1.5"; //your-vnc-server-address
  // const vncServerPort = 5900; // Adjust the port according to your VNC server configuration
  // const vncPassword = "your-vnc-password"; // Omit if not required

  return (
    <div>
      <h1>VNC Viewer</h1>
      {/* <VncScreen
        url="ws://192.168.1.5"
        scaleViewport
        background="#000000"
        style={{
          width: "75vw",
          height: "75vh",
        }}
        ref={ref}
      /> */}
      {/* <VncViewer
        host={vncServerHost}
        port={vncServerPort}
        // password={vncPassword}
      /> */}
    </div>
  );
  // const { tableName } = useParams();
  // const [image, setImage] = useState(null);

  // console.log(image);

  // useEffect(() => {
  //   if (!socket?.connected) socket?.connect();
  //   if (tableName && socket) {
  //     socket.emit("join-message", tableName);
  //     socket.on("screen-data", (message) => {
  //       setImage(message);
  //       socket.emit("request-image", "new Image");
  //     });
  //   }
  // }, [tableName, socket]);

  // return (
  //   <div className="flex justify-center items-center w-screen h-screen p-2">
  //     <img src={`data:image/png;base64,${image}`} className="w-full h-full" />
  //   </div>
  // );
};

export default Vnc;
