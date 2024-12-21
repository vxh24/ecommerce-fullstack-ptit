import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import blogReducer from "../features/blogs/blogSlice";
import bCategoryReducer from "../features/bcategory/bcategorySlice";
import customerReducer from "../features/customers/customerSlice";
import pCategoryReducer from "../features/pcategory/pCategorySlice";
import brandReducer from "../features/brand/brandSlice";
import productReducer from "../features/product/productSlice";
import couponReducer from "../features/coupon/couponSlice";
import cartReducer from "../features/cart/CartSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    bCategory: bCategoryReducer,
    blogs: blogReducer,
    brand: brandReducer,
    coupon: couponReducer,
    customer: customerReducer,
    enquiry: enquiryReducer,
    pCategory: pCategoryReducer,
    product: productReducer,
    cart: cartReducer,
  },
});
