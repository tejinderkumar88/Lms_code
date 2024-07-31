import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "@/lib/config";

export const sendChat = createAsyncThunk(
  "chat/send",
  async (params) => {
    const { receiver_id,message,chatId } = params;
    try {
      const response = await axios.post(
        `${config.baseURL}/student/chats/send_message/${chatId}`, {receiver_id : receiver_id,message :message} ,
        {
          headers: {
            ...config.headers,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data; // Return response data if success
    } catch (error) {
      // Throw the error if the request fails
      throw error;
    }
  }
);

const initialState = {
  sendchat: [],
  loading: false,
  error: null,
};

const Sendinputchat = createSlice({
  name: "sendchat",
  initialState: initialState, // Initialize data object with the initial state
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendChat.fulfilled, (state, action) => {
        state.loading = false;
        state.sendchat = action?.payload;
      })
      .addCase(sendChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const Sendchat = Sendinputchat.reducer;
