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
      const data = new FormData();
      data.append("file", fieldsData.image);
      data.append("user", fieldsData.userName);
      fetch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/uploadImg?user=${fieldsData.userName}`,
        {
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
