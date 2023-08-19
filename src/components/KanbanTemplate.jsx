import React, { useEffect } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { extend } from "@syncfusion/ej2-base";
import { TextBox } from "@syncfusion/ej2-react-inputs";

const KanbanTemplate = (
  props
  //   {
  //   ID,
  //   ResponsibleEnginnername,
  //   ResponsibleTechName,
  //   Site,
  //   Title,
  //   Status,
  //   Summary,
  //   TaskStart,
  //   Duration,
  //   TaskFor,
  // }
) => {
  const [state, setState] = React.useState(extend({}, {}, props, true));
  function onChange(args) {
    let key = args.target.name;
    let value;
    if (key === "TaskStart") {
      value = new Date(args.target.value);
    } else {
      value = args.target.value;
    }
    console.log(key, value);

    setState((prev) => ({ ...prev, [key]: value }));

    // setState({ [key]: value });
  }

  const getDate = (date) => {
    console.log(date);
    const dt = new Date(date);
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
    return dt.toISOString().slice(0, 16);
  };

  let data = state;

  return (
    <div className="">
      <table className="">
        <tbody>
          <tr>
            <td className="e-label">ID</td>
            <td>
              <div className="e-float-input e-control-wrapper">
                <input
                  id="ID"
                  name="ID"
                  type="text"
                  className="e-field"
                  value={data.ID}
                  disabled
                />
              </div>
            </td>
          </tr>
          <tr className="">
            <td className="e-label">Status</td>
            <td className="">
              <DropDownListComponent
                id="Status"
                name="Status"
                dataSource={["Open", "InProgress", "Close"]}
                className="e-field"
                placeholder="Status"
                value={data.Status}
              ></DropDownListComponent>
            </td>
          </tr>
          <tr>
            <td className="e-label">Summary</td>
            <td>
              <div className="e-float-input e-control-wrapper">
                <textarea
                  id="summaryField"
                  name="Summary"
                  className="e-field"
                  value={data.Summary}
                  // onChange={(e) => (Summary = e.target.value)}
                  onChange={onChange.bind(this)}
                >
                  {/* {Summary} */}
                </textarea>
              </div>
            </td>
          </tr>
          <tr>
            <td className="e-label">ResponsibleEnginner</td>
            <td>
              <div className="e-float-input e-control-wrapper">
                <input
                  id="ResponsibleEnginnername"
                  name="ResponsibleEnginnername"
                  type="text"
                  className="e-field"
                  // onChange={(e) => (ResponsibleEnginnername = e.target.value)}
                  value={data.ResponsibleEnginnername}
                  onChange={onChange.bind(this)}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td className="e-label">ResponsibleTech</td>
            <td>
              <div className="e-float-input e-control-wrapper">
                <input
                  id="ResponsibleTechName"
                  name="ResponsibleTechName"
                  type="text"
                  className="e-field"
                  // onChange={(e) => (ResponsibleTechName = e.target.value)}
                  value={data.ResponsibleTechName}
                  onChange={onChange.bind(this)}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td className="e-label">Site</td>
            <td>
              <div className="e-float-input e-control-wrapper">
                <input
                  id="Site"
                  name="Site"
                  type="text"
                  className="e-field"
                  // onChange={(e) => (Site = e.target.value)}
                  value={data.Site}
                  onChange={onChange.bind(this)}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td className="e-label">Title</td>
            <td>
              <div className="e-float-input e-control-wrapper">
                <input
                  id="Title"
                  name="Title"
                  type="text"
                  className="e-field"
                  // onChange={(e) => (Title = e.target.value)}
                  value={data.Title}
                  onChange={onChange.bind(this)}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td className="e-label">TaskStart</td>
            <td>
              <div className="e-float-input e-control-wrapper">
                <input
                  id="TaskStart"
                  name="TaskStart"
                  type="datetime-local"
                  className="e-field"
                  // onChange={(e) => (TaskStart = e.target.value)}
                  value={getDate(data.TaskStart)}
                  // value={new Date(data.TaskStart).toISOString().slice(0, 16)}
                  onChange={onChange.bind(this)}
                  // onChange={(e) => {
                  //   e.target.value = TaskStart;
                  // }}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td className="e-label">Duration</td>
            <td>
              <div className="e-float-input e-control-wrapper">
                <input
                  id="Duration"
                  name="Duration"
                  type="text"
                  className="e-field"
                  // onChange={(e) => (Duration = e.target.value)}
                  value={data.Duration}
                  onChange={onChange.bind(this)}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td className="e-label">Workshop</td>
            <td>
              <div className="e-float-input e-control-wrapper">
                <input
                  id="TaskFor"
                  name="TaskFor"
                  type="text"
                  className="e-field"
                  // onChange={(e) => (TaskFor = e.target.value)}
                  value={data.TaskFor}
                  onChange={onChange.bind(this)}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default KanbanTemplate;
