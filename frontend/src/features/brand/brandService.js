import axios from "axios";
import { base_url } from "../../utils/axiosConfig"

const getBrands = async () => {
  const response = await axios.get(`${base_url}brand/`);

  return response.data;
};

const brandService = {
  getBrands,
};

export default brandService;
