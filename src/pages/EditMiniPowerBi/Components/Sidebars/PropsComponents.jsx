import React, { useState } from "react";

import { useInitContext } from "../../Contexts/InitContext";
import Drop from "../Customs/Drop";
import { useDragContext } from "../Customs/DragContext";
import Toggle1 from "../../../../components/Accessories/Toogle1";

const PropsComponents = ({ cat }) => {
  const { data, setData, selectedItem, tablesData, setIsExpressionCard } =
    useInitContext();
  // const { dragItem, dragSource } = useDragContext();

  const [childItems, setChildItems] = useState([
    { name: "Count" },
    { name: "Sum" },
    { name: "Average" },
    { name: "First" },
    { name: "Last" },
    { name: "Min" },
    { name: "Max" },
  ]);

  const childs = {
    number: [
      { name: "Count" },
      { name: "Sum" },
      { name: "Average" },
      { name: "First" },
      { name: "Last" },
      { name: "Min" },
      { name: "Max" },
    ],
    string: [{ name: "Count" }, { name: "First" }, { name: "Last" }],
    expressions: [
      { name: "Sum" },
      { name: "Multiply" },
      { name: "Difference" },
      { name: "Division" },
    ],
  };

  const expressionsSigns = {
    Multiply: "*",
    Sum: "+",
    Difference: "-",
    Division: "/",
  };

  const handleChange = (e, item) => {
    const copiedData = { ...data };
    copiedData.el[selectedItem] = {
      ...copiedData.el[selectedItem],
      [item?.name]: `${e.target.value}`,
    };
    setData(copiedData);
  };
  return data?.el?.[selectedItem]?.props?.map(
    (item, idx) =>
      item.category === cat && (
        <div
          key={idx}
          className="w-full flex flex-col items-start justify-center gap-1"
        >
          {item.category === cat && (
            <div>
              <p className="text-[10px] font-[800]">{item?.name}</p>
            </div>
          )}
          <div className="w-full flex flex-row justify-start items-center gap-2">
            {item?.inputType === "number" &&
            item.name === "count" &&
            item.category === cat ? (
              <input
                className="w-[70%] text-[10px] p-1"
                type="text"
                value={data?.el?.[selectedItem]?.[item?.name]}
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
                                data?.el?.[selectedItem]?.[item?.ref]?.length -
                                  1
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
                }}
              />
            ) : (
              item?.inputType === "number" &&
              item.category === cat && (
                <input
                  className="w-[70%] text-[10px] p-1"
                  type="text"
                  value={data?.el?.[selectedItem]?.[item?.name]}
                  onChange={(e) => handleChange(e, item)}
                />
              )
            )}

            {item.inputType === "expressionButton" && (
              <button
                className="w-[70%] text-[10px] p-1 bg-[#CB1955] text-white rounded-[4px]"
                onClick={() => setIsExpressionCard(true)}
              >
                Add Expression
              </button>
            )}

            {/* {item?.inputType === "text" && (
                <input
                  className="w-[70%] text-[10px] p-1"
                  type="number"
                  value={data?.el?.[selectedItem]?.[item?.name]}
                  onChange={(e) => handleChange(e, item)}
                />
              )} */}

            {item?.inputType === "toggle" && item.category === cat && (
              <Toggle1
                size={0.6}
                value={data?.el?.[selectedItem]?.[item?.name]}
                onChange={() => {
                  const copiedData = { ...data };
                  copiedData.el[selectedItem] = {
                    ...copiedData.el[selectedItem],
                    [item?.name]: !copiedData.el[selectedItem][item?.name],
                  };
                  setData(copiedData);
                }}
              />
              // <input
              //   className="text-[10px] p-1 flex flex-row justify-start items-center"
              //   type="checkbox"
              //   checked={data?.el?.[selectedItem]?.[item?.name]}
              //   // value={parseInt(data?.el?.[selectedItem]?.[item?.name], 10)}
              //   onChange={(e) => {
              //     const copiedData = { ...data };
              //     copiedData.el[selectedItem] = {
              //       ...copiedData.el[selectedItem],
              //       [item?.name]: !copiedData.el[selectedItem][item?.name],
              //     };
              //     setData(copiedData);
              //   }}
              // />
            )}
            {item?.inputType === "text" && item.category === cat && (
              <input
                className="w-[70%] text-[10px] p-1"
                type="text"
                value={data?.el?.[selectedItem]?.[item?.name]}
                onChange={(e) => handleChange(e, item)}
              />
            )}
            {item?.inputType === "select" &&
              item.dataType === "list" &&
              item.category === cat && (
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
              item.ref === "Tables" &&
              item.category === cat && (
                <select
                  className=" w-[70%] text-[10px] p-1"
                  value={data?.el?.[selectedItem]?.table}
                  onChange={(e) => {
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
              item.ref === "columns" &&
              item.category === cat && (
                <div className="w-full" style={{ scrollbarWidth: "none" }}>
                  <Drop
                    childItems={childItems}
                    category={`Columns`}
                    categoryKey={item.name}
                    item={item}
                    initialItems={
                      data?.el?.[selectedItem]?.[item?.name]
                        ? [data?.el?.[selectedItem]?.[item?.name]]
                        : null
                    }
                    limit={1}
                    isSelect={item?.select}
                    handleChange={(dragSource, position) => {
                      const copiedData = { ...data };
                      copiedData.el[selectedItem] = {
                        ...copiedData.el[selectedItem],
                        table: dragSource?.table,
                        name: dragSource?.table,
                        [item?.name]: item?.unit
                          ? `${dragSource?.name}${item?.unit}`
                          : `${dragSource?.name}`,
                      };
                      setData(copiedData);
                    }}
                    handleChoose={(it, propertyName) => {
                      if (item.name === "tooltips") {
                        const copiedData = { ...data };
                        const result = [];
                        copiedData.el[selectedItem]?.tooltipProps?.map(
                          (prop) => {
                            if (prop?.name === propertyName) {
                              result.push({ ...prop, opType: it });
                            } else {
                              result.push(prop);
                            }
                          }
                        );
                        copiedData.el[selectedItem] = {
                          ...copiedData.el[selectedItem],
                          tooltipProps: result,
                        };
                        console.log(copiedData);
                        setData(copiedData);
                      } else {
                        const copiedData = { ...data };
                        const result = [];
                        copiedData.el[selectedItem]?.[item?.name]?.map(
                          (prop) => {
                            if (prop?.name === propertyName) {
                              result.push({ ...prop, opType: it });
                            } else {
                              result.push(prop);
                            }
                          }
                        );
                        copiedData.el[selectedItem] = {
                          ...copiedData.el[selectedItem],
                          [item?.name]: result,
                        };
                        setData(copiedData);
                      }
                    }}
                    onDelete={() => {
                      const copiedData = { ...data };
                      copiedData.el[selectedItem] = {
                        ...copiedData.el[selectedItem],
                        [item?.name]: null,
                      };
                      setData(copiedData);
                    }}
                    // onDrop={(e) => handleChange(e, item)}
                  />
                </div>
                // <select
                //   className=" w-[70%] text-[10px] p-1"
                //   value={data?.el?.[selectedItem]?.[item?.name]}
                //   onChange={(e) => handleChange(e, item)}
                // >
                //   <option hidden selected disabled>
                //     {""}
                //   </option>
                //   {tablesData?.[data?.el?.[selectedItem]?.table]?.data?.[0] &&
                //     Object.keys(
                //       tablesData?.[data?.el?.[selectedItem]?.table]?.data?.[0]
                //     )?.map((item, idx) => <option key={idx}>{item}</option>)}
                // </select>
              )}
            {item?.inputType === "listtext" &&
              item.name === "Colors" &&
              item.category === cat && (
                <div className="w-full flex flex-col items-start justify-center gap-1">
                  {item?.data
                    ?.slice(0, data?.el?.[selectedItem]?.Y_Axis?.length)
                    ?.map((el, idx) => (
                      <input
                        key={idx}
                        className="w-[70%] text-[10px] p-1"
                        type="color"
                        value={data.el[selectedItem].Colors[idx]}
                        onChange={(e) => {
                          const copiedData = { ...data };
                          copiedData.el[selectedItem].Colors[idx] =
                            e.target.value;
                          setData(copiedData);
                        }}
                      />
                    ))}
                </div>
              )}

            {item?.inputType === "listDropsRefColumns" &&
              item.category === cat && (
                <div className="w-full" style={{ scrollbarWidth: "none" }}>
                  <Drop
                    childItems={childItems}
                    category={`Columns`}
                    categoryKey={item.name}
                    item={item}
                    initialItems={data?.el?.[selectedItem]?.[item?.name]}
                    limit={1}
                    isSelect={item?.select}
                    isSeen={true}
                    onSeenChange={(it) => {
                      const copiedData = { ...data };
                      const result = [];
                      copiedData.el[selectedItem]?.[item?.name]?.map((el) => {
                        if (
                          typeof it === "object"
                            ? el?.name === it?.name
                            : el?.name === it
                        ) {
                          result.push({ ...el, isSeen: !el?.isSeen });
                        } else {
                          result.push(el);
                        }
                      });
                      copiedData.el[selectedItem] = {
                        ...copiedData.el[selectedItem],
                        [item?.name]: result,
                      };
                      setData(copiedData);

                      console.log(copiedData);
                    }}
                    handleChange={(dragSource, position) => {
                      if (item?.name === "tooltips") {
                        const copiedData = { ...data };
                        copiedData.el[selectedItem] = {
                          ...copiedData.el[selectedItem],
                          table: dragSource?.table,
                          name: dragSource?.table,
                        };
                        if (
                          tablesData?.[dragSource?.table]?.dataTypes?.[
                            dragSource?.name
                          ]?.[0] === "number"
                        ) {
                          copiedData.el[selectedItem]?.tooltips?.splice(
                            position,
                            0,
                            {
                              opType: "Sum",
                              isSeen: true,
                              name: `Sum Of ${dragSource?.name}`,
                              col: dragSource?.name,
                              table: dragSource?.table,
                              childItems: childs?.number,
                            }
                          );
                        } else {
                          copiedData.el[selectedItem]?.tooltips?.splice(
                            position,
                            0,
                            {
                              opType: "Count",
                              isSeen: true,
                              name: `Count Of ${dragSource?.name}`,
                              col: dragSource?.name,
                              table: dragSource?.table,
                              childItems: childs?.string,
                            }
                          );
                        }
                        console.log(copiedData);
                        setData(copiedData);
                      } else if (item?.name === "Y_Axis") {
                        const copiedData = { ...data };
                        copiedData.el[selectedItem] = {
                          ...copiedData.el[selectedItem],
                          table: dragSource?.table,
                          name: dragSource?.table,
                        };
                        if (
                          tablesData?.[dragSource?.table]?.dataTypes?.[
                            dragSource?.name
                          ]?.[0] === "number"
                        ) {
                          copiedData.el[selectedItem]?.Y_Axis?.splice(
                            position,
                            0,
                            {
                              opType: "Sum",
                              isSeen: true,
                              name: dragSource?.name,
                              col: dragSource?.name,
                              table: dragSource?.table,
                              childItems: childs?.number,
                            }
                          );
                        } else {
                          copiedData.el[selectedItem]?.Y_Axis?.splice(
                            position,
                            0,
                            {
                              opType: "Count",
                              isSeen: true,
                              name: dragSource?.name,
                              col: dragSource?.name,
                              table: dragSource?.table,
                              childItems: childs?.string,
                            }
                          );
                        }
                        console.log(copiedData);
                        setData(copiedData);
                      } else if (item.name === "columns") {
                        const copiedData = { ...data };
                        copiedData.el[selectedItem] = {
                          ...copiedData.el[selectedItem],
                          table: dragSource?.table,
                          name: dragSource?.table,
                        };
                        if (
                          tablesData?.[dragSource?.table]?.dataTypes?.[
                            dragSource?.name
                          ]?.[0] === "number"
                        ) {
                          copiedData.el[selectedItem]?.columns?.splice(
                            position,
                            0,
                            {
                              name: dragSource?.name,
                              table: dragSource?.table,
                            }
                          );
                        } else {
                          copiedData.el[selectedItem]?.columns?.splice(
                            position,
                            0,
                            {
                              name: dragSource?.name,
                              table: dragSource?.table,
                            }
                          );
                        }
                        console.log(copiedData);
                        setData(copiedData);
                      } else if (item?.name === "expressions") {
                        const copiedData = { ...data };
                        copiedData.el[selectedItem] = {
                          ...copiedData.el[selectedItem],
                          table: dragSource?.table,
                          name: dragSource?.table,
                        };
                        copiedData.el[selectedItem]?.expressions?.splice(
                          position,
                          0,
                          {
                            opType: "Division",
                            isSeen: true,
                            name: `${dragSource?.name} ${expressionsSigns?.Division}`,
                            firstArg: dragSource?.name,
                            secondArg: "",
                            col: dragSource?.name,
                            table: dragSource?.table,
                            childItems: childs?.expressions,
                          }
                        );
                        console.log(copiedData);
                        setData(copiedData);
                      } else {
                        const copiedData = { ...data };
                        copiedData.el[selectedItem] = {
                          ...copiedData.el[selectedItem],
                          table: dragSource?.table,
                          name: dragSource?.table,
                          // [item?.name]: [
                          //   ...copiedData.el[selectedItem][item?.name],
                          //   dragSource?.name,
                          // ],
                        };
                        copiedData.el[selectedItem]?.[[item?.name]]?.splice(
                          position,
                          0,
                          dragSource?.name
                        );
                        console.log(copiedData);
                        setData(copiedData);
                      }
                    }}
                    handleChoose={(it, dragSource, propertyName) => {
                      if (item.name === "tooltips") {
                        const copiedData = { ...data };
                        const result = [];
                        copiedData.el[selectedItem]?.tooltips?.map((prop) => {
                          if (prop?.name === propertyName) {
                            result.push({
                              ...prop,
                              opType: it,
                              name: `${it} Of ${dragSource?.col}`,
                            });
                          } else {
                            result.push(prop);
                          }
                        });
                        copiedData.el[selectedItem] = {
                          ...copiedData.el[selectedItem],
                          tooltipProps: result,
                          tooltips: result,
                        };
                        console.log(copiedData);
                        setData(copiedData);
                      } else if (item.name === "expressions") {
                        const copiedData = { ...data };
                        const result = [];
                        copiedData.el[selectedItem]?.expressions?.map(
                          (prop) => {
                            if (prop?.name === propertyName) {
                              result.push({
                                ...prop,
                                opType: it,
                                name: `${dragSource?.col} ${expressionsSigns[it]} ${prop?.secondArg}`,
                              });
                            } else {
                              result.push(prop);
                            }
                          }
                        );
                        copiedData.el[selectedItem] = {
                          ...copiedData.el[selectedItem],
                          expressions: result,
                        };
                        console.log(copiedData);
                        setData(copiedData);
                      } else {
                        const copiedData = { ...data };
                        const result = [];
                        copiedData.el[selectedItem]?.[item?.name]?.map(
                          (prop) => {
                            if (prop?.name === propertyName) {
                              result.push({ ...prop, opType: it });
                            } else {
                              result.push(prop);
                            }
                          }
                        );
                        copiedData.el[selectedItem] = {
                          ...copiedData.el[selectedItem],
                          [item?.name]: result,
                        };
                        setData(copiedData);
                      }
                    }}
                    onDelete={(it) => {
                      if (item?.name === "tooltips") {
                        const copiedData = { ...data };
                        const result = copiedData.el[selectedItem][
                          item?.name
                        ]?.filter((el) => el?.name !== it);
                        const toolTipsPropsResult = copiedData.el[
                          selectedItem
                        ]?.tooltipProps?.filter((el) => el?.name !== it);
                        copiedData.el[selectedItem] = {
                          ...copiedData.el[selectedItem],
                          [item?.name]: result,
                          tooltipProps: toolTipsPropsResult,
                        };
                        console.log(copiedData);
                        setData(copiedData);
                      } else if (item?.name === "Y_Axis") {
                        const copiedData = { ...data };
                        const result = copiedData.el[selectedItem][
                          item?.name
                        ]?.filter((el) => el !== it);
                        const toolTipsPropsResult = copiedData.el[
                          selectedItem
                        ]?.[item?.name]?.filter((el) => {
                          console.log(el);
                          console.log(it);
                          return typeof it === "object"
                            ? el?.name !== it?.name
                            : el?.name !== it;
                        });
                        copiedData.el[selectedItem] = {
                          ...copiedData.el[selectedItem],
                          [item?.name]: toolTipsPropsResult,
                        };
                        console.log(copiedData);
                        setData(copiedData);
                      } else if (item.name === "columns") {
                        const copiedData = { ...data };
                        const columns = copiedData.el[selectedItem]?.[
                          item?.name
                        ]?.filter((el) => {
                          console.log(el);
                          console.log(it);
                          return typeof it === "object"
                            ? el?.name !== it?.name
                            : el?.name !== it;
                        });
                        copiedData.el[selectedItem] = {
                          ...copiedData.el[selectedItem],
                          [item?.name]: columns,
                        };
                        console.log(copiedData);
                        setData(copiedData);
                      } else if (item.name === "expressions") {
                        const copiedData = { ...data };
                        const result = copiedData.el[selectedItem][
                          item?.name
                        ]?.filter((el) => el?.name !== it);
                        copiedData.el[selectedItem] = {
                          ...copiedData.el[selectedItem],
                          [item?.name]: result,
                        };
                        console.log(copiedData);
                        setData(copiedData);
                      } else {
                        const copiedData = { ...data };
                        console.log(it);
                        const result = copiedData.el[selectedItem][
                          item?.name
                        ]?.filter((el) => el !== it);
                        copiedData.el[selectedItem] = {
                          ...copiedData.el[selectedItem],
                          [item?.name]: result,
                        };
                        console.log(copiedData);
                        setData(copiedData);
                      }
                    }}
                  />
                </div>
                // <div className="w-full flex flex-col items-start justify-center gap-1">
                //   {data?.el?.[selectedItem]?.[item.name]
                //     ?.slice(0, data?.el?.[selectedItem]?.count)
                //     ?.map((el, idx) => (
                //       <select
                //         key={idx}
                //         className=" w-[70%] text-[10px] p-1"
                //         value={
                //           data?.el?.[selectedItem]?.[item?.name][idx]
                //             ? data?.el?.[selectedItem]?.[item?.name][idx]
                //             : ""
                //         }
                //         onChange={(e) => {
                //           const copiedData = { ...data };
                //           copiedData.el[selectedItem][item.name][idx] =
                //             e.target.value;
                //           setData(copiedData);
                //         }}
                //       >
                //         <option hidden selected disabled>
                //           {""}
                //         </option>
                //         {tablesData?.[data?.el?.[selectedItem]?.table]
                //           ?.data?.[0] &&
                //           Object.keys(
                //             tablesData?.[data?.el?.[selectedItem]?.table]
                //               ?.data?.[0]
                //           )?.map((item, idx) => (
                //             <option key={idx}>{item}</option>
                //           ))}
                //       </select>
                //     ))}
                // </div>
              )}

            {item?.inputType === "listDropsRefTables" &&
              tablesData &&
              item.category === cat && (
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
            {item.category === cat && (
              <p className="text-[10px]">{item?.unit}</p>
            )}
          </div>
        </div>
      )
  );
};

export default PropsComponents;
