export const getConfig = () => {
  const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  console.log(getTokenFromLocalStorage.token);

  return {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };
};
