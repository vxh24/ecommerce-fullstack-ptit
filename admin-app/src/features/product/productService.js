import axios from "axios";
import { getConfig } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);
  return response.data;
};

const getProductById = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  return response.data;
};

const createProduct = async (product) => {
  console.log("Is FormData createProduct:", product instanceof FormData);
  const response = await axios.post(`${base_url}product/`, product, getConfig);
  return response.data;
};

const deleteAProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, getConfig);
  return response.data;
};

const updateProduct = async (productId, productData) => {
  console.log("productData: ", productData);
  console.log("getConfig: ", getConfig);

  const response = await axios.put(
    `${base_url}product/${productId}`,
    productData,
    getConfig
  );
  // console.log(
  //   "Array.from(productData.entries())",
  //   Array.from(productData.entries())
  // );
  console.log("Is FormData:", productData instanceof FormData);

  console.log("response.data: ", response.data);

  return response.data;
};

const generateQRCode = async (productId) => {
  const response = await axios.get(
    `${base_url}product/generate-qr/${productId}`,
    getConfig
  );

  return response.data;
};

const productService = {
  getProducts,
  getProductById,
  createProduct,
  deleteAProduct,
  updateProduct,
  generateQRCode,
};

export default productService;
