import axios from "axios";
import { getConfig } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";

const login = async (user) => {
  const response = await axios.post(`${base_url}admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/get-all-orders`, getConfig);

  return response.data;
};

const getOrderByUID = async (id) => {
  const response = await axios.post(
    `${base_url}user/order/${id}`,
    "",
    getConfig
  );

  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrderByUID,
};

export default authService;