import { ColorRing } from "react-loader-spinner";
import { AiOutlineCaretDown } from "react-icons/ai";

import useDropdown from "../Controllers/dropdown";
import useDropdownText from "../Controllers/dropdownText";

const DropdownText = ({
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
}) => {
  const {
    datasLoading,
    isDropped,
    setIsDropped,
    handleClick,
    handleDropClick,
    handleMenuClick,
  } = useDropdownText({
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
    setDetails,
  });

  //   console.log(isDropped);
  // console.log(label, fieldsAddData[label]);

  return (
    <div className="p-2 flex flex-col justify-center items-center bg-gray-100 ">
      <p className="w-full h-6 text-[14px] text-gray-400 flex flex-row justify-start">{`Select ${label}`}</p>
      <div className={`flex flex-row gap-2 items-center relative `}>
        {/* <p style={{ width: "40%" }}>{label}</p> */}
        <div
          className="w-[30vw] bg-gray-100 border-b-1 border-logoColor text-[14px] relative flex flex-row items-center"
          style={{ color: data[label] === "" ? "rgb(156 163 175)" : "black" }}
          //   onClick={handleClick}
          //   onChange={handleChange}
          value={data[label] === "" ? "" : data[label]}
        >
          <input
            className="w-full pl-2 p-2 bg-gray-100 outline-none text-black"
            value={data.Type}
            onChange={handleClick}
          />
          {isDropped && (
            <div className="absolute top-10 w-[30vw] left-0 max-h-[200px] bg-white py-2 border-1 border-gray-100 overflow-y-scroll">
              {localData &&
                localData?.map((site, i) => (
                  <div
                    className="hover:cursor-pointer hover:bg-gray-300 text-black py-1 pl-1"
                    key={i}
                    value={site[column]}
                    onClick={() => handleDropClick(site[column])}
                  >
                    {site[column]}
                  </div>
                ))}
            </div>
          )}
        </div>
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
            className="absolute right-2 hover:cursor-pointer"
            size={14}
            onClick={handleMenuClick}
          />
        )}
      </div>
    </div>
  );
};

export default DropdownText;
