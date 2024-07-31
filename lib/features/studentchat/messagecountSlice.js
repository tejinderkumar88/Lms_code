import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messageCounts: {},
};

const messageCountsSlice = createSlice({
  name: 'messageCounts',
  initialState,
  reducers: {
    updateMessageCounts(state, action) {
      state.messageCounts = action.payload;
    },
  },
});

export const { updateMessageCounts } = messageCountsSlice.actions;

export const messageCountsReducer  = messageCountsSlice.reducer;
