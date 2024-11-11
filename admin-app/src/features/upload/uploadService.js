import axios from "axios";
import { getConfig } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";

const uploadImg = async (data) => {
  const response = await axios.post(
    `${base_url}product/upload/`,
    data,
    getConfig
  );
  return response.data;
};

const deleteImg = async (id) => {
  const response = await axios.delete(
    `${base_url}product/upload/delete-img/${id}`,
    getConfig
  );
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
