import { Cookies } from "react-cookie";
import { FiUserPlus, FiUserMinus, FiUserCheck } from "react-icons/fi";
import jwt from "jwt-decode";

export const userInfo = async (token) => {
  // let cookies = new Cookies();
  // const token = cookies?.get("token");
  if (token) {
    let user = jwt(token);
    handleManageUsers(user);
    return [
      {
        username: user.username,
        roles: user.roles,
        img: user.img,
      },
    ];
  } else {
    return [];
  }
};

export const handleManageUsers = (user) => {
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
