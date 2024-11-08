import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";
const getBrands = async () => {
  const response = await axios.get(`${base_url}brands/`);

  return response.data;
};

const createBrand = async (brand) => {
  const response = await axios.post(`${base_url}brands/`, brand, config);

  return response.data;
};
const updateBrand = async (brand) => {
  const response = await axios.put(
    `${base_url}brands/${brand.id}`,
    { title: brand.brandData.title },
    config
  );

  return response.data;
};
const getBrand = async (id) => {
  const response = await axios.get(`${base_url}brands/${id}`, config);

  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axios.delete(`${base_url}brands/${id}`, config);

  return response.data;
};

const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
