import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { AiOutlineCaretDown } from "react-icons/ai";

const Dropdown = ({
  label,
  URL,
  column,
  local,
  localData,
  getChildData,
  condition,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [datas, setDatas] = useState([]);
  const [data, setData] = useState("");
  const [datasLoading, setDatasLoading] = useState(false);

  useEffect(() => {
    setDatas([]);
  }, [localData]);

  // console.log(label);
  // console.log(datas);
  // console.log(localData);
  // console.log(condition);

  const handledatasClick = async () => {
    try {
      if (!condition) throw new Error(`Can't choose this right away`);
      if (local) {
        setDatasLoading(true);
        setDatas(localData);
        setDatasLoading(false);
      } else if (datas.length === 0) {
        setDatasLoading(true);
        const url = URL;
        const result = await axiosPrivate(url, {
          //   signal: controller.signal,
          method: "GET",
        });
        setDatas(result?.data);
      }
    } catch (err) {
      alert(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
    } finally {
      setDatasLoading(false);
    }
  };

  const handledatasChange = (e) => {
    setData(e.target.value);
    getChildData(label, e.target.value);
  };

  return (
    <div className="p-2 flex flex-row justify-start items-center">
      <div className={`flex flex-row gap-2 items-center relative`}>
        {/* <p style={{ width: "40%" }}>{label}</p> */}
        <select
          className="p-2 w-[30vw] bg-white border-1 border-logoColor rounded-md appearance-none"
          style={{ color: datas.length === 0 ? "rgb(156 163 175)" : "black" }}
          onClick={handledatasClick}
          onChange={handledatasChange}
          value={datas.length === 0 ? `Select ${label}` : data}
        >
          {datas.length === 0 ? (
            <option>{`Select ${label}`}</option>
          ) : (
            <>
              <option hidden selected>
                {""}
              </option>
              {datas?.map((site, i) => (
                <option key={i} value={site[column]}>
                  {site[column]}
                </option>
              ))}
            </>
          )}
        </select>
        {datasLoading ? (
          <div className="absolute right-2">
            <ColorRing
              type="ColorRing"
              colors={[
                "rgb(156 163 175)",
                "rgb(156 163 175)",
                "rgb(156 163 175)",
                "rgb(156 163 175)",
                "rgb(156 163 175)",
              ]}
              height={20}
              width={20}
            />
          </div>
        ) : (
          <AiOutlineCaretDown className="absolute right-2" />
        )}
      </div>
    </div>
  );
};

export default Dropdown;
