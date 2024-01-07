import React, { useEffect, useState } from "react";

import "../../Transport.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavContext } from "../../contexts/NavContext";

const formatDate = (anyDate) => {
  let dt = new Date(anyDate);
  const year = dt.getFullYear();
  let day = dt.getDate().toString();
  let month = (Number(dt.getMonth()) + 1).toString();
  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  return `${year}-${month}-${day}`;
};

const txtStyle =
  "border-b-2 border-gray-400 focus:border-logoColor outline-none p-2 text-[12px]";

const EditEqsTrans = ({
  item,
  setIsEditEqsTrans,
  setLoading,
  transData,
  setTransData,
}) => {
  const { usersData, setError, setErrorData } = useNavContext();

  const [data, setData] = useState({
    StartDate: formatDate(item.StartDate),
    EndDate: formatDate(item.EndDate),
    Equipment_Type: item.Equipment_Type,
    Equipment: item.Equipment,
    UnderCarrage_Type: item.UnderCarrage_Type,
    FromLocation: item.FromLocation,
    ToLocation: item.ToLocation,
    Confirmed: JSON.parse(item.Confirmed),
    UserGroup: item.UserGroup,
    username: usersData[0].username,
  });
  const [isCanceled, setIsCanceled] = useState(false);

  console.log(data);

  //   const [site, setSite] = useState(null);
  //   const [siteAr, setSiteAr] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  const handleConfirm = async () => {
    try {
      setError(false);
      setLoading(true);
      const url = `/api/v1/editEqsTrans/${item.ID}`;
      const responseData = await axiosPrivate(url, {
        method: "PUT",
        data: JSON.stringify(data),
      });
      let newData = [...transData];
      newData = newData.filter((d) => d.ID !== item.ID);
      newData.unshift(responseData.data);
      setTransData(newData);
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
        className=" w-[25%] max-h-[60%] overflow-auto bg-white relative z-[1001] "
        style={
          !isCanceled
            ? {
                boxShadow: "0 12px 16px rgba(0, 0, 0, 0.7)",
                transform: "scale(1)",
                transition: "all 0.5s ease-in-out",
              }
            : {
                boxShadow: "0 12px 16px rgba(0, 0, 0, 0.7)",
                transform: "scale(0)",
                transition: "all 0.5s ease-in-out",
              }
        }
      >
        <div className="w-full bg-logoColor p-2 px-6 flex justify-center items-center text-white text-[18px] font-[800]">
          Edit Transportation Item
        </div>
        <div className="flex flex-col w-full">
          <div className="w-full flex flex-row justify-between px-6 p-2 items-center">
            <label htmlFor="startDate" className="text-[14px] font-[700]">
              Start Date
            </label>
            <input
              type="date"
              className={txtStyle}
              name="startDate"
              value={data.StartDate}
              onChange={(e) =>
                setData((prev) => ({ ...prev, StartDate: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="w-full flex flex-row justify-between px-6 p-2 items-center">
            <label htmlFor="endDate" className="text-[14px] font-[700]">
              End Date
            </label>
            <input
              type="date"
              className={txtStyle}
              name="endDate"
              value={data.EndDate}
              onChange={(e) =>
                setData((prev) => ({ ...prev, EndDate: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="w-full flex flex-row justify-between px-6 p-2 items-center">
            <label htmlFor="eqType" className="text-[14px] font-[700]">
              Equipment Type
            </label>
            <input
              type="text"
              disabled={true}
              className={`${txtStyle} opacity-50`}
              name="eqType"
              value={data.Equipment_Type}
              onChange={(e) =>
                setData((prev) => ({ ...prev, Equipment_Type: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="w-full flex flex-row justify-between px-6 p-2 items-center">
            <label htmlFor="eq" className="text-[14px] font-[700]">
              Equipment
            </label>
            <input
              type="text"
              disabled={true}
              className={`${txtStyle} opacity-50`}
              name="eq"
              value={data.Equipment}
              onChange={(e) =>
                setData((prev) => ({ ...prev, Equipment: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="w-full flex flex-row justify-between px-6 p-2 items-center">
            <label htmlFor="underCarType" className="text-[14px] font-[700]">
              UnderCarrage Type
            </label>
            <input
              type="text"
              disabled={true}
              className={`${txtStyle} opacity-50`}
              name="underCarType"
              value={data.UnderCarrage_Type}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  UnderCarrage_Type: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="w-full flex flex-row justify-between px-6 p-2 items-center">
            <label htmlFor="fromSite" className="text-[14px] font-[700]">
              From Site
            </label>
            <input
              type="text"
              disabled={true}
              className={`${txtStyle} opacity-50`}
              name="fromSite"
              value={data.FromLocation}
              onChange={(e) =>
                setData((prev) => ({ ...prev, FromLocation: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="w-full flex flex-row justify-between px-6 p-2 items-center">
            <label htmlFor="toSite" className="text-[14px] font-[700]">
              To Site
            </label>
            <input
              type="text"
              disabled={true}
              className={`${txtStyle} opacity-50`}
              name="toSite"
              value={data.ToLocation}
              onChange={(e) =>
                setData((prev) => ({ ...prev, ToLocation: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="w-full flex flex-row justify-between items-center p-4 px-6">
          <button
            className=" text-green-800 font-[900]"
            onClick={() => {
              setIsCanceled(true);
              setTimeout(async () => {
                setIsEditEqsTrans(false);
                await handleConfirm();
              }, 500);
            }}
          >
            Confirm
          </button>
          <button
            className=" text-red-600 font-[600]"
            onClick={() => {
              setIsCanceled(true);
              setTimeout(() => {
                setIsEditEqsTrans(false);
              }, 500);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEqsTrans;
