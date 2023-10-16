import axios from "../api/axios";
import { useNavContext } from "../contexts/NavContext";

const useLogout = () => {
  const { setToken, setUsersData } = useNavContext();

  const logout = async () => {
    setToken(null);
    setUsersData([]);
    try {
      const response = await axios("/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return logout;
};

export default useLogout;
