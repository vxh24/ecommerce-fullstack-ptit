import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify"
export const createUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {

    return await authService.createUser(userData)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const handleLogin = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    return await authService.handleLogin(userData)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const getUserProductWishlist = createAsyncThunk("user/wishlist", async (thunkAPI) => {
  try {
    return await authService.getWishlist()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
const getCustomerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;
const initialState = {
  user: getCustomerfromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
    }).addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.createUser = action.payload;
      if (state.isSuccess === true) {
        toast.info("User Create Successfully");
        console.log("User Create Successfullyaaaa")
      }
    }).addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if (state.isError === true) {
        toast.error(action.error)
      }
    }).addCase(handleLogin.pending, (state) => {
      state.isLoading = true;
    }).addCase(handleLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = action.payload;

      if (state.isSuccess === true) {
        localStorage.setItem("token", action.payload.access_token)
        toast.info("Login Successfully");
        console.log("Login Successfullyaaaa")
      }
    }).addCase(handleLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if (state.isError === true) {
        toast.error(action.error)
      }
    }).addCase(getUserProductWishlist.pending, (state) => {
      state.isLoading = true;

    }).addCase(getUserProductWishlist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.wishlist = action.payload;
    }).addCase(getUserProductWishlist.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
      if (state.isError === true) {
        toast.error(action.error)
      }
    })
  }
})
export default authSlice.reducer;