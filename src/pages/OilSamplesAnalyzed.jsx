import React, { useEffect, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

import { useNavContext } from "../contexts/NavContext";
import filespic from "../assets/files.jpg";
import folderpic from "../assets/folder.jpg";
import { PageLoading } from "../components";

const OilSamplesAnalyzed = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const { closeSmallSidebar } = useNavContext();
  const abspath = process.env.REACT_APP_OILSAMPLESANALYZED_ABS_PATH;
  const relativepath = process.env.REACT_APP_OILSAMPLESANALYZED_REL_PATH;
  const [path, setPath] = useState(abspath);
  const [relPath, setRelPath] = useState(relativepath);
  const [filesItems, setFilesItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    fetch(`${baseURL}/AppGetFiles?fullpath=${path}`)
      .then((res) => res.json())
      .then((data) => {
        setFilesItems(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [update]);

  const createFolder = () => {
    let folderName = prompt("Enter Folder Name", "New Folder");
    if (folderName === "") {
      return alert("Folder Can't be empty");
    }
    console.log(folderName);
    setLoading(true);
    fetch(`${baseURL}/AppCreateFolder?fullpath=${path}/${folderName}`)
      .then((res) => {})
      .then((data) => {
        setUpdate((prev) => !prev);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  const deleteItem = (e) => {
    const targetfile = e.target.dataset.filename;
    setLoading(true);
    fetch(`${baseURL}/AppDeleteFolder?oldpath=${path}/${targetfile}`)
      .then((res) => {})
      .then((data) => {
        setUpdate((prev) => !prev);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  const renameItem = (e) => {
    let oldFileName = e.target.dataset.filename;
    let newFileName = prompt("Enter New Name", oldFileName);
    if (newFileName === "") {
      return alert("Folder or File Can't be Empty");
    }
    setLoading(true);
    fetch(
      `${baseURL}/AppRenameFolder?oldpath=${path}/${oldFileName}&newpath=${path}/${newFileName}`
    )
      .then((res) => {})
      .then((data) => {
        setUpdate((prev) => !prev);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  const uploadFiles = (e) => {
    setFiles(Array.from(e.target.files));
    console.log(Array.from(e.target.files[0]));
  };

  const uploadItem = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    // const copyFiles = [];
    files.map((file) => {
      data.append("files", file);
      // console.log(file);
      // copyFiles.push(file);
    });
    // console.log(copyFiles);

    console.log(data);
    fetch(`${baseURL}/AppUploadItems?url=${path}`, {
      method: "POST",
      body: data,
    })
      .then((res) => {})
      .then((data) => {
        setUpdate((prev) => !prev);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const goToFolder = (e) => {
    // console.log(e.target.dataset.filename);
    console.log(`${e.target.dataset.filename.replaceAll("#", "%23")}`);
    let targetpath = `${path}/${e.target.dataset.filename.replaceAll(
      "#",
      "%23"
    )}`;
    setLoading(true);
    fetch(`${baseURL}/AppCheck?path=${targetpath}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.type === "file") {
          let targetFile = `${baseURL}/${relPath}/${e.target.dataset.filename.replaceAll(
            "#",
            "%23"
          )}`;
          window.open(targetFile, "_blank").focus();
          setLoading(false);
        } else {
          setPath(`${targetpath.replaceAll("#", "%23")}`);
          setRelPath(
            `${relPath}/${e.target.dataset.filename.replaceAll("#", "%23")}`
          );
          setUpdate((prev) => !prev);
          setLoading(false);
        }
        // setFilesItems(data.data);
        // console.log(data.type);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  const goBack = () => {
    let copiedrelpathArray = relPath.split("/");
    let copiedabspathArray = path.split("/");
    copiedrelpathArray.pop();
    copiedabspathArray.pop();
    let copiedrelpath = copiedrelpathArray.join("/");
    let copiedabspath = copiedabspathArray.join("/").replaceAll("#", "%23");
    fetch(`${baseURL}/${copiedrelpath}`)
      .then((res) => res.text())
      .then((data) => {
        if (data !== "401 Access Denied") {
          setRelPath(copiedrelpath);
          setPath(copiedabspath);
          setUpdate((prev) => !prev);
        }
      });
  };

  return (
    <>
      {loading && <PageLoading />}
      <div
        className={`p-2 md:p-10 bg-white rounded-xl Main--Page dark:bg-background-logoColor md:mt-2 mt-20`}
        onClick={closeSmallSidebar}
      >
        <div className="w-full flex md:flex-row flex-col mb-6 items-center md:gap-0 gap-2">
          <div className="flex flex-row pl-2 max-w-full break-words">
            <button className="mr-4" onClick={goBack}>
              <MdOutlineArrowBackIosNew />
            </button>
            <h2 className="p-2 ">
              index Of {` ${relPath.replaceAll("%23", "#")}`}
            </h2>
          </div>
          {/* <button
            className="mr-4 bg-logoColor rounded-md text-white p-2"
            onClick={createFolder}
          >
            Create Folder
          </button>
          <form action="" onSubmit={uploadItem} className="pl-4 pr-4">
            <input
              type="file"
              multiple
              name="files"
              className="mr-4"
              onChange={uploadFiles}
            />
          </form> */}
          {/* <button
            className="mr-4 bg-logoColor rounded-md text-white p-2"
            onClick={uploadItem}
          >
            Upload
          </button> */}
        </div>
        <div className="flex flex-col justify-center">
          {filesItems.map((file, i) => (
            <div key={i} className=" w-full flex flex-row mb-4 justify-between">
              <div className="flex flex-row">
                {file.type === "folder" ? (
                  <img src={folderpic} className="h-5 mr-2" />
                ) : (
                  <img src={filespic} className="h-5 mr-2" />
                )}
                <span
                  data-filename={file.file}
                  className=" mr-40 cursor-pointer"
                  onClick={goToFolder}
                >
                  {file.file}
                </span>
              </div>
              {/* <div className="flex flex-row items-center">
                <button
                  className="mr-4 bg-logoColor rounded-md text-white p-1 pr-2 pl-2"
                  data-filename={file.file}
                  onClick={renameItem}
                >
                  remane
                </button>
                <button
                  data-filename={file.file}
                  className="mr-4 bg-logoColor rounded-md text-white p-1 pl-2 pr-2"
                  onClick={deleteItem}
                >
                  delete
                </button>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OilSamplesAnalyzed;
