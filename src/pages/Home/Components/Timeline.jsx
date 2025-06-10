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
  <div className="w-full my-2 border-t border-gray-200"></div>
);

const TimeLine = ({
  filteredData,
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
  const [openEvents, setOpenEvents] = useState({});

  const toggleEvent = (key) => {
    setOpenEvents((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full p-4 bg-gray-50 overflow-y-auto">
      {Object.keys(filteredEqsActiveSites).map((site) => (
        <React.Fragment key={site}>
          <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            {site}
          </h2>
          <div className="space-y-4">
            {filteredEqsActiveSites[site]?.map((eq) => {
              // Run all calculations again
              const breakdowns = calculateBreakdowns(
                filteredData,
                filters,
                site,
                eq
              );
              const dailyWH = calculateDailyWH(filteredData, filters, site, eq);
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
              const perMaint = calculatePerMaint(
                filteredData,
                filters,
                site,
                eq
              );

              // Combine all events into one array with dates
              const events = [];

              if (isBreakdown && breakdowns > 0) {
                events.push({
                  date: new Date().toISOString().slice(0, 10),
                  type: "Breakdown",
                  details: `${breakdowns} Hours`,
                  icon: <IoWarningOutline size={18} color="red" />,
                });
              }

              if (isWire && wire?.length > 0) {
                wire.forEach((item) => {
                  events.push({
                    date: item.StartDate.slice(0, 10),
                    type: "Wire Replacement",
                    details: `Rope: ${item.Replacement_Wire_Rope}, WH: ${item.WH}`,
                    icon: <GrDocumentMissing size={18} color="blue" />,
                  });
                });
              }

              if (isDiesel && diesel?.length > 0) {
                diesel.forEach((item) => {
                  events.push({
                    date: item.StartDate.slice(0, 10),
                    type: "Diesel Log",
                    details: `Code: ${item.Code}, WH: ${item.WH}`,
                    icon: <FaFilePdf size={18} color="#FF9900" />,
                  });
                });
              }

              if (isGearboxDrill && GBDrill?.length > 0) {
                GBDrill.forEach((item) => {
                  events.push({
                    date: item.StartDate.slice(0, 10),
                    type: "Gearbox Drill",
                    details: `Code: ${item.Code}, WH: ${item.WH}`,
                    icon: (
                      <IoIosCheckmarkCircleOutline size={18} color="green" />
                    ),
                  });
                });
              }

              if (isGearboxTrench && GBTrench?.length > 0) {
                GBTrench.forEach((item) => {
                  events.push({
                    date: item.StartDate.slice(0, 10),
                    type: "Gearbox Trench",
                    details: `Side: ${item.GearboxSide}, Code: ${item.Code}`,
                    icon: (
                      <IoIosCheckmarkCircleOutline size={18} color="green" />
                    ),
                  });
                });
              }

              if (isMudPump && mud?.length > 0) {
                mud.forEach((item) => {
                  events.push({
                    date: item.StartDate.slice(0, 10),
                    type: "Mud Pump",
                    details: `Status: ${item.Status}, WH: ${item.WH}`,
                    icon: <IoIosArrowForward size={18} color="purple" />,
                  });
                });
              }

              if (isKelly && kelly?.length > 0) {
                kelly.forEach((item) => {
                  events.push({
                    date: item.StartDate.slice(0, 10),
                    type: "Kelly Bar",
                    details: `Code: ${item.Code}, Status: ${item.Status}`,
                    icon: <IoIosArrowForward size={18} color="teal" />,
                  });
                });
              }

              if (isOilSamples && oilSamples?.length > 0) {
                oilSamples.forEach((item) => {
                  events.push({
                    date: item.Date,
                    type: "Oil Sample",
                    details: `Type: ${item.OilType}, Result: ${item.SampleResult}`,
                    icon: <FaFilePdf size={18} color="red" />,
                    pdfUrl: item.url,
                  });
                });
              }

              if (isPerMaint && perMaint) {
                if (perMaint.Date) {
                  events.push({
                    date: perMaint.Date,
                    type: "Maintenance",
                    details: `WH: ${perMaint.WH}, Interval: ${perMaint.PerMaintInt}`,
                    icon: (
                      <IoIosCheckmarkCircleOutline size={18} color="blue" />
                    ),
                  });
                }
              }

              // Sort events by date
              events.sort((a, b) => new Date(a.date) - new Date(b.date));

              return (
                <div key={eq} className="bg-white rounded shadow-sm p-3 mb-4">
                  <h3 className="font-medium text-gray-700">{eq}</h3>
                  <Separator />
                  <div className="relative pl-4 border-l-2 border-gray-200 space-y-3">
                    {events.length === 0 && (
                      <p className="text-xs text-gray-400">
                        No events recorded
                      </p>
                    )}
                    {events.map((event, idx) => {
                      const key = `${eq}-${idx}`;
                      return (
                        <div key={idx} className="relative">
                          <div
                            className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center"
                            style={{ backgroundColor: "#007BFF" }}
                          >
                            <span className="text-white text-xs">
                              {idx + 1}
                            </span>
                          </div>
                          <div
                            className="cursor-pointer flex justify-between items-center text-sm font-medium"
                            onClick={() => toggleEvent(key)}
                          >
                            <div className="flex items-center gap-2">
                              {event.icon}
                              <span>{event.type}</span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {event.date}
                            </span>
                          </div>
                          {openEvents[key] && (
                            <div className="mt-2 ml-6 text-xs text-gray-600 p-2 bg-gray-50 rounded">
                              <p>{event.details}</p>
                              {event.pdfUrl && (
                                <button
                                  onClick={() =>
                                    window.open(event.pdfUrl, "_blank")
                                  }
                                  className="text-blue-500 underline flex items-center gap-1 mt-1"
                                >
                                  <FaFilePdf /> View Report
                                </button>
                              )}
                            </div>
                          )}
                          <Separator />
                        </div>
                      );
                    })}
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

export default TimeLine;
