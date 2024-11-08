import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig"
const getAllProducts = async (userData) => {
  const response = await axios.get(`${base_url}product`);
  if (response.data) {
    return response.data
  }
}
const getAProducts = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  if (response.data) {
    return response.data
  }
}

const addToWishlist = async (productId) => {
  const response = await axios.put(`${base_url}product/wishlist`, { productId }, config);
  if (response.data) {
    return response.data
  }
}

export const productService = {
  getAllProducts,
  addToWishlist,
  getAProducts
}