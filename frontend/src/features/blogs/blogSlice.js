import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { blogService } from "./blogService";

export const getAllBlog = createAsyncThunk(
  "blogs/get",
  async (params = {}, thunkAPI) => {
    try {
      return await blogService.getAllBlogs(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllBlogCat = createAsyncThunk(
  "blogs/getCat",
  async (_, thunkAPI) => {
    try {
      return await blogService.getAllBlogCat();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBlog = createAsyncThunk("blog/get", async (id, thunkAPI) => {
  try {
    return await blogService.getABlog(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const likeSlice = createAsyncThunk("blog/like", async (id, thunkAPI) => {
  try {
    return await blogService.like(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const dislikeSlice = createAsyncThunk(
  "blog/dislike",
  async (id, thunkAPI) => {
    try {
      return await blogService.dislike(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const blogState = {
  blogs: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const blogSlice = createSlice({
  name: "blog",
  initialState: blogState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(getAllBlog.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleblog = action.payload;
        state.message = "Product added to wishlist";
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(likeSlice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.like = action.payload;
      })
      .addCase(likeSlice.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(dislikeSlice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(dislikeSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.dislike = action.payload;
      })
      .addCase(dislikeSlice.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAllBlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogcat = action.payload;
      })
      .addCase(getAllBlogCat.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export default blogSlice.reducer;
