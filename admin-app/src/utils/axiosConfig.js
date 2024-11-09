const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

console.log(getTokenFromLocalStorage.access_token);


export const getConfig = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.access_token
      : ""
      }`,
    Accept: "application/json",
  },
};