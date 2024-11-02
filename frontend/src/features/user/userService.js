import axios from "axios";
import { base_url } from "../../utils/axiosConfig"
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
    return response.data
  }
}

export const authService = {
  createUser,
  handleLogin,
}