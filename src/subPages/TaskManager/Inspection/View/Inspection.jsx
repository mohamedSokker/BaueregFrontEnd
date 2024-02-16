import React, { useEffect, useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import PageLoading from "../../../../components/PageLoading";

const Inspection = () => {
  const [data, setData] = useState(null);
  const [eq, setEq] = useState("MC");
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  console.log(data);

  const getData = async (eq) => {
    try {
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

  useEffect(() => {
    getData(eq);
  }, []);

  const handleEqChange = async (e) => {
    const eq = e.target.value;
    setEq(eq);
    await getData(eq);
  };
  return (
    <>
      {loading && <PageLoading />}
      <div className="w-full h-[6vh] p-2 flex items-center">
        <div className="flex flex-row justify-start gap-2 text-gray-400 text-[12px] items-center py-1 px-3 w-full rounded-[8px] border-1 border-gray-300">
          <p>Equipment</p>
          <select onChange={handleEqChange} className="p-[1px] py-[2px]">
            <option>MC 128# 169</option>
            <option>BC 881# 11824</option>
            <option>BG 28# 1577</option>
          </select>
        </div>
      </div>
      <div
        className="w-full h-[68vh] flex flex-row justify-center items-start gap-2 px-2"
        style={{ backdropFilter: "blur(2px)", opacity: 0.8 }}
        id="cont"
      >
        <div
          className="w-[98%] h-[95%] flex flex-col justify-start items-start p-2 gap-2 overflow-y-scroll"
          style={{ boxShadow: "0 12px 16px rgba(0, 0, 0, 0.7)" }}
        >
          <div className="w-full text-[16px] font-[600] flex flex-row justify-between items-center">
            <div>
              {eq && eq.startsWith("MC")
                ? "MC Check List"
                : eq && eq.startsWith("BC")
                ? "BC Check List"
                : eq && "BG Check List"}
            </div>
          </div>
          {data &&
            Object.keys(data)?.map((d, i) => (
              <>
                <div
                  className="w-full text-[14px] text-logoColor font-[500] flex flex-row justify-between items-center px-1"
                  key={i}
                >
                  <div>{d}</div>
                </div>
                {data[d]?.map((cat) => (
                  <div className="w-full flex flex-col gap-2">
                    <div className="w-full text-[12px] font-[400] flex flex-row justify-between items-center px-3">
                      <div className="flex flex-row gap-2">
                        <span>{cat?.Description}</span>
                        {cat?.Detail && <span>{`(${cat?.Detail})`}</span>}
                      </div>
                      {cat?.Check === "Yes" ? (
                        <div>
                          <input type="checkbox" className="px-2 p-1" />
                        </div>
                      ) : (
                        <div>
                          <input
                            type="text"
                            placeholder="Value"
                            className="border-b-1 border-gray-400 px-2 p-1 focus:border-red-400 outline-none"
                          />
                        </div>
                      )}
                    </div>
                    <div className="w-full text-[12px] font-[400] p-2">
                      <textarea
                        className="w-full border-b-1 border-gray-400  px-2 p-1 focus:border-red-400 outline-none"
                        placeholder="Remarks"
                      />
                    </div>
                    <div className="w-full h-0 border-b-1 border-gray-400"></div>
                  </div>
                ))}
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default Inspection;
