import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

import {
  calculateBreakdowns,
  calculateDailyWH,
  calculateDailyWHDate,
  calculateDiesel,
  calculateFuelConsumption,
  calculateGearboxDrilling,
  calculateGearboxTrench,
  calculateKelly,
  calculateMudpump,
  calculateOilConsumption,
  calculatePerMaintDate,
  calculatePerMaintWH,
  calculateProdGrouting,
  calculateProdPiles,
  calculateProdTrench,
  calculateWire,
} from "../Services/calculations";

const Category = ({
  data,
  filteredData,
  usersData,
  filters,
  activeSites,
  eqsActiveSites,
  filteredEqsActiveSites,
  isBreakdown,
  isPerMaint,
  isDailyWH,
  isFuelConsmption,
  isOilConsumption,
  isDiesel,
  isGearboxDrill,
  isGearboxTrench,
  isMudPump,
  isProdGrouting,
  isProdPiles,
  isProdTrench,
  isWire,
  isKelly,
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState({});
  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-2 gap-2 overflow-y-scroll">
      {Object.keys(filteredEqsActiveSites)?.map((site) => (
        <React.Fragment key={site}>
          <div className="w-full flex flex-row justify-start items-center gap-2 p-2 border-b border-gray-200 text-[12px] font-[700]">
            {site}
          </div>
          <div className="w-full flex flex-row flex-wrap justify-start items-start gap-2">
            {filteredEqsActiveSites[site]?.map((eq) => (
              <div
                key={eq}
                className="w-[180px] flex flex-col rounded-[4px] overflow-hidden"
              >
                <div className="w-full flex flex-row justify-between items-center bg-logoColor text-white text-[10px] px-1 py-1 overflow-ellipsis whitespace-nowrap overflow-hidden">
                  <p className="overflow-ellipsis whitespace-nowrap overflow-hidden">
                    {eq}
                  </p>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      setIsPanelOpen((prev) => ({
                        ...prev,
                        [eq]: !prev?.[eq],
                      }))
                    }
                  >
                    {!isPanelOpen?.[eq] ? (
                      <IoIosArrowDown />
                    ) : (
                      <IoIosArrowForward />
                    )}
                  </div>
                </div>
                {!isPanelOpen?.[eq] && (
                  <>
                    {isBreakdown && (
                      <div className="w-full text-[10px] p-1 bg-gray-300">{`Breakdowns: ${calculateBreakdowns(
                        filteredData,
                        filters,
                        site,
                        eq
                      )} Hours`}</div>
                    )}

                    {isPerMaint && (
                      <div className="w-full text-[10px] p-1 bg-gray-300">{`Per Maint Date: ${calculatePerMaintDate(
                        filteredData,
                        filters,
                        site,
                        eq
                      )}`}</div>
                    )}

                    {isPerMaint && (
                      <div className="w-full text-[10px] p-1 bg-gray-300">{`Per Maint WH: ${calculatePerMaintWH(
                        filteredData,
                        filters,
                        site,
                        eq
                      )} Hours`}</div>
                    )}

                    {isFuelConsmption && (
                      <div className="w-full text-[10px] p-1 bg-gray-300">{`Fuel Consumption: ${calculateFuelConsumption(
                        filteredData,
                        filters,
                        site,
                        eq
                      )} L`}</div>
                    )}

                    {isOilConsumption && (
                      <div className="w-full text-[10px] p-1 bg-gray-300">{`Oil Consumption: ${calculateOilConsumption(
                        filteredData,
                        filters,
                        site,
                        eq
                      )} L`}</div>
                    )}

                    {(eq?.startsWith("MC") || eq?.startsWith("BC")) &&
                      isProdTrench && (
                        <div className="w-full text-[10px] p-1 bg-gray-300">{`Production: ${calculateProdTrench(
                          filteredData,
                          filters,
                          site,
                          eq
                        )} m3`}</div>
                      )}
                    {eq?.startsWith("BG") && isProdPiles && (
                      <div className="w-full text-[10px] p-1 bg-gray-300">{`Production Drill: ${calculateProdPiles(
                        filteredData,
                        filters,
                        site,
                        eq
                      )} ml`}</div>
                    )}
                    {eq?.startsWith("BG") && isProdGrouting && (
                      <div className="w-full text-[10px] p-1 bg-gray-300">{`Production Groutng: ${calculateProdGrouting(
                        filteredData,
                        filters,
                        site,
                        eq
                      )} ml`}</div>
                    )}

                    {isDailyWH && (
                      <div className="w-full text-[10px] p-1 bg-gray-300">{`Daily WH: ${calculateDailyWH(
                        filteredData,
                        filters,
                        site,
                        eq
                      )} Hours`}</div>
                    )}

                    {isDailyWH && (
                      <div className="w-full text-[10px] p-1 bg-gray-300">{`Daily WH Date: ${calculateDailyWHDate(
                        filteredData,
                        filters,
                        site,
                        eq
                      )}`}</div>
                    )}

                    {isWire &&
                      calculateWire(filteredData, filters, site, eq)?.map(
                        (wire, idx) => (
                          <React.Fragment key={idx}>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Wire Code: ${wire?.Code}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Wire Date: ${wire?.StartDate?.slice(
                              0,
                              10
                            )}`}</div>
                            {/* <div className="w-full text-[10px] p-1 bg-gray-300">{`Wire Diameter: ${wire?.Diameter}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Wire Length: ${wire?.Length}`}</div> */}
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Wire Rope: ${wire?.Replacement_Wire_Rope}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Wire WH: ${wire?.WH}`}</div>
                          </React.Fragment>
                        )
                      )}

                    {isDiesel &&
                      calculateDiesel(filteredData, filters, site, eq)?.map(
                        (wire, idx) => (
                          <React.Fragment key={idx}>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Diesel Code: ${wire?.Code}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Diesel Date: ${wire?.StartDate?.slice(
                              0,
                              10
                            )}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Diesel WH: ${wire?.WH}`}</div>
                          </React.Fragment>
                        )
                      )}

                    {isGearboxDrill &&
                      calculateGearboxDrilling(
                        filteredData,
                        filters,
                        site,
                        eq
                      )?.map((wire, idx) => (
                        <React.Fragment key={idx}>
                          <div className="w-full text-[10px] p-1 bg-gray-300">{`Gearbox Code: ${wire?.Code}`}</div>
                          <div className="w-full text-[10px] p-1 bg-gray-300">{`Gearbox Date: ${wire?.StartDate?.slice(
                            0,
                            10
                          )}`}</div>
                          <div className="w-full text-[10px] p-1 bg-gray-300">{`Gearbox WH: ${wire?.WH}`}</div>
                        </React.Fragment>
                      ))}

                    {isGearboxTrench &&
                      calculateGearboxTrench(
                        filteredData,
                        filters,
                        site,
                        eq
                      )?.map((wire, idx) => (
                        <React.Fragment key={idx}>
                          <div className="w-full text-[10px] p-1 bg-gray-300">{`Gearbox Code: ${wire?.Code}`}</div>
                          <div className="w-full text-[10px] p-1 bg-gray-300">{`Gearbox Side: ${wire?.GearboxSide}`}</div>
                          <div className="w-full text-[10px] p-1 bg-gray-300">{`Gearbox Date: ${wire?.StartDate?.slice(
                            0,
                            10
                          )}`}</div>
                          <div className="w-full text-[10px] p-1 bg-gray-300">{`Gearbox WH: ${wire?.WH}`}</div>
                        </React.Fragment>
                      ))}

                    {isMudPump &&
                      calculateMudpump(filteredData, filters, site, eq)?.map(
                        (wire, idx) => (
                          <React.Fragment key={idx}>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`MudPump Code: ${wire?.Code}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`MudPump Status: ${wire?.Status}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`MudPump Date: ${wire?.StartDate?.slice(
                              0,
                              10
                            )}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`MudPump WH: ${wire?.WH}`}</div>
                          </React.Fragment>
                        )
                      )}

                    {isKelly &&
                      calculateKelly(filteredData, filters, site, eq)?.map(
                        (wire, idx) => (
                          <React.Fragment key={idx}>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Kelly Code: ${wire?.Code}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Kelly Status: ${wire?.Status}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Kelly Date: ${wire?.StartDate?.slice(
                              0,
                              10
                            )}`}</div>
                          </React.Fragment>
                        )
                      )}
                  </>
                )}
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Category;
