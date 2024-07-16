import React, { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { ImFolder, ImFolderOpen } from "react-icons/im";
import { ColorRing } from "react-loader-spinner";
import { FaRegFile } from "react-icons/fa";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavContext } from "../../../contexts/NavContext";

const Folder = ({
  filename,
  absPath,
  basePath,
  setCurrentPath,
  setCurrentFiles,
  currentPath,
  getFilesURL,
  createdFolder,
  deletedFile,
  uploadedFiles,
  renamedFile,
  searchedItems,
  searchedFiles,
  setSearchedFiles,
}) => {
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [files, setFiles] = useState(null);
  const [path, setPath] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const { setErrorData } = useNavContext();

  // console.log(path);
  // console.log(currentPath);
  // console.log(files);
  // console.log(searchedFiles);
  // console.log(searchedItems);

  useEffect(() => {
    // console.log(searchedItems);
    // openArrow(path);
    searchedItems.map((item) => {
      const filesArray = item.split("/");
      // filesArray.map((file) => {
      // console.log(file);
      if (filesArray.includes(filename)) {
        setSearchedFiles((prev) =>
          Array.from(new Set([...prev, filesArray[filesArray.length - 1]]))
        );
        if (path !== "") {
          openArrow();
        }
        // openArrow();
      }
      // });
    });
  }, [searchedItems, path]);

  useEffect(() => {
    setPath(`${basePath}/${filename}`);
  }, [filename]);

  useEffect(() => {
    if (currentPath === path) {
      setFiles(createdFolder);
    }
  }, [createdFolder]);

  useEffect(() => {
    if (currentPath === path) {
      setFiles(deletedFile);
    }
  }, [deletedFile]);

  useEffect(() => {
    if (currentPath === path) {
      setFiles(renamedFile);
    }
  }, [renamedFile]);

  useEffect(() => {
    if (currentPath === path) {
      setFiles(uploadedFiles);
    }
  }, [uploadedFiles]);

  const axiosPrivate = useAxiosPrivate();

  const getFiles = async (fullPath) => {
    try {
      const url = getFilesURL;
      const response = await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({
          fullpath: path,
          pathabs: `${absPath}/${path}`,
        }),
      });
      setFiles(response?.data?.data);
      // console.log(response?.data?.data);
      return response?.data?.data;
    } catch (err) {
      setErrorData((prev) => [
        ...prev,
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message,
      ]);
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
    }
  };

  const openArrow = async () => {
    if (!isFolderOpen) {
      setIsFolderOpen(true);
      await getFiles(`${path}`);
    }
  };

  const handleArrowClick = async () => {
    setIsFolderOpen((prev) => !prev);
    if (!isFolderOpen) {
      await getFiles(path);
      // setPath(`${path}`);
    }
  };

  const handleFolderClick = async () => {
    setCurrentFiles(null);
    setCurrentPath(path);
    const currentFiles = await getFiles(path);
    setCurrentFiles(currentFiles);
    // setFiles(currentFiles);
    // console.log(path);
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
                    absPath={absPath}
                    basePath={path}
                    setCurrentPath={setCurrentPath}
                    setCurrentFiles={setCurrentFiles}
                    currentPath={currentPath}
                    getFilesURL={getFilesURL}
                    createdFolder={createdFolder}
                    deletedFile={deletedFile}
                    uploadedFiles={uploadedFiles}
                    renamedFile={renamedFile}
                    searchedItems={searchedItems}
                    searchedFiles={searchedFiles}
                    setSearchedFiles={setSearchedFiles}
                  />
                ) : (
                  <div
                    key={i}
                    className="w-full px-4 py-1 flex flex-row gap-2 justify-start items-center rounded-md hover:bg-gray-200 hover:cursor-pointer"
                    onClick={() => {}}
                    style={{
                      backgroundColor: searchedFiles.includes(file?.file)
                        ? "rgb(209,213,219)"
                        : "",
                    }}
                  >
                    <FaRegFile color="rgb(107,114,128)" />
                    <p className="truncate">{file?.file}</p>
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
