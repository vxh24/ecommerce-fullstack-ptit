import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { blogService } from "./blogService";

export const getAllBlog = createAsyncThunk("blogs/get", async (_, thunkAPI) => {
  try {
    return await blogService.getAllBlogs();
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getBlog = createAsyncThunk("blog/get", async (id, thunkAPI) => {
  try {
    return await blogService.getABlog(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const blogState = {
  blogs: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}
export const blogSlice = createSlice({
  name: "blog",
  initialState: blogState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBlog.pending, (state) => {
      state.isLoading = true;
    }).addCase(getAllBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.blogs = action.payload;
    }).addCase(getAllBlog.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.error;
    })
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      }).addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleblog = action.payload;
        state.message = "Product added to wishlist"
      }).addCase(getBlog.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
  }
})
export default blogSlice.reducer;