const fetchDataOnly = async (url, method, token, body) => {
  try {
    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(res.message);
    } else {
      return res.json();
    }
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export default fetchDataOnly;
