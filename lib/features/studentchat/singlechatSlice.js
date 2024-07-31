import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "@/lib/config";

export const getSingleChat = createAsyncThunk(
  "getSingleChat/GetsingleChat",
  async (params) => {
    const { id,skip } = params;
    try {
      const response = await axios.get(
        `${config.baseURL}/student/chats/${id}?limit=10&skip=${skip ? skip :  0}`,{
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
  singlechat: [],
  loading: false,
  error: null,
};

const GetsingleChat = createSlice({
  name: "chatcreate",
  initialState: initialState, // Initialize data object with the initial state
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleChat.fulfilled, (state, action) => {
        state.loading = false;
        state.singlechat = action?.payload;
      })
      .addCase(getSingleChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const GetSingleChat = GetsingleChat.reducer;
