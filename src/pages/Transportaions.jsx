import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

import "../Transport.css";
import { PageLoading } from "../components";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavContext } from "../contexts/NavContext";

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

const Transportaions = () => {
  const { usersData, setError, setErrorData } = useNavContext();

  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getData = async () => {
      try {
        setError(false);
        setLoading(true);
        const url = `/api/v1/transportGetActiveSites`;
        const data = await axiosPrivate(url, { method: "POST" });
        let eqsTrans = data?.data.eqsTrans;
        let result = {};
        let resultArray = [];
        let flagObj = {};
        data?.data?.eqsLoc.map((d) => {
          let status = ``;
          let eqsTransData = {};
          eqsTrans.map((eqsTransd) => {
            status = ``;
            eqsTransData = {};
            if (
              eqsTransd.Location === d.Location &&
              !flagObj[eqsTransd?.Equipment]
            ) {
              flagObj[eqsTransd?.Equipment] = eqsTransd.Location;
              status = ``;
              eqsTransData = {
                id: eqsTransd?.ID.toString(),
                name: eqsTransd?.Equipment,
                UnderCarrage_Type: eqsTransd?.UnderCarrage_Type,
                Equipment_Type: eqsTransd?.Equipment_Type,
                Status: `New`,
              };
              //   eqsTrans = eqsTrans.filter((d) => d.ID !== eqsTransd.ID);
            } else if (
              eqsTransd.Equipment === d.Equipment &&
              eqsTransd.Location !== d.Location
            ) {
              status = `Removed`;
            }
          });
          result[d.Location]
            ? (result[d.Location] = [
                ...result[d.Location],
                {
                  id: d?.ID.toString(),
                  name: d?.Equipment,
                  UnderCarrage_Type: d?.UnderCarrage_Type,
                  Equipment_Type: d?.Equipment_Type,
                  Status: status,
                },
              ])
            : (result[d.Location] = [
                {
                  id: d?.ID?.toString(),
                  name: d?.Equipment,
                  UnderCarrage_Type: d?.UnderCarrage_Type,
                  Equipment_Type: d?.Equipment_Type,
                  Status: status,
                },
              ]);

          eqsTransData.Status &&
            (result[d.Location] = [eqsTransData, ...result[d.Location]]);
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

    // if (type === "group") {
    //   const reorderedStores = [...stores];

    //   const storeSourceIndex = source.index;
    //   const storeDestinatonIndex = destination.index;

    //   const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
    //   reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

    //   return setStores(reorderedStores);
    // }
    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const storeSourceIndex = stores.findIndex(
      (store) => store.id === source.droppableId
    );
    const storeDestinationIndex = stores.findIndex(
      (store) => store.id === destination.droppableId
    );

    // const storeSourceItem = stores.find(
    //   (store) => store.id === source.droppableId
    // );
    // const storeDestinationItem = stores.find(
    //   (store) => store.id === destination.droppableId
    // );

    // console.log(storeSourceItem, storeDestinationItem);

    const newSourceItems = [...stores[storeSourceIndex].items];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...stores[storeDestinationIndex].items]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    console.log({
      Equipment: deletedItem?.name,
      Location: stores[storeDestinationIndex]?.name,
      UnderCarrage_Type: deletedItem?.UnderCarrage_Type,
      Equipment_Type: deletedItem?.Equipment_Type,
    });
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

    setStores(newStores);

    if (storeSourceIndex === storeDestinationIndex) return;

    try {
      setError(false);
      setLoading(true);
      const bodyData = {
        Equipment: deletedItem?.name,
        Location: stores[storeDestinationIndex]?.name,
        UnderCarrage_Type: deletedItem?.UnderCarrage_Type,
        Equipment_Type: deletedItem?.Equipment_Type,
        username: usersData[0]?.username,
      };
      const url = `/api/v1/addEquipmentTrans`;
      const data = await axiosPrivate(url, {
        method: "POST",
        data: JSON.stringify(bodyData),
      });
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
      }, 3000);
      setLoading(false);
    }
  };

  return (
    <div className="layout__wrapper">
      {loading && <PageLoading />}
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
    </div>
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
              <AiOutlineCaretDown />
            </div>
          </button>
          {extended?.name && name === extended?.name && extended?.isExtend && (
            <div className="items-container">
              {items.map((item, index) => (
                <Draggable draggableId={item.id} index={index} key={index}>
                  {(provided) => (
                    <div
                      className="item-container"
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
