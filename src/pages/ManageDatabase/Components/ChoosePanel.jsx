import React from "react";
import {
  MdOutlineSchema,
  MdGetApp,
  MdEdit,
  MdOutlineDeleteOutline,
  MdDeleteForever,
} from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { BsDatabaseFillGear } from "react-icons/bs";

const ChoosePanel = ({
  item,
  setIsChoose,
  setCategory,
  getTableData,
  setSelectedTable,
}) => {
  return (
    <div
      className="absolute z-[11] top-[0px] right-0 w-[150px] bg-white rounded-[8px] p-2 flex flex-col justify-center items-center"
      style={{
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      }}
    >
      <button
        className="w-full hover:bg-gray-200 flex flex-row items-center py-1 px-2 gap-2 rounded-[4px]"
        onClick={() => {
          setCategory("Get Schema");
          setSelectedTable(item?.TABLE_NAME);
          setIsChoose((prev) => ({
            [item?.TABLE_NAME]: !prev?.[item?.TABLE_NAME],
          }));
        }}
      >
        <MdOutlineSchema color="rgba(214,59,59,1)" size={14} />
        <p className="text-[10px] text-[rgba(214,59,59,1)]">Get Schema</p>
      </button>

      <button
        className="w-full hover:bg-gray-200 flex flex-row items-center py-1 px-2 gap-2 rounded-md"
        onClick={() => {
          setCategory("Get Data Entry");
          setSelectedTable(item?.TABLE_NAME);
          setIsChoose((prev) => ({
            [item?.TABLE_NAME]: !prev?.[item?.TABLE_NAME],
          }));
        }}
      >
        <BsDatabaseFillGear color="rgb(37,99,235)" size={14} />
        <p className="text-[10px] text-blue-600">Get Data Entry</p>
      </button>

      <button
        className="w-full hover:bg-gray-200 flex flex-row items-center py-1 px-2 gap-2 rounded-md"
        onClick={() => {
          setCategory("Get Data");
          setSelectedTable(item?.TABLE_NAME);
          // getTableData(item?.TABLE_NAME);
          setIsChoose((prev) => ({
            [item?.TABLE_NAME]: !prev?.[item?.TABLE_NAME],
          }));
        }}
      >
        <MdGetApp color="rgb(55,65,81)" size={14} />
        <p className="text-[10px] text-gray-700">Get Data</p>
      </button>

      <button
        className="w-full hover:bg-gray-200 flex flex-row items-center py-1 px-2 gap-2 rounded-md"
        onClick={() => {
          setCategory("Insert Query");
          setSelectedTable(item?.TABLE_NAME);
          setIsChoose((prev) => ({
            [item?.TABLE_NAME]: !prev?.[item?.TABLE_NAME],
          }));
        }}
      >
        <IoMdAdd color="rgb(22,163,74)" size={14} />
        <p className="text-[10px] text-green-600">Insert Query</p>
      </button>

      <button
        className="w-full hover:bg-gray-200 flex flex-row items-center py-1 px-2 gap-2 rounded-md"
        onClick={() => {
          setCategory("Update Query");
          setSelectedTable(item?.TABLE_NAME);
          setIsChoose((prev) => ({
            [item?.TABLE_NAME]: !prev?.[item?.TABLE_NAME],
          }));
        }}
      >
        <MdEdit color="rgb(234,88,12)" size={14} />
        <p className="text-[10px] text-orange-600">Update Query</p>
      </button>

      <button
        className="w-full hover:bg-gray-200 flex flex-row items-center py-1 px-2 gap-2 rounded-md"
        onClick={() => {
          setCategory("Delete Query");
          setSelectedTable(item?.TABLE_NAME);
          setIsChoose((prev) => ({
            [item?.TABLE_NAME]: !prev?.[item?.TABLE_NAME],
          }));
        }}
      >
        <MdOutlineDeleteOutline color="rgb(220,38,38)" size={14} />
        <p className="text-[10px] text-red-600">Delete Query</p>
      </button>

      <button
        className="w-full hover:bg-gray-200 flex flex-row items-center py-1 px-2 gap-2 rounded-md"
        onClick={() => {
          setCategory("Drop Table Query");
          setSelectedTable(item?.TABLE_NAME);
          setIsChoose((prev) => ({
            [item?.TABLE_NAME]: !prev?.[item?.TABLE_NAME],
          }));
        }}
      >
        <MdDeleteForever color="rgb(220,38,38)" size={14} />
        <p className="text-[10px] text-red-600">Drop Table Query</p>
      </button>
    </div>
  );
};

export default ChoosePanel;
