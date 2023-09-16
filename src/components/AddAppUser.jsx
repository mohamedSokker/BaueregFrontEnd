import React, { useState } from "react";

import { useNavContext } from "../contexts/NavContext";
import { changeData } from "../Functions/changeData";
import UserAppForm from "./UserAppForm";

const AddAppUser = () => {
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
        `${process.env.REACT_APP_BASE_URL}/api/v1/appUploadImg?user=${fieldsData.userName}`,
        {
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const path = `appUsers/img/`;
      let bodyData = {
        UserName: fieldsData.userName,
        Password: fieldsData.password,
        Email: fieldsData.email,
        Phone: fieldsData.phone,
        ProfileImg: `${path}${fieldsData.userName}/${fieldsData.image.name}`,
        Role: fieldsData.roles,
        Location: fieldsData.site,
        Equipment_Type: fieldsData.eqType,
        Equipment: fieldsData.eq,
      };
      const manageUserData = async () => {
        try {
          const url = `${process.env.REACT_APP_BASE_URL}/api/v1/appManageUsers`;
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
    <UserAppForm getChildData={getChildData} handleSaveUser={handleSaveUser} />
  );
};

export default AddAppUser;
