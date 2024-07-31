import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedChat_Idby_student: null,

};

const chatSelectebydSlice = createSlice({ 
  name: 'chatSelectebydSlice',
  initialState,
  reducers: {
    selectedChat_Idby_student: (state, action) => {
      state.selectedChat_Idby_student = action.payload;
    },
  },
});

export const { selectedChat_Idby_student } = chatSelectebydSlice.actions;
export const SelectedChatByStudentReducer = chatSelectebydSlice.reducer;
