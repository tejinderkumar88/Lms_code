import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "@/lib/config";

export const fetchStudentChats = createAsyncThunk("tutor/chats/fetch", async () => {
  try {
    const response = await axios.get(`${config.baseURL}/tutor/chats`, {
      headers: {
        ...config.headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});


const initialState = {
  getstudentData: [],
  loading: false,
  error: null,
};

const chatstudentSlice = createSlice({
  name: "getstudetnchat",
  initialState: { data: initialState }, // Initialize data object with the initial state
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentChats.pending, (state) => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(fetchStudentChats.fulfilled, (state, action) => {
        state.data.loading = false;
        state.data.getstudentData = action?.payload;
      })
      .addCase(fetchStudentChats.rejected, (state, action) => {
        state.data.loading = false;
        state.data.error = action?.error?.message;
      });
  },
});

export const TutorchatReducer = chatstudentSlice.reducer;
