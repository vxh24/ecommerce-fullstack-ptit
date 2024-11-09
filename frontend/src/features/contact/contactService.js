import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig"
const createEnquiry = async (contactData) => {
  const response = await axios.post(`${base_url}enquiry`, contactData);
  if (response.data) {
    return response.data
  }
}

export const contactService = {
  createEnquiry,
}