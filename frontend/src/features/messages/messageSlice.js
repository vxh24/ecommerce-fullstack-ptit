import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMessagesAPI, sendMessageAPI } from "./messageService";

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {
      const response = await sendMessageAPI(receiverId, message);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMessages = createAsyncThunk(
  "message/getMessages",
  async (conversationId, { rejectWithValue }) => {
    try {
      const messages = await getMessagesAPI(conversationId);
      return messages;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default messageSlice.reducer;
