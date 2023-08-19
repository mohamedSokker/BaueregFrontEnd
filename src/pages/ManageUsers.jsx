import React from "react";
import { useNavContext } from "../contexts/NavContext";
import { useParams } from "react-router-dom";
import { AddUser, EditUser, DeleteUser } from "../components";

const ManageUsers = () => {
  const { closeSmallSidebar } = useNavContext();
  const { tableName } = useParams();
  const renderPage = () => {
    if (tableName === "AddUser") {
      return <AddUser />;
    } else if (tableName === "EditUser") {
      return <EditUser />;
    } else {
      return <DeleteUser />;
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

export default ManageUsers;
