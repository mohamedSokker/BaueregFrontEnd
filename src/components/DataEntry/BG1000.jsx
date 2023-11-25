import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PageLoading from "../PageLoading";

const path = process.env.REACT_APP_PERMAINT_ABS_PATH;

const BG1000 = ({ setPerMaintData, setSaved }) => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataTitles, setDataTitles] = useState([]);
  const [selectedData, setSelectedData] = useState({});

  //   console.log(selectedData);

  useEffect(() => {
    const getData = async () => {
      try {
        setPerMaintData({});
        const url = `/readExcel?path=${path}/PeriodicMaint.xlsx&sheet=BG1000`;
        const excelData = await axiosPrivate(url, { method: "GET" });
        setData(excelData?.data);
        setDataTitles(Object.keys(excelData?.data));
        Object.keys(excelData?.data).map((title) => {
          setSelectedData((prev) => ({ ...prev, [title]: [] }));
        });
        // console.log(Object.keys(excelData?.data));
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
    getData();
  }, []);

  // useEffect(() => {
  //   setPerMaintData((prev) => ({ ...prev, BG1000: selectedData }));
  // }, [selectedData]);

  const handleCheckbox = (e) => {
    let title = e.target.dataset.title;
    if (e.target.checked) {
      setSelectedData((prev) => ({
        ...prev,
        [title]: [...prev[title], e.target.value],
      }));
    } else {
      let newData = { ...selectedData };
      newData = newData[title].filter((data) => data !== e.target.value);
      setSelectedData((prev) => ({ ...prev, [title]: newData }));
    }
  };

  const handleSave = () => {
    let newData = {};
    dataTitles.map((title) => {
      if (selectedData[title].length !== 0) {
        newData = { ...newData, [title]: selectedData[title] };
      }
    });
    setPerMaintData((prev) => ({ ...prev, BG1000: newData }));
    setSaved((prev) => ({ ...prev, BG1000: true }));
  };
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-8">
      {loading ? (
        <div className="p-4 mt-10">
          <PageLoading message={`Loading View`} />
        </div>
      ) : (
        <div className="p-4 mt-10 flex flex-nowrap whitespace-nowrap text-white flex-col bg-logoColor rounded-md gap-4 border-1 border-white w-[60%] max-h-[60%] overflow-y-auto">
          <div className="flex justify-center items-center w-full text-orange-500 font-extrabold text-[20px] mt-auto">
            <p>BG1000 Periodic Maintenance Interval</p>
          </div>
          {dataTitles?.map((d, i) => (
            <div
              className="flex justify-center items-start flex-col text-white w-full gap-2"
              key={i}
            >
              <div className="text-orange-500 font-bold text-[16px]">{d}</div>
              {data[d].map((d1, i1) => (
                <div
                  key={i1}
                  className=" px-6 flex flex-row justify-between items-center w-full gap-6"
                >
                  <p className="text-[16px]">{`${i1 + 1} - ${" "} ${d1}`}</p>
                  <input
                    type="checkbox"
                    value={d1}
                    data-title={d}
                    checked={selectedData[d].includes(d1) ? true : false}
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
    </div>
  );
};

export default BG1000;
