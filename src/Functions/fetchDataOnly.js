const fetchDataOnly = async (url, method, token) => {
  try {
    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error Fetching Data`);
    } else {
      return res.json();
    }
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
    return null;
  }
};

export default fetchDataOnly;
