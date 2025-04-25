import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

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
                  {
                    name: item?.Name,
                    id: item?.ID,
                    createdBy: item.CreatedBy,
                    users: viewUser,
                  },
                ],
              }
            : {
                ...result,
                [item?.Group]: [
                  {
                    name: item?.Name,
                    id: item?.ID,
                    createdBy: item.CreatedBy,
                    users: viewUser,
                  },
                ],
              };
        }
      });
      console.log(result);
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

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const url = `/api/v3/PowerBiView/${id}`;
      await axiosPrivate(url, { method: "DELETE" });
      await getData();
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
                  className="w-full text-black text-[10px] flex flex-row items-center justify-between"
                >
                  <div
                    className="hover:bg-white w-full px-3 p-1 cursor-pointer"
                    onClick={() => {
                      navigate(`/MiniPowerBi/${item?.id}`);
                    }}
                  >
                    <p>{item?.name}</p>
                  </div>

                  {[item.createdBy].includes(usersData[0].username) && (
                    <div className="flex flex-row items-center ">
                      <div
                        className="cursor-pointer hover:bg-white px-[6px] p-1 rounded-sm"
                        onClick={() => {
                          navigate(`/MiniPowerBi/Edit/${item?.id}`);
                        }}
                      >
                        <AiFillEdit />
                      </div>
                      <div
                        className="cursor-pointer hover:bg-white px-[6px]  p-1 rounded-sm"
                        onClick={() => handleDelete(item?.id)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  )}
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
