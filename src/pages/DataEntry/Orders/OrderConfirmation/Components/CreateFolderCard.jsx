import React, { useEffect, useRef, useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { ColorRing } from "react-loader-spinner";

import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";

const CreateFolderCard = ({
  setIsCreateFolder,
  path,
  currentFiles,
  setCurrentFiles,
  setFiles,
}) => {
  const baseURL = process.env.REACT_APP_BASE_URL;

  const axiosPrivate = useAxiosPrivate();

  const [isCanceled, setIsCanceled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleCreateFolder = async () => {
    // console.log(Array.from(files));
    try {
      setLoading(true);
      console.log(`${path}/${fileName}`);
      const url = `/api/v3/dataEntryOrderConfirmationCreateFolder`;
      await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({ fullpath: `${path}/${fileName}` }),
      });
      //   console.log(currentFiles);
      let result = [...currentFiles];
      result = result.concat({
        dateCreated: new Date(),
        file: fileName,
        size: 0,
        type: "folder",
      });
      setCurrentFiles(result);
      //   setFiles(result);
      setLoading(false);
    } catch (err) {
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
      setLoading(false);
    }
  };

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
        className={`md:w-[36.6%] w-[90%] md:h-[30%] h-[80%] flex flex-col justify-between items-center bg-white relative z-[1001] mainContent overflow-y-scroll`}
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
                  setIsCanceled(true);
                  setTimeout(() => {
                    setIsCreateFolder(false);
                  }, 500);
                }}
              >
                X
              </button>
            </TooltipComponent>
          </div>
        </div>

        <div className="flex flex-row w-full gap-4 justify-center">
          <p className="text-[14px] text-gray-400">Folder Name</p>
          <input
            className="text-[14px] outline-none border-[1px] border-gray-300 rounded-[4px] pl-4"
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>

        <div className="flex flex-row w-full justify-end px-4 py-2">
          <button
            className="text-red-400 font-[600] text-[14px]"
            onClick={async () => {
              handleCreateFolder();
              // handleSave(val, category);
              setIsCanceled(true);
              setTimeout(() => {
                setIsCreateFolder(false);
              }, 500);
            }}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFolderCard;
