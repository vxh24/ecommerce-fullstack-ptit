import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { getConfig } from "../../utils/axiosConfig";

const getUsers = async () => {
  const response = await axios.get(`${base_url}user/all-users`, getConfig);

  return response.data;
};

const blockAUser = async (userId) => {
  try {
    const response = await axios.put(
      `${base_url}user/block/${userId}`,
      { data: {} },
      getConfig
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to block the user");
    }
  } catch (error) {
    console.error("Error blocking user:", error);
    throw error;
  }
};

const unBlockAUser = async (userId) => {
  try {
    const response = await axios.put(
      `${base_url}user/unblock/${userId}`,
      { data: {} },
      getConfig
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to unblock the user");
    }
  } catch (error) {
    console.error("Error unblocking user:", error);
    throw error;
  }
};

const customerService = {
  getUsers,
  blockAUser,
  unBlockAUser,
};

export default customerService;
