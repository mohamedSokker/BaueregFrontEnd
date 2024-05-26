import React, { useState } from "react";
import { ImFolder } from "react-icons/im";
import { FaRegFile } from "react-icons/fa";
import { MdDriveFileRenameOutline, MdDelete } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { ColorRing } from "react-loader-spinner";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

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
  setIsGraph,
  setGraphData,
}) => {
  const [isFilePanel, setIsFilePanel] = useState(false);
  const [loading, setLoading] = useState(false);

  const baseURL = process.env.REACT_APP_BASE_URL;

  const axiosPrivate = useAxiosPrivate();

  const handleDeleteFile = async (file, fileName) => {
    try {
      setLoading(true);
      const url = `/api/v1/bReportDeleteFiles`;
      await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({ path: file }),
      });
      let result = [...currentFiles];
      result = result.filter((f) => f.file !== fileName);
      setCurrentFiles(result);
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

  const colors = {
    0: "blue",
    1: "red",
    2: "magenta",
    3: "orange",
    4: "green",
    5: "black",
  };

  const getStackedGraph = (graphData) => {
    let result = [];
    graphData?.model?.map((item) => {
      if (item.ckecked == "1") {
        result = result[item?.graph]
          ? {
              ...result,
              [item?.graph]: [
                ...result[item?.graph],
                {
                  tension: 0.9,
                  borderColor: colors[item.color],
                  borderWidth: 0.5,
                  label: `${item?.name} [${item.unit}]`,
                  data: graphData?.data?.[item?.name],
                  pointStyle: "cross",
                  pointRadius: 0.1,
                  pointBorderColor: colors[item.color],
                },
              ],
            }
          : {
              ...result,
              [item?.graph]: [
                {
                  tension: 0.9,
                  borderColor: colors[item.color],
                  borderWidth: 0.5,
                  label: `${item?.name} [${item.unit}]`,
                  data: graphData?.data?.[item?.name],
                  pointStyle: "cross",
                  pointRadius: 0.1,
                  pointBorderColor: colors[item.color],
                },
              ],
            };
      }
    });
    return result;
  };

  const handleGetReport = async () => {
    try {
      setLoading(true);
      const url = `/api/v1/bReportReadFile`;
      const response = await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({ path: file?.file }),
      });
      let result = {};
      const string = response.data;
      const stopIndex = string.indexOf("$ED");
      const targetString = string.slice(0, stopIndex);
      const arr = targetString.split("$DAT").slice(1);
      const header = targetString.split("$DAT")[0];

      const endDate = string.slice(stopIndex + 3, stopIndex + 15);

      const reg = string.includes("copyright by BAUER Maschinen GmbH$BEGINN")
        ? /([0-9]+,){5}('[A-Z])[^']+','\[[^']+\]',[0-9],[0-9]/g
        : /([0-9]+,){5}('[A-Z])[^']+','\[[^']+\]',/g;

      const notMatch = /[0-9a-z-A-Z\_\$\(\)\#\.\>\s]+\s{2,}/g;

      const headersData = header.match(notMatch).join("");
      const project = string.includes(
        "copyright by BAUER Maschinen GmbH$BEGINN"
      )
        ? headersData.slice(47, 67)
        : headersData.slice(53, 73);
      const pannel = string.includes("copyright by BAUER Maschinen GmbH$BEGINN")
        ? headersData.slice(67, 82)
        : headersData.slice(73, 88);
      const startTime = string.includes(
        "copyright by BAUER Maschinen GmbH$BEGINN"
      )
        ? headersData.slice(82, 94)
        : headersData.slice(88, 100);
      const jobSite = string.includes(
        "copyright by BAUER Maschinen GmbH$BEGINN"
      )
        ? headersData.slice(119, 149)
        : headersData.slice(100, 155);
      const operator = string.includes(
        "copyright by BAUER Maschinen GmbH$BEGINN"
      )
        ? headersData.slice(203, 228)
        : headersData.slice(209, 234);

      const itemHead = header.match(reg);
      let model = [];
      for (let i = 0; i < itemHead.length; i++) {
        const configStr = itemHead[i]
          .match(/([0-9]+,){5}/)[0]
          .slice(0, -1)
          .split(",");
        const configStr1 = string.includes(
          "copyright by BAUER Maschinen GmbH$BEGINN"
        )
          ? itemHead[i].split(",")
          : ["1"];
        const name = itemHead[i].match(/('[A-Z])[^']+'/)[0].slice(1, -1);
        const unit = itemHead[i].match(/'\[[^']+\]'/)[0].slice(2, -2);
        model = [
          ...model,
          {
            name: name,
            unit: unit,
            bits: configStr[0],
            division: configStr[1],
            graph: configStr[2],
            color: configStr[3],
            factor: configStr[4],
            ckecked: string.includes("copyright by BAUER Maschinen GmbH$BEGINN")
              ? configStr1[configStr1.length - 1]
              : "1",
          },
        ];
      }

      let dataList = {};
      model.map((item) => {
        dataList = { ...dataList, [item.name]: [] };
      });
      let pointer = 0;
      let startDepth = 0;
      let breaks = false;
      let breaksNo = 0;
      let breaksTime = 0;
      for (let i = 0; i < arr.length; i++) {
        pointer = 0;
        if (arr[i].includes("$PT")) {
          breaks = true;
          breaksNo++;
        }
        if (arr[i].includes("$PE")) {
          breaks = false;
        }

        if (!breaks) {
          model.map((item) => {
            if (arr[i].includes("Start Fraesen")) {
              startDepth = Number(arr[i].slice(0, 5)) / Number(10 ** 2);
            }

            dataList[item.name].push(
              Number(arr[i].slice(pointer, pointer + Number(item?.bits))) /
                Number(10 ** item?.division)
            );

            pointer += Number(item?.bits);
          });
        } else {
          breaksTime++;
        }
      }

      result.breaks = breaksNo;
      // result.startDepth = startDepth;
      // result.depth = Math.max(...dataList?.Tiefe);

      result.headers = string.includes(
        "copyright by BAUER Maschinen GmbH$BEGINN"
      )
        ? {
            Operator: operator.trim(),
            "Project id": project.trim(),
            "Depth at start": startDepth,
            "Final depth": Math.max(...dataList?.Tiefe),
            "Panel No.": pannel.trim(),
            JobSite: jobSite.trim(),
            "Start Time": new Date(
              Date.UTC(
                Number(`20${startTime.trim().slice(4, 6)}`),
                Number(Number(startTime.trim().slice(2, 4)) - 1),
                Number(`${startTime.trim().slice(0, 2)}`),
                Number(`${startTime.trim().slice(6, 8)}`),
                Number(`${startTime.trim().slice(8, 10)}`),
                Number(`${startTime.trim().slice(10, 12)}`)
              )
            ).toISOString(),
            "End Time": new Date(
              Date.UTC(
                Number(`20${endDate.trim().slice(4, 6)}`),
                Number(Number(endDate.trim().slice(2, 4)) - 1),
                Number(`${endDate.trim().slice(0, 2)}`),
                Number(`${endDate.trim().slice(6, 8)}`),
                Number(`${endDate.trim().slice(8, 10)}`),
                Number(`${endDate.trim().slice(10, 12)}`)
              )
            ).toISOString(),
            "Max deviation X +": Math.max(...dataList?.["Abweichung X"]),
            "Max deviation Y +": Math.max(...dataList?.["Abweichung Y"]),
            "Max deviation X -": Math.min(...dataList?.["Abweichung X"]),
            "Max deviation Y -": Math.min(...dataList?.["Abweichung Y"]),
          }
        : {
            Operator: operator.trim(),
            Client: project.trim(),
            "Column No.": pannel.trim(),
            jobSite: jobSite.trim(),
            "T length of borehole": Math.max(...dataList?.Tiefe),
            "Start Time": new Date(
              Date.UTC(
                Number(`20${startTime.trim().slice(4, 6)}`),
                Number(Number(startTime.trim().slice(2, 4)) - 1),
                Number(`${startTime.trim().slice(0, 2)}`),
                Number(`${startTime.trim().slice(6, 8)}`),
                Number(`${startTime.trim().slice(8, 10)}`),
                Number(`${startTime.trim().slice(10, 12)}`)
              )
            ).toISOString(),
            "End Time": new Date(
              Date.UTC(
                Number(`20${endDate.trim().slice(4, 6)}`),
                Number(Number(endDate.trim().slice(2, 4)) - 1),
                Number(`${endDate.trim().slice(0, 2)}`),
                Number(`${endDate.trim().slice(6, 8)}`),
                Number(`${endDate.trim().slice(8, 10)}`),
                Number(`${endDate.trim().slice(10, 12)}`)
              )
            ).toISOString(),
          };
      // result.maxX = Math.max(...dataList?.["Abweichung X"]);
      // result.minX = Math.min(...dataList?.["Abweichung X"]);
      // result.maxY = Math.max(...dataList?.["Abweichung Y"]);
      // result.minY = Math.min(...dataList?.["Abweichung Y"]);
      result.data = dataList;
      const arrLength =
        Number(
          new Date(result.headers["End Time"]) -
            new Date(result.headers["Start Time"])
        ) /
          1000 -
        breaksTime;

      const step =
        (Number(
          new Date(result.headers["End Time"]) -
            new Date(result.headers["Start Time"])
        ) /
          1000 -
          breaksTime) /
        Number(result.data.Tiefe.length);
      // const arrLength = result.data.Tiefe;
      result.data = { ...result.data, breaksTime: breaksTime };
      result.data = {
        ...result.data,
        Time: [...Array(Math.floor(arrLength / step) + 1).keys()].map(
          (i) => i * step
        ),
      };

      result.dataLength = dataList?.Tiefe?.length;
      result.model = model;
      result.items = getStackedGraph(result);
      setLoading(false);
      setGraphData(result);
      setIsGraph(true);
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
                onClick={handleGetReport}
              >
                <GoGraph size={14} color="rgb(107,114,128)" />
                <button className="text-blue-700 text-[12px] rounded-md flex flex-row justify-center items-center">
                  Get Report
                </button>
              </div>
              <div
                className="flex flex-row items-center w-full hover:bg-gray-200 rounded-md py-1 px-2 gap-2"
                onClick={() => {
                  window
                    .open(
                      `${baseURL}/Bauereg/BReport/${path}/${file?.file}`,
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
