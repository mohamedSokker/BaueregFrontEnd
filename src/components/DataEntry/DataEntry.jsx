import React, { useEffect, useState } from "react";

import Dropdown from "../Dropdown";
import { AllStocks } from "../../data/Tablesdata";
import PerMaint from "./PerMaint";
import PageLoading from "../PageLoading";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavContext } from "../../contexts/NavContext";

const equipmentTypes = [
  { Equipment_Type: "Trench_Cutting_Machine" },
  { Equipment_Type: "Drilling_Machine" },
  { Equipment_Type: "Heavy_Cranes" },
  { Equipment_Type: "Cranes_25_Ton" },
  { Equipment_Type: "Forklift" },
  { Equipment_Type: "Micro_Piling_Machine" },
  { Equipment_Type: "Excavator" },
  { Equipment_Type: "Grouting_Container_13" },
];

const perMaintPlan = [{ plan: "250" }, { plan: "1000" }, { plan: "2000" }];

const stocksList = () => {
  let stocks = [];
  for (let i = 0; i < AllStocks.length; i++) {
    stocks.push({ stock: AllStocks[i] });
  }
  return stocks;
};

const jsonifyArray = (array, name) => {
  let arr = [];
  for (let i = 0; i < array?.length; i++) {
    arr.push({ [name]: array[i] });
  }
  return arr;
};

const getDate = (date) => {
  const dt = new Date(date);
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  return dt.toISOString().slice(0, 16);
};

const initialData = {
  Site: "",
  "Equipment Type": "",
  "Equipment Model": "",
  Equipment: "",
  "Working Hours": "",
  Breakdown: "",
  "Periodic Maintenance Interval": "",
  Problem: "",
  Action: "",
  "Problem Start From": new Date(),
  "Problem End To": new Date(),
  "Site QC Time": "",
  Store: "",
  "Spare Part": "",
};

const initialPerMaintData = {};
const initialSaved = {
  BC250: false,
  BC1000: false,
  BC2000: false,
  BG250: false,
  BG1000: false,
  BG2000: false,
  MC250: false,
  MC1000: false,
  MC2000: false,
};
const initialAllData = {
  sites: [],
  eqsModel: [],
  eqsType: [],
  eqs: [],
  store: [],
};
const DataEntry = () => {
  const { usersData } = useNavContext();
  const [data, setData] = useState(initialData);
  const [perMaintData, setPerMaintData] = useState(initialPerMaintData);
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(true);
  const [siteData, setSiteData] = useState([]);
  const [sites, setSites] = useState([]);
  const [allData, setAllData] = useState(initialAllData);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getData = async () => {
      try {
        const url = `/api/v1/getActiveData`;
        const result = await axiosPrivate(url, {
          method: "POST",
          data: JSON.stringify({ username: "Mohamed Atef" }),
        });
        setSiteData(result?.data);
        setLoading(false);
      } catch (err) {
        alert(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : err?.message
        );
        setLoading(false);
      }
    };
    getData();
    setAllData((prev) => ({
      ...prev,
      store: jsonifyArray(AllStocks, `stock`),
    }));
  }, []);

  useEffect(() => {
    let sites = [];

    sites = siteData?.usersResult
      ? siteData?.usersResult[0]?.Locations?.split(",")
      : [];
    if (sites)
      sites = sites?.filter(
        (value, index, array) => array.indexOf(value) === index
      );
    setSites(sites);
    setAllData((prev) => ({
      ...prev,
      sites: jsonifyArray(sites, "Location"),
      eqsType: [],
      eqsModel: [],
      eqs: [],
    }));
  }, [siteData]);

  useEffect(() => {
    let eqType = [];
    const sitesFilter = siteData?.sitesResult
      ? siteData?.sitesResult?.filter((site) => site?.Location === data?.Site)
      : [];
    sitesFilter?.map((d) => {
      eqType.push(d.Equipment_Type);
    });

    if (eqType)
      eqType = eqType?.filter(
        (value, index, array) => array.indexOf(value) === index
      );
    setAllData((prev) => ({
      ...prev,
      eqsType: jsonifyArray(eqType, "Equipment_Type"),
      eqsModel: [],
      eqs: [],
    }));
    setData((prev) => ({
      ...prev,
      "Equipment Type": "",
      "Equipment Model": "",
      Equipment: "",
    }));
  }, [data?.Site]);

  useEffect(() => {
    let eqModel = [];
    const sitesFilter = siteData?.sitesResult
      ? siteData?.sitesResult?.filter(
          (site) =>
            site?.Location === data?.Site &&
            site?.Equipment_Type === data["Equipment Type"]
        )
      : [];
    sitesFilter?.map((d) => {
      eqModel.push(d.Equipment_Model);
    });
    if (eqModel)
      eqModel = eqModel?.filter(
        (value, index, array) => array.indexOf(value) === index
      );
    setAllData((prev) => ({
      ...prev,
      eqsModel: jsonifyArray(eqModel, "Equipment_Model"),
      eqs: [],
    }));
    setData((prev) => ({
      ...prev,
      "Equipment Model": "",
      Equipment: "",
    }));
  }, [data["Equipment Type"]]);

  useEffect(() => {
    let eq = [];
    const sitesFilter = siteData?.sitesResult
      ? siteData?.sitesResult?.filter(
          (site) =>
            site?.Location === data?.Site &&
            site?.Equipment_Type === data["Equipment Type"] &&
            site?.Equipment_Model === data["Equipment Model"]
        )
      : [];
    sitesFilter?.map((d) => {
      eq.push(d.Equipment);
    });

    if (eq)
      eq = eq?.filter((value, index, array) => array.indexOf(value) === index);
    setAllData((prev) => ({ ...prev, eqs: jsonifyArray(eq, "Equipment") }));
    // console.log(eq);
  }, [data["Equipment Model"]]);

  console.log(data);
  // console.log(perMaintData);
  // console.log(allData);
  // console.log(saved);

  const getChildData = (label, value) => {
    setData((prev) => ({ ...prev, [label]: value }));
  };

  return (
    <div className="w-full h-full flex flex-col justify-around">
      {loading && (
        <div className="p-4">
          <PageLoading message={`Loading Selection Data`} />
        </div>
      )}
      <div className="w-[100%] h-[100%] flex flex-row flex-wrap justify-start items-start overflow-auto">
        <Dropdown
          label="Site"
          // URL="/api/v1/Location_Bauer"
          column="Location"
          condition={true}
          local={true}
          localData={allData?.sites}
          getChildData={getChildData}
        />
        <Dropdown
          label="Breakdown"
          URL="/api/v1/Bauer_Breakdown"
          column={data["Equipment Type"]}
          condition={data["Equipment Type"] !== ""}
          local={false}
          getChildData={getChildData}
        />
        <div className="p-2 flex flex-row justify-start items-center">
          <input
            type="datetime-local"
            value={getDate(data["Problem Start From"])}
            className="w-[30vw] border-1 border-logoColor rounded-md outline-none p-2"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                "Problem Start From": new Date(e?.target?.value),
              }))
            }
          />
        </div>
        <Dropdown
          label="Equipment Type"
          local={true}
          localData={allData?.eqsType}
          column="Equipment_Type"
          condition={data?.Site !== ""}
          getChildData={getChildData}
        />
        <Dropdown
          label="Periodic Maintenance Interval"
          local={true}
          localData={perMaintPlan}
          column="plan"
          condition={data?.Breakdown === `Periodic Maintenance`}
          getChildData={getChildData}
        />
        <div className="p-2 flex flex-row justify-start items-center">
          <input
            type="text"
            placeholder="Site QC Time"
            className="w-[30vw] border-1 border-logoColor rounded-md outline-none p-2"
            onChange={(e) =>
              setData((prev) => ({ ...prev, "Site QC Time": e.target.value }))
            }
          />
        </div>
        <Dropdown
          label="Equipment Model"
          // URL="/api/v1/Bauer_Equipments"
          local={true}
          localData={allData?.eqsModel}
          column="Equipment_Model"
          condition={data?.Site !== "" && data["Equipment Type"] !== ""}
          getChildData={getChildData}
        />
        <div className="p-2 flex flex-row justify-start items-center">
          <input
            type="text"
            placeholder="Problem"
            className="w-[30vw] border-1 border-logoColor rounded-md outline-none p-2"
            onChange={(e) =>
              setData((prev) => ({ ...prev, Problem: e.target.value }))
            }
          />
        </div>
        <Dropdown
          label="Store"
          local={true}
          localData={allData?.store}
          column="stock"
          condition={data?.Site !== ""}
          getChildData={getChildData}
        />
        <Dropdown
          label="Equipment"
          // URL="/api/v1/Bauer_Equipments"
          column="Equipment"
          condition={
            data?.Site !== "" &&
            data["Equipment Type"] !== "" &&
            data["Equipment Model"] !== ""
          }
          local={true}
          localData={allData?.eqs}
          getChildData={getChildData}
        />
        <div className="p-2 flex flex-row justify-start items-center">
          <input
            type="text"
            placeholder="Action"
            className="w-[30vw] border-1 border-logoColor rounded-md outline-none p-2"
            onChange={(e) =>
              setData((prev) => ({ ...prev, Action: e.target.value }))
            }
          />
        </div>
        <div className="p-2 flex flex-row justify-start items-center">
          <input
            type="text"
            placeholder="Spare Part"
            className="w-[30vw] border-1 border-logoColor rounded-md outline-none p-2"
            onChange={(e) =>
              setData((prev) => ({ ...prev, "Spare Part": e.target.value }))
            }
          />
        </div>
        <div className="p-2 flex flex-row justify-start items-center">
          <input
            type="text"
            placeholder="Working Hours"
            className="w-[30vw] border-1 border-logoColor rounded-md outline-none p-2"
            onChange={(e) =>
              setData((prev) => ({ ...prev, "Working Hours": e.target.value }))
            }
          />
        </div>
        <div className="p-2 flex flex-row justify-start items-center">
          <input
            type="datetime-local"
            value={getDate(data["Problem End To"])}
            className="w-[30vw] border-1 border-logoColor rounded-md outline-none p-2"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                "Problem End To": new Date(e?.target?.value),
              }))
            }
          />
        </div>
        <div className="w-[100%] h-[20%] text-white font-bold text-[16px] flex items-center p-2">
          <button className="w-full p-2 px-4 flex flex-row justify-around bg-green-700 rounded-lg">
            + Add Record
          </button>
        </div>
      </div>
      {data[`Periodic Maintenance Interval`] === "250" &&
        data[`Equipment Model`].startsWith("BC") &&
        !saved.BC250 && (
          <PerMaint
            setPerMaintData={setPerMaintData}
            setSaved={setSaved}
            Type={`BC250`}
            mainStyle={{ zIndex: 7 }}
            loadingStyle={{}}
            style={{}}
          />
        )}
      {data[`Periodic Maintenance Interval`] === "1000" &&
        data[`Equipment Model`].startsWith("BC") && (
          <>
            {!saved.BC250 && (
              <PerMaint
                setPerMaintData={setPerMaintData}
                setSaved={setSaved}
                Type={`BC250`}
                mainStyle={{ zIndex: 7 }}
                loadingStyle={{}}
                style={{}}
              />
            )}
            {!saved.BC1000 && (
              <PerMaint
                setPerMaintData={setPerMaintData}
                setSaved={setSaved}
                Type={`BC1000`}
                mainStyle={{ zIndex: 8 }}
                loadingStyle={{ marginTop: `40px` }}
                style={{ marginTop: `40px` }}
              />
            )}
          </>
        )}
      {data[`Periodic Maintenance Interval`] === "2000" &&
        data[`Equipment Model`].startsWith("BC") && (
          <>
            {!saved.BC250 && (
              <PerMaint
                setPerMaintData={setPerMaintData}
                setSaved={setSaved}
                Type={`BC250`}
                mainStyle={{ zIndex: 7 }}
                loadingStyle={{}}
                style={{}}
              />
            )}
            {!saved.BC1000 && (
              <PerMaint
                setPerMaintData={setPerMaintData}
                setSaved={setSaved}
                Type={`BC1000`}
                mainStyle={{ zIndex: 8 }}
                loadingStyle={{ marginTop: `40px` }}
                style={{ marginTop: `40px` }}
              />
            )}
            {!saved.BC2000 && (
              <PerMaint
                setPerMaintData={setPerMaintData}
                setSaved={setSaved}
                Type={`BC2000`}
                mainStyle={{ zIndex: 9 }}
                loadingStyle={{ marginTop: `80px` }}
                style={{ marginTop: `80px` }}
              />
            )}
          </>
        )}

      {data[`Periodic Maintenance Interval`] === "250" &&
        data[`Equipment Model`].startsWith("MC") &&
        !saved.MC250 && (
          <PerMaint
            setPerMaintData={setPerMaintData}
            setSaved={setSaved}
            Type={`MC250`}
            mainStyle={{ zIndex: 7 }}
            loadingStyle={{}}
            style={{}}
          />
        )}
      {data[`Periodic Maintenance Interval`] === "1000" &&
        data[`Equipment Model`].startsWith("MC") && (
          <>
            {!saved.MC250 && (
              <PerMaint
                setPerMaintData={setPerMaintData}
                setSaved={setSaved}
                Type={`MC250`}
                mainStyle={{ zIndex: 7 }}
                loadingStyle={{}}
                style={{}}
              />
            )}
            {!saved.MC1000 && (
              <PerMaint
                setPerMaintData={setPerMaintData}
                setSaved={setSaved}
                Type={`MC1000`}
                mainStyle={{ zIndex: 8 }}
                loadingStyle={{ marginTop: `40px` }}
                style={{ marginTop: `40px` }}
              />
            )}
          </>
        )}
      {data[`Periodic Maintenance Interval`] === "2000" &&
        data[`Equipment Model`].startsWith("MC") && (
          <>
            {!saved.MC250 && (
              <PerMaint
                setPerMaintData={setPerMaintData}
                setSaved={setSaved}
                Type={`MC250`}
                mainStyle={{ zIndex: 7 }}
                loadingStyle={{}}
                style={{}}
              />
            )}
            {!saved.MC1000 && (
              <PerMaint
                setPerMaintData={setPerMaintData}
                setSaved={setSaved}
                Type={`MC1000`}
                mainStyle={{ zIndex: 8 }}
                loadingStyle={{ marginTop: `40px` }}
                style={{ marginTop: `40px` }}
              />
            )}
            {!saved.MC2000 && (
              <PerMaint
                setPerMaintData={setPerMaintData}
                setSaved={setSaved}
                Type={`MC2000`}
                mainStyle={{ zIndex: 9 }}
                loadingStyle={{ marginTop: `80px` }}
                style={{ marginTop: `80px` }}
              />
            )}
          </>
        )}

      {data[`Periodic Maintenance Interval`] === "250" &&
        data[`Equipment Type`] === "Drilling_Machine" &&
        !saved.BG250 && (
          <PerMaint
            setPerMaintData={setPerMaintData}
            setSaved={setSaved}
            Type={`BG250`}
            mainStyle={{ zIndex: 7 }}
            loadingStyle={{}}
            style={{}}
          />
        )}
      {data[`Periodic Maintenance Interval`] === "1000" &&
        data[`Equipment Type`] === "Drilling_Machine" && (
          <>
            {!saved.BG250 && (
              <PerMaint
                setPerMaintData={setPerMaintData}
                setSaved={setSaved}
                Type={`BG250`}
                mainStyle={{ zIndex: 7 }}
                loadingStyle={{}}
                style={{}}
              />
            )}
            {!saved.BG1000 && (
              <PerMaint
                setPerMaintData={setPerMaintData}
                setSaved={setSaved}
                Type={`BG1000`}
                mainStyle={{ zIndex: 8 }}
                loadingStyle={{ marginTop: `40px` }}
                style={{ marginTop: `40px` }}
              />
            )}
          </>
        )}
      {data[`Periodic Maintenance Interval`] === "2000" &&
        data[`Equipment Type`] === "Drilling_Machine" && (
          <>
            {!saved.BG250 && (
              <PerMaint
                setPerMaintData={setPerMaintData}
                setSaved={setSaved}
                Type={`BG250`}
                mainStyle={{ zIndex: 7 }}
                loadingStyle={{}}
                style={{}}
              />
            )}
            {!saved.BG1000 && (
              <PerMaint
                setPerMaintData={setPerMaintData}
                setSaved={setSaved}
                Type={`BG1000`}
                mainStyle={{ zIndex: 8 }}
                loadingStyle={{ marginTop: `40px` }}
                style={{ marginTop: `40px` }}
              />
            )}
            {!saved.BG2000 && (
              <PerMaint
                setPerMaintData={setPerMaintData}
                setSaved={setSaved}
                Type={`BG2000`}
                mainStyle={{ zIndex: 9 }}
                loadingStyle={{ marginTop: `80px` }}
                style={{ marginTop: `80px` }}
              />
            )}
          </>
        )}
    </div>
  );
};

export default DataEntry;
