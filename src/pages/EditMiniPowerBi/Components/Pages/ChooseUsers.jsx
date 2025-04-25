import Dropdown from "../UsersDropdown";
// import useTablesData from "../../Controllers/TablesData";
import ToolsSIdebar from "../Sidebars/ToolsSIdebar";
import { useDataContext } from "../../Contexts/DataContext";
import { useInitContext } from "../../Contexts/InitContext";
import FormalInputField from "../../../../components/Accessories/FormalInput";
import { regix } from "../../Model/model";
import FormalButton from "../../../../components/Accessories/FormalButton";
import DragComponent from "../../../../components/Accessories/Drag";
import DropComponent from "../../../../components/Accessories/Drop";
import PropertyCard from "../Customs/PropertyCard";

const ChooseUsers = ({ reportID }) => {
  const {
    categoryCount,
    setCategoryCount,
    usersNamesData,
    setUsersNamesData,
    setIsDeleteCard,
    handleSend,
    viewName,
    setViewName,
    viewGroup,
    setViewGroup,
  } = useInitContext();
  const { allData } = useDataContext();

  const handleSave = () => {
    if (
      usersNamesData?.Users.length === 0 ||
      viewName === "" ||
      viewGroup === ""
    ) {
      setIsDeleteCard(true);
    } else {
      handleSend({ reportID });
    }
  };
  // console.log(usersNamesData);
  return (
    <div
      className="w-full h-full flex flex-col justify-between flex-shrink-0 flex-grow-0"
      style={{
        translate: `${-100 * categoryCount}%`,
        transition: `all 0.5s ease-in-out`,
      }}
    >
      <div className="flex flex-row w-full h-full">
        <ToolsSIdebar
          categoryCount={categoryCount}
          setCategoryCount={setCategoryCount}
        />

        <div className="flex flex-col w-full h-full p-1">
          <div className="max-w-[200px] p-1">
            <FormalInputField
              label={`Name`}
              onChange={setViewName}
              placeholder={`Enter File Name`}
              value={viewName}
              errorMessage="Please Enter Valid File Name"
              validationRegex={regix.text}
            />
          </div>
          <div className="max-w-[200px] p-1">
            <FormalInputField
              label={`Group`}
              onChange={setViewGroup}
              placeholder={`Enter File Group Name`}
              value={viewGroup}
              errorMessage="Please Enter Valid File Group Name"
              validationRegex={regix.text}
            />
          </div>

          <div className="w-full h-[90%] flex flex-row gap-8 items-start">
            <div className="w-[30vw] h-full flex flex-col justify-center items-center">
              <Dropdown
                multiple={true}
                label="Users"
                column="UserName"
                localData={allData?.Users}
                data={usersNamesData}
                setData={setUsersNamesData}
              />
            </div>
            <div
              className=" flex flex-col p-4 max-h-[90%] min-w-[250px] gap-4 border-red-300 border-1 items-start overflow-y-scroll"
              style={{ scrollbarWidth: "none" }}
            >
              <p className="text-blue-500 font-[700] text-[20]">
                Choosed Users
              </p>
              {usersNamesData?.Users?.length === 0 ? (
                <div className="text-red-700 text-[12px]">No Users Choosed</div>
              ) : (
                usersNamesData?.Users?.map((item, i) => (
                  <div
                    className="w-full text-[12px] border-b-1 border-gray-300"
                    key={i}
                  >
                    {item}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* <div className="w-full flex flex-row items-center ">
            <div className="p-1 bg-white max-h-[200px] overflow-auto flex flex-col gap-1">
              {allData?.Users?.map((user) => (
                <DragComponent name={user?.UserName} target={`Users`}>
                  <div className="w-full p-1 px-2 flex flex-row items-center justify-between bg-gray-400 opacity-60 border-gray-500 border rounded-md relative">
                    <div className="flex flex-grow text-[10px]">
                      <p className="overflow-ellipsis whitespace-nowrap overflow-hidden">
                        {user?.UserName}
                      </p>
                    </div>
                  </div>
                </DragComponent>
              ))}
            </div>
            <div className="">
              <DropComponent name={`Users`} target={`Users`} />
            </div>
          </div> */}
        </div>
      </div>

      <div className="p-1 w-[100%] flex items-center justify-center">
        <FormalButton onClick={handleSave} className="w-[90%]">
          Save
        </FormalButton>
      </div>

      {/* <div className="w-full p-2">
        <button
          className="w-full p-2 bg-green-600 text-white rounded-[4px]"
          onClick={() => {
            setCategoryCount((prev) => prev + 1);
          }}
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default ChooseUsers;
