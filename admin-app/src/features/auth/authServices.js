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

const getOrderById = async (id) => {
  const response = await axios.get(`${base_url}user/order/${id}`, getConfig);

  return response.data;
};

const updateOrderStatus = async ({ id, status }) => {
  const response = await axios.put(
    `${base_url}order/update-order/${id}`,
    { status },
    getConfig
  );

  return response.data;
};

const getRevenue = async () => {
  const response = await axios.get(`${base_url}order/get-revenue`, getConfig);

  return response.data;
};

const getStatistic = async (year) => {
  const response = await axios.get(
    `${base_url}order/statistic?year=${year}`,
    getConfig
  );

  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getRevenue,
  getStatistic,
};

export default authService;
