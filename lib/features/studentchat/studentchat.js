import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "@/lib/config";

export const createChat = createAsyncThunk("chat/create", async (requestData) => {
  try {
    const response = await axios.post(`${config.baseURL}/student/chats`, requestData, {
      headers: {
        ...config.headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data; // Return response data if success
  } catch (error) {
    // Throw the error if the request fails
    throw error;
  }
});

 export const fetchChats = createAsyncThunk(
   'chats/fetch',
   async () => {
     try {
       const response = await axios.get(`${config.baseURL}/student/chats`, {
         headers: {
           ...config.headers,
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       });
       return response.data;
     } catch (error) {
       throw error;
     }
   }
 );
 
const initialState = {
    postData: [],
    getData: [],
  loading: false,
  getdataloader : false,
  error: null,
};

const chatSlice = createSlice({
  name: "chatcreate",
  initialState: { data: initialState }, // Initialize data object with the initial state
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createChat.pending, (state) => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.data.loading = false;
        state.data.postData = action?.payload;
      })
      .addCase(createChat.rejected, (state, action) => {
        state.data.loading = false;
        state.data.error = action?.error?.message;
      })
       .addCase(fetchChats.pending, (state) => {
         state.data.getdataloader = true;
         state.data.error = null;
       })
       .addCase(fetchChats.fulfilled, (state, action) => {
         state.data.getdataloader = false;
         state.data.getData = action?.payload;
       })
       .addCase(fetchChats.rejected, (state, action) => {
         state.data.getdataloader = false;
         state.data.error = action?.error?.message;
       });
  },
});

export const ChatReducer = chatSlice.reducer;
