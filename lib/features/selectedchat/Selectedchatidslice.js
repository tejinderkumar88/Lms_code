import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedChat_Id: null,

};

const chatSelectedSlice = createSlice({ 
  name: 'chatSelectedSlice',
  initialState,
  reducers: {
    selectedChat_Id: (state, action) => {
      state.selectedChat_Id = action.payload;
    },
  },
});

export const { selectedChat_Id } = chatSelectedSlice.actions;
export const SelectedChatReducer = chatSelectedSlice.reducer;
