import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerService";

export const getUsers = createAsyncThunk(
  "customer/get-customers",
  async (thunkAPI) => {
    try {
      return await customerService.getUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const blockAUser = createAsyncThunk(
  "customer/block-user",
  async (userId, thunkAPI) => {
    try {
      await customerService.blockAUser(userId);
      return userId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const unBlockAUser = createAsyncThunk(
  "customer/unblock-user",
  async (userId, thunkAPI) => {
    try {
      await customerService.unBlockAUser(userId);
      return userId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const customerSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(blockAUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(blockAUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "User blocked successfully";

        const updatedUsers = state.customers?.data.map((user) =>
          user._id === action.payload
            ? { ...user, isBlock: !user.isBlock }
            : user
        );
        state.customers.data = updatedUsers;
      })
      .addCase(blockAUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Error blocking user";
      })
      .addCase(unBlockAUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unBlockAUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "User unblocked successfully";

        const updatedUsers = state.customers?.data.map((user) =>
          user._id === action.payload
            ? { ...user, isBlock: !user.isBlock }
            : user
        );
        state.customers.data = updatedUsers;
      })
      .addCase(unBlockAUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Error unblocking user";
      });
  },
});
export default customerSlice.reducer;
