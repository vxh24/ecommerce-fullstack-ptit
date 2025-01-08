import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CartService } from "./CartService";

export const AddProdToCart = createAsyncThunk(
  "user/cart/add",
  async (product, thunkAPI) => {
    try {
      return await CartService.AddToCart(product);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatecountCart = createAsyncThunk(
  "user/updatecart",
  async ({ productId, color, newQuantity }, thunkAPI) => {
    try {
      return await CartService.updateCountProduct({
        productId,
        color,
        newQuantity,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteProductfromCart = createAsyncThunk(
  "user/removecart",
  async ({ productId, color }, thunkAPI) => {
    try {
      return await CartService.removePfromCart({ productId, color });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const cashOrderUser = createAsyncThunk(
  "user/cart/order",
  async ({ useId, totalAmount, orderAddress }, thunkAPI) => {
    try {
      return await CartService.cashOrder({ useId, totalAmount, orderAddress });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const printOrderSlice = createAsyncThunk(
  "user/print/order",
  async (orderId, thunkAPI) => {
    try {
      return await CartService.creatPrint(orderId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const momoOrderUser = createAsyncThunk(
  "user/cart/momo-order",
  async (
    {
      orderId,
      amount,
      resultCode,
      message,
      transId,
      partnerCode,
      responseTime,
      extraData
    },
    thunkAPI
  ) => {
    try {
      return await CartService.momoOrder({
        orderId,
        amount,
        resultCode,
        message,
        transId,
        partnerCode,
        responseTime,
        extraData,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const paymentMoMoSlice = createAsyncThunk(
  "order/paymentmomo",
  async ({ userId, totalAmount, orderAddress }, thunkAPI) => {
    try {
      return await CartService.createPayment({ userId, totalAmount, orderAddress });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  cart: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddProdToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddProdToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(AddProdToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updatecountCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatecountCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.update = action.payload;
      })
      .addCase(updatecountCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteProductfromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductfromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.remove = action.payload;
      })
      .addCase(deleteProductfromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(cashOrderUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cashOrderUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cashOrder = action.payload;
        toast.success("Thanh toán thành công!!!")
      })
      .addCase(cashOrderUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(momoOrderUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(momoOrderUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(momoOrderUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(paymentMoMoSlice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(paymentMoMoSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.momo = action.payload;
      })
      .addCase(paymentMoMoSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(printOrderSlice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(printOrderSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.print = action.payload;
      })
      .addCase(printOrderSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
  },
});

export default cartSlice.reducer;
