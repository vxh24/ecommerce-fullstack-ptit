import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blog-categories/`);

  return response.data;
};

const createBlogCategory = async (bcat) => {
  const response = await axios.post(
    `${base_url}blog-categories/`,
    bcat,
    config
  );

  return response.data;
};

const updateBlogCategory = async (blogCat) => {
  const response = await axios.put(
    `${base_url}blog-categories/${blogCat.id}`,
    { title: blogCat.blogCatData.title },
    config
  );

  return response.data;
};

const getBlogCategory = async (id) => {
  const response = await axios.get(`${base_url}blog-categories/${id}`, config);

  return response.data;
};

const deleteBlogCategory = async (id) => {
  const response = await axios.delete(
    `${base_url}blog-categories/${id}`,
    config
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
