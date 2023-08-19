import {
  AiFillCheckCircle,
  AiFillClockCircle,
  AiOutlineLoading,
  AiFillExclamationCircle,
} from "react-icons/ai";

export const gridEngineerImg = (props) => (
  <div>
    <img
      className="rounded-full h-6 w-6"
      src={props.ResponsibleEngineerImg}
      alt="Eng"
    />
  </div>
);

export const gridTechImg = (props) => (
  <div>
    <img
      className="rounded-full h-6 w-6"
      src={props.ResponsibleTechImg}
      alt="Tech"
    />
  </div>
);

export const gridStatus = (props) => {
  const start = new Date(props.TaskStart).toISOString();
  const current = new Date(Date.now()).toISOString();
  const end = new Date(props.TaskEnd).toISOString();
  const taskStatus = props.Status;
  console.log(taskStatus);
  if (start > current && taskStatus !== "Done") {
    return (
      <div className="flex flex-row justify-start items-center bg-orange-400 p-2 rounded-lg text-white font-light">
        <AiFillClockCircle className="mr-3" />
        <span>Pending</span>
      </div>
    );
  } else if (start < current && current < end && taskStatus !== "Done") {
    return (
      <div className="flex flex-row justify-start items-center bg-yellow-400  p-2 rounded-lg text-white font-light">
        <AiOutlineLoading className="mr-3" />
        <span>InProgress</span>
      </div>
    );
  } else if (start < current && current > end && taskStatus !== "Done") {
    return (
      <div className="flex flex-row justify-start items-center bg-red-600 p-2 rounded-lg text-white font-light">
        <AiFillExclamationCircle className="mr-3" />
        <span>Delayed</span>
      </div>
    );
  } else if (taskStatus === "Done") {
    return (
      <div className="flex flex-row justify-start items-center bg-green-700 p-2 rounded-lg text-white font-light">
        <AiFillCheckCircle className="mr-3" />
        <span>Done</span>
      </div>
    );
  }
};

export const KanbanGrid = [
  {
    headerText: "Eng Image",
    template: gridEngineerImg,
    field: "ResponsibleEngineerImg",
    width: "70",
    textAlign: "Center",
  },
  {
    field: "ResponsibleEnginnername",
    headerText: "Eng",
    width: "100",
    textAlign: "Center",
  },
  {
    headerText: "Tech Image",
    template: gridTechImg,
    field: "ResponsibleTechImg",
    width: "70",
    textAlign: "Center",
  },
  {
    field: "ResponsibleTechName",
    headerText: "Tech",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "Title",
    headerText: "Title",
    width: "100",
    textAlign: "Center",
  },
  {
    headerText: "Status",
    template: gridStatus,
    field: "Status",
    width: "150",
    textAlign: "Center",
  },
  {
    field: "Summary",
    headerText: "Summary",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "TaskStart",
    headerText: "TaskStart",
    width: "170",
    textAlign: "Center",
  },
  {
    field: "Duration",
    headerText: "Duration",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "TaskEnd",
    headerText: "TaskEnd",
    width: "170",
    textAlign: "Center",
  },
];
