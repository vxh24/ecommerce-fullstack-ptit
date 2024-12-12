import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

export const sendMessageAPI = async (receiverId, message) => {
  try {
    const res = await axios.post(
      `${base_url}message/send/${receiverId}`,
      message,
      config
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
      config
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
