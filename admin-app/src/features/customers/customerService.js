import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { getConfig } from "../../utils/axiosConfig";

const getUsers = async () => {
  const response = await axios.get(`${base_url}user/all-users`, getConfig);

  return response.data;
};

const customerService = {
  getUsers,
};

export default customerService;
