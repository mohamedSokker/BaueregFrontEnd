import { Cookies } from "react-cookie";
import { FiUserPlus, FiUserMinus, FiUserCheck } from "react-icons/fi";
import jwt from "jwt-decode";

export const getTokenData = async (token) => {
  let user = jwt(token);
  handleManageUsers(user);
  return [
    {
      username: user.username,
      roles: user.roles,
      img: user.img,
    },
  ];
};

const handleManageUsers = (user) => {
  if (user.roles.Editor.ManageUsers) {
    user.roles.Editor["ManageUsers"] = [
      { name: "Add User", icon: <FiUserPlus />, dest: "AddUser" },
      { name: "Edit User", icon: <FiUserCheck />, dest: "EditUser" },
      { name: "Delete User", icon: <FiUserMinus />, dest: "DeleteUser" },
    ];
    user.roles.User["ManageUsers"] = [];
  } else {
    user.roles.Editor["ManageUsers"] = [];
    user.roles.User["ManageUsers"] = [];
  }
};
