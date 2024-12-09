import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { productService } from "./productService";

export const getAllProducts = createAsyncThunk("product/get", async (_, thunkAPI) => {
  try {
    return await productService.getAllProducts();
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const getAProducts = createAsyncThunk("product/getAproduct", async (id, thunkAPI) => {
  try {
    return await productService.getAProducts(id);
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
export const RatingProduct = createAsyncThunk("products/rate", async (data, thunkAPI) => {
  try {
    return await productService.rateProduct(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const resetState = createAction("Reset_all");
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
      state.message = "Sản phẩm đã được thêm vào yêu thích"
    }).addCase(addToWishlist.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.error;
    })
      .addCase(getAProducts.pending, (state) => {
        state.isLoading = true;
      }).addCase(getAProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
        // state.message = "Product added to wishlist"
      }).addCase(getAProducts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(RatingProduct.pending, (state) => {
        state.isLoading = true;
      }).addCase(RatingProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.rating = action.payload;
        if (state.isSuccess === true) {
          toast.success("Đánh giá thành công");
        }
      }).addCase(RatingProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => productState);
  }
})
export default productSlice.reducer;