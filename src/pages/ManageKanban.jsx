import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Toolbar,
  Sort,
  Filter,
  Search,
  Resize,
  ContextMenu,
} from "@syncfusion/ej2-react-grids";
import { CiWarning } from "react-icons/ci";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

import { Spinner } from "../components";
import { Header } from "../components";
import { useNavContext } from "../contexts/NavContext";
import { KanbanGrid } from "../data/Kanban/Kanban";
import { bodyDataKanban } from "../Functions/bodydata";
import fetchDataOnly from "../Functions/fetchDataOnly";

const ManageKanban = ({ socket }) => {
  const { closeSmallSidebar, token } = useNavContext();

  const [tableData, setTableData] = useState([]);
  const [tableAllData, setTableAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");
  const [fetchData, setFetchData] = useState(false);
  const [realTime, setRealTime] = useState(true);

  const baseURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    socket.on("UpdateTask", () => {
      console.log("Here");
      setFetchData((prev) => !prev);
    });
  }, []);

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      let currentDate = new Date(Date.now()).toISOString();
      tableAllData.map(async (item) => {
        try {
          let taskStart = new Date(item.TaskStart).toISOString();
          let taskEnd = new Date(item.TaskEnd).toISOString();
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
              token
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
              TaskEnd: new Date(item.TaskEnd).toISOString(),
              TaskFor: item.TaskFor,
              Color: item.Color,
              ClassName: item.ClassName,
            };
            await bodyDataKanban(
              `${baseURL}/api/v1/AdminTasks/${item.ID}`,
              body,
              "PUT",
              token
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
              TaskEnd: new Date(item.TaskEnd).toISOString(),
              TaskFor: item.TaskFor,
              Color: item.Color,
              ClassName: item.ClassName,
            };
            await bodyDataKanban(
              `${baseURL}/api/v1/AdminTasks/${item.ID}`,
              body,
              "PUT",
              token
            );
            socket?.emit("TaskEdited", "TaskUpdated");
          }
        } catch (err) {
          console.log(err.message);
          setErrorDetails(err.message);
          setError(true);
        }
      });
      setRealTime((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, [realTime]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const url = `${baseURL}/api/v1/AdminTasks`;
        const data = await fetchDataOnly(url, "GET", token);
        setTableAllData(data);
        console.log(data);
        let gridData = [];
        data.map((item) => {
          gridData.push({
            ResponsibleEngineerImg: item.ResponsibleEngineerImg,
            ResponsibleEnginnername: item.ResponsibleEnginnername,
            ResponsibleTechImg: item.ResponsibleTechImg,
            ResponsibleTechName: item.ResponsibleTechName,
            Title: item.Title,
            Status: item.Status,
            Summary: item.Summary,
            TaskStart: new Date(item.TaskStart).toLocaleString(),
            Duration: item.Duration,
            TaskEnd: new Date(item.TaskEnd).toLocaleString(),
          });
        });
        console.log(gridData);
        setTableData(gridData);
        setLoading(false);
      } catch (error) {
        setError(true);
        setErrorDetails(error.message);
        console.log(error.message);
        setLoading(false);
      }
    };
    getData();
    // setLoading(true);
    // setError(false);
    // fetch(`${baseURL}/api/v1/AdminTasks`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setTableAllData(data);
    //     console.log(data);
    //     let gridData = [];
    //     data.map((item) => {
    //       gridData.push({
    //         ResponsibleEngineerImg: item.ResponsibleEngineerImg,
    //         ResponsibleEnginnername: item.ResponsibleEnginnername,
    //         ResponsibleTechImg: item.ResponsibleTechImg,
    //         ResponsibleTechName: item.ResponsibleTechName,
    //         Title: item.Title,
    //         Status: item.Status,
    //         Summary: item.Summary,
    //         TaskStart: new Date(item.TaskStart).toLocaleString(),
    //         Duration: item.Duration,
    //         TaskEnd: new Date(item.TaskEnd).toLocaleString(),
    //       });
    //     });
    //     console.log(gridData);
    //     setTableData(gridData);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     setErrorDetails(`Unothorized Or ${err.message}`);
    //     console.log(err.message);
    //     setError(true);
    //     setLoading(false);
    //   });
  }, [token]);

  useEffect(() => {
    const getData = async () => {
      try {
        setError(false);
        const url = `${baseURL}/api/v1/AdminTasks`;
        const data = await fetchDataOnly(url, "GET", token);
        setTableAllData(data);
        console.log(data);
        let gridData = [];
        data.map((item) => {
          gridData.push({
            ResponsibleEngineerImg: item.ResponsibleEngineerImg,
            ResponsibleEnginnername: item.ResponsibleEnginnername,
            ResponsibleTechImg: item.ResponsibleTechImg,
            ResponsibleTechName: item.ResponsibleTechName,
            Title: item.Title,
            Status: item.Status,
            Summary: item.Summary,
            TaskStart: new Date(item.TaskStart).toLocaleString(),
            Duration: item.Duration,
            TaskEnd: new Date(item.TaskEnd).toLocaleString(),
          });
        });
        console.log(gridData);
        setTableData(gridData);
      } catch (error) {
        setError(true);
        setErrorDetails(error.message);
        console.log(error.message);
        setLoading(false);
      }
    };
    getData();
    // setLoading(true);
    // setError(false);
    // fetch(`${baseURL}/api/v1/AdminTasks`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setTableAllData(data);
    //     console.log(data);
    //     let gridData = [];
    //     data.map((item) => {
    //       gridData.push({
    //         ResponsibleEngineerImg: item.ResponsibleEngineerImg,
    //         ResponsibleEnginnername: item.ResponsibleEnginnername,
    //         ResponsibleTechImg: item.ResponsibleTechImg,
    //         ResponsibleTechName: item.ResponsibleTechName,
    //         Title: item.Title,
    //         Status: item.Status,
    //         Summary: item.Summary,
    //         TaskStart: new Date(item.TaskStart).toLocaleString(),
    //         Duration: item.Duration,
    //         TaskEnd: new Date(item.TaskEnd).toLocaleString(),
    //       });
    //     });
    //     console.log(gridData);
    //     setTableData(gridData);
    //   })
    //   .catch((err) => {
    //     setErrorDetails(`Unothorized Or ${err.message}`);
    //     console.log(err.message);
    //     setError(true);
    //   });
  }, [fetchData, token]);

  if (loading) return <Spinner message={`Loading AdminTasks Data`} />;
  return (
    <div
      className={`p-2 md:p-10 bg-white rounded-xl Main--Page dark:bg-background-logoColor`}
      onClick={closeSmallSidebar}
    >
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
            <Header category="" title="Tasks" />
            <TooltipComponent content="Add Task" position="Top">
              <Link
                to="/ManageKanban"
                className=" bg-logo-color rounded-lg w-6 h-8 font-extrabold text-xl text-white flex justify-center items-center"
              >
                <BsPlus />
              </Link>
            </TooltipComponent>
          </div>
          <GridComponent
            className="e-grid"
            dataSource={tableData}
            allowPaging
            allowSorting
            height={250}
            allowResizing={true}
            pageSettings={{ pageSize: 50 }}
            autoFit={true}
            toolbar={["Search"]}
          >
            <ColumnsDirective>
              {KanbanGrid.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
            </ColumnsDirective>
            <Inject
              services={[
                Page,
                Toolbar,
                Selection,
                Sort,
                Filter,
                Search,
                Resize,
                ContextMenu,
              ]}
            />
          </GridComponent>
        </>
      )}
    </div>
  );
};

export default ManageKanban;
