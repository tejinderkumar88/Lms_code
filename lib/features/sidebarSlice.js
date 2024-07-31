import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const toggleSidebarFunction = () => (dispatch) => {
  dispatch(sidebarSlice.actions.toggleSidebar());
};

export default sidebarSlice.reducer;
