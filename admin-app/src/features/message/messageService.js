import axios from "axios";
import { getConfig } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";

export const sendMessageAPI = async (receiverId, message) => {
  try {
    const res = await axios.post(
      `${base_url}message/send/${receiverId}`,
      message,
      getConfig
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to send message");
  }
};

export const getMessagesAPI = async (conversationId) => {
  try {
    const response = await axios.get(
      `${base_url}message/${conversationId}`,
      getConfig
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
