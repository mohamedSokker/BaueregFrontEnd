import React, { useEffect, useState } from "react";

import Dropdown from "../Dropdown";
import { AllStocks } from "../../data/Tablesdata";
import PageLoading from "../PageLoading";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavContext } from "../../contexts/NavContext";

const jsonifyArray = (array, name) => {
  let arr = [];
  for (let i = 0; i < array?.length; i++) {
    arr.push({ [name]: array[i] });
  }
  return arr;
};

const initialData = {
  year: new Date().getFullYear(),
  Site: "",
  "Equipment Type": "",
  "Equipment Model": "",
  Equipment: "",
};

const initialAllData = {
  sites: [],
  eqsModel: [],
  eqsType: [],
  eqs: [],
};
const DataEntry = () => {
  const { usersData, setError, setErrorData } = useNavContext();
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [siteData, setSiteData] = useState([]);
  const [allData, setAllData] = useState(initialAllData);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getData = async () => {
      try {
        setError(false);
        setErrorData([]);
        const url = `/api/v1/getActiveData`;
        const result = await axiosPrivate(url, {
          method: "POST",
          data: JSON.stringify({ username: "Mohamed Atef" }),
        });
        setSiteData(result?.data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setErrorData((prev) => [
          ...prev,
          err?.response?.data?.message
            ? err?.response?.data?.message
            : err?.message,
        ]);
        setTimeout(() => {
          setError(false);
        }, 3000);
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
  }, [data["Equipment Model"]]);

  console.log(data);
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
      <div className="w-[100%] h-[100%] flex flex-col justify-start items-start gap-4 overflow-auto">
        <div className="p-2 flex flex-row justify-start items-center">
          <input
            type="number"
            className="w-[30vw] border-1 border-logoColor rounded-md outline-none p-2"
            value={data?.year}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                year: e?.target?.value,
              }))
            }
          />
        </div>
        <Dropdown
          label="Site"
          column="Location"
          condition={true}
          local={true}
          localData={allData?.sites}
          getChildData={getChildData}
        />
        <Dropdown
          label="Equipment Type"
          local={true}
          localData={allData?.eqsType}
          column="Equipment_Type"
          condition={data?.Site !== ""}
          getChildData={getChildData}
        />
        <Dropdown
          label="Equipment Model"
          local={true}
          localData={allData?.eqsModel}
          column="Equipment_Model"
          condition={data?.Site !== "" && data["Equipment Type"] !== ""}
          getChildData={getChildData}
        />
        <Dropdown
          label="Equipment"
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
        <div className="w-[100%] h-[20%] text-white font-bold text-[16px] flex items-center p-2">
          <button className="w-full p-2 px-4 flex flex-row justify-around bg-green-700 rounded-lg">
            + Add Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataEntry;
