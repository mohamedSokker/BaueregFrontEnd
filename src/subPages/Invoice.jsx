import React, { useEffect, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { CiWarning } from "react-icons/ci";
import { AiOutlineCheckCircle } from "react-icons/ai";

import { useNavContext } from "../contexts/NavContext";
import filespic from "../assets/files.jpg";
import folderpic from "../assets/folder.jpg";
import { PageLoading } from "../components";
import fetchDataOnly from "../Functions/fetchDataOnly";

const Invoice = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const { closeSmallSidebar, usersData, token } = useNavContext();
  const abspath = process.env.REACT_APP_ORDERINVOICE_ABS_PATH;
  const relativepath = process.env.REACT_APP_ORDERINVOICE_REL_PATH;
  const [path, setPath] = useState(abspath);
  const [relPath, setRelPath] = useState(relativepath);
  const [filesItems, setFilesItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsSuccess(false);
        setError(false);
        setLoading(true);
        const url = `${baseURL}/AppGetFiles?fullpath=${path}`;
        const data = await fetchDataOnly(url, "GET", token);
        setFilesItems(data.data);
        setLoading(false);
      } catch (err) {
        setErrorDetails(`${err.message}`);
        console.log(err.message);
        setError(true);
        setLoading(false);
      }
    };
    getData();
  }, [update]);

  const createFolder = () => {
    let folderName = prompt("Enter Folder Name", "New Folder");
    if (folderName === "") {
      return alert("Folder Can't be empty");
    }
    const getData = async () => {
      try {
        setLoading(true);
        const url = `${baseURL}/AppCreateFolder?fullpath=${path}/${folderName}`;
        const data = await fetchDataOnly(url, "GET", token);
        setUpdate((prev) => !prev);
        setLoading(false);
      } catch (err) {
        setErrorDetails(`${err.message}`);
        console.log(err.message);
        setError(true);
        setLoading(false);
      }
    };
    getData();
  };

  const deleteItem = (e) => {
    const targetfile = e.target.dataset.filename;
    const getData = async () => {
      try {
        setLoading(true);
        const url = `${baseURL}/AppDeleteFolder?oldpath=${path}/${targetfile}`;
        await fetchDataOnly(url, "GET", token);
        setUpdate((prev) => !prev);
        setLoading(false);
      } catch (err) {
        setErrorDetails(`${err.message}`);
        console.log(err.message);
        setError(true);
        setLoading(false);
      }
    };
    getData();
  };

  const renameItem = (e) => {
    let oldFileName = e.target.dataset.filename;
    let newFileName = prompt("Enter New Name", oldFileName);
    if (newFileName === "") {
      return alert("Folder or File Can't be Empty");
    }
    const getData = async () => {
      try {
        setLoading(true);
        const url = `${baseURL}/AppRenameFolder?oldpath=${path}/${oldFileName}&newpath=${path}/${newFileName}`;
        await fetchDataOnly(url, "GET", token);
        setUpdate((prev) => !prev);
        setLoading(false);
      } catch (err) {
        setErrorDetails(`${err.message}`);
        console.log(err.message);
        setError(true);
        setLoading(false);
      }
    };
    getData();
  };

  const uploadFiles = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const uploadItem = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    files.map((file) => {
      data.append("files", file);
    });
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
        setErrorDetails(`${err.message}`);
        console.log(err.message);
        setError(true);
        setLoading(false);
      });
  };

  const goToFolder = (e) => {
    let targetpath = `${path}/${e.target.dataset.filename}`;
    const getData = async () => {
      try {
        setLoading(true);
        const url = `${baseURL}/AppCheck?path=${targetpath}`;
        const data = await fetchDataOnly(url, "GET", token);
        if (data.type === "file") {
          let targetFile = `${baseURL}/${relPath}/${e.target.dataset.filename}`;
          window.open(targetFile, "_blank").focus();
          setLoading(false);
        } else {
          setPath(`${targetpath}`);
          setRelPath(`${relPath}/${e.target.dataset.filename}`);
          setUpdate((prev) => !prev);
        }
        setLoading(false);
      } catch (err) {
        setErrorDetails(`${err.message}`);
        console.log(err.message);
        setError(true);
        setLoading(false);
      }
    };
    getData();
  };

  const goBack = () => {
    let copiedrelpathArray = relPath.split("/");
    let copiedabspathArray = path.split("/");
    copiedrelpathArray.pop();
    copiedabspathArray.pop();
    let copiedrelpath = copiedrelpathArray.join("/");
    let copiedabspath = copiedabspathArray.join("/");
    let minPath = "bauereg/Orders/Bauer/Order Invoice";
    const getData = async () => {
      try {
        setLoading(true);
        const url = `${baseURL}/${copiedrelpath}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error(`Unauthorized to see this folder`);
        setRelPath(copiedrelpath);
        setPath(copiedabspath);
        setUpdate((prev) => !prev);
        setLoading(false);
      } catch (err) {
        setErrorDetails(`${err.message}`);
        console.log(err.message);
        setError(true);
        setLoading(false);
      }
    };
    if (copiedrelpath >= minPath) {
      getData();
    }
  };

  const AnalyzeItem = (e) => {
    setLoading(true);
    let targetpath = `${path}/${e.target.dataset.filename}`;
    targetpath = targetpath.replaceAll(" ", "%20");
    const getData = async () => {
      try {
        setError(false);
        setLoading(true);
        const url = `${baseURL}/OrdersInvoicepdfAnalysis?filepath=${targetpath}`;
        const data = await fetchDataOnly(url, "GET", token);
        console.log(data);
        setLoading(false);
        setIsSuccess(true);
      } catch (err) {
        setErrorDetails(`${err.message}`);
        console.log(err.message);
        setError(true);
        setLoading(false);
      }
    };
    getData();
  };

  return (
    <>
      {loading && <PageLoading />}
      <div
        className={`p-2 md:p-10 bg-white rounded-xl Main--Page dark:bg-background-logoColor md:mt-2 mt-20`}
        onClick={closeSmallSidebar}
      >
        <div className="w-full flex md:flex-row flex-col mb-6 items-center md:gap-0 gap-2">
          <div className="flex flex-row">
            <button className="mr-4" onClick={goBack}>
              <MdOutlineArrowBackIosNew />
            </button>
            <h2 className="p-2">index Of {` ${relPath}`}</h2>
          </div>
          {usersData[0]?.roles?.Editor?.Orders.length > 0 && (
            <>
              <button
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
              </form>
              <button
                className="mr-4 bg-logoColor rounded-md text-white p-2"
                onClick={uploadItem}
              >
                Upload
              </button>
            </>
          )}
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
              {usersData[0]?.roles?.Editor?.Orders.length > 0 && (
                <div className="flex flex-row items-center">
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
                  <button
                    data-filename={file.file}
                    className="mr-4 bg-logoColor rounded-md text-white p-1 pl-2 pr-2"
                    onClick={AnalyzeItem}
                  >
                    Analyze
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {error && (
          <div className=" w-full h-14 bg-red-600 text-white flex justify-center items-center absolute bottom-0 left-0 flex-row border-t-1 border-gray-400">
            <CiWarning className="text-[40px] font-extrabold" />
            <p className="ml-5 text-xl font-semibold">{errorDetails}</p>
          </div>
        )}
        {isSuccess && (
          <div className=" w-full h-14 bg-green-700 text-white flex justify-center items-center absolute bottom-0 left-0 flex-row border-t-1 border-gray-400">
            <AiOutlineCheckCircle className="text-[40px] font-extrabold" />
            <p className="ml-5 text-xl font-semibold">{`${new Date().toLocaleString()} : Successfully Analyzed`}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Invoice;
