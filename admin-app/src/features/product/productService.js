import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}products/`);

  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}products/`, product, config);

  return response.data;
};

const productService = {
  getProducts,
  createProduct,
};

export default productService;
