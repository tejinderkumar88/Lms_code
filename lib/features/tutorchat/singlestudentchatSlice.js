import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "@/lib/config";

export const SinglestudentChat = createAsyncThunk(
  "singlestudent/single",
  async (params) => {
       const { id,skip } = params;

    try {
      const response = await axios.get(
        `${config.baseURL}/tutor/chats/${id}?limit=10&skip=${skip ? skip :  0}`,{
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
  singlechatstudent: [],
  isChatLoading: false,
  loading: false,
  error: null,
};


const Singlestudentchat = createSlice({
  name: "fetchdata",
  initialState: initialState, // Initialize data object with the initial state
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SinglestudentChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SinglestudentChat.fulfilled, (state, action) => {
        state.loading = false;
        state.singlechatstudent = action?.payload;
      })
      .addCase(SinglestudentChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const SinglestudentchatReducer = Singlestudentchat.reducer;
