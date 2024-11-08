import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig"
const createUser = async (userData) => {
  const response = await axios.post(`${base_url}register`, userData);
  if (response.data) {
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
    }
    return response.data
  }
}

const handleLogin = async (userData) => {
  const response = await axios.post(`${base_url}login`, userData);
  if (response.data) {
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
    }
    return response.data
  }
}
const getWishlist = async () => {
  const response = await axios.get(`${base_url}user/wishlist`, config);
  if (response.data) {
    return response.data
  }
}
export const authService = {
  createUser,
  handleLogin,
  getWishlist,
}