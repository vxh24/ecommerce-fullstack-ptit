import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from "../features/user/userSlice";
import productReducer from "../features/products/productSlice";
import blogReducer from "../features/blogs/blogSlice"
import contactReducer from "../features/contact/contactSlice"
import colorReducer from "../features/color/colorSlice";
import couponReducer from "../features/counpons/couponSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    product: productReducer,
    blog: blogReducer,
    contact: contactReducer,
    color: colorReducer,
    coupon: couponReducer,
  },
});
