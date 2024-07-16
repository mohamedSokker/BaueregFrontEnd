import { ColorRing } from "react-loader-spinner";
import { AiOutlineCaretDown } from "react-icons/ai";

import useDropdown from "../Controllers/dropdown";

const Dropdown = ({
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
  targetData,
}) => {
  const { datas, datasLoading, handleChange, handleClick } = useDropdown({
    label,
    URL,
    column,
    local,
    localData,
    data,
    setData,
    siteData,
    setAllData,
    // getChildData,
    condition,
    setErrorData,
    targetData,
  });

  // console.log(data);
  // console.log(label);
  // console.log(data[label]);

  // console.log(label, fieldsAddData[label]);

  return (
    <div className="p-2 flex flex-col justify-center items-center bg-gray-100">
      <p className="w-full h-6 text-[14px] text-gray-400 flex flex-row justify-start">{`Select ${label}`}</p>
      <div className={`flex flex-row gap-2 items-center relative`}>
        {/* <p style={{ width: "40%" }}>{label}</p> */}
        <select
          className="p-2 w-[30vw] bg-gray-100 border-b-1 border-logoColor appearance-none text-[14px]"
          style={{ color: data[label] === "" ? "rgb(156 163 175)" : "black" }}
          onClick={handleClick}
          onChange={handleChange}
          value={data[label] === "" ? "" : data[label]}
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
          <AiOutlineCaretDown className="absolute right-2" size={14} />
        )}
      </div>
    </div>
  );
};

export default Dropdown;
