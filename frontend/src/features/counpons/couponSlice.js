import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { couponService } from "./couponService";

export const getAllCoupon = createAsyncThunk("coupon/get", async (thunkAPI) => {
  try {
    return await couponService.getAllCoupons();
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const couponState = {
  coupons: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}
export const couponSlice = createSlice({
  name: "coupon",
  initialState: couponState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCoupon.pending, (state) => {
      state.isLoading = true;
    }).addCase(getAllCoupon.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.coupons = action.payload;
    }).addCase(getAllCoupon.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.error;
    })
  }
})
export default couponSlice.reducer;