import React, { useState, useEffect } from "react";
import { TbCategory } from "react-icons/tb";
import { MdTimeline } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";

import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import Category from "../Components/Category";
import Timeline from "../Components/Timeline";
import PageLoading from "../../../components/PageLoading.jsx";
import { useNavContext } from "../../../contexts/NavContext";
import NoData from "../Components/NoData.jsx";
import FormalDropdown from "../../../components/Accessories/Dropdown.jsx";
import Toogle1 from "../../../components/Accessories/Toogle1.jsx";

const Home = () => {
  const { usersData } = useNavContext();
  const axiosPrivate = useAxiosPrivate();

  const [category, setCategory] = useState("Category");
  const [filters, setsFilters] = useState("Today");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [search, setSearch] = useState("");
  const [activeSites, setActiveSites] = useState([]);
  const [eqsActiveSites, setEqsActiveSites] = useState({});
  const [filteredEqsActiveSites, setFilteredEqsActiveSites] = useState({});
  const [eqs, setEqs] = useState([]);
  const [isBreakdown, setIsBreakdown] = useState(false);
  const [isPerMaint, setIsPerMaint] = useState(false);
  const [isDailyWH, setIsDailyWH] = useState(true);
  const [isFuelConsmption, setIsFuelConsumption] = useState(false);
  const [isOilConsumption, setIsOilConsumption] = useState(false);
  const [isDiesel, setIsDiesel] = useState(false);
  const [isGearboxDrill, setIsGearboxDrill] = useState(false);
  const [isGearboxTrench, setIsGearboxTrench] = useState(false);
  const [isMudPump, setIsMudPump] = useState(false);
  const [isProdGrouting, setIsProdGrouting] = useState(false);
  const [isProdPiles, setIsProdPiles] = useState(false);
  const [isProdTrench, setIsProdTrench] = useState(false);
  const [isWire, setIsWire] = useState(false);
  const [isKelly, setIsKelly] = useState(false);

  // console.log(usersData?.[0]?.roles?.Editor?.Sites);

  const categories = [
    { name: "TimeLine", icon: <MdTimeline size={16} /> },
    { name: "Category", icon: <TbCategory size={16} /> },
  ];
  const filterOptions = ["Last Month", "Last Week", "Today"];

  const getData = async () => {
    try {
      setLoading(true);
      const url = `/api/v3/home`;
      const response = await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify({ Sites: usersData?.[0]?.roles?.Editor?.Sites }),
      });
      console.log(response.data?.data);
      setData(response.data?.data);
      setFilteredData(response.data?.data);
      const activeSites = [];
      const eqs = [];
      let eqsActiveSites = {};
      response.data?.data?.Equipments_Location?.forEach((row) => {
        if (!activeSites.includes(row?.Location)) {
          activeSites.push(row?.Location);
        }
        if (!eqs.includes(row?.Equipment)) {
          eqs.push(row?.Equipment);
        }
        eqsActiveSites = eqsActiveSites[row?.Location]
          ? {
              ...eqsActiveSites,
              [row?.Location]: [
                ...eqsActiveSites[row?.Location],
                row?.Equipment,
              ],
            }
          : {
              ...eqsActiveSites,
              [row?.Location]: [row?.Equipment],
            };
      });
      setActiveSites(activeSites);
      setEqs(eqs);
      console.log(eqsActiveSites);
      setEqsActiveSites(eqsActiveSites);
      setFilteredEqsActiveSites(eqsActiveSites);
      setLoading(false);
    } catch (err) {
      console.log(err);
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const toggles = [
    { label: "Breakdown", value: isBreakdown, setValue: setIsBreakdown },
    { label: "PerMaint", value: isPerMaint, setValue: setIsPerMaint },
    { label: "DailyWH", value: isDailyWH, setValue: setIsDailyWH },
    { label: "Fuel", value: isFuelConsmption, setValue: setIsFuelConsumption },
    { label: "Oil", value: isOilConsumption, setValue: setIsOilConsumption },
    { label: "Diesel", value: isDiesel, setValue: setIsDiesel },
    {
      label: "GearboxDrill",
      value: isGearboxDrill,
      setValue: setIsGearboxDrill,
    },
    {
      label: "GearboxTrench",
      value: isGearboxTrench,
      setValue: setIsGearboxTrench,
    },
    { label: "MudPump", value: isMudPump, setValue: setIsMudPump },
    { label: "ProdTrench", value: isProdTrench, setValue: setIsProdTrench },
    { label: "ProdPiles", value: isProdPiles, setValue: setIsProdPiles },
    {
      label: "ProdGrouting",
      value: isProdGrouting,
      setValue: setIsProdGrouting,
    },
    { label: "Wire", value: isWire, setValue: setIsWire },
    { label: "Kelly", value: isKelly, setValue: setIsKelly },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (search === "") {
      setFilteredEqsActiveSites(eqsActiveSites);
    } else {
      let result = {};
      Object.keys(eqsActiveSites).forEach((site) => {
        if (search.toLowerCase() === site.toLowerCase()) {
          result[site] = eqsActiveSites[site];
        } else {
          eqsActiveSites[site]?.forEach((eq) => {
            if (eq.toLowerCase().includes(search.toLowerCase())) {
              if (!result[site]) {
                result[site] = [];
              }
              if (!result[site].includes(eq)) {
                result[site].push(eq);
              }
            }
          });
        }
      });
      setFilteredEqsActiveSites(result);
    }
  };
  return (
    <div
      className="flex flex-col justify-start items-start"
      style={{
        width: "100vw",
        height: "92vh",
      }}
    >
      {loading && <PageLoading message={`Loading Data...`} />}
      <div className="w-full flex flex-row items-center justify-end p-2 px-8 gap-3 text-[18px]">
        <div className="flex flex-1 border border-gray-200 rounded-[8px] items-center px-2">
          <IoSearchOutline size={16} />
          <form className="w-full" onSubmit={handleSearch}>
            <FormalDropdown
              placeholder="Search"
              value={search}
              inputClassName="w-full px-3 py-1 rounded-sm focus:outline-none text-[14px] text-gray-500"
              onChange={(value) => setSearch(value)}
              options={[...activeSites, ...eqs] || []}
            />
          </form>

          {/* <input
            className="w-full outline-none text-[18px] text-gray-500 px-1"
            placeholder="Search"
          /> */}
        </div>

        {/* <div className="flex flex-row items-center gap-1">
          <div className="text-[10px] flex items-center justify-center">
            PerMaint
          </div>
          <div className="flex items-center justify-center">
            <Toogle1
              size={0.5}
              value={isPerMaint}
              onChange={() => setIsPerMaint((prev) => !prev)}
            />
          </div>
        </div> */}
        {filterOptions.map((option) => (
          <TooltipComponent
            position="BottomCenter"
            content={option}
            key={option}
          >
            <div
              className="p-1 aspect-squares border-gray-300 border rounded-[4px] flex justify-center items-center cursor-pointer hover:bg-gray-200 text-gray-500 px-3 transition-all duration-200"
              onClick={() => setsFilters(option)}
              style={{
                backgroundColor: filters === option ? "#4A90E2" : "",
                color: filters === option ? "#fff" : "rgb(107,114,128)",
              }}
            >
              {option}
            </div>
          </TooltipComponent>
        ))}

        <div className="w-0 h-full border border-gray-300"></div>

        {categories.map((option) => (
          <TooltipComponent
            position="BottomCenter"
            content={option.name}
            key={option.name}
          >
            <div
              className="p-1 aspect-squares border-gray-300 border rounded-[4px] flex justify-center items-center cursor-pointer hover:bg-gray-200 transition-all duration-200"
              onClick={() => setCategory(option.name)}
              style={{
                backgroundColor: category === option.name ? "#4A90E2" : "",
                color: category === option.name ? "#fff" : "rgb(107,114,128)",
              }}
            >
              {option.icon}
            </div>
          </TooltipComponent>
        ))}
      </div>
      <div className="w-full flex flex-row items-center justify-start px-3 gap-3 p-2">
        {toggles?.map((toggle) => (
          <div key={toggle?.label} className="flex flex-row items-center gap-1">
            <div className="text-[10px] flex items-center justify-center">
              {toggle?.label}
            </div>
            <div className="flex items-center justify-center">
              <Toogle1
                size={0.5}
                value={toggle.value}
                onChange={() => toggle.setValue((prev) => !prev)}
              />
            </div>
          </div>
        ))}
      </div>

      {Object.keys(data).length === 0 && !loading ? (
        <NoData />
      ) : (
        <div className="w-full h-full flex flex-row items-center flex-1 justify-center overflow-hidden">
          {category === "Category" ? (
            <Category
              data={data}
              filteredData={filteredData}
              usersData={usersData}
              category={category}
              filters={filters}
              activeSites={activeSites}
              eqsActiveSites={eqsActiveSites}
              filteredEqsActiveSites={filteredEqsActiveSites}
              isBreakdown={isBreakdown}
              isPerMaint={isPerMaint}
              isDailyWH={isDailyWH}
              isFuelConsmption={isFuelConsmption}
              isOilConsumption={isOilConsumption}
              isDiesel={isDiesel}
              isGearboxDrill={isGearboxDrill}
              isGearboxTrench={isGearboxTrench}
              isMudPump={isMudPump}
              isProdGrouting={isProdGrouting}
              isProdPiles={isProdPiles}
              isProdTrench={isProdTrench}
              isWire={isWire}
              isKelly={isKelly}
            />
          ) : (
            <Timeline data={data} usersData={usersData} />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
