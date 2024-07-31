import config from "@/lib/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getProfile = createAsyncThunk('instructor/getProfilesSlice', async () => {
    try {
      const response = await axios.get(
        `${config.baseURL}/profile`,
        {
            headers: {
            ...config.headers,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          } // Pass the headers from config
          }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  });

  export const updateProfile = createAsyncThunk(
    "updteProfile",
    async (userData, { dispatch }) => {
 
      try {
        const response = await axios.post(
          `${config.baseURL}/profile`,
          userData, // Use formData instead of userData
          {
            headers: {
            ...config.headers,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          } // Pass the headers from config
          }
        );
  
        dispatch(getProfile());
        //console.log(response.data,"data")
        return response.data;
      } catch (error) {
        const message = error.response && error.response.data;
        return message;
      }
    }
  );
  export const changePassword = createAsyncThunk(
    "changePassword",
    async (userData, { dispatch }) => {
     
      try {
        const response = await axios.post(
          `${config.baseURL}/change_password`,
          userData, // Use formData instead of userData
          {
            headers: {
            ...config.headers,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          } // Pass the headers from config
          }
        );
  
        // dispatch(getProfile());
        return response.data;
      } catch (error) {
        const message = error.response && error.response.data;
        return message;
      }
    }
  );
  const initialState = {
    ProfilesList: null,
    loading: false,
    isloading:false,
    error: null,
  }
  
  const getProfilesSlice = createSlice({
    name: 'getProfile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getProfile.pending, (state) => {
          state.isloading = true;
          state.error = null;
        })
        .addCase(getProfile.fulfilled, (state, action) => {
          state.isloading = false;
          state.profileData = action.payload.data;
        })
        .addCase(getProfile.rejected, (state, action) => {
          state.isloading = false;
          state.error = action.error.message;
        })
        builder.addCase(updateProfile.pending, (state, action) => {
          state.loading = true;
        });
        builder.addCase(updateProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.success = false;
          state.message = action.payload || "Error occurred";
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.error = false;
          state.succcess = true;
          state.message = action.payload;
        })
        builder.addCase(changePassword.pending, (state, action) => {
          state.loading = true;
        });
        builder.addCase(changePassword.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.success = false;
          state.message = action.payload || "Error occurred";
        });
        builder.addCase(changePassword.fulfilled, (state, action) => {
          state.loading = false;
          state.error = false;
          state.succcess = true;
          state.message = action.payload;
        });
    },
  });
  

  export const ProfileReducer = getProfilesSlice.reducer;