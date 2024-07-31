import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  MergedMessage_For_Student: [],
};

const FortutorMergedArraySlice = createSlice({
  name: "globalArray",
  initialState,
  reducers: {
    updateForTutor_Merged_Array(state, action) {
      const { payload } = action;
 
      // If the message_id doesn't exist, push the new payload
        state.MergedMessage_For_Student.push(payload);
    },



    // Add a new reducer to remove entries with a specific userId
    removeEntriesByUserId(state, action) {
      const { userId, chatId } = action.payload;
      state.MergedMessage_For_Student = state.MergedMessage_For_Student.filter(
        (message) => {
          if (message.chat_id != chatId && message.sender.id == parseInt(userId)) {
            return false;
          } else if (message.chat_id == chatId && message.sender.id != parseInt(userId)) {
            return false;
          }
          return true;
        }
      );
    }
  },
});

export const { updateForTutor_Merged_Array, removeEntriesByUserId } =
  FortutorMergedArraySlice.actions;

export const FortutorMergedArrayReducer = FortutorMergedArraySlice.reducer;
