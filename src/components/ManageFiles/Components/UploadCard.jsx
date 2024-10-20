import React, { useEffect, useRef, useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { ColorRing } from "react-loader-spinner";

import "../Styles/UploadCard.css";
import { useNavContext } from "../../../contexts/NavContext";

const UploadCard = ({
  setIsUploadCard,
  absPath,
  path,
  currentFiles,
  setCurrentFiles,
  uploadURL,
  setUploadedFiles,
}) => {
  const baseURL = process.env.REACT_APP_BASE_URL;

  const [isCanceled, setIsCanceled] = useState(false);
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("Ready");
  const [currentFileNo, setCurrentFileNo] = useState(0);
  const [currentFileName, setCurrentFileName] = useState("");

  const { setErrorData } = useNavContext();

  const inputRef = useRef();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles(e.dataTransfer.files);
  };

  // const handleUpload = () => {
  //   // console.log(Array.from(files));
  //   setLoading(true);
  //   const data = new FormData();
  //   let targetFiles = [];
  //   Array.from(files).map((file) => {
  //     data.append("files", file);
  //     targetFiles.push({
  //       file: file?.name,
  //       type: "file",
  //       dateCreated: new Date(),
  //       size: file.size,
  //     });
  //   });
  //   console.log(data);
  //   fetch(`${baseURL}${uploadURL}?url=${path}&&pathabs=${absPath}/${path}`, {
  //     method: "POST",
  //     body: data,
  //   })
  //     .then((res) => {})
  //     .then((data) => {
  //       console.log(targetFiles);
  //       let result = [...currentFiles];
  //       result = result.concat(targetFiles);
  //       setCurrentFiles(result);
  //       setUploadedFiles(result);
  //       // setFile(result);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setErrorData((prev) => [
  //         ...prev,
  //         err?.response?.data?.message
  //           ? err?.response?.data?.message
  //           : err?.message,
  //       ]);
  //       console.log(err.message);
  //       setLoading(false);
  //     });
  // };

  const handleUpload = async () => {
    // console.log(Array.from(files));
    setLoading(true);
    setUploadStatus("Busy");
    let targetFiles = [];
    const filesArr = Array.from(files);

    for (let i = 0; i < filesArr.length; i++) {
      setCurrentFileNo(i);
      setCurrentFileName(filesArr[i].name);
      console.log(`Current Number: ${i}`);
      const minchunckSize =
        filesArr[i].size <= 20 * 1024
          ? 1 * 1024
          : filesArr[i].size <= 10 * 1024 * 1024
          ? 5 * 1024
          : 1000 * 1024;
      const chunkSize = minchunckSize; // 5MB (adjust based on your requirements)
      const totalChunks = Math.ceil(filesArr[i].size / chunkSize);
      const chunkProgress = 100 / totalChunks;
      let chunkNumber = 0;
      let start = 0;
      let end = 0;

      const uploadNextChunk = async () => {
        if (end <= filesArr[i].size) {
          const chunk = filesArr[i].slice(start, end);
          const formData = new FormData();
          formData.append("files", chunk);
          formData.append("chunkNumber", chunkNumber);
          formData.append("totalChunks", totalChunks);
          formData.append("originalname", filesArr[i].name);

          try {
            await fetch(
              `${baseURL}${uploadURL}?url=${path}&&pathabs=${absPath}/${path}`,
              {
                method: "POST",
                body: formData,
              }
            );

            const temp = `Chunk ${
              chunkNumber + 1
            }/${totalChunks} uploaded successfully`;
            setStatus(temp);
            setProgress(Number((chunkNumber + 1) * chunkProgress));
            // console.log(temp);
            chunkNumber++;
            start = end;
            end = start + chunkSize;
            if (end >= filesArr[i].size) end = filesArr[i].size - start;

            await uploadNextChunk();
          } catch (err) {
            setErrorData((prev) => [
              ...prev,
              err?.response?.data?.message
                ? err?.response?.data?.message
                : err?.message,
            ]);
            console.log(err.message);
            setLoading(false);
          }

          //  fetch(
          //   `${baseURL}${uploadURL}?url=${path}&&pathabs=${absPath}/${path}`,
          //   {
          //     method: "POST",
          //     body: formData,
          //   }
          // )
          //   .then(() => {
          //     // console.log({ data });
          //     const temp = `Chunk ${
          //       chunkNumber + 1
          //     }/${totalChunks} uploaded successfully`;
          //     setStatus(temp);
          //     setProgress(Number((chunkNumber + 1) * chunkProgress));
          //     // console.log(temp);
          //     chunkNumber++;
          //     start = end;
          //     end = start + chunkSize;

          //     uploadNextChunk();
          //   })
          //   .catch((err) => {
          //     setErrorData((prev) => [
          //       ...prev,
          //       err?.response?.data?.message
          //         ? err?.response?.data?.message
          //         : err?.message,
          //     ]);
          //     console.log(err.message);
          //     setLoading(false);
          //   });
        } else {
          targetFiles.push({
            file: filesArr[i]?.name,
            type: "file",
            dateCreated: new Date(),
            size: filesArr[i].size,
          });

          // console.log(targetFiles);
          let result = [...currentFiles];
          result = result.concat(targetFiles);
          setCurrentFiles(result);
          setUploadedFiles(result);
          // setFile(result);
          if (i === filesArr.length - 1) {
            setLoading(false);
          }
          setProgress(100);

          setStatus("File upload completed");
        }
      };

      await uploadNextChunk();
    }
  };

  useEffect(() => {
    if (
      (status === "" || status === "File upload completed") &&
      loading === false &&
      uploadStatus === "Busy" &&
      currentFileNo === Array.from(files).length - 1
    ) {
      console.log(currentFileNo);
      console.log(Array.from(files).length - 1);
      setIsCanceled(true);
      setTimeout(() => {
        setIsUploadCard(false);
      }, 500);
      setUploadStatus("Ready");
    }
  }, [status, loading, uploadStatus]);

  return (
    <div
      className="fixed opacity-100 w-screen h-screen flex flex-col items-center justify-center left-0 top-0"
      style={{ zIndex: "1000" }}
    >
      <div
        className="absolute  w-screen h-screen flex flex-col items-center justify-center left-0 top-0 z-[1000]"
        style={{ backdropFilter: "blur(2px)", opacity: 0.8 }}
      ></div>
      <div
        className={`md:w-[36.6%] w-[90%] md:h-[74.5%] h-[80%] flex flex-col justify-between items-center bg-white relative z-[1001] mainContent overflow-y-scroll`}
        style={{
          animation: !isCanceled
            ? "animate-in 0.5s ease-in-out"
            : "animate-out 0.5s ease-in-out",
        }}
      >
        <div className="flex flex-row w-full p-2 px-6 justify-between">
          <div>
            <TooltipComponent
              content="close"
              position="BottomCenter"
              className="flex items-center"
            >
              <button
                className="hover:cursor-pointer p-2 hover:rounded-full hover:bg-gray-300 aspect-square flex justify-center items-center"
                onClick={() => {
                  setFiles(null);
                  setIsCanceled(true);
                  setTimeout(() => {
                    setIsUploadCard(false);
                  }, 500);
                }}
              >
                X
              </button>
            </TooltipComponent>
          </div>
        </div>

        {!files ? (
          <div className="h-full flex flex-col w-[60%] p-2 px-6 justify-center items-center gap-4 text-[14px]">
            <div
              className="w-full aspect-square border-1 border-black border-dashed flex flex-row justify-center items-center"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <p>Drag and Drop Files Here</p>
            </div>
            <p>Or</p>
            <input
              type="file"
              multiple
              hidden
              onChange={(e) => setFiles(e.target.files)}
              ref={inputRef}
            />
            <button
              className="p-2 py-1 bg-gray-100 border-1 border-gray-300 hover:bg-gray-200 rounded-md"
              onClick={() => inputRef.current.click()}
            >
              Select Files
            </button>
          </div>
        ) : loading ? (
          <div className="h-full flex flex-row w-[100%] p-2 px-6 justify-center items-center gap-2 text-[14px]">
            <ColorRing
              type="ColorRing"
              colors={[
                "rgb(107,114,128)",
                "rgb(107,114,128)",
                "rgb(107,114,128)",
                "rgb(107,114,128)",
                "rgb(107,114,128)",
              ]}
              height={20}
              width={20}
            />
            <p className="text-center px-2 text-[rgb(107,114,128)]">
              {`Loading ${progress.toFixed(1)} % ...`}
            </p>
            <p className="text-center px-2 text-[rgb(107,114,128)]">
              {` (${currentFileName})`}
            </p>
          </div>
        ) : (
          <div className="h-full flex flex-col w-[60%] p-2 px-6 justify-center items-center gap-4 text-[14px]">
            {Array.from(files).map((file, i) => (
              <p key={i}>{file?.name}</p>
            ))}
          </div>
        )}

        {files && (
          <div className="w-full flex flex-row  justify-between items-center p-2 px-6">
            <div></div>
            <div className="flex flex-row gap-4 items-center">
              <button
                className=" text-red-400 font-[600] text-[14px]"
                onClick={async () => {
                  await handleUpload();
                  // handleSave(val, category);
                  // setIsCanceled(true);
                  // setIsUploadCard(false);
                  // setTimeout(() => {
                  //   setIsUploadCard(false);
                  // }, 500);
                }}
              >
                Upload
              </button>
              <button
                className=" text-gray-500 font-[600] text-[14px]"
                onClick={() => {
                  setFiles(null);
                  setIsCanceled(true);
                  setTimeout(() => {
                    setIsUploadCard(false);
                  }, 500);
                }}
              >
                CANCEL
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadCard;
