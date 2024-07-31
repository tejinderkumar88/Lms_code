import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "@/lib/config";

export const sendChatfromTutor = createAsyncThunk(
  "chat/send",
  async (params) => {
    const { message, chatId } = params;
    try {
      const response = await axios.post(
        `${config.baseURL}/tutor/chats/send_message/${chatId}`,
        { message: message },
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
  tutorchat: [],
  loading: false,
  error: null,
};

const Sendinputchat = createSlice({
  name: "tutorchat",
  initialState: initialState, // Initialize data object with the initial state
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendChatfromTutor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(sendChatfromTutor.fulfilled, (state, action) => {
        state.loading = false;
        state.tutorchat = action?.payload;
      })
      .addCase(sendChatfromTutor.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const TutorChatReducer = Sendinputchat.reducer;
