import React, { useEffect, useState } from "react";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { jsonifyArray, perMaintPlan } from "../Model/model";
import { AllStocks } from "../../../../data/Tablesdata";

const useDropdown = ({
  label,
  URL,
  column,
  local,
  localData,
  data,
  setData,
  siteData,
  setAllData,
  // getChildData,
  condition,
  setErrorData,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [datas, setDatas] = useState([]);
  const [datasLoading, setDatasLoading] = useState(false);

  const handleClick = async () => {
    try {
      if (!condition) throw new Error(`Can't choose ${label} right away`);
      if (local) {
        setDatasLoading(true);
        setDatas(localData);
        switch (label) {
          case "Type":
            let sites = [];
            siteData?.sitesResult.map((item) => {
              sites.push(item.Type);
            });
            // sites = siteData?.usersResult ? siteData?.usersResult : [];
            if (sites)
              sites = sites?.filter(
                (value, index, array) => array.indexOf(value) === index
              );
            setAllData((prev) => ({
              ...prev,
              types: jsonifyArray(sites, "Type"),
            }));
            setData((prev) => ({ ...prev, Code: "", Serial: "" }));

            break;
          case "Code":
            let eqType = [];
            const sitesFilter = siteData?.sitesResult
              ? siteData?.sitesResult.filter(
                  (item) =>
                    item.Type === data.Type && item.Code && item.Code !== ""
                )
              : [];
            sitesFilter?.map((d) => {
              eqType.push(d.Code);
            });

            if (eqType)
              eqType = eqType?.filter(
                (value, index, array) => array.indexOf(value) === index
              );
            setAllData((prev) => ({
              ...prev,
              code: jsonifyArray(eqType, "Code"),
            }));
            setData((prev) => ({ ...prev, Serial: "" }));

            break;
          case "Serial":
            let eqModel = [];
            const sitesFilterEqsModel = siteData?.sitesResult
              ? siteData?.sitesResult?.filter(
                  (site) =>
                    site?.Type === data.Type &&
                    site.Code === data.Code &&
                    site.Serial &&
                    site.Serial !== "" &&
                    site.Code &&
                    site.Code !== ""
                )
              : [];
            sitesFilterEqsModel?.map((d) => {
              eqModel.push(d.Serial);
            });
            if (eqModel)
              eqModel = eqModel?.filter(
                (value, index, array) => array.indexOf(value) === index
              );
            setAllData((prev) => ({
              ...prev,
              serial: jsonifyArray(eqModel, "Serial"),
            }));

            break;
          case "Location":
            let locs = [];
            const eqsLoc = siteData.EqsLocResult ? siteData.EqsLocResult : [];
            eqsLoc?.map((d) => {
              locs.push(d.Location);
            });
            if (locs)
              locs = locs?.filter(
                (value, index, array) => array.indexOf(value) === index
              );
            setAllData((prev) => ({
              ...prev,
              sites: jsonifyArray(locs, "Location"),
            }));
            setData((prev) => ({ ...prev, Equipment: "" }));
            break;
          case "Equipment":
            let eqs = [];
            const eqsLocFilter = siteData.EqsLocResult
              ? siteData.EqsLocResult.filter(
                  (item) => item.Location === data.Location
                )
              : [];
            eqsLocFilter?.map((d) => {
              eqs.push(d.Equipment);
            });
            eqs.push("Spare");
            if (eqs)
              eqs = eqs?.filter(
                (value, index, array) => array.indexOf(value) === index
              );
            setAllData((prev) => ({
              ...prev,
              eqs: jsonifyArray(eqs, "Equipment"),
            }));
            break;
        }
        setDatasLoading(false);
      } else if (localData.length === 0) {
        setDatasLoading(true);
        const url = URL;
        const result = await axiosPrivate(url, {
          //   signal: controller.signal,
          method: "GET",
        });
        const response = result?.data;
        setAllData((prev) => ({ ...prev, Breakdown_Type: result?.data }));
      }
    } catch (err) {
      setErrorData((prev) => [
        ...prev,
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message,
      ]);
    } finally {
      setDatasLoading(false);
    }
  };

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [label]: e.target.value }));
  };

  return { datas, datasLoading, handleChange, handleClick };
};

export default useDropdown;
