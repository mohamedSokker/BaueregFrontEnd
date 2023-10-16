import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useNavContext } from "../contexts/NavContext";

const RequiredAuth = () => {
  const { usersData } = useNavContext();
  const location = useLocation();

  console.log(usersData.length);

  return usersData.length > 0 ? (
    <Outlet />
  ) : (
    <Navigate to="/Login" state={{ from: location }} replace />
  );
};

export default RequiredAuth;
