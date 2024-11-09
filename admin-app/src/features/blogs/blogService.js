import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { getConfig } from "../../utils/axiosConfig";

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog/`);

  return response.data;
};
const createBlog = async (blog) => {
  const response = await axios.post(`${base_url}blog/`, blog, getConfig);

  return response.data;
};
const updateBlog = async (blog) => {
  const response = await axios.put(
    `${base_url}blog/${blog.id}`,
    {
      title: blog.blogData.title,
      description: blog.blogData.description,
      category: blog.blogData.category,
      images: blog.blogData.images,
    },
    getConfig
  );

  return response.data;
};
const getBlog = async (id) => {
  const response = await axios.get(`${base_url}blog/${id}`, getConfig);

  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${base_url}blog/${id}`, getConfig);

  return response.data;
};
const blogService = {
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};

export default blogService;
