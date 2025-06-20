import Dropdown from "../UsersDropdown";
import ToolsSIdebar from "../Sidebars/ToolsSIdebar";
import { useDataContext } from "../../Contexts/DataContext";
import { useInitContext } from "../../Contexts/InitContext";
import FormalInputField from "../../../../components/Accessories/FormalInput";
import { regix } from "../../Model/model";
import FormalButton from "../../../../components/Accessories/FormalButton";
import DragComponent from "../../../../components/Accessories/Drag";
import DropComponent from "../../../../components/Accessories/Drop";
import PropertyCard from "../Customs/PropertyCard";

const ChooseUsers = ({ reportID, isWorker }) => {
  const {
    categoryCount,
    setCategoryCount,
    usersNamesData,
    setUsersNamesData,
    setIsDeleteCard,
    handleSendAdd,
    handleSendEdit,
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
      if (isWorker === true) {
        handleSendEdit({ reportID });
      } else {
        handleSendAdd({ reportID });
      }
    }
  };

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

        <div className="flex flex-col w-full p-2 space-y-4 h-full overflow-hidden">
          {/* Inputs */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FormalInputField
              label={`Name`}
              onChange={setViewName}
              placeholder={`Enter File Name`}
              value={viewName}
              errorMessage="Please Enter Valid File Name"
              validationRegex={regix.text}
              inputClassName="text-xs"
              labelClassName="text-xs"
            />
            <FormalInputField
              label={`Group`}
              onChange={setViewGroup}
              placeholder={`Enter File Group Name`}
              value={viewGroup}
              errorMessage="Please Enter Valid File Group Name"
              validationRegex={regix.text}
              inputClassName="text-xs"
              labelClassName="text-xs"
            />
          </div>

          {/* Users Selection Area */}
          <div className="flex flex-col gap-4 h-full">
            <div className="w-full flex flex-col flex-grow min-h-0">
              <Dropdown
                multiple={true}
                label="Users"
                column="UserName"
                localData={allData?.Users}
                data={usersNamesData}
                setData={setUsersNamesData}
                containerClassName="w-full"
                labelClassName="text-sm font-medium"
                dropdownClassName="text-xs"
              />
            </div>

            {/* Selected Users List */}
            <div className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md bg-white overflow-auto max-h-[25vh] p-3">
              <p className="text-blue-500 dark:text-blue-300 font-semibold text-sm mb-2">
                Choosed Users
              </p>
              {usersNamesData?.Users?.length === 0 ? (
                <div className="text-red-600 dark:text-red-400 text-xs">
                  No Users Choosed
                </div>
              ) : (
                usersNamesData.Users.map((item, i) => (
                  <div
                    key={i}
                    className="text-xs border-b border-gray-200 py-1 last:border-0"
                  >
                    {item}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button - Sticky at bottom on mobile */}
      <div className="p-3 shadow-inner md:shadow-none w-full flex justify-center sticky bottom-0 z-10">
        <FormalButton onClick={handleSave} className="w-[100%]">
          Save
        </FormalButton>
      </div>
    </div>
  );
};

export default ChooseUsers;
