import React, { useState } from "react";
import {
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa";
import { GrDocumentMissing } from "react-icons/gr";

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
  calculateOilSamples,
  calculatePerMaint,
  calculatePerMaintWH,
  calculateProdGrouting,
  calculateProdPiles,
  calculateProdTrench,
  calculateWire,
} from "../Services/calculations";

const Separator = () => (
  <div className="w-full flex justify-center items-center">
    <div className="w-[100%] border-b border-gray-400"></div>
  </div>
);

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
  isOilSamples,
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
            {filteredEqsActiveSites[site]?.map((eq) => {
              const breakdowns = calculateBreakdowns(
                filteredData,
                filters,
                site,
                eq
              );
              const prodTrench = calculateProdTrench(
                filteredData,
                filters,
                site,
                eq
              );
              const prodPiles = calculateProdPiles(
                filteredData,
                filters,
                site,
                eq
              );
              const prodGrouting = calculateProdGrouting(
                filteredData,
                filters,
                site,
                eq
              );
              const perMaint = calculatePerMaint(
                filteredData,
                filters,
                site,
                eq
              );
              const perMaintWH = calculatePerMaintWH(
                filteredData,
                filters,
                site,
                eq
              );
              const fuel = calculateFuelConsumption(
                filteredData,
                filters,
                site,
                eq
              );
              const oil = calculateOilConsumption(
                filteredData,
                filters,
                site,
                eq
              );
              const dailyWH = calculateDailyWH(filteredData, filters, site, eq);
              const perMaintWHDiff =
                dailyWH && perMaint?.WH ? dailyWH - perMaint?.WH : null;
              const dieselPerMaintWHDiff =
                dailyWH && perMaint?.DieselWH
                  ? dailyWH - perMaint?.DieselWH
                  : null;
              const dailyWHDate = calculateDailyWHDate(
                filteredData,
                filters,
                site,
                eq
              );
              const wire = calculateWire(filteredData, filters, site, eq);
              const diesel = calculateDiesel(filteredData, filters, site, eq);
              const GBDrill = calculateGearboxDrilling(
                filteredData,
                filters,
                site,
                eq
              );
              const GBTrench = calculateGearboxTrench(
                filteredData,
                filters,
                site,
                eq
              );
              const mud = calculateMudpump(filteredData, filters, site, eq);
              const kelly = calculateKelly(filteredData, filters, site, eq);
              const oilSamples = calculateOilSamples(
                filteredData,
                filters,
                site,
                eq
              );
              return (
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
                        <div className="w-full text-[10px] p-1 bg-gray-300">
                          {`Breakdowns: ${breakdowns} Hours`} <Separator />
                        </div>
                      )}

                      {(eq?.startsWith("BC") ||
                        eq?.startsWith("MC") ||
                        eq?.startsWith("BG")) && (
                        <>
                          {isPerMaint && (
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Per Maint Date: ${perMaint?.Date}`}</div>
                          )}

                          {isPerMaint && (
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Per Maint WH: ${perMaint?.WH} Hours`}</div>
                          )}

                          {isPerMaint && (
                            <div
                              className="w-full text-[10px] p-1 bg-gray-300 flex flex-row justify-between items-center pr-2"
                              style={{
                                color: perMaintWHDiff > 300 ? "red" : "black",
                              }}
                            >
                              <p>{`Per Maint Dur: ${perMaintWHDiff} Hours`}</p>
                              {perMaintWHDiff > 300 ? (
                                <IoWarningOutline size={14} color="red" />
                              ) : perMaintWHDiff !== null ? (
                                <IoIosCheckmarkCircleOutline
                                  size={14}
                                  color="green"
                                />
                              ) : (
                                <GrDocumentMissing size={14} color="orange" />
                              )}
                            </div>
                          )}

                          {isPerMaint && (
                            <div className="w-full text-[10px] p-1 bg-gray-300">
                              {`Per Maint Interval: ${perMaint?.PerMaintInt}`}
                            </div>
                          )}

                          {isPerMaint && (
                            <div className="w-full text-[10px] p-1 bg-gray-300">
                              {`Next Per Maint: ${perMaint?.nextPerMaintInt}`}
                              <Separator />
                            </div>
                          )}
                        </>
                      )}

                      {/* {isPerMaint && (
                        <div className="w-full text-[10px] p-1 bg-gray-300">{`Problem: ${perMaint?.Problem}`}</div>
                      )} */}

                      {isPerMaint && (
                        <div className="w-full text-[10px] p-1 bg-gray-300">{`Diesel Maint Date: ${perMaint?.DieselDate}`}</div>
                      )}

                      {isPerMaint && (
                        <div className="w-full text-[10px] p-1 bg-gray-300">{`Diesel Maint WH: ${perMaint?.DieselWH} Hours`}</div>
                      )}

                      {isPerMaint && (
                        <div
                          className="w-full text-[10px] p-1 bg-gray-300 flex flex-row justify-between items-center pr-2"
                          style={{
                            color: dieselPerMaintWHDiff > 250 ? "red" : "black",
                          }}
                        >
                          <p>{`Diesel Maint Dur: ${dieselPerMaintWHDiff} Hours`}</p>
                          {dieselPerMaintWHDiff > 250 ? (
                            <IoWarningOutline size={14} color="red" />
                          ) : dieselPerMaintWHDiff !== null ? (
                            <IoIosCheckmarkCircleOutline
                              size={14}
                              color="green"
                            />
                          ) : (
                            <GrDocumentMissing size={14} color="orange" />
                          )}
                        </div>
                      )}

                      {isPerMaint && (
                        <div className="w-full text-[10px] p-1 bg-gray-300">
                          {`Diesel Maint Interval: ${perMaint?.DiselPerMaintInt}`}
                          <Separator />
                        </div>
                      )}

                      {isFuelConsmption && (
                        <div className="w-full text-[10px] p-1 bg-gray-300">
                          {`Fuel Consumption: ${fuel} L`}
                          <Separator />
                        </div>
                      )}

                      {isOilConsumption && (
                        <div className="w-full text-[10px] p-1 bg-gray-300">
                          {`Oil Consumption: ${oil} L`}
                          <Separator />
                        </div>
                      )}

                      {(eq?.startsWith("MC") || eq?.startsWith("BC")) &&
                        isProdTrench && (
                          <div className="w-full text-[10px] p-1 bg-gray-300">
                            {`Production: ${prodTrench} m3`}
                            <Separator />
                          </div>
                        )}

                      {eq?.startsWith("BG") && isProdPiles && (
                        <div className="w-full text-[10px] p-1 bg-gray-300">
                          {`Production Drill: ${prodPiles} ml`}
                          <Separator />
                        </div>
                      )}

                      {eq?.startsWith("BG") && isProdGrouting && (
                        <div className="w-full text-[10px] p-1 bg-gray-300">
                          {`Production Groutng: ${prodGrouting} ml`}
                          <Separator />
                        </div>
                      )}

                      {isDailyWH && (
                        <div className="w-full text-[10px] p-1 bg-gray-300">{`Daily WH: ${dailyWH} Hours`}</div>
                      )}

                      {isDailyWH && (
                        <div className="w-full text-[10px] p-1 bg-gray-300">
                          {`Daily WH Date: ${dailyWHDate}`}
                          <Separator />
                        </div>
                      )}

                      {isWire &&
                        wire?.map((wire, idx) => (
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
                            <Separator />
                          </React.Fragment>
                        ))}

                      {isDiesel &&
                        diesel?.map((wire, idx) => (
                          <React.Fragment key={idx}>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Diesel Code: ${wire?.Code}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Diesel Date: ${wire?.StartDate?.slice(
                              0,
                              10
                            )}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Diesel WH: ${wire?.WH}`}</div>
                            <Separator />
                          </React.Fragment>
                        ))}

                      {isGearboxDrill &&
                        GBDrill?.map((wire, idx) => (
                          <React.Fragment key={idx}>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Gearbox Code: ${wire?.Code}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Gearbox Date: ${wire?.StartDate?.slice(
                              0,
                              10
                            )}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Gearbox WH: ${wire?.WH}`}</div>
                            <Separator />
                          </React.Fragment>
                        ))}

                      {isGearboxTrench &&
                        GBTrench?.map((wire, idx) => (
                          <React.Fragment key={idx}>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Gearbox Code: ${wire?.Code}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Gearbox Side: ${wire?.GearboxSide}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Gearbox Date: ${wire?.StartDate?.slice(
                              0,
                              10
                            )}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Gearbox WH: ${wire?.WH}`}</div>
                            <Separator />
                          </React.Fragment>
                        ))}

                      {isMudPump &&
                        mud?.map((wire, idx) => (
                          <React.Fragment key={idx}>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`MudPump Code: ${wire?.Code}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`MudPump Status: ${wire?.Status}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`MudPump Date: ${wire?.StartDate?.slice(
                              0,
                              10
                            )}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`MudPump WH: ${wire?.WH}`}</div>
                            <Separator />
                          </React.Fragment>
                        ))}

                      {isKelly &&
                        kelly?.map((wire, idx) => (
                          <React.Fragment key={idx}>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Kelly Code: ${wire?.Code}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Kelly Status: ${wire?.Status}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Kelly Date: ${wire?.StartDate?.slice(
                              0,
                              10
                            )}`}</div>
                            <Separator />
                          </React.Fragment>
                        ))}

                      {isOilSamples &&
                        oilSamples?.map((wire, idx) => (
                          <React.Fragment key={idx}>
                            <div
                              className="w-full text-[10px] p-1 pr-2 bg-gray-300 underline cursor-pointer hover:text-logoColor flex flex-row justify-between items-center"
                              onClick={() => {
                                window.open(wire.url, "_blank");
                              }}
                            >
                              <p>{`Date: ${wire?.Date}`}</p>
                              <FaFilePdf size={14} color="red" />
                            </div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Category: ${wire?.Category}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Oil Type: ${wire?.OilType}`}</div>
                            <div className="w-full text-[10px] p-1 bg-gray-300">{`Status: ${wire?.SampleResult}`}</div>
                            <Separator />
                          </React.Fragment>
                        ))}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Category;
