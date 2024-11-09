import axios from "axios";
import { getConfig } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";

const getEnquiries = async () => {
  const response = await axios.get(`${base_url}enquiry/`, getConfig);

  return response.data;
};

const deleteEnquiry = async (id) => {
  const response = await axios.delete(`${base_url}enquiry/${id}`, getConfig);
  return response.data;
};

const getEnquiry = async (id) => {
  const response = await axios.get(`${base_url}enquiry/${id}`);
  return response.data;
};

const updateEnquiry = async (enq) => {
  const response = await axios.put(
    `${base_url}enquiry/${enq.id}`,
    { status: enq.enqData },
    getConfig
  );
  return response.data;
};

const enquiryService = {
  getEnquiries,
  deleteEnquiry,
  getEnquiry,
  updateEnquiry,
};

export default enquiryService;
