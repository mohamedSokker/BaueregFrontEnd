import React from "react";
import { IoFilter } from "react-icons/io5";

// import { stores } from "../../../../data/Kanban/tasks";
import MainCard from "../components/MainCard";
import useWorkshop from "../Controllers/controller";
import PageLoading from "../../../../components/PageLoading";
import { useNavContext } from "../../../../contexts/NavContext";

const Workshop = ({ stores, setStores }) => {
  const { usersData } = useNavContext();
  const { loading, message, handleSave } = useWorkshop(
    stores,
    setStores,
    usersData
  );
  return (
    <>
      {loading && <PageLoading message={message} />}
      <div className="w-full h-[6vh] p-2 flex items-center">
        <div className="flex flex-row justify-start gap-2 text-black text-[12px] items-center py-1 px-3 w-full rounded-[8px] border-1 border-gray-300">
          <div className="hover:cursor-pointer">
            <IoFilter />
          </div>
          <p>All</p>
        </div>
      </div>
      <div
        className="w-full h-[calc(84vh-35px)] flex flex-row justify-start items-start gap-2 px-2 overflow-x-scroll"
        id="cont"
      >
        <MainCard
          titleBorderColor="blue"
          title="InProgress"
          id="InProgress"
          stores={stores}
          w={"100%"}
          handleSave={handleSave}
        />
      </div>
    </>
  );
};

export default Workshop;
