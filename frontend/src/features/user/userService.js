import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";
const createUser = async (userData) => {
  const response = await axios.post(`${base_url}register`, userData);
  if (response.data) {
    // if (response.data) {
    //   localStorage.setItem("customer", JSON.stringify(response.data));
    // }
    return response.data;
  }
};

const handleLogin = async (userData) => {
  const response = await axios.post(`${base_url}login`, userData, config);
  if (response.data) {
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
    }
    return response.data;
  }
};
const gglogin = async (userData) => {
  const response = await axios.post(`${base_url}google`, userData, config);
  if (response.data) {
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
    }
    return response.data;
  }
};
const getWishlist = async () => {
  const response = await axios.get(`${base_url}user/wishlist`, config);
  if (response.data) {
    return response.data;
  }
};
const AddToCart = async (product) => {
  const response = await axios.post(
    `${base_url}user/cart`,
    { cart: [product] },
    config
  );
  if (response.data) {
    return response.data;
  }
};
const getCart = async () => {
  const response = await axios.get(`${base_url}user/cart`, config);
  if (response.data) {
    return response.data;
  }
};
const forgotPassword = async (data) => {
  const response = await axios.post(
    `${base_url}user/forgot-password`,
    { data },
    config
  );
  if (response.data) {
    return response.data;
  }
};
const resetPass = async (data) => {
  const response = await axios.put(
    `${base_url}user/reset-password/${data.token}`,
    { password: data?.password },
    config
  );
  if (response.data) {
    return response.data;
  }
};
const changePass = async (password) => {
  const response = await axios.put(
    `${base_url}user/update-password`,
    password,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const cashOrder = async ({ userId, totalAmount, orderAddress }) => {
  const response = await axios.post(
    `${base_url}user/cart/cash-order`,
    { userId, totalAmount, orderAddress },
    config
  );
  if (response.data) {
    return response.data;
  }
};

const momoOrder = async ({
  orderId,
  amount,
  resultCode,
  message,
  transId,
  partnerCode,
  responseTime,
  extraData,
}) => {
  const response = await axios.post(
    `${base_url}order/payment-callback`,
    {
      orderId,
      amount,
      resultCode,
      message,
      transId,
      partnerCode,
      responseTime,
      extraData,
    },
    config
  );
  if (response.data) {
    return response.data;
  }
};

const getOrder = async () => {
  const response = await axios.get(`${base_url}user/orders`, config);
  if (response.data) {
    return response.data;
  }
};
const removePfromCart = async ({ productId, color }) => {
  const response = await axios.delete(`${base_url}user/cart/remove-product`, {
    data: { productId, color },
    ...config,
  });
  if (response.data) {
    return response.data;
  }
};
const updateCountProduct = async ({ productId, colorId, newQuantity }) => {
  const response = await axios.put(
    `${base_url}user/cart/update-product`,
    { productId, colorId, newQuantity },
    config
  );
  if (response.data) {
    return response.data;
  }
};
const createAddress = async (data) => {
  const response = await axios.put(
    `${base_url}user/save-address`,
    data,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const getAddress = async () => {
  const response = await axios.get(`${base_url}user/address`, config);
  if (response.data) {
    return response.data;
  }
};
const removeAddress = async (id) => {
  const response = await axios.delete(`${base_url}user/address/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
const updateAddress = async (addressData) => {
  const response = await axios.put(
    `${base_url}user/address/${addressData.id}`,
    addressData,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const logOut = async () => {
  const response = await axios.get(`${base_url}logout`, config);
  if (response.data) {
    return response.data;
  }
};
const getProfile = async () => {
  const response = await axios.get(`${base_url}user/profile`, config);
  if (response.data) {
    return response.data;
  }
};
const applyCoupon = async (counpon) => {
  const response = await axios.post(
    `${base_url}user/apply-coupon`,
    counpon,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const createPayment = async ({ userId, totalAmount, orderAddress }) => {
  const response = await axios.post(
    `${base_url}order/create-payment`,
    { userId, totalAmount, orderAddress },
    config
  );
  if (response.data) {
    return response.data;
  }
};
const updateProfileUser = async ({ id, data }) => {
  // console.log(data);
  const response = await axios.put(`${base_url}user/${id}`, data, config);
  if (response.data) {
    return response.data;
  }
};
const cancelOrder = async (id) => {
  const response = await axios.put(
    `${base_url}order/cancel-order/${id}`,
    { data: {} },
    config
  );
  if (response.data) {
    return response.data;
  }
};

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
  updateCountProduct,
  createAddress,
  getAddress,
  removeAddress,
  updateAddress,
  changePass,
  logOut,
  getProfile,
  momoOrder,
  applyCoupon,
  createPayment,
  updateProfileUser,
  cancelOrder,
};
