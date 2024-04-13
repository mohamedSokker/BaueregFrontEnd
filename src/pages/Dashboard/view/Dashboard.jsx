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

  const { loading, data, copiedData, setData } = useData();

  return (
    <>
      {loading && <PageLoading message={`Loading Data`} />}
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
        <></>
      )}
    </>
  );
};

export default Dashboard;
