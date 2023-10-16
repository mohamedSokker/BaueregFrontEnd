import React, { useState, useEffect } from "react";
import {
  KanbanComponent,
  ColumnDirective,
  ColumnsDirective,
} from "@syncfusion/ej2-react-kanban";
import { BiSend } from "react-icons/bi";
import { BsMic } from "react-icons/bs";
import { CiWarning } from "react-icons/ci";

import { kanbanGrid } from "../data/Kanban";
import { Header } from "../components";
import { useNavContext } from "../contexts/NavContext";
import { logoColor } from "../BauerColors";
import { PageLoading, KanbanTemplate } from "../components";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Kanban = ({ socket }) => {
  const { closeSmallSidebar, token, usersData } = useNavContext();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("Arabic");
  const [TextField, setTextField] = useState("");
  const [taskData, setTaskData] = useState({});
  const [isDownList, setIsDownList] = useState(false);
  const [sites, setSites] = useState([]);
  const [copySites, setCopySites] = useState([]);
  const [eqs, setEqs] = useState([]);
  const [copyEqs, setCopyEqs] = useState([]);
  const [error, setError] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");
  const [fetchData, setFetchData] = useState(false);
  const [users, setUsers] = useState([]);
  const [realTime, setRealTime] = useState(true);
  const [tableAllData, setTableAllData] = useState([]);

  useEffect(() => {
    socket?.on("UpdateTask", () => {
      console.log("Here");
      setFetchData((prev) => !prev);
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    let interval;
    interval = setInterval(() => {
      let currentDate = new Date(Date.now()).toISOString();
      tableAllData.map(async (item) => {
        try {
          let taskStart = new Date(item.TaskStart).toISOString();
          let taskEnd = new Date(item.TaskEnd).toISOString();
          if (currentDate >= taskStart && item.Status === "Open") {
            let body = {
              ...item,
              Status: "InProgress",
              TaskStart: new Date(item.TaskStart).toISOString(),
              TaskEnd: new Date(item.TaskEnd).toISOString(),
            };
            await axiosPrivate(`/api/v1/AdminTasks/${item.ID}`, {
              method: "PUT",
              data: JSON.stringify(body),
            });
            socket?.emit("TaskEdited", "TaskUpdated");
          } else if (currentDate < taskStart && item.Status === "InProgress") {
            let body = {
              ...item,
              Status: "Open",
              TaskStart: new Date(item.TaskStart).toISOString(),
              TaskEnd: new Date(
                new Date(item.TaskStart).setDate(
                  new Date(item.TaskStart).getDate() + Number(item.Duration)
                )
              ),
            };
            await axiosPrivate(`/api/v1/AdminTasks/${item.ID}`, {
              method: "PUT",
              data: JSON.stringify(body),
            });
            socket?.emit("TaskEdited", "TaskUpdated");
          } else if (
            currentDate >= taskStart &&
            item.Status === "InProgress" &&
            currentDate > taskEnd
          ) {
            let body = {
              ...item,
              Status: "Delayed",
              TaskStart: new Date(item.TaskStart).toISOString(),
              TaskEnd: new Date(
                new Date(item.TaskStart).setDate(
                  new Date(item.TaskStart).getDate() + Number(item.Duration)
                )
              ),
            };
            await axiosPrivate(`/api/v1/AdminTasks/${item.ID}`, {
              method: "PUT",
              data: JSON.stringify(body),
            });
            socket?.emit("TaskEdited", "TaskUpdated");
          }
        } catch (err) {
          console.log(err.message);
          setErrorDetails(err.message);
          setError(true);
        }
      });
      setRealTime((prev) => !prev);
    }, 10000);

    return () => {
      isMounted = false;
      controller.abort();
      clearInterval(interval);
    };
  }, [realTime]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    let txtarea = document.getElementById("textarea");
    if (txtarea.value.indexOf("@") !== -1) {
      let text = txtarea.value.length;
      let targetIndex = txtarea.value.indexOf("@");
      let targetString = txtarea.value.slice(targetIndex + 1, text);
      if (targetString === "") {
        setLoading(true);
        if (copyEqs.length === 0 && copySites.length === 0) {
          const getData = async () => {
            try {
              const eqsURL = `/api/v1/Bauer_Equipments`;
              const eqsData = await axiosPrivate(eqsURL, { method: "GET" });
              setEqs(eqsData?.data);
              setCopyEqs(eqsData?.data);
              const siteURL = `/api/v1/Location_Bauer`;
              const siteData = await axiosPrivate(siteURL, { method: "GET" });
              setSites(siteData?.data);
              setCopySites(siteData?.data);
              setIsDownList(true);
              setLoading(false);
            } catch (error) {
              setError(true);
              setErrorDetails(error.message);
              console.log(error.message);
              setLoading(false);
            }
          };
          getData();
        } else {
          let neweqs = copyEqs.filter((eq) =>
            eq.Equipment.startsWith(targetString)
          );
          setEqs(neweqs);
          let newSites = copySites.filter((site) =>
            site.Location.startsWith(targetString)
          );
          setSites(newSites);
          setIsDownList(true);
          setLoading(false);
        }
      } else {
        let neweqs = copyEqs.filter((eq) =>
          eq.Equipment.toLowerCase().startsWith(targetString.toLowerCase())
        );
        setEqs(neweqs);
        let newSites = copySites.filter((site) =>
          site.Location.toLowerCase().startsWith(targetString.toLowerCase())
        );
        setSites(newSites);
      }
    } else {
      setIsDownList(false);
    }
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [TextField, token]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getData = async () => {
      try {
        setLoading(true);
        const url = `/api/v1/manageUsers`;
        const data = await axiosPrivate(url, { method: "GET" });
        setUsers(data?.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setErrorDetails(error.message);
        console.log(error.message);
        setLoading(false);
      }
    };
    getData();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [token]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getData = async () => {
      try {
        setLoading(true);
        const url = `/api/v1/AdminTasks`;
        const data = await axiosPrivate(url, { method: "GET" });
        setTableAllData(data?.data);
        setTaskData(data?.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setErrorDetails(error.message);
        console.log(error.message);
        setLoading(false);
      }
    };
    getData();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [fetchData, token]);

  useEffect(() => {
    if (!loading) {
      const micbtn = document.getElementById("mic-btn");
      const txtarea = document.getElementById("textarea");
      if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      } else {
        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;
        const mic = new SpeechRecognition();

        mic.continuous = true;
        mic.interimResults = true;
        if (lang === "Arabic") {
          mic.lang = "ar-AE";
        } else {
          mic.lang = "en-US";
        }

        mic.onstart = () => {
          console.log("Started");
        };

        mic.onend = () => {
          console.log("Ended");
        };

        mic.addEventListener("result", (e) => {
          console.log(e.results);
          console.log(Array.from(e.results));
          const trans = Array.from(e.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join("");
          txtarea.value = trans;
        });

        const handleMouseDown = () => {
          micbtn.style.backgroundColor = logoColor;
          micbtn.style.color = "white";
          mic.start();
        };

        const handleMouseUp = () => {
          micbtn.style.backgroundColor = "";
          micbtn.style.color = "black";
          mic.stop();
        };

        micbtn.addEventListener("mousedown", handleMouseDown);
        micbtn.addEventListener("touchstart", handleMouseDown);
        micbtn.addEventListener("mouseup", handleMouseUp);
        micbtn.addEventListener("touchend", handleMouseUp);

        mic.onError = () => {
          console.log("Error");
        };

        return () => {
          micbtn.removeEventListener("mousedown", handleMouseDown);
          micbtn.removeEventListener("touchstart", handleMouseDown);
          micbtn.removeEventListener("mouseup", handleMouseUp);
          micbtn.removeEventListener("touchend", handleMouseUp);
        };
      }
    }
  }, [lang, loading]);

  let kanbanObj;
  const addCard = () => {
    let txtar = document.getElementById("textarea");
    const cardDetails = {
      ID: "",
      ResponsibleEnginnername: "",
      ResponsibleTechName: "",
      Site: "",
      Title: "",
      Status: "",
      Summary: txtar.value,
      TaskStart: getCurrentDate(),
      Duration: "",
      TaskFor: "",
    };
    kanbanObj.openDialog("Add", cardDetails);
  };

  const getCurrentDate = () => {
    const dt = new Date(Date.now());
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
    return dt.toISOString().slice(0, 16);
  };

  const dialogTemplate = (props) => {
    return <KanbanTemplate {...props} />;
  };

  return (
    <>
      {loading && <PageLoading />}
      <div
        className={`p-2 md:p-10 bg-white rounded-xl Main--Page flex flex-col dark:bg-background-logoColor`}
        onClick={closeSmallSidebar}
      >
        <div>
          {error ? (
            <div
              className=" bg-yellow-200 h-20 flex justify-center items-center flex-row mb-5 mt-2"
              style={{ color: "red", width: "90%" }}
            >
              <CiWarning className="text-xl" />
              <p className="ml-5 text-xl">{errorDetails}</p>
            </div>
          ) : (
            <>
              <div className="flex flex-row items-center justify-between Header mb-10 ">
                <Header category="" title="Task Manager" />
              </div>
              <KanbanComponent
                id="kanban"
                ref={(kanban) => {
                  kanbanObj = kanban;
                }}
                dataSource={taskData}
                cardSettings={{
                  contentField: "Summary",
                  headerField: "ID",
                  selectionType: "Multiple",
                }}
                keyField="Status"
                dialogSettings={{
                  template: dialogTemplate.bind(this),
                  width: "700px",
                }}
                enablePersistence={true}
                actionComplete={async (arg) => {
                  try {
                    if (
                      !usersData[0]?.roles?.Admin ||
                      !usersData[0]?.roles?.Editor?.Kanban ||
                      !usersData[0]?.roles?.User?.Kanban
                    ) {
                      alert(`You Are not authorized to edit tasks`);
                    } else {
                      if (arg.requestType === "cardCreated") {
                        console.log(arg.addedRecords[0]);
                        setLoading(true);
                        const ResEngImg = users?.find(
                          (user) =>
                            user.UserName ===
                            arg.addedRecords[0]["ResponsibleEnginnername"]
                        );
                        console.log(ResEngImg);
                        const ResTechImg = users?.find(
                          (user) =>
                            user.UserName ===
                            arg.addedRecords[0]["ResponsibleTechName"]
                        );
                        let body = {
                          ...arg.addedRecords[0],
                          ResponsibleEngineerImg: ResEngImg?.ProfileImg,
                          ResponsibleTechImg: ResTechImg?.ProfileImg,
                          DateCreated: new Date().toISOString(),
                          TaskStart: new Date(
                            arg.addedRecords[0]["TaskStart"]
                          ).toISOString(),
                          TaskEnd: new Date(
                            new Date(arg.addedRecords[0]["TaskStart"]).setDate(
                              new Date(
                                arg.addedRecords[0]["TaskStart"]
                              ).getDate() +
                                Number(arg.addedRecords[0]["Duration"])
                            )
                          ),
                          Color: "#673ABB",
                          ClassName: "e-improvment e-normal e-andrew-fuller",
                        };
                        await axiosPrivate(`/api/v1/AdminTasks`, {
                          method: "POST",
                          data: JSON.stringify(body),
                        });
                        setFetchData((prev) => !prev);
                        socket?.emit("TaskEdited", "TaskUpdated");
                        setLoading(false);
                      } else if (arg.requestType === "cardChanged") {
                        console.log(arg.changedRecords[0]);
                        console.log(users);
                        setLoading(true);
                        const ResEngImg = users?.find(
                          (user) =>
                            user.UserName ===
                            arg.changedRecords[0]["ResponsibleEnginnername"]
                        );
                        console.log(ResEngImg);
                        const ResTechImg = users?.find(
                          (user) =>
                            user.UserName ===
                            arg.changedRecords[0]["ResponsibleTechName"]
                        );
                        let body = {
                          ...arg.changedRecords[0],
                          ResponsibleEngineerImg: ResEngImg?.ProfileImg,
                          ResponsibleTechImg: ResTechImg?.ProfileImg,
                          DateCreated: new Date().toISOString(),
                          TaskStart: new Date(
                            arg.changedRecords[0]["TaskStart"]
                          ).toISOString(),
                          TaskEnd: new Date(
                            new Date(
                              arg.changedRecords[0]["TaskStart"]
                            ).setDate(
                              new Date(
                                arg.changedRecords[0]["TaskStart"]
                              ).getDate() +
                                Number(arg.changedRecords[0]["Duration"])
                            )
                          ),
                          Color: "#673ABB",
                          ClassName: "e-improvment e-normal e-andrew-fuller",
                        };
                        await axiosPrivate(
                          `/api/v1/AdminTasks/${arg.changedRecords[0]["ID"]}`,
                          { method: "PUT", data: JSON.stringify(body) }
                        );
                        socket?.emit("TaskEdited", "TaskUpdated");
                        setLoading(false);
                      } else if (arg.requestType === "cardRemoved") {
                        setLoading(true);
                        const ResEngImg = users?.find(
                          (user) =>
                            user.UserName ===
                            arg.deletedRecords[0]["ResponsibleEnginnername"]
                        );
                        console.log(ResEngImg);
                        const ResTechImg = users?.find(
                          (user) =>
                            user.UserName ===
                            arg.deletedRecords[0]["ResponsibleTechName"]
                        );
                        let body = {
                          ...arg.deletedRecords[0],
                          ResponsibleEngineerImg: ResEngImg?.ProfileImg,
                          ResponsibleTechImg: ResTechImg?.ProfileImg,
                          DateCreated: new Date().toISOString(),
                          TaskStart: new Date(
                            arg.deletedRecords[0]["TaskStart"]
                          ).toISOString(),
                          TaskEnd: new Date(
                            new Date(
                              arg.deletedRecords[0]["TaskStart"]
                            ).setDate(
                              new Date(
                                arg.deletedRecords[0]["TaskStart"]
                              ).getDate() +
                                Number(arg.deletedRecords[0]["Duration"])
                            )
                          ),
                          Color: "#673ABB",
                          ClassName: "e-improvment e-normal e-andrew-fuller",
                        };

                        if (window.confirm(`sure you want to delete data`)) {
                          await axiosPrivate(
                            `/api/v1/AdminTasks/${arg.deletedRecords[0]["ID"]}`,
                            { method: "DELETE", data: JSON.stringify(body) }
                          );
                        }
                        socket?.emit("TaskEdited", "TaskUpdated");
                        setLoading(false);
                      }
                    }
                  } catch (err) {
                    console.log(err.message);
                    setError(true);
                  }
                }}
              >
                <ColumnsDirective>
                  {kanbanGrid.map((item, index) => (
                    <ColumnDirective key={index} {...item} />
                  ))}
                </ColumnsDirective>
              </KanbanComponent>
            </>
          )}
        </div>

        <div className="w-full h-full flex flex-row justify-center  items-center mt-4 relative">
          <textarea
            id="textarea"
            type="text"
            placeholder="Enter task"
            className="outline-none rounded-lg pl-2"
            style={{ width: "85%", minHeight: "85px" }}
            onChange={(e) => {
              setTextField(e.target.value);
            }}
          ></textarea>

          {isDownList && (
            <div
              className=" absolute left-0"
              style={{
                top: "45px",
                width: "95%",
                maxHeight: "200px",
                overflowY: "scroll",
              }}
              onClick={(e) => {
                let txtarea = document.getElementById("textarea");
                let targetIndex = txtarea.value.indexOf("@");
                let targetStringBefore = txtarea.value.slice(0, targetIndex);
                txtarea.value = targetStringBefore + e.target.textContent;
                setIsDownList(false);
              }}
              onMouseDown={(e) => {
                e.target.style.backgroundColor = logoColor;
                e.target.style.color = "white";
              }}
              onMouseUp={(e) => {
                e.target.style.backgroundColor = "";
                e.target.style.color = "black";
              }}
            >
              {eqs.map((eq, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: "100%",
                      border: "1px solid rgb(209 213 219)",
                    }}
                    className="bg-white p-2 hover:cursor-pointer"
                  >
                    <span>{eq.Equipment}</span>
                  </div>
                );
              })}
              {sites.map((site, index) => (
                <div
                  key={index}
                  style={{
                    width: "100%",
                    border: "1px solid rgb(209 213 219)",
                  }}
                  className="bg-white p-2 hover:cursor-pointer"
                >
                  <span>{site.Location}</span>
                </div>
              ))}
            </div>
          )}

          <button
            id="send-btn"
            className=" border-logoColor border-solid border-1 rounded-full p-1 shadow-lg ml-4"
            onClick={addCard}
          >
            <BiSend />
          </button>
          {(window.SpeechRecognition || window.webkitSpeechRecognition) && (
            <>
              <button
                id="mic-btn"
                className=" border-logoColor border-solid border-1 rounded-full p-1 shadow-lg ml-4"
              >
                <BsMic />
              </button>
              <select
                id="lang-select"
                className="ml-4 border-logoColor border-solid border-1 p-1 outline-none rounded-md"
                onChange={(e) => {
                  setLang(e.target.value);
                }}
              >
                <option>Arabic</option>
                <option>English</option>
              </select>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Kanban;
