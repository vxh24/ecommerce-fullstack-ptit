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
const gglogin = async (userData) => {
  const response = await axios.post(`${base_url}google`, userData);
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
const AddToCart = async (product) => {
  const response = await axios.post(`${base_url}user/cart`, { cart: [product] }, config);
  if (response.data) {
    return response.data
  }
}
const getCart = async () => {
  const response = await axios.get(`${base_url}user/cart`, config);
  if (response.data) {
    return response.data
  }
}
const forgotPassword = async (data) => {
  const response = await axios.post(`${base_url}user/forgot-password`, { data }, config);
  if (response.data) {
    return response.data
  }
}
const resetPass = async (data) => {
  const response = await axios.put(`${base_url}user/reset-password/${data.token}`, { password: data?.password }, config);
  if (response.data) {
    return response.data
  }
}
const cashOrder = async (data) => {
  const response = await axios.post(`${base_url}user/cart/cash-order`, data, config);
  if (response.data) {
    return response.data
  }
}
const getOrder = async () => {
  const response = await axios.get(`${base_url}user/orders`, config);
  if (response.data) {
    return response.data
  }
}
const removePfromCart = async ({ productId, color }) => {
  const response = await axios.delete(`${base_url}user/cart/remove-product`, { data: { productId, color }, ...config });
  if (response.data) {
    return response.data;
  }
}
const updateCountProduct = async ({ productId, color, newQuantity }) => {
  const response = await axios.put(`${base_url}user/cart/update-product`, { productId, color, newQuantity }, config);
  if (response.data) {
    return response.data;
  }
}
export const authService = {
  createUser,
  handleLogin,
  getWishlist,
  AddToCart,
  getCart,
  forgotPassword,
  resetPass,
  gglogin,
  cashOrder,
  getOrder,
  removePfromCart,
  updateCountProduct
}