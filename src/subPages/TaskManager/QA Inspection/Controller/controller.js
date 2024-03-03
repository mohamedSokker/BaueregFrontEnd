import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useNavContext } from "../../../../contexts/NavContext";

const useHandleData = () => {
  const axiosPrivate = useAxiosPrivate();
  const { usersData } = useNavContext();

  const [data, setData] = useState(null);
  const [eqsData, setEqsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedData, setSelectedData] = useState({});
  const [eqType, setEqType] = useState("");
  const [eqTypeArray, setEqTypeArray] = useState([]);
  const [eqTypeLoading, setEqTypeLoading] = useState(false);
  const [eqModel, setEqModel] = useState("");
  const [eqModelArray, setEqModelArray] = useState([]);
  const [eqModelLoading, setEqModelLoading] = useState(false);
  const [eqArray, setEqArray] = useState([]);
  const [eq, setEq] = useState("");
  const [eqLoading, setEqLoading] = useState(false);

  const createUniqueArray = (data) => {
    let type = [];
    let model = [];
    let eqs = [];
    data.map((d) => {
      type.push(d.Equipment_Type);
      model.push(d.Equipment_Model);
      eqs.push(d.Equipment);
    });
    type = Array.from(new Set(type));
    model = Array.from(new Set(model));
    eqs = Array.from(new Set(eqs));
    return { type, model, eqs };
  };

  const getEqsData = async () => {
    try {
      const url = `/api/v1/taskManagerGetEquipments`;
      const data = await axiosPrivate(url, { method: "GET" });
      setEqsData(data?.data);
      return createUniqueArray(data?.data);
    } catch (err) {
      throw new Error(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
    }
  };

  const getEqType = async () => {
    try {
      if (eqTypeArray.length > 0) return;
      setEqTypeLoading(true);
      const data = await getEqsData();
      setEqTypeArray(data.type);
      setEqModelArray(data.model);
      setEqArray(data.eqs);
      setEqTypeLoading(false);
    } catch (err) {
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
      setEqTypeLoading(false);
    }
  };

  const getEqModel = async () => {
    try {
      setEqModelLoading(true);
      if (eqModelArray.length > 0 && eqType !== "") {
        const filtered = eqsData.filter((d) => d.Equipment_Type === eqType);
        const data = createUniqueArray(filtered);
        setEqModelArray(data.model);
        setEqArray(data.eqs);
      } else {
        const data = await getEqsData();
        setEqModelArray(data.model);
        setEqArray(data.eqs);
      }
      setEqModelLoading(false);
    } catch (err) {
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
      setEqModelLoading(false);
    }
  };

  const getEq = async () => {
    try {
      setEqLoading(true);
      if (eqArray.length > 0 && eqType !== "" && eqModel !== "") {
        const filtered = eqsData.filter(
          (d) => d.Equipment_Type === eqType && d.Equipment_Model === eqModel
        );
        const data = createUniqueArray(filtered);
        setEqArray(data.eqs);
      } else {
        const data = await getEqsData();
        setEqArray(data.eqs);
      }
      setEqLoading(false);
    } catch (err) {
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
      setEqLoading(false);
    }
  };

  const getData = async (eq) => {
    try {
      setMessage(
        `Loading ${
          eq && eq.startsWith("MC")
            ? "MC Check List"
            : eq && eq.startsWith("BC")
            ? "BC Check List"
            : eq && "BG Check List"
        }`
      );
      setLoading(true);
      const url = `/api/v1/taskManagerReadExcel`;
      const data = await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({
          type: eq.startsWith("MC") ? "MC" : eq.startsWith("BC") ? "BC" : "BG",
          sheet: eq.startsWith("MC")
            ? "MC"
            : eq.startsWith("BC")
            ? "BC"
            : "BauerBG",
        }),
      });
      setData(data?.data);
      let result = {};
      Object.keys(data?.data).map((d) => {
        data?.data[d].map((cat) => {
          result[d]
            ? (result = {
                ...result,
                [d]: cat.Detail
                  ? {
                      ...result[d],
                      [`${cat.Description} (${cat.Detail})`]:
                        cat.Check === "Yes"
                          ? {
                              checked: false,
                              Remarks: "",
                            }
                          : { value: "", Remarks: "" },
                    }
                  : {
                      ...result[d],
                      [`${cat.Description}`]:
                        cat.Check === "Yes"
                          ? { checked: false, Remarks: "" }
                          : { value: "", Remarks: "" },
                    },
              })
            : (result = {
                ...result,
                [d]: cat.Detail
                  ? {
                      [`${cat.Description} (${cat.Detail})`]:
                        cat.Check === "Yes"
                          ? {
                              checked: false,
                              Remarks: "",
                            }
                          : { value: "", Remarks: "" },
                    }
                  : {
                      [`${cat.Description}`]:
                        cat.Check === "Yes"
                          ? { checked: false, Remarks: "" }
                          : { value: "", Remarks: "" },
                    },
              });
        });
        // console.log(result);
      });
      setSelectedData(result);
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

  const handleEqTypeChange = async (e) => {
    const eqType = e.target.value;
    setEqType(eqType);
    setEqModel("");
    setEq("");
    setData(null);
  };

  const handleEqModelChange = async (e) => {
    const eqModel = e.target.value;
    setEqModel(eqModel);
    setEq("");
    setData(null);
  };

  const handleEqChange = async (e) => {
    const eq = e.target.value;
    setEq(eq);
    await getData(eq);
  };

  const handleCheck = (cat, d, e) => {
    setSelectedData((prev) => ({
      ...prev,
      [d]: cat.Detail
        ? {
            ...prev[d],
            [`${cat.Description} (${cat.Detail})`]:
              cat.Check === "Yes"
                ? {
                    checked:
                      !prev[d][`${cat.Description} (${cat.Detail})`].checked,
                    Remarks:
                      prev[d][`${cat.Description} (${cat.Detail})`].Remarks,
                  }
                : {
                    value: e?.target?.value,
                    Remarks:
                      prev[d][`${cat.Description} (${cat.Detail})`].Remarks,
                  },
          }
        : {
            ...prev[d],
            [`${cat.Description}`]:
              cat.Check === "Yes"
                ? {
                    checked: !prev[d][`${cat.Description}`].checked,
                    Remarks: prev[d][`${cat.Description}`].Remarks,
                  }
                : {
                    value: e?.target?.value,
                    Remarks: prev[d][`${cat.Description}`].Remarks,
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
            [`${cat.Description} (${cat.Detail})`]:
              cat.Check === "Yes"
                ? {
                    checked:
                      prev[d][`${cat.Description} (${cat.Detail})`].checked,
                    Remarks: e?.target?.value,
                  }
                : {
                    value: prev[d][`${cat.Description} (${cat.Detail})`].value,
                    Remarks: e?.target?.value,
                  },
          }
        : {
            ...prev[d],
            [`${cat.Description}`]:
              cat.Check === "Yes"
                ? {
                    checked: prev[d][`${cat.Description}`].checked,
                    Remarks: e?.target?.value,
                  }
                : {
                    value: prev[d][`${cat.Description}`].value,
                    Remarks: e?.target?.value,
                  },
          },
    }));
  };

  const getItemsOfSelectedData = (data) => {
    const result = [];
    Object.keys(data).map((selData) => {
      Object.keys(data[selData]).map((cat) => {
        result.push({
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

  const handleSave = async () => {
    try {
      setMessage(`Creating Report ...`);
      setLoading(true);
      const url = `/api/v1/taskManagerHandleReports`;
      await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({
          eqType: eqType,
          eqModel: eqModel,
          eq: eq,
          selectedData: selectedData,
          userName: usersData[0].username,
          userImage: usersData[0].img,
        }),
      });
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

  return {
    getEqType,
    getEqModel,
    getEq,
    getData,
    handleEqTypeChange,
    handleEqModelChange,
    handleEqChange,
    handleCheck,
    handleRemarks,
    handleSave,
    getItemsOfSelectedData,
    loading,
    setLoading,
    message,
    setMessage,
    data,
    setData,
    selectedData,
    setSelectedData,
    eq,
    setEq,
    eqType,
    setEqType,
    eqTypeArray,
    setEqTypeArray,
    eqTypeLoading,
    setEqTypeLoading,
    eqModel,
    setEqModel,
    eqModelArray,
    setEqModelArray,
    eqModelLoading,
    setEqModelLoading,
    eqArray,
    setEqArray,
    eqLoading,
    setEqLoading,
  };
};

export default useHandleData;
