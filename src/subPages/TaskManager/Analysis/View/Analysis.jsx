import React, { useEffect, useState } from "react";

import { workshops } from "../../Tasks/Constants/constants";
import MainCard from "../Components/MainCard";

const storetoJSON = (store) => {
  let result = [];
  Object.keys(store).map((title) => {
    store[title].map((item) => {
      result.push({ ...item, category: title });
    });
  });
  return result;
};

const Analysis = ({ stores, copiedStores }) => {
  const [jsonStores, setJsonStores] = useState(null);
  useEffect(() => {
    const jsonData = storetoJSON(copiedStores);
    setJsonStores(jsonData);
  }, []);

  return (
    <>
      <div
        className="w-full h-[calc(90vh-35px)] flex flex-row justify-start items-start gap-2 px-2 overflow-x-scroll"
        id="cont"
      >
        {workshops.map(
          (workshop, i) =>
            jsonStores && (
              <MainCard
                key={i}
                workshop={workshop}
                stores={stores}
                copiedStores={copiedStores}
                jsonStores={jsonStores}
              />
            )
        )}
      </div>
    </>
  );
};

export default Analysis;
