import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

import { useNavContext } from "../contexts/NavContext";
import { getTokenData } from "../Functions/getTokenData";

let usePrivateFetch = () => {
  let config = {};

  const { token, setToken, setUsersData } = useNavContext();

  let baseURL = process.env.REACT_APP_BASE_URL;

  let originalRequest = async (url, config) => {
    url = `${baseURL}${url}`;
    let response = await fetch(url, config);
    let data = await response.json();
    console.log("REQUESTING:", data);
    return { response, data };
  };

  let refreshToken = async () => {
    let response = await fetch(`${baseURL}/refresh`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    let data = await response.json();
    setToken(data.token);
    setUsersData(await getTokenData(data));
    return data;
  };

  let callFetch = async (url, method, body) => {
    const user = jwt_decode(token);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    console.log(isExpired);
    let newToken = token;
    console.log(token);

    if (isExpired) {
      newToken = await refreshToken();
      console.log(newToken);
    }

    console.log(newToken);

    config["headers"] = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${newToken}`,
    };

    config["method"] = method;
    if (method !== "GET") config["body"] = JSON.stringify(body);

    let { response, data } = await originalRequest(url, config);
    return { response, data };
  };

  return callFetch;
};

export default usePrivateFetch;
