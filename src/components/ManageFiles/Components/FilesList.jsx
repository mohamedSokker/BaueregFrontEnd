import React, { useState } from "react";
import { ImFolder } from "react-icons/im";
import { FaRegFile } from "react-icons/fa";
import { MdDriveFileRenameOutline, MdDelete } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { ColorRing } from "react-loader-spinner";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import RenameFolderCard from "./RenameFolderCard";
import { useNavContext } from "../../../contexts/NavContext";

const addHours = (anyDate, hours) => {
  const dt = new Date(anyDate);
  const milliseconds = dt.getTime();
  const milliseconds2 =
    milliseconds + 1000 * 60 * 60 * (hours - dt.getTimezoneOffset() / 60);
  const newDate = new Date(milliseconds).toISOString();

  return `${new Date(newDate).toLocaleDateString()} ${new Date(
    newDate
  ).toLocaleTimeString()}`;
};

const FilesList = ({
  file,
  path,
  setMessage,
  currentFiles,
  setCurrentFiles,
  setTableData,
  setIsTable,
  setIsGraph,
  setGraphData,
  deleteFilesURL,
  renameFilesURL,
  analyzeFileURL,
  enableTable,
  enableGraph,
  enableAnalyze,
  enableDelete,
  enableRename,
  absPath,
  relPath,
  setDeletedFile,
  setRenamedFile,
  getFilesURL,
  setCurrentPath,
  setFiles,
  targetData,
}) => {
  const [isFilePanel, setIsFilePanel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRenameFolder, setIsRenameFolder] = useState(false);
  const [newFileName, setNewFileName] = useState("");

  const { setErrorData } = useNavContext();

  const baseURL = import.meta.env.VITE_BASE_URL;

  const axiosPrivate = useAxiosPrivate();

  const getFiles = async (fullPath) => {
    try {
      setMessage(`Loading Files...`);
      setLoading(true);
      const url = getFilesURL;
      const response = await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({
          fullpath: fullPath,
          pathabs: `${absPath}/${fullPath}`,
        }),
      });
      setCurrentFiles(response?.data?.data);
      setCurrentPath(`${path}/${file.file}`);
      // console.log(response?.data?.data);
      setLoading(false);
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
      setLoading(false);
    }
  };

  const handleDeleteFile = async (file, fileName) => {
    try {
      setLoading(true);
      const url = deleteFilesURL;
      await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({ path: file, pathabs: `${absPath}/${file}` }),
      });
      let result = [...currentFiles];
      result = result.filter((f) => f.file !== fileName);
      setCurrentFiles(result);
      setDeletedFile(result);
      // setFiles(result);
      setLoading(false);
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
      setLoading(false);
    }
  };

  const handleGetReport = async (file, fileName) => {
    setLoading(true);
    const getData = async () => {
      try {
        setLoading(true);
        const url = analyzeFileURL;
        const data = await axiosPrivate(url, {
          method: "POST",
          data: JSON.stringify({
            path: file,
            pathabs: `${absPath}/${file}`,
            targetData: targetData,
          }),
        });
        console.log(data.data);
        if (enableTable) {
          setTableData(data?.data);
          setIsTable(true);
        } else if (enableGraph) {
          setGraphData(data?.data);
          setIsGraph(true);
        }

        setLoading(false);
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
        setLoading(false);
      }
    };
    getData();
  };

  const handleFileClick = async (e) => {
    if (file.type === "folder") {
      await getFiles(`${path}/${file.file}`);
    }
  };

  const handleFileRightClick = (e) => {
    e.preventDefault();
    setIsFilePanel((prev) => !prev);
  };

  return (
    <>
      {enableRename && isRenameFolder && (
        <RenameFolderCard
          setIsRenameFolder={setIsRenameFolder}
          absPath={absPath}
          path={path}
          currentFiles={currentFiles}
          setCurrentFiles={setCurrentFiles}
          setFiles={setFiles}
          renameFilesURL={renameFilesURL}
          setRenamedFile={setRenamedFile}
          newFileName={newFileName}
          setNewFileName={setNewFileName}
          oldFileName={file}
        />
      )}
      {loading ? (
        <div className="w-full relative p-2 flex flex-row justify-start gap-2 items-center border-t-1 border-t-gray-300 ">
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
        <div
          className="w-full relative p-2 flex flex-row justify-between items-center border-t-1 border-t-gray-300 hover:cursor-pointer hover:bg-gray-100"
          onContextMenu={handleFileRightClick}
        >
          <div
            className="flex flex-row items-center gap-2 w-[40%] justify-start"
            onClick={handleFileClick}
          >
            {file.type === "folder" ? (
              <ImFolder color="#54AEFF" />
            ) : (
              <FaRegFile color="rgb(107,114,128)" />
            )}
            <p className="text-[14px] truncate">{file?.file}</p>
          </div>

          <p className="text-[14px] w-[50%] flex flex-row justify-start">
            {`${addHours(file?.dateCreated, 0)}`}
          </p>
          {file.type === "file" ? (
            <p className="text-[14px] w-[10%] flex flex-row justify-start">
              {`${Math.round(file?.size / 1000)} KB`}
            </p>
          ) : (
            <p className="text-[14px] w-[10%] flex flex-row justify-start"></p>
          )}
          {isFilePanel && (
            <div
              className="absolute z-[11] top-[10px] right-[16px] w-[150px] bg-white rounded-[8px] p-3 flex flex-col gap-2 justify-center items-start"
              style={{
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              }}
            >
              {enableAnalyze && (
                <div
                  className="flex flex-row items-center w-full hover:bg-gray-200 rounded-md py-1 px-2 gap-2"
                  onClick={() => {
                    handleGetReport(`${path}/${file?.file}`, file?.file);
                    setIsFilePanel(false);
                  }}
                >
                  <GoGraph size={14} color="rgb(107,114,128)" />
                  <button className="text-blue-700 text-[12px] rounded-md flex flex-row justify-center items-center">
                    Analyze
                  </button>
                </div>
              )}

              <div
                className="flex flex-row items-center w-full hover:bg-gray-200 rounded-md py-1 px-2 gap-2"
                onClick={() => {
                  window
                    .open(
                      `${baseURL}/${relPath}/${path}/${file?.file}`
                        .replace("#", "%23")
                        .replace("#", "%23"),
                      "_blank"
                    )
                    .focus();
                  setIsFilePanel(false);
                }}
              >
                <MdDriveFileRenameOutline size={14} color="rgb(107,114,128)" />
                <button className="text-green-700 text-[12px] rounded-md flex flex-row justify-center items-center">
                  Get File
                </button>
              </div>

              {enableDelete && (
                <div
                  className="flex flex-row items-center w-full hover:bg-gray-200 rounded-md py-1 px-2 gap-2"
                  onClick={() => {
                    handleDeleteFile(`${path}/${file?.file}`, file?.file);
                    setIsFilePanel(false);
                  }}
                >
                  <MdDelete size={14} color="rgb(107,114,128)" />
                  <button className="text-red-600 text-[12px] rounded-md flex flex-row justify-center items-center">
                    Delete File
                  </button>
                </div>
              )}
              {enableRename && (
                <div
                  className="flex flex-row items-center w-full hover:bg-gray-200 rounded-md py-1 px-2 gap-2"
                  onClick={() => {
                    // handleRenameFile(`${path}/${file?.file}`, file?.file);
                    setIsRenameFolder(true);
                    setIsFilePanel(false);
                  }}
                >
                  <MdDriveFileRenameOutline
                    size={14}
                    color="rgb(107,114,128)"
                  />
                  <button className="text-violet-600 text-[12px] rounded-md flex flex-row justify-center items-center">
                    Rename File
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FilesList;
