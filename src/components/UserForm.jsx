import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { CiWarning } from "react-icons/ci";

import { AllStocks, allDataTitles } from "../data/Tablesdata";
import { allData } from "../data/allRoles";
import { PageLoading } from "./";
import { useNavContext } from "../contexts/NavContext";

const UserForm = ({ handleSaveUser, getChildData, userData }) => {
  const { token } = useNavContext();

  const [allDatas, setAllDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");
  const [roles, setRules] = useState({
    Admin: false,
    Editor: {
      ManageUsers: false,
      Dashboard: false,
      Kanban: false,
      Sites: [],
      Equipments: [],
      Orders: [],
      Stocks: [],
      StocksList: [],
      Tables: [],
      OilSamples: false,
      OilSamplesAnalyzed: false,
      Catalogues: [],
    },
    User: {
      ManageUsers: false,
      Dashboard: false,
      Kanban: false,
      Sites: [],
      Equipments: [],
      Orders: [],
      Stocks: [],
      StocksList: [],
      Tables: [],
      OilSamples: false,
      OilSamplesAnalyzed: false,
      Catalogues: [],
    },
  });
  const [active, setActive] = useState(false);

  useEffect(() => {
    getChildData({
      image: image,
      userName: userName,
      password: password,
      email: email,
      phone: phone,
      roles: roles,
      error: error,
      errorDetails: errorDetails,
      setRules: setRules,
      setLoading: setLoading,
      setError: setError,
      setErrorDetails: setErrorDetails,
      setImage: setImage,
      checkEmptyFields: checkEmptyFields,
    });
  }, [roles, userName, password, email, phone, image]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await allData(token);
        setAllDatas(data);
        setLoading(false);
      } catch (err) {
        setErrorDetails(`${err.message}`);
        console.log(err.message);
        setError(true);
        setLoading(false);
      }
    };
    getData();
    if (userData) {
      setUserName(userData.UserName);
      setPassword(userData.Password);
      setEmail(userData.Email);
      setPhone(userData.Phone);
      setRules(JSON.parse(userData.UserRole));
      const getImage = async () => {
        const img = `${process.env.REACT_APP_BASE_URL}/${userData.ProfileImg}`;
        let imgName = userData.ProfileImg.split("/");
        imgName = imgName[imgName.length - 1];
        fetch(img)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], imgName, { type: blob.type });
            setImage(file);
            console.log(file);
          });
      };
      getImage();
    }
  }, []);

  console.log(roles);

  const uploadImage = (e) => {
    setImage(e.target.files[0]);
  };

  const checkEmptyFields = () => {
    if (
      userName === "" ||
      password === "" ||
      email === "" ||
      phone === "" ||
      image === ""
    ) {
      return true;
    }
    return false;
  };

  const handleCheckboxChange = (e) => {
    let category = e.target.dataset.cat;
    let title = e.target.dataset.title;
    if (typeof roles[category][title] === "boolean") {
      setRules((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [title]: !prev[category][title],
        },
      }));
    } else {
      if (e.target.checked) {
        if (!roles[category][title].includes(e.target.value)) {
          setRules((prev) => ({
            ...prev,
            [category]: {
              ...prev[category],
              [title]: [...prev[category][title], { name: e.target.value }],
            },
          }));
        }
      } else {
        let newRoles = { ...roles };
        newRoles = newRoles[category][title].filter(
          (role) => role.name !== e.target.value
        );
        setRules((prev) => ({
          ...prev,
          [category]: {
            ...prev[category],
            [title]: newRoles,
          },
        }));
      }
    }
  };

  return (
    <>
      {loading && <PageLoading />}
      <div className="flex flex-col dark:bg-background-logoColor relative">
        <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-5/5  w-full dark:bg-background-logoColor">
          <div className="bg-secondaryColor p-3 flex flex-0.7 w-full justify-center dark:bg-background-logoColor">
            <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-370 dark:bg-background-logoColor">
              {!image ? (
                <label>
                  <div className="flex flex-col items-center justify-center h-full w-full dark:bg-background-logoColor">
                    <div className="flex flex-col justify-center items-center">
                      <p className="font-bold text-2xl">
                        <AiOutlineCloudUpload />
                      </p>
                      <p className="text-lg">Click to upload</p>
                    </div>
                    <p className=" lg:mt-10 mt-32 text-gray-400">
                      Recommendation: use high quality JPG, JPEG, PNG less than
                      20 MB
                    </p>
                  </div>
                  <input
                    type="file"
                    name="file"
                    multiple
                    encType="multipart/form-data"
                    onChange={uploadImage}
                    className="w-0 h-0"
                  />
                </label>
              ) : (
                <div className="relative h-full">
                  {/* <form hidden onSubmit={handleSaveUser}>
                    <input id="formSubmit" type="submit" hidden />
                  </form> */}
                  <img
                    src={URL.createObjectURL(image)}
                    alt="uploaded-pic"
                    className="h-full w-full"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                    onClick={() => setImage(null)}
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full dark:bg-background-logoColor">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username"
              className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 focus:border-logoColor dark:focus:border-black dark:rounded-lg"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 focus:border-logoColor dark:focus:border-black dark:rounded-lg"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 focus:border-logoColor dark:focus:border-black dark:rounded-lg"
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 focus:border-logoColor dark:focus:border-black dark:rounded-lg"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col ">
            <div className="flex flex-row mb-5 font-extrabold text-3xl">
              <input
                type="checkbox"
                id="Admin"
                name="Admin"
                value="Admin"
                onChange={() => {
                  setAdmin((prev) => !prev);
                  setRules((prev) => ({
                    ...prev,
                    Admin: !prev.Admin,
                  }));
                }}
                checked={roles.Admin ? true : false}
              />
              <label htmlFor="Admin" className="ml-5 dark:text-white">
                Admin
              </label>
            </div>

            {/* Stock */}
            <div className="flex flex-col justify-center items-center">
              <button
                id="StockRes"
                className="w-full bg-gray-400 rounded-lg mb-5 flex flex-row justify-between items-center pl-3 pr-3 h-12 text-white hover:cursor-pointer dark:bg-black/80"
                onClick={(e) => {
                  if (!e.target.classList.contains("Active")) {
                    e.target.classList.add("Active");
                    setActive((prev) => !prev);
                  } else {
                    e.target.classList.remove("Active");
                    setActive((prev) => !prev);
                  }
                }}
              >
                <h1>Stock Responsible For</h1>
                {document
                  ?.getElementById(`StockRes`)
                  ?.classList.contains("Active") ? (
                  <MdKeyboardArrowUp />
                ) : (
                  <MdKeyboardArrowDown />
                )}
              </button>
              {document
                ?.getElementById(`StockRes`)
                ?.classList.contains("Active") && (
                <div
                  className="mb-3 -mt-5 flex flex-col"
                  style={{ width: "98%" }}
                >
                  {AllStocks.map((item) => {
                    return (
                      <div
                        className=" flex flex-row justify-start pl-4 text-black w-full p-2"
                        key={item}
                      >
                        <input
                          id={item}
                          type="radio"
                          name={`Stock`}
                          data-title={item}
                          className="mr-4"
                          value={item}
                          checked={
                            roles?.StockRes?.includes(item) ? true : false
                          }
                          onChange={(e) => {
                            setRules((prev) => ({
                              ...prev,
                              StockRes: [e.target.dataset.title],
                            }));
                          }}
                        />
                        <label for={item}>{item}</label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {/* End Stock */}

            <h1 className="text-3xl mb-10 font-extrabold dark:text-white">
              Editor
            </h1>
            {allDataTitles.map((title) => (
              <div
                className="flex flex-col justify-center items-center"
                key={title}
              >
                <button
                  id={`${title}_adduser`}
                  disabled={admin}
                  className="w-full bg-gray-400 rounded-lg mb-5 flex flex-row justify-between items-center pl-3 pr-3 h-12 text-white hover:cursor-pointer dark:bg-black/80"
                  onClick={(e) => {
                    if (!e.target.classList.contains("Active")) {
                      e.target.classList.add("Active");
                      setActive((prev) => !prev);
                    } else {
                      e.target.classList.remove("Active");
                      setActive((prev) => !prev);
                    }
                  }}
                >
                  <h1>{title}</h1>
                  {document
                    ?.getElementById(`${title}_adduser`)
                    ?.classList.contains("Active") ? (
                    <MdKeyboardArrowUp />
                  ) : (
                    <MdKeyboardArrowDown />
                  )}
                </button>
                {document
                  ?.getElementById(`${title}_adduser`)
                  ?.classList.contains("Active") && (
                  <div
                    className="mb-3 -mt-5 flex flex-col"
                    style={{ width: "98%" }}
                  >
                    {allDatas[title]?.map((item) => {
                      return (
                        <div
                          className=" flex flex-row justify-start pl-4 text-black w-full p-2"
                          key={item}
                        >
                          <input
                            id={item}
                            type="checkbox"
                            name={item}
                            data-title={title}
                            data-cat="Editor"
                            className="mr-4"
                            value={item}
                            checked={
                              typeof roles.Editor[title] === "boolean"
                                ? roles.Editor[title]
                                  ? true
                                  : false
                                : roles.Editor[title]?.find(
                                    (data) => data.name === item
                                  )?.name === item
                                ? true
                                : false
                            }
                            onChange={handleCheckboxChange}
                          />
                          <label htmlFor={item}>{item}</label>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            <h1 className="text-3xl mb-10 font-extrabold dark:text-white">
              User
            </h1>
            {allDataTitles.map((title) => (
              <div
                className="flex flex-col justify-center items-center"
                key={title}
              >
                <button
                  id={`${title}_adduser_user`}
                  disabled={admin}
                  className="w-full bg-gray-400 rounded-lg mb-5 flex flex-row justify-between items-center pl-3 pr-3 h-12 text-white hover:cursor-pointer dark:bg-black/80"
                  onClick={(e) => {
                    if (!e.target.classList.contains("Active")) {
                      e.target.classList.add("Active");
                      setActive((prev) => !prev);
                    } else {
                      e.target.classList.remove("Active");
                      setActive((prev) => !prev);
                    }
                  }}
                >
                  <h1>{title}</h1>
                  {document
                    ?.getElementById(`${title}_adduser_user`)
                    ?.classList.contains("Active") ? (
                    <MdKeyboardArrowUp />
                  ) : (
                    <MdKeyboardArrowDown />
                  )}
                </button>
                {document
                  ?.getElementById(`${title}_adduser_user`)
                  ?.classList.contains("Active") && (
                  <div
                    className="mb-3 -mt-5 flex flex-col"
                    style={{ width: "98%" }}
                  >
                    {allDatas[title]?.map((item) => {
                      return (
                        <div
                          className=" flex flex-row justify-start pl-4 text-black w-full p-2"
                          key={item}
                        >
                          <input
                            id={item}
                            type="checkbox"
                            name={item}
                            data-title={title}
                            data-cat="User"
                            className="mr-4"
                            value={item}
                            checked={
                              typeof roles.User[title] === "boolean"
                                ? roles.User[title]
                                  ? true
                                  : false
                                : roles.User[title]?.find(
                                    (data) => data.name === item
                                  )?.name === item
                                ? true
                                : false
                            }
                            onChange={handleCheckboxChange}
                          />
                          <label htmlFor={item}>{item}</label>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            <div className="flex items-end justify-end pb-5">
              <button
                type="button"
                // onClick={savePin}
                className="bg-logo-color text-white font-bold p-2 rounded-full w-28 outline-none"
                onClick={handleSaveUser}
                // onClick={() => {
                //   let btn = document.getElementById("formSubmit");
                //   btn.click();
                // }}
              >
                Save User
              </button>
            </div>
          </div>
        </div>
        {error && (
          <div className=" w-full h-14 bg-red-600 text-white flex justify-center items-center absolute -bottom-14 left-0 flex-row border-t-1 border-gray-400">
            <CiWarning className="text-[40px] font-extrabold" />
            <p className="ml-5 text-xl font-semibold">{errorDetails}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default UserForm;
