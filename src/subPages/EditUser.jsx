import React, { useEffect, useState } from "react";
import { AiFillEdit, AiOutlineCheckCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { CiWarning } from "react-icons/ci";
import { MdArrowBackIosNew } from "react-icons/md";

import { PageLoading } from "../components";
import { useNavContext } from "../contexts/NavContext";
import { changeData } from "../Functions/changeData";
import UserForm from "./UserForm";
import fetchDataOnly from "../Functions/fetchDataOnly";

const EditUser = () => {
  const { token } = useNavContext();

  const [loading, setLoading] = useState(false);
  const [isUserChoosen, setIsUserChoosen] = useState(false);
  const [fieldsData, setFieldsData] = useState({});
  const [users, setUser] = useState([]);
  const [error, setError] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [active, setActive] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(false);
        const url = `${process.env.REACT_APP_BASE_URL}/api/v1/manageUsers`;
        const data = await fetchDataOnly(url, "GET", token);
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setError(true);
        setErrorDetails(error.message);
        setLoading(false);
      }
    };
    getData();
  }, [active]);

  const getChildData = (field) => {
    setFieldsData(field);
  };

  const handleSaveUser = (e) => {
    fieldsData.setError(false);
    if (!fieldsData.checkEmptyFields()) {
      fieldsData.setLoading(true);
      e.preventDefault();

      const minchunckSize =
        fieldsData.image.size <= 5 * 1024
          ? 1 * 1024
          : fieldsData.image.size <= 10 * 1024 * 1024
          ? 5 * 1024
          : 1000 * 1024;
      const chunkSize = minchunckSize; // 5MB (adjust based on your requirements)
      const totalChunks = Math.ceil(fieldsData.image.size / chunkSize);
      const chunkProgress = 100 / totalChunks;
      let chunkNumber = 0;
      let start = 0;
      let end = 0;

      const uploadNextChunk = async () => {
        if (end <= fieldsData.image.size) {
          const chunk = fieldsData.image.slice(start, end);
          const formData = new FormData();
          formData.append("files", chunk);
          formData.append("chunkNumber", chunkNumber);
          formData.append("totalChunks", totalChunks);
          formData.append("originalname", fieldsData.image.name);

          fetch(
            `${process.REACT_APP_BASE_URL}/api/v1/uploadImg?user=${fieldsData.userName}`,
            {
              method: "POST",
              body: formData,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
            .then(() => {
              const temp = `Chunk ${
                chunkNumber + 1
              }/${totalChunks} uploaded successfully`;
              // setStatus(temp);
              // setProgress(Number((chunkNumber + 1) * chunkProgress));
              console.log(temp);
              chunkNumber++;
              start = end;
              end = start + chunkSize;

              uploadNextChunk();
            })
            .catch((err) => {
              console.log(err.message);
            });
        } else {
          // setFile(result);
        }
      };

      uploadNextChunk();

      // const data = new FormData();
      // data.append("files", fieldsData.image);
      // data.append("user", fieldsData.userName);
      // fetch(
      //   `${import.meta.env.VITE_BASE_URL}/api/v1/uploadImg?user=${
      //     fieldsData.userName
      //   }`,
      //   {
      //     method: "POST",
      //     body: data,
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      const path = `users/img/`;
      let bodyData = {
        UserName: fieldsData.userName,
        Title: fieldsData.title,
        Department: fieldsData.department,
        Password: fieldsData.password,
        Email: fieldsData.email,
        Phone: fieldsData.phone,
        ProfileImg: `${path}${fieldsData.userName}/${fieldsData.image.name}`,
        UserRole: JSON.stringify(fieldsData.roles),
        Token: "",
      };
      const manageUserData = async () => {
        try {
          const url = `${process.env.REACT_APP_BASE_URL}/api/v1/manageUsers/${userData?.ID}`;
          const data = await changeData(url, bodyData, "PUT", token);
          console.log("success");
          fieldsData.setLoading(false);
        } catch (err) {
          fieldsData.setErrorDetails(`${err.message}`);
          console.log(err.message);
          fieldsData.setError(true);
          fieldsData.setLoading(false);
        }
      };
      manageUserData();
    } else {
      fieldsData.setError(true);
      fieldsData.setErrorDetails(`Fields can't be empty`);
    }
  };

  const handleDeleteUser = (ID) => {
    const deleteUser = async () => {
      try {
        setLoading(true);
        setError(false);
        const url = `${process.env.REACT_APP_BASE_URL}/api/v1/manageUsers/${ID}`;
        const data = await fetchDataOnly(url, "DELETE", token);
        setIsSuccess(true);
        setActive((prev) => !prev);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setError(true);
        setErrorDetails(error.message);
        setLoading(false);
      }
    };
    deleteUser();
  };

  const handleEditUser = async (user) => {
    setIsUserChoosen(true);
    setUserData(user);
  };

  return (
    <>
      {loading && <PageLoading />}
      {isUserChoosen ? (
        <div className="flex flex-col w-[90%]">
          <button
            className="h-10 flex items-center justify-start p-2 w-full text-logoColor"
            onClick={() => setIsUserChoosen(false)}
          >
            <MdArrowBackIosNew />
          </button>
          <UserForm
            handleSaveUser={handleSaveUser}
            getChildData={getChildData}
            userData={userData}
          />
        </div>
      ) : (
        <div className="flex relative">
          <div className="w-full flex flex-row flex-wrap gap-4">
            {users.map((user) => (
              <div
                className="w-[49%] flex flex-row shadow-lg flex-nowrap rounded-lg py-4"
                key={user.ID}
              >
                <div className="w-[20%] flex items-center justify-center h-full">
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/${user?.ProfileImg}`}
                    alt="ProfileImg"
                    className="w-16 h-16 rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-center items-starts w-[60%] h-full">
                  <p>{user.UserName}</p>
                  <p>{user.Email}</p>
                </div>
                <div className="w-[20%] flex flex-row gap-2 items-center">
                  <div className="w-[50%] h-full cursor-pointer flex items-center">
                    <AiFillEdit onClick={() => handleEditUser(user)} />
                  </div>
                  <div
                    className="w-[50%] h-full cursor-pointer flex items-center"
                    onClick={() => {
                      handleDeleteUser(user.ID);
                    }}
                  >
                    <MdDelete />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {error && (
            <div className=" w-full h-14 bg-red-600 text-white flex justify-center items-center absolute -bottom-14 left-0 flex-row border-t-1 border-gray-400">
              <CiWarning className="text-[40px] font-extrabold" />
              <p className="ml-5 text-xl font-semibold">{errorDetails}</p>
            </div>
          )}
          {isSuccess && (
            <div className=" w-full h-14 bg-green-700 text-white flex justify-center items-center absolute bottom-0 left-0 flex-row border-t-1 border-gray-400">
              <AiOutlineCheckCircle className="text-[40px] font-extrabold" />
              <p className="ml-5 text-xl font-semibold">{`${new Date().toLocaleString()} : Successfully Deleted User`}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default EditUser;
