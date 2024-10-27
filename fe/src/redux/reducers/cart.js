// import { createReducer } from "@reduxjs/toolkit";

// const initialState = {
//   cart: localStorage.getItem("cartItems")
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : [],
// };

// export const cartReducer = createReducer(initialState, {
//   addToCart: (state, action) => {
//     const item = action.payload;
//     const isItemExist = state.cart.find((i) => i._id === item._id);
//     if (isItemExist) {
//       return {
//         ...state,
//         cart: state.cart.map((i) => (i._id === isItemExist._id ? item : i)),
//       };
//     } else {
//       return {
//         ...state,
//         cart: [...state.cart, item],
//       };
//     }
//   },

//   removeFromCart: (state, action) => {
//     return {
//       ...state,
//       cart: state.cart.filter((i) => i._id !== action.payload),
//     };
//   },
// });

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('addToCart', (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i.id === item.id);
      if (isItemExist) {
        // Cập nhật sản phẩm trong giỏ hàng nếu sản phẩm đã tồn tại
        state.cart = state.cart.map((i) => (i.id === isItemExist.id ? item : i));
      } else {
        // Thêm sản phẩm mới vào giỏ hàng
        state.cart.push(item);
      }
    })
    .addCase('removeFromCart', (state, action) => {
      // Xóa sản phẩm khỏi giỏ hàng
      state.cart = state.cart.filter((i) => i.id !== action.payload);
    });
});
