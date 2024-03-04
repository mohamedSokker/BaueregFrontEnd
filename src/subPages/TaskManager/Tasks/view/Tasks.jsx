import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";

// import { stores } from "../../../../data/Kanban/tasks";
import MainCard from "../components/MainCard";
import useTask from "../controllers/controller";
import PageLoading from "../../../../components/PageLoading";
import Filter from "../components/Filter";

const storeModel = {
  "To Do": [],
  InProgress: [],
  "Waiting Inspection": [],
  Inspected: [],
  Rejected: [],
  Done: [],
};

const storetoJSON = async (store) => {
  let result = [];
  Object.keys(store).map((title) => {
    store[title].map((item) => {
      result.push({ ...item, category: title });
    });
  });
  return result;
};

const Tasks = ({
  stores,
  setStores,
  users,
  fullusers,
  newStore,
  setNewStore,
  count,
  setCount,
}) => {
  const { loading, message, handleSave, handleDelete } = useTask(
    stores,
    setStores
  );

  const [copiedStores, setCopiedStores] = useState(storeModel);
  const [isFilterCard, setIsFilterCard] = useState(false);
  const [minDuration, setMinDuration] = useState(0);
  const [maxDuration, setMaxDuration] = useState(10);

  useEffect(() => {
    setCopiedStores(stores);

    const getMinDuration = async () => {
      const jsonData = await storetoJSON(stores);
      const durs = jsonData.map((dur) => dur.duration && dur.duration);
      const minDur = Math.min.apply(null, durs);
      console.log(minDur);
      setMinDuration(minDur);
    };
    const getMaxDuration = async () => {
      const jsonData = await storetoJSON(stores);
      const durs = jsonData.map((dur) => dur.duration && dur.duration);
      const maxDur = Math.max.apply(null, durs);
      console.log(maxDur);
      setMaxDuration(maxDur);
    };
    getMinDuration();
    getMaxDuration();
  }, []);
  return (
    <>
      {loading && <PageLoading message={message} />}
      {isFilterCard && (
        <Filter
          newStore={newStore}
          setNewStore={setNewStore}
          setIsFilterCard={setIsFilterCard}
          copiedStores={copiedStores}
          setStores={setStores}
          stores={stores}
          minDuration={minDuration}
          maxDuration={maxDuration}
          count={count}
          setCount={setCount}
        />
      )}
      <div className="w-full h-[6vh] p-2 flex items-center">
        <div className="flex flex-row justify-start gap-2 text-black text-[12px] items-center py-1 px-3 w-full rounded-[8px] border-1 border-gray-300">
          <div
            className="hover:cursor-pointer"
            onClick={() => setIsFilterCard(true)}
          >
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
          titleBorderColor="yellow"
          title="To Do"
          id="To Do"
          stores={stores}
          users={users}
          fullusers={fullusers}
          w={"300px"}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
        <MainCard
          titleBorderColor="blue"
          title="InProgress"
          id="InProgress"
          stores={stores}
          users={users}
          fullusers={fullusers}
          w={"300px"}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
        <MainCard
          titleBorderColor="orange"
          title="Waiting Inspection"
          id="Waiting Inspection"
          stores={stores}
          users={users}
          fullusers={fullusers}
          w={"300px"}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
        <MainCard
          titleBorderColor="red"
          title="Rejected"
          id="Rejected"
          stores={stores}
          users={users}
          fullusers={fullusers}
          w={"300px"}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
        <MainCard
          titleBorderColor="green"
          title="Done"
          id="Done"
          stores={stores}
          users={users}
          fullusers={fullusers}
          w={"300px"}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default Tasks;
