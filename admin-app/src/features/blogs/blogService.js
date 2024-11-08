import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blogs/`);

  return response.data;
};
const createBlog = async (blog) => {
  const response = await axios.post(`${base_url}blogs/`, blog, config);

  return response.data;
};
const updateBlog = async (blog) => {
  const response = await axios.put(
    `${base_url}blogs/${blog.id}`,
    {
      title: blog.blogData.title,
      description: blog.blogData.description,
      category: blog.blogData.category,
      images: blog.blogData.images,
    },
    config
  );

  return response.data;
};
const getBlog = async (id) => {
  const response = await axios.get(`${base_url}blogs/${id}`, config);

  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${base_url}blogs/${id}`, config);

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
