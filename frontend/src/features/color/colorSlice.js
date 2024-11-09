import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { colorService } from "./colorService";

export const getAllColors = createAsyncThunk("color/get", async (_, thunkAPI) => {
  try {
    return await colorService.getAllColor();
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const colorState = {
  colors: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}
export const colorSlice = createSlice({
  name: "color",
  initialState: colorState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllColors.pending, (state) => {
      state.isLoading = true;
    }).addCase(getAllColors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.colors = action.payload;
    }).addCase(getAllColors.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.error;
    })
  }
})
export default colorSlice.reducer;