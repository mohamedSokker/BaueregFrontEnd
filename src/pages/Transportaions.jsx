import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import "../Transport.css";
import { PageLoading } from "../components";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavContext } from "../contexts/NavContext";
import ConfirmData from "../components/Transport/ConfirmData";
import AddSite from "../components/Transport/AddSite";
import EditEqsTrans from "../components/Transport/EditEqsTrans";

const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Walmart",
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
      { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
    ],
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Indigo",
    items: [
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "Designing Data Intensive Applications",
      },
      { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "Atomic Habits" },
    ],
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "Lowes",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Workbench" },
      { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "Hammer" },
    ],
  },
];

const formatDate = (anyDate) => {
  let dt = new Date(anyDate);
  const year = dt.getFullYear();
  let day = dt.getDate().toString();
  let month = (Number(dt.getMonth()) + 1).toString();
  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  return `${year}-${month}-${day}`;
};

const Transportaions = () => {
  const { usersData, setError, setErrorData } = useNavContext();
  console.log(usersData);

  const [initStores, setInitStores] = useState([]);
  const [stores, setStores] = useState([]);
  const [transData, setTransData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  // const [isCanceled, setIsCanceled] = useState(false);
  const [isDragged, setIsDragged] = useState(false);
  const [bodyData, setBodyData] = useState({});
  const [message, setMessage] = useState(``);
  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [endDate, setEndDate] = useState(formatDate(new Date()));
  const [isAddSite, setIsAddSite] = useState(false);
  const [isEditEqsTrans, setIsEditEqsTrans] = useState(false);
  const [editEqsTransData, setEditEqsTransData] = useState({});

  // console.log(startDate, typeof startDate);

  console.log(transData);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getData = async () => {
      try {
        setError(false);
        setLoading(true);
        const url = `/api/v1/transportGetActiveSites`;
        const data = await axiosPrivate(url, { method: "POST" });
        setTransData(data?.data.eqsTrans);
        let result = {};
        let resultArray = [];
        data?.data?.eqsLoc.map((d) => {
          result[d.Location]
            ? (result[d.Location] = [
                ...result[d.Location],
                {
                  id: d?.ID.toString(),
                  name: d?.Equipment,
                  UnderCarrage_Type: d?.UnderCarrage_Type,
                  Equipment_Type: d?.Equipment_Type,
                  Status: "",
                },
              ])
            : (result[d.Location] = [
                {
                  id: d?.ID?.toString(),
                  name: d?.Equipment,
                  UnderCarrage_Type: d?.UnderCarrage_Type,
                  Equipment_Type: d?.Equipment_Type,
                  Status: "",
                },
              ]);
        });

        data?.data?.eqsTrans.map((d) => {
          if (!result[d.ToLocation]) {
            result[d.ToLocation] = [];
          }
        });

        Object.keys(result).map((r, i) => {
          resultArray.push({ id: i.toString(), name: r, items: result[r] });
        });
        setStores(resultArray);
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
    getData();
  }, []);

  const handleDragAndDrop = async (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...stores];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

      return setStores(reorderedStores);
    }
    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const storeSourceIndex = stores.findIndex(
      (store) => store.id === source.droppableId
    );
    const storeDestinationIndex = stores.findIndex(
      (store) => store.id === destination.droppableId
    );

    const newSourceItems = [...stores[storeSourceIndex].items];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...stores[storeDestinationIndex].items]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    // console.log({
    //   Equipment: deletedItem?.name,
    //   Location: stores[storeDestinationIndex]?.name,
    //   UnderCarrage_Type: deletedItem?.UnderCarrage_Type,
    //   Equipment_Type: deletedItem?.Equipment_Type,
    // });
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...stores];

    newStores[storeSourceIndex] = {
      ...stores[storeSourceIndex],
      items: newSourceItems,
    };
    newStores[storeDestinationIndex] = {
      ...stores[storeDestinationIndex],
      items: newDestinationItems,
    };

    setBodyData({
      Equipment: deletedItem?.name,
      FromLocation: stores[storeSourceIndex]?.name,
      ToLocation: stores[storeDestinationIndex]?.name,
      UnderCarrage_Type: deletedItem?.UnderCarrage_Type,
      Equipment_Type: deletedItem?.Equipment_Type,
      username: usersData[0]?.username,
    });

    setMessage(
      `Are you sure you want to transport Equipment ${deletedItem?.name} From ${stores[storeSourceIndex]?.name} to ${stores[storeDestinationIndex]?.name}`
    );

    setInitStores(newStores);
    if (storeSourceIndex === storeDestinationIndex) return;
    setIsDragged(true);
  };

  const addEqTrans = async (body) => {
    try {
      setError(false);
      setLoading(true);
      // let body = { ...bodyData };
      // body = {
      //   StartDate: startDate,
      //   EndDate: endDate,
      //   ...body,
      // };

      const url = `/api/v1/addEquipmentTrans`;
      const data = await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify(body),
      });
      let newData = [...transData];

      if (data?.data?.Type === "Added") {
        newData.push(data?.data);
      } else {
        newData = newData.filter((item) => data.data.ID !== item.ID);
        newData.unshift(data.data);
      }
      setTransData(newData);

      setStores(initStores);
      setLoading(false);
      setIsConfirmed(false);
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
      setIsConfirmed(false);
    }
  };

  const deleteEqTrans = async (id) => {
    try {
      setError(false);
      setLoading(true);

      const url = `/api/v1/deleteEqsTrans/${id}`;
      const data = await axiosPrivate(url, {
        method: "DELETE",
      });
      let newData = [...transData];
      newData = newData.filter((d) => d.ID !== id);
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

  useEffect(() => {
    if (isConfirmed) {
      let body = { ...bodyData };
      body = {
        StartDate: startDate,
        EndDate: endDate,
        ...body,
      };
      addEqTrans(body);
    }
  }, [isConfirmed]);

  return (
    <>
      {usersData[0].department === "Civil" && (
        <div className="bg-white w-full flex flex-row justify-end items-center text-white px-6 p-2 m-auto rounded-md">
          <TooltipComponent content={`Add Site`} position="BottomCenter">
            <button
              className="px-2 p-1 rounded-md bg-logoColor"
              type="button"
              onClick={() => setIsAddSite(true)}
            >
              +
            </button>
          </TooltipComponent>
        </div>
      )}

      <div
        className="bg-white w-[95vw] px-5 p-2 m-auto my-[3rem] rounded-md"
        style={{ boxShadow: "0 12px 16px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="header">
          <h1>Sites Transport Requests</h1>
        </div>
        <div className="w-full p-2 flex flex-row items-center justify-center border-b-1 border-logoColor">
          <p className="w-[calc(100%/7)] text-[16px] font-[800] text-logoColor px-4 p-2">
            Equipment
          </p>
          <p className="w-[calc(100%/7)] text-[16px] font-[800] text-logoColor px-4 p-2">
            From Site
          </p>
          <p className="w-[calc(100%/7)] text-[16px] font-[800] text-logoColor px-4 p-2">
            To Site
          </p>
          <p className="w-[calc(100%/7)] text-[16px] font-[800] text-logoColor px-4 p-2">
            Start Date
          </p>
          <p className="w-[calc(100%/7)] text-[16px] font-[800] text-logoColor px-4 p-2">
            End Date
          </p>
          <p className="w-[calc(100%/7)] text-[16px] font-[800] text-logoColor px-4 p-2">
            User
          </p>
          <p className="w-[calc(100%/7)] text-[16px] font-[800] text-logoColor px-4 p-2">
            Action
          </p>
        </div>
        {transData.map((d, i) => (
          <div
            className="w-full p-2 flex flex-row items-center justify-between border-b-1 border-logoColor"
            key={i}
          >
            <p className="w-[calc(100%/6)] text-[14px] px-4 p-2">
              {d.Equipment}
            </p>
            <p className="w-[calc(100%/6)] text-[14px] px-4 p-2">
              {d.FromLocation}
            </p>
            <p className="w-[calc(100%/6)] text-[14px] px-4 p-2">
              {d.ToLocation}
            </p>
            <p className="w-[calc(100%/6)] text-[14px] px-4 p-2">
              {formatDate(d.StartDate)}
            </p>
            <p className="w-[calc(100%/6)] text-[14px] px-4 p-2">
              {formatDate(d.EndDate)}
            </p>
            <p className="w-[calc(100%/6)] text-[14px] px-4 p-2">
              {JSON.parse(d?.Confirmed).join(",")}
            </p>
            {d.Status === "Confirmed" ? (
              <div className="w-[calc(100%/6)]  p-2 px-4  flex justify-start items-center">
                <p className="bg-green-700 text-white px-6 p-2 rounded-lg">
                  Confirmed
                </p>
              </div>
            ) : !JSON.parse(d?.Confirmed)?.includes(usersData[0].username) &&
              d.UserGroup === usersData[0].department ? (
              <div className="w-[calc(100%/6)] flex flex-row items-center justify-start gap-3 px-4 p-2">
                <TooltipComponent content={`Confirm`} position="BottomCenter">
                  <button
                    className="text-green-700 text-[20px]"
                    onClick={async () => {
                      let body = {
                        StartDate: d.StartDate,
                        EndDate: d.EndDate,
                        Equipment_Type: d.Equipment_Type,
                        Equipment: d.Equipment,
                        UnderCarrage_Type: d.UnderCarrage_Type,
                        FromLocation: d.FromLocation,
                        ToLocation: d.ToLocation,
                        Confirmed: d.Confirmed,
                        Status: d.Status,
                        username: usersData[0].username,
                      };
                      await addEqTrans(body);
                    }}
                  >
                    <GiConfirmed />
                  </button>
                </TooltipComponent>
                <TooltipComponent content={`Edit`} position="BottomCenter">
                  <button
                    className=" text-yellow-700 text-[20px]"
                    onClick={() => {
                      setEditEqsTransData(d);
                      setIsEditEqsTrans(true);
                    }}
                  >
                    <CiEdit />
                  </button>
                </TooltipComponent>
                <TooltipComponent content={`Delete`} position="BottomCenter">
                  <button
                    className="text-red-500 text-[20px]"
                    onClick={() => {
                      deleteEqTrans(d?.ID);
                    }}
                  >
                    <MdDelete />
                  </button>
                </TooltipComponent>
              </div>
            ) : (
              <div className="w-[calc(100%/6)]  p-2 px-4  flex justify-start items-center">
                <p className="bg-yellow-500 text-white px-6 p-2 rounded-lg">
                  Pending
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="layout__wrapper">
        {loading && <PageLoading />}
        {isDragged && (
          <ConfirmData
            message={message}
            setIsDragged={setIsDragged}
            setIsConfirmed={setIsConfirmed}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        )}
        {isAddSite && (
          <AddSite
            isAddSite={isAddSite}
            setIsAddSite={setIsAddSite}
            setLoading={setLoading}
            setStores={setStores}
            stores={stores}
          />
        )}
        {isEditEqsTrans && (
          <EditEqsTrans
            setIsEditEqsTrans={setIsEditEqsTrans}
            setLoading={setLoading}
            item={editEqsTransData}
            transData={transData}
            setTransData={setTransData}
          />
        )}
        {usersData[0].department === "Civil" && (
          <div className="card">
            <DragDropContext onDragEnd={handleDragAndDrop}>
              <div className="header">
                <h1>Sites Equipments List</h1>
              </div>
              <Droppable droppableId="ROOT" type="group">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {stores.map((store, index) => (
                      <Draggable
                        draggableId={store.id}
                        index={index}
                        key={store.id}
                      >
                        {(provided) => (
                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <StoreList {...store} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}
      </div>
    </>
  );
};

function StoreList({ name, items, id }) {
  const [extended, setExtended] = useState({ name: name, isExtend: false });
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="mb-2"
        >
          <button
            className="store-container relative flex justify-center items-center w-full"
            onClick={() => {
              setExtended((prev) => ({
                ...prev,
                name: name,
                isExtend: !prev.isExtend,
              }));
            }}
          >
            <h3>{name}</h3>
            <div className="absolute right-2">
              {!extended.isExtend ? (
                <AiOutlineCaretDown />
              ) : (
                <AiOutlineCaretUp />
              )}
            </div>
          </button>
          {extended?.name && name === extended?.name && extended?.isExtend && (
            <div className="items-container">
              {items.map((item, index) => (
                <Draggable draggableId={item.id} index={index} key={item.id}>
                  {(provided) => (
                    <div
                      className="item-container"
                      style={{
                        backgroundColor:
                          item.Status === "New"
                            ? "green"
                            : item.Status === "Removed"
                            ? "red"
                            : "white",
                      }}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <h4>{item.name}</h4>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
}

export default Transportaions;
