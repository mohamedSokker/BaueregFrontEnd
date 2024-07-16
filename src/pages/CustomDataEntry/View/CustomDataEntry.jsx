import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiWarning } from "react-icons/ci";

import { useNavContext } from "../../../contexts/NavContext";
// import { DBdata } from "../../CustomDataEntryDetail/Models/model";
import UnAuthorized from "../../UnAuthorized";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const CustomDataEntry = () => {
  const { closeSmallSidebar, usersData } = useNavContext();
  const axiosPrivate = useAxiosPrivate();
  const [DBdata, setDBData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const url = `/api/v3/ManageDataEntry`;
        const response = await axiosPrivate(url, { method: "GET" });
        console.log(response?.data);
        setDBData(response?.data);
      } catch (err) {
        console.log(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : err?.message
        );
      }
    };
    getData();
  }, []);

  const handleClick = (data) => {
    navigate(`/CustomDataEntry/${data.ID}`);
  };
  return (
    <div
      className="w-full bg-gray-100 rounded-xl h-[100%] Main--Content flex flex-col items-start justify-start dark:bg-background-logoColor"
      onClick={closeSmallSidebar}
    >
      <div className="w-full flex flex-row items-start justify-center p-4">
        Choose Category
      </div>
      <div className="w-full flex flex-row justify-start items-start p-4 gap-4 flex-wrap">
        {DBdata &&
          DBdata?.map(
            (item, i) =>
              ((usersData[0]?.roles?.Editor?.CustomDataEntry ||
                usersData[0]?.roles?.User?.CustomDataEntry) &&
                item?.Users?.includes(usersData[0]?.username)) ||
              (usersData[0]?.roles.Admin && (
                <div
                  className="border-1 border-gray-300 px-12 py-2 hover:cursor-pointer text-[12px]"
                  key={i}
                  onClick={() => handleClick(item)}
                >
                  {item?.Name}
                </div>
              ))
          )}
      </div>
    </div>
  );
};

export default CustomDataEntry;
