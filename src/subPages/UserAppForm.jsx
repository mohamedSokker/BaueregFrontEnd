import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { CiWarning } from "react-icons/ci";

import { PageLoading } from "../components";
import fetchDataOnly from "../Functions/fetchDataOnly";
import { useNavContext } from "../contexts/NavContext";

const UserAppForm = ({ handleSaveUser, getChildData, userData }) => {
  const { token } = useNavContext();
  const [allDatas, setAllDatas] = useState([]);
  const [eqType, setEqType] = useState("");
  const [eq, setEq] = useState([]);
  const [eqs, setEqs] = useState([]);
  const [site, setSite] = useState([]);
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");
  const [roles, setRules] = useState("");
  const [active, setActive] = useState(false);

  console.log(eqType);
  console.log(eq);
  console.log(site);
  console.log(roles);

  useEffect(() => {
    getChildData({
      image: image,
      userName: userName,
      password: password,
      email: email,
      phone: phone,
      eq: eq,
      site: site,
      eqType: eqType,
      error: error,
      errorDetails: errorDetails,
      roles: roles,
      setLoading: setLoading,
      setError: setError,
      setRules: setRules,
      setErrorDetails: setErrorDetails,
      setImage: setImage,
      checkEmptyFields: checkEmptyFields,
    });
  }, [roles, userName, password, email, phone, image, eq, eqType, site]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const url = `${process.env.REACT_APP_BASE_URL}/api/v1/getAllEq`;
        const data = await fetchDataOnly(url, "GET", token);
        setAllDatas(data);
        let targetEqs = [];
        let targetSites = [];
        const targetData = data.filter(
          (d) =>
            d.Equipment_Type === "Trench_Cutting_Machine" ||
            d.Equipment_Type === "Drilling_Machine"
        );
        targetData.map((item) => {
          targetEqs.push(item.Equipment);
          targetSites.push(item.Location);
        });
        targetEqs = targetEqs.filter(
          (value, index, array) => array.indexOf(value) === index
        );
        targetSites = targetSites.filter(
          (value, index, array) => array.indexOf(value) === index
        );
        setEqs(targetEqs);
        setSites(targetSites);
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
      setRules(userData.Role);
      setSite(JSON.parse(userData.Location));
      setEqType(userData.Equipment_Type);
      setEq(userData.Equipment);
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

  const uploadImage = (e) => {
    setImage(e.target.files[0]);
  };

  const checkEmptyFields = () => {
    if (
      userName === "" ||
      password === "" ||
      email === "" ||
      phone === "" ||
      image === "" ||
      roles === "" ||
      eqType === "" ||
      eq === "" ||
      site === ""
    ) {
      return true;
    }
    return false;
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
            <div className="flex flex-row mb-5 font-extrabold text-3xl gap-10">
              <label htmlFor="role">Role: </label>

              <select
                name="role"
                id="role"
                className="p-2 rounded-lg text-[16px] font-normal"
                onChange={(e) => setRules(e.target.value)}
              >
                <option
                  value="Project Manager"
                  selected={roles === "Project Manager" ? true : false}
                >
                  Project Manager
                </option>
                <option
                  value="Operator"
                  selected={roles === "Operator" ? true : false}
                >
                  Operator
                </option>
                <option
                  value="Senior"
                  selected={roles === "Senior" ? true : false}
                >
                  Senior
                </option>
                <option
                  value="Junior"
                  selected={roles === "Junior" ? true : false}
                >
                  Junior
                </option>
                <option
                  value="Technician"
                  selected={roles === "Technician" ? true : false}
                >
                  Technician
                </option>
              </select>
            </div>

            {/* Site */}
            <div className="flex flex-col justify-center items-center">
              <button
                id="sites"
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
                <h1>Sites</h1>
                {document
                  ?.getElementById(`sites`)
                  ?.classList.contains("Active") ? (
                  <MdKeyboardArrowUp />
                ) : (
                  <MdKeyboardArrowDown />
                )}
              </button>
              {document
                ?.getElementById(`sites`)
                ?.classList.contains("Active") && (
                <div
                  className="mb-3 -mt-5 flex flex-col"
                  style={{ width: "98%" }}
                >
                  {sites.map((item) => {
                    return (
                      <div
                        className=" flex flex-row justify-start pl-4 text-black w-full p-2"
                        key={item}
                      >
                        <input
                          id={item}
                          type="checkbox"
                          name={`site`}
                          data-title={item}
                          className="mr-4"
                          value={item}
                          checked={site.includes(item) ? true : false}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSite((prev) => [...prev, item]);
                            } else {
                              let newSites = [...site];
                              newSites = newSites.filter((s) => s !== item);
                              setSite(newSites);
                            }
                          }}
                        />
                        <label htmlFor={item}>{item}</label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {/* End Site */}

            <div className="flex flex-row mb-5 font-extrabold text-3xl gap-10">
              <label htmlFor="eqType">Equipment Type: </label>

              <select
                name="eqType"
                id="eqType"
                className="p-2 rounded-lg text-[16px] font-normal"
                onChange={(e) => setEqType(e.target.value)}
              >
                <option
                  value="Trench_Cutting_Machine"
                  selected={eqType === "Trench_Cutting_Machine" ? true : false}
                >
                  Trench_Cutting_Machine
                </option>
                <option
                  value="Drilling_Machine"
                  selected={eqType === "Drilling_Machine" ? true : false}
                >
                  Drilling_Machine
                </option>
              </select>
            </div>

            <div className="flex items-end justify-end pb-5">
              <button
                type="button"
                className="bg-logo-color text-white font-bold p-2 rounded-full w-28 outline-none"
                onClick={handleSaveUser}
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

export default UserAppForm;
