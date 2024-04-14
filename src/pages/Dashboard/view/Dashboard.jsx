import React, { useEffect, useState } from "react";

import { HiWrenchScrewdriver } from "react-icons/hi2";
import { VscGraphLine } from "react-icons/vsc";

import PageLoading from "../../../components/PageLoading";

import useData from "../controller/controller";
import AvTrenchCard from "../components/AvTrenchCard";
import AvDrillCard from "../components/AvDrillCard";
import ProdTrenchCard from "../components/ProdTrenchCard";
import ProdDrillCard from "../components/ProdDrillCard";
import FuelConsCard from "../components/FuelConsCard";
import OilConsCard from "../components/OilConsCard";
import BdCard from "../components/BdCard";
import Analysis from "../components/Analysis";

import AvTrenchFilter from "../components/AvTrenchFilter";
import AvDrillFilter from "../components/AvDrillFilter";
import BdFilter from "../components/BdFilter";
import ProdTrenchFilter from "../components/ProdTrenchFilter";
import ProdDrillFilter from "../components/ProdDrillFilter";
import FuelFilter from "../components/FuelFilter";
import OilFilter from "../components/OilFilter";

import AvConsCard from "../components/AvConsCard";
import MinStockCard from "../components/MinStockCard";
import AvConsRateCard from "../components/AvConsRate";
import EquipmentConsCard from "../components/EquipmentsCons";

const Dashboard = ({ socket }) => {
  const [isAvTrenchFilterCard, setIsAvTrenchFilterCard] = useState(false);
  const [isAvDrillFilterCard, setIsAvDrillFilterCard] = useState(false);
  const [isProdTrenchFilterCard, setIsProdTrenchFilterCard] = useState(false);
  const [isProdDrillFilterCard, setIsProdDrillFilterCard] = useState(false);
  const [isFuelFilterCard, setIsFuelFilterCard] = useState(false);
  const [isOilFilterCard, setIsOilFilterCard] = useState(false);
  const [isBdFilterCard, setIsBdFilterCard] = useState(false);

  const [category, setCategory] = useState("Dashboard");
  const [isSelectActive, setIsSelectActive] = useState(false);
  const [isDashboardLabel, setIsDashboardLabel] = useState(false);
  const [isSpareLabel, setIsSpareLabel] = useState(false);

  const {
    loading,
    data,
    currentSpare,
    copiedData,
    isSearch,
    searchItems,
    setData,
    setIsSearch,
    handleSearchChange,
    handleSearchClick,
  } = useData();

  return (
    <>
      {loading && <PageLoading message={`Loading Data...`} />}
      <div
        className="absolute right-0 top-0 h-full flex flex-col items-center justify-center z-[1000]"
        style={
          isSelectActive
            ? {
                transform: "translate(0)",
                transition: "all 0.5s ease-in-out",
              }
            : {
                transform: "translate(80%)",
                transition: "all 0.5s ease-in-out",
              }
        }
      >
        <div
          className="bg-logoColor rounded-l-[8px] py-4 px-1 flex flex-col justify-center items-center"
          onMouseEnter={() => setIsSelectActive(true)}
          onMouseLeave={() => setIsSelectActive(false)}
        >
          <div
            className="p-2 hover:cursor-pointer relative flex flex-row justify-center items-center"
            onClick={() => setCategory("Dashboard")}
            onMouseEnter={() => setIsDashboardLabel(true)}
            onMouseLeave={() => setIsDashboardLabel(false)}
          >
            <VscGraphLine color="white" />
            {isDashboardLabel && (
              <div className="absolute left-[-100px] top-[0%] py-1 px-3 bg-[rgba(0,0,0,0.7)] rounded-md text-[12px] text-white">{`Dashboard`}</div>
            )}
          </div>
          <div
            className="p-2 hover:cursor-pointer relative flex flex-row justify-center items-center"
            onClick={() => setCategory("Spare Parts")}
            onMouseEnter={() => setIsSpareLabel(true)}
            onMouseLeave={() => setIsSpareLabel(false)}
          >
            <HiWrenchScrewdriver color="white" />
            {isSpareLabel && (
              <div className="absolute left-[-100px] top-[0%] py-1 px-3 bg-[rgba(0,0,0,0.7)] rounded-md text-[12px] text-white">{`Spare Parts`}</div>
            )}
          </div>
        </div>
      </div>

      {category === "Dashboard" ? (
        <>
          {isAvTrenchFilterCard && (
            <AvTrenchFilter
              setData={setData}
              copiedData={copiedData}
              setIsAvTrenchFilterCard={setIsAvTrenchFilterCard}
            />
          )}
          {isAvDrillFilterCard && (
            <AvDrillFilter
              setData={setData}
              copiedData={copiedData}
              setIsAvDrillFilterCard={setIsAvDrillFilterCard}
            />
          )}
          {isBdFilterCard && (
            <BdFilter
              setData={setData}
              copiedData={copiedData}
              setIsBdFilterCard={setIsBdFilterCard}
            />
          )}
          {isProdTrenchFilterCard && (
            <ProdTrenchFilter
              setData={setData}
              copiedData={copiedData}
              setIsProdTrenchFilterCard={setIsProdTrenchFilterCard}
            />
          )}
          {isProdDrillFilterCard && (
            <ProdDrillFilter
              setData={setData}
              copiedData={copiedData}
              setIsProdDrillFilterCard={setIsProdDrillFilterCard}
            />
          )}
          {isFuelFilterCard && (
            <FuelFilter
              setData={setData}
              copiedData={copiedData}
              setIsFuelFilterCard={setIsFuelFilterCard}
            />
          )}
          {isOilFilterCard && (
            <OilFilter
              setData={setData}
              copiedData={copiedData}
              setIsOilFilterCard={setIsOilFilterCard}
            />
          )}
          <div className="w-full h-full py-1 Main--Page flex flex-col justify-start items-center overflow-y-scroll md:mt-0 mt-[58px] gap-4 bg-gray-100">
            <div className="w-full h-full flex flex-col gap-1 items-center justify-start bg-gray-100">
              <div className="w-full md:h-[50%] h-auto flex md:flex-row flex-col flex-wrap justify-start items-center px-1 gap-1">
                <div className="flex-[3] h-full gap-1 flex flex-row justify-between flex-wrap">
                  <div className="w-full h-[49%]">
                    <AvTrenchCard
                      setIsAvTrenchFilterCard={setIsAvTrenchFilterCard}
                      title={`Availability (Trench Cutting Machines)`}
                      data={data?.avData}
                    />
                  </div>
                  <div className="w-full h-[49%] flex flex-row gap-1">
                    <div className="flex-1 h-full">
                      <ProdTrenchCard
                        setIsProdTrenchFilterCard={setIsProdTrenchFilterCard}
                        title={`Production (Trench)`}
                        data={data?.prodTrench}
                      />
                    </div>
                    <div className="flex-1 h-full">
                      <ProdDrillCard
                        setIsProdDrillFilterCard={setIsProdDrillFilterCard}
                        title={`Production (Drilling)`}
                        data={data?.prodDrill}
                      />
                    </div>
                  </div>
                </div>

                <div className="md:flex-[4] md:w-auto w-full md:h-full h-[500px]">
                  <div className="w-full h-full">
                    <BdCard
                      setIsBdFilterCard={setIsBdFilterCard}
                      title={`Breakdown Count`}
                      data={data?.maintData}
                    />
                  </div>
                </div>

                <div className="flex-[3] h-full gap-1 flex flex-row justify-between flex-wrap">
                  <div className="w-full h-[49%]">
                    <AvDrillCard
                      setIsAvDrillFilterCard={setIsAvDrillFilterCard}
                      title={`Availability (Drilling Machines)`}
                      data={data?.avData}
                    />
                  </div>
                  <div className="w-full h-[49%] flex flex-row gap-1">
                    <div className="flex-1 h-full">
                      <FuelConsCard
                        setIsFuelFilterCard={setIsFuelFilterCard}
                        title={`Fuel Consumption`}
                        data={data?.fuelCons}
                      />
                    </div>
                    <div className="flex-1 h-full">
                      <OilConsCard
                        setIsOilFilterCard={setIsOilFilterCard}
                        title={`Oil Consumption`}
                        data={data?.oilCons}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-[50%] px-1">
                <Analysis data={data} title={`Analysis`} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="w-full h-full flex flex-col justify-start items-center md:mt-0 mt-[58px] bg-gray-100"
            onClick={() => setIsSearch(false)}
          >
            <div className="w-full h-[20px] flex flex-row justify-between items-center px-2 py-[2px]">
              <div className="flex flex-row gap-3 pl-1">
                <p className="text-[14px] font-[700]">{`Code: ${currentSpare?.SparePart_Code}`}</p>
                <p className="text-[14px] font-[700]">{`Description: ${currentSpare?.Description}`}</p>
              </div>

              <div className="flex flex-row relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-b-1 border-gray-300 focus:border-red-400 outline-none pl-2 text-[12px]"
                  onChange={handleSearchChange}
                />
                {isSearch && (
                  <div className="absolute w-[400px] max-h-[200px] right-0 top-[20px] z-[100] flex flex-col items-start gap-[2px] bg-gray-300 text-[12px] text-black overflow-y-scroll">
                    {searchItems.map((item, i) => (
                      <div
                        className="hover:bg-white cursor-pointer m-auto w-full px-3 py-1"
                        key={i}
                        onClick={() => handleSearchClick(item)}
                      >
                        {`${item.SparePart_Code} (${item.Description})`}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full h-[calc(50%-10px)] flex flex-row gap-1 px-1 py-[2px]">
              <div className="flex-[3] h-full gap-1 flex flex-row justify-between flex-wrap">
                <div className="w-full h-[calc(50%-2px)]">
                  <AvConsCard
                    title={`Current Avarage Consumption`}
                    data={data?.maintStocksData}
                    currentSpare={currentSpare}
                  />
                </div>
                <div className="w-full h-[calc(50%-2px)]">
                  <MinStockCard
                    title={`Minimum Quantity in store`}
                    data={data?.maintStocksData}
                    currentSpare={currentSpare}
                  />
                </div>
              </div>
              <div className="flex-[10] h-full gap-1 flex flex-row justify-between flex-wrap">
                <div className="w-full h-[100%]">
                  <AvConsRateCard
                    title={`Avarage Consumption Rate`}
                    data={data?.maintStocksData}
                    currentSpare={currentSpare}
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-[calc(50%-10px)] px-1 py-[2px] pb-[4px]">
              <div className="flex-[10] h-full gap-1 flex flex-row justify-between flex-wrap">
                <div className="w-full h-[100%]">
                  <EquipmentConsCard
                    title={`Equipments Consumption`}
                    data={data?.maintStocksData}
                    currentSpare={currentSpare}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
