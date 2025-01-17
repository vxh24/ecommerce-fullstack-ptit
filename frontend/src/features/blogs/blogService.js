import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";
const getAllBlogs = async (params = {}) => {
  const response = await axios.get(`${base_url}blog`, { params });
  if (response.data) {
    return response.data;
  }
};

const getAllBlogCat = async () => {
  const response = await axios.get(`${base_url}blog-category/`);
  if (response.data) {
    return response.data;
  }
};

const getABlog = async (id) => {
  const response = await axios.get(`${base_url}blog/${id}`);
  if (response.data) {
    return response.data;
  }
};

const like = async (id) => {
  const response = await axios.put(`${base_url}blog/likes`, id, config);
  if (response.data) {
    return response.data;
  }
};

const dislike = async (id) => {
  const response = await axios.put(`${base_url}blog/dislikes`, id, config);
  if (response.data) {
    return response.data;
  }
};

export const blogService = {
  getAllBlogs,
  getABlog,
  like,
  dislike,
  getAllBlogCat,
};
