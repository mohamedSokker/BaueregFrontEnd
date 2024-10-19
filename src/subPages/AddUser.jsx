import React, { useState } from "react";

import { useNavContext } from "../contexts/NavContext";
import { changeData } from "../Functions/changeData";
import UserForm from "./UserForm";

const AddUser = () => {
  const { token } = useNavContext();

  const [fieldsData, setFieldsData] = useState({});

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
            `${process.env.REACT_APP_BASE_URL}/api/v1/uploadImg?user=${fieldsData.userName}`,
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
          const url = `${process.env.REACT_APP_BASE_URL}/api/v1/manageUsers`;
          const data = await changeData(url, bodyData, "POST", token);
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

  return (
    <UserForm getChildData={getChildData} handleSaveUser={handleSaveUser} />
  );
};

export default AddUser;
