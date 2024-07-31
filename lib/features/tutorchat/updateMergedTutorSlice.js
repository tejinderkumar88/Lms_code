import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  globalArray: [],
};

const MergedtutorMessageSlice = createSlice({
  name: 'globalArray',
  initialState,
  reducers: {
    updateGlobalArray(state, action) {
      const { payload } = action;

      // If message_id doesn't exist, push the new message
 
        state.globalArray.push(payload);

    },
    clearGlobalArray(state) {
      state.globalArray = []; // Clear the array
    },
    resetGlobalArray(state) {
      state.globalArray = initialState.globalArray; // Reset the array to initial state
    },
  },
});

export const { updateGlobalArray, clearGlobalArray, resetGlobalArray } = MergedtutorMessageSlice.actions;

export const MergedtutorMessageReducer = MergedtutorMessageSlice.reducer;
