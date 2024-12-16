import axios from "axios";
import { getConfig, getConfig1 } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";

const AddToCart = async (product) => {
  const response = await axios.post(
    `${base_url}user/cart`,
    { cart: [product] },
    getConfig1
  );
  if (response.data) {
    return response.data;
  }
};
const updateCountProduct = async ({ productId, colorId, newQuantity }) => {
  const response = await axios.put(
    `${base_url}user/cart/update-product`,
    { productId, colorId, newQuantity },
    getConfig1
  );
  if (response.data) {
    return response.data;
  }
};
const removePfromCart = async ({ productId, color }) => {
  const response = await axios.delete(`${base_url}user/cart/remove-product`, {
    data: { productId, color },
    ...getConfig1,
  });
  if (response.data) {
    return response.data;
  }
};
const cashOrder = async ({ totalAmount, orderAddress }) => {
  const response = await axios.post(
    `${base_url}user/cart/cash-order`,
    { totalAmount, orderAddress },
    getConfig1
  );
  if (response.data) {
    return response.data;
  }
};
const createPayment = async ({ totalAmount, orderAddress }) => {
  const response = await axios.post(
    `${base_url}order/create-payment`,
    { totalAmount, orderAddress },
    getConfig1
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
    getConfig1
  );
  if (response.data) {
    return response.data;
  }
};
export const CartService = {
  AddToCart,
  updateCountProduct,
  removePfromCart,
  cashOrder,
  createPayment,
  momoOrder
};

