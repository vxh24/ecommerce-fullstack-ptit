import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig"
const getAllColor = async () => {
  const response = await axios.get(`${base_url}color`);
  if (response.data) {
    return response.data
  }
}

export const colorService = {
  getAllColor,
}