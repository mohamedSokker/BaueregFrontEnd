import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import logo from "../assets/logo.jpg";
import cover from "../assets/Cover.jpg";

import { CiWarning } from "react-icons/ci";

import { PageLoading } from "../components";
import { useNavContext } from "../contexts/NavContext";

const Login = () => {
  const { setToken } = useNavContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorBody, setErrorBody] = useState("");

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL}/handleLoginapp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: userName, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        const cookies = new Cookies();
        const token = cookies.get("token");
        if (!token) {
          setToken(data.token);
          cookies.set("token", data.token, { maxAge: 86400 });
        }
      })
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setError(true);
        setErrorBody(err.message);
        setLoading(false);
        setInterval(() => setError(false), 5000);
      });
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
