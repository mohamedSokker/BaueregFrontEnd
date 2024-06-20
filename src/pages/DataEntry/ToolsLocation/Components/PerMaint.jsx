import React, { useEffect, useState } from "react";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import PageLoading from "../../../../components/PageLoading";

const path = import.meta.env.VITE_PERMAINT_ABS_PATH;

const PerMaint = ({
  setPerMaintData,
  perLoading,
  setPerLoading,
  setSaved,
  style,
  Type,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [datas, setDatas] = useState([]);
  const [dataTitles, setDataTitles] = useState([]);
  const [selectedData, setSelectedData] = useState({});

  console.log(selectedData);

  useEffect(() => {
    const getData = async () => {
      try {
        setPerMaintData({});
        const url = `/readExcel?path=${path}/PeriodicMaint.xlsx&sheet=${Type}`;
        const excelData = await axiosPrivate(url, { method: "GET" });
        setDatas(excelData?.data);
        setDataTitles(Object.keys(excelData?.data));
        Object.keys(excelData?.data).map((title) => {
          setSelectedData((prev) => ({
            ...prev,
            [title]: { Task: [] },
          }));
        });
        setPerLoading(false);
      } catch (err) {
        console.log(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : err?.message
        );
        setPerLoading(false);
      }
    };
    getData();
  }, []);

  // useEffect(() => {
  //   setPerMaintData((prev) => ({ ...prev, MC2000: selectedData }));
  // }, [selectedData]);

  const handleOilTypeChange = (e) => {
    let title = e.target.dataset.title;
    setSelectedData((prev) => ({
      ...prev,
      [title]: { ...prev[title], OilType: e.target.value },
    }));
  };

  const handleCheckbox = (e) => {
    let title = e.target.dataset.title;
    if (e.target.checked) {
      setSelectedData((prev) => ({
        ...prev,
        [title]: {
          ...prev[title],
          Task: [...prev[title][`Task`], e.target.value],
        },
      }));
    } else {
      let newData = { ...selectedData };
      newData = newData[title][`Task`].filter(
        (data) => data !== e.target.value
      );
      setSelectedData((prev) => ({
        ...prev,
        [title]: { Task: newData, OilType: selectedData[title][`OilType`] },
      }));
    }
  };

  const handleSave = () => {
    let newData = {};
    dataTitles.map((title) => {
      if (selectedData[title][`Task`].length !== 0) {
        newData = { ...newData, [title]: selectedData[title] };
      }
    });
    if (Object.keys(newData).length > 0) {
      setPerMaintData((prev) => ({ ...prev, [Type]: newData }));
    }

    setSaved((prev) => ({ ...prev, [Type]: false }));
  };
  return (
    <>
      {!perLoading && (
        <div
          className="p-4 flex flex-nowrap whitespace-nowrap text-white flex-col bg-logoColor rounded-md gap-4 border-1 border-white w-[60%] max-h-[80%] overflow-y-auto"
          style={style}
        >
          <div className="flex justify-center items-center w-full text-orange-500 font-extrabold text-[20px] mt-auto">
            <p>{Type} Periodic Maintenance Interval</p>
          </div>
          {dataTitles?.map((d, i) => (
            <div
              className="flex justify-center items-start flex-col text-white w-full gap-2"
              key={i}
            >
              <div className="text-orange-500 font-bold text-[16px]">{d}</div>
              {datas[d].map((d1, i1) => (
                <div
                  key={i1}
                  className=" px-6 flex flex-row justify-between items-center w-full gap-6"
                >
                  <p className="text-[16px]">{`${i1 + 1} - ${" "} ${
                    d1.Task
                  }`}</p>
                  {d1?.OilType && d1?.OilType?.split(",")?.length > 0 && (
                    <select
                      className="px-8 bg-white border-1 border-orange-500 rounded-md "
                      style={{
                        color: "black",
                      }}
                      data-title={d}
                      onChange={handleOilTypeChange}
                    >
                      {d1?.OilType?.split(",").map((type, i) => (
                        <React.Fragment key={i}>
                          <option hidden disabled selected value>
                            {""}
                          </option>
                          <option>{type}</option>
                        </React.Fragment>
                      ))}
                    </select>
                  )}
                  <input
                    type="checkbox"
                    value={d1.Task}
                    data-title={d}
                    checked={
                      selectedData[d]?.Task?.includes(d1.Task) ? true : false
                    }
                    onChange={handleCheckbox}
                  />
                </div>
              ))}
            </div>
          ))}
          <div className="w-full flex justify-center items-center mb-auto">
            <button
              type="button"
              className="py-1 text-logoColor bg-white rounded-lg w-full font-bold text-[18px]"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PerMaint;
