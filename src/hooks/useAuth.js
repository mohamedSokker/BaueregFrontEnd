import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useNavContext } from "../contexts/NavContext";

const RequiredAuth = ({ allowedRole }) => {
  const { usersData } = useNavContext();
  const location = useLocation();

  console.log(usersData.length);

  return usersData.length > 0 &&
    (usersData[0]?.roles.Editor[allowedRole] === true ||
      usersData[0]?.roles.Editor[allowedRole].length > 0 ||
      usersData[0]?.roles.User[allowedRole] === true ||
      usersData[0]?.roles.User[allowedRole].length > 0) ? (
    <Outlet />
  ) : (
    <Navigate to="/Login" state={{ from: location }} replace />
  );
};

export default RequiredAuth;
