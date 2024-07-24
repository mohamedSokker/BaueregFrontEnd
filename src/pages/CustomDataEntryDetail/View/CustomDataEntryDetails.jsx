import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GrTable } from "react-icons/gr";
import { BsDatabaseAdd } from "react-icons/bs";
import { SiMicrosoftexcel } from "react-icons/si";
import { CiWarning } from "react-icons/ci";

import { logoColor } from "../../../BauerColors";
import { useNavContext } from "../../../contexts/NavContext";
// import { DBdata } from "../Models/model";
import DataEntry from "../Components/DataEntry";
import Table from "../Components/Table";
import ManageFile from "../Components/ManageFile";
import UploadFiles from "../Components/UploadFiles";
import UnAuthorized from "../../UnAuthorized";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { PageLoading } from "../../../components";

const CustomDataEntryDetails = () => {
  const { id } = useParams();
  const { closeSmallSidebar, usersData } = useNavContext();
  const axiosPrivate = useAxiosPrivate();

  const [targetData, setTargetData] = useState(null);
  const [currentCat, setCurrentCat] = useState("Data Entry");
  const [DBdata, setDBData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(targetData);
  //   console.log(id);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const url = `/api/v3/ManageDataEntry`;
        const response = await axiosPrivate(url, { method: "GET" });
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

  useEffect(() => {
    if (DBdata) {
      const tData = DBdata?.filter((item) => Number(item.ID) === Number(id));
      console.log(tData);
      setTargetData([
        {
          Name: tData[0]?.Name,
          Users: JSON.parse(tData[0]?.Users),
          Exist: tData[0]?.Exist,
          Fields: JSON.parse(tData[0]?.Fields),
          Schemas: JSON.parse(tData[0]?.Schemas),
        },
      ]);
    }
  }, [DBdata]);
  return (
    <div
      className={`w-full flex flex-col bg-gray-100 Main--Page dark:bg-background-logoColor h-full relative`}
      onClick={closeSmallSidebar}
    >
      {isLoading && <PageLoading message={`Loading Data...`} />}
      {(((usersData[0]?.roles?.Editor?.CustomDataEntry ||
        usersData[0]?.roles?.User?.CustomDataEntry) &&
        targetData?.[0]?.Users?.includes(usersData[0]?.username)) ||
        usersData[0]?.roles.Admin) && (
        <div className="flex flex-row justify-around h-[10%]">
          <div
            className="w-[20%] h-[100%] px-2 py-4 flex justify-center items-center cursor-pointer gap-2 text-green-800"
            style={{
              borderBottomWidth: 1,
              borderBottomColor:
                currentCat === "Data Entry" ? logoColor : "rgb(243,244,246)",
            }}
            onClick={() => setCurrentCat("Data Entry")}
          >
            <BsDatabaseAdd />
            <p className="text-black text-[14px]">Data Entry</p>
          </div>
          <div
            className="w-[20%] h-[100%] px-2 py-4 flex  justify-center items-center cursor-pointer gap-2 text-orange-600"
            style={{
              borderBottomWidth: 1,
              borderBottomColor:
                currentCat === "Table" ? logoColor : "rgb(243,244,246)",
            }}
            onClick={() => setCurrentCat("Table")}
          >
            <GrTable />
            <p className="text-black text-[14px]">Table</p>
          </div>

          <div
            className="w-[20%] h-[100%] px-2 py-4 flex  justify-center items-center cursor-pointer gap-2 text-green-600"
            style={{
              borderBottomWidth: 1,
              borderBottomColor:
                currentCat === "File Manager" ? logoColor : "rgb(243,244,246)",
            }}
            onClick={() => setCurrentCat("File Manager")}
          >
            <SiMicrosoftexcel />
            <p className="text-black text-[14px]">File Manager</p>
          </div>

          <div
            className="w-[20%] h-[100%] px-2 py-4 flex  justify-center items-center cursor-pointer gap-2 text-green-600"
            style={{
              borderBottomWidth: 1,
              borderBottomColor:
                currentCat === "Upload Files" ? logoColor : "rgb(243,244,246)",
            }}
            onClick={() => setCurrentCat("Upload Files")}
          >
            <SiMicrosoftexcel />
            <p className="text-black text-[14px]">Upload Files</p>
          </div>
        </div>
      )}

      {((usersData[0]?.roles?.Editor?.CustomDataEntry ||
        usersData[0]?.roles?.User?.CustomDataEntry) &&
        targetData?.[0]?.Users?.includes(usersData[0]?.username)) ||
      usersData[0]?.roles.Admin ? (
        <div className="flex flex-row flex-wrap w-[100vw] h-[90%] bg-gray-100 p-4">
          {currentCat === "Data Entry" ? (
            <DataEntry targetData={targetData} />
          ) : currentCat === "Table" ? (
            <Table targetData={targetData} />
          ) : currentCat === "File Manager" ? (
            <ManageFile targetData={targetData} />
          ) : (
            <UploadFiles targetData={targetData} />
          )}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center p-4">
          <div
            className=" bg-red-600 h-20 flex justify-center items-center flex-row mb-5 mt-2 rounded-lg"
            style={{ color: "white", width: "90%" }}
          >
            <CiWarning className="text-[40px] font-extrabold" />
            <p className="ml-5 text-xl font-semibold">
              Unauthorized to see this page!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDataEntryDetails;
