import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";

const getUserFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserFromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/get-orders",
  async (thunkAPI) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "order/get-order",
  async (id, thunkAPI) => {
    try {
      return await authService.getOrderById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateOrderStatusSlice = createAsyncThunk(
  "order/update-order",
  async ({ id, status }, thunkAPI) => {
    try {
      return await authService.updateOrderStatus({ id, status });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getRevenue = createAsyncThunk(
  "order/get-revenue",
  async (thunkAPI) => {
    try {
      return await authService.getRevenue();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getStatistic = createAsyncThunk(
  "order/statistic",
  async (year, thunkAPI) => {
    try {
      return await authService.getStatistic(year);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orderbyuser = action.payload;
        state.message = "success";
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(updateOrderStatusSlice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatusSlice.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orderupdate = action.payload;
        state.message = "success";
      })
      .addCase(updateOrderStatusSlice.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getRevenue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRevenue.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.totalRevenue = action.payload;
        state.message = "success";
      })
      .addCase(getRevenue.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getStatistic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStatistic.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.statistic = action.payload;
        state.message = "success";
      })
      .addCase(getStatistic.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
