export const changeData = async (url, body, method, token) => {
  try {
    let bodyData = body;
    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    } else {
      return data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
