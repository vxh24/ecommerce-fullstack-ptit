import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { getConfig } from "../../utils/axiosConfig";

const getColors = async () => {
  const response = await axios.get(`${base_url}color/`);

  return response.data;
};

const createColor = async (color) => {
  const response = await axios.post(`${base_url}color/`, color, getConfig);

  return response.data;
};

const updateColor = async (color) => {
  const response = await axios.put(
    `${base_url}color/${color.id}`,
    { title: color.colorData.title },
    getConfig
  );

  return response.data;
};

const getColor = async (id) => {
  const response = await axios.get(`${base_url}color/${id}`);

  return response.data;
};

const deleteColor = async (id) => {
  const response = await axios.delete(`${base_url}color/${id}`, getConfig);

  return response.data;
};

const colorService = {
  getColors,
  createColor,
  updateColor,
  getColor,
  deleteColor,
};

export default colorService;
