import React, { useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { ColorRing } from "react-loader-spinner";

const Properties = ({ data, setData, selectedItem, tablesData }) => {
  const [isOpenPanel, setIsOpenPanel] = useState(true);

  const handleClick = () => {
    setIsOpenPanel((prev) => !prev);
    // const result = [];
    // const scale = isOpenPanel
    //   ? (parseInt(data.containerStyles.width) + 170) /
    //     parseInt(data.containerStyles.width)
    //   : (parseInt(data.containerStyles.width) - 170) /
    //     parseInt(data.containerStyles.width);
    // data?.el?.map((item) => {
    //   result.push({
    //     ...item,
    //     left: `${Math.round(parseInt(item.left) * scale)}%`,
    //   });
    // });
    // setData((prev) => ({
    //   ...prev,
    //   el: result,
    //   containerStyles: { ...prev.containerStyles },
    // }));
  };

  const handleChange = (e, item) => {
    console.log(e.target.value);
    const copiedData = { ...data };
    copiedData.el[selectedItem] = {
      ...copiedData.el[selectedItem],
      [item?.name]: item?.unit
        ? `${e.target.value}${item?.unit}`
        : `${e.target.value}`,
    };
    setData(copiedData);
  };

  // console.log(data?.el?.[selectedItem]?.props);

  return isOpenPanel ? (
    <div
      className="flex w-[200px] h-full flex-col border-l-[1px] overflow-y-scroll bg-gray-300 p-2"
      style={{ transition: "width 0.5s ease-in-out" }}
    >
      <div className="w-full">
        <div className="w-full flex flex-row justify-between p-1">
          <p className="text-[12px] font-[800]">Properties</p>
          <div className="cursor-pointer" onClick={handleClick}>
            <MdKeyboardDoubleArrowDown size={15} />
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-start justify-start p-1 overflow-scroll gap-2">
        {data?.el?.[selectedItem]?.props?.map((item, idx) => (
          <div
            key={idx}
            className="w-full flex flex-col items-start justify-center gap-1"
          >
            <div>
              <p className="text-[10px] font-[800]">{item?.name}</p>
            </div>
            <div className="w-full flex flex-row justify-start items-center gap-2">
              {item?.inputType === "number" && item.name === "count" ? (
                <input
                  className="w-[70%] text-[10px] p-1"
                  type="number"
                  value={parseInt(data?.el?.[selectedItem]?.[item?.name], 10)}
                  onChange={(e) => {
                    const copiedData = { ...data };
                    if (item?.ref) {
                      copiedData.el[selectedItem] = {
                        ...copiedData.el[selectedItem],
                        [item?.name]: item?.unit
                          ? `${e.target.value}${item?.unit}`
                          : `${e.target.value}`,
                        [item?.ref]:
                          data?.el?.[selectedItem]?.[item?.ref]?.length >
                          Number(e.target.value)
                            ? [
                                ...data?.el?.[selectedItem]?.[item?.ref]?.slice(
                                  0,
                                  data?.el?.[selectedItem]?.[item?.ref]
                                    ?.length - 1
                                ),
                              ]
                            : [...data?.el?.[selectedItem]?.[item?.ref], "ID"],
                      };
                    } else {
                      copiedData.el[selectedItem] = {
                        ...copiedData.el[selectedItem],
                        [item?.name]: item?.unit
                          ? `${e.target.value}${item?.unit}`
                          : `${e.target.value}`,
                      };
                    }

                    setData(copiedData);
                    // console.log(copiedData);
                  }}
                />
              ) : (
                item?.inputType === "number" && (
                  <input
                    className="w-[70%] text-[10px] p-1"
                    type="number"
                    value={parseInt(data?.el?.[selectedItem]?.[item?.name], 10)}
                    onChange={(e) => handleChange(e, item)}
                  />
                )
              )}

              {/* {item?.inputType === "text" && (
                <input
                  className="w-[70%] text-[10px] p-1"
                  type="number"
                  value={data?.el?.[selectedItem]?.[item?.name]}
                  onChange={(e) => handleChange(e, item)}
                />
              )} */}

              {item?.inputType === "toggle" && (
                <input
                  className="text-[10px] p-1 flex flex-row justify-start items-center"
                  type="checkbox"
                  checked={data?.el?.[selectedItem]?.[item?.name]}
                  // value={parseInt(data?.el?.[selectedItem]?.[item?.name], 10)}
                  onChange={(e) => {
                    const copiedData = { ...data };
                    copiedData.el[selectedItem] = {
                      ...copiedData.el[selectedItem],
                      [item?.name]: !copiedData.el[selectedItem][item?.name],
                    };
                    setData(copiedData);
                    console.log(copiedData);
                  }}
                />
              )}
              {item?.inputType === "text" && (
                <input
                  className="w-[70%] text-[10px] p-1"
                  type="text"
                  value={data?.el?.[selectedItem]?.[item?.name]}
                  onChange={(e) => handleChange(e, item)}
                />
              )}
              {item?.inputType === "select" && item.dataType === "list" && (
                <select
                  className=" w-[70%] text-[10px] p-1"
                  value={data?.el?.[selectedItem]?.[item?.name]}
                  onChange={(e) => handleChange(e, item)}
                >
                  <option hidden selected disabled>
                    {""}
                  </option>
                  {item?.data?.map((item, idx) => (
                    <option key={idx}>{item}</option>
                  ))}
                </select>
              )}
              {item?.inputType === "select" &&
                item.dataType === "ref" &&
                item.ref === "Tables" && (
                  <select
                    className=" w-[70%] text-[10px] p-1"
                    value={data?.el?.[selectedItem]?.table}
                    onChange={(e) => {
                      console.log(e.target.value);
                      const copiedData = { ...data };
                      copiedData.el[selectedItem] = {
                        ...copiedData.el[selectedItem],
                        table: `${e.target.value}`,
                        name: `${e.target.value}`,
                      };
                      setData(copiedData);
                    }}
                  >
                    <option hidden selected disabled>
                      {""}
                    </option>
                    {Object.keys(tablesData)?.map((item, idx) => (
                      <option key={idx}>{item}</option>
                    ))}
                  </select>
                )}
              {item?.inputType === "select" &&
                item.dataType === "ref" &&
                item.ref === "columns" && (
                  <select
                    className=" w-[70%] text-[10px] p-1"
                    value={data?.el?.[selectedItem]?.[item?.name]}
                    onChange={(e) => handleChange(e, item)}
                  >
                    <option hidden selected disabled>
                      {""}
                    </option>
                    {tablesData?.[data?.el?.[selectedItem]?.table]?.data?.[0] &&
                      Object.keys(
                        tablesData?.[data?.el?.[selectedItem]?.table]?.data?.[0]
                      )?.map((item, idx) => <option key={idx}>{item}</option>)}
                  </select>
                )}
              {item?.inputType === "listtext" && item.name === "Colors" && (
                <div className="w-full flex flex-col items-start justify-center gap-1">
                  {item?.data
                    ?.slice(0, data?.el?.[selectedItem]?.count)
                    ?.map((el, idx) => (
                      <input
                        key={idx}
                        className="w-[70%] text-[10px] p-1"
                        type="color"
                        value={el}
                        onChange={(e) => {
                          const copiedData = { ...data };
                          copiedData.el[selectedItem].Colors[idx] =
                            e.target.value;
                          setData(copiedData);
                          // console.log(copiedData);
                        }}
                      />
                    ))}
                </div>
              )}

              {item?.inputType === "listDropsRefColumns" && (
                <div className="w-full flex flex-col items-start justify-center gap-1">
                  {data?.el?.[selectedItem]?.[item.name]
                    ?.slice(0, data?.el?.[selectedItem]?.count)
                    ?.map((el, idx) => (
                      <select
                        key={idx}
                        className=" w-[70%] text-[10px] p-1"
                        value={
                          data?.el?.[selectedItem]?.[item?.name][idx]
                            ? data?.el?.[selectedItem]?.[item?.name][idx]
                            : ""
                        }
                        onChange={(e) => {
                          const copiedData = { ...data };
                          copiedData.el[selectedItem][item.name][idx] =
                            e.target.value;
                          setData(copiedData);
                          // console.log(copiedData);
                        }}
                      >
                        <option hidden selected disabled>
                          {""}
                        </option>
                        {tablesData?.[data?.el?.[selectedItem]?.table]
                          ?.data?.[0] &&
                          Object.keys(
                            tablesData?.[data?.el?.[selectedItem]?.table]
                              ?.data?.[0]
                          )?.map((item, idx) => (
                            <option key={idx}>{item}</option>
                          ))}
                      </select>
                    ))}
                </div>
              )}

              {item?.inputType === "listDropsRefTables" && tablesData && (
                <div className="w-full flex flex-col items-start justify-center gap-1">
                  {tablesData &&
                    Object.keys(tablesData)?.map((el, idx) => (
                      <div key={idx} className="w-full flex flex-row gap-2">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            const copiedData = { ...data };
                            if (e.target.checked === true) {
                              const result = [
                                ...data?.el?.[selectedItem]?.[item?.name],
                              ];
                              result.push(el);
                              copiedData.el[selectedItem] = {
                                ...copiedData.el[selectedItem],
                                [item?.name]: [...result],
                              };
                            } else if (e.target.checked === false) {
                              const array = [
                                ...data?.el?.[selectedItem]?.[item?.name],
                              ];
                              const result = array.filter((elt) => elt !== el);
                              copiedData.el[selectedItem] = {
                                ...copiedData.el[selectedItem],
                                [item?.name]: [...result],
                              };
                            }

                            setData(copiedData);
                            // console.log(copiedData);
                          }}
                          checked={
                            data?.el?.[selectedItem]?.[item?.name]?.includes(el)
                              ? true
                              : false
                          }
                        />
                        <p className="text-[10px]">{el}</p>
                      </div>
                    ))}
                </div>
              )}
              <p className="text-[10px]">{item?.unit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div
      className="flex flex-col h-full justify-start items-center gap-8 bg-gray-300 p-2 w-[30px]"
      style={{ transition: "width 0.5s ease-in-out" }}
    >
      <div className="hover:cursor-pointer" onClick={handleClick}>
        <MdKeyboardDoubleArrowRight size={15} />
      </div>
      <div
        className="text-black font-[800] text-[12px]"
        style={{ writingMode: "vertical-lr" }}
      >
        {`Properties`}
      </div>
    </div>
  );
};

export default Properties;
