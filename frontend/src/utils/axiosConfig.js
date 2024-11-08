export const base_url = "http://localhost:5000/v1/api/";
const getTokenFromLocalStorage = localStorage.getItem("customer") ?
  JSON.parse(localStorage.getItem("customer")) : null

export const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.
      access_token
      : ""
      }`,
    Accept: "application/json",
  },
}