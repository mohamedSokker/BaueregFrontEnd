import { ColorRing } from "react-loader-spinner";
import { AiOutlineCaretDown } from "react-icons/ai";

import useDropdown from "../Controllers/dropdown";

const Dropdown = ({
  val,
  name,
  setLoading,
  setMessage,
  label,
  URL,
  column,
  siteData,
  setAllData,
  local,
  localData,
  data,
  setData,
  // getChildData,
  condition,
  setErrorData,
  setDetails,
  tableColumns,
  setTableColumns,
  setCurrentColumns,
  multiple,
  found,
  disabled,
}) => {
  const { datasLoading, handleChange, handleClick } = useDropdown({
    val,
    name,
    setLoading,
    setMessage,
    label,
    URL,
    column,
    local,
    localData,
    data,
    setData,
    siteData,
    setAllData,
    condition,
    setErrorData,
    setDetails,
    tableColumns,
    setTableColumns,
    setCurrentColumns,
    found,
  });

  // console.log(data);

  return (
    <div className="w-full p-2 flex flex-col justify-center items-center bg-gray-100 ">
      <p className="w-full h-6 text-[14px] text-gray-400 flex flex-row justify-start">{`Select ${label}`}</p>
      <div className={`w-full flex flex-row gap-2 items-center relative `}>
        {/* <p style={{ width: "40%" }}>{label}</p> */}
        <select
          className="p-2 w-full bg-gray-100 border-b-1 border-logoColor appearance-none text-[14px] focus:border-[rgb(248,113,113)]"
          style={{
            color: disabled ? "gray" : "black",
            borderColor: disabled ? "gray" : "rgb(0,74,128)",
            scrollbarWidth: "none",
          }}
          onClick={handleClick}
          onChange={handleChange}
          disabled={disabled ? true : false}
          // value={data[label] === "" ? "" : data[label]}
          value={
            val
              ? val
              : data?.Fields?.[name]?.[label]
              ? data?.Fields?.[name]?.[label]
              : data[label] === ""
              ? ""
              : data[label]
          }
          multiple={multiple ? true : false}
        >
          <option hidden selected disabled>
            {""}
          </option>
          {localData &&
            localData?.map((site, i) => (
              <option key={i} value={site[column]} onClick={handleChange}>
                {site[column]}
              </option>
            ))}
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
          <AiOutlineCaretDown
            className="absolute right-2"
            size={14}
            style={{ color: disabled ? "gray" : "black" }}
          />
        )}
      </div>
    </div>
  );
};

export default Dropdown;
