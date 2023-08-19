import React, { useState, useEffect } from "react";
import {
  KanbanComponent,
  ColumnDirective,
  ColumnsDirective,
} from "@syncfusion/ej2-react-kanban";
import { BiSend } from "react-icons/bi";
import { BsMic } from "react-icons/bs";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { CiWarning } from "react-icons/ci";

import { kanbanGrid } from "../data/Kanban";
import { Header } from "../components";
import { useNavContext } from "../contexts/NavContext";
import { logoColor } from "../BauerColors";
import { PageLoading, KanbanTemplate } from "../components";
import { bodyDataKanban } from "../Functions/bodydata";
import { Login } from "../pages";
import { socket } from "../socket/socket";

const Kanban = () => {
  const navigate = useNavigate();
  const { closeSmallSidebar, token } = useNavContext();
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
  // const [engineerImg, setEngineerImg] = useState("");
  // const [techImg, setTechImg] = useState("");
  const [users, setUsers] = useState([]);
  const [realTime, setRealTime] = useState(true);
  const [tableAllData, setTableAllData] = useState([]);
  // const [cookies] = useCookies(["token"]);
  const cookies = new Cookies();
  // const [engineers, setEngineers] = useState([]);

  const baseURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    socket?.on("UpdateTask", () => {
      console.log("Here");
      setFetchData((prev) => !prev);
    });
  }, []);

  useEffect(() => {
    let interval;
    // if (realTime) {
    interval = setInterval(() => {
      let currentDate = new Date(Date.now()).toISOString();
      tableAllData.map(async (item) => {
        let taskStart = new Date(item.TaskStart).toISOString();
        let taskEnd = new Date(item.TaskEnd).toISOString();
        // console.log(item.TaskStart, currentDate);
        if (currentDate >= taskStart && item.Status === "Open") {
          let body = {
            ResponsibleEngineerImg: item.ResponsibleEngineerImg,
            ResponsibleEnginnername: item.ResponsibleEnginnername,
            ResponsibleTechImg: item.ResponsibleTechImg,
            ResponsibleTechName: item.ResponsibleTechName,
            Site: item.Site,
            Title: item.Title,
            Status: "InProgress",
            Summary: item.Summary,
            DateCreated: item.DateCreated,
            TaskStart: new Date(item.TaskStart).toISOString(),
            Duration: item.Duration,
            TaskEnd: new Date(item.TaskEnd).toISOString(),
            TaskFor: item.TaskFor,
            Color: item.Color,
            ClassName: item.ClassName,
          };
          await bodyDataKanban(
            `${baseURL}/api/v1/AdminTasks/${item.ID}`,
            body,
            "PUT",
            "update"
          );
          socket?.emit("TaskEdited", "TaskUpdated");
        } else if (currentDate < taskStart && item.Status === "InProgress") {
          let body = {
            ResponsibleEngineerImg: item.ResponsibleEngineerImg,
            ResponsibleEnginnername: item.ResponsibleEnginnername,
            ResponsibleTechImg: item.ResponsibleTechImg,
            ResponsibleTechName: item.ResponsibleTechName,
            Site: item.Site,
            Title: item.Title,
            Status: "Open",
            Summary: item.Summary,
            DateCreated: item.DateCreated,
            TaskStart: new Date(item.TaskStart).toISOString(),
            Duration: item.Duration,
            TaskEnd: new Date(
              new Date(item.TaskStart).setDate(
                new Date(item.TaskStart).getDate() + Number(item.Duration)
              )
            ),
            TaskFor: item.TaskFor,
            Color: item.Color,
            ClassName: item.ClassName,
          };
          await bodyDataKanban(
            `${baseURL}/api/v1/AdminTasks/${item.ID}`,
            body,
            "PUT",
            "update"
          );
          socket?.emit("TaskEdited", "TaskUpdated");
        } else if (
          currentDate >= taskStart &&
          item.Status === "InProgress" &&
          currentDate > taskEnd
        ) {
          let body = {
            ResponsibleEngineerImg: item.ResponsibleEngineerImg,
            ResponsibleEnginnername: item.ResponsibleEnginnername,
            ResponsibleTechImg: item.ResponsibleTechImg,
            ResponsibleTechName: item.ResponsibleTechName,
            Site: item.Site,
            Title: item.Title,
            Status: "Delayed",
            Summary: item.Summary,
            DateCreated: item.DateCreated,
            TaskStart: new Date(item.TaskStart).toISOString(),
            Duration: item.Duration,
            TaskEnd: new Date(
              new Date(item.TaskStart).setDate(
                new Date(item.TaskStart).getDate() + Number(item.Duration)
              )
            ),
            TaskFor: item.TaskFor,
            Color: item.Color,
            ClassName: item.ClassName,
          };
          await bodyDataKanban(
            `${baseURL}/api/v1/AdminTasks/${item.ID}`,
            body,
            "PUT",
            "update"
          );
          socket?.emit("TaskEdited", "TaskUpdated");
        }
      });
      setRealTime((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, [realTime]);

  useEffect(() => {
    const token = cookies.get("token");

    let txtarea = document.getElementById("textarea");
    if (txtarea.value.indexOf("@") !== -1) {
      let text = txtarea.value.length;
      let targetIndex = txtarea.value.indexOf("@");
      let targetString = txtarea.value.slice(targetIndex + 1, text);
      if (targetString === "") {
        setLoading(true);
        if (copyEqs.length === 0 && copySites.length === 0) {
          fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/Bauer_Equipments`, {
            headers: { Authorization: `Bearer ${token}` },
          })
            .then((res) => res.json())
            .then((data) => {
              setEqs(data);
              setCopyEqs(data);
            })
            .then(() => {
              fetch(`${baseURL}/api/v1/Location_Bauer`, {
                headers: { Authorization: `Bearer ${token}` },
              })
                .then((res) => res.json())
                .then((data) => {
                  setSites(data);
                  setCopySites(data);
                  setIsDownList(true);
                  setLoading(false);
                });
            });
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
  }, [TextField]);

  useEffect(() => {
    fetch(`${baseURL}/api/v1/manageUsers`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        // console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const token = cookies.get("token");
    // console.log(token);
    setLoading(true);
    fetch(`${baseURL}/api/v1/AdminTasks`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTableAllData(data);
        setTaskData(data);
        setLoading(false);
      })
      .catch((err) => {
        setErrorDetails(`Unothorized Or ${err.message}`);
        console.log(err.message);
        setError(true);
        setLoading(false);
      });
  }, [fetchData]);

  useEffect(() => {
    if (!loading) {
      const micbtn = document.getElementById("mic-btn");
      const txtarea = document.getElementById("textarea");
      if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
        // console.log("no");
        // return <h1>Browser Doesn't Support Speech Recognition</h1>;
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
                      ResponsibleEngineerImg: ResEngImg?.ProfileImg,
                      ResponsibleEnginnername:
                        arg.addedRecords[0]["ResponsibleEnginnername"],
                      ResponsibleTechImg: ResTechImg?.ProfileImg,
                      ResponsibleTechName:
                        arg.addedRecords[0]["ResponsibleTechName"],
                      Site: arg.addedRecords[0]["Site"],
                      Title: arg.addedRecords[0]["Title"],
                      Status: arg.addedRecords[0]["Status"],
                      Summary: arg.addedRecords[0]["Summary"],
                      DateCreated: new Date().toISOString(),
                      TaskStart: new Date(
                        arg.addedRecords[0]["TaskStart"]
                      ).toISOString(),
                      Duration: arg.addedRecords[0]["Duration"],
                      TaskEnd: new Date(
                        new Date(arg.addedRecords[0]["TaskStart"]).setDate(
                          new Date(arg.addedRecords[0]["TaskStart"]).getDate() +
                            Number(arg.addedRecords[0]["Duration"])
                        )
                      ),
                      TaskFor: arg.addedRecords[0]["TaskFor"],
                      Color: "#673ABB",
                      ClassName: "e-improvment e-normal e-andrew-fuller",
                    };
                    await bodyDataKanban(
                      `${baseURL}/api/v1/AdminTasks`,
                      body,
                      "POST",
                      "add"
                    );
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
                      ResponsibleEngineerImg: ResEngImg?.ProfileImg,
                      ResponsibleEnginnername:
                        arg.changedRecords[0]["ResponsibleEnginnername"],
                      ResponsibleTechImg: ResTechImg?.ProfileImg,
                      ResponsibleTechName:
                        arg.changedRecords[0]["ResponsibleTechName"],
                      Site: arg.changedRecords[0]["Site"],
                      Title: arg.changedRecords[0]["Title"],
                      Status: arg.changedRecords[0]["Status"],
                      Summary: arg.changedRecords[0]["Summary"],
                      DateCreated: new Date().toISOString(),
                      TaskStart: new Date(
                        arg.changedRecords[0]["TaskStart"]
                      ).toISOString(),
                      Duration: arg.changedRecords[0]["Duration"],
                      TaskEnd: new Date(
                        new Date(arg.changedRecords[0]["TaskStart"]).setDate(
                          new Date(
                            arg.changedRecords[0]["TaskStart"]
                          ).getDate() +
                            Number(arg.changedRecords[0]["Duration"])
                        )
                      ),
                      TaskFor: arg.changedRecords[0]["TaskFor"],
                      Color: "#673ABB",
                      ClassName: "e-improvment e-normal e-andrew-fuller",
                    };
                    console.log(arg.changedRecords[0]);
                    console.log(
                      new Date(
                        new Date(arg.changedRecords[0]["TaskStart"]).setDate(
                          new Date(
                            arg.changedRecords[0]["TaskStart"]
                          ).getDate() +
                            Number(arg.changedRecords[0]["Duration"])
                        )
                      )
                    );
                    await bodyDataKanban(
                      `${baseURL}/api/v1/AdminTasks/${arg.changedRecords[0]["ID"]}`,
                      body,
                      "PUT",
                      "update"
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
                      ResponsibleEngineerImg: ResEngImg?.ProfileImg,
                      ResponsibleEnginnername:
                        arg.deletedRecords[0]["ResponsibleEnginnername"],
                      ResponsibleTechImg: ResTechImg?.ProfileImg,
                      ResponsibleTechName:
                        arg.deletedRecords[0]["ResponsibleTechName"],
                      Site: arg.deletedRecords[0]["Site"],
                      Title: arg.deletedRecords[0]["Title"],
                      Status: arg.deletedRecords[0]["Status"],
                      Summary: arg.deletedRecords[0]["Summary"],
                      DateCreated: new Date().toISOString(),
                      TaskStart: new Date(
                        arg.deletedRecords[0]["TaskStart"]
                      ).toISOString(),
                      Duration: arg.deletedRecords[0]["Duration"],
                      TaskEnd: new Date(
                        new Date(arg.deletedRecords[0]["TaskStart"]).setDate(
                          new Date(
                            arg.deletedRecords[0]["TaskStart"]
                          ).getDate() +
                            Number(arg.deletedRecords[0]["Duration"])
                        )
                      ),
                      TaskFor: arg.deletedRecords[0]["TaskFor"],
                      Color: "#673ABB",
                      ClassName: "e-improvment e-normal e-andrew-fuller",
                    };

                    if (window.confirm(`sure you want to delete data`)) {
                      await bodyDataKanban(
                        `${baseURL}/api/v1/AdminTasks/${arg.deletedRecords[0]["ID"]}`,
                        body,
                        "DELETE",
                        "delete"
                      );
                    }
                    socket?.emit("TaskEdited", "TaskUpdated");
                    setLoading(false);
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
