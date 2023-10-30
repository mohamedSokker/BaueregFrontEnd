import { useEffect, useState } from "react";

import useAxiosPrivate from "./useAxiosPrivate";

const useSites = () => {
  const axiosPrivate = useAxiosPrivate();
  const [sites, setSites] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getData = async () => {
      try {
        const url = `/api/v1/Location_Bauer`;
        const result = await axiosPrivate(url, {
          signal: controller.signal,
          method: "GET",
        });
        setSites(result?.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return { sites, setSites };
};

export default useSites;
