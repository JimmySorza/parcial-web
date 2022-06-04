const getLocalUser = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  return {
    localUser,
    isLogged: localUser && localUser !== "undefined",
  };
};
export default getLocalUser;
