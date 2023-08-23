export const CheckEditorRole = (tableName, usersData) => {
  let flag = false;
  usersData[0]?.roles?.Editor?.Tables?.map((table) => {
    if (table.name === tableName) {
      flag = true;
      return true;
    }
  });
  if (flag) {
    return true;
  }
  return false;
};
