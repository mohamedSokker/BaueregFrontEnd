import React from "react";
import { IoFilter } from "react-icons/io5";

// import { stores } from "../../../../data/Kanban/tasks";
import MainCard from "../Components/MainCard";
import usePlan from "../Controllers/controller";
import PageLoading from "../../../../components/PageLoading";
import Filter from "../Components/Filter";
import useFilter from "../Controllers/Planningcontroller";

const Planning = ({
  stores,
  setStores,
  users,
  fullusers,
  copiedStores,
  setCopiedStores,
}) => {
  const { loading, message, handleSave, handleDelete } = usePlan(
    stores,
    setStores
  );

  const {
    count,
    setCount,
    isFilterCard,
    setIsFilterCard,
    minDuration,
    maxDuration,
    minDate,
    setMinDate,
    maxDate,
    setMaxDate,
    currentDate,
    setCurrentDate,
    currentDuration,
    setCurrentDuration,
    filteredData,
    setFilteredData,
    newStore,
    setNewStore,
    copiedNewStore,
  } = useFilter(stores, setStores, copiedStores, setCopiedStores);

  // console.log(stores);
  return (
    <>
      {loading && <PageLoading message={message} />}
      {isFilterCard && (
        <Filter
          newStore={newStore}
          setNewStore={setNewStore}
          copiedNewStore={copiedNewStore}
          setIsFilterCard={setIsFilterCard}
          copiedStores={copiedStores}
          setStores={setStores}
          stores={stores}
          minDuration={minDuration}
          maxDuration={maxDuration}
          count={count}
          setCount={setCount}
          currentDuration={currentDuration}
          setCurrentDuration={setCurrentDuration}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
          minDate={minDate}
          setMinDate={setMinDate}
          maxDate={maxDate}
          setMaxDate={setMaxDate}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
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
          titleBorderColor="cyan"
          title="Inspected"
          id="Inspected"
          stores={stores}
          w={"300px"}
          shrink={true}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
        <MainCard
          titleBorderColor="yellow"
          title="To Do"
          id="To Do"
          stores={stores}
          w={"300px"}
          shrink={false}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
        <MainCard
          titleBorderColor="blue"
          title="InProgress"
          id="InProgress"
          stores={stores}
          w={"300px"}
          shrink={false}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
        <MainCard
          titleBorderColor="orange"
          title="Waiting Inspection"
          id="Waiting Inspection"
          stores={stores}
          w={"300px"}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
        {/* <MainCard
          titleBorderColor="red"
          title="Delayed"
          id="Delayed"
          stores={stores}
          w={"300px"}
        /> */}
        <MainCard
          titleBorderColor="red"
          title="Rejected"
          id="Rejected"
          stores={stores}
          w={"300px"}
          shrink={false}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
        <MainCard
          titleBorderColor="green"
          title="Done"
          id="Done"
          stores={stores}
          w={"300px"}
          shrink={false}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default Planning;
