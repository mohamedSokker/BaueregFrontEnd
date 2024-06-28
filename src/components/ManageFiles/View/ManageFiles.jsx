import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { ImFolder } from "react-icons/im";
import { FaRegFile } from "react-icons/fa";
import {
  MdArrowDropDown,
  MdOutlineFileUpload,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { ColorRing } from "react-loader-spinner";

import PageLoading from "../../../components/PageLoading";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Folder from "../Components/Folder";
import FilesList from "../Components/FilesList";
import UploadCard from "../Components/UploadCard";
import Graphs from "../Components/Graphs";
import CreateFolderCard from "../Components/CreateFolderCard";
import { Link } from "react-router-dom";
import Table from "../Components/Table";
import RenameFolderCard from "../Components/RenameFolderCard";
import TableBtn from "../Components/TableBtn";

const ManageFiles = ({
  absPath,
  relPath,
  addDataURL,
  getFilesURL,
  createFolderURL,
  uploadURL,
  deleteFilesURL,
  searchFileURL,
  renameFilesURL,
  analyzeFileURL,
  enableCreateFolder,
  enableRenameFolder,
  enableTableBtn,
  tableBtnURL,
  enableUpload,
  enableDelete,
  enableRename,
  enableAnalyze,
  enableTable,
  enableGraph,
  columns,
  values,
}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [path, setPath] = useState("");
  const [files, setFiles] = useState(null);
  const [currentPath, setCurrentPath] = useState("");
  const [currentFiles, setCurrentFiles] = useState(null);
  const [isUploadPanel, setIsUploadPanel] = useState(false);
  const [isCreateFolder, setIsCreateFolder] = useState(false);
  const [isUpload, setIsUploadCard] = useState(false);
  const [isGraph, setIsGraph] = useState(false);
  const [graphData, setGraphData] = useState({});
  const [isTable, setIsTable] = useState(false);
  const [isTableBtn, setIsTableBtn] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [tableBtnData, setTableBtnData] = useState([]);
  const [createdFolder, setCreatedFolder] = useState(null);
  const [deletedFile, setDeletedFile] = useState(null);
  const [renamedFile, setRenamedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const [searchData, setSearchData] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);
  const [searchedFiles, setSearchedFiles] = useState([]);

  // console.log(searchedItems);

  const axiosPrivate = useAxiosPrivate();

  // console.log(files);

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

  const getFiles = async (fullPath) => {
    try {
      setMessage(`Loading Files...`);
      setLoading(true);
      const url = getFilesURL;
      const response = await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({
          fullpath: fullPath,
        }),
      });
      setFiles(response?.data?.data);
      setCurrentFiles(response?.data?.data);
      // console.log(response?.data?.data);
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

  const getCurrentFiles = async (fullPath) => {
    try {
      setMessage(`Loading Files...`);
      setLoading(true);
      const url = getFilesURL;
      const response = await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({
          fullpath: fullPath,
        }),
      });
      // setFiles(response?.data?.data);
      setCurrentFiles(response?.data?.data);
      // console.log(response?.data?.data);
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

  useEffect(() => {
    getFiles(path);
  }, []);

  const handleHomeClick = async () => {
    setCurrentFiles(null);
    setFiles(null);
    setCurrentPath("");
    await getFiles("");
  };

  const handleBack = async () => {
    console.log(currentPath);

    if (currentFiles !== "") {
      setCurrentPath(
        currentPath
          .split("/")
          .slice(0, currentPath.split("/").length - 1)
          .join("/")
      );
      await getCurrentFiles(
        currentPath
          .split("/")
          .slice(0, currentPath.split("/").length - 1)
          .join("/")
      );
    }
  };

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      setMessage(`Loading Files...`);
      setLoading(true);
      setSearchedItems([]);
      setSearchedFiles([]);
      if (searchData === "") {
        throw new Error(`Write something in search`);
      }
      const url = searchFileURL;
      const response = await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({
          path: path,
          search: searchData,
        }),
      });
      // setFiles(response?.data?.data);
      // setCurrentFiles(response?.data?.data);
      let result = [];
      response?.data?.map((item) => {
        result.push(item.slice(1));
      });
      setSearchedItems(result);
      console.log(result);
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
    <>
      {loading && <PageLoading message={message} />}
      {enableUpload && isUpload && (
        <UploadCard
          setIsUploadCard={setIsUploadCard}
          path={currentPath}
          currentFiles={currentFiles}
          setCurrentFiles={setCurrentFiles}
          setFile={setFiles}
          uploadURL={uploadURL}
          setUploadedFiles={setUploadedFiles}
        />
      )}
      {enableTable && isTable && (
        <Table
          setIsTable={setIsTable}
          tableData={tableData}
          setTableData={setTableData}
          setLoading={setLoading}
          addDataURL={addDataURL}
          columns={columns}
          values={values}
        />
      )}
      {enableTableBtn && isTableBtn && (
        <TableBtn
          setIsTableBtn={setIsTableBtn}
          tableBtnData={tableBtnData}
          setTableBtnData={setTableBtnData}
          tableBtnURL={tableBtnURL}
        />
      )}
      {enableCreateFolder && isCreateFolder && (
        <CreateFolderCard
          setIsCreateFolder={setIsCreateFolder}
          path={currentPath}
          currentFiles={currentFiles}
          setCurrentFiles={setCurrentFiles}
          setFiles={setFiles}
          createFolderURL={createFolderURL}
          setCreatedFolder={setCreatedFolder}
        />
      )}

      {enableGraph && isGraph && (
        <Graphs setIsGraph={setIsGraph} graphData={graphData} />
      )}
      <div
        className="w-full h-[calc(90vh-35px)] flex flex-row justify-start items-start gap-2 p-2 overflow-x-scroll"
        id="cont"
      >
        <div
          className="w-[25%] h-full border-r-1 border-gray-300 flex flex-col gap-2 items-start sticky"
          onClick={() => setIsUploadPanel(false)}
        >
          <div className="w-full text-[16px] font-[700] flex flex-row justify-start items-center px-2">
            Files
          </div>
          <div className="w-full relative flex flex-row items-center justify-center px-2">
            <form
              className="w-full flex flex-row items-center"
              onSubmit={handleSearch}
            >
              <div className="absolute left-4">
                <IoSearchOutline size={14} color="rgb(107,114,128)" />
              </div>
              <input
                type="text"
                placeholder="Search"
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
                className="px-6 py-1 text-[12px] outline-none w-full border-1 border-gray-300 rounded-md"
              />
            </form>
          </div>
          <div className="w-full h-full text-[14px] px-2 flex flex-col items-start overflow-y-scroll gap-2">
            {files &&
              files.map((file, i) =>
                file.type === "folder" ? (
                  <Folder
                    key={i}
                    filename={file?.file}
                    basePath={path}
                    setCurrentPath={setCurrentPath}
                    setCurrentFiles={setCurrentFiles}
                    currentPath={currentPath}
                    setFiles={setFiles}
                    getFilesURL={getFilesURL}
                    createdFolder={createdFolder}
                    deletedFile={deletedFile}
                    renamedFile={renamedFile}
                    uploadedFiles={uploadedFiles}
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
                      backgroundColor: searchedItems.includes(file?.file)
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
        </div>
        <div className="w-[75%] px-1 h-full flex flex-col gap-2">
          <div className="w-full h-[32px] flex flex-row justify-between">
            <div className="h-full text-[16px] font-[700] text-[#0969DA] flex flex-row gap-4 items-center">
              <p
                className="hover:underline hover:cursor-pointer"
                onClick={handleBack}
              >
                <MdOutlineArrowBackIosNew />
              </p>
              <p
                className="hover:underline hover:cursor-pointer"
                onClick={handleHomeClick}
              >{`Home`}</p>
              <p>{`|`}</p>
              <p>{`${currentPath.replace(absPath, "")}/`}</p>
            </div>
            <div className="h-full flex flex-row gap-2 items-center text-[14px]">
              {enableTableBtn && (
                <div
                  className="h-full p-1 flex flex-row items-center justify-center bg-gray-100 border-1 border-gray-300 hover:bg-gray-200 rounded-md hover:cursor-pointer relative"
                  onClick={() => setIsTableBtn(true)}
                >
                  <p>Show Table</p>
                </div>
              )}

              <div
                className="h-full w-[100px] flex flex-row p-1 pl-3 gap-2 items-center justify-center bg-gray-100 border-1 border-gray-300 hover:bg-gray-200 rounded-md hover:cursor-pointer relative"
                onClick={() => setIsUploadPanel((prev) => !prev)}
              >
                <p className=" font-[400]">Add File</p>
                <MdArrowDropDown size={14} />
                {(enableCreateFolder || enableUpload) && isUploadPanel && (
                  <div
                    className="absolute z-[11] top-[35px] right-0 w-[150px] bg-white rounded-[8px] p-3 flex flex-col justify-center items-center"
                    style={{
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    {enableUpload && (
                      <button
                        className="w-full hover:bg-gray-200 flex flex-row items-center py-1 px-2 gap-2 rounded-md"
                        onClick={() => setIsUploadCard(true)}
                      >
                        <MdOutlineFileUpload color="rgb(107,114,128)" />
                        <p>Upload Files</p>
                      </button>
                    )}

                    {enableCreateFolder && (
                      <button
                        className="w-full hover:bg-gray-200 flex flex-row items-center py-1 px-2 gap-2 rounded-md"
                        onClick={() => setIsCreateFolder(true)}
                      >
                        <ImFolder color="rgb(107,114,128)" />
                        <p>Create Folder</p>
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="h-full border-1 bg-gray-100 border-gray-300 hover:bg-gray-200 rounded-md flex justify-center items-center p-1 aspect-square hover:cursor-pointer">
                <BsThreeDots size={14} />
              </div>
            </div>
          </div>
          <div
            className="w-full flex flex-col border-1 border-gray-300 rounded-md"
            onClick={() => setIsUploadPanel(false)}
          >
            <div className="w-full p-2 flex flex-row justify-between items-center bg-gray-100 text-[14px]">
              <p className="text-gray-400 font-[600] w-[40%] flex flex-row justify-start">
                Name
              </p>
              <p className="text-gray-400 font-[600] w-[50%] flex flex-row justify-start">
                Date Created
              </p>
              <p className="text-gray-400 font-[600] w-[10%] flex flex-row justify-start">
                Size
              </p>
            </div>
            {currentFiles ? (
              currentFiles.map((file, i) => (
                <FilesList
                  key={i}
                  file={file}
                  path={currentPath}
                  setMessage={setMessage}
                  currentFiles={currentFiles}
                  setCurrentFiles={setCurrentFiles}
                  setIsGraph={setIsGraph}
                  setGraphData={setGraphData}
                  setFiles={setFiles}
                  setTableData={setTableData}
                  setIsTable={setIsTable}
                  deleteFilesURL={deleteFilesURL}
                  renameFilesURL={renameFilesURL}
                  analyzeFileURL={analyzeFileURL}
                  enableTable={enableTable}
                  enableGraph={enableGraph}
                  enableAnalyze={enableAnalyze}
                  enableDelete={enableDelete}
                  enableRename={enableRename}
                  relPath={relPath}
                  setDeletedFile={setDeletedFile}
                  setRenamedFile={setRenamedFile}
                  getFilesURL={getFilesURL}
                  setCurrentPath={setCurrentPath}
                />
              ))
            ) : (
              <div className="w-full h-full px-2 flex flex-row items-center justify-center">
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageFiles;
