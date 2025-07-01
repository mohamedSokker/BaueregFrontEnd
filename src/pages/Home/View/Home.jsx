import React, { useState, useEffect } from "react";
import { TbCategory } from "react-icons/tb";
import { MdTimeline } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import "../Styles/main.css";
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

  // States
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

  // Toggle states
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
  const [isOilSamples, setIsOilSamples] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    { name: "TimeLine", icon: <MdTimeline size={16} /> },
    { name: "Category", icon: <TbCategory size={16} /> },
  ];

  const filterOptions = ["Last Month", "Last Week", "Today"];

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
    { label: "OilSamples", value: isOilSamples, setValue: setIsOilSamples },
  ];

  const getData = async () => {
    try {
      setLoading(true);
      const URLs = [
        "/api/v3/homeFuelCons",
        "/api/v3/homeOilCons",
        "/api/v3/homeProdGrouting",
        "/api/v3/homeProdPiles",
        "/api/v3/homeProdTrench",
        "/api/v3/homeDailyWH",
        "/api/v3/homeEqsLoc",
        "/api/v3/homeMachLoc",
        "/api/v3/homeWire",
        "/api/v3/homeLocGBTrench",
        "/api/v3/homeLocGBDrill",
        "/api/v3/homeLocMudPump",
        "/api/v3/homeLocKelly",
        "/api/v3/homeLocDiesel",
        "/api/v3/homeLocTrGB",
        "/api/v3/homeOilSamples",
        "/api/v3/homeMaint",
        "/api/v3/homePerMaint",
        "/api/v3/homeCons",
      ];
      const responseData = await Promise.all(
        URLs.map((url) =>
          axiosPrivate(url, {
            method: "POST",
            data: JSON.stringify({
              Sites: usersData?.[0]?.roles?.Editor?.Sites,
            }),
          })
        )
      );

      const response = {
        data: {
          FuelConsumption: responseData[0]?.data || [],
          OilConsumption: responseData[1]?.data || [],
          ProductionGrouting: responseData[2]?.data || [],
          Production_Piles: responseData[3]?.data || [],
          Production_TrenchCutting: responseData[4]?.data || [],
          DailyWH: responseData[5]?.data || [],
          Equipments_Location: responseData[6]?.data || [],
          Machinary_Location: responseData[7]?.data || [],
          Wire: responseData[8]?.data || [],
          Location_GearboxTrench: responseData[9]?.data || [],
          Location_GearboxDrilling: responseData[10]?.data || [],
          Location_Mudpump: responseData[11]?.data || [],
          Locations_Kelly: responseData[12]?.data || [],
          Location_DieselMotor: responseData[13]?.data || [],
          Location_TravelingGearbox: responseData[14]?.data || [],
          OilSamples: responseData[15]?.data || [],
          Maintenance: responseData[16]?.data || [],
          PerMaint: responseData[17]?.data || [],
          Consumptions: responseData[18]?.data || [],
        },
      };

      setData(response.data);
      setFilteredData(response.data);

      const userSites = usersData?.[0]?.roles?.Editor?.Sites?.map((site) => site.name ? site?.name : site)

      const activeSites = [];
      const eqs = [];
      let eqsActiveSites = {};

      response.data.Equipments_Location.forEach((row) => {
        if (!activeSites.includes(row.Location) && userSites.includes(row?.Location)) activeSites.push(row.Location);
        if (!eqs.includes(row.Equipment) && !row.Equipment.startsWith("GRC"))
          eqs.push(row.Equipment);
        if (!row.Equipment.startsWith("GRC") && userSites.includes(row?.Location)) {
          eqsActiveSites[row.Location] = eqsActiveSites[row.Location]
            ? [...eqsActiveSites[row.Location], row.Equipment]
            : [row.Equipment];
        }
      });

      setActiveSites(activeSites);
      setEqs(eqs);
      setEqsActiveSites(eqsActiveSites);
      setFilteredEqsActiveSites(eqsActiveSites);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return setFilteredEqsActiveSites(eqsActiveSites);

    const result = {};
    Object.keys(eqsActiveSites).forEach((site) => {
      if (site.toLowerCase().includes(search.toLowerCase())) {
        result[site] = eqsActiveSites[site];
      } else {
        const filteredEq = eqsActiveSites[site].filter((eq) =>
          eq.toLowerCase().includes(search.toLowerCase())
        );
        if (filteredEq.length) result[site] = filteredEq;
      }
    });
    setFilteredEqsActiveSites(result);
  };

  // Expandable FilterCard Component
  // const FilterCard = () => {
  //   return (
  //     <div className="w-full bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
  //       <button
  //         type="button"
  //         onClick={() => setIsExpanded((prev) => !prev)}
  //         className="w-full flex justify-between items-center px-4 py-2 text-left bg-gray-50 hover:bg-gray-100 transition"
  //       >
  //         <h3 className="text-sm font-semibold text-gray-700">
  //           Filter Options
  //         </h3>
  //         <span className="text-gray-500">{isExpanded ? "▼" : "▶"}</span>
  //       </button>

  //       <div
  //         className={`transition-all duration-300 ease-in-out ${
  //           isExpanded
  //             ? "max-h-[500px] opacity-100"
  //             : "max-h-0 opacity-0 overflow-hidden"
  //         }`}
  //       >
  //         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 p-3">
  //           {toggles.map((toggle) => (
  //             <div
  //               key={toggle.label}
  //               className="flex items-center justify-between bg-gray-50 px-3 py-1.5 rounded hover:bg-gray-100"
  //             >
  //               <span className="text-xs text-gray-700">{toggle.label}</span>
  //               <Toogle1
  //                 size={0.5}
  //                 value={toggle.value}
  //                 onChange={() => toggle.setValue((prev) => !prev)}
  //               />
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-gray-100">
      {loading && <PageLoading message={`Loading Dashboard...`} />}

      {/* Sticky Header Section */}
      <div className="sticky top-0 z-[9] bg-white shadow-md py-2 px-4 flex flex-col gap-3 w-full">
        {/* Search + Filter & View Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2 rounded-lg border border-gray-200">
          {/* Search Bar */}
          <div className="flex-1 min-w-0">
            <form onSubmit={handleSearch} className="relative max-w-md">
              <IoSearchOutline className="absolute left-3 top-2.5 text-gray-500" />
              <FormalDropdown
                placeholder="Search Site or Equipment"
                value={search}
                onChange={(value) => setSearch(value)}
                options={[...activeSites, ...eqs]}
                inputClassName="w-full pl-10 pr-4 py-1.5 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </form>
          </div>

          {/* Filter & View Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {filterOptions.map((option) => (
              <TooltipComponent
                position="BottomCenter"
                content={option}
                key={option}
              >
                <button
                  type="button"
                  onClick={() => setsFilters(option)}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    filters === option
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {option}
                </button>
              </TooltipComponent>
            ))}

            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            {categories.map((option) => (
              <TooltipComponent
                position="BottomCenter"
                content={option.name}
                key={option.name}
              >
                <button
                  type="button"
                  onClick={() => setCategory(option.name)}
                  className={`p-1.5 rounded flex items-center justify-center transition-colors ${
                    category === option.name
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {option.icon}
                </button>
              </TooltipComponent>
            ))}
          </div>
        </div>

        {/* Expandable Filter Toggles */}
        <div className="w-full bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="w-full flex justify-between items-center px-4 py-2 text-left bg-gray-50 hover:bg-gray-100 transition"
          >
            <h3 className="text-sm font-semibold text-gray-700">
              Filter Options
            </h3>
            <span className="text-gray-500">{isExpanded ? "▼" : "▶"}</span>
          </button>

          <div
            className={`transition-all duration-300 ease-in-out ${
              isExpanded
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 p-3">
              {toggles.map((toggle) => (
                <div
                  key={toggle.label}
                  className="flex items-center justify-between bg-gray-50 px-3 py-1.5 rounded hover:bg-gray-100"
                >
                  <span className="text-xs text-gray-700">{toggle.label}</span>
                  <Toogle1
                    size={0.5}
                    value={toggle.value}
                    onChange={() => toggle.setValue((prev) => !prev)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto px-4 pb-6 pt-2">
        {Object.keys(data).length === 0 && !loading ? (
          <NoData />
        ) : (
          <>
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
                isOilSamples={isOilSamples}
              />
            ) : (
              <Timeline
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
                isOilSamples={isOilSamples}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
