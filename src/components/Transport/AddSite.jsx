import React, { useEffect, useState } from "react";

import "../../Transport.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavContext } from "../../contexts/NavContext";

const AddSite = ({ setIsAddSite, setLoading, setStores, stores }) => {
  const { setError, setErrorData } = useNavContext();

  const [site, setSite] = useState(null);
  const [siteAr, setSiteAr] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  const handleConfirm = async () => {
    try {
      setError(false);
      setLoading(true);
      const body = { Location: site, "Location_Ar ": siteAr };
      const url = `/api/v1/Location_Bauer`;
      await axiosPrivate(url, { method: "POST", data: JSON.stringify(body) });
      setStores((prev) => [
        ...prev,
        { id: stores.length.toString(), name: site, items: [] },
      ]);
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
        setTimeout(() => {
          setErrorData([]);
        }, 1000);
      }, 5000);
      setLoading(false);
    }
  };
  return (
    <div
      className="fixed opacity-100 w-screen h-screen flex flex-col items-center justify-center left-0 top-0"
      style={{ zIndex: "1000" }}
    >
      <div className="absolute  w-screen h-screen flex flex-col items-center justify-center left-0 top-0 z-[1000] overlay"></div>
      <div
        className=" w-[25%] bg-white relative z-[1001] "
        style={{ boxShadow: "0 12px 16px rgba(0, 0, 0, 0.7)" }}
      >
        <div
          className="w-full bg-logoColor p-2 px-6 flex justify-center items-center text-white text-[18px] font-[800]"
          // style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
        >
          Add Site
        </div>
        {/* <div className="w-full text-[16px] font-[600] px-6 p-2 flex items-center">
          {message}
        </div> */}
        <div className="flex flex-col w-full">
          <div className="w-full flex flex-row justify-between px-6 p-2 items-center">
            <label htmlFor="site" className="text-[14px] font-[700]">
              Site
            </label>
            <input
              type="text"
              className="border-1 border-logoColor rounded-md outline-none p-2 text-[10px]"
              name="site"
              value={site}
              onChange={(e) => setSite(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="w-full flex flex-row justify-between px-6 p-2 items-center">
            <label htmlFor="siteArabic" className="text-[14px] font-[700]">
              Site Arabic
            </label>
            <input
              type="text"
              className="border-1 border-logoColor rounded-md outline-none p-2 text-[10px]"
              name="siteArabic"
              value={siteAr}
              onChange={(e) => setSiteAr(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex flex-row justify-between items-center p-4 px-6">
          <button
            className=" text-green-800 font-[900]"
            onClick={() => {
              handleConfirm();
              setIsAddSite(false);
            }}
          >
            Confirm
          </button>
          <button
            className=" text-red-600 font-[600]"
            onClick={() => setIsAddSite(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSite;
