import React from "react";
import { useNavContext } from "../contexts/NavContext";
import { useParams } from "react-router-dom";
import { AddAppUser, EditAppUser, DeleteAppUser } from "../components";

const ManageAppUsers = () => {
  const { closeSmallSidebar } = useNavContext();
  const { tableName } = useParams();
  const renderPage = () => {
    if (tableName === "AddAppUser") {
      return <AddAppUser />;
    } else if (tableName === "EditAppUser") {
      return <EditAppUser />;
    } else {
      return <DeleteAppUser />;
    }
  };
  return (
    <div
      className="p-2 md:p-10 bg-white rounded-xl Main--Content flex items-center justify-center dark:bg-background-logoColor"
      onClick={closeSmallSidebar}
    >
      {renderPage()}
    </div>
  );
};

export default ManageAppUsers;
