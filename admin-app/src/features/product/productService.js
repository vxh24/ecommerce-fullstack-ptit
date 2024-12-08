import axios from "axios";
import { getConfig } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, getConfig);

  return response.data;
};

const deleteAProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, getConfig);

  return response.data;
};

const updateProduct = async (id) => {};

const productService = {
  getProducts,
  createProduct,
  deleteAProduct,
};

export default productService;
