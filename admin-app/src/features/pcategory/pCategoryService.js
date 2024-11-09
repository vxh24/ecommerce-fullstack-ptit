import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { getConfig } from "../../utils/axiosConfig";

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category/`);

  return response.data;
};
const createCategory = async (category) => {
  const response = await axios.post(
    `${base_url}category/`,
    category,
    getConfig
  );

  return response.data;
};

const getProductCategory = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, getConfig);

  return response.data;
};

const deleteProductCategory = async (id) => {
  const response = await axios.delete(`${base_url}category/${id}`, getConfig);

  return response.data;
};
const updateProductCategory = async (category) => {
  console.log(category);
  const response = await axios.put(
    `${base_url}category/${category.id}`,
    { title: category.pCatData.title },
    getConfig
  );

  return response.data;
};
const pCategoryService = {
  getProductCategories,
  createCategory,
  getProductCategory,
  deleteProductCategory,
  updateProductCategory,
};

export default pCategoryService;