import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '@/lib/config';

// Async thunk to fetch slot data
export const Broadcasting = createAsyncThunk(
    'broadcasting/broadcastingSlotData',
    async ({id}) => { 
      try {
        const response = await axios.get(`${config.baseURL}/broadcasting`, {
          headers: {
            ...config.headers,
          }});
        return response.data;
      } catch (error) {
        return error;
      }
    }
  );
  const initialState = {
    Broadcasting: [],
    loading: false,
    error: null
  };

  
  
  const slotsSlice = createSlice({
    name: 'Broadcasting',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchSlotData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchSlotData.fulfilled, (state, action) => {
          state.loading = false;
          state.Broadcasting = action.payload;
        })
        .addCase(fetchSlotData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    }
  });
  
  export const slotsReducer = slotsSlice.reducer;
  

// Export the reducer
