import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiUserPlus, FiUserMinus, FiUserCheck } from "react-icons/fi";
// import { Cookies } from "react-cookie";
import logo from "../assets/logo.jpg";
import cover from "../assets/Cover.jpg";

import { CiWarning } from "react-icons/ci";

import { PageLoading } from "../components";
import { useNavContext } from "../contexts/NavContext";
import { getTokenData } from "../Functions/getTokenData";
import { allDataWithName } from "../data/loginAllRoles";
import axios from "../api/axios";

const Login = () => {
  const { setToken, setUsersData } = useNavContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorBody, setErrorBody] = useState("");

  console.log(location);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/handleLoginapp`;
      const data = await axios.post(
        url,
        JSON.stringify({ username: userName, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(data);
      setToken(data?.data?.token);
      const user = { ...data?.data?.user };
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
      // const userInfo = await getTokenData(data?.data?.token);
      // if (userInfo[0].roles.Admin) {
      //   const data1 = await allDataWithName(data?.data?.token);
      //   let copUserData = userInfo;
      //   copUserData[0].roles.Editor = data1;
      //   setUsersData(copUserData);
      // } else {
      //   setUsersData(userInfo);
      // }
      setLoading(false);
      navigate(from, { replace: true });
    } catch (err) {
      setError(true);
      setErrorBody(err.message);
      setLoading(false);
      setInterval(() => setError(false), 5000);
    }
  };
  return (
    <>
      {loading && <PageLoading />}
      <div
        className="flex w-screen h-screen justify-center items-center"
        style={{
          backgroundImage: `url(${cover})`,
          backgroundSize: "100% 100%",
        }}
      >
        <form
          className="w-full h-full flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div
            className="flex flex-col justify-center items-center rounded-2xl md:w-50% md:h-70% w-100% h-100%"
            style={{
              backgroundColor: "rgba(12,37,67,0.5)",
            }}
          >
            {error && (
              <div
                className=" bg-yellow-200 h-20 flex justify-center items-center flex-row mb-5 mt-2 rounded-lg"
                style={{ color: "red", width: "90%" }}
              >
                <CiWarning className="text-xl" />
                <p className="ml-5 text-xl">{errorBody}</p>
              </div>
            )}
            <img
              src={logo}
              className=" md:mb-10 mb-32 rounded-md md:h-20% h-10% opacity-70"
              alt="logo"
            />
            <input
              className="md:mb-4 mb-8 rounded-lg pl-3 md:w-50% md:h-10% w-90% h-5% text-black"
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="off"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input
              className="md:mb-10 rounded-lg pl-3 md:w-50% md:h-10% w-90% h-5%"
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              className="mb-2 md:mt-0 mt-20 bg-yellow-500 md:rounded-3xl rounded-lg hover:cursor-pointer md:w-50% md:h-10% w-90% h-5% text-white"
              type="submit"
              value="Log in"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
