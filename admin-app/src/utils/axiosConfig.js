const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const getConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null
        ? getTokenFromLocalStorage.access_token
        : ""
    }`,
    Accept: "application/json",
  },
};

export const getConfig1 = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null
        ? getTokenFromLocalStorage.access_token
        : ""
    }`,
    Accept: "application/json",
  },
};
