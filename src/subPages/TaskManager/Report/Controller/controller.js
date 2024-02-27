import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const getItemsOfSelectedData = (data, reportData) => {
  const result = [];
  Object.keys(data).map((selData) => {
    Object.keys(data[selData]).map((cat) => {
      result.push({
        eqType: reportData.eqType,
        eqModel: reportData.eqModel,
        eq: reportData.eq,
        reportID: reportData.reportID,
        title: selData,
        desc: cat,
        remarks: data[selData][cat]?.Remarks,
        checked: data[selData][cat]?.checked,
        value: data[selData][cat]?.value,
      });
    });
  });
  return result;
};

const useReports = () => {
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [reportData, setReportData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [selectedReport, setSelectedReport] = useState({});

  const handleReportData = (data, allData) => {
    setSelectedReport({
      reportID: allData?.ID,
      eqType: allData.Equipment_Type,
      eqModel: allData.Equipment_Model,
      eq: allData.Equipment,
    });
    setSelectedData(data);
    let result = {};
    Object.keys(data).map((d) => {
      Object.keys(data[d]).map((r) => {
        result = result[d]
          ? {
              ...result,
              [d]: [
                ...result[d],
                {
                  Description: r.split("(")[0].trim(),
                  Detail:
                    r.split("(").length >= 2
                      ? r.split("(")[1].split(")")[0]
                      : "",
                  Check: data[d][r]?.checked !== undefined ? "Yes" : undefined,
                },
              ],
            }
          : {
              ...result,
              [d]: [
                {
                  Description: r.split("(")[0],
                  Detail:
                    r.split("(").length >= 2
                      ? r.split("(")[1].split(")")[0]
                      : "",
                  Check: data[d][r]?.checked !== undefined ? "Yes" : undefined,
                },
              ],
            };
      });
    });
    console.log(result);
    setReportData(result);
  };

  const handleSend = async () => {
    try {
      setMessage(`Sending Reports...`);
      setLoading(true);
      const data = getItemsOfSelectedData(selectedData, selectedReport);
      const url = `/api/v1/taskManagerHandleTasks`;
      await axiosPrivate(url, { method: "POST", data: JSON.stringify(data) });
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

  const handleSave = async (d) => {
    try {
      setMessage(`Updating Report ...`);
      setLoading(true);
      const url = `/api/v1/taskManagerUpdateReports`;
      await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({
          ID: d?.id,
          ReportData: JSON.stringify(d?.reportData),
        }),
      });
      let newData = [...data];
      data.map((item, index) => {
        if (item.ID === d.id) {
          newData[index].ReportData = JSON.stringify(selectedData);
        }
      });
      setData(newData);
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

  const handleDelete = async (d) => {
    try {
      setMessage(`Deleting Report ...`);
      setLoading(true);
      const url = `/api/v1/taskManagerDeleteReport`;
      await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({
          ID: d?.id,
        }),
      });
      let newData = [...data];
      data.map((item, index) => {
        if (item.ID === d.id) {
          newData.splice(index, 1);
        }
      });
      setData(newData);
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

  const getData = async () => {
    try {
      setMessage(`Loading Reports...`);
      setLoading(true);
      const url = `/api/v1/taskManagerGetReports`;
      const data = await axiosPrivate(url, {
        method: "GET",
      });
      setData(data?.data);
      //   setSelectedData(JSON.parse(data?.data?.ReportData));
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

  const handleCheck = (cat, d, e) => {
    console.log(selectedData);
    console.log(cat);
    console.log(d);
    console.log(selectedData[d]);
    setSelectedData((prev) => ({
      ...prev,
      [d]: cat.Detail
        ? {
            ...prev[d],
            [`${cat.Description.trim()} (${cat.Detail.trim()})`]:
              cat.Check === "Yes"
                ? {
                    checked:
                      !prev[d][
                        `${cat.Description.trim()} (${cat.Detail.trim()})`
                      ]?.checked,
                    Remarks:
                      prev[d][
                        `${cat.Description.trim()} (${cat.Detail.trim()})`
                      ]?.Remarks,
                  }
                : {
                    value: e?.target?.value,
                    Remarks:
                      prev[d][
                        `${cat.Description.trim()} (${cat.Detail.trim()})`
                      ]?.Remarks,
                  },
          }
        : {
            ...prev[d],
            [`${cat.Description.trim()}`]:
              cat.Check === "Yes"
                ? {
                    checked: !prev[d][`${cat.Description.trim()}`]?.checked,
                    Remarks: prev[d][`${cat.Description.trim()}`]?.Remarks,
                  }
                : {
                    value: e?.target?.value,
                    Remarks: prev[d][`${cat.Description.trim()}`]?.Remarks,
                  },
          },
    }));
  };

  const handleRemarks = (cat, d, e) => {
    setSelectedData((prev) => ({
      ...prev,
      [d]: cat.Detail
        ? {
            ...prev[d],
            [`${cat.Description.trim()} (${cat.Detail.trim()})`]:
              cat.Check === "Yes"
                ? {
                    checked:
                      prev[d][
                        `${cat.Description.trim()} (${cat.Detail.trim()})`
                      ]?.checked,
                    Remarks: e?.target?.value,
                  }
                : {
                    value:
                      prev[d][
                        `${cat.Description.trim()} (${cat.Detail.trim()})`
                      ]?.value,
                    Remarks: e?.target?.value,
                  },
          }
        : {
            ...prev[d],
            [`${cat.Description.trim()}`]:
              cat.Check === "Yes"
                ? {
                    checked: prev[d][`${cat.Description.trim()}`]?.checked,
                    Remarks: e?.target?.value,
                  }
                : {
                    value: prev[d][`${cat.Description.trim()}`]?.value,
                    Remarks: e?.target?.value,
                  },
          },
    }));
  };

  return {
    getData,
    handleCheck,
    handleRemarks,
    handleReportData,
    handleSend,
    handleSave,
    handleDelete,
    data,
    setData,
    reportData,
    setReportData,
    selectedReport,
    setSelectedReport,
    message,
    setMessage,
    loading,
    setLoading,
    selectedData,
    setSelectedData,
  };
};

export default useReports;
