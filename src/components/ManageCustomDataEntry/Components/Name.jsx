import { useEffect, useState } from "react";
import { regix } from "../Model/model";
const Name = ({ data, setData, setCategoryCount, categoryCount, allData }) => {
  const [tables, setTables] = useState(null);

  console.log(tables);

  useEffect(() => {
    if (!tables) {
      const result = [];
      allData?.Table?.map((item) => {
        result.push(item?.TABLE_NAME);
      });
      setTables(result);
    }
  }, [allData.Table]);
  return (
    <div
      className="w-full h-full flex flex-col justify-between flex-shrink-0 flex-grow-0"
      style={{
        translate: `${-100 * categoryCount}%`,
        transition: `all 0.5s ease-in-out`,
      }}
    >
      <div className="w-[30vw] p-4 flex flex-col justify-center items-center">
        {!regix?.nvarChar255?.test(data?.Name) ||
        tables?.includes(data?.Name) ? (
          <div className="w-full h-4 flex flex-row justify-start items-center gap-3">
            <p className="h-full text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Name`}</p>
            <p className="text-[10px] text-red-500 h-full ">
              {!regix?.nvarChar255?.test(data?.Name)
                ? `Not Valid text field data`
                : `This Name is Taken`}
            </p>
          </div>
        ) : (
          <p className="w-full h-4 text-[14px] text-gray-400 flex flex-row justify-start items-center">{`Name`}</p>
        )}
        <input
          type="text"
          className="w-full border-b-1 border-logoColor outline-none p-2 bg-gray-100 text-[14px] focus:border-[rgb(248,113,113)]"
          value={data?.Name}
          onChange={(e) =>
            setData((prev) => ({ ...prev, Name: e.target.value }))
          }
        />
      </div>
      <div className="w-full p-2">
        <button
          className="w-full p-2 bg-green-600 text-white rounded-[4px]"
          onClick={() => {
            if (data.Name && data.Name !== "" && !tables.includes(data?.Name)) {
              setCategoryCount((prev) => prev + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Name;
