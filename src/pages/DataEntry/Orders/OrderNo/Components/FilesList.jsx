import React, { useState } from "react";
import { ImFolder } from "react-icons/im";
import { FaRegFile } from "react-icons/fa";
import { MdDriveFileRenameOutline, MdDelete } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { ColorRing } from "react-loader-spinner";

import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";

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
  currentFiles,
  setCurrentFiles,
  setTableData,
  setIsTable,
  setIsGraph,
  setGraphData,
  setFiles,
}) => {
  const [isFilePanel, setIsFilePanel] = useState(false);
  const [loading, setLoading] = useState(false);

  const baseURL = process.env.REACT_APP_BASE_URL;

  const axiosPrivate = useAxiosPrivate();

  const handleDeleteFile = async (file, fileName) => {
    try {
      setLoading(true);
      const url = `/api/v3/dataEntryOrderNoDeleteFiles`;
      await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({ path: file }),
      });
      let result = [...currentFiles];
      result = result.filter((f) => f.file !== fileName);
      setCurrentFiles(result);
      // setFiles(result);
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

  const handleGetReport = async (file, fileName) => {
    setLoading(true);
    const getData = async () => {
      try {
        setLoading(true);
        const url = `api/v3/dataEntryOrderNoAnalyze`;
        const data = await axiosPrivate(url, {
          method: "POST",
          data: JSON.stringify({ path: file }),
        });
        console.log(data.data);
        setTableData(data?.data);
        setIsTable(true);
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
    getData();
  };

  return (
    <>
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
          onClick={() => setIsFilePanel((prev) => !prev)}
        >
          <div className="flex flex-row items-center gap-2 w-[40%] justify-start">
            {file.type === "folder" ? (
              <ImFolder color="#54AEFF" />
            ) : (
              <FaRegFile color="rgb(107,114,128)" />
            )}
            <p className="text-[14px]">{file?.file}</p>
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
              <div
                className="flex flex-row items-center w-full hover:bg-gray-200 rounded-md py-1 px-2 gap-2"
                onClick={() => {
                  handleGetReport(`${path}/${file?.file}`, file?.file);
                }}
              >
                <GoGraph size={14} color="rgb(107,114,128)" />
                <button className="text-blue-700 text-[12px] rounded-md flex flex-row justify-center items-center">
                  Analyze
                </button>
              </div>
              <div
                className="flex flex-row items-center w-full hover:bg-gray-200 rounded-md py-1 px-2 gap-2"
                onClick={() => {
                  window
                    .open(
                      `${baseURL}/${process.env.REACT_APP_ORDERNO_REL_PATH}/${path}/${file?.file}`,
                      "_blank"
                    )
                    .focus();
                }}
              >
                <MdDriveFileRenameOutline size={14} color="rgb(107,114,128)" />
                <button className="text-green-700 text-[12px] rounded-md flex flex-row justify-center items-center">
                  Get File
                </button>
              </div>
              <div
                className="flex flex-row items-center w-full hover:bg-gray-200 rounded-md py-1 px-2 gap-2"
                onClick={() =>
                  handleDeleteFile(`${path}/${file?.file}`, file?.file)
                }
              >
                <MdDelete size={14} color="rgb(107,114,128)" />
                <button className="text-red-600 text-[12px] rounded-md flex flex-row justify-center items-center">
                  Delete File
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FilesList;
