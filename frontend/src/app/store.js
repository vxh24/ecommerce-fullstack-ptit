import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/user/userSlice";
import productReducer from "../features/products/productSlice";
import blogReducer from "../features/blogs/blogSlice";
import contactReducer from "../features/contact/contactSlice";
import colorReducer from "../features/color/colorSlice";
import couponReducer from "../features/counpons/couponSlice";
import brandReducer from "../features/brand/brandSlice";
import categoryReducer from "../features/category/categorySlice";
import messageReducer from "../features/messages/messageSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    product: productReducer,
    blog: blogReducer,
    contact: contactReducer,
    color: colorReducer,
    coupon: couponReducer,
    brand: brandReducer,
    category: categoryReducer,
    message: messageReducer,
  },
});
