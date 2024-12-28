import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { PageLoading } from "../../../components";
import { useNavContext } from "../../../contexts/NavContext";

const MiniPowerBiCat = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { usersData } = useNavContext();

  const [loading, setLoading] = useState(false);
  const [viewData, setViewData] = useState([]);

  console.log(viewData);

  const getData = async () => {
    try {
      setLoading(true);
      const url = `/api/v3/PowerBiView`;
      const responseData = await axiosPrivate(url, { method: "GET" });
      const viewDataJSON = responseData?.data;
      let result = {};
      viewDataJSON?.map((item) => {
        const createdUser = item.CreatedBy;
        const viewUser = JSON.parse(item.UsersToView)?.Users;

        if ([createdUser, ...viewUser].includes(usersData[0].username)) {
          result = result?.[item?.Group]
            ? {
                ...result,
                [item?.Group]: [
                  ...result?.[item?.Group],
                  { name: item?.Name, id: item?.ID },
                ],
              }
            : {
                ...result,
                [item?.Group]: [{ name: item?.Name, id: item?.ID }],
              };
        }
      });
      setViewData(result);
      setLoading(false);
    } catch (err) {
      console.log(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full flex flex-col px-4 bg-gray-100 Main--Page dark:bg-background-logoColor h-full relative text-[14px]">
      {loading && <PageLoading message={`Initializing...`} />}

      <div className="w-full h-full overflow-y-scroll flex flex-row flex-wrap justify-start items-start py-4 px-2 gap-2">
        {Object.keys(viewData)?.map((el, idx) => (
          <div
            key={idx}
            className="w-[150px] max-h-[150px] rounded-[4px] overflow-hidden"
          >
            <div className="w-full h-[30%] bg-logoColor text-white p-1 px-2 text-[12px] font-[600]">
              {el}
            </div>
            <div className="w-full h-[70%] bg-gray-300 overflow-y-scroll">
              {viewData?.[el]?.map((item, i) => (
                <div
                  key={i}
                  className="w-full p-1 text-black text-[10px] px-3 cursor-pointer hover:bg-white"
                  onClick={() => {
                    navigate(`/MiniPowerBi/${item?.id}`);
                  }}
                >
                  {item?.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniPowerBiCat;
