import { useDashboardContext } from "../../contexts/DashboardContext";
import { useNavContext } from "../../contexts/NavContext";
// import usePrivateFetch from "../usePrivateFetch";
import useAxiosPrivate from "../useAxiosPrivate";
// import updateData from "../../Functions/updateData";

const useGetData = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const axiosPrivate = useAxiosPrivate();
  // const updateData = usePrivateFetch();
  const { token, usersData } = useNavContext();
  const { setMessages, setCount, setError, setErrorDetails } =
    useDashboardContext();

  const getData = async (controller) => {
    try {
      const url = `/api/v1/getMessages`;
      const data = await axiosPrivate(url, {
        signal: controller.signal,
        method: "POST",
        data: JSON.stringify({ usersData: usersData }),
      });
      const target = data?.data?.filter((d) => d.problem_End_To === null);
      setMessages(target);
      setCount(0);
    } catch (error) {
      setError(true);
      setErrorDetails(error.message);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return { getData };
};

export default useGetData;
