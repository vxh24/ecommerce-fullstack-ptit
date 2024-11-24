import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig"
const getAllCoupons = async () => {
  const response = await axios.get(`${base_url}coupon`, config);
  if (response.data) {
    return response.data
  }
};


export const couponService = {
  getAllCoupons,
}