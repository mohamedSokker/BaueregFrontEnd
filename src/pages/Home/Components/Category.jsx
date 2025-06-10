import React, { useState } from "react";
import {
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa";
import { GrDocumentMissing } from "react-icons/gr";

// Calculation Functions
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
  <div className="w-full my-1 border-t border-gray-200"></div>
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
    <div className="w-full p-4 bg-gray-50 overflow-y-auto">
      {Object.keys(filteredEqsActiveSites).map((site) => (
        <React.Fragment key={site}>
          <h2 className="text-[16px] font-semibold text-gray-800 my-3">
            {site}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredEqsActiveSites[site]?.map((eq) => {
              // All Calculations
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

              const perMaintWHDiff =
                dailyWH && perMaint?.WH ? dailyWH - perMaint?.WH : null;
              const dieselPerMaintWHDiff =
                dailyWH && perMaint?.DieselWH
                  ? dailyWH - perMaint?.DieselWH
                  : null;

              return (
                <div
                  key={eq}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Header */}
                  <div
                    className="flex justify-between items-center px-4 py-2 bg-blue-600 text-white cursor-pointer"
                    onClick={() =>
                      setIsPanelOpen((prev) => ({
                        ...prev,
                        [eq]: !prev[eq],
                      }))
                    }
                  >
                    <span className="font-bold truncate text-[12px]">{eq}</span>
                    {!isPanelOpen[eq] ? (
                      <IoIosArrowDown />
                    ) : (
                      <IoIosArrowForward />
                    )}
                  </div>

                  {/* Content Panel */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      !isPanelOpen[eq] ? "max-h-[999px]" : "max-h-0"
                    }`}
                  >
                    <div className="p-3 space-y-2 text-[12px]">
                      {/* Breakdown */}
                      {isBreakdown && (
                        <>
                          <div>🕒 Breakdowns: {breakdowns} Hours</div>
                          <Separator />
                        </>
                      )}

                      {/* Per Maint Info */}
                      {(eq.startsWith("BC") ||
                        eq.startsWith("MC") ||
                        eq.startsWith("BG")) && (
                        <>
                          {isPerMaint && (
                            <>
                              <div>📅 Per Maint Date: {perMaint?.Date}</div>
                              <div>🔧 Per Maint WH: {perMaint?.WH} Hours</div>
                              <div className="flex justify-between items-center">
                                <span>
                                  ⏳ Per Maint Dur: {perMaintWHDiff} Hours
                                </span>
                                {perMaintWHDiff > 300 ? (
                                  <IoWarningOutline size={16} color="red" />
                                ) : perMaintWHDiff !== null ? (
                                  <IoIosCheckmarkCircleOutline
                                    size={16}
                                    color="green"
                                  />
                                ) : (
                                  <GrDocumentMissing size={16} color="orange" />
                                )}
                              </div>
                              <div>
                                🔁 Per Maint Interval: {perMaint?.PerMaintInt}
                              </div>
                              <div>
                                🔜 Next Per Maint: {perMaint?.nextPerMaintInt}
                              </div>
                              <Separator />
                            </>
                          )}
                        </>
                      )}

                      {/* Diesel Maint Info */}
                      {isPerMaint && (
                        <>
                          <div>
                            📅 Diesel Maint Date: {perMaint?.DieselDate}
                          </div>
                          <div>
                            ⛽ Diesel Maint WH: {perMaint?.DieselWH} Hours
                          </div>
                          <div className="flex justify-between items-center">
                            <span>
                              ⏱️ Diesel Maint Dur: {dieselPerMaintWHDiff} Hours
                            </span>
                            {dieselPerMaintWHDiff > 250 ? (
                              <IoWarningOutline size={16} color="red" />
                            ) : dieselPerMaintWHDiff !== null ? (
                              <IoIosCheckmarkCircleOutline
                                size={16}
                                color="green"
                              />
                            ) : (
                              <GrDocumentMissing size={16} color="orange" />
                            )}
                          </div>
                          <div>
                            🔁 Diesel Maint Interval:{" "}
                            {perMaint?.DiselPerMaintInt}
                          </div>
                          <Separator />
                        </>
                      )}

                      {/* Fuel Consumption */}
                      {isFuelConsmption && (
                        <>
                          <div>⛽ Fuel Consumption: {fuel} L</div>
                          <Separator />
                        </>
                      )}

                      {/* Oil Consumption */}
                      {isOilConsumption && (
                        <>
                          <div>🛢️ Oil Consumption: {oil} L</div>
                          <Separator />
                        </>
                      )}

                      {/* Production Trench */}
                      {(eq.startsWith("MC") || eq.startsWith("BC")) &&
                        isProdTrench && (
                          <>
                            <div>⛏️ Production Trench: {prodTrench} m³</div>
                            <Separator />
                          </>
                        )}

                      {/* Production Drill */}
                      {eq.startsWith("BG") && isProdPiles && (
                        <>
                          <div>🪨 Production Drill: {prodPiles} ml</div>
                          <Separator />
                        </>
                      )}

                      {/* Production Grouting */}
                      {eq.startsWith("BG") && isProdGrouting && (
                        <>
                          <div>🧱 Production Grouting: {prodGrouting} ml</div>
                          <Separator />
                        </>
                      )}

                      {/* Daily WH */}
                      {isDailyWH && (
                        <>
                          <div>⏰ Daily WH: {dailyWH} Hours</div>
                          <div>📅 Daily WH Date: {dailyWHDate}</div>
                          <Separator />
                        </>
                      )}

                      {/* Wire Logs */}
                      {isWire &&
                        wire.map((item, idx) => (
                          <div key={idx} className="space-y-1">
                            <div>
                              🔗 Replacement: {item.Replacement_Wire_Rope}
                            </div>
                            <div>📏 Diameter: {item.Diameter} mm</div>
                            <div>📏 Length: {item.Length} m</div>
                            <div>📅 Date: {item.StartDate.slice(0, 10)}</div>
                            <div>⏱️ WH: {item.WH} Hours</div>
                            <Separator />
                          </div>
                        ))}

                      {/* Diesel Logs */}
                      {isDiesel &&
                        diesel.map((item, idx) => (
                          <div key={idx} className="space-y-1">
                            <div>⛽ Code: {item.Code}</div>
                            <div>📅 Date: {item.StartDate.slice(0, 10)}</div>
                            <div>⏱️ WH: {item.WH} Hours</div>
                            <Separator />
                          </div>
                        ))}

                      {/* Gearbox Drilling */}
                      {isGearboxDrill &&
                        GBDrill.map((item, idx) => (
                          <div key={idx} className="space-y-1">
                            <div>⚙️ Code: {item.Code}</div>
                            <div>📅 Date: {item.StartDate.slice(0, 10)}</div>
                            <div>⏱️ WH: {item.WH} Hours</div>
                            <Separator />
                          </div>
                        ))}

                      {/* Gearbox Trench */}
                      {isGearboxTrench &&
                        GBTrench.map((item, idx) => (
                          <div key={idx} className="space-y-1">
                            <div>⚙️ Code: {item.Code}</div>
                            <div>🧭 Side: {item.GearboxSide}</div>
                            <div>📅 Date: {item.StartDate.slice(0, 10)}</div>
                            <div>⏱️ WH: {item.WH} Hours</div>
                            <Separator />
                          </div>
                        ))}

                      {/* Mud Pump */}
                      {isMudPump &&
                        mud.map((item, idx) => (
                          <div key={idx} className="space-y-1">
                            <div>💧 Code: {item.Code}</div>
                            <div>🚦 Status: {item.Status}</div>
                            <div>📅 Date: {item.StartDate.slice(0, 10)}</div>
                            <div>⏱️ WH: {item.WH} Hours</div>
                            <Separator />
                          </div>
                        ))}

                      {/* Kelly */}
                      {isKelly &&
                        kelly.map((item, idx) => (
                          <div key={idx} className="space-y-1">
                            <div>🛠️ Code: {item.Code}</div>
                            <div>🚦 Status: {item.Status}</div>
                            <div>📅 Date: {item.StartDate.slice(0, 10)}</div>
                            <Separator />
                          </div>
                        ))}

                      {/* Oil Samples */}
                      {isOilSamples &&
                        oilSamples.map((item, idx) => (
                          <div key={idx} className="space-y-1">
                            <div
                              className="flex justify-between items-center text-blue-600 hover:text-blue-800 cursor-pointer"
                              onClick={() => window.open(item.url, "_blank")}
                            >
                              <span>📄 Report: {item.Date}</span>
                              <FaFilePdf size={16} color="red" />
                            </div>
                            <div>🔖 Category: {item.Category}</div>
                            <div>🛢️ Oil Type: {item.OilType}</div>
                            <div>Status: {item.SampleResult}</div>
                            <Separator />
                          </div>
                        ))}
                    </div>
                  </div>
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
