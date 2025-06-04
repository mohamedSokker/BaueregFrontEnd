const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const calculateBreakdowns = (data, filters, site, eq) => {
  let breakdowns = 0;
  data?.Maintenance?.forEach((row) => {
    if (
      row?.Breakdown_Type !== "Periodic Maintenance" &&
      row?.Location === site &&
      row?.Equipment === eq
    ) {
      if (filters === "Today") {
        const today = new Date();
        const rowDate = new Date(row?.Date_Time);
        if (rowDate.toDateString() === today.toDateString()) {
          breakdowns += row?.Breakdown_time || 0;
        }
      } else if (filters === "Last Week") {
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        const rowDate = new Date(row?.Date_Time);
        if (rowDate >= lastWeek && rowDate <= today) {
          breakdowns += row?.Breakdown_time || 0;
        }
      } else if (filters === "Last Month") {
        const today = new Date();
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        const rowDate = new Date(row?.Date_Time);
        if (rowDate >= lastMonth && rowDate <= today) {
          breakdowns += row?.Breakdown_time || 0;
        }
      }
    }
  });
  return formatter.format(breakdowns);
};

export const calculateProdTrench = (data, filters, site, eq) => {
  let prod = 0;
  data?.Production_TrenchCutting?.forEach((row) => {
    if (row?.Equipment === eq) {
      if (filters === "Today") {
        const today = new Date();
        const rowDate = new Date(row?.Date);
        if (rowDate.toDateString() === today.toDateString()) {
          prod += Number(row?.M3) || 0;
        }
      } else if (filters === "Last Week") {
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        const rowDate = new Date(row?.Date);
        if (rowDate >= lastWeek && rowDate <= today) {
          prod += Number(row?.M3) || 0;
        }
      } else if (filters === "Last Month") {
        const today = new Date();
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        const rowDate = new Date(row?.Date);
        if (rowDate >= lastMonth && rowDate <= today) {
          prod += Number(row?.M3) || 0;
        }
      }
    }
  });
  return formatter.format(prod);
};

export const calculateProdPiles = (data, filters, site, eq) => {
  let prod = 0;
  data?.Production_Piles?.forEach((row) => {
    if (row?.Equipment === eq) {
      if (filters === "Today") {
        const today = new Date();
        const rowDate = new Date(row?.Date);
        if (rowDate.toDateString() === today.toDateString()) {
          prod += Number(row?.ContractualDepth) || 0;
        }
      } else if (filters === "Last Week") {
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        const rowDate = new Date(row?.Date);
        if (rowDate >= lastWeek && rowDate <= today) {
          prod += Number(row?.ContractualDepth) || 0;
        }
      } else if (filters === "Last Month") {
        const today = new Date();
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        const rowDate = new Date(row?.Date);
        if (rowDate >= lastMonth && rowDate <= today) {
          prod += Number(row?.ContractualDepth) || 0;
        }
      }
    }
  });
  return formatter.format(prod);
};

export const calculateProdGrouting = (data, filters, site, eq) => {
  let prod = 0;
  data?.ProductionGrouting?.forEach((row) => {
    if (row?.Equipment === eq) {
      if (filters === "Today") {
        const today = new Date();
        const rowDate = new Date(row?.Date);
        if (rowDate.toDateString() === today.toDateString()) {
          prod += Number(row?.Depth) || 0;
        }
      } else if (filters === "Last Week") {
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        const rowDate = new Date(row?.Date);
        if (rowDate >= lastWeek && rowDate <= today) {
          prod += Number(row?.Depth) || 0;
        }
      } else if (filters === "Last Month") {
        const today = new Date();
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        const rowDate = new Date(row?.Date);
        if (rowDate >= lastMonth && rowDate <= today) {
          prod += Number(row?.Depth) || 0;
        }
      }
    }
  });
  return formatter.format(prod);
};

export const calculatePerMaint = (data, filters, site, eq) => {
  let perMaint = null;
  let wh = null;
  let dieselPerMaint = null;
  let dieselwh = null;
  let PerMaintInt = null;
  let nextPerMaintInt = null;
  let DiselPerMaintInt = null;
  data?.PerMaint?.forEach((row) => {
    if (row?.Equipment === eq) {
      if (row?.Type === "Diesel") {
        dieselPerMaint = row?.Date;
        dieselwh = row?.WH;
        DiselPerMaintInt = row?.interval;
      } else {
        perMaint = row?.Date;
        wh = row?.WH;
        PerMaintInt = row?.interval;
        const predict =
          Math.round((row?.WH - row?.lastKnownWH) / 250) * 250 +
          250 +
          row?.lastKnown;
        nextPerMaintInt = predict > 2000 ? predict - 2000 : predict;
      }

      // Problem = row?.Problem;
    }
  });
  return {
    Date: perMaint ? perMaint.slice(0, 10) : null,
    WH: wh,
    PerMaintInt,
    nextPerMaintInt,
    DieselDate: dieselPerMaint ? dieselPerMaint?.slice(0, 10) : null,
    DiselPerMaintInt,
    DieselWH: dieselwh,
  };
};

export const calculatePerMaintWH = (data, filters, site, eq) => {
  let perMaint = null;
  data?.Maintenance?.sort(
    (a, b) => new Date(a.Date_Time) - new Date(b?.Date_Time)
  )?.forEach((row) => {
    if (
      row?.Breakdown_Type === "Periodic Maintenance" &&
      row?.Equipment === eq
    ) {
      if (filters === "Today") {
        const today = new Date();
        const rowDate = new Date(row?.Date_Time);
        if (rowDate.toDateString() === today.toDateString()) {
          perMaint = row?.Working_Hours;
        }
      } else if (filters === "Last Week") {
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        const rowDate = new Date(row?.Date_Time);
        if (rowDate >= lastWeek && rowDate <= today) {
          perMaint = row?.Working_Hours;
        }
      } else if (filters === "Last Month") {
        const today = new Date();
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        const rowDate = new Date(row?.Date_Time);
        if (rowDate >= lastMonth && rowDate <= today) {
          perMaint = row?.Working_Hours;
        }
      }
    }
  });
  return perMaint;
};

export const calculateFuelConsumption = (data, filters, site, eq) => {
  let fuelConsumption = 0;
  data?.Consumptions?.forEach((row) => {
    if (row?.Location === site && row?.Equipment === eq) {
      if (filters === "Today") {
        const today = new Date();
        const rowDate = new Date(row?.Date);
        if (rowDate.toDateString() === today.toDateString()) {
          fuelConsumption += row?.FuelConsumption || 0;
        }
      } else if (filters === "Last Week") {
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        const rowDate = new Date(row?.Date);
        if (rowDate >= lastWeek && rowDate <= today) {
          fuelConsumption += row?.FuelConsumption || 0;
        }
      } else if (filters === "Last Month") {
        const today = new Date();
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        const rowDate = new Date(row?.Date);
        if (rowDate >= lastMonth && rowDate <= today) {
          fuelConsumption += row?.FuelConsumption || 0;
        }
      }
    }
  });
  return formatter.format(fuelConsumption);
};

export const calculateOilConsumption = (data, filters, site, eq) => {
  let oilConsumption = 0;
  data?.Consumptions?.forEach((row) => {
    if (row?.Location === site && row?.Equipment === eq) {
      if (filters === "Today") {
        const today = new Date();
        const rowDate = new Date(row?.Date);
        if (rowDate.toDateString() === today.toDateString()) {
          oilConsumption += row?.OilConsumption || 0;
        }
      } else if (filters === "Last Week") {
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        const rowDate = new Date(row?.Date);
        if (rowDate >= lastWeek && rowDate <= today) {
          oilConsumption += row?.OilConsumption || 0;
        }
      } else if (filters === "Last Month") {
        const today = new Date();
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        const rowDate = new Date(row?.Date);
        if (rowDate >= lastMonth && rowDate <= today) {
          oilConsumption += row?.OilConsumption || 0;
        }
      }
    }
  });
  return formatter.format(oilConsumption);
};

export const calculateDailyWH = (data, filters, site, eq) => {
  let dailyWH = null;
  data?.DailyWH?.sort((a, b) => new Date(a?.Date) - new Date(b?.Date))?.forEach(
    (row) => {
      if (row?.Equipment === eq) {
        dailyWH = row?.WH;
        // if (filters === "Today") {
        //   const today = new Date();
        //   const rowDate = new Date(row?.Date);
        //   if (rowDate.toDateString() === today.toDateString()) {
        //     dailyWH = row?.WH;
        //   }
        // } else if (filters === "Last Week") {
        //   const today = new Date();
        //   const lastWeek = new Date(today);
        //   lastWeek.setDate(today.getDate() - 7);
        //   const rowDate = new Date(row?.Date);
        //   if (rowDate >= lastWeek && rowDate <= today) {
        //     dailyWH = row?.WH;
        //   }
        // } else if (filters === "Last Month") {
        //   const today = new Date();
        //   const lastMonth = new Date(today);
        //   lastMonth.setMonth(today.getMonth() - 1);
        //   const rowDate = new Date(row?.Date);
        //   if (rowDate >= lastMonth && rowDate <= today) {
        //     dailyWH = row?.WH;
        //   }
        // }
      }
    }
  );
  return dailyWH;
};

export const calculateDailyWHDate = (data, filters, site, eq) => {
  let dailyWH = null;
  data?.DailyWH?.sort((a, b) => new Date(a?.Date) - new Date(b?.Date))?.forEach(
    (row) => {
      if (row?.Equipment === eq) {
        dailyWH = row?.Date;
        // if (filters === "Today") {
        //   const today = new Date();
        //   const rowDate = new Date(row?.Date);
        //   if (rowDate.toDateString() === today.toDateString()) {
        //     dailyWH = row?.Date;
        //   }
        // } else if (filters === "Last Week") {
        //   const today = new Date();
        //   const lastWeek = new Date(today);
        //   lastWeek.setDate(today.getDate() - 7);
        //   const rowDate = new Date(row?.Date);
        //   if (rowDate >= lastWeek && rowDate <= today) {
        //     dailyWH = row?.Date;
        //   }
        // } else if (filters === "Last Month") {
        //   const today = new Date();
        //   const lastMonth = new Date(today);
        //   lastMonth.setMonth(today.getMonth() - 1);
        //   const rowDate = new Date(row?.Date);
        //   if (rowDate >= lastMonth && rowDate <= today) {
        //     dailyWH = row?.Date;
        //   }
        // }
      }
    }
  );
  return dailyWH ? dailyWH.slice(0, 10) : null;
};

export const calculateWire = (data, filters, site, eq) => {
  let wire = [];
  data?.Wire?.sort(
    (a, b) => new Date(a?.StartDate) - new Date(b?.StartDate)
  )?.forEach((row) => {
    if (row?.Epuipment === eq) {
      wire.push({
        Code: row?.Code,
        StartDate: row?.StartDate,
        Diameter: row?.Diameter,
        Length: row?.Length,
        Replacement_Wire_Rope: row?.Replacement_Wire_Rope,
        WH: row?.Starting_WH,
      });
    }
  });
  return wire;
};

export const calculateDiesel = (data, filters, site, eq) => {
  let diesel = [];
  data?.Location_DieselMotor?.sort(
    (a, b) => new Date(a?.StartDate) - new Date(b?.StartDate)
  )?.forEach((row) => {
    if (row?.Epuipment === eq) {
      diesel.push({
        Code: row?.DieselMotorCode,
        StartDate: row?.StartDate,
        WH: row?.StartingWH,
      });
    }
  });
  return diesel;
};

export const calculateGearboxDrilling = (data, filters, site, eq) => {
  let diesel = [];
  data?.Location_GearboxDrilling?.sort(
    (a, b) => new Date(a?.StartDate) - new Date(b?.StartDate)
  )?.forEach((row) => {
    if (row?.Epuipment === eq) {
      diesel.push({
        Code: row?.GearboxCode,
        StartDate: row?.StartDate,
        WH: row?.StartingWH,
      });
    }
  });
  return diesel;
};

export const calculateGearboxTrench = (data, filters, site, eq) => {
  let diesel = [];
  data?.Location_GearboxTrench?.sort(
    (a, b) => new Date(a?.StartDate) - new Date(b?.StartDate)
  )?.forEach((row) => {
    if (row?.Equipment === eq) {
      diesel.push({
        Code: row?.GearboxCode,
        GearboxSide: row?.GearboxSide,
        StartDate: row?.StartDate,
        WH: row?.StartWH,
      });
    }
  });
  return diesel;
};

export const calculateMudpump = (data, filters, site, eq) => {
  let diesel = [];
  data?.Location_Mudpump?.sort(
    (a, b) => new Date(a?.StartDate) - new Date(b?.StartDate)
  )?.forEach((row) => {
    if (row?.Equipment === eq) {
      diesel.push({
        Code: row?.MudPumpCode,
        Status: row?.Status,
        StartDate: row?.StartDate,
        WH: row?.StartWH,
      });
    }
  });
  return diesel;
};

export const calculateKelly = (data, filters, site, eq) => {
  let diesel = [];
  data?.Locations_Kelly?.sort(
    (a, b) => new Date(a?.StartDate) - new Date(b?.StartDate)
  )?.forEach((row) => {
    if (row?.Equipment === eq) {
      diesel.push({
        Code: row?.KellyCode,
        Status: row?.Status,
        StartDate: row?.StartDate,
      });
    }
  });
  return diesel;
};
export const calculateOilSamples = (data, filters, site, eq) => {
  let diesel = [];
  data?.OilSamples?.sort(
    (a, b) => new Date(a?.Date) - new Date(b?.Date)
  )?.forEach((row) => {
    if (row?.Equipment === eq.split(" ").join("")) {
      let cat = "";
      if (row?.Category === "NUMBER 1") {
        cat = "Drilling Gearbox";
      } else if (row?.Category === "NUMBER 2") {
        cat = "Grouting Gearbox";
      } else {
        cat = row?.Category;
      }
      diesel.push({
        Date: new Date(row?.Date).toISOString().slice(0, 10),
        url: row?.URL,
        Category: cat,
        OilType: row?.OilType,
        SampleResult: row?.SampleResult,
      });
    }
  });
  return diesel;
};
