import { FiUserPlus, FiUserMinus, FiUserCheck } from "react-icons/fi";

import axios from "../api/axios";
import { useNavContext } from "../contexts/NavContext";

const useRefreshToken = () => {
  const { setToken, setUsersData } = useNavContext();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setToken((prev) => {
      return response.data.token;
    });
    const user = { ...response.data.user };
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
    if (user.roles.Editor.ManageAppUsers) {
      user.roles.Editor["ManageAppUsers"] = [
        { name: "Add User", icon: <FiUserPlus />, dest: "AddAppUser" },
        { name: "Edit User", icon: <FiUserCheck />, dest: "EditAppUser" },
        { name: "Delete User", icon: <FiUserMinus />, dest: "DeleteAppUser" },
      ];
      user.roles.User["ManageAppUsers"] = [];
    } else {
      user.roles.Editor["ManageAppUsers"] = [];
      user.roles.User["ManageAppUsers"] = [];
    }

    setUsersData([user]);
    return response.data.token;
  };
  return refresh;
};

export default useRefreshToken;
