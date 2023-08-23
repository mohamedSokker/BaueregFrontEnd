export const isUserAllowedCategory = (name, usersData) => {
  if (usersData && usersData[0]?.roles?.Admin) {
    return true;
  }
  if (
    usersData &&
    (usersData[0]?.roles?.Editor[name] === true ||
      usersData[0]?.roles?.Editor[name]?.length > 0)
  ) {
    return true;
  }
  if (
    usersData &&
    (usersData[0]?.roles?.User[name] === true ||
      usersData[0]?.roles?.User[name]?.length > 0)
  ) {
    return true;
  }
  return false;
};
