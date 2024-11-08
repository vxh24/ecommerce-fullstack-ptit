import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import blogReducer from "../features/blogs/blogSlice";
import bCategoryReducer from "../features/bcategory/bcategorySlice";
import customerReducer from "../features/customers/customerSlice";
import colorReducer from "../features/color/colorSlice";
import pCategoryReducer from "../features/pcategory/pCategorySlice";
import brandReducer from "../features/brand/brandSlice";
import productReducer from "../features/product/productSlice";
import uploadReducer from "../features/upload/uploadSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    bCategory: bCategoryReducer,
    blogs: blogReducer,
    brand: brandReducer,
    color: colorReducer,
    customer: customerReducer,
    enquiry: enquiryReducer,
    pCategory: pCategoryReducer,
    product: productReducer,
    upload: uploadReducer,
  },
});
