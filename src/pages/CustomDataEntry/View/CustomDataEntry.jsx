import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useNavContext } from "../../../contexts/NavContext";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import PageLoading from "../../../components/PageLoading";

const CustomDataEntry = () => {
  const { closeSmallSidebar, usersData } = useNavContext();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [DBdata, setDBData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const url = `/api/v3/ManageDataEntry`;
        const response = await axiosPrivate(url, { method: "GET" });
        console.log(response?.data);
        setDBData(response?.data);
        setIsLoading(false);
      } catch (err) {
        console.log(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : err?.message
        );
        setIsLoading(false);
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
      {isLoading && <PageLoading message={`Loading Data...`} />}
      <div className="w-full flex flex-row items-start justify-center p-4">
        Choose Category
      </div>
      <div className="w-full flex flex-row justify-start items-start p-4 gap-4 flex-wrap">
        {DBdata &&
          DBdata?.map(
            (item, i) =>
              (((usersData[0]?.roles?.Editor?.CustomDataEntry ||
                usersData[0]?.roles?.User?.CustomDataEntry) &&
                item?.Users?.includes(usersData[0]?.username)) ||
                usersData[0]?.roles.Admin) && (
                <div
                  className="border-1 border-gray-300 px-12 py-2 hover:cursor-pointer text-[12px]"
                  key={i}
                  onClick={() => handleClick(item)}
                >
                  {item?.Name}
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default CustomDataEntry;
