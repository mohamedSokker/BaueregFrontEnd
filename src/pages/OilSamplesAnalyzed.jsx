import React, { useEffect, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { CiWarning } from "react-icons/ci";

import { useNavContext } from "../contexts/NavContext";
import filespic from "../assets/files.jpg";
import folderpic from "../assets/folder.jpg";
import { PageLoading } from "../components";
import fetchDataOnly from "../Functions/fetchDataOnly";

const OilSamplesAnalyzed = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const { closeSmallSidebar, token } = useNavContext();
  const abspath = process.env.REACT_APP_OILSAMPLESANALYZED_ABS_PATH;
  const relativepath = process.env.REACT_APP_OILSAMPLESANALYZED_REL_PATH;
  const [path, setPath] = useState(abspath);
  const [relPath, setRelPath] = useState(relativepath);
  const [filesItems, setFilesItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
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

  const goToFolder = (e) => {
    let targetpath = `${path}/${e.target.dataset.filename.replaceAll(
      "#",
      "%23"
    )}`;
    const getData = async () => {
      try {
        setLoading(true);
        const url = `${baseURL}/AppCheck?path=${targetpath}`;
        const data = await fetchDataOnly(url, "GET", token);
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
    let copiedabspath = copiedabspathArray.join("/").replaceAll("#", "%23");
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
        // }
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
            </div>
          ))}
        </div>
        {error && (
          <div className=" w-full h-14 bg-red-600 text-white flex justify-center items-center absolute bottom-0 left-0 flex-row border-t-1 border-gray-400">
            <CiWarning className="text-[40px] font-extrabold" />
            <p className="ml-5 text-xl font-semibold">{errorDetails}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default OilSamplesAnalyzed;
