import React from "react";

const ExistingTable = ({
  setData,
  isExistingTable,
  setIsExistingTable,
  setCategoryCount,
  setTableColumns,
  categoryCount,
}) => {
  return (
    <div
      className="w-full h-full flex flex-col justify-between flex-shrink-0 flex-grow-0"
      style={{
        translate: `${-100 * categoryCount}%`,
        transition: `all 0.5s ease-in-out`,
      }}
    >
      <div className="w-[30vw] p-2 flex flex-row gap-4 justify-start items-center text-[14px] text-gray-400">
        <input
          type="checkbox"
          disabled={true}
          checked={isExistingTable}
          onChange={() => {
            setIsExistingTable((prev) => !prev);
            setTableColumns([]);
            setData((prev) => ({ ...prev, Exist: !isExistingTable }));
          }}
        />
        <p>Existing Table</p>
      </div>
      <div className="w-full p-2">
        <button
          className="w-full p-2 bg-green-600 text-white rounded-[4px]"
          onClick={() => {
            setCategoryCount((prev) => prev + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExistingTable;
