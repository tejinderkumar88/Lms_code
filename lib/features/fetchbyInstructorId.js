import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedUserId: null,
  availableslots : null
};

const FetchbyInstructorId = createSlice({
  name: "fetchbyinstructorid",
  initialState,
  reducers: {
    setSelectedUserId(state, action) {
      state.selectedUserId = action.payload;
    }, 
    setAvailableslots(state, action) {
      state.availableslots = action.payload;
    },       
  },
});

export const { setSelectedUserId  ,setAvailableslots} = FetchbyInstructorId.actions;
export default FetchbyInstructorId.reducer;
