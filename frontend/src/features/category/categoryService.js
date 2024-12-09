import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig"

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category/`);

  return response.data;
};

const categoryService = {
  getProductCategories,
};

export default categoryService;
