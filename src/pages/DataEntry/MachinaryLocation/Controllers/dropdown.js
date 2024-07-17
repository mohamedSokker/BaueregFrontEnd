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
          case "Location":
            let sites = [];
            console.log(siteData);
            siteData?.allBreakdownTypes.map((item) => {
              sites.push(item.Location);
            });
            // sites = siteData?.usersResult ? siteData?.usersResult : [];
            if (sites)
              sites = sites?.filter(
                (value, index, array) => array.indexOf(value) === index
              );
            setAllData((prev) => ({
              ...prev,
              sites: jsonifyArray(sites, "Location"),
            }));
            setData((prev) => ({
              ...prev,
              Machinery_Type: "",
              Machinery_Model: "",
              Machinary_Specs: "",
              Code: "",
              Serial_No: "",
              Machinery_Status: "",
            }));
            break;
          case "Machinery_Type":
            let eqType = [];
            const sitesFilter = siteData?.sitesResult
              ? siteData?.sitesResult
              : [];
            console.log(sitesFilter);
            sitesFilter?.map((d) => {
              eqType.push(d.Machinery_Type);
            });

            if (eqType)
              eqType = eqType?.filter(
                (value, index, array) => array.indexOf(value) === index
              );
            setAllData((prev) => ({
              ...prev,
              machType: jsonifyArray(eqType, "Machinery_Type"),
            }));
            setData((prev) => ({
              ...prev,
              Machinery_Model: "",
              Machinary_Specs: "",
              Code: "",
              Serial_No: "",
              Machinery_Status: "",
            }));
            break;
          case "Machinery_Model":
            let eqModel = [];
            const sitesFilterEqsModel = siteData?.sitesResult
              ? siteData?.sitesResult?.filter(
                  (site) => site?.Machinery_Type === data.Machinery_Type
                )
              : [];
            sitesFilterEqsModel?.map((d) => {
              eqModel.push(d.Machinery_Model);
            });
            if (eqModel)
              eqModel = eqModel?.filter(
                (value, index, array) => array.indexOf(value) === index
              );
            setAllData((prev) => ({
              ...prev,
              machModel: jsonifyArray(eqModel, "Machinery_Model"),
            }));
            setData((prev) => ({
              ...prev,
              Machinary_Specs: "",
              Code: "",
              Serial_No: "",
              Machinery_Status: "",
            }));
            break;
          case "Machinary_Specs":
            let eq = [];
            const sitesFilterEqs = siteData?.sitesResult
              ? siteData?.sitesResult?.filter(
                  (site) => site?.Machinery_Model === data.Machinery_Model
                )
              : [];
            sitesFilterEqs?.map((d) => {
              eq.push(d.Machinary_Specs);
            });

            if (eq)
              eq = eq?.filter(
                (value, index, array) => array.indexOf(value) === index
              );
            setAllData((prev) => ({
              ...prev,
              machSpecs: jsonifyArray(eq, "Machinary_Specs"),
            }));
            setData((prev) => ({
              ...prev,
              Code: "",
              Serial_No: "",
              Machinery_Status: "",
            }));
            break;
          case "Code":
            let underCarrage = [];
            const sitesFilterUnderCarrage = siteData?.sitesResult
              ? siteData?.sitesResult?.filter(
                  (site) =>
                    site?.Machinary_Specs === data.Machinary_Specs &&
                    site?.Machinery_Model === data.Machinery_Model
                )
              : [];
            sitesFilterUnderCarrage?.map((d) => {
              underCarrage.push(d.Code);
            });

            if (underCarrage)
              underCarrage = underCarrage?.filter(
                (value, index, array) => array.indexOf(value) === index
              );
            setAllData((prev) => ({
              ...prev,
              code: jsonifyArray(underCarrage, "Code"),
            }));
            setData((prev) => ({
              ...prev,
              Serial_No: "",
              Machinery_Status: "",
            }));
            break;

          case "Serial_No":
            let serials = [];
            const sitesFilterSerials = siteData?.sitesResult
              ? siteData?.sitesResult?.filter(
                  (site) => site?.Code === data.Code
                )
              : [];
            sitesFilterSerials?.map((d) => {
              serials.push(d.Serial_No);
            });

            if (serials)
              serials = serials?.filter(
                (value, index, array) => array.indexOf(value) === index
              );
            setAllData((prev) => ({
              ...prev,
              serial: jsonifyArray(serials, "Serial_No"),
            }));
            setData((prev) => ({
              ...prev,
              Machinery_Status: "",
            }));
            break;

          case "Machinery_Status":
            // let status = [];
            // const sitesFilterStatus = siteData?.sitesResult
            //   ? siteData?.sitesResult
            //   : [];
            // sitesFilterStatus?.map((d) => {
            //   status.push(d.Machinery_Status);
            // });

            // if (status)
            //   status = status?.filter(
            //     (value, index, array) => array.indexOf(value) === index
            //   );
            setAllData((prev) => ({
              ...prev,
              machStatus: jsonifyArray(
                [
                  "Ready",
                  "Under Maintenance",
                  "Yard Service",
                  "New",
                  "Damaged",
                ],
                "Machinery_Status"
              ),
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
