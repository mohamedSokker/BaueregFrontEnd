import { Cookies } from "react-cookie";

export const bodyData = (url, body, method, methodText) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  let bodyData = body;
  delete bodyData.ID;
  console.log(bodyData);
  if (
    window.confirm(
      `sure you want to ${methodText} data ${JSON.stringify(bodyData)}?`
    )
  ) {
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyData),
    });
    return "Fetched";
  }
  return "Canceled";
};

export const bodyDataKanban = async (url, body, method) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  let bodyData = body;
  delete bodyData.ID;
  await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodyData),
  });
};
