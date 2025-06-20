import { ColorRing } from "react-loader-spinner";
import { AiOutlineCaretDown } from "react-icons/ai";

import useDropdown from "../Controllers/dropdown";

const Dropdown = ({ label, column, localData, data, setData, multiple }) => {
  const { datasLoading, handleChange, handleClick } = useDropdown({
    label,
    localData,
    data,
    setData,
  });

  // console.log(localData);

  return (
    <div className="w-full h-full p-2 flex flex-col justify-center items-center bg-gray-100 ">
      <p className="w-full h-6 text-[14px] text-gray-400 dark:text-white dark:bg-gray-700 flex flex-row justify-start">{`Select ${label}`}</p>
      <div
        className={`w-full flex flex-row gap-2 items-center relative  h-full`}
      >
        {/* <p style={{ width: "40%" }}>{label}</p> */}
        <select
          className={`p-2 w-full h-full bg-gray-100 dark:bg-gray-700 dark:text-white border-b-1 border-logoColor appearance-none text-[14px] focus:border-[rgb(248,113,113)] ${
            data[label] === ""
              ? "text-[rgb(156,163,175)] dark:text-white"
              : "text-black dark:text-white"
          }`}
          style={{
            // color: data[label] === "" ? "rgb(156 163 175)" : "black",
            scrollbarWidth: "none",
          }}
          onClick={handleClick}
          onChange={handleChange}
          value={data[label] === "" ? "" : data[label]}
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
          <AiOutlineCaretDown className="absolute right-2" size={14} />
        )}
      </div>
    </div>
  );
};

export default Dropdown;
