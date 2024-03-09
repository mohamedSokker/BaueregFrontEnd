import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { ImFolder, ImFolderOpen } from "react-icons/im";
import { ColorRing } from "react-loader-spinner";
import { FaRegFile } from "react-icons/fa";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const Folder = ({ filename, basePath, setCurrentPath, setCurrentFiles }) => {
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [files, setFiles] = useState(null);
  const [path, setPath] = useState(`${basePath}/${filename}`);
  const [isHovered, setIsHovered] = useState(false);

  //   console.log(path);

  const axiosPrivate = useAxiosPrivate();

  const getFiles = async (fullPath) => {
    try {
      const url = `/api/v1/taskMagaerGetTaskFiles`;
      const response = await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({
          fullpath: fullPath,
        }),
      });
      setFiles(response?.data?.data);
      console.log(response?.data?.data);
      return response?.data?.data;
    } catch (err) {
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
    }
  };

  const handleArrowClick = async () => {
    setIsFolderOpen((prev) => !prev);
    await getFiles(path);
  };

  const handleFolderClick = async () => {
    setCurrentFiles(null);
    setCurrentPath(path);
    const currentFiles = await getFiles(path);
    setCurrentFiles(currentFiles);
    console.log(path);
  };

  return (
    <div className="flex flex-col w-full">
      <div
        className="flex flex-row items-center rounded-md"
        style={{
          backgroundColor: isHovered ? "rgb(229,231,235)" : "",
          cursor: isHovered ? "pointer" : "default",
        }}
      >
        <button
          className="py-2 px-[2px] hover:bg-gray-300 rounded-l-[4px] relative z-[2]"
          onClick={handleArrowClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isFolderOpen ? (
            <IoIosArrowDown color="rgb(107,114,128)" />
          ) : (
            <IoIosArrowForward color="rgb(107,114,128)" />
          )}
        </button>
        <div
          className="w-full py-1 px-[2px] flex flex-row gap-2 justify-start items-center relative z-[1]"
          onClick={handleFolderClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isFolderOpen ? (
            <ImFolderOpen color="#54AEFF" />
          ) : (
            <ImFolder color="#54AEFF" />
          )}

          <p>{filename}</p>
        </div>
      </div>

      {isFolderOpen && (
        <div className="border-l-1 border-gray-300 w-full flex flex-col">
          {!files ? (
            <div className="w-full h-full px-2 flex flex-row items-center justify-start">
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
                {`Loading`}
              </p>
            </div>
          ) : (
            <div className="w-full h-full px-2 flex flex-col items-start">
              {files.map((file, i) =>
                file.type === "folder" ? (
                  <Folder
                    key={i}
                    filename={file?.file}
                    basePath={path}
                    setCurrentPath={setCurrentPath}
                    setCurrentFiles={setCurrentFiles}
                  />
                ) : (
                  <div
                    key={i}
                    className="w-full px-4 py-1 flex flex-row gap-2 justify-start items-center rounded-md hover:bg-gray-200 hover:cursor-pointer"
                    onClick={() => {}}
                  >
                    <FaRegFile color="rgb(107,114,128)" />
                    <p>{file?.file}</p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Folder;
