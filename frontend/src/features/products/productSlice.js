import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";

export const getAllProducts = createAsyncThunk("product/get", async (_, thunkAPI) => {
  try {
    return await productService.getAllProducts();
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const addToWishlist = createAsyncThunk("products/wishlist", async (productId, thunkAPI) => {
  try {
    return await productService.addToWishlist(productId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
const productState = {
  products: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}
export const productSlice = createSlice({
  name: "product",
  initialState: productState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    }).addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.products = action.payload;
    }).addCase(getAllProducts.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.error;
    }).addCase(addToWishlist.pending, (state) => {
      state.isLoading = true;
    }).addCase(addToWishlist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.addToWishlist = action.payload;
      state.message = "Product added to wishlist"
    }).addCase(addToWishlist.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.error;
    })
  }
})
export default productSlice.reducer;