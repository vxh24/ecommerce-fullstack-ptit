import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { getConfig } from "../../utils/axiosConfig";

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blog-category/`);

  return response.data;
};

const createBlogCategory = async (bcat) => {
  const response = await axios.post(
    `${base_url}blog-category/`,
    bcat,
    getConfig
  );

  return response.data;
};

const updateBlogCategory = async (blogCat) => {
  const response = await axios.put(
    `${base_url}blog-category/${blogCat.id}`,
    { title: blogCat.blogCatData.title },
    getConfig
  );

  return response.data;
};

const getBlogCategory = async (id) => {
  const response = await axios.get(`${base_url}blog-category/${id}`, getConfig);

  return response.data;
};

const deleteBlogCategory = async (id) => {
  const response = await axios.delete(
    `${base_url}blog-category/${id}`,
    getConfig
  );

  return response.data;
};

const bCategoryService = {
  getBlogCategories,
  createBlogCategory,
  deleteBlogCategory,
  getBlogCategory,
  updateBlogCategory,
};

export default bCategoryService;
